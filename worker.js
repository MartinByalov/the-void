const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const REGISTRY_KEY = "VAULT_QUEUE_REGISTRY";
const ACTIVE_SPAWN_KEY = "ACTIVE_SPAWN";
const WARP_STATE_KEY = "WARP_STATE";
const WARP_FEED_KEY = "WARP_LIVE_FEED";
const ARCHIVE_KEY = "THE_ARCHIVE";
const LOOT_WINDOW_MS = 60 * 1000;
const MAX_FEED_EVENTS = 30;

const SPAWN_INTERVALS = {
  COMMON: { min: 15 * 60 * 1000, max: 30 * 60 * 1000 },
  UNCOMMON: { min: 25 * 60 * 1000, max: 45 * 60 * 1000 },
  RARE: { min: 40 * 60 * 1000, max: 65 * 60 * 1000 },
  EPIC: { min: 60 * 60 * 1000, max: 90 * 60 * 1000 },
  LEGENDARY: { min: 90 * 60 * 1000, max: 120 * 60 * 1000 },
  MYTHIC: { min: 120 * 60 * 1000, max: 180 * 60 * 1000 },
  DIVINE: { min: 360 * 60 * 1000, max: 480 * 60 * 1000 },
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
    const url = new URL(request.url);

    try {
      if (["/", "/api", "/api/status"].includes(url.pathname) && request.method === "GET") {
        return json({ ok: true, service: "THE VOID", version: 13, status: "ONLINE", warpEngine: "DURABLE_OBJECT_PUSH" }, 200, 30);
      }

      // Persistent push channel. No revealAt and no nextSpawnAt are sent to public clients.
      if (url.pathname === "/warp-stream" && request.method === "GET") {
        const hub = getWarpHub(env);
        return hub.fetch(request);
      }

      // Initial public snapshot for a newly opened/reloaded page.
      // It contains only what is already public NOW.
      if (url.pathname === "/warp-state" && request.method === "GET") {
        const warp = await getWarpState(env);
        return publicStateResponse(env, warp);
      }

      // Canonical Vault Registry lives in Google Drive.
      if (url.pathname === "/api/vault/registry" && request.method === "GET") {
        const registry = await driveGet(env, "registry");
        if (!registry?.ok) return json({ success: false, error: registry?.error || "REGISTRY_READ_FAILED" }, 502);
        return json({ success: true, ...(registry.registry || { version: 1, nextSerial: 1, artifacts: [] }) });
      }

      // Destructive admin maintenance: WARP must be closed before changing canonical Registry.
      if (url.pathname === "/api/vault/registry/clear" && request.method === "POST") {
        const warp = await getWarpState(env);
        if (warp.state !== "IDLE") return json({ success: false, error: "WARP_MUST_BE_CLOSED" }, 409);

        const result = await drivePost(env, { action: "clearRegistry" });
        if (!result?.ok) return json({ success: false, error: result?.error || "REGISTRY_CLEAR_FAILED" }, 502);

        const registry = { queue: [], spawnedHistory: [], lastSerialIndex: 0 };
        await Promise.all([saveRegistry(env, registry), env.VOID_KV.delete(ACTIVE_SPAWN_KEY)]);
        return json({ success: true, count: 0, nextSerial: 1, deletedImages: Number(result.deletedImages || 0) });
      }

      if (url.pathname === "/api/vault/registry/remove-last" && request.method === "POST") {
        const warp = await getWarpState(env);
        if (warp.state !== "IDLE") return json({ success: false, error: "WARP_MUST_BE_CLOSED" }, 409);

        const driveRegistry = await driveGet(env, "registry");
        if (!driveRegistry?.ok) return json({ success: false, error: driveRegistry?.error || "REGISTRY_READ_FAILED" }, 502);
        const artifacts = Array.isArray(driveRegistry?.registry?.artifacts) ? driveRegistry.registry.artifacts : [];
        if (!artifacts.length) return json({ success: false, error: "REGISTRY_EMPTY" }, 409);

        const last = artifacts.reduce((best, item) => serialFromArtifactId(getArtifactId(item)) >= serialFromArtifactId(getArtifactId(best)) ? item : best, artifacts[0]);
        const id = getArtifactId(last);
        const runtimeRegistry = await getRegistry(env);
        const archive = await getArchive(env);
        const wasSurfaced = runtimeRegistry.spawnedHistory.includes(id) || archive.some(x => getArtifactId(x) === id);
        if (wasSurfaced) return json({ success: false, error: "ARTIFACT_ALREADY_SURFACED", artifactId: id }, 409);

        const result = await drivePost(env, { action: "removeLastArtifact", expectedArtifactId: id });
        if (!result?.ok) return json({ success: false, error: result?.error || "REMOVE_LAST_FAILED", ...result }, 409);

        runtimeRegistry.queue = runtimeRegistry.queue.filter(x => getArtifactId(x) !== id);
        runtimeRegistry.lastSerialIndex = Math.max(0, Number(result.nextSerial || 1) - 1);
        await saveRegistry(env, runtimeRegistry);
        return json({ success: true, removed: result.removed || last, artifactId: id, nextSerial: Number(result.nextSerial || 1), totalUnspawned: runtimeRegistry.queue.length });
      }

      // Public Archive contains ONLY Artifacts that actually surfaced.
      if (url.pathname === "/api/archive" && request.method === "GET") {
        const archive = await getArchive(env);
        return json({ success: true, version: 1, count: archive.length, entries: archive }, 200, 5);
      }

      // Admin backup: authoritative KV Archive -> Google Drive /data/archive.json.
      if (url.pathname === "/api/archive/sync" && request.method === "POST") {
        const entries = await getArchive(env);
        const result = await drivePost(env, { action: "writeArchive", entries });
        if (!result?.ok) return json({ success: false, error: result?.error || "ARCHIVE_SYNC_FAILED" }, 502);
        return json({ success: true, count: entries.length, updatedAt: result.updatedAt || Date.now() });
      }

      // Destructive admin maintenance: clear authoritative KV Archive and Drive backup.
      if (url.pathname === "/api/archive/clear" && request.method === "POST") {
        await saveArchive(env, []);
        const result = await drivePost(env, { action: "writeArchive", entries: [] });
        if (!result?.ok) return json({ success: false, error: result?.error || "ARCHIVE_CLEAR_DRIVE_FAILED" }, 502);
        return json({ success: true, count: 0, updatedAt: result.updatedAt || Date.now() });
      }

      // CREATE ARTIFACT is the only operation that consumes the next serial.
      // Draft generation in the browser never changes Drive or KV.
      if (url.pathname === "/api/artifacts/create" && request.method === "POST") {
        const body = await safeJson(request);
        const artifact = body.artifact && typeof body.artifact === "object" ? body.artifact : null;
        const imageBase64 = String(body.imageBase64 || "");
        if (!artifact || !imageBase64) return json({ success: false, error: "MISSING_ARTIFACT_OR_IMAGE" }, 400);
        if (String(body.mimeType || "image/png").toLowerCase() !== "image/png") return json({ success: false, error: "PNG_ONLY" }, 400);

        const id = getArtifactId(artifact);
        if (!id) return json({ success: false, error: "INVALID_ARTIFACT_ID" }, 400);

        const driveResult = await drivePost(env, {
          action: "createArtifact",
          artifact: { ...artifact, id, artifact_id: id },
          imageBase64,
          mimeType: "image/png",
          createdAt: Date.now(),
        });
        if (!driveResult?.ok) return json({ success: false, error: driveResult?.error || "DRIVE_CREATE_FAILED", ...driveResult }, 409);

        const canonical = driveResult.artifact;
        const registry = await getRegistry(env);
        const warp = await getWarpState(env);
        const existing = new Set([
          ...registry.queue.map(getArtifactId),
          ...registry.spawnedHistory,
          getArtifactId(warp.artifact),
          getArtifactId(warp.nextArtifact),
        ].filter(Boolean));
        if (!existing.has(id)) registry.queue.push(canonical);
        registry.lastSerialIndex = Math.max(Number(registry.lastSerialIndex || 0), serialFromArtifactId(id));
        await saveRegistry(env, registry);
        return json({ success: true, artifact: canonical, nextSerial: driveResult.nextSerial, totalUnspawned: registry.queue.length + (warp.state === "WAITING" && warp.nextArtifact ? 1 : 0) });
      }

      if (url.pathname === "/api/vault/inventory" && request.method === "GET") {
        const warp = await getWarpState(env);
        const registry = await getRegistry(env);
        const scheduled = warp.state === "WAITING" && warp.nextArtifact ? 1 : 0;
        return json({
          success: true,
          totalUnspawned: registry.queue.length + scheduled,
          queued: registry.queue.length,
          scheduled,
          totalSpawned: registry.spawnedHistory.length,
          lastSerialIndex: Number(registry.lastSerialIndex || 0),
          state: warp.state,
          serverNow: Date.now(),
          // Admin-only endpoint: the real schedule is allowed here.
          nextSpawnAt: warp.state === "WAITING" ? normalizeTimestamp(warp.nextSpawnAt) : null,
          expiresAt: warp.state === "ACTIVE" ? normalizeTimestamp(warp.expiresAt) : null,
          activeArtifactId: warp.state === "ACTIVE" ? getArtifactId(warp.artifact) : null,
        });
      }

      // Hard test reset. Canonical Drive Registry/PNGs are preserved.
      // Runtime queue is rebuilt from Drive; WARP remains CLOSED.
      if (url.pathname === "/api/vault/reset" && request.method === "POST") {
        const driveRegistry = await driveGet(env, "registry");
        const artifacts = Array.isArray(driveRegistry?.registry?.artifacts) ? driveRegistry.registry.artifacts : [];
        const registry = {
          queue: artifacts.map(a => ({ ...a })),
          spawnedHistory: [],
          lastSerialIndex: Math.max(0, ...artifacts.map(a => serialFromArtifactId(getArtifactId(a)))),
        };
        const warp = createEmptyWarpState();
        await Promise.all([
          saveRegistry(env, registry), saveWarpState(env, warp), saveWarpFeed(env, []), saveArchive(env, []), env.VOID_KV.delete(ACTIVE_SPAWN_KEY),
        ]);
        const hub = getWarpHub(env);
        await hub.fetch(new Request("https://warp.internal/reset", { method: "POST" }));
        return json({ success: true, reset: true, restoredFromRegistry: artifacts.length, serverNow: Date.now(), warp: adminWarp(warp) });
      }

      if (url.pathname === "/api/vault/scan-drive" && request.method === "POST") {
        if (!env.GDRIVE_BRIDGE_URL || !env.GDRIVE_BRIDGE_KEY) {
          return json({ success: false, error: "GDRIVE_BRIDGE_NOT_CONFIGURED" }, 503);
        }
        const response = await fetch(
          `${env.GDRIVE_BRIDGE_URL}?action=list&key=${encodeURIComponent(env.GDRIVE_BRIDGE_KEY)}`,
          { cf: { cacheTtl: 0 } }
        );
        if (!response.ok) return json({ success: false, error: "GDRIVE_SCAN_FAILED", status: response.status }, 502);
        const data = await response.json();
        if (!data?.ok || !Array.isArray(data.images)) return json({ success: false, error: data?.error || "INVALID_GDRIVE_SCAN" }, 502);
        const images = data.images.map(x => ({
          artifactId: String(x.artifactId || "").trim(),
          name: String(x.name || ""),
          mimeType: String(x.mimeType || "image/png"),
        })).filter(x => x.artifactId);
        return json({ success: true, count: images.length, images, serverNow: Date.now() });
      }

      // Register only. Never starts WARP.
      if (url.pathname === "/api/vault/register" && request.method === "POST") {
        const body = await safeJson(request);
        if (!Array.isArray(body.artifacts)) return json({ success: false, error: "INVALID_ARTIFACT_LIST" }, 400);
        const registry = await getRegistry(env);
        const warp = await getWarpState(env);
        const existing = new Set([
          ...registry.queue.map(getArtifactId),
          ...registry.spawnedHistory,
          getArtifactId(warp.artifact),
          getArtifactId(warp.nextArtifact),
        ].filter(Boolean));
        let added = 0;
        for (const artifact of body.artifacts) {
          const id = getArtifactId(artifact);
          if (!id || existing.has(id)) continue;
          registry.queue.push({ ...artifact, id, artifact_id: artifact.artifact_id || id });
          existing.add(id);
          added++;
        }
        await saveRegistry(env, registry);
        const scheduled = warp.state === "WAITING" && warp.nextArtifact ? 1 : 0;
        return json({ success: true, added, totalUnspawned: registry.queue.length + scheduled, queued: registry.queue.length, scheduled, serverNow: Date.now(), warp: adminWarp(warp) });
      }

      // ONLY manual IDLE -> WAITING control.
      if (url.pathname === "/api/warp/start" && request.method === "POST") {
        let warp = await getWarpState(env);
        if (warp.state === "WAITING" || warp.state === "ACTIVE") {
          return json({ success: true, alreadyRunning: true, serverNow: Date.now(), warp: adminWarp(warp) });
        }
        warp = await scheduleNextArtifactFromVault(env, warp, Date.now());
        if (warp.state === "IDLE") {
          return json({ success: false, error: "VAULT_EMPTY", message: "No Artifacts are registered from Drive.", serverNow: Date.now(), warp: adminWarp(warp) }, 409);
        }
        await pushWarpFeed(env, {
          id: `warp-${warp.warpId}-start-${warp.nextSpawnAt}`,
          type: "WARP_STARTED",
          at: Date.now(),
          title: "THE VOID IS STIRRING...",
          text: "Something has changed beneath the surface.",
        });
        await armAndBroadcast(env, warp);
        return json({ success: true, started: true, serverNow: Date.now(), warp: adminWarp(warp) });
      }

      // Test-only. Surfaces the already reserved Artifact immediately.
      if (url.pathname === "/api/warp/force-drop" && request.method === "POST") {
        const now = Date.now();
        let warp = await getWarpState(env);
        if (warp.state === "IDLE") return json({ success: false, error: "WARP_CLOSED", message: "Start WARP before forcing a drop.", serverNow: now, warp: adminWarp(warp) }, 409);
        if (warp.state === "ACTIVE") return json({ success: false, error: "DROP_ALREADY_ACTIVE", message: "A drop is already active.", serverNow: now, warp: adminWarp(warp) }, 409);
        if (warp.state !== "WAITING" || !warp.nextArtifact) return json({ success: false, error: "NO_SCHEDULED_ARTIFACT", serverNow: now, warp: adminWarp(warp) }, 409);
        warp = await activateArtifact(env, warp, warp.nextArtifact, now);
        await armAndBroadcast(env, warp);
        return json({ success: true, forced: true, artifact: publicArtifact(warp.artifact), serverNow: now, warp: adminWarp(warp) });
      }

      if (url.pathname === "/api/warp" && request.method === "GET") {
        const warp = await getWarpState(env);
        return json({ success: true, active: warp.state === "ACTIVE" && !!warp.artifact, serverNow: Date.now(), warp: adminWarp(warp), feed: await getWarpFeed(env) });
      }

      if (url.pathname === "/api/drop" && request.method === "GET") {
        const warp = await getWarpState(env);
        return json({
          success: true,
          active: warp.state === "ACTIVE" && !!warp.artifact,
          artifact: warp.state === "ACTIVE" ? publicArtifact(warp.artifact) : null,
          state: warp.state,
          serverNow: Date.now(),
          loot: warp.state === "ACTIVE" ? { closesAt: normalizeTimestamp(warp.expiresAt) } : null,
        });
      }

      // Multi-claim. Claim does not end the global 60-second Drop.
      if (url.pathname === "/api/warp/claim" && request.method === "POST") {
        const now = Date.now();
        const warp = await getWarpState(env);
        if (warp.state !== "ACTIVE" || !warp.artifact) return json({ success: false, result: "NO_ACTIVE_ARTIFACT", serverNow: now }, 409);
        if (!warp.expiresAt || now >= Number(warp.expiresAt)) return json({ success: false, result: "GONE", serverNow: now }, 409);
        return json({ success: true, result: "CLAIMED", artifact: publicArtifact(warp.artifact), serverNow: now, loot: { closesAt: normalizeTimestamp(warp.expiresAt) } });
      }

      if (url.pathname.startsWith("/api/artifact/") && (url.pathname.endsWith("/image") || url.pathname.endsWith(".png")) && request.method === "GET") {
        const rawId = url.pathname.split("/")[3]?.replace(/\.png$/, "") || "";
        const artifactId = decodeURIComponent(rawId);
        if (!artifactId) return new Response("Missing artifact ID", { status: 400, headers: corsHeaders });
        const cacheKey = `IMG_CACHE_${artifactId}`;
        const cached = await env.VOID_KV.get(cacheKey);
        if (cached) return new Response(base64ToUint8Array(cached), { headers: { ...corsHeaders, "Content-Type": "image/png", "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" } });
        if (!env.GDRIVE_BRIDGE_URL || !env.GDRIVE_BRIDGE_KEY) return new Response("Google Drive bridge is not configured", { status: 503, headers: { ...corsHeaders, "Cache-Control": "no-store" } });
        const variants = [artifactId, artifactId.replace(/-/g, "_"), artifactId.replace(/_/g, "-")];
        for (const targetId of [...new Set(variants)]) {
          try {
            const response = await fetch(`${env.GDRIVE_BRIDGE_URL}?id=${encodeURIComponent(targetId)}&key=${encodeURIComponent(env.GDRIVE_BRIDGE_KEY)}`);
            if (!response.ok) continue;
            const data = await response.json();
            if (data?.found && data?.base64) {
              await env.VOID_KV.put(cacheKey, data.base64, { expirationTtl: 604800 });
              return new Response(base64ToUint8Array(data.base64), { headers: { ...corsHeaders, "Content-Type": data.mimeType || "image/png", "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" } });
            }
          } catch (error) { console.error("Google Drive bridge error:", error); }
        }
        return new Response("Artifact image not found in Google Drive", { status: 404, headers: { ...corsHeaders, "Cache-Control": "no-store" } });
      }

      return json({ ok: false, error: "NOT_FOUND" }, 404);
    } catch (error) {
      console.error(error);
      return json({ ok: false, error: "INTERNAL_ERROR", message: error?.message || "Unknown Worker error" }, 500);
    }
  },
};

