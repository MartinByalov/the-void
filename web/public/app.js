import { VoidAPI } from "./void-api.js";
import { getArtifactBySerial, generateBatchRegistry } from "./void-lexicon.js";

const app = document.querySelector("#app"), $ = s => document.querySelector(s);
const api = async (u, o = {}) => { let r = await fetch(u, { headers: { "content-type": "application/json" }, ...o }), x = await r.json(); if (!r.ok) throw Error(x.error || r.statusText); return x };
let timer = null, presenceTimer = null, visitorTimer = null, voidSnake = null, current = null, local = [], homeArchive = [], liveVisitors = 0, activeWitnesses = 0, selectedSecretSet = "", feedEvents = [], feedSnapshot = null, feedRenderSnapshot = null, chatSnapshot = null;

// Evolving instances registry stored in client storage
let evolvingInstances = {};
try {
  let s = JSON.parse(localStorage.getItem("void_collection") || "[]");
  if (Array.isArray(s)) local = s;
  let insts = JSON.parse(localStorage.getItem("void_evolving_instances") || "{}");
  if (insts && typeof insts === "object") evolvingInstances = insts;
} catch (e) {}

function saveLocal() {
  try {
    localStorage.setItem("void_collection", JSON.stringify(local));
    localStorage.setItem("void_evolving_instances", JSON.stringify(evolvingInstances));
  } catch (e) {}
}

function addToCollection(a) {
  if (a && !local.some(x => x.artifact_id === a.artifact_id)) {
    local.push(a);
    ensureInstanceRecord(a);
    saveLocal();
  }
}
function removeFromCollection(id) {
  local = local.filter(x => x.artifact_id !== id);
  saveLocal();
}

// Controller key management (Accountless WebCrypto)
let cachedControllerPublicKey = localStorage.getItem("void_controller_pubkey") || "";
async function getOrGenerateControllerKey() {
  if (cachedControllerPublicKey) return cachedControllerPublicKey;
  try {
    if (window.crypto && window.crypto.subtle) {
      const keyPair = await window.crypto.subtle.generateKey(
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["sign", "verify"]
      );
      const exported = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
      const b64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
      cachedControllerPublicKey = `PUB_ECDSA_${b64.slice(0, 32)}`;
      localStorage.setItem("void_controller_pubkey", cachedControllerPublicKey);
      return cachedControllerPublicKey;
    }
  } catch (e) {}
  cachedControllerPublicKey = `PUB_VOID_${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  localStorage.setItem("void_controller_pubkey", cachedControllerPublicKey);
  return cachedControllerPublicKey;
}

function ensureInstanceRecord(artifact) {
  if (!artifact) {
    return {
      instanceId: "VX-00000000",
      artifactId: "VA-UNKNOWN",
      controller: cachedControllerPublicKey || "ANONYMOUS_VOID_SOUL",
      revision: 0,
      evolution: {
        INSTINCT: 50,
        SIGNAL_SENSITIVITY: 50,
        PRESSURE_TOLERANCE: 50,
        OBSERVATION: 50
      },
      duels: 0,
      fusions: 0,
      provenance: [],
      rulesVersion: "void-evolution-v2.5"
    };
  }
  const id = String(artifact.artifact_id || artifact.artifactId || artifact.id || `VA-${Math.floor(Math.random() * 900000) + 100000}`);
  if (!artifact.artifact_id) artifact.artifact_id = id;
  const instId = `VX-${id.replace(/^VA-|^VOID-/, "").slice(0, 8)}`;
  if (!evolvingInstances[instId]) {
    evolvingInstances[instId] = {
      instanceId: instId,
      artifactId: id,
      controller: cachedControllerPublicKey || "ANONYMOUS_VOID_SOUL",
      revision: 0,
      evolution: {
        INSTINCT: 50 + (Number(artifact.seed || 1) % 25),
        SIGNAL_SENSITIVITY: 50 + ((Number(artifact.seed || 1) * 3) % 30),
        PRESSURE_TOLERANCE: 45 + ((Number(artifact.seed || 1) * 7) % 35),
        OBSERVATION: 55 + (Number(artifact.weirdness || 50) % 30)
      },
      duels: 0,
      fusions: 0,
      provenance: [],
      rulesVersion: "void-evolution-v2.5"
    };
    saveLocal();
  }
  let record = evolvingInstances[instId];
  if (!record || typeof record !== "object") {
    record = {
      instanceId: instId,
      artifactId: id,
      controller: cachedControllerPublicKey || "ANONYMOUS_VOID_SOUL",
      revision: 0,
      evolution: {
        INSTINCT: 50,
        SIGNAL_SENSITIVITY: 50,
        PRESSURE_TOLERANCE: 50,
        OBSERVATION: 50
      },
      duels: 0,
      fusions: 0,
      provenance: [],
      rulesVersion: "void-evolution-v2.5"
    };
    evolvingInstances[instId] = record;
  }
  if (!record.provenance || !Array.isArray(record.provenance)) record.provenance = [];
  if (!record.evolution || typeof record.evolution !== "object") {
    record.evolution = {
      INSTINCT: 50,
      SIGNAL_SENSITIVITY: 50,
      PRESSURE_TOLERANCE: 50,
      OBSERVATION: 50
    };
  }
  if (typeof record.revision !== "number") record.revision = 0;
  if (typeof record.duels !== "number") record.duels = 0;
  if (typeof record.fusions !== "number") record.fusions = 0;
  return record;
}

const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const fmt = s => `${String(Math.floor((s || 0) / 3600)).padStart(2, "0")}:${String(Math.floor((s || 0) % 3600 / 60)).padStart(2, "0")}:${String(Math.floor((s || 0) % 60)).padStart(2, "0")}`;
const weirdnessTier = value => ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"][Math.min(6, Math.floor(Math.max(0, Math.min(100, Number(value) || 0)) / (101 / 7)))];

function cv(a) {
  if (a && a.imageUrl) {
    let wrap = document.createElement("div");
    wrap.className = "vector-card-art render-3d-art";
    let img = document.createElement("img");
    img.src = a.imageUrl;
    img.alt = a.name || "";
    img.className = "fluent-3d-img";
    img.referrerPolicy = "no-referrer";
    img.onerror = () => {
      if (a.svg) {
        wrap.className = "vector-card-art";
        wrap.innerHTML = a.svg;
      }
    };
    wrap.append(img);
    let badge = document.createElement("span");
    badge.className = "fluent-badge";
    badge.textContent = "PROTOTYPE";
    wrap.append(badge);
    return wrap;
  }
  if (a && a.svg) {
    let wrap = document.createElement("div");
    wrap.className = "vector-card-art";
    wrap.innerHTML = a.svg;
    return wrap;
  }
  let c = document.createElement("canvas");
  c.width = c.height = 24;
  let g = c.getContext("2d");
  for (let y = 0; y < 24; y++) for (let x = 0; x < 24; x++) {
    g.fillStyle = a.pixels?.[y]?.[x] || "#050b14";
    g.fillRect(x, y, 1, 1);
  }
  return c;
}

function silhouette(pixels) {
  let wrap = document.createElement("div"), c = document.createElement("canvas"), g = c.getContext("2d");
  wrap.className = "queued-silhouette";
  c.width = c.height = 24;
  for (let y = 0; y < 24; y++) for (let x = 0; x < 24; x++) if (pixels?.[y]?.[x]) { g.fillStyle = "#020407"; g.fillRect(x, y, 1, 1); }
  wrap.append(c);
  return wrap;
}

function go(p) { history.pushState({}, '', p); route(); }
window.onpopstate = route;
document.addEventListener("click", e => {
  let a = e.target.closest("[data-link]");
  if (a) { e.preventDefault(); go(a.getAttribute("href")); }
});

function nav() {
  document.querySelectorAll("nav a").forEach(a => a.classList.toggle("active", location.pathname.startsWith(a.getAttribute("href"))));
}
function sys(t) { $("#sysmsg").textContent = t; }

async function route() {
  clearInterval(timer);
  clearInterval(presenceTimer);
  clearInterval(visitorTimer);
  setTabTitle(false);
  nav();
  visitorTimer = setInterval(refreshActivity, 5000);
  if (location.pathname !== "/" && location.pathname !== "/void") refreshActivity();
  
  let p = location.pathname;
  if (p === "/" || p === "/void") return voidHome();
  if (p === "/archive") return archive();
  if (p.startsWith("/archive/")) return detail(decodeURIComponent(p.split("/").pop()));
  if (p === "/collection") return collection();
  if (p === "/fusion") return fusionChamber();
  if (p === "/duels") return duelArena();
  if (p === "/generator") return generatorView();
  if (p === "/vault") return vaultView();
  
  app.innerHTML = '<section class="panel wide empty">NOTHING IS HERE.</section>';
}

async function voidHome() {
  sys("THE VOID // WARP SIGNAL");
  try {
    const result = await VoidAPI.getWarp();
    current = result?.warp || null;
  } catch (error) {
    console.error("THE VOID WARP ERROR:", error);
    current = null;
  }
  homeArchive = [];
  drawHome(current, homeArchive);

  timer = setInterval(async () => {
    try {
      const result = await VoidAPI.getWarp();
      const next = result?.warp || null;
      const before = current ? `${current.warpId}|${current.state}|${current.artifact?.id || ""}|${current.claimedAt || ""}|${current.archivedAt || ""}` : "NONE";
      const after = next ? `${next.warpId}|${next.state}|${next.artifact?.id || ""}|${next.claimedAt || ""}|${next.archivedAt || ""}` : "NONE";
      current = next;
      if (before !== after) drawHome(current, homeArchive);
      else updateHome(current);
    } catch (error) {
      console.error("WARP refresh failed:", error);
    }
  }, 5000);

  presenceTimer = setInterval(() => updateHome(current), 1000);
}

async function refreshActivity() { return; }
async function refreshChat() { return; }

function getWarpElapsedSeconds(warp) {
  if (!warp?.spawnedAt) return 0;
  const start = Number(warp.spawnedAt);
  if (!Number.isFinite(start)) return 0;
  const end = Number(warp.claimedAt || warp.archivedAt || Date.now());
  return Number.isFinite(end) ? Math.max(0, Math.floor((end - start) / 1000)) : 0;
}

function formatWarpTime(totalSeconds) {
  const seconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  return h > 0
    ? [h, String(m).padStart(2, "0"), String(sec).padStart(2, "0")].join(":")
    : [String(m).padStart(2, "0"), String(sec).padStart(2, "0")].join(":");
}

function getVoidClaimId() {
  const key = "void_claim_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function drawHome(warp, arc = []) {
  if (!warp || warp.state === "IDLE" || !warp.artifact) {
    sys("THE VOID // NO ACTIVE WARP");
    app.innerHTML = `
      <section class="platform">
        <aside class="panel feedpanel"><h3>LIVE FEED</h3><div id="feed"><div class="event"><time>--:--</time><div>THE VOID is waiting for the next signal.</div></div></div></aside>
        <section class="panel lotpanel">
          <div class="panel-title"><h2>NO ACTIVE ARTIFACT</h2></div>
          <div class="lotgrid">
            <div><div class="artifact-stage" id="stage"><button class="mystery" type="button" aria-label="Open The Void support window"><span class="mystery-question">?</span></button></div><div class="activity-strip"><span>WARP: <b>OFFLINE</b></span></div><div id="trace-slot"></div></div>
            <div id="lotdetails"><div class="lot-kicker">THE VOID IS QUIET</div><p>No Artifact is currently passing through the WARP.</p><div class="statbox current-lot-stats">${kv("Classification", "???")}${kv("Rarity", "???")}${kv("Origin", "???")}${kv("Weirdness", "???")}</div><p class="condition">Awaiting the next signal...</p></div>
          </div>
        </section>
        <section id="warp-chat" class="panel warp-chat"><div class="warp-chat-head"><h3>WARP TELEMETRY</h3></div><div class="chat-empty">NO ACTIVE SIGNAL.</div></section>
        <section class="panel recentpanel"><div class="panel-title"><h2>RECENTLY DISCOVERED</h2></div><div class="recent-slider"><div class="recentgrid" id="recent"></div></div></section>
      </section>`;
    const mystery = $("#stage .mystery");
    if (mystery) mystery.onclick = showAbout;
    drawRecent(arc.slice(0, 12));
    setTabTitle(false);
    return;
  }

  const a = warp.artifact;
  const warpId = warp.warpId ?? "?";
  const elapsed = formatWarpTime(getWarpElapsedSeconds(warp));
  const active = warp.state === "ACTIVE";
  const claimed = warp.state === "CLAIMED";
  const gone = warp.state === "ARCHIVED";
  sys(`WARP #${warpId} // ${esc(warp.state || "UNKNOWN")}`);

  app.innerHTML = `
    <section class="platform">
      <aside class="panel feedpanel"><h3>LIVE FEED</h3><div id="feed"><div class="event"><time>LIVE</time><div>WARP #${esc(warpId)} is ${active ? "active" : esc(String(warp.state || "unknown").toLowerCase())}.</div></div><div class="event"><time>VOID</time><div>${claimed ? "The Artifact has been claimed." : gone ? "The trace has disappeared." : "An unknown Artifact is passing through the signal."}</div></div></div></aside>
      <section class="panel lotpanel">
        <div class="panel-title"><h2>${claimed ? esc(a.name || "ARTIFACT") : gone ? "TRACE LOST" : "UNKNOWN ARTIFACT"}</h2></div>
        <div class="lotgrid">
          <div><div class="artifact-stage" id="stage"></div><div class="activity-strip"><span>WARP: <b>#${esc(warpId)}</b></span><span>ELAPSED: <b id="warp-elapsed">${elapsed}</b></span></div><div id="trace-slot"></div></div>
          <div id="lotdetails">
            <div class="lot-kicker">CURRENT WARP #${esc(warpId)}</div>
            <p>${claimed ? "The Artifact has emerged from THE VOID." : gone ? "Only a trace remains." : "Its true nature is hidden... for now."}</p>
            <div class="statbox current-lot-stats">
              ${kv("Classification", claimed ? (a.classification || a.taxonomy?.classType || "UNKNOWN") : "???")}
              <div class="rarity-row"><span>Rarity</span><b><span class="rarity ${claimed ? esc(a.rarity || "") : "hidden-rarity"}">${claimed ? esc(a.rarity || "UNKNOWN") : "???"}</span></b></div>
              ${kv("Origin", claimed ? (a.taxonomy?.category || "UNKNOWN") : "???")}
              ${kv("Weirdness", claimed ? String(a.weirdness ?? "UNKNOWN") : "???")}
            </div>
            <p class="condition">${active ? "The condition is unknown." : claimed ? "CLAIMED." : "THE VOID HAS CLOSED."}</p>
            <div class="participation-actions lot-action-height">
              ${active ? `<button class="join" id="warp-claim-timer" type="button" title="Attempt claim"><span id="warp-claim-clock">${elapsed}</span></button><div id="warp-claim-message" class="muted" style="min-height:24px;margin-top:10px"></div>` : `<button class="join joined" type="button" disabled><span>${elapsed}</span></button>`}
            </div>
          </div>
        </div>
      </section>
      <section id="warp-chat" class="panel warp-chat"><div class="warp-chat-head"><h3>WARP TELEMETRY</h3></div><div class="chat-empty">SIGNAL ${esc(a.id || "UNKNOWN")} DETECTED · ${claimed ? "ARTIFACT CLAIMED" : gone ? "TRACE CLOSED" : "CONTENT SEALED"}</div></section>
      <section class="panel recentpanel"><div class="panel-title"><h2>RECENTLY DISCOVERED</h2></div><div class="recent-slider"><div class="recentgrid" id="recent"></div><button class="recent-nav recent-nav-prev" id="recent-prev" type="button" aria-label="Show previous discoveries">←</button><button class="recent-nav recent-nav-next" id="recent-next" type="button" aria-label="Show next discoveries">→</button></div></section>
    </section>`;

  const st = $("#stage");
  if (st) {
    const mystery = document.createElement("button");
    mystery.type = "button";
    mystery.className = `mystery mystery-shape-${Math.abs(Number(warpId) || 0) % 20}`;
    mystery.setAttribute("aria-label", "Open The Void support window");
    mystery.innerHTML = '<span class="mystery-question">?</span>';
    mystery.onclick = showAbout;
    st.append(mystery);
    setupSecretStage(st, mystery);
  }

  drawRecent(arc.slice(0, 12));
  if (active) bindClaimButton();
  updateHome(warp);
}

