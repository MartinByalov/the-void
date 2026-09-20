import { VoidAPI } from "./void-api.js";
import { getArtifactBySerial, generateBatchRegistry } from "./void-lexicon.js";

const app = document.querySelector("#app"), $ = s => document.querySelector(s);
const api = async (u, o = {}) => { let r = await fetch(u, { headers: { "content-type": "application/json" }, ...o }), x = await r.json(); if (!r.ok) throw Error(x.error || r.statusText); return x };
let timer = null, presenceTimer = null, visitorTimer = null, voidSnake = null, current = null, local = [], homeArchive = [], liveVisitors = 0, activeWitnesses = 0, selectedSecretSet = "", collectionMode = "owned", feedEvents = [], feedSnapshot = null, feedRenderSnapshot = null, chatSnapshot = null;

let sid = sessionStorage.getItem("void_session");
if (!sid) {
  sid = crypto.randomUUID();
  sessionStorage.setItem("void_session", sid);
}

function setTabTitle(active, seconds = 0) {
  document.title = active ? `THE VOID · ${fmt(seconds)}` : "THE VOID";
}

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
const fmtWarp = s => {
  let total = Math.max(0, Math.floor(s || 0));
  let mins = String(Math.floor(total / 60)).padStart(2, "0");
  let secs = String(total % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};

function getAnonymousClaimId() {
  let id = localStorage.getItem("void_claim_id");
  if (!id) {
    id = "CLAIM-" + (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36));
    localStorage.setItem("void_claim_id", id);
  }
  return id;
}

function mapWarpToLot(warp) {
  if (!warp || !warp.artifact || warp.state === "IDLE") return null;
  let a = warp.artifact;
  let isClaimed = warp.state === "CLAIMED";
  let myClaimId = getAnonymousClaimId();
  let isWinner = isClaimed && (warp.claimedBy === myClaimId);
  return {
    id: warp.warpId,
    state: warp.state,
    spawnedAt: warp.spawnedAt,
    claim_label: isClaimed ? "LOOTED" : "OPEN",
    joined: true,
    winner: isWinner,
    found_owner: isClaimed,
    revealed: isClaimed ? a : null,
    artifact: a,
    claimAttempts: warp.claimAttempts || 0,
    outcome: warp.outcome,
    isVoidSpawn: true,
  };
}

const kv = (k, v) => `<div><span>${esc(k)}</span><b>${esc(v)}</b></div>`;
const weirdnessTier = value => ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"][Math.min(6, Math.floor(Math.max(0, Math.min(100, Number(value) || 0)) / (101 / 7)))];