// One Durable Object owns the timer/alarm and all connected public sockets.
// The browser never receives the secret nextSpawnAt.
export class WarpHub {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/warp-stream") {
      if (request.headers.get("Upgrade") !== "websocket") return new Response("Expected WebSocket", { status: 426 });
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      this.state.acceptWebSocket(server);
      const warp = await getWarpState(this.env);
      server.send(JSON.stringify(await buildPublicState(this.env, warp, "SNAPSHOT")));
      return new Response(null, { status: 101, webSocket: client });
    }

    if (url.pathname === "/arm" && request.method === "POST") {
      const warp = await getWarpState(this.env);
      await this.armFor(warp);
      await this.broadcast(warp, "STATE");
      return new Response("OK");
    }

    if (url.pathname === "/reset" && request.method === "POST") {
      await this.state.storage.deleteAlarm();
      await this.broadcast(createEmptyWarpState(), "RESET");
      return new Response("OK");
    }

    return new Response("Not found", { status: 404 });
  }

  async alarm() {
    const now = Date.now();
    let warp = await getWarpState(this.env);

    if (warp.state === "WAITING" && warp.nextArtifact && Number.isFinite(Number(warp.nextSpawnAt)) && now >= Number(warp.nextSpawnAt)) {
      warp = await activateArtifact(this.env, warp, warp.nextArtifact, Number(warp.nextSpawnAt));
    } else if (warp.state === "ACTIVE" && warp.artifact && Number.isFinite(Number(warp.expiresAt)) && now >= Number(warp.expiresAt)) {
      warp = await finishCurrentWarpAndScheduleNext(this.env, warp, Number(warp.expiresAt));
    }

    await this.armFor(warp);
    await this.broadcast(warp, "STATE");
  }

  async armFor(warp) {
    if (warp.state === "WAITING" && Number.isFinite(Number(warp.nextSpawnAt))) {
      await this.state.storage.setAlarm(Number(warp.nextSpawnAt));
      return;
    }
    if (warp.state === "ACTIVE" && Number.isFinite(Number(warp.expiresAt))) {
      await this.state.storage.setAlarm(Number(warp.expiresAt));
      return;
    }
    await this.state.storage.deleteAlarm();
  }

  async broadcast(warp, event = "STATE") {
    const message = JSON.stringify(await buildPublicState(this.env, warp, event));
    for (const socket of this.state.getWebSockets()) {
      try { socket.send(message); } catch { try { socket.close(1011, "send failed"); } catch {} }
    }
  }

  async webSocketMessage(ws, message) {
    if (String(message) === "ping") {
      try { ws.send(JSON.stringify({ type: "PONG", serverNow: Date.now() })); } catch {}
    }
  }

  async webSocketClose(ws, code, reason) {
    try { ws.close(code, reason); } catch {}
  }

  async webSocketError(ws) {
    try { ws.close(1011, "socket error"); } catch {}
  }
}