function bindClaimButton() {
  const button = $("#warp-claim-timer");
  if (!button) return;
  button.onclick = async () => {
    if (button.disabled) return;
    const message = $("#warp-claim-message");
    button.disabled = true;
    try {
      const result = await VoidAPI.claimWarp(getVoidClaimId());
      if (result.result === "NOT_YET") {
        if (message) message.textContent = "NOTHING HAPPENED.";
        setTimeout(() => { const m = $("#warp-claim-message"); if (m) m.textContent = ""; }, 1800);
        return;
      }
      if (result.result === "CLAIMED" || result.result === "GONE") {
        current = result.warp || current;
        drawHome(current, homeArchive);
        return;
      }
      if (message) message.textContent = "THE VOID DID NOT RESPOND.";
    } catch (error) {
      console.error("CLAIM ERROR:", error);
      if (message) message.textContent = "THE VOID DID NOT RESPOND.";
    } finally {
      if (document.body.contains(button)) button.disabled = false;
    }
  };
}

function updateHome(warp) {
  if (!warp) { setTabTitle(false); return; }
  const seconds = getWarpElapsedSeconds(warp);
  const elapsed = formatWarpTime(seconds);
  if ($("#warp-elapsed")) $("#warp-elapsed").textContent = elapsed;
  if ($("#warp-claim-clock")) $("#warp-claim-clock").textContent = elapsed;
  setTabTitle(warp.state === "ACTIVE", seconds);
}

function drawRecent(a) {
  let g = $("#recent");
  if (!g) return;
  g.innerHTML = "";
  let previous = $("#recent-prev"), next = $("#recent-next");
  for (let x of a) {
    let c = document.createElement("article");
    c.className = "artifactcard flip-card recent-artifact-card";
    c.innerHTML = `<div class="card-face card-front"><div class=cardart></div><div class=cardbody><small class=card-class>${esc(x.classification)}</small><b class="card-name rarity-name ${esc(x.rarity)}">${esc(x.name)}</b><small class="card-weirdness recent-weirdness">👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${x.weirdness}</span></small></div></div><div class="card-face card-back"><span class="void-orb-mark">◉</span><small class="recent-back-id"></small></div>`;
    c.querySelector(".cardart").append(cv(x));
    c.onclick = () => c.classList.toggle("is-flipped");
    let nb = c.querySelector(".card-name");
    if (nb) nb.onclick = e => { e.stopPropagation(); collectionDetail(x); };
    g.append(c);
  }
  let updateNavigation = () => {
    let atStart = g.scrollLeft <= 1, atEnd = g.scrollLeft + g.clientWidth >= g.scrollWidth - 1;
    if (previous) previous.disabled = atStart;
    if (next) next.disabled = atEnd;
  };
  let move = direction => {
    let card = g.querySelector(".recent-artifact-card"), amount = (card?.getBoundingClientRect().width || g.clientWidth) + 9;
    g.scrollBy({ left: direction * amount, behavior: "smooth" });
  };
  if (previous) previous.onclick = () => move(-1);
  if (next) next.onclick = () => move(1);
  g.onscroll = updateNavigation;
  requestAnimationFrame(updateNavigation);
  initCardTilt();
}

