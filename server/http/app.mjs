import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { getLot, join, heartbeat, closeCurrent, nextLot, rawLot } from "../lots/service.mjs";
import { archive, findArtifact } from "../archive/index.mjs";
import { getActivity } from "../activity/index.mjs";
import { leaveSomething } from "../contributions/pool.mjs";
import { publicPEM } from "../crypto/keys.mjs";
import { artifactPNG } from "../artifacts/png.mjs";
import { getChat, postChat } from "../chat/service.mjs";
import { generate } from "../../engine/core.mjs";
import { generateMorphologicalArtifact } from "../../engine/vector/generator.mjs";
import { generateCharacterBatch } from "../../engine/vector/batch-generator.mjs";
import { loadSemanticMemory } from "../fusion/memory.mjs";
import { findSemanticBridges, evaluateFusionQuality, executeSemanticFusion } from "../fusion/resolver.mjs";
import { getDuelEnvironments, resolveSemanticDuel } from "../duels/service.mjs";
import { getAuthoritativeInstance } from "../evolution/certificate.mjs";

const web = path.resolve("web/public");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const production = process.env.NODE_ENV === "production";

const visitors = new Map();
const VISITOR_TTL_MS = 30000;

const activeVisitors = () => {
  const cutoff = Date.now() - VISITOR_TTL_MS;
  for (const [id, lastSeen] of visitors) {
    if (lastSeen < cutoff) visitors.delete(id);
  }
  return visitors.size;
};

const secure = res => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
};

const json = (res, status, data) => {
  secure(res);
  res.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
  res.end(JSON.stringify(data));
};

const body = req =>
  new Promise((ok, bad) => {
    let a = [];
    req.on("data", x => a.push(x));
    req.on("end", () => {
      try {
        ok(JSON.parse(Buffer.concat(a).toString() || "{}"));
      } catch (e) {
        bad(e);
      }
    });
  });

function session(req, res) {
  let m = (req.headers.cookie || "").match(/void_session=([^;]+)/);
  let id = m ? m[1] : crypto.randomUUID();
  if (!m) res.setHeader("Set-Cookie", `void_session=${id}; Path=/; SameSite=Lax; Max-Age=21600`);
  visitors.set(id, Date.now());
  return id;
}

function safe(fn, res) {
  try {
    return fn();
  } catch (e) {
    json(res, 400, { error: e.message });
  }
}