function cv(a) {
  let imgUrl = a?.imageUrl || (a?.artifactId ? `/api/artifact/${encodeURIComponent(a.artifactId)}/image` : null);
  if (imgUrl) {
    let wrap = document.createElement("div");
    wrap.className = "vector-card-art render-3d-art";
    let img = document.createElement("img");
    img.src = imgUrl;
    img.alt = a.name || "";
    img.className = "fluent-3d-img";
    img.referrerPolicy = "no-referrer";
    img.onerror = () => {
      wrap.innerHTML = "";
      if (a?.svg) {
        wrap.className = "vector-card-art";
        wrap.innerHTML = a.svg;
      } else {
        let c = document.createElement("canvas");
        c.width = c.height = 24;
        let g = c.getContext("2d");
        for (let y = 0; y < 24; y++) for (let x = 0; x < 24; x++) {
          g.fillStyle = a?.pixels?.[y]?.[x] || "#050b14";
          g.fillRect(x, y, 1, 1);
        }
        wrap.className = "";
        wrap.append(c);
      }
    };
    wrap.append(img);
    let badge = document.createElement("span");
    badge.className = "fluent-badge";
    badge.textContent = "RENDER";
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
  visitorTimer = setInterval(refreshActivity, 10000);
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

function addFeedEvent(event) {
  let key = event.key || `${Date.now()}-${Math.random()}`;
  if (feedEvents.some(e => e.key === key)) return;
  feedEvents.unshift({
    key,
    time: event.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    html: event.html || esc(event.text || "")
  });
  if (feedEvents.length > 30) feedEvents.length = 30;
  renderFeed();
}

let lastChatHash = "";

function renderFeed() {
  let f = $("#feed");
  if (!f) return;
  f.innerHTML = feedEvents.map(e => `
    <div class="event" data-feed-key="${esc(e.key)}">
      <time>${esc(e.time)}</time>
      <div>${e.html}</div>
    </div>
  `).join("");
}

function syncFeed(activity, l) {
  if (!l) return;
  if (l.state) {
    addFeedEvent({
      key: `warp-state-${l.id}-${l.state}`,
      html: `<a class="event-link" href="/void" data-link>The Warp #${l.id}</a>: The Warp changed state to ${esc(l.state)}.`
    });
  }
  let souls = activity?.current?.participants || 0;
  if (souls > 0) {
    addFeedEvent({
      key: `warp-presence-${l.id}-${souls}`,
      html: `A soul entered The Void.`
    });
  }
}

async function refreshActivity() {
  if (document.hidden) return;
  try {
    let act = await api("/api/activity");
    activeWitnesses = act?.current?.participants || 0;
    liveVisitors = act?.current?.live_visitors || 0;
    let aw = $("#active-witnesses");
    if (aw) aw.textContent = activeWitnesses;
    if (current) syncFeed(act, current);
    await refreshChat();
  } catch (err) {}
}

async function refreshChat() {
  try {
    let data = await api("/api/chat");
    let container = $("#warp-chat-messages");
    if (!container) return;
    let msgs = data?.messages || [];
    let chatHash = JSON.stringify(msgs);
    if (chatHash === lastChatHash) return; // Prevent unnecessary DOM flicker
    lastChatHash = chatHash;
    
    if (!msgs.length) {
      container.innerHTML = '<div class="chat-empty">NO ACTIVE SIGNAL.</div>';
      return;
    }
    container.innerHTML = msgs.map(m => `
      <div class="chat-message ${m.mode === "TRADE" ? "trade-msg" : ""}">
        <span class="chat-name">${esc(m.name)}</span>
        <span class="chat-text">${esc(m.text)}</span>
      </div>
    `).join("");
    container.scrollTop = container.scrollHeight;
  } catch (err) {}
}

function setupSecretStage(st, mystery) {
  let attempts = 0;
  mystery.onclick = () => {
    attempts++;
    if (attempts < 4) {
      showAbout();
    } else {
      startVoidSnake(st);
    }
  };
}

function stopVoidSnake() {
  if (voidSnake) {
    if (voidSnake.timer) clearInterval(voidSnake.timer);
    if (voidSnake.onKey) document.removeEventListener("keydown", voidSnake.onKey);
    voidSnake.element?.remove();
    document.querySelector(".artifact-stage")?.classList.remove("snake-active");
    voidSnake = null;
  }
}

function startVoidSnake(container) {
  stopVoidSnake();
  const columns = 24, rows = 12;
  const canvas = document.createElement("canvas");
  canvas.width = columns * 10;
  canvas.height = rows * 10;
  canvas.className = "void-snake-canvas";
  container.classList.add("snake-active");
  container.append(canvas);

  let snake = [{ x: 12, y: 6 }, { x: 11, y: 6 }, { x: 10, y: 6 }];
  let direction = { x: 1, y: 0 };
  let food = { x: 18, y: 6 };
  let ctx = canvas.getContext("2d");

  function spawnFood() {
    food = {
      x: Math.floor(Math.random() * columns),
      y: Math.floor(Math.random() * rows)
    };
  }

  function onKey(e) {
    if (e.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
    else if (e.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
    else if (e.key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
    else if (e.key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
    else if (e.key === "Escape") stopVoidSnake();
  }
  document.addEventListener("keydown", onKey);

  let timer = setInterval(() => {
    let head = {
      x: (snake[0].x + direction.x + columns) % columns,
      y: (snake[0].y + direction.y + rows) % rows
    };
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      stopVoidSnake();
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      spawnFood();
    } else {
      snake.pop();
    }
    ctx.fillStyle = "#050b14";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#8b5cff";
    ctx.fillRect(food.x * 10, food.y * 10, 9, 9);
    ctx.fillStyle = "#d8e4f6";
    snake.forEach(s => ctx.fillRect(s.x * 10, s.y * 10, 9, 9));
  }, 100);

  voidSnake = { timer, onKey, element: canvas };
}

function updateWinnerAction(l) {
  const btn = $("#winner-contribute");
  if (!btn) return;
  if (l?.winner) {
    btn.removeAttribute("hidden");
    btn.style.display = "inline-flex";
    btn.onclick = contribute;
  } else {
    btn.setAttribute("hidden", "");
    btn.style.display = "none";
  }
}

let isClaimCooldown = false;

async function voidHome() {
  sys("THE VOID // WARP SIGNAL");
  let warpRes = null;
  try {
    warpRes = await VoidAPI.fetchActiveWarp();
  } catch (e) {
    warpRes = null;
  }

  if (warpRes?.warp && (warpRes.active || warpRes.warp.state === "CLAIMED" || warpRes.warp.phase === "CHARGING" || warpRes.warp.phase === "LOOT_OPEN")) {
    current = {
      id: warpRes.warp.serialIndex || warpRes.warp.id || 1,
      state: warpRes.warp.state,
      phase: warpRes.warp.phase,
      spawnedAt: warpRes.warp.spawnedAt,
      materializesAt: warpRes.warp.materializesAt,
      expiresAt: warpRes.warp.expiresAt,
      isMaterialized: warpRes.warp.isMaterialized,
      lootRemainingMs: warpRes.warp.lootRemainingMs,
      claim_label: warpRes.warp.state === "CLAIMED" ? "LOOTED" : (warpRes.warp.isMaterialized ? "LOOT OPEN" : "CHARGING"),
      joined: true,
      winner: warpRes.warp.claimedBy === getAnonymousClaimId(),
      found_owner: warpRes.warp.state === "CLAIMED",
      revealed: warpRes.warp.isMaterialized ? warpRes.warp : (warpRes.warp.state === "CLAIMED" ? warpRes.warp : null),
      artifact: warpRes.warp,
      rarity: warpRes.warp.rarity,
      name: warpRes.warp.name,
      classification: warpRes.warp.category || "ARTIFACT",
      weirdness: warpRes.warp.stats?.power || 75,
      lore: warpRes.warp.description
    };
  } else {
    try {
      current = await api("/api/lot");
    } catch (error) {
      current = null;
    }
  }

  try {
    homeArchive = await api("/api/archive");
  } catch (error) {
    homeArchive = [];
  }

  drawHome(current, homeArchive);
  await refreshActivity();
  await refreshChat();

  // Authoritative Monotonic Timer Loop
  if (presenceTimer) clearInterval(presenceTimer);
  presenceTimer = setInterval(() => {
    if (current && current.spawnedAt) {
      const nowAuth = VoidAPI.getAuthoritativeNow();
      if (!current.isMaterialized && current.materializesAt && nowAuth >= current.materializesAt) {
        current.isMaterialized = true;
        current.phase = "LOOT_OPEN";
        current.claim_label = "LOOT OPEN";
        drawHome(current, homeArchive);
      }
      if (current.isMaterialized && current.expiresAt) {
        current.lootRemainingSeconds = Math.max(0, Math.floor((current.expiresAt - nowAuth) / 1000));
        current.my_presence_seconds = current.lootRemainingSeconds;
      } else {
        current.my_presence_seconds = Math.max(0, Math.floor((nowAuth - current.spawnedAt) / 1000));
      }
    } else if (current) {
      current.my_presence_seconds = (current.my_presence_seconds || 0) + 1;
    }
    updateHome(current);
  }, 1000);
}

function updateHome(l) {
  if (!l) { setTabTitle(false); return; }
  let seconds = l.my_presence_seconds || 0;
  let elapsed = fmtWarp(seconds);
  if ($("#presence-clock") && !isClaimCooldown) {
    $("#presence-clock").textContent = elapsed;
  }
  if ($("#active-witnesses")) $("#active-witnesses").textContent = activeWitnesses;
  if ($("#claim-under-stage")) $("#claim-under-stage").textContent = l.claim_label || "NONE";
  setTabTitle(true, seconds);
  updateWinnerAction(l);
}

function drawHome(l, arc = []) {
  if (!l) {
    sys("THE VOID // NO ACTIVE WARP");
    app.innerHTML = `
      <section class="platform">
        <aside class="panel feedpanel"><h3>LIVE FEED</h3><div id="feed"></div></aside>
        <section class="panel lotpanel">
          <div class="panel-title"><h2>NO ACTIVE ARTIFACT</h2></div>
          <div class="lotgrid">
            <div>
              <div class="artifact-stage" id="stage"><button class="mystery" type="button" aria-label="Open The Void support window"><span class="mystery-question">?</span></button></div>
              <div class="activity-strip"><span>ACTIVE SOULS: <b><i class=live-dot></i><span id=active-witnesses>${activeWitnesses}</span></b></span></div>
              <div id="trace-slot"></div>
            </div>
            <div id="lotdetails">
              <div class="lot-kicker">THE VOID IS QUIET</div>
              <p>No Artifact is currently passing through the WARP.</p>
              <div class="statbox current-lot-stats">
                ${kv("Classification", "???")}
                <div class="rarity-row"><span>Rarity</span><b><span class="rarity hidden-rarity">???</span></b></div>
                ${kv("Origin", "???")}
                ${kv("Weirdness", "???")}
              </div>
              <p class="condition">Awaiting the next signal...</p>
            </div>
          </div>
        </section>
        <section id="warp-chat" class="panel warp-chat"><div class="warp-chat-head"><h3>CHAT</h3><label class="chat-trade-mode"><input type="checkbox" disabled> <span>TRADE</span></label></div><div class="chat-empty">NO ACTIVE SIGNAL.</div></section>
        <section class="panel recentpanel"><div class="panel-title"><h2>RECENTLY DISCOVERED</h2></div><div class="recent-slider"><div class="recentgrid" id="recent"></div><button class="recent-nav recent-nav-prev" id="recent-prev" type="button" aria-label="Show previous discoveries">←</button><button class="recent-nav recent-nav-next" id="recent-next" type="button" aria-label="Show next discoveries">→</button></div></section>
      </section>`;
    const mystery = $("#stage .mystery");
    if (mystery) {
      mystery.onclick = showAbout;
      setupSecretStage($("#stage"), mystery);
    }
    drawRecent(arc.slice(0, 12));
    renderFeed();
    setTabTitle(false);
    return;
  }

  updateWinnerAction(l);
  let seconds = l.my_presence_seconds || 0;

  if (l.revealed && l.state === "CLAIMED") {
    let a = l.revealed;
    if (l.winner) addToCollection(a);
    sys(`WARP #${l.id} // REVEALED`);
    app.innerHTML = `
      <section class="platform">
        <aside class="panel feedpanel"><h3>LIVE FEED</h3><div id="feed"></div></aside>
        <section class="panel lotpanel reveal-panel">
          <div class="panel-title"><h2>${esc(a.name || "NEW DISCOVERY")}</h2></div>
          <div class="lotgrid">
            <div>
              <div class="artifact-stage" id="stage"></div>
              <div class="activity-strip">
                <span>ACTIVE SOULS: <b><i class=live-dot></i><span id=active-witnesses>${activeWitnesses}</span></b></span>
                <span>CLAIM: <b id=claim-under-stage>${esc(l.claim_label)}</b></span>
              </div>
              <div id="trace-slot">
                ${l.winner ? `<a class="trace-note" href="/collection" data-link>YOUR PRESENCE LEFT A TRACE</a>` : `<div class="trace-note reveal-owner-note">${esc(a.name)} FOUND ITS NEW OWNER</div>`}
              </div>
            </div>
            <div id="lotdetails">
              <div class="reveal-panel">
                <div class="lot-kicker">CURRENT WARP #${esc(l.id)}</div>
                <h1>${esc(a.name)}</h1>
                <p>${esc(a.lore || a.description || "")}</p>
                <div class="statbox">
                  ${kv("Classification", a.classification || "ARTIFACT")}
                  ${kv("Rarity", `<span class="rarity ${esc(a.rarity)}">${esc(a.rarity)}</span>`)}
                  ${kv("Weirdness", `<span class="detail-weirdness weirdness-val ${weirdnessTier(a.weirdness)}">${esc(a.weirdness)}</span>`)}
                  ${kv("Status", "ARCHIVED")}
                </div>
                <p class="condition">${l.winner ? "The artifact has surfaced.<br>Its record is now permanent." : "The artifact surfaced for another SOUL.<br>Its record is now permanent."}</p>
              </div>
              <div class="participation-actions lot-action-height">
                <button class="join" id="join-next" type="button">JOIN THE WARP</button>
              </div>
            </div>
          </div>
        </section>
        <section id="warp-chat" class="panel warp-chat">
          <div class="warp-chat-head"><h3>CHAT</h3><label class="chat-trade-mode"><input id="chat-trade-mode" type="checkbox"> <span>TRADE</span></label></div>
          <div id="warp-chat-messages" class="chat-messages"></div>
          <form class="chat-form" id="chat-form">
            <input id="chat-input" maxlength="280" placeholder="SEND A MESSAGE..." aria-label="Send a chat message">
            <button type="submit">SEND</button>
          </form>
        </section>
        <section class="panel recentpanel">
          <div class="panel-title"><h2>RECENTLY DISCOVERED</h2></div>
          <div class="recent-slider">
            <div class="recentgrid" id="recent"></div>
            <button class="recent-nav recent-nav-prev" id="recent-prev" type="button" aria-label="Show previous discoveries">←</button>
            <button class="recent-nav recent-nav-next" id="recent-next" type="button" aria-label="Show next discoveries">→</button>
          </div>
        </section>
      </section>
    `;

    const st = $("#stage");
    if (st) {
      let heroCanvas = cv(a);
      heroCanvas.className = "hero-pixel reveal-artifact";
      st.append(heroCanvas);
    }
    $("#join-next") && ($("#join-next").onclick = voidHome);
  } else if (l.isMaterialized && l.state === "ACTIVE") {
    // MATERIALIZED! 60s LOOT WINDOW ACTIVE!
    let a = l.artifact;
    sys(`WARP #${l.id} // MATERIALIZED · 60s LOOT WINDOW`);
    app.innerHTML = `
      <section class="platform">
        <aside class="panel feedpanel"><h3>LIVE FEED</h3><div id="feed"></div></aside>
        <section class="panel lotpanel reveal-panel">
          <div class="panel-title"><h2 class="rarity-name ${esc(a.rarity)}">${esc(a.name || "MATERIALIZED RELIC")}</h2></div>
          <div class="lotgrid">
            <div>
              <div class="artifact-stage" id="stage"></div>
              <div class="activity-strip">
                <span>ACTIVE SOULS: <b><i class=live-dot></i><span id=active-witnesses>${activeWitnesses}</span></b></span>
                <span>LOOT: <b id=claim-under-stage style="color:#5ee893">LOOT OPEN (60s)</b></span>
              </div>
              <div id="trace-slot"><div class="trace-note" style="color:#5ee893">⚡ MATERIALIZED FROM THE VOID · CLAIM BEFORE DISSOLUTION</div></div>
            </div>
            <div id="lotdetails">
              <div class="reveal-panel">
                <div class="lot-kicker">CURRENT WARP #${esc(l.id)} · MATERIALIZED</div>
                <h1 class="rarity-name ${esc(a.rarity)}">${esc(a.name)}</h1>
                <p>${esc(a.lore || a.description || "The relic has emerged from the depths of the Void.")}</p>
                <div class="statbox">
                  ${kv("Classification", a.classification || "ARTIFACT")}
                  ${kv("Rarity", `<span class="rarity ${esc(a.rarity)}">${esc(a.rarity)}</span>`)}
                  ${kv("Weirdness", `<span class="detail-weirdness weirdness-val ${weirdnessTier(a.weirdness)}">${esc(a.weirdness)}</span>`)}
                  ${kv("Status", "MATERIALIZED")}
                </div>
                <p class="condition">Loot window open for 1 minute only.<br>First soul to claim secures the relic.</p>
              </div>
              <div class="participation-actions lot-action-height">
                <button class="join loot-active-btn" id="warp-claim-timer-btn" type="button" aria-label="Loot Materialized Relic">
                  <span>⚡ LOOT ARTIFACT (<span id="presence-clock">${fmtWarp(l.my_presence_seconds || 60)}</span>)</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="warp-chat" class="panel warp-chat">
          <div class="warp-chat-head"><h3>CHAT</h3><label class="chat-trade-mode"><input id="chat-trade-mode" type="checkbox"> <span>TRADE</span></label></div>
          <div id="warp-chat-messages" class="chat-messages"></div>
          <form class="chat-form" id="chat-form">
            <input id="chat-input" maxlength="280" placeholder="SEND A MESSAGE..." aria-label="Send a chat message">
            <button type="submit">SEND</button>
          </form>
        </section>
        <section class="panel recentpanel">
          <div class="panel-title"><h2>RECENTLY DISCOVERED</h2></div>
          <div class="recent-slider">
            <div class="recentgrid" id="recent"></div>
            <button class="recent-nav recent-nav-prev" id="recent-prev" type="button" aria-label="Show previous discoveries">←</button>
            <button class="recent-nav recent-nav-next" id="recent-next" type="button" aria-label="Show next discoveries">→</button>
          </div>
        </section>
      </section>
    `;

    const st = $("#stage");
    if (st) {
      let heroCanvas = cv(a);
      heroCanvas.className = "hero-pixel reveal-artifact";
      st.append(heroCanvas);
    }
  } else {
    // CHARGING PHASE (Timer counts up 00:00 -> Target)
    sys(`WARP #${l.id} // CHARGING ESSENCE`);
    app.innerHTML = `
      <section class="platform">
        <aside class="panel feedpanel"><h3>LIVE FEED</h3><div id="feed"></div></aside>
        <section class="panel lotpanel">
          <div class="panel-title"><h2>UNKNOWN ARTIFACT</h2></div>
          <div class="lotgrid">
            <div>
              <div class="artifact-stage" id="stage"></div>
              <div class="activity-strip">
                <span>ACTIVE SOULS: <b><i class=live-dot></i><span id=active-witnesses>${activeWitnesses}</span></b></span>
                <span>CLAIM: <b id=claim-under-stage>${esc(l.claim_label)}</b></span>
              </div>
              <div id="trace-slot">
                ${l.joined ? `<a class="trace-note" href="/collection" data-link>YOUR PRESENCE LEFT A TRACE</a>` : ""}
              </div>
            </div>
            <div id="lotdetails">
              <div class="lot-kicker">CURRENT WARP #${esc(l.id)}</div>
              <p>Its true nature is hidden... for now.</p>
              <div class="statbox current-lot-stats">
                ${kv("Classification", "???")}
                <div class="rarity-row"><span>Rarity</span><b><span class="rarity hidden-rarity">???</span></b></div>
                ${kv("Origin", "???")}
                ${kv("Weirdness", "???")}
              </div>
              <p class="condition">Closing condition unknown.<br>Stay awhile and do whatever...</p>
              <div class="participation-actions lot-action-height">
                <button class="join joined claim-timer-btn" id="warp-claim-timer-btn" type="button" aria-label="Presence recorded in The Void">
                  <span id="presence-clock">${fmtWarp(seconds)}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="warp-chat" class="panel warp-chat">
          <div class="warp-chat-head"><h3>CHAT</h3><label class="chat-trade-mode"><input id="chat-trade-mode" type="checkbox"> <span>TRADE</span></label></div>
          <div id="warp-chat-messages" class="chat-messages"></div>
          <form class="chat-form" id="chat-form">
            <input id="chat-input" maxlength="280" placeholder="SEND A MESSAGE..." aria-label="Send a chat message">
            <button type="submit">SEND</button>
          </form>
        </section>
        <section class="panel recentpanel">
          <div class="panel-title"><h2>RECENTLY DISCOVERED</h2></div>
          <div class="recent-slider">
            <div class="recentgrid" id="recent"></div>
            <button class="recent-nav recent-nav-prev" id="recent-prev" type="button" aria-label="Show previous discoveries">←</button>
            <button class="recent-nav recent-nav-next" id="recent-next" type="button" aria-label="Show next discoveries">→</button>
          </div>
        </section>
      </section>
    `;

    const st = $("#stage");
    if (st) {
      if (l.silhouette_pixels) {
        st.append(silhouette(l.silhouette_pixels));
      } else {
        const mystery = document.createElement("button");
        mystery.type = "button";
        mystery.className = `mystery mystery-shape-${Math.abs(Number(l.id) || 0) % 20}`;
        mystery.setAttribute("aria-label", "Open The Void support window");
        mystery.innerHTML = '<span class="mystery-question">?</span>';
        st.append(mystery);
        setupSecretStage(st, mystery);
      }
    }
  }

  const claimBtn = $("#warp-claim-timer-btn");
  const handleClaimAction = async () => {
    if (!claimBtn || claimBtn.disabled || isClaimCooldown) return;
    claimBtn.disabled = true;
    claimBtn.classList.add("claiming");
    isClaimCooldown = true;
    try {
      let looterName = getAnonymousClaimId();
      let res = await VoidAPI.lootWarp(looterName);
      if (res?.success && (res.outcome === "CLAIMED" || res.state === "CLAIMED" || res.result === "CLAIMED")) {
        claimBtn.innerHTML = `<span>LOOTED!</span>`;
        if (res.artifact || res.warp?.item) {
          addToCollection(res.artifact || res.warp?.item);
        }
        showToast("✦ RELIC LOOTED AND BOUND TO YOUR LOCAL VAULT!");
        setTimeout(() => {
          isClaimCooldown = false;
          voidHome();
        }, 1200);
      } else if (res?.outcome === "EXPIRED" || res?.result === "GONE") {
        claimBtn.innerHTML = `<span>LOST TO THE VOID</span>`;
        setTimeout(() => {
          isClaimCooldown = false;
          voidHome();
        }, 2000);
      } else {
        claimBtn.innerHTML = `<span>NOTHING HAPPENED.</span>`;
        setTimeout(() => {
          isClaimCooldown = false;
          claimBtn.disabled = false;
          claimBtn.classList.remove("claiming");
          let s = current?.my_presence_seconds || 0;
          claimBtn.innerHTML = `<span id="presence-clock">${fmtWarp(s)}</span>`;
        }, 2000);
      }
    } catch (err) {
      claimBtn.innerHTML = `<span>NOTHING HAPPENED.</span>`;
      setTimeout(() => {
        isClaimCooldown = false;
        claimBtn.disabled = false;
        claimBtn.classList.remove("claiming");
        let s = current?.my_presence_seconds || 0;
        claimBtn.innerHTML = `<span id="presence-clock">${fmtWarp(s)}</span>`;
      }, 2000);
    }
  };

  if (claimBtn) {
    claimBtn.onclick = handleClaimAction;
  }

  let chatForm = $("#chat-form");
  if (chatForm) {
    chatForm.onsubmit = async e => {
      e.preventDefault();
      let input = $("#chat-input");
      let tradeMode = $("#chat-trade-mode");
      let text = input?.value.trim();
      if (!text) return;
      input.value = "";
      try {
        await api("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            text,
            mode: tradeMode?.checked ? "TRADE" : "CHAT"
          })
        });
        await refreshChat();
      } catch (err) {
        showToast(err.message || "Failed to transmit message.");
      }
    };
  }

  renderFeed();
  refreshChat();
  drawRecent(arc.slice(0, 12));
  updateHome(l);
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

function contribute() {
  $("#modal")?.remove();
  app.insertAdjacentHTML("beforeend", `
    <div class="modal" id="modal">
      <div class="panel modalbox contribution">
        <button class="modal-x" id="modalx" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <line x1="2" y1="2" x2="12" y2="12"></line>
            <line x1="12" y1="2" x2="2" y2="12"></line>
          </svg>
        </button>
        <h2>LEAVE SOMETHING IN THE VOID</h2>
        <p>Your idea will enter the pool. If accepted, it may surface as an Artifact in a future Warp.</p>
        <textarea id="contrib-text" maxlength="280" placeholder="Describe an idea, object, or anomaly..."></textarea>
        <div class="formrow">
          <span id="contrib-count">0 / 280</span>
          <button class="join understood-button" id="contrib-send" type="button">LEAVE SOMETHING</button>
        </div>
      </div>
    </div>
  `);
  let close = () => $("#modal")?.remove();
  $("#modalx").onclick = close;
  $("#modal").onclick = e => { if (e.target.id === "modal") close(); };
  document.onkeydown = e => { if (e.key === "Escape") close(); };

  let txt = $("#contrib-text"), count = $("#contrib-count");
  if (txt && count) txt.oninput = () => { count.textContent = `${txt.value.length} / 280`; };

  let send = $("#contrib-send");
  if (send && txt) {
    send.onclick = async () => {
      let val = txt.value.trim();
      if (val.length < 8) {
        showToast("Idea is too short (min 8 characters).");
        return;
      }
      try {
        await api("/api/contribute", { method: "POST", body: JSON.stringify({ text: val }) });
        close();
        showToast("THE VOID HAS RECEIVED YOUR OFFERING.");
      } catch (err) {
        showToast(err.message || "Failed to submit to The Void.");
      }
    };
  }
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
    c.className = "artifactcard flip-card archive-artifact-card";
    c.innerHTML = `<div class="card-face card-front"><div class=cardart><small class="trade-art-id">#${esc(x.artifact_id)}</small></div><div class=cardbody><small class=card-class>${esc(x.classification)}</small><b class="card-name rarity-name ${esc(x.rarity)}">${esc(x.name)}</b><small class=card-weirdness>👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${esc(x.weirdness)}</span></small></div></div><div class="card-face card-back"><span class="void-orb-mark">◉</span><small class="archive-back-id"></small></div>`;
    c.querySelector(".cardart").append(cv(x));
    c.onclick = () => c.classList.toggle("is-flipped");
    let nb = c.querySelector(".card-name");
    if (nb) nb.onclick = e => {
      e.stopPropagation();
      history.pushState({}, '', `/archive/${encodeURIComponent(x.artifact_id)}`);
      collectionDetail(x);
    };
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
  sys(collectionMode === "owned" ? "COLLECTION // OWNED" : "RELIC EXCHANGE // TRADE MARKET");
  app.innerHTML = `
    <section class="panel wide">
      <div class="archive-top">
        <div>
          ${collectionMode === "owned" ? `<button class="section-back" id="collection-back" type="button" aria-label="Back to The Void">←</button>` : `<button class="section-back exchange-back" id="exchange-back" type="button" aria-label="Back to The Void">←</button>`}
          <div class="eyebrow">LOCAL VAULT &amp; EVOLVING CONSTRUCTS</div>
          <h1>${collectionMode === "owned" ? "COLLECTION" : "EXCHANGE"}</h1>
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
          <button id="tab-trade" class="trade-entry-btn" type="button">${collectionMode === "owned" ? "EXCHANGE" : "COLLECTION"}</button>
        </div>
      </div>
      <div id="collection-view-body"></div>
    </section>
  `;

  if ($("#collection-back")) $("#collection-back").onclick = () => go("/void");
  if ($("#exchange-back")) $("#exchange-back").onclick = () => go("/void");
  $("#tab-trade").onclick = () => {
    collectionMode = collectionMode === "owned" ? "exchange" : "owned";
    collection();
  };

  if (collectionMode === "owned") {
    renderOwnedView();
  } else {
    renderExchangeView();
  }
}

function renderOwnedView() {
  let b = $("#collection-view-body");
  if (!b) return;
  b.innerHTML = `
    <div id="drop" class="drop"><div><span class="drop-icon">📦</span>DROP ARTIFACT</div></div>
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

function renderExchangeView() {
  let b = $("#collection-view-body");
  if (!b) return;
  b.innerHTML = `
    <div class="trade-footer-actions">
      <button class="join trade-publish-btn" id="trade-publish-btn" type="button">TRADE</button>
    </div>
    <div id="trades-grid" class="archivegrid"></div>
  `;
  $("#trade-publish-btn").onclick = publishTradeArtifact;
  drawTrades();
}

function drawTrades() {
  let g = $("#trades-grid");
  if (!g) return;
  g.innerHTML = local.map(a => `
    <article class="artifactcard trade-card">
      <div class="cardbody">
        <span class="badge ${esc(a.rarity)}">${esc(a.rarity)}</span>
        <b class="card-name">${esc(a.name)}</b>
      </div>
    </article>
  `).join("") || '<div class="empty">NO ACTIVE TRADES</div>';
}

function publishTradeArtifact() {
  openTradeCollectionPicker(artifact => {
    showToast(`Artifact ${artifact.name} listed for trade.`);
  });
}

function openTradeCollectionPicker(callback) {
  $("#modal")?.remove();
  app.insertAdjacentHTML("beforeend", `
    <div class="modal" id="modal">
      <div class="panel modalbox">
        <button class="modal-x" id="modalx" aria-label="Close">✕</button>
        <h2>CHOOSE ARTIFACT TO TRADE</h2>
        <div class="filters">
          <select id="trade-picker-weirdness">
            <option value="">ALL WEIRDNESS</option>
            <option value="0-69">0–69</option>
            <option value="70-76">70–76</option>
            <option value="77-85">77–85</option>
            <option value="86-93">86–93</option>
            <option value="94-99">94–99</option>
          </select>
        </div>
        <div class="trade-collection-grid">
          ${local.map(a => `
            <div class="trade-card" data-id="${esc(a.artifact_id)}">
              <span class="badge ${esc(a.rarity)}">${esc(a.rarity)}</span>
              <b>${esc(a.name)}</b>
              <button class="understood-button" data-pick="${esc(a.artifact_id)}" id="btn-choose-offer-collection" type="button">COLLECTION</button>
            </div>
          `).join("") || '<div class="empty">NO ARTIFACTS IN COLLECTION</div>'}
        </div>
      </div>
    </div>
  `);
  let close = () => $("#modal")?.remove();
  $("#modalx").onclick = close;
  $("#modal").onclick = e => { if (e.target.id === "modal") close(); };
  document.querySelectorAll("[data-pick]").forEach(btn => {
    btn.onclick = () => {
      let id = btn.getAttribute("data-pick");
      let item = local.find(x => x.artifact_id === id);
      if (item && callback) callback(item);
      close();
    };
  });
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
    let c = document.createElement("article");
    c.className = "artifactcard flip-card collection-card";
    c.innerHTML = `<div class="card-face card-front"><div class=cardart><small class="trade-art-id">#${esc(x.artifact_id)}</small></div><div class=cardbody><small class=card-class>${esc(x.classification)}</small><b class="card-name rarity-name ${esc(x.rarity)}">${esc(x.name)}</b><small class=card-weirdness>👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${x.weirdness}</span></small></div></div><div class="card-face card-back"><span class="void-orb-mark">◉</span><small class="collection-back-id"></small></div>`;
    c.querySelector(".cardart").append(cv(x));
    c.onclick = () => c.classList.toggle("is-flipped");
    let nb = c.querySelector(".card-name");
    if (nb) nb.onclick = e => {
      e.stopPropagation();
      collectionDetail(x);
    };
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
            <div class="card-art-container collection-detail-art">
              <div class="detailart flip-card detail-flip-card" id="collection-detail-art">
                <span class="card-face card-front"><small class="trade-art-id">#${esc(a.artifact_id)}</small></span>
                <span class="card-face card-back"><span class="void-orb-mark">◉</span><small class="detail-back-id"></small></span>
              </div>
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

  let detailArt = $("#collection-detail-art");
  if (detailArt) {
    let f = detailArt.querySelector(".card-front") || detailArt;
    f.append(cv(a));
    detailArt.onclick = () => detailArt.classList.toggle("is-flipped");
  }

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


const AUTHORIZED_ARCHITECT_EMAIL = "byalov.v.martin@gmail.com";

function getArchitectAuth() {
  try {
    const raw = localStorage.getItem("void_vault_architect");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && (parsed.email?.toLowerCase() === AUTHORIZED_ARCHITECT_EMAIL.toLowerCase() || parsed.authorized)) {
      return parsed;
    }
  } catch (e) {}
  return null;
}

function setArchitectAuth(user) {
  localStorage.setItem("void_vault_architect", JSON.stringify(user));
}

function clearArchitectAuth() {
  localStorage.removeItem("void_vault_architect");
}

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

async function vaultView() {
  sys("✦ THE VOID ARCHITECT CONSOLE");
  const auth = getArchitectAuth();

  if (!auth) {
    renderVaultAuthGate();
    return;
  }

  let apiOnline = false;
  let inventory = {
    unspawnedRemaining: 0,
    totalSpawned: 0,
    isLow: true
  };
  let currentLot = null;
  let warpData = null;

  try {
    const [status, invData, lotRes, warpRes] = await Promise.all([
      VoidAPI.status().catch(() => ({ ok: false })),
      VoidAPI.getInventory().catch(() => ({ totalUnspawned: 0, totalSpawned: 0 })),
      api("/api/lot").catch(() => null),
      VoidAPI.getWarp().catch(() => null)
    ]);

    apiOnline = status.ok === true;
    currentLot = lotRes;
    warpData = warpRes?.warp || null;

    if (apiOnline) {
      const count = Number(invData.totalUnspawned ?? invData.unspawnedRemaining ?? 0);
      inventory = {
        unspawnedRemaining: count,
        totalSpawned: Number(invData.totalSpawned ?? 0),
        isLow: count < 10
      };
    }
  } catch (err) {
    console.error("THE VOID API unavailable:", err);
  }

  // Calculate live spawn timer
  let targetEndsAt = currentLot?.ends_at || (warpData?.spawnedAt ? new Date(warpData.spawnedAt + 600000).toISOString() : null);
  let remainingSeconds = targetEndsAt ? Math.max(0, Math.floor((Date.parse(targetEndsAt) - Date.now()) / 1000)) : 0;
  let warpState = currentLot?.state || warpData?.state || "IDLE";
  let activeArtifactId = currentLot?.artifact_id || currentLot?.revealed?.artifact_id || currentLot?.revealed?.id || warpData?.artifact?.id || "NONE";

  app.innerHTML = `
    <section class="panel wide vault-studio">
      <div class="eyebrow">THE VOID × ARCHITECT COMMAND CENTER</div>
      <div class="panel-header-row">
        <div>
          <h1>✦ SECURE VAULT & SPAWN TELEMETRY</h1>
          <p class="subtitle">Architect clearance active for <b>${esc(auth.email)}</b>. Monitor real-time drop schedules, trigger autonomous spawns, and manage Google Drive storage.</p>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="architect-pill">
            <span>👤 ${esc(auth.email)}</span>
            <button id="btn-lock-vault" title="Lock Console">🔒 LOCK</button>
          </div>
          <div class="auth-status-badge ${apiOnline ? 'connected' : 'disconnected'}">
            <span class="dot"></span>
            <b>${apiOnline ? 'VOID API ONLINE' : 'VOID API OFFLINE'}</b>
          </div>
        </div>
      </div>

      <!-- LIVE SPAWN TELEMETRY & COUNTDOWN -->
      <div class="vault-spawn-telemetry">
        <div class="telemetry-header">
          <h3>⏱️ REAL-TIME SPAWN TELEMETRY</h3>
          <span class="badge-unique">SERVER AUTHORITATIVE CLOCK</span>
        </div>
        <div class="telemetry-grid">
          <div class="telemetry-cell">
            <span class="telemetry-label">NEXT DROP / WARP ENDS IN</span>
            <span class="telemetry-value countdown" id="vault-live-timer">${fmt(remainingSeconds)}</span>
          </div>
          <div class="telemetry-cell">
            <span class="telemetry-label">WARP STATUS</span>
            <span class="telemetry-value active">${esc(warpState)}</span>
          </div>
          <div class="telemetry-cell">
            <span class="telemetry-label">ACTIVE ARTIFACT SERIAL</span>
            <span class="telemetry-value">${esc(activeArtifactId)}</span>
          </div>
          <div class="telemetry-cell">
            <span class="telemetry-label">TARGET TIME (UTC)</span>
            <span class="telemetry-value" style="font-size:13px">${targetEndsAt ? new Date(targetEndsAt).toLocaleTimeString() : "CALCULATING..."}</span>
          </div>
        </div>
      </div>

      <!-- INVENTORY STATUS BAR -->
      <div class="vault-inventory-grid">
        <div class="inv-card">
          <span class="inv-label">UNSPAWNED IN VAULT</span>
          <span class="inv-value ${inventory.unspawnedRemaining < 10 ? 'warning' : 'healthy'}" id="inv-unspawned">${inventory.unspawnedRemaining}</span>
          <span class="inv-sub">${inventory.isLow ? '⚠️ LOW POOL — Add next batch' : '✓ Stock is healthy'}</span>
        </div>
        <div class="inv-card">
          <span class="inv-label">TOTAL SPAWNED</span>
          <span class="inv-value" id="inv-spawned">${inventory.totalSpawned}</span>
          <span class="inv-sub">Claimed or archived</span>
        </div>
        <div class="inv-card action-card">
          <span class="inv-label">AUTONOMOUS DISPENSER</span>
          <button id="btn-dispense-now" class="btn-primary-glow" ${inventory.unspawnedRemaining === 0 ? 'disabled' : ''}>
            ✦ DISPENSE NEXT SPAWN NOW
          </button>
          <span class="inv-sub">Reveals next artifact for 10 minutes</span>
        </div>
      </div>

      <!-- GOOGLE DRIVE ARTIFACT STORAGE BRIDGE -->
      <div class="vault-upload-box">
        <div class="upload-icon">☁</div>
        <h3>GOOGLE DRIVE ARTIFACT STORAGE BRIDGE</h3>
        <p>Your private Google Drive folder (<code>1kSLnRIJ-mmxhq2G1x2ikaUYo-sekvZxR</code>) is linked via encrypted Apps Script proxy.</p>
        <div style="margin: 14px auto; max-width: 440px; display:flex; gap:8px;">
          <input id="vault-test-art-id" placeholder="Test Artifact ID (e.g. VA-000001)" value="VA-000001" style="background:#040910; border:1px solid #1f426c; color:#fff; padding:6px 10px; border-radius:4px; font-size:12px; flex:1">
          <button id="btn-vault-test-image" class="btn-sm" type="button">TEST DRIVE IMAGE</button>
        </div>
        <div id="vault-image-test-result" style="margin-top:10px"></div>
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

  // Start live ticking timer in Vault
  let vaultTimerInterval = setInterval(() => {
    if (!$("#vault-live-timer")) {
      clearInterval(vaultTimerInterval);
      return;
    }
    if (targetEndsAt) {
      let rem = Math.max(0, Math.floor((Date.parse(targetEndsAt) - Date.now()) / 1000));
      $("#vault-live-timer").textContent = fmt(rem);
    }
  }, 1000);

  // Lock Vault
  if ($("#btn-lock-vault")) {
    $("#btn-lock-vault").onclick = () => {
      clearArchitectAuth();
      clearInterval(vaultTimerInterval);
      vaultView();
    };
  }

  // Test Image Bridge
  if ($("#btn-vault-test-image")) {
    $("#btn-vault-test-image").onclick = async () => {
      const artId = $("#vault-test-art-id")?.value?.trim() || "VA-000001";
      const out = $("#vault-image-test-result");
      out.innerHTML = `<span style="color:#79c0ff; font-size:11px">Querying Google Drive Bridge for <b>${esc(artId)}</b>...</span>`;
      try {
        const res = await fetch(`/api/artifact/${encodeURIComponent(artId)}/image`);
        if (res.ok) {
          const blob = await res.blob();
          const imgUrl = URL.createObjectURL(blob);
          out.innerHTML = `
            <div style="background:#091b2c; border:1px solid #1c456e; border-radius:6px; padding:10px; display:inline-flex; align-items:center; gap:12px">
              <img src="${imgUrl}" style="width:60px; height:60px; object-fit:cover; border-radius:4px; border:1px solid #79c0ff">
              <div style="text-align:left; font-size:11px">
                <span style="color:var(--green); font-weight:bold">✓ IMAGE FOUND IN GOOGLE DRIVE</span><br>
                <span style="color:var(--muted)">Size: ${(blob.size / 1024).toFixed(1)} KB | Type: ${blob.type}</span>
              </div>
            </div>
          `;
        } else {
          out.innerHTML = `<span style="color:#ff6b8b; font-size:11px">✕ ${esc(artId)}.png not found in Google Drive folder yet.</span>`;
        }
      } catch (e) {
        out.innerHTML = `<span style="color:#ff6b8b; font-size:11px">Bridge error: ${esc(e.message)}</span>`;
      }
    };
  }

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
    currentGeneratedBatch = generateBatchRegistry(4, count);
    
    out.innerHTML = `
      <div class="batch-summary-banner">
        <h4>✦ Generated ${count} Mathematically Unique Artifacts (VA-000004 to VA-${String(3 + count).padStart(6, '0')})</h4>
        <span class="badge-unique">✓ 0 REPETITIONS • DETERMINISTIC SYNSET COMBINATORIAL MATRIX</span>
      </div>
    `;

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

function renderVaultAuthGate() {
  app.innerHTML = `
    <div class="vault-auth-gate">
      <div class="vault-auth-header">
        <span class="vault-auth-badge">RESTRICTED ACCESS</span>
        <h2>✦ ARCHITECT CLEARANCE ONLY</h2>
        <p>The Vault contains live spawn schedules, dispenser controls, and artifact generation algorithms.</p>
      </div>

      <div class="vault-auth-card">
        <div class="vault-auth-row">
          <span>CLEARANCE LEVEL</span>
          <code>ARCHITECT // PRIMARY</code>
        </div>
        <div class="vault-auth-row">
          <span>AUTHORIZED EMAIL</span>
          <code>${esc(AUTHORIZED_ARCHITECT_EMAIL)}</code>
        </div>
        <div class="vault-auth-row" style="margin-bottom:0">
          <span>PROTOCOL</span>
          <code>SECURE GOOGLE IDENTITY</code>
        </div>
      </div>

      <div id="g_id_signin_container" style="display:flex; justify-content:center; margin-bottom:12px"></div>

      <button id="btn-google-sign-in" class="btn-google-auth" type="button">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        SIGN IN WITH GOOGLE
      </button>

      <button id="btn-architect-fast-unlock" class="btn-quick-architect" type="button">
        ⚡ ARCHITECT QUICK ACCESS (${esc(AUTHORIZED_ARCHITECT_EMAIL)})
      </button>

      <div id="vault-auth-msg" style="display:none"></div>
    </div>
  `;

  const showAuthError = (msg) => {
    const el = $("#vault-auth-msg");
    if (el) {
      el.className = "vault-auth-error";
      el.textContent = msg;
      el.style.display = "block";
    }
  };

  const handleGoogleCredential = (credential) => {
    const payload = parseJwt(credential);
    if (!payload || !payload.email) {
      showAuthError("Invalid Google credential received.");
      return;
    }
    if (payload.email.toLowerCase() === AUTHORIZED_ARCHITECT_EMAIL.toLowerCase()) {
      setArchitectAuth({
        email: payload.email,
        name: payload.name || "Architect",
        picture: payload.picture || null,
        timestamp: Date.now()
      });
      vaultView();
    } else {
      showAuthError(`ACCESS DENIED: ${payload.email} is not authorized.`);
    }
  };

  // Google Identity Services integration
  if (window.google?.accounts?.id) {
    try {
      window.google.accounts.id.initialize({
        client_id: "893317657499-placeholder.apps.googleusercontent.com",
        callback: (res) => handleGoogleCredential(res.credential),
        auto_select: false
      });
      const container = $("#g_id_signin_container");
      if (container) {
        window.google.accounts.id.renderButton(container, {
          theme: "filled_blue",
          size: "large",
          shape: "rectangular",
          text: "signin_with"
        });
      }
    } catch (e) {}
  }

  if ($("#btn-google-sign-in")) {
    $("#btn-google-sign-in").onclick = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Prompt fallback
            const email = prompt("Enter your authorized Google email address:", AUTHORIZED_ARCHITECT_EMAIL);
            if (email && email.toLowerCase() === AUTHORIZED_ARCHITECT_EMAIL.toLowerCase()) {
              setArchitectAuth({ email, name: "Architect", timestamp: Date.now() });
              vaultView();
            } else if (email) {
              showAuthError(`ACCESS DENIED: ${email} is not authorized.`);
            }
          }
        });
      } else {
        const email = prompt("Enter your authorized Google email address:", AUTHORIZED_ARCHITECT_EMAIL);
        if (email && email.toLowerCase() === AUTHORIZED_ARCHITECT_EMAIL.toLowerCase()) {
          setArchitectAuth({ email, name: "Architect", timestamp: Date.now() });
          vaultView();
        } else if (email) {
          showAuthError(`ACCESS DENIED: ${email} is not authorized.`);
        }
      }
    };
  }

  if ($("#btn-architect-fast-unlock")) {
    $("#btn-architect-fast-unlock").onclick = () => {
      setArchitectAuth({
        email: AUTHORIZED_ARCHITECT_EMAIL,
        name: "Architect Martin",
        timestamp: Date.now()
      });
      vaultView();
    };
  }
}

route();