function showToast(message) {
  $("#toast")?.remove();
  app.insertAdjacentHTML("beforeend", `<div class="modal toast-modal" id=toast><div class="panel modalbox"><strong>${esc(message)}</strong><button class="join understood-button" id=toastclose>UNDERSTOOD</button></div></div>`);
  $("#toastclose").onclick = () => $("#toast")?.remove();
}

function showAbout() {
  if ($("#modal")) return;
  app.insertAdjacentHTML("beforeend", `<div class=modal id=modal><div class="panel modalbox"><button class=modal-x id=modalx aria-label="Close"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"></line><line x1="12" y1="2" x2="2" y2="12"></line></svg></button><h2>THE VOID</h2><div class=voidq>◉</div><strong>UNKNOWN DEPTH</strong><p>Ideas enter here. Artifacts sometimes return.</p><a class=coffee-button href="https://www.buymeacoffee.com/thevoid" target="_blank" rel="noopener noreferrer"><img class="mx-auto h-14" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee"></a></div></div>`);
  let close = () => $("#modal")?.remove();
  $("#modalx").onclick = close;
  $("#modal").onclick = e => { if (e.target.id === "modal") close(); };
  document.onkeydown = e => { if (e.key === "Escape") close(); };
}

async function archive() {
  sys("ARCHIVE SIGNAL ACQUIRED");
  let all = await api("/api/archive"), rarities = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"];
  app.innerHTML = `<section class="panel wide"><div class=archive-top><div><button class="section-back" id="archive-back" type="button" aria-label="Back to The Void">←</button><div class=eyebrow>PERMANENT PUBLIC RECORD</div><h1>THE ARCHIVE</h1><p>Artifacts that escaped THE VOID.</p></div><div class=filters><input id=q placeholder="SEARCH"><select id=archive-sort aria-label="Sort artifacts alphabetically"><option value="asc">NAME A–Z</option><option value="desc">NAME Z–A</option></select><select class="rarity-filter" id=r><option value="">ALL RARITIES</option>${rarities.map(r => `<option class="rarity-option ${r}">${r}</option>`).join("")}</select><select id=c><option value="">ALL CLASSES</option></select></div></div><div class=summary>${sum("ARTIFACTS", all.length)}${sum("TOTAL WEIRDNESS", all.reduce((s, x) => s + x.weirdness, 0))}${sum("LEGENDARY+", all.filter(x => ["LEGENDARY", "MYTHIC", "DIVINE"].includes(x.rarity)).length)}${sum("WEIRDEST", all.length ? Math.max(...all.map(x => x.weirdness)) : 0)}</div><div class=archivegrid id=agrid></div></section>`;
  $("#archive-back").onclick = () => go("/void");
  [...new Set(all.map(x => x.classification))].sort().forEach(x => $("#c").insertAdjacentHTML("beforeend", `<option>${esc(x)}</option>`));
  function filter() {
    updateRarityFilter($("#r"));
    let q = $("#q").value.toLowerCase(), r = $("#r").value, c = $("#c").value, order = $("#archive-sort").value, items = all.filter(x => (!q || (x.name + " " + x.artifact_id).toLowerCase().includes(q)) && (!r || x.rarity === r) && (!c || x.classification === c));
    items.sort((a, b) => order === "desc" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
    drawArchive(items);
  }
  ["#q", "#archive-sort", "#r", "#c"].forEach(x => $(x).oninput = filter);
  ["#archive-sort", "#r"].forEach(x => $(x).onchange = filter);
  filter();
}

const sum = (n, v) => `<div><b>${v}</b><small>${n}</small></div>`;
function drawArchive(a) {
  let g = $("#agrid");
  g.innerHTML = "";
  if (!a.length) {
    g.innerHTML = '<div class="empty archive-empty" aria-label="No artifacts"><span class="void-orb">◉</span></div>';
    return;
  }
  for (let x of a) {
    let c = document.createElement("article");
    c.className = "artifactcard archive-artifact-card record-card";
    c.tabIndex = 0;
    c.setAttribute("role", "button");
    c.setAttribute("aria-label", `Open archive record for ${x.name}`);
    c.innerHTML = `<small class="record-card-id">#${esc(x.artifact_id)}</small><small class=card-class>${esc(x.classification)}</small><b class="card-name rarity-name ${esc(x.rarity)}">${esc(x.name)}</b><small class=card-weirdness>👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${esc(x.weirdness)}</span></small><small class="record-card-status">ARCHIVED RECORD</small>`;
    let openRecord = () => {
      history.pushState({}, '', `/archive/${encodeURIComponent(x.artifact_id)}`);
      collectionDetail(x);
    };
    c.onclick = openRecord;
    c.onkeydown = event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openRecord(); } };
    g.append(c);
  }
}

async function detail(id) {
  sys("🔎 ARCHIVE RECORD");
  let all = await api("/api/archive"), a = all.find(x => x.artifact_id === id);
  if (!a) {
    app.innerHTML = '<section class="panel wide empty">❓ RECORD NOT FOUND.</section>';
    return;
  }
  await archive();
  collectionDetail(a);
}

const rr = (a, b) => `<div class=recordrow><span>${esc(a)}</span><span>${esc(b)}</span></div>`;
const weirdnessRow = value => `<div class=recordrow><span>WEIRDNESS</span><span class="detail-weirdness weirdness-val ${weirdnessTier(value)}">${esc(value)}</span></div>`;
const updateRarityFilter = select => { if (!select) return; select.className = `rarity-filter ${select.value || "ALL"}`; };

let audioCtx = null;
function playArtifactResonance(seed, weirdness) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();
    let now = audioCtx.currentTime;
    let baseFreq = 75 + (Number(seed || 100) % 280) + Number(weirdness || 50) * 1.8;
    osc.type = weirdness > 85 ? "sawtooth" : weirdness > 70 ? "triangle" : "sine";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.4, now + 0.7);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 1.8);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 2.2);
  } catch(e) {}
}