function getWarpHub(env) {
  const id = env.WARP_HUB.idFromName("global");
  return env.WARP_HUB.get(id);
}

async function armAndBroadcast(env, warp) {
  const hub = getWarpHub(env);
  await hub.fetch(new Request("https://warp.internal/arm", { method: "POST" }));
}

async function publicStateResponse(env, warp) {
  return new Response(JSON.stringify(await buildPublicState(env, warp, "SNAPSHOT")), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

async function buildPublicState(env, warp, type = "STATE") {
  const state = warp?.state || "IDLE";
  return {
    type,
    revision: Number(warp?.warpId || 0),
    state,
    serverNow: Date.now(),
    artifact: state === "ACTIVE" ? publicArtifact(warp.artifact) : null,
    loot: state === "ACTIVE" ? { closesAt: normalizeTimestamp(warp.expiresAt) } : null,
    feed: await getWarpFeed(env),
  };
}

async function scheduleNextArtifactFromVault(env, warp, baseTime) {
  const registry = await getRegistry(env);
  if (!registry.queue.length) {
    const idle = { ...createEmptyWarpState(), warpId: Number(warp?.warpId || 0), lastOutcome: warp?.lastOutcome || null };
    await saveWarpState(env, idle);
    return idle;
  }
  const nextArtifact = registry.queue.shift();
  await saveRegistry(env, registry);
  const schedule = createSpawnSchedule(nextArtifact, baseTime);
  const waiting = {
    warpId: Number(warp?.warpId || 0), state: "WAITING", artifact: null, spawnedAt: null, expiresAt: null,
    nextArtifact, nextSpawnAt: schedule.nextSpawnAt, lastOutcome: warp?.lastOutcome || null,
  };
  await saveWarpState(env, waiting);
  return waiting;
}

async function activateArtifact(env, previousWarp, artifact, spawnAt) {
  const id = getArtifactId(artifact);
  const activeArtifact = { ...artifact, id, artifact_id: artifact.artifact_id || id, spawnedAt: spawnAt };
  const registry = await getRegistry(env);
  if (id && !registry.spawnedHistory.includes(id)) {
    registry.spawnedHistory.push(id);
    await saveRegistry(env, registry);
  }
  const warp = {
    warpId: Number(previousWarp?.warpId || 0) + 1,
    state: "ACTIVE",
    artifact: activeArtifact,
    spawnedAt: spawnAt,
    expiresAt: spawnAt + LOOT_WINDOW_MS,
    nextArtifact: null,
    nextSpawnAt: null,
    lastOutcome: previousWarp?.lastOutcome || null,
  };
  await env.VOID_KV.put(ACTIVE_SPAWN_KEY, JSON.stringify(activeArtifact));
  await saveWarpState(env, warp);
  await archiveSurfacedArtifact(env, activeArtifact, spawnAt, warp.warpId);
  await pushWarpFeed(env, {
    id: `warp-${warp.warpId}-drop`, type: "DROP_SURFACED", at: spawnAt,
    title: "SOMETHING SURFACED.",
    text: activeArtifact.name ? `${activeArtifact.name} · ${activeArtifact.rarity || "UNKNOWN"}` : "An Artifact emerged from THE VOID.",
  });
  await pushWarpFeed(env, {
    id: `warp-${warp.warpId}-loot`, type: "LOOT_WINDOW", at: spawnAt,
    title: "THE WINDOW IS OPEN.", text: "60 seconds to loot.",
  });
  return warp;
}

async function finishCurrentWarpAndScheduleNext(env, warp, expiredAt) {
  const artifact = warp.artifact;
  await pushWarpFeed(env, {
    id: `warp-${warp.warpId}-sunk`, type: "DROP_EXPIRED", at: expiredAt,
    title: "IT SANK BACK INTO THE VOID.", text: artifact?.name ? `${artifact.name} is gone.` : "The Artifact is gone.",
  });
  await env.VOID_KV.delete(ACTIVE_SPAWN_KEY);
  const cleared = {
    warpId: Number(warp.warpId || 0), state: "IDLE", artifact: null, spawnedAt: null, expiresAt: null,
    nextArtifact: null, nextSpawnAt: null,
    lastOutcome: artifact ? { artifactId: getArtifactId(artifact), outcome: "EXPIRED", surfacedAt: normalizeTimestamp(warp.spawnedAt), completedAt: expiredAt } : warp.lastOutcome || null,
  };
  await saveWarpState(env, cleared);
  const next = await scheduleNextArtifactFromVault(env, cleared, expiredAt);
  if (next.state === "WAITING") {
    await pushWarpFeed(env, {
      id: `warp-${warp.warpId}-next-${next.nextSpawnAt}`, type: "WARP_STARTED", at: expiredAt,
      title: "THE VOID IS STIRRING...", text: "Something is moving beneath the surface.",
    });
  }
  return next;
}

function createSpawnSchedule(artifact, baseTime) {
  const rarity = String(artifact?.rarity || "COMMON").toUpperCase();
  const range = SPAWN_INTERVALS[rarity] || SPAWN_INTERVALS.COMMON;
  const delayMs = randomInteger(range.min, range.max);
  return { rarity, delayMs, nextSpawnAt: baseTime + delayMs };
}

function adminWarp(warp) {
  const state = warp?.state || "IDLE";
  return {
    warpId: Number(warp?.warpId || 0), state,
    artifact: state === "ACTIVE" ? publicArtifact(warp.artifact) : null,
    spawnedAt: state === "ACTIVE" ? normalizeTimestamp(warp.spawnedAt) : null,
    expiresAt: state === "ACTIVE" ? normalizeTimestamp(warp.expiresAt) : null,
    nextSpawnAt: state === "WAITING" ? normalizeTimestamp(warp.nextSpawnAt) : null,
    lastOutcome: warp?.lastOutcome || null,
  };
}

function publicArtifact(artifact) {
  if (!artifact) return null;
  const copy = structuredClone(artifact);
  delete copy.spawnedAt;
  delete copy.nextSpawnAt;
  delete copy.revealAt;
  delete copy.imageFileId;
  return copy;
}

async function getArchive(env) {
  const value = await env.VOID_KV.get(ARCHIVE_KEY, "json");
  return Array.isArray(value) ? value : [];
}
async function saveArchive(env, entries) { return env.VOID_KV.put(ARCHIVE_KEY, JSON.stringify(entries)); }
async function archiveSurfacedArtifact(env, artifact, surfacedAt, warpId) {
  const id = getArtifactId(artifact);
  if (!id) return;
  const entries = await getArchive(env);
  if (entries.some(x => getArtifactId(x) === id)) return;
  entries.unshift({ ...publicArtifact(artifact), surfacedAt: normalizeTimestamp(surfacedAt), warpId: Number(warpId || 0) });
  await saveArchive(env, entries);
}

async function driveGet(env, action, params = {}) {
  if (!env.GDRIVE_BRIDGE_URL || !env.GDRIVE_BRIDGE_KEY) return { ok: false, error: "GDRIVE_BRIDGE_NOT_CONFIGURED" };
  const url = new URL(env.GDRIVE_BRIDGE_URL);
  url.searchParams.set("action", action);
  url.searchParams.set("key", env.GDRIVE_BRIDGE_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const response = await fetch(url.toString(), { cf: { cacheTtl: 0 } });
  if (!response.ok) return { ok: false, error: "GDRIVE_BRIDGE_HTTP_" + response.status };
  return response.json();
}
async function drivePost(env, payload) {
  if (!env.GDRIVE_BRIDGE_URL || !env.GDRIVE_BRIDGE_KEY) return { ok: false, error: "GDRIVE_BRIDGE_NOT_CONFIGURED" };
  const response = await fetch(env.GDRIVE_BRIDGE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, key: env.GDRIVE_BRIDGE_KEY }),
  });
  if (!response.ok) return { ok: false, error: "GDRIVE_BRIDGE_HTTP_" + response.status };
  return response.json();
}
function serialFromArtifactId(value) {
  const m = String(value || "").match(/(\d+)$/);
  return m ? Number(m[1]) : 0;
}