const server = http.createServer(async (req, res) => {
  let u = new URL(req.url, "http://x");
  let sid = session(req, res);

  try {
    secure(res);
    if (u.pathname === "/health" && req.method === "GET") return json(res, 200, { ok: true });
    if (u.pathname === "/api/lot" && req.method === "GET") return json(res, 200, getLot(sid));
    if (u.pathname === "/api/activity" && req.method === "GET") return json(res, 200, getActivity(rawLot(), archive(), activeVisitors()));

    if (u.pathname === "/api/generator-samples" && req.method === "GET") {
      let count = Math.min(100, Math.max(1, Number(u.searchParams.get("count")) || 60));
      let baseSeed = Number(u.searchParams.get("seed")) || Math.floor(Math.random() * 1000000) + 1;
      let samples = [];
      for (let i = 0; i < count; i++) {
        let s = (baseSeed + i * 137 + 7) % 2147483647;
        samples.push(generateMorphologicalArtifact(s, i));
      }
      return json(res, 200, { seed: baseSeed, count: samples.length, samples });
    }

    if (u.pathname === "/api/generator-batch" && req.method === "GET") {
      let count = Math.min(1000, Math.max(1, Number(u.searchParams.get("count")) || 50));
      let baseSeed = Number(u.searchParams.get("seed")) || Math.floor(Math.random() * 1000000) + 1;
      let result = generateCharacterBatch(count, baseSeed);
      return json(res, 200, result);
    }

    if (u.pathname === "/api/chat" && req.method === "GET") return json(res, 200, getChat(sid));
    if (u.pathname === "/api/chat" && req.method === "POST") {
      let b = await body(req);
      return safe(() => json(res, 200, postChat(sid, b.text, b.mode)), res);
    }

    if (u.pathname === "/api/join" && req.method === "POST") {
      let b = await body(req);
      return json(res, 200, join(sid, b.country || "UNKNOWN"));
    }

    if (u.pathname === "/api/heartbeat" && req.method === "POST") return json(res, 200, heartbeat(sid));

    if (u.pathname === "/api/archive" && req.method === "GET") {
      return json(res, 200, archive().map(x => ({ ...x.record, claimable: x.winner_session === sid })));
    }

    let ar = u.pathname.match(/^\/api\/archive\/([^/]+)$/);
    if (ar && req.method === "GET") {
      let x = findArtifact(decodeURIComponent(ar[1]));
      return x ? json(res, 200, { ...x.record, claimable: x.winner_session === sid }) : json(res, 404, { error: "NOT_FOUND" });
    }

    // Fusion & Void Memory APIs
    if (u.pathname === "/api/fusion/memory" && req.method === "GET") {
      return json(res, 200, loadSemanticMemory());
    }

    if (u.pathname === "/api/fusion/analyze" && req.method === "POST") {
      let b = await body(req);
      let { semA, semB, bridges } = findSemanticBridges(b.artifactA || {}, b.artifactB || {});
      let quality = evaluateFusionQuality(semA, semB, bridges, b.artifactA?.anomaly, b.artifactB?.anomaly);
      return json(res, 200, { semA, semB, bridges, quality });
    }

    if (u.pathname === "/api/fusion" && req.method === "POST") {
      let b = await body(req);
      return safe(() => json(res, 200, executeSemanticFusion({
        instanceA: b.instanceA,
        revisionA: Number(b.revisionA) || 0,
        artifactA: b.artifactA,
        controllerA: b.controllerA,
        instanceB: b.instanceB,
        revisionB: Number(b.revisionB) || 0,
        artifactB: b.artifactB,
        controllerB: b.controllerB
      })), res);
    }

    // Duels APIs
    if (u.pathname === "/api/duel/environments" && req.method === "GET") {
      return json(res, 200, getDuelEnvironments());
    }

    if (u.pathname === "/api/duel/resolve" && req.method === "POST") {
      let b = await body(req);
      return safe(() => json(res, 200, resolveSemanticDuel({
        instanceId: b.instanceId,
        currentRevision: Number(b.currentRevision) || 0,
        artifact: b.artifact,
        controller: b.controller,
        environmentId: b.environmentId,
        selectedManeuverId: b.selectedManeuverId
      })), res);
    }

    let instMatch = u.pathname.match(/^\/api\/instance\/([^/]+)$/);
    if (instMatch && req.method === "GET") {
      let inst = getAuthoritativeInstance(instMatch[1]);
      return inst ? json(res, 200, inst) : json(res, 404, { error: "INSTANCE_NOT_FOUND" });
    }

    if (u.pathname === "/api/public-key" && req.method === "GET") {
      res.writeHead(200, { "content-type": "text/plain" });
      return res.end(publicPEM());
    }

    if (u.pathname === "/api/contribute" && req.method === "POST") {
      let b = await body(req), l = rawLot();
      if (!l || l.winner_session !== sid) return json(res, 403, { error: "NOT_AVAILABLE" });
      return json(res, 200, leaveSomething(b.text, l.id));
    }

    if (!production && u.pathname === "/api/demo/close" && req.method === "POST") return json(res, 200, closeCurrent());
    if (!production && u.pathname === "/api/demo/next" && req.method === "POST") return json(res, 200, nextLot());

    let dm = u.pathname.match(/^\/api\/artifact\/([^/]+)\/download$/);
    if (dm) {
      let x = findArtifact(dm[1]);
      if (!x) return json(res, 404, { error: "NOT_FOUND" });
      if (x.winner_session !== sid) return json(res, 403, { error: "NOT_AVAILABLE" });
      let png = artifactPNG(x.record, x.signature),
        name = String(x.record.name || x.record.artifact_id).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || x.record.artifact_id.toLowerCase();
      res.writeHead(200, { "content-type": "image/png", "content-disposition": `attachment; filename="${name}.png"` });
      return res.end(png);
    }

    let file = u.pathname === "/" ? "index.html" : u.pathname.slice(1);
    let fp = path.resolve(web, file);
    if (!fp.startsWith(web)) return json(res, 404, { error: "NOT_FOUND" });
    if (!fs.existsSync(fp) && !u.pathname.startsWith("/api/")) fp = path.join(web, "index.html");
    if (!fs.existsSync(fp)) return json(res, 404, { error: "NOT_FOUND" });

    let ext = path.extname(fp);
    let ct = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml" }[ext] || "application/octet-stream";
    res.writeHead(200, { "content-type": ct });
    fs.createReadStream(fp).pipe(res);
  } catch (e) {
    json(res, 500, { error: e.message });
  }
});

server.listen(port, host, () => console.log(`THE VOID listening on http://${host}:${port}`));