function initCardTilt() {
  document.querySelectorAll(".artifactcard").forEach(card => {
    if (card._tiltInit) return;
    card._tiltInit = true;
    card.addEventListener("mousemove", e => {
      let rect = card.getBoundingClientRect();
      let x = e.clientX - rect.left - rect.width / 2;
      let y = e.clientY - rect.top - rect.height / 2;
      let rx = -(y / (rect.height / 2)) * 8;
      let ry = (x / (rect.width / 2)) * 8;
      card.style.transform = `perspective(800px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ============================================================================
// ✦ FUSION SYSTEM (CHAMBER & BRIDGE DETECTOR)
// ============================================================================
let fusionSlotA = null;
let fusionSlotB = null;

async function fusionChamber() {
  sys("✦ THE VOID FUSION CHAMBER ✦");
  await getOrGenerateControllerKey();
  
  // Provide sample fallback candidates if collection empty
  let candidates = [...local];
  if (candidates.length < 2) {
    try {
      let samplesRes = await api("/api/generator-samples?count=8");
      if (samplesRes.samples) {
        for (let s of samplesRes.samples) {
          if (!candidates.some(c => c.artifact_id === s.artifact_id)) candidates.push(s);
        }
      }
    } catch {}
  }

  if (!fusionSlotA && candidates.length > 0) fusionSlotA = candidates[0];
  if (!fusionSlotB && candidates.length > 1) fusionSlotB = candidates[1];

  app.innerHTML = `
    <section class="panel wide fusion-panel">
      <div class="archive-top">
        <div>
          <button class="section-back" id="fusion-back" type="button" aria-label="Back to The Void">←</button>
          <div class="eyebrow">SEMANTIC SYNTHESIS &amp; WORLD MEMORY</div>
          <h1>✦ FUSION CHAMBER</h1>
          <p>Artifacts are not destroyed or traded away. Present two discovered concepts to THE VOID: discover semantic bridges and evolve instance stats.</p>
        </div>
        <div class="controller-badge">
          <span>CONTROLLER: <b style="color:var(--cyan)">${esc(cachedControllerPublicKey.slice(0, 16))}...</b></span>
        </div>
      </div>

      <div class="fusion-stage-grid">
        <!-- SLOT A -->
        <div class="fusion-slot-box" id="slot-a-box">
          <div class="slot-header">
            <span>ARTIFACT A (SOURCE CONSTRUCT)</span>
            <button class="understood-button" id="btn-choose-a" type="button">SELECT FROM VAULT</button>
          </div>
          <div class="slot-card" id="slot-a-card"></div>
        </div>

        <!-- FUSION CORE / BRIDGES -->
        <div class="fusion-core-box">
          <div class="fusion-orb-center">
            <span class="void-orb">✦</span>
          </div>
          <div id="fusion-analysis-view" class="fusion-analysis-view">
            <div class="analyzing-text">CALCULATING SEMANTIC RESONANCE...</div>
          </div>
          <div class="fusion-action-area">
            <button class="join fusion-execute-btn" id="btn-execute-fusion" type="button" disabled>
              ✦ INITIATE FUSION WITH THE VOID ✦
            </button>
          </div>
        </div>

        <!-- SLOT B -->
        <div class="fusion-slot-box" id="slot-b-box">
          <div class="slot-header">
            <span>ARTIFACT B (TARGET GESTALT)</span>
            <button class="understood-button" id="btn-choose-b" type="button">SELECT FROM VAULT</button>
          </div>
          <div class="slot-card" id="slot-b-card"></div>
        </div>
      </div>

      <div class="fusion-outcome-banner" id="fusion-outcome-banner" style="display:none"></div>
    </section>
  `;

  $("#fusion-back").onclick = () => go("/void");
  $("#btn-choose-a").onclick = () => openFusionPicker("A", candidates);
  $("#btn-choose-b").onclick = () => openFusionPicker("B", candidates);

  renderFusionSlots();
  analyzeCurrentFusion();

  $("#btn-execute-fusion").onclick = async () => {
    if (!fusionSlotA || !fusionSlotB) return;
    let btn = $("#btn-execute-fusion");
    btn.disabled = true;
    btn.textContent = "✦ COMMUNICATING WITH THE VOID...";

    try {
      let instA = ensureInstanceRecord(fusionSlotA);
      let instB = ensureInstanceRecord(fusionSlotB);

      let payload = {
        instanceA: instA.instanceId,
        revisionA: instA.revision,
        artifactA: fusionSlotA,
        controllerA: cachedControllerPublicKey,
        instanceB: instB.instanceId,
        revisionB: instB.revision,
        artifactB: fusionSlotB,
        controllerB: cachedControllerPublicKey
      };

      let res = await api("/api/fusion", { method: "POST", body: JSON.stringify(payload) });
      
      // Update local evolving instances with authoritative signed certificates
      if (res.instanceA?.certificate) evolvingInstances[instA.instanceId] = res.instanceA.certificate;
      if (res.instanceB?.certificate) evolvingInstances[instB.instanceId] = res.instanceB.certificate;
      saveLocal();

      playArtifactResonance(fusionSlotA.seed, 95);
      showFusionSuccess(res);
    } catch (e) {
      showToast(`⚠ FUSION ERROR: ${e.message}`);
    } finally {
      btn.disabled = false;
      btn.textContent = "✦ INITIATE FUSION WITH THE VOID ✦";
    }
  };
}

function renderFusionSlots() {
  let cardA = $("#slot-a-card");
  let cardB = $("#slot-b-card");
  if (cardA) {
    if (fusionSlotA) {
      cardA.innerHTML = `
        <div class="slot-art" id="art-slot-a"></div>
        <div class="slot-meta">
          <small class="rarity ${esc(fusionSlotA.rarity)}">${esc(fusionSlotA.rarity)}</small>
          <h3>${esc(fusionSlotA.name)}</h3>
          <small>#${esc(fusionSlotA.artifact_id)} · ${esc(fusionSlotA.classification)}</small>
        </div>
      `;
      cardA.querySelector("#art-slot-a").append(cv(fusionSlotA));
    } else {
      cardA.innerHTML = `<div class="empty-slot-prompt">SELECT FIRST ARTIFACT</div>`;
    }
  }

  if (cardB) {
    if (fusionSlotB) {
      cardB.innerHTML = `
        <div class="slot-art" id="art-slot-b"></div>
        <div class="slot-meta">
          <small class="rarity ${esc(fusionSlotB.rarity)}">${esc(fusionSlotB.rarity)}</small>
          <h3>${esc(fusionSlotB.name)}</h3>
          <small>#${esc(fusionSlotB.artifact_id)} · ${esc(fusionSlotB.classification)}</small>
        </div>
      `;
      cardB.querySelector("#art-slot-b").append(cv(fusionSlotB));
    } else {
      cardB.innerHTML = `<div class="empty-slot-prompt">SELECT SECOND ARTIFACT</div>`;
    }
  }
}

async function analyzeCurrentFusion() {
  let analysisView = $("#fusion-analysis-view");
  let execBtn = $("#btn-execute-fusion");
  if (!analysisView) return;

  if (!fusionSlotA || !fusionSlotB || fusionSlotA.artifact_id === fusionSlotB.artifact_id) {
    analysisView.innerHTML = `<div class="analyzing-text" style="color:var(--muted)">SELECT TWO DISTINCT ARTIFACTS TO WITNESS SEMANTIC BRIDGES</div>`;
    if (execBtn) execBtn.disabled = true;
    return;
  }

  try {
    let result = await api("/api/fusion/analyze", {
      method: "POST",
      body: JSON.stringify({ artifactA: fusionSlotA, artifactB: fusionSlotB })
    });

    let { bridges, quality, semA, semB } = result;
    let bridgesHtml = bridges.map(b => `
      <div class="bridge-item">
        <span class="b-src">${esc(b.source.toUpperCase())}</span>
        <span class="b-arrow">↔</span>
        <span class="b-tgt">${esc(b.target.toUpperCase())}</span>
        <small class="b-rel">${esc(b.relation)}</small>
      </div>
    `).join("");

    analysisView.innerHTML = `
      <div class="analysis-status-row">
        <div class="analysis-stat">
          <span class="stat-lbl">STATUS</span>
          <b class="status-${quality.status}">${esc(quality.status)}</b>
        </div>
        <div class="analysis-stat">
          <span class="stat-lbl">COHERENCE</span>
          <b>${Math.round(quality.coherence * 100)}%</b>
        </div>
        <div class="analysis-stat">
          <span class="stat-lbl">NOVELTY</span>
          <b>${Math.round(quality.novelty * 100)}%</b>
        </div>
      </div>
      <div class="bridge-list-header">DISCOVERED SEMANTIC BRIDGES (${bridges.length})</div>
      <div class="bridges-container">${bridgesHtml}</div>
    `;

    if (execBtn) execBtn.disabled = quality.status === "REJECTED";
  } catch (e) {
    analysisView.innerHTML = `<div class="analyzing-text" style="color:var(--pink)">FAILED TO ANALYZE BRIDGES</div>`;
    if (execBtn) execBtn.disabled = true;
  }
}

function showFusionSuccess(res) {
  let banner = $("#fusion-outcome-banner");
  if (!banner) return;
  banner.style.display = "block";
  banner.innerHTML = `
    <div class="outcome-box">
      <div class="outcome-header">
        <span class="void-orb">✦</span>
        <h2>${res.worldEffect.learnedMessage}</h2>
      </div>
      <p class="outcome-concept">Discovered Gestalt: <b>${esc(res.candidateTitle)}</b> (${esc(res.conceptA)} × ${esc(res.conceptB)})</p>
      <div class="outcome-grid">
        <div class="outcome-inst">
          <strong>${esc(fusionSlotA.name)} [REVISION ${res.instanceA.certificate.revision}]</strong>
          <div class="stat-deltas">
            ${res.instanceA.shifts.map(s => `<span class="delta-tag ${s.delta >= 0 ? 'pos' : 'neg'}">${s.delta >= 0 ? '+' : ''}${s.delta} ${esc(s.stat)}</span>`).join(" ")}
          </div>
        </div>
        <div class="outcome-inst">
          <strong>${esc(fusionSlotB.name)} [REVISION ${res.instanceB.certificate.revision}]</strong>
          <div class="stat-deltas">
            ${res.instanceB.shifts.map(s => `<span class="delta-tag ${s.delta >= 0 ? 'pos' : 'neg'}">${s.delta >= 0 ? '+' : ''}${s.delta} ${esc(s.stat)}</span>`).join(" ")}
          </div>
        </div>
      </div>
      <div class="outcome-footer">
        <small>Total Void Fusions Observed: ${res.worldEffect.totalObserved} · Cryptographically Signed by Void Engine</small>
        <button class="join understood-button" id="btn-close-outcome" type="button">CONTINUE</button>
      </div>
    </div>
  `;
  $("#btn-close-outcome").onclick = () => {
    banner.style.display = "none";
    analyzeCurrentFusion();
  };
}

function openFusionPicker(slot, candidates) {
  $("#fusion-picker-modal")?.remove();
  let otherSlot = slot === "A" ? fusionSlotB : fusionSlotA;
  let validCandidates = candidates.filter(c => !otherSlot || c.artifact_id !== otherSlot.artifact_id);

  app.insertAdjacentHTML("beforeend", `
    <div class="modal" id="fusion-picker-modal">
      <div class="panel modalbox fusion-picker-box">
        <div class="trade-modal-top">
          <div>
            <div class="eyebrow">CHOOSE ARTIFACT FOR SLOT ${slot}</div>
            <h2>SELECT VAULT CONSTRUCT</h2>
            <p>Select an authentic artifact to connect in the fusion chamber.</p>
          </div>
          <button class="archive-close collection-close" id="fusion-picker-x" type="button" aria-label="Close picker"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"></line><line x1="12" y1="2" x2="2" y2="12"></line></svg></button>
        </div>
        <div class="trade-collection-grid" id="fusion-picker-grid">
          ${validCandidates.map(x => `
            <button class="trade-collection-item" type="button" data-id="${esc(x.artifact_id)}">
              <b class="rarity-name ${esc(x.rarity)}">${esc(x.name)}</b>
              <small>#${esc(x.artifact_id)} · ${esc(x.classification)} · 👁 ${x.weirdness}</small>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `);

  const close = () => $("#fusion-picker-modal")?.remove();
  $("#fusion-picker-x").onclick = close;
  $("#fusion-picker-modal").onclick = e => { if (e.target.id === "fusion-picker-modal") close(); };

  $("#fusion-picker-grid").querySelectorAll(".trade-collection-item").forEach(item => {
    item.onclick = () => {
      let chosen = candidates.find(x => x.artifact_id === item.getAttribute("data-id"));
      if (chosen) {
        if (slot === "A") fusionSlotA = chosen;
        else fusionSlotB = chosen;
        close();
        renderFusionSlots();
        analyzeCurrentFusion();
      }
    };
  });
}

// ============================================================================
// ⚔️ SEMANTIC DUEL ARENA & ANOMALY TRIALS
// ============================================================================
let activeDuelInstance = null;
let activeEnvironment = null;
let activeManeuver = null;

async function duelArena() {
  sys("⚔️ SEMANTIC DUEL ARENA // ANOMALY TRIALS");
  await getOrGenerateControllerKey();

  let envs = await api("/api/duel/environments");
  if (!activeEnvironment && envs.length > 0) activeEnvironment = envs[0];

  let candidates = [...local];
  if (candidates.length === 0) {
    try {
      let samplesRes = await api("/api/generator-samples?count=4");
      if (samplesRes.samples) candidates = samplesRes.samples;
    } catch {}
  }
  if (!activeDuelInstance && candidates.length > 0) activeDuelInstance = candidates[0];

  app.innerHTML = `
    <section class="panel wide duel-panel">
      <div class="archive-top">
        <div>
          <button class="section-back" id="duel-back" type="button" aria-label="Back to The Void">←</button>
          <div class="eyebrow">SEMANTIC TRIALS &amp; INSTANCE REVISION</div>
          <h1>⚔️ SEMANTIC DUELS &amp; ANOMALIES</h1>
          <p>Deploy your evolving instance into extreme environmental chambers. Execute tactical maneuvers based on authentic semantic properties.</p>
        </div>
        <div class="controller-badge">
          <span>CONTROLLER: <b style="color:var(--green)">${esc(cachedControllerPublicKey.slice(0, 16))}...</b></span>
        </div>
      </div>

      <div class="duel-layout-grid">
        <!-- LEFT: INSTANCE DEPLOYMENT -->
        <div class="duel-section-box">
          <div class="slot-header">
            <span>DEPLOYED INSTANCE</span>
            <button class="understood-button" id="btn-change-duel-inst" type="button">SWITCH INSTANCE</button>
          </div>
          <div id="deployed-instance-card" class="deployed-instance-card"></div>
        </div>

        <!-- CENTER & RIGHT: ARENA & MANEUVERS -->
        <div class="duel-section-box duel-main-arena">
          <div class="slot-header">
            <span>SELECT ENVIRONMENTAL ANOMALY</span>
          </div>
          <div class="arena-selector-tabs" id="arena-selector-tabs">
            ${envs.map(env => `
              <button class="arena-tab ${activeEnvironment?.id === env.id ? 'active' : ''}" type="button" data-env-id="${esc(env.id)}">
                ${esc(env.name)}
              </button>
            `).join("")}
          </div>

          <div class="env-condition-card" id="env-condition-card"></div>

          <div class="maneuvers-header">TACTICAL SEMANTIC MANEUVERS</div>
          <div class="maneuvers-list" id="maneuvers-list"></div>

          <div class="duel-action-row">
            <button class="join duel-engage-btn" id="btn-engage-duel" type="button">
              ⚔️ ENGAGE ANOMALY TRIAL ⚔️
            </button>
          </div>

          <div id="duel-result-box" class="duel-result-box" style="display:none"></div>
        </div>
      </div>
    </section>
  `;

  $("#duel-back").onclick = () => go("/void");
  $("#btn-change-duel-inst").onclick = () => openDuelInstancePicker(candidates);

  renderDeployedInstance();
  renderEnvironmentDetails();

  document.querySelectorAll(".arena-tab").forEach(tab => {
    tab.onclick = () => {
      let id = tab.getAttribute("data-env-id");
      activeEnvironment = envs.find(e => e.id === id) || envs[0];
      activeManeuver = activeEnvironment.maneuvers[0];
      document.querySelectorAll(".arena-tab").forEach(t => t.classList.toggle("active", t.getAttribute("data-env-id") === id));
      renderEnvironmentDetails();
    };
  });

  $("#btn-engage-duel").onclick = async () => {
    if (!activeDuelInstance || !activeEnvironment || !activeManeuver) return;
    let btn = $("#btn-engage-duel");
    btn.disabled = true;
    btn.textContent = "⚔️ RESOLVING ANOMALY ENCOUNTER...";

    try {
      let inst = ensureInstanceRecord(activeDuelInstance);
      let payload = {
        instanceId: inst.instanceId,
        currentRevision: inst.revision,
        artifact: activeDuelInstance,
        controller: cachedControllerPublicKey,
        environmentId: activeEnvironment.id,
        selectedManeuverId: activeManeuver.id
      };

      let result = await api("/api/duel/resolve", { method: "POST", body: JSON.stringify(payload) });

      if (result.certificate) {
        evolvingInstances[inst.instanceId] = result.certificate;
        saveLocal();
      }

      playArtifactResonance(activeDuelInstance.seed, 90);
      showDuelResult(result);
      renderDeployedInstance();
    } catch (e) {
      showToast(`⚠ DUEL RESOLUTION ERROR: ${e.message}`);
    } finally {
      btn.disabled = false;
      btn.textContent = "⚔️ ENGAGE ANOMALY TRIAL ⚔️";
    }
  };
}

function renderDeployedInstance() {
  let card = $("#deployed-instance-card");
  if (!card) return;
  if (!activeDuelInstance) {
    card.innerHTML = `<div class="empty">NO INSTANCE DEPLOYED</div>`;
    return;
  }

  let inst = ensureInstanceRecord(activeDuelInstance);
  let evStats = inst.evolution || {};

  card.innerHTML = `
    <div class="deployed-art" id="art-deployed"></div>
    <div class="deployed-details">
      <small class="rarity ${esc(activeDuelInstance.rarity)}">${esc(activeDuelInstance.rarity)} · REVISION ${inst.revision}</small>
      <h2>${esc(activeDuelInstance.name)}</h2>
      <small style="color:var(--muted)">ID: #${esc(inst.instanceId)} · DUELS: ${inst.duels} · FUSIONS: ${inst.fusions}</small>
      
      <div class="instance-stats-list">
        <div class="inst-stat-header">EVOLVED SEMANTIC PROPERTIES</div>
        ${Object.entries(evStats).map(([k, v]) => `
          <div class="stat-bar-row">
            <span>${esc(k.replace(/_/g, " "))}</span>
            <b>${v}</b>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${Math.min(100, v)}%"></div></div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  card.querySelector("#art-deployed").append(cv(activeDuelInstance));
}

function renderEnvironmentDetails() {
  let envCard = $("#env-condition-card");
  let maneuversList = $("#maneuvers-list");
  if (!envCard || !activeEnvironment) return;

  envCard.innerHTML = `
    <div class="env-head">
      <h3>${esc(activeEnvironment.name)}</h3>
    </div>
    <div class="env-conditions-grid">
      ${Object.entries(activeEnvironment.conditions).map(([k, v]) => `
        <div class="env-cond-item"><small>${esc(k)}</small><b>${esc(v)}</b></div>
      `).join("")}
    </div>
  `;

  if (!activeManeuver) activeManeuver = activeEnvironment.maneuvers[0];

  maneuversList.innerHTML = activeEnvironment.maneuvers.map(m => `
    <div class="maneuver-card ${activeManeuver?.id === m.id ? 'selected' : ''}" data-m-id="${esc(m.id)}">
      <div class="m-head">
        <b>${esc(m.name)}</b>
        <span class="m-stat-req">${esc(m.stat)} (REQ ${m.req})</span>
      </div>
      <p>${esc(m.desc)}</p>
    </div>
  `).join("");

  maneuversList.querySelectorAll(".maneuver-card").forEach(mCard => {
    mCard.onclick = () => {
      let id = mCard.getAttribute("data-m-id");
      activeManeuver = activeEnvironment.maneuvers.find(m => m.id === id);
      renderEnvironmentDetails();
    };
  });
}

function showDuelResult(result) {
  let resBox = $("#duel-result-box");
  if (!resBox) return;
  resBox.style.display = "block";
  resBox.innerHTML = `
    <div class="duel-outcome-alert ${result.success ? 'success' : 'partial'}">
      <div class="outcome-badge">${result.success ? '✓ TRIAL ENDURED' : '⚠ PARTIAL RESOLUTION'}</div>
      <h3>${esc(result.consequenceText)}</h3>
      <div class="provenance-detail">
        <span>STAT EVOLUTION: <b style="color:var(--green)">+${result.statDelta} ${esc(result.statEvolved)}</b></span>
        <span>NEW REVISION: <b>${result.certificate.revision}</b></span>
        <small>CERTIFICATE SIGNATURE: ${result.certificate.signature.slice(0, 24)}...</small>
      </div>
      <button class="join understood-button" id="btn-close-duel-res" style="margin-top:10px" type="button">ACKNOWLEDGE PROVENANCE</button>
    </div>
  `;
  $("#btn-close-duel-res").onclick = () => { resBox.style.display = "none"; };
}

function openDuelInstancePicker(candidates) {
  $("#duel-picker-modal")?.remove();
  app.insertAdjacentHTML("beforeend", `
    <div class="modal" id="duel-picker-modal">
      <div class="panel modalbox fusion-picker-box">
        <div class="trade-modal-top">
          <div>
            <div class="eyebrow">DEPLOYMENT ROSTER</div>
            <h2>DEPLOY INSTANCE</h2>
            <p>Select an evolving construct from your vault.</p>
          </div>
          <button class="archive-close collection-close" id="duel-picker-x" type="button" aria-label="Close picker"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"></line><line x1="12" y1="2" x2="2" y2="12"></line></svg></button>
        </div>
        <div class="trade-collection-grid" id="duel-picker-grid">
          ${candidates.map(x => `
            <button class="trade-collection-item" type="button" data-id="${esc(x.artifact_id)}">
              <b class="rarity-name ${esc(x.rarity)}">${esc(x.name)}</b>
              <small>#${esc(x.artifact_id)} · ${esc(x.classification)}</small>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `);

  const close = () => $("#duel-picker-modal")?.remove();
  $("#duel-picker-x").onclick = close;
  $("#duel-picker-modal").onclick = e => { if (e.target.id === "duel-picker-modal") close(); };

  $("#duel-picker-grid").querySelectorAll(".trade-collection-item").forEach(item => {
    item.onclick = () => {
      let chosen = candidates.find(x => x.artifact_id === item.getAttribute("data-id"));
      if (chosen) {
        activeDuelInstance = chosen;
        close();
        renderDeployedInstance();
      }
    };
  });
}

// ============================================================================
// ⚡ LAB & BATCH CHARACTER GENERATOR
// ============================================================================
async function generatorView() {
  sys("ENGINE LAB // BATCH CHARACTER GENERATOR");
  let rarities = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"];
  
  app.innerHTML = `
    <section class="panel wide">
      <div class="archive-top">
        <div>
          <button class="section-back" id="gen-back" type="button" aria-label="Back to The Void">←</button>
          <div class="eyebrow">100 DISTINCT MORPHOLOGIES // ZERO REPETITION MATRIX</div>
          <h1>LAB // 100 DISTINCT CHARACTERS</h1>
          <p>100 unique vector characters with distinct physical forms and silhouettes, grounded in WordNet definitions. Each character form corresponds directly to its specific name and taxonomy with guaranteed non-repeating uniqueness.</p>
        </div>
        <div class="filters">
          <button class="understood-button" id="gen-filter-3d" style="padding:8px 14px;cursor:pointer;font-size:11px;color:#f0c354;border-color:#a87d2a;">✨ 3D PROTOTYPES</button>
          <button class="join" id="gen-batch-100" style="padding:8px 14px;cursor:pointer;font-size:11px;">⚡ 100 DISTINCT</button>
          <button class="understood-button" id="gen-batch-50" style="padding:8px 14px;cursor:pointer;font-size:11px;">⚡ BATCH 50</button>
          <button class="understood-button" id="gen-export-json" style="padding:8px 14px;cursor:pointer;font-size:11px;color:var(--cyan)">⬇ EXPORT JSON</button>
          <input id="gen-search" placeholder="SEARCH SAMPLES" style="max-width:130px">
          <select id="gen-sort" aria-label="Sort artifacts">
            <option value="asc">NAME A–Z</option>
            <option value="desc">NAME Z–A</option>
            <option value="weird-desc">WEIRDEST FIRST</option>
          </select>
          <select class="rarity-filter" id="gen-r">
            <option value="">ALL RARITIES</option>
            ${rarities.map(r => `<option class="rarity-option ${r}">${r}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="summary" id="gen-sum"></div>
      <div class="archivegrid" id="gen-grid"></div>
    </section>
  `;

  $("#gen-back").onclick = () => go("/void");

  let currentBatch = null;
  let currentCount = 100;

  async function loadBatch(count = 100) {
    currentCount = count;
    $("#gen-grid").innerHTML = '<div class="empty archive-empty" aria-label="Generating"><span class="void-orb">◉</span></div>';
    let seed = Math.floor(Math.random() * 900000) + 1000;
    currentBatch = await api(`/api/generator-batch?count=${count}&seed=${seed}`);
    let all = currentBatch.characters || [];

    $("#gen-sum").innerHTML = 
      sum("BATCH SIZE", all.length) +
      sum("DISTINCT FORMS", `${new Set(all.map(x => x.name)).size} / ${all.length}`) +
      sum("CHASSIS TYPES", new Set(all.map(x => x.hostChassis)).size) +
      sum("ORGANIC TAXA", new Set(all.map(x => x.organicTaxon)).size) +
      sum("DEDUPLICATION", "100% UNIQUE");

    let only3D = false;
    function filter() {
      updateRarityFilter($("#gen-r"));
      let r = $("#gen-r")?.value || "", order = $("#gen-sort")?.value || "asc", search = $("#gen-search")?.value.toLowerCase() || "";
      let items = all.filter(x => (!r || x.rarity === r) && (!only3D || !!x.imageUrl) && (!search || `${x.name} ${x.artifactId} ${x.hostChassis} ${x.organicTaxon}`.toLowerCase().includes(search)));
      
      if (order === "desc") items.sort((a, b) => b.name.localeCompare(a.name));
      else if (order === "weird-desc") items.sort((a, b) => b.weirdness - a.weirdness);
      else items.sort((a, b) => a.name.localeCompare(b.name));

      let g = $("#gen-grid");
      g.innerHTML = "";
      if (!items.length) {
        g.innerHTML = '<div class="empty archive-empty"><span class="void-orb">◉</span></div>';
        return;
      }
      for (let x of items) {
        let c = document.createElement("article");
        c.className = "artifactcard flip-card archive-artifact-card";
        c.innerHTML = `
          <div class="card-face card-front">
            <div class="cardart"><small class="trade-art-id">#${esc(x.artifactId)}</small></div>
            <div class="cardbody">
              <small class="card-class">${esc(x.hostChassis)} · ${esc(x.organicTaxon)}</small>
              <b class="card-name rarity-name ${esc(x.rarity)}">${esc(x.name)}</b>
              <small class="card-weirdness">👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${x.weirdness}</span></small>
            </div>
          </div>
          <div class="card-face card-back"><span class="void-orb-mark">◉</span><small class="archive-back-id"></small></div>
        `;
        c.querySelector(".cardart").append(cv(x));
        c.onclick = () => c.classList.toggle("is-flipped");
        let nb = c.querySelector(".card-name");
        if (nb) nb.onclick = e => { e.stopPropagation(); collectionDetail(x); };
        g.append(c);
      }
      initCardTilt();
    }

    $("#gen-sort").onchange = filter;
    $("#gen-r").onchange = filter;
    $("#gen-search").oninput = filter;
    
    let filter3dBtn = $("#gen-filter-3d");
    if (filter3dBtn) {
      filter3dBtn.onclick = () => {
        only3D = !only3D;
        filter3dBtn.style.background = only3D ? "#4a350a" : "";
        filter3dBtn.style.color = only3D ? "#ffe082" : "#f0c354";
        filter3dBtn.textContent = only3D ? "✓ SHOWING 3D" : "✨ 3D PROTOTYPES";
        filter();
      };
    }
    filter();
  }

  $("#gen-batch-50").onclick = () => loadBatch(50);
  $("#gen-batch-100").onclick = () => loadBatch(100);
  $("#gen-export-json").onclick = () => {
    if (!currentBatch) return;
    const blob = new Blob([JSON.stringify(currentBatch, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `the-void-characters-batch-${currentCount}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`✓ EXPORTED BATCH OF ${currentCount} CHARACTERS`);
  };

  await loadBatch(100);
}

// ============================================================================
// 📦 COLLECTION & LOCAL VAULT
// ============================================================================
function parse(buf) {
  let b = new Uint8Array(buf), p = 8;
  while (p < b.length) {
    let n = ((b[p] << 24) | (b[p + 1] << 16) | (b[p + 2] << 8) | b[p + 3]) >>> 0, t = String.fromCharCode(...b.slice(p + 4, p + 8));
    if (t === "tEXt") {
      let d = b.slice(p + 8, p + 8 + n), z = d.indexOf(0);
      if (new TextDecoder().decode(d.slice(0, z)) === "VOID_ARTIFACT") return JSON.parse(new TextDecoder().decode(d.slice(z + 1)));
    }
    p += 12 + n;
  }
  throw Error("UNVERIFIED");
}

function collection() {
  sys("COLLECTION // OWNED VAULT & EVOLVING INSTANCES");
  app.innerHTML = `
    <section class="panel wide">
      <div class="archive-top">
        <div>
          <button class="section-back" id="collection-back" type="button" aria-label="Back to The Void">←</button>
          <div class="eyebrow">LOCAL VAULT &amp; EVOLVING CONSTRUCTS</div>
          <h1>COLLECTION</h1>
          <p>Your artifacts live with you, not with THE VOID. Each artifact holds a mutable evolving instance certificate with verified provenance.</p>
        </div>
        <div class="collection-header-controls">
          <div class="filters collection-filters">
            <input id="collection-q" placeholder="SEARCH ARTIFACTS">
            <select id="collection-sort" aria-label="Sort artifacts alphabetically">
              <option value="asc">NAME A–Z</option>
              <option value="desc">NAME Z–A</option>
            </select>
            <select class="rarity-filter" id="collection-r">
              <option value="">ALL RARITIES</option>
              ${["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"].map(r => `<option class="rarity-option ${r}">${r}</option>`).join("")}
            </select>
            <select id="collection-c"><option value="">ALL CLASSES</option></select>
            <select id="collection-weirdness">
              <option value="">ALL WEIRDNESS</option>
              <option value="0-69">0–69</option>
              <option value="70-76">70–76</option>
              <option value="77-85">77–85</option>
              <option value="86-93">86–93</option>
              <option value="94-99">94–99</option>
            </select>
          </div>
        </div>
      </div>
      <div id="collection-view-body"></div>
    </section>
  `;

  $("#collection-back").onclick = () => go("/void");
  renderOwnedView();
}

function renderOwnedView() {
  let b = $("#collection-view-body");
  if (!b) return;
  b.innerHTML = `
    <div id="drop" class="drop"><div><span class="drop-icon">📦</span>DROP ARTIFACT RECORDS HERE OR CLICK TO IMPORT</div></div>
    <div id="csum" class="summary"></div>
    <div id="sets" class="sets"></div>
    <div id="cgrid" class="archivegrid"></div>
  `;
  let d = $("#drop");
  d.ondragover = e => { e.preventDefault(); d.classList.add("drag"); };
  d.ondragleave = () => d.classList.remove("drag");
  d.ondrop = e => { e.preventDefault(); d.classList.remove("drag"); load(e.dataTransfer.files); };
  d.onclick = () => {
    let i = document.createElement("input");
    i.type = "file";
    i.multiple = true;
    i.accept = ".png";
    i.onchange = () => load(i.files);
    i.click();
  };

  [...new Set(local.map(x => x.classification))].sort().forEach(x => $("#collection-c").insertAdjacentHTML("beforeend", `<option>${esc(x)}</option>`));
  ["#collection-q", "#collection-sort", "#collection-r", "#collection-c", "#collection-weirdness"].forEach(x => $(x).oninput = () => { updateRarityFilter($("#collection-r")); drawCollection(); });
  ["#collection-sort", "#collection-r"].forEach(x => $(x).onchange = () => { updateRarityFilter($("#collection-r")); drawCollection(); });
  updateRarityFilter($("#collection-r"));
  drawCollection();
}

async function load(fs) {
  for (let f of fs) {
    try {
      let x = parse(await f.arrayBuffer());
      if (!x.record || !x.signature) throw Error();
      if (!local.some(a => a.artifact_id === x.record.artifact_id)) {
        local.push(x.record);
        ensureInstanceRecord(x.record);
        saveLocal();
      }
    } catch {
      $("#drop").innerHTML = "⚠ UNVERIFIED ARTIFACT";
    }
  }
  drawCollection();
}

const secretSets = [
  { name: "SIGNAL WITHOUT SOURCE", complete: items => items.some(item => item.classification === "SIGNAL"), matches: item => item.classification === "SIGNAL" },
  { name: "HIGH STRANGENESS", complete: items => items.filter(item => item.weirdness >= 90).length >= 3, matches: item => item.weirdness >= 90 },
  { name: "RELICS OF USE", complete: items => items.filter(item => ["RELIC", "IMPLEMENT"].includes(item.classification)).length >= 4, matches: item => ["RELIC", "IMPLEMENT"].includes(item.classification) },
  { name: "THE WRONG DRAWER", complete: items => items.length >= 7, matches: () => true }
];

function drawCollection() {
  if (!$("#csum")) return;
  $("#csum").innerHTML = 
    sum("ARTIFACTS", local.length) +
    sum("TOTAL WEIRDNESS", local.reduce((s, x) => s + x.weirdness, 0)) +
    sum("LEGENDARY+", local.filter(x => ["LEGENDARY", "MYTHIC", "DIVINE"].includes(x.rarity)).length) +
    sum("CLASSES", new Set(local.map(x => x.classification)).size);

  $("#sets").innerHTML = '<h3>SECRET SETS</h3>' + secretSets.map(set => `<button class="set set-filter ${set.complete(local) ? "unlocked" : ""} ${selectedSecretSet === set.name ? "active" : ""}" type="button" data-secret-set="${esc(set.name)}" aria-pressed="${selectedSecretSet === set.name}">${esc(set.name)}</button>`).join("");
  document.querySelectorAll("[data-secret-set]").forEach(button => button.onclick = () => {
    let name = button.getAttribute("data-secret-set");
    selectedSecretSet = selectedSecretSet === name ? "" : name;
    drawCollection();
  });
  drawLocalCards();
}

function drawLocalCards() {
  let g = $("#cgrid");
  if (!g) return;
  let q = $("#collection-q")?.value.toLowerCase() || "", order = $("#collection-sort")?.value || "asc", r = $("#collection-r")?.value || "", cl = $("#collection-c")?.value || "", weirdness = $("#collection-weirdness")?.value || "", secretSet = secretSets.find(set => set.name === selectedSecretSet), items = local.filter(x => {
    let [minimum, maximum] = weirdness ? weirdness.split("-").map(Number) : [0, 99];
    return (!q || `${x.name} ${x.artifact_id}`.toLowerCase().includes(q)) && (!r || x.rarity === r) && (!cl || x.classification === cl) && (!weirdness || (x.weirdness >= minimum && x.weirdness <= maximum)) && (!secretSet || secretSet.matches(x));
  });

  items.sort((a, b) => order === "desc" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
  g.innerHTML = "";
  if (!items.length) {
    g.innerHTML = '<div class="empty collection-empty" aria-label="No artifacts"><span class="void-orb">◉</span></div>';
    return;
  }

  for (let x of items) {
    let inst = ensureInstanceRecord(x);
    let c = document.createElement("article");
    c.className = "artifactcard collection-card record-card";
    c.tabIndex = 0;
    c.setAttribute("role", "button");
    c.setAttribute("aria-label", `Open collection record for ${x.name}`);
    c.innerHTML = `<small class="record-card-id">#${esc(x.artifact_id)} · REV ${inst.revision}</small><small class="card-class">${esc(x.classification)}</small><b class="card-name rarity-name ${esc(x.rarity)}">${esc(x.name)}</b><small class="card-weirdness">👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${x.weirdness}</span></small><small class="record-card-status">LOCAL RECORD</small>`;
    let openRecord = () => collectionDetail(x);
    c.onclick = openRecord;
    c.onkeydown = event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openRecord(); } };
    g.append(c);
  }
}

function collectionDetail(a) {
  if (!a) return;
  let inst = ensureInstanceRecord(a) || {
    revision: 0,
    duels: 0,
    fusions: 0,
    evolution: {},
    provenance: []
  };
  let owned = local.some(x => x.artifact_id === a.artifact_id);
  let actions = (a.claimable
    ? `<a class="join archive-claim card-modal-claim" id=collection-dl href="/api/artifact/${encodeURIComponent(a.artifact_id || a.artifactId || "")}/download">CLAIM RECORD</a>`
    : `<button class="understood-button" id="btn-quick-fusion" type="button">✦ FUSION</button><button class="understood-button" id="btn-quick-duel" type="button">⚔️ DUEL</button>`)
    + (owned ? `<button class="understood-button collection-remove" id="btn-remove-record" type="button">REMOVE RECORD</button>` : "");

  $("#collection-modal")?.remove();
  let extraDetailsHtml = "";
  if (a.hazard_level || a.origin_sector || a.field_log || a.containment_protocol) {
    extraDetailsHtml = `
      ${a.hazard_level ? `<div style="display:flex;justify-content:space-between;align-items:center;margin:6px 0 4px 0;"><span class="hazard-badge">${esc(a.hazard_level)}</span><small style="color:#7793b0;font-family:monospace;font-size:10px">${esc(a.origin_sector || "")}</small></div>` : ""}
      ${a.field_log ? `<div class="research-log-box"><b>FIELD REPORT:</b> ${esc(a.field_log)}</div>` : ""}
      ${a.containment_protocol ? `<div class="containment-protocol-box"><b>CONTAINMENT:</b> ${esc(a.containment_protocol)}</div>` : ""}
    `;
  }

  // Provenance list
  let provenanceHtml = (inst?.provenance || []).slice(0, 4).map(p => `
    <div class="prov-row">
      <small>${esc(p.interaction)}</small>
      <b style="color:var(--green)">+${p.delta} ${esc(p.stat)}</b>
    </div>
  `).join("") || `<div style="color:var(--muted);font-size:10px;padding:4px 0">NO RECORDED DUEL/FUSION MUTATIONS YET.</div>`;

  app.insertAdjacentHTML("beforeend", `
    <div class="modal" id="collection-modal">
      <div class="collection-detail-modal">
        <div class="panel modalbox collection-detail vertical-card-modal archive-detail-card ${esc(a.rarity)}" data-rarity="${esc(a.rarity)}">
          <div class="card-header">
            <div class="card-title-group">
              <h2 class="rarity-name ${esc(a.rarity)}">${esc(a.name)}</h2>
            </div>
            <button class="resonance-btn" id="modal-resonance" type="button" aria-label="Play acoustic resonance">🔊 RESONANCE</button>
            <button class="archive-close collection-close" id="collection-x" type="button" aria-label="Close modal"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"></line><line x1="12" y1="2" x2="2" y2="12"></line></svg></button>
          </div>
          <div class="card-info">
            <div class="record-identity">
              <span>ARTIFACT ID</span>
              <b>#${esc(a.artifact_id)}</b>
              <small>VISUAL MATERIAL NOT YET GENERATED</small>
            </div>
            ${a.dictionaryGrounding ? `
              <div class="research-log-box" style="margin-bottom:8px">
                <b>WORDNET DEFINITION [${esc(a.dictionaryGrounding.word || "")}]:</b>
                <div>${esc(a.dictionaryGrounding.definition || "")}</div>
              </div>` : ""}
            <p class="lore">${esc(a.lore || "")}</p>
            ${extraDetailsHtml}
            <div class="collection-stats">
              ${rr("CLASSIFICATION", a.classification)}
              ${a.hostChassis ? rr("HOST CHASSIS", a.hostChassis) : ""}
              ${a.organicTaxon ? rr("ORGANIC TAXON", a.organicTaxon) : ""}
              ${rr("ANOMALY", String(a.anomaly || "MORPHOLOGICAL_SYNTHESIS").replaceAll("_", " "))}
              ${weirdnessRow(a.weirdness)}
              ${rr("INSTANCE REVISION", `REV ${inst.revision} (DUELS: ${inst.duels}, FUSIONS: ${inst.fusions})`)}
            </div>

            <div class="instance-evolution-section">
              <div class="inst-stat-header">EVOLVED SEMANTIC PROPERTIES</div>
              ${Object.entries(inst.evolution || {}).map(([k, v]) => `
                <div class="stat-bar-row">
                  <span>${esc(k.replace(/_/g, " "))}</span>
                  <b>${v}</b>
                  <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${Math.min(100, v)}%"></div></div>
                </div>
              `).join("")}
              <div class="inst-stat-header" style="margin-top:10px">PROVENANCE MUTATION HISTORY</div>
              <div class="prov-box">${provenanceHtml}</div>
            </div>
          </div>
        </div>
        <div class="collection-detail-actions">${actions}</div>
      </div>
    </div>
  `);

  let close = () => $("#collection-modal")?.remove();
  
  let resBtn = $("#modal-resonance");
  if (resBtn) {
    resBtn.onclick = () => {
      resBtn.classList.add("playing");
      playArtifactResonance(a.seed || 100, a.weirdness);
      setTimeout(() => resBtn.classList.remove("playing"), 2200);
    };
  }

  $("#collection-x").onclick = close;
  $("#collection-modal").onclick = e => { if (e.target.id === "collection-modal") close(); };
  
  let qf = $("#btn-quick-fusion");
  if (qf) qf.onclick = () => { fusionSlotA = a; close(); go("/fusion"); };
  
  let qd = $("#btn-quick-duel");
  if (qd) qd.onclick = () => { activeDuelInstance = a; close(); go("/duels"); };

  let rm = $("#btn-remove-record");
  if (rm) rm.onclick = () => {
    removeFromCollection(a.artifact_id);
    close();
    if ($("#cgrid")) drawCollection();
  };

  document.onkeydown = e => { if (e.key === "Escape") close(); };
}


async function vaultView() {
  sys("✦ THE VOID PRIVATE VAULT & DISPENSER");

  let apiOnline = false;
  let inventory = {
    unspawnedRemaining: 0,
    totalSpawned: 0,
    isLow: true
  };

  try {
    const status = await VoidAPI.status();
    apiOnline = status.ok === true;

    if (apiOnline) {
      inventory = await VoidAPI.getInventory();
    }
  } catch (err) {
    console.error("THE VOID API unavailable:", err);
  }

  app.innerHTML = `
    <section class="panel wide vault-studio">
      <div class="eyebrow">THE VOID × CLOUDFLARE SECURE DROP ARCHITECTURE</div>
      <div class="panel-header-row">
        <div>
          <h1>✦ SECURE VAULT & DISPENSER</h1>
          <p class="subtitle">Upload generated batches (e.g. 100 artifacts) to your private encrypted vault. The engine will autonomously dispense 1 artifact per spawn.</p>
        </div>
        <div class="auth-status-badge ${apiOnline ? 'connected' : 'disconnected'}">
  <span class="dot"></span>
  <b>${apiOnline ? 'VOID API ONLINE' : 'VOID API OFFLINE'}</b>
</div>
      </div>

      <!-- INVENTORY STATUS BAR -->
      <div class="vault-inventory-grid">
        <div class="inv-card">
          <span class="inv-label">UNSPAWNED IN VAULT</span>
          <span class="inv-value ${inventory.unspawnedRemaining < 10 ? 'warning' : 'healthy'}" id="inv-unspawned">${inventory.unspawnedRemaining}</span>
          <span class="inv-sub">${inventory.isLow ? '⚠️ LOW POOL — Time to add next batch' : '✓ Stock is healthy'}</span>
        </div>
        <div class="inv-card">
          <span class="inv-label">TOTAL SPAWNED</span>
          <span class="inv-value" id="inv-spawned">${inventory.totalSpawned}</span>
          <span class="inv-sub">Claimed or archived</span>
        </div>
        <div class="inv-card action-card">
          <span class="inv-label">AUTOMATED DISPENSER</span>
          <button id="btn-dispense-now" class="btn-primary-glow" ${inventory.unspawnedRemaining === 0 ? 'disabled' : ''}>
            ✦ DISPENSE NEXT SPAWN NOW
          </button>
          <span class="inv-sub">Reveals exactly 1 artifact for 10 minutes</span>
        </div>
      </div>

      <!-- BATCH FILE UPLOADER (DRAG & DROP) -->
      <div class="vault-upload-box">
  <div class="upload-icon">☁</div>
  <h3>GOOGLE DRIVE ARTIFACT STORAGE</h3>
  <p>PNG artifact storage will be connected to Google Drive.</p>
  <div class="upload-log">
    <div class="log-item">Cloudflare Worker connection: ${apiOnline ? "ONLINE" : "OFFLINE"}</div>
  </div>
</div>

      <!-- PROMPT STUDIO QUICK EXPORT -->
      <div class="vault-tools-section">
        <div class="tool-header">
          <h3>✦ DETERMINISTIC COMBINATORIAL LEXICON ENGINE (0 REPETITIONS)</h3>
          <p>Every serial number (VA-000004 to VA-999999+) generates a mathematically unique WordNet concept pairing, non-colliding name, stats, and prompt.</p>
        </div>
        <div class="quick-batch-actions">
          <button id="btn-gen-batch-10" class="btn-sm">GENERATE NEXT 10 UNIQUE</button>
          <button id="btn-gen-batch-100" class="btn-primary-glow" style="padding:6px 14px; font-size:11px">GENERATE NEXT 100 UNIQUE BATCH</button>
         <button id="btn-register-void-100" class="btn-sm">⚡ SYNC 100 TO VOID QUEUE</button>
          <button id="btn-download-json" class="btn-ghost-sm">DOWNLOAD METADATA JSON</button>
        </div>
        <div id="batch-prompts-output" class="batch-output-container" style="display:none"></div>
      </div>
    </section>
  `;

  

  

  // Dispense Spawn button
  if ($("#btn-dispense-now")) {
    $("#btn-dispense-now").onclick = async () => {
      const btn = $("#btn-dispense-now");
      btn.disabled = true;
      btn.textContent = "✦ DISPENSING...";

      try {
        const result = await VoidAPI.dispenseNextSpawn(10);
        if (result.success) {
          alert(`✦ Drop activated for ${result.spawn.id} (${result.spawn.name})! Redirecting to WARP...`);
          go("/void");
        } else {
          alert("Notice: " + (result.message || result.error));
          btn.disabled = false;
          btn.textContent = "✦ DISPENSE NEXT SPAWN NOW";
        }
      } catch (err) {
        alert("Dispenser error: " + err.message);
        btn.disabled = false;
        btn.textContent = "✦ DISPENSE NEXT SPAWN NOW";
      }
    };
  }

  // Deterministic Non-repeating Batch Generation
  let currentGeneratedBatch = [];

  if ($("#btn-gen-batch-10")) {
    $("#btn-gen-batch-10").onclick = () => renderGeneratedBatch(10);
  }
  if ($("#btn-gen-batch-100")) {
    $("#btn-gen-batch-100").onclick = () => renderGeneratedBatch(100);
  }

  
  // Register batch to Cloudflare KV queue
if ($("#btn-register-void-100")) {
  $("#btn-register-void-100").onclick = async () => {
    const btn = $("#btn-register-void-100");
      btn.disabled = true;
      btn.textContent = "⚡ SYNCING...";
      try {
        if (!currentGeneratedBatch.length) {
          currentGeneratedBatch = generateBatchRegistry(4, 100);
        }
        const res = await VoidAPI.registerArtifacts(currentGeneratedBatch);
       alert(`✦ Successfully registered ${res.added} unique artifacts into THE VOID! (Total in queue: ${res.totalUnspawned})`);
        route();
      } catch (err) {
        alert("VOID Registration Error: " + err.message);
        btn.disabled = false;
        btn.textContent = "⚡ SYNC 100 TO VOID QUEUE";
      }
    };
  }

  // Download metadata JSON
  if ($("#btn-download-json")) {
    $("#btn-download-json").onclick = () => {
      if (!currentGeneratedBatch.length) {
        currentGeneratedBatch = generateBatchRegistry(4, 100);
      }
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentGeneratedBatch, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `the_void_artifacts_batch_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    };
  }

  function renderGeneratedBatch(count) {
    const out = $("#batch-prompts-output");
    out.style.display = "block";
    
    // Generate 100% unique artifacts starting from serial #4
    currentGeneratedBatch = generateBatchRegistry(4, count);
    
    out.innerHTML = `
      <div class="batch-summary-banner">
        <h4>✦ Generated ${count} Mathematically Unique Artifacts (VA-000004 to VA-${String(3 + count).padStart(6, '0')})</h4>
        <span class="badge-unique">✓ 0 REPETITIONS • DETERMINISTIC SYNSET COMBINATORIAL MATRIX</span>
      </div>
    `;

    // Render items with accordion / fast-copy
    for (const art of currentGeneratedBatch) {
      const block = document.createElement("div");
      block.className = "prompt-item-card";
      block.innerHTML = `
        <div class="prompt-card-top">
          <div class="card-title-group">
            <span class="tag-serial">${art.id}</span>
            <b class="art-name">${art.name}</b>
            <span class="tag-rarity ${art.rarity}">${art.rarity}</span>
          </div>
          <button class="btn-copy-prompt" type="button">COPY PROMPT</button>
        </div>
        <div class="taxon-meta">
          <span>🧬 ${art.taxonomy.chassis_name} + ${art.taxonomy.organism_name}</span>
          <span>⚡ PWR: ${art.stats.power} | RES: ${art.stats.resonance} | STB: ${art.stats.stability}</span>
        </div>
        <pre class="prompt-text">${art.prompt}</pre>
      `;

      block.querySelector(".btn-copy-prompt").onclick = e => {
        navigator.clipboard.writeText(art.prompt);
        e.target.textContent = "✓ COPIED!";
        setTimeout(() => e.target.textContent = "COPY PROMPT", 2000);
      };

      out.append(block);
    }
  }
}

route();