async function getWarpFeed(env) {
  const feed = await env.VOID_KV.get(WARP_FEED_KEY, "json");
  return Array.isArray(feed) ? feed : [];
}
async function saveWarpFeed(env, feed) { return env.VOID_KV.put(WARP_FEED_KEY, JSON.stringify(feed.slice(0, MAX_FEED_EVENTS))); }
async function pushWarpFeed(env, event) {
  const feed = await getWarpFeed(env);
  if (feed.some(x => x.id === event.id)) return;
  feed.unshift(event);
  await saveWarpFeed(env, feed);
}

async function getRegistry(env) {
  const r = await env.VOID_KV.get(REGISTRY_KEY, "json");
  if (!r) return { queue: [], spawnedHistory: [], lastSerialIndex: 0 };
  if (!Array.isArray(r.queue)) r.queue = [];
  if (!Array.isArray(r.spawnedHistory)) r.spawnedHistory = [];
  r.lastSerialIndex = Number(r.lastSerialIndex || 0);
  return r;
}
function saveRegistry(env, registry) { return env.VOID_KV.put(REGISTRY_KEY, JSON.stringify(registry)); }

async function getWarpState(env) {
  const w = await env.VOID_KV.get(WARP_STATE_KEY, "json");
  if (!w) return createEmptyWarpState();
  delete w.secret; delete w.claimAttempts; delete w.claimedBy; delete w.claimedAt; delete w.archivedAt; delete w.outcome; delete w.revealAt;
  if (!("nextArtifact" in w)) w.nextArtifact = null;
  if (!("nextSpawnAt" in w)) w.nextSpawnAt = null;
  if (!("expiresAt" in w)) w.expiresAt = null;
  if (!("lastOutcome" in w)) w.lastOutcome = null;
  return { ...createEmptyWarpState(), ...w };
}
function createEmptyWarpState() { return { warpId: 0, state: "IDLE", artifact: null, spawnedAt: null, expiresAt: null, nextArtifact: null, nextSpawnAt: null, lastOutcome: null }; }
function saveWarpState(env, warp) { return env.VOID_KV.put(WARP_STATE_KEY, JSON.stringify(warp)); }
function getArtifactId(a) { const v = a?.id || a?.artifact_id || a?.artifactId; return v ? String(v).trim() : null; }
function secureRandom() { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] / 4294967296; }
function randomInteger(min, max) { return Math.floor(secureRandom() * (max - min + 1)) + min; }
function normalizeTimestamp(v) { const n = Number(v); return v === null || v === undefined || !Number.isFinite(n) ? null : n; }
function base64ToUint8Array(base64) { const b = atob(base64), out = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) out[i] = b.charCodeAt(i); return out; }
async function safeJson(request) { try { return await request.json(); } catch { return {}; } }
function json(data, status = 200, cdnTtlSeconds = 0) {
  const headers = { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" };
  headers["Cache-Control"] = cdnTtlSeconds > 0 && status >= 200 && status < 300 ? `public, max-age=1, s-maxage=${cdnTtlSeconds}` : "no-store, no-cache, must-revalidate";
  return new Response(JSON.stringify(data), { status, headers });
}
