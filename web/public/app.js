    import { VoidAPI } from "./void-api.js";
    import { getArtifactBySerial, generateBatchRegistry } from "./void-lexicon.js";

    const app = document.querySelector("#app"), $ = s => document.querySelector(s);
    const api = async (u, o = {}) => { let r = await fetch(u, { headers: { "content-type": "application/json" }, ...o }), x = await r.json(); if (!r.ok) throw Error(x.error || r.statusText); return x };
    let timer = null, presenceTimer = null, visitorTimer = null, voidSnake = null, current = null, local = [], joinAttempts = 0, homeArchive = [], liveVisitors = 0, activeWitnesses = 0, collectionMode = "owned", selectedSecretSet = "", feedEvents = [], feedSnapshot = null, feedRenderSnapshot = null, chatSnapshot = null, countdownTimer = null, homeTimer = null;

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
      if (!a) {
        let c = document.createElement("canvas");
        c.width = c.height = 24;
        return c;
      }

      const artifactId = a.artifact_id || a.id || a.artifactId || null;
      const imageUrl = a.imageUrl || (artifactId ? VoidAPI.artifactImageUrl(artifactId) : "");

      if (imageUrl) {
        let wrap = document.createElement("div");
        wrap.className = "vector-card-art render-3d-art";
        let img = document.createElement("img");
        img.src = imageUrl;
        img.alt = a.name || artifactId || "Artifact";
        img.className = "fluent-3d-img";
        img.referrerPolicy = "no-referrer";
        img.onerror = () => {
          console.warn("Artifact image failed:", artifactId, imageUrl);
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
      if (a.svg) {
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
      stopVoidSnake();
      clearInterval(timer);
      clearInterval(presenceTimer);
      clearInterval(visitorTimer);
      clearTimeout(publicWarpWakeTimer);
      publicWarpWakeTimer = null;
      setTabTitle(false);
      nav();
      if ($("#winner-contribute")) $("#winner-contribute").hidden = true;
      // Event-driven UI: no global 5-second activity polling.
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
      current = await api("/api/lot");
      if (current.revealed && current.winner) addToCollection(current.revealed);
      try {
        const archiveRes = await VoidAPI.getArchive();
        homeArchive = Array.isArray(archiveRes?.entries) ? archiveRes.entries : [];
      } catch {
        homeArchive = [];
      }
      await syncWarpWithWorker();
      await refreshActivity();
      drawHome(current, homeArchive);
      refreshChat();

      // No /api/lot or /api/heartbeat polling.
      // WARP world changes arrive through the scheduled public-state check only.

      // One-second UI clock only. It NEVER polls Worker.
      // WAITING shows elapsed WARP presence time only after JOIN THE WARP.
      // The elapsed clock is local-only and has no relation to the real spawn.
      // The hidden public wake-up uses one setTimeout per Artifact cycle.
      presenceTimer = setInterval(async () => {
        if (!current?.revealed) {
          if (warpStateClosed) {
            if ($("#spawn-clock")) $("#spawn-clock").textContent = "WARP CLOSED";
          } else if (warpDropActive) {
            lootSecondsRemaining = realExpiresAt
              ? Math.max(0, Math.ceil((realExpiresAt - Date.now()) / 1000))
              : 0;
            if ($("#loot-timer")) $("#loot-timer").textContent = `${lootSecondsRemaining}s`;

            // Exactly one state check when the LOOT window boundary is reached.
            if (lootSecondsRemaining <= 0 && !warpCheckInProgress) {
              await checkPublicWarpOnce();
            }
          } else if (joinedWarpGimmick) {
            // Pure local elapsed timer: 00:00 → 00:01 → 00:02 → ...
            // No fetch, no Worker request, no relation to the real spawn time.
            const elapsed = getJoinedWarpElapsedSeconds();
            if ($("#spawn-clock")) {
              $("#spawn-clock").textContent = `◉ WARP ${formatWarpElapsed(elapsed)}`;
            }
          }
        }

        if (current?.joined && !current?.revealed) {
          current.my_presence_seconds = (current.my_presence_seconds || 0) + 1;
          updatePresence(current);
        }
      }, 1000);
    }

    async function refreshActivity() {
      try {
        let a = await api("/api/activity");
        liveVisitors = a.current?.live_visitors || 0;
        activeWitnesses = a.current?.participants || 0;
        syncFeed(a, current, homeArchive);
        if ($("#online")) $("#online").textContent = liveVisitors;
        if ($("#active-witnesses")) $("#active-witnesses").textContent = activeWitnesses;
        renderFeed();
      } catch { }
    }

    async function refreshChat() {
      if (!$("#warp-chat")) return;
      try {
        let chat = await api("/api/chat"), key = `${chat.warp_id}|${chat.messages.map(x => `${x.id}:${x.created_at}`).join(",")}`;
        if (key !== chatSnapshot) {
          chatSnapshot = key;
          renderChat(chat);
        }
      } catch { }
    }

    function renderChat(chat) {
      let wrap = $("#warp-chat");
      if (!wrap) return;
      let messages = chat.messages.map(x => `<div class="chat-message ${x.mode === "TRADE" ? "trade-message" : ""}"><b>${esc(x.name)}${x.mode === "TRADE" ? " · TRADE" : ""}</b><span>${esc(x.text)}</span></div>`).join("") || `<div class="chat-empty">NO MESSAGES YET.</div>`;
      wrap.innerHTML = `<div class="warp-chat-head"><h3>CHAT</h3><label class="chat-trade-mode"><input id="chat-trade-mode" type="checkbox"> <span>TRADE</span></label></div><div class="chat-messages">${messages}</div><form class="chat-form" id=chat-form><input id=chat-input maxlength=280 placeholder="SEND A MESSAGE..." aria-label="Send a chat message"><button type=submit>SEND</button></form>`;
      let tradeMode = $("#chat-trade-mode"), input = $("#chat-input");
      if (tradeMode) tradeMode.onchange = () => { input.placeholder = tradeMode.checked ? "SEND A TRADE MESSAGE..." : "SEND A MESSAGE..."; };
      let form = $("#chat-form");
      if (form) form.onsubmit = async e => {
        e.preventDefault();
        let text = input.value;
        if (!text.trim()) return;
        try {
          input.disabled = true;
          await api("/api/chat", { method: "POST", body: JSON.stringify({ text, mode:tradeMode?.checked ? "TRADE" : "CHAT" }) });
          input.value = "";
          chatSnapshot = null;
          await refreshChat();
        } catch (error) {
          showToast(error.message.replaceAll("_", " "));
        } finally {
          if ($("#chat-input")) $("#chat-input").disabled = false;
        }
      };
    }

    function addFeedEvent(message, key = `${Date.now()}-${message}`) {
      if (feedEvents.some(x => x.key === key)) return;
      feedEvents.unshift({ time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), message, key });
      feedEvents = feedEvents.slice(0, 24);
    }

    function syncFeed(activity, l, arc) {
      if (!l) return;
      let snapshot = { id: l.id, state: l.state, archiveId: arc[0]?.artifact_id || null };
      if (!feedSnapshot) {
        addFeedEvent(`The Warp #${l.id} is ${l.found_owner ? "awaiting a new signal" : "accepting witnesses"}`, `warp-${l.id}`);
      } else {
        if (snapshot.id !== feedSnapshot.id) addFeedEvent(`The Warp #${snapshot.id} is accepting witnesses`, `warp-${snapshot.id}`);
        if (snapshot.state !== feedSnapshot.state) addFeedEvent(snapshot.state === "REVEAL" ? "The Warp changed state" : `The Warp #${snapshot.id} is active`, `state-${snapshot.id}-${snapshot.state}`);
        if (snapshot.archiveId && snapshot.archiveId !== feedSnapshot.archiveId && arc[0]) addFeedEvent(`<a class=event-link href=/archive/${encodeURIComponent(arc[0].artifact_id)} data-link>${esc(arc[0].name)} entered The Void</a>`, `archive-${snapshot.archiveId}`);
      }
      feedSnapshot = snapshot;
    }

    function feedKey(key) { return encodeURIComponent(key); }
    function feed() { return feedEvents.map(x => `<div class=event data-feed-key="${feedKey(x.key)}"><time>${x.time}</time><div>${x.message}</div></div>`).join(""); }

    function renderFeed() {
      let node = $("#feed"), snapshot = feedEvents.map(x => x.key).join("|");
      if (!node || snapshot === feedRenderSnapshot) return;
      let existing = new Map([...node.children].map(event => [event.dataset.feedKey, event])), active = new Set();
      for (let x of feedEvents) {
        let key = feedKey(x.key), event = existing.get(key);
        if (!event) {
          event = document.createElement("div");
          event.className = "event";
          event.dataset.feedKey = key;
          event.innerHTML = `<time>${x.time}</time><div>${x.message}</div>`;
        }
        node.append(event);
        active.add(key);
      }
      for (let [key, event] of existing) if (!active.has(key)) event.remove();
      feedRenderSnapshot = snapshot;
    }

    function drawHome(l, arc) {
      sys(l.revealed ? "ARTIFACT SURFACED" : l.found_owner ? "ARTIFACT FOUND ITS NEW OWNER" : "CLOSING CONDITION UNKNOWN");
      app.innerHTML = `<section class=platform>
        <aside class="panel feedpanel"><h3>LIVE FEED</h3><div id=feed>${feed(arc, l)}</div></aside>
        <section class="panel lotpanel"><div class=panel-title><h2>${l.revealed ? "NEW DISCOVERY" : "UNKNOWN ARTIFACT"}</h2></div><div class=lotgrid><div><div class=artifact-stage id=stage></div><div class=activity-strip><span>ACTIVE SOULS: <b><i class=live-dot></i><span id=active-witnesses>${activeWitnesses}</span></b></span><span>CLAIM: <b id=claim-under-stage>${esc(l.claim_label)}</b></span></div><div id=trace-slot></div></div><div id=lotdetails></div></div></section>
        <section id=warp-chat class="panel warp-chat"><div class="warp-chat-head"><h3>CHAT</h3><label class="chat-trade-mode"><input type="checkbox" disabled> <span>TRADE</span></label></div><form class="chat-form"><input disabled placeholder="LOADING CHAT..." aria-label="Loading chat"><button disabled>SEND</button></form></section>
      <section class="panel recentpanel"><div class=panel-title><h2>RECENTLY DISCOVERED</h2></div><div class="recent-slider"><div class=recentgrid id=recent></div><button class="recent-nav recent-nav-prev" id=recent-prev type=button aria-label="Show previous discoveries">←</button><button class="recent-nav recent-nav-next" id=recent-next type=button aria-label="Show next discoveries">→</button></div></section>
      </section>`;
      feedRenderSnapshot = feedEvents.map(x => x.key).join("|");
      drawLotPart(l);
      drawRecent(arc.slice(0, 12));
      updateHome(l);
    }

    let warpDropActive = false;
    let lootSecondsRemaining = 60;
    let warpStateClosed = true;
    let realExpiresAt = null;
    let activeWarpArtifact = null;
    let warpSocket = null;
    let warpSocketReconnectTimer = null;

    // Public wake-up boundary. This is NOT the real Worker spawn timestamp.
    let publicRevealAt = null;
    let publicWarpWakeTimer = null;
    let warpCheckInProgress = false;

    // JOIN THE WARP elapsed-time gimmick.
    // It starts at 00:00, counts upward locally, has zero authority,
    // makes zero network requests and reveals nothing about the real spawn time.
    let joinedWarpGimmick = false;
    let warpJoinedAt = null;

    function getJoinedWarpElapsedSeconds() {
      if (!joinedWarpGimmick || warpJoinedAt === null) return 0;
      return Math.max(0, Math.floor((performance.now() - warpJoinedAt) / 1000));
    }

    function formatWarpElapsed(totalSeconds) {
      totalSeconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const parts = hours > 0 ? [hours, minutes, seconds] : [minutes, seconds];
      return parts.map(value => String(value).padStart(2, "0")).join(":");
    }

    function schedulePublicWarpWake(revealAt) {
      clearTimeout(publicWarpWakeTimer);
      publicWarpWakeTimer = null;
      publicRevealAt = Number(revealAt) || null;
      if (!publicRevealAt) return;

      const delay = Math.max(0, publicRevealAt - Date.now());
      publicWarpWakeTimer = setTimeout(() => {
        publicWarpWakeTimer = null;
        checkPublicWarpOnce();
      }, delay);
    }

    function normalizePublicArtifact(artifact) {
      if (!artifact) return null;
      const id = artifact.artifact_id || artifact.id || artifact.artifactId || null;
      return {
        ...artifact,
        id: artifact.id || id,
        artifact_id: artifact.artifact_id || id,
        imageUrl: artifact.imageUrl || (id ? VoidAPI.artifactImageUrl(id) : "")
      };
    }

    async function refreshPublicArchiveOnHome() {
      if (location.pathname !== "/" && location.pathname !== "/void") return;
      try {
        const archiveRes = await VoidAPI.getArchive();
        homeArchive = Array.isArray(archiveRes?.entries) ? archiveRes.entries.map(normalizePublicArtifact) : [];
        drawRecent(homeArchive.slice(0, 12));
      } catch (err) {
        console.warn("Archive refresh failed:", err);
      }
    }

    function applyPublicWarpState(state) {
      if (!state) return;

      if (Array.isArray(state.feed)) {
        feedEvents = state.feed.map(event => ({
          key: event.id || `${event.at}-${event.type}`,
          time: new Date(event.at || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          message: `<b>${esc(event.title || event.type || "THE VOID")}</b>${event.text ? `<br>${esc(event.text)}` : ""}`
        }));
        feedRenderSnapshot = null;
        renderFeed();
      }

      if (state.state === "ACTIVE" && state.artifact) {
        warpDropActive = true;
        warpStateClosed = false;
        activeWarpArtifact = normalizePublicArtifact(state.artifact);
        realExpiresAt = Number(state.loot?.closesAt) || null;
        lootSecondsRemaining = realExpiresAt ? Math.max(0, Math.ceil((realExpiresAt - Date.now()) / 1000)) : 60;
        publicRevealAt = null;
        clearTimeout(publicWarpWakeTimer);
        publicWarpWakeTimer = null;

        if (current && (location.pathname === "/" || location.pathname === "/void")) {
          drawLotPart(current);
          sys("ARTIFACT SURFACED");
          refreshPublicArchiveOnHome();
        }
        return;
      }

      activeWarpArtifact = null;
      if (state.state === "WAITING") {
        warpDropActive = false;
        warpStateClosed = false;
        realExpiresAt = null;
        // The real future spawn time remains secret. WebSocket will announce ACTIVE.
        clearTimeout(publicWarpWakeTimer);
        publicWarpWakeTimer = null;
        if (current && (location.pathname === "/" || location.pathname === "/void")) drawLotPart(current);
        return;
      }

      warpDropActive = false;
      warpStateClosed = true;
      realExpiresAt = null;
      publicRevealAt = null;
      joinedWarpGimmick = false;
      warpJoinedAt = null;
      clearTimeout(publicWarpWakeTimer);
      publicWarpWakeTimer = null;
      if (current && (location.pathname === "/" || location.pathname === "/void")) drawLotPart(current);
    }

    function connectWarpStream() {
      if (warpSocket && (warpSocket.readyState === WebSocket.OPEN || warpSocket.readyState === WebSocket.CONNECTING)) return;
      clearTimeout(warpSocketReconnectTimer);
      warpSocketReconnectTimer = null;

      try {
        warpSocket = new WebSocket(VoidAPI.warpSocketUrl());
        warpSocket.onmessage = event => {
          try {
            const state = JSON.parse(event.data);
            applyPublicWarpState(state);
          } catch (err) {
            console.warn("Invalid WARP push message:", err);
          }
        };
        warpSocket.onclose = () => {
          warpSocket = null;
          clearTimeout(warpSocketReconnectTimer);
          warpSocketReconnectTimer = setTimeout(connectWarpStream, 3000);
        };
        warpSocket.onerror = () => {
          try { warpSocket.close(); } catch {}
        };
      } catch (err) {
        console.warn("WARP stream connection failed:", err);
        clearTimeout(warpSocketReconnectTimer);
        warpSocketReconnectTimer = setTimeout(connectWarpStream, 3000);
      }
    }

    async function syncWarpWithWorker() {
      await checkPublicWarpOnce();
      connectWarpStream();
    }

    async function checkPublicWarpOnce() {
      if (warpCheckInProgress) return;
      warpCheckInProgress = true;
      try {
        const state = await VoidAPI.getPublicWarpState();
        applyPublicWarpState(state);
      } catch (err) {
        console.warn("Public WARP state check failed:", err);
      } finally {
        warpCheckInProgress = false;
      }
    }

    function drawLotPart(l) {
      stopVoidSnake();
      let st = $("#stage"), d = $("#lotdetails"), joinNext = async () => {
        current = await api("/api/join", { method: "POST", body: JSON.stringify({ country: Intl.DateTimeFormat().resolvedOptions().timeZone || "UNKNOWN" }) });
        joinAttempts = 0;
        drawLotPart(current);
        chatSnapshot = null;
        refreshChat();
        try {
          const claimRes = await VoidAPI.claimWarp(getVoidClaimId());
          if (claimRes?.result === "CLAIMED" && claimRes.artifact) {
            addToCollection(claimRes.artifact);
            showToast(`${claimRes.artifact.name} CLAIMED!`);
          }
        } catch (e) {}
      };
      if (!st) return;
      st.innerHTML = "";
      if (l.revealed) {
        let a = l.revealed;
        let c = cv(a);
        c.className = "hero-pixel reveal-artifact";
        st.append(c);
        d.innerHTML = `<div class=reveal-panel><div class=lot-kicker>CURRENT WARP #${l.id}</div><h1>${esc(a.name)}</h1><p>${esc(a.lore)}</p><div class=statbox>${kv("Classification", a.classification)}${kv("Rarity", `<span class="rarity ${esc(a.rarity)}">${esc(a.rarity)}</span>`)}${kv("Weirdness", `<span class="detail-weirdness weirdness-val ${weirdnessTier(a.weirdness)}">${a.weirdness}</span>`)}${kv("Status", "ARCHIVED")}</div><p class=condition>${l.winner ? "The artifact has surfaced.<br>Its record is now permanent." : "The artifact surfaced for another SOUL.<br>Its record is now permanent."}</p></div><div class="participation-actions lot-action-height"><button class=join id=join-next type=button>JOIN THE WARP</button></div>`;
        $("#trace-slot").innerHTML = l.winner ? '<a class="trace-note" href="/collection" data-link>YOUR PRESENCE LEFT A TRACE</a>' : `<div class="trace-note reveal-owner-note">${esc(a.name)} FOUND ITS NEW OWNER</div>`;
        $("#join-next").onclick = () => {
          joinNext();
        };
      } else if (l.found_owner) {
        st.append(silhouette(l.next_warp?.silhouette_pixels));
        $("#trace-slot").innerHTML = `<div class="owner-found-panel"><h1>${esc(l.surfaced_name || "AN ARTIFACT")}</h1><strong>FOUND ITS NEW OWNER</strong><p>The artifact has left THE VOID.</p></div>`;
        d.innerHTML = `<div class=lot-kicker>NEXT WARP #${esc(l.next_warp?.id || "???")}</div><p>The next WARP is accepting witnesses now.</p><div class=participation-actions><button class=join id=join-next type=button>JOIN THE WARP</button></div>`;
        $("#join-next").onclick = () => {
          joinNext();
        };
      } else {
        $("#trace-slot").innerHTML = "";
        if (warpDropActive && activeWarpArtifact) {
          const art = cv(activeWarpArtifact);
          art.className = "hero-pixel reveal-artifact";
          st.append(art);
        } else {
          let mystery = document.createElement("button");
          mystery.type = "button";
          mystery.className = `mystery mystery-shape-${Math.abs(Number(l.id) || 0) % 20}`;
          mystery.setAttribute("aria-label", "Open The Void support window");
          mystery.innerHTML = '<span class="mystery-question">?</span>';
          mystery.onclick = showAbout;
          st.append(mystery);
          setupSecretStage(st, mystery);
        }
        
        let actionButtonHtml = "";
        if (warpStateClosed) {
          actionButtonHtml = `<button class="join spawn-timer-btn" id=join disabled style="opacity:0.55; cursor:not-allowed"><span id="spawn-clock">WARP CLOSED</span></button>`;
        } else if (warpDropActive) {
          actionButtonHtml = `<button class="join active-loot loot-btn" id=join style="background:linear-gradient(90deg,#00e676,#00b0ff);border-color:#b9f6ca;color:#050b14;font-weight:900;box-shadow:0 0 20px rgba(0,230,118,0.5)">✦ LOOT ARTIFACT (<span id="loot-timer">${lootSecondsRemaining}s</span>)</button>`;
        } else {
          actionButtonHtml = joinedWarpGimmick
            ? `<button class="join spawn-timer-btn" id=join type=button><span id="spawn-clock">◉ WARP ${formatWarpElapsed(getJoinedWarpElapsedSeconds())}</span></button>`
            : `<button class="join spawn-timer-btn" id=join type=button><span id="spawn-clock">JOIN THE WARP</span></button>`;
        }

        d.innerHTML = `<div class=lot-kicker>CURRENT WARP #${l.id}</div><p>${warpDropActive ? "✦ AN ARTIFACT HAS DROPPED! LOOT WINDOW ACTIVE (1 MINUTE)!" : (warpStateClosed ? "No artifacts active in The Void queue." : "Its true nature is hidden... for now.")}</p><div class="statbox current-lot-stats">${kv("Classification", warpDropActive ? esc(activeWarpArtifact?.classification || activeWarpArtifact?.class || "SURFACED") : "???")}<div class=rarity-row><span>Rarity</span><b>${warpDropActive ? `<span class="rarity ${esc(activeWarpArtifact?.rarity || "COMMON")}">${esc(activeWarpArtifact?.rarity || "DISCOVERED")}</span>` : '<span class="rarity hidden-rarity">???</span>'}</b></div>${kv("Origin", "THE VOID")}${kv("Weirdness", warpDropActive ? esc(activeWarpArtifact?.weirdness ?? "?") : "???")}</div><p class=condition>${warpDropActive ? "✦ Drop is active! Click LOOT within the 1-minute window." : (warpStateClosed ? "Warp closed.<br>Vault queue is empty." : "Closing condition unknown.<br>Stay awhile and do whatever...")}</p><div class="participation-actions lot-action-height">${actionButtonHtml}</div>`;
        
        $("#join").onclick = async () => {
          if (warpDropActive) {
            const btn = $("#join");
            btn.disabled = true;
            btn.textContent = "✦ LOOTING...";
            try {
              let lootArtifact = null;
              try {
                const claimRes = await VoidAPI.claimWarp(getVoidClaimId());
                if (claimRes?.result === "CLAIMED" && claimRes.artifact) {
                  lootArtifact = normalizePublicArtifact(claimRes.artifact);
                }
              } catch {}

              if (!lootArtifact) {
                throw new Error("WORKER_DID_NOT_RETURN_ARTIFACT");
              }

              addToCollection(lootArtifact);
              playArtifactResonance(lootArtifact.seed || 12345, 95);
              showToast(`✦ SUCCESS! ${lootArtifact.name} LOOTED TO COLLECTION!`);
              // Claim does not end the global ACTIVE window, so no extra state fetch here.
              current.revealed = lootArtifact;
              current.winner = true;
              drawLotPart(current);
            } catch (err) {
              showToast("Loot attempt: " + err.message);
              btn.disabled = false;
            }
          } else {
            // JOIN THE WARP only starts a local elapsed-time gimmick at 00:00.
            // It does not call Worker and it does not know the secret spawn time.
            if (!warpStateClosed) {
              if (!joinedWarpGimmick) {
                joinedWarpGimmick = true;
                warpJoinedAt = performance.now();
              }
              showToast("◉ YOU ARE WATCHING THE WARP.");
              drawLotPart(current);
            } else {
              showToast("WARP CLOSED.");
            }
          }
        };
        updateHome(l);
      }
    }

    function setupSecretStage(stage, mystery) {
      let attempts = 0;
      stage.classList.add("secret-stage");
      stage.onclick = event => {
        if (voidSnake || event.target.closest(".mystery")) return;
        attempts++;
        if (attempts < 4) {
          mystery.classList.remove("secret-stir-1", "secret-stir-2", "secret-stir-3");
          void mystery.offsetWidth;
          mystery.classList.add(`secret-stir-${attempts}`);
          return;
        }
        startVoidSnake(stage, mystery);
      };
    }

    function stopVoidSnake() {
      if (!voidSnake) return;
      clearInterval(voidSnake.timer);
      document.removeEventListener("keydown", voidSnake.onKey);
      voidSnake.canvas.remove();
      voidSnake.stage.classList.remove("snake-active");
      voidSnake = null;
    }

    function startVoidSnake(stage, mystery) {
      let canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), columns = 24, rows = 12, snake = [{x:11,y:6},{x:10,y:6},{x:9,y:6}], direction = {x:1,y:0}, pending = direction, food = {x:17,y:3};
      canvas.className = "void-snake-canvas";
      canvas.width = columns;
      canvas.height = rows;
      canvas.setAttribute("aria-label", "Void snake game. Use arrow keys or WASD to move.");
      stage.prepend(canvas);
      stage.classList.add("snake-active");
      let placeFood = () => {
        do food = {x:Math.floor(Math.random()*columns),y:Math.floor(Math.random()*rows)};
        while (snake.some(part => part.x === food.x && part.y === food.y));
      };
      let draw = () => {
        ctx.clearRect(0,0,columns,rows);
        ctx.fillStyle = "#b94cff";
        for (let i = snake.length - 1; i >= 0; i--) {
          let part = snake[i];
          ctx.globalAlpha = Math.max(.34, 1 - i / (snake.length + 3));
          ctx.fillRect(part.x,part.y,1,1);
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#e7c6ff";
        ctx.fillRect(snake[0].x,snake[0].y,1,1);
        ctx.fillStyle = "#7f4dff";
        ctx.fillRect(food.x,food.y,1,1);
      };
      let step = () => {
        direction = pending;
        let head = {x:(snake[0].x + direction.x + columns) % columns,y:(snake[0].y + direction.y + rows) % rows};
        if (snake.some(part => part.x === head.x && part.y === head.y)) {
          snake = [{x:11,y:6},{x:10,y:6},{x:9,y:6}];
          direction = pending = {x:1,y:0};
          placeFood();
        } else {
          snake.unshift(head);
          if (head.x === food.x && head.y === food.y) placeFood();
          else snake.pop();
        }
        draw();
      };
      let onKey = event => {
        let move = ({ArrowUp:{x:0,y:-1},w:{x:0,y:-1},W:{x:0,y:-1},ArrowDown:{x:0,y:1},s:{x:0,y:1},S:{x:0,y:1},ArrowLeft:{x:-1,y:0},a:{x:-1,y:0},A:{x:-1,y:0},ArrowRight:{x:1,y:0},d:{x:1,y:0},D:{x:1,y:0}})[event.key];
        if (!move) return;
        event.preventDefault();
        if (move.x !== -direction.x || move.y !== -direction.y) pending = move;
      };
      voidSnake = {stage,canvas,onKey,timer:setInterval(step,115)};
      document.addEventListener("keydown", onKey);
      mystery.classList.add("secret-snake-awake");
      draw();
    }


    const kv = (a, b) => `<div><span>${a}</span><b>${b}</b></div>`;
    function setTabTitle(show, seconds = 0) { document.title = show ? `THE VOID · ${fmt(seconds)}` : "THE VOID"; }
    function updatePresence(l) {
      if ($("#presence-clock")) $("#presence-clock").textContent = fmt(l.my_presence_seconds);
      if ($("#presence")) $("#presence").textContent = fmt(l.my_presence_seconds);
      if ($("#claim")) $("#claim").textContent = l.claim_label;
      if ($("#claim-under-stage")) $("#claim-under-stage").textContent = l.claim_label;
      if ($("#active-witnesses")) $("#active-witnesses").textContent = activeWitnesses;
      setTabTitle(!!(l.joined && !l.revealed), l.my_presence_seconds);
    }
    function updateWinnerAction(l) {
      let button = $("#winner-contribute"), submitted = sessionStorage.getItem(`void_contributed_${l?.id}`) === "1";
      if (!button) return;
      button.hidden = !(l?.winner && !submitted);
      if (!button.hidden) button.onclick = contribute;
    }
    function updateHome(l) {
      if ($("#online")) $("#online").textContent = liveVisitors;
      updateWinnerAction(l);
      updatePresence(l);
    }

    function showAbout() {
      if ($("#modal")) return;
      app.insertAdjacentHTML("beforeend", `<div class=modal id=modal><div class="panel modalbox"><button class=modal-x id=modalx aria-label="Close"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"></line><line x1="12" y1="2" x2="2" y2="12"></line></svg></button><h2>THE VOID</h2><div class=voidq>◉</div><strong>UNKNOWN DEPTH</strong><p>Ideas enter here. Artifacts sometimes return.</p><a class=coffee-button href="https://www.buymeacoffee.com/thevoid" target="_blank" rel="noopener noreferrer"><img class="mx-auto h-14" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee"></a></div></div>`);
      let close = () => $("#modal")?.remove();
      $("#modalx").onclick = close;
      $("#modal").onclick = e => { if (e.target.id === "modal") close(); };
      document.onkeydown = e => { if (e.key === "Escape") close(); };
    }

    function getWarpElapsedSeconds(warp) {
      if (!warp?.spawnedAt) return 0;
      const spawnedAt = Number(warp.spawnedAt);
      if (!Number.isFinite(spawnedAt)) return 0;
      const end = warp.claimedAt || warp.archivedAt || Date.now();
      return Math.max(0, Math.floor((Number(end) - spawnedAt) / 1000));
    }

    function formatWarpTime(totalSeconds) {
      const seconds = Math.max(0, Math.floor(totalSeconds));
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      if (hours > 0) return [hours, String(minutes).padStart(2, "0"), String(secs).padStart(2, "0")].join(":");
      return [String(minutes).padStart(2, "0"), String(secs).padStart(2, "0")].join(":");
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

    function bindClaimButton(warp) {
      const button = document.getElementById("warp-claim-timer");
      if (!button) return;
      button.addEventListener("click", async () => {
        if (button.disabled) return;
        const message = document.getElementById("warp-claim-message");
        button.disabled = true;
        try {
          const result = await VoidAPI.claimWarp(getVoidClaimId());
          if (result.result === "NOT_YET") {
            if (message) message.textContent = "NOTHING HAPPENED.";
            setTimeout(() => { if (message) message.textContent = ""; }, 1800);
            return;
          }
          if (result.result === "CLAIMED") {
            clearInterval(countdownTimer);
            drawHome(result.warp);
          }
        } catch (e) {
          if (message) message.textContent = "FAILED TO CLAIM.";
        } finally {
          button.disabled = false;
        }
      });
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

    async function archive() {
      sys("ARCHIVE SIGNAL ACQUIRED");
      let archiveRes = await VoidAPI.getArchive(), all = (Array.isArray(archiveRes?.entries) ? archiveRes.entries : []).map(normalizePublicArtifact), rarities = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"];
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
      let archiveRes = await VoidAPI.getArchive(), all = (Array.isArray(archiveRes?.entries) ? archiveRes.entries : []).map(normalizePublicArtifact), a = all.find(x => x.artifact_id === id);
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
      app.innerHTML = `<section class="panel wide"><div class=archive-top><div>${collectionMode === "trade" ? '<button class="exchange-back" id="exchange-back" type="button" aria-label="Back to collection">←</button><div class=eyebrow>LOCAL VAULT &amp; EXCHANGE</div>' : '<button class="section-back" id="collection-back" type="button" aria-label="Back to The Void">←</button><div class=eyebrow>LOCAL VAULT &amp; EXCHANGE</div>'}<h1>${collectionMode === "owned" ? "COLLECTION" : "EXCHANGE"}</h1><p>Your artifacts live with you, not with THE VOID.</p></div><div class="collection-header-controls">${collectionMode === 'owned' ? `<button class="trade-entry-btn" id="tab-trade" type="button">TRADE</button><div class="filters collection-filters"><input id=collection-q placeholder="SEARCH ARTIFACTS"><select id="collection-sort" aria-label="Sort artifacts alphabetically"><option value="asc">NAME A–Z</option><option value="desc">NAME Z–A</option></select><select class="rarity-filter" id="collection-r"><option value="">ALL RARITIES</option>${["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"].map(r => `<option class="rarity-option ${r}">${r}</option>`).join("")}</select><select id=collection-c><option value="">ALL CLASSES</option></select><select id=collection-weirdness><option value="">ALL WEIRDNESS</option><option value="0-69">0–69</option><option value="70-76">70–76</option><option value="77-85">77–85</option><option value="86-93">86–93</option><option value="94-99">94–99</option></select></div>` : `<select class="trade-mode-filter" id="trade-filter-status" aria-label="Filter trades"><option value="">ALL TRADES</option><option value="OPEN">OPEN FOR TRADE</option><option value="PENDING">PENDING CONFIRMATION</option><option value="MINE">MY PUBLISHED TRADES</option></select>`}</div></div><div id="collection-view-body"></div></section>`;
      $("#exchange-back") && ($("#exchange-back").onclick = () => { collectionMode = "owned"; collection(); });
      $("#collection-back") && ($("#collection-back").onclick = () => go("/void"));
      $("#tab-trade") && ($("#tab-trade").onclick = () => { collectionMode = "trade"; collection(); });
      if (collectionMode === "owned") renderOwnedView(); else renderTradeView();
    }

    function renderOwnedView() {
      let b = $("#collection-view-body");
      if (!b) return;
      b.innerHTML = `<div id=drop class=drop><div><span class=drop-icon>📦</span>DROP ARTIFACTS HERE</div></div><div id=csum class=summary></div><div id=sets class=sets></div><div id=cgrid class=archivegrid></div>`;
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

    async function renderTradeView() {
      let b = $("#collection-view-body"); if (!b) return;
      b.innerHTML = `<div id="tgrid" class="archivegrid tradegrid"></div><div class="trade-footer-actions"><button class="trade-entry-btn trade-publish-btn" id="trade-publish-btn" type="button">TRADE</button></div>`;
      $("#trade-publish-btn").onclick = () => openTradeCollectionPicker(null, publishTradeArtifact);
      $("#trade-filter-status").onchange = loadTrades;
      loadTrades();
    }

    async function loadTrades() {
      let g = $("#tgrid"); if (!g) return;
      g.innerHTML = `<div class="empty">SCANNING TRADE FREQUENCIES...</div>`;
      try {
        let trades = await api("/api/trades");
        let filter = $("#trade-filter-status")?.value || "";
        if (filter === "OPEN") trades = trades.filter(t => t.status === "OPEN");
        else if (filter === "PENDING") trades = trades.filter(t => t.status === "PENDING");
        else if (filter === "MINE") trades = trades.filter(t => t.is_owner);
        drawTrades(trades);
      } catch {
        g.innerHTML = `<div class="empty">UNABLE TO REACH TRADE MARKET</div>`;
      }
    }

    function drawTrades(trades) {
      let g = $("#tgrid"); if (!g) return;
      g.innerHTML = "";
      if (!trades.length) {
        g.innerHTML = '<div class="empty collection-empty">NO TRADES MATCH THIS CRITERIA.</div>';
        return;
      }
      for (let t of trades) {
        let c = document.createElement("article");
        c.className = "artifactcard collection-card trade-card";
        let otherConfirmed = (t.is_owner && t.respondent_confirmed) || (!t.is_owner && t.creator_confirmed);
        let userNeedsToConfirm = (t.is_owner && !t.creator_confirmed) || (!t.is_owner && !t.respondent_confirmed);
        let isAwaiting = t.status === "PENDING" && (otherConfirmed && userNeedsToConfirm);
        let statusBadge = t.status === "COMPLETED"
          ? '<span class="trade-card-status status-completed">✓ EXCHANGED</span>'
          : isAwaiting
          ? '<span class="trade-card-status status-pending">AWAITING</span>'
          : t.status === "PENDING"
          ? '<span class="trade-card-status status-pending">⚡ PENDING</span>'
          : t.is_owner
          ? '<span class="trade-card-status status-open">PUBLISHED</span>'
          : '<span class="trade-card-status status-open">OFFER</span>';
        let ownerLabel = t.is_owner ? 'YOUR LISTING' : `OFFERED BY SOUL ${esc(t.creator_name)}`;
        c.innerHTML = `<div class="card-face card-front"><div class=cardart><small class="trade-art-id">#${esc(t.artifact.artifact_id)}</small></div><div class=cardbody><small class=card-owner>${ownerLabel}</small><small class=card-class>${esc(t.artifact.classification)}</small><b class="card-name rarity-name ${esc(t.artifact.rarity)}">${esc(t.artifact.name)}</b><small class=card-weirdness>👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(t.artifact.weirdness)}">${t.artifact.weirdness}</span></small><div class="trade-card-footer">${statusBadge}</div></div></div>`;
        c.querySelector(".cardart").append(cv(t.artifact));
        c.onclick = () => openTradeModal(t);
        g.append(c);
      }
    }

    function renderSideCard(a, headerTitle, statusBadgeHtml) {
      return `<div class="trade-col-header"><small>${esc(headerTitle)}</small>${statusBadgeHtml}</div><div class="card-title-group" style="margin-bottom:6px"><h3 class="rarity-name ${esc(a.rarity)}" style="margin:2px 0 0;font-size:16px">${esc(a.name)}</h3></div><div class="card-art-container" style="margin-bottom:8px"><div class="detailart trade-side-art" id="art-${esc(a.artifact_id)}"><span class="card-face card-front"></span><small class="trade-art-id">#${esc(a.artifact_id)}</small></div></div><div class="collection-stats">${rr("CLASSIFICATION", a.classification)}${rr("ANOMALY", String(a.anomaly || "UNKNOWN").replaceAll("_", " "))}${weirdnessRow(a.weirdness)}</div>`;
    }

    function openTradeModal(trade) {
      $("#trade-modal")?.remove();
      let offered = trade.offered_artifact || null;
      let isPending = trade.status === "PENDING";
      let isCompleted = trade.status === "COMPLETED";

      const renderModalContent = (st, off) => {
        let isPending = st === "PENDING";
        let isCompleted = st === "COMPLETED";
        let leftStatusHtml = isCompleted
          ? '<span class="trade-card-status status-completed">✓ EXCHANGED</span>'
          : (isPending
              ? '<span class="trade-card-status status-pending">AWAITING</span>'
              : '<span class="trade-card-status status-open">PUBLISHED</span>');
        let rightStatusHtml = isCompleted
          ? '<span class="trade-card-status status-completed">✓ EXCHANGED</span>'
          : off
          ? (isPending
              ? '<span class="trade-card-status status-pending">AWAITING</span>'
              : '<span class="trade-card-status status-open">OFFER</span>')
          : '<span class="trade-card-status status-pending" style="opacity:0.75">NO OFFER YET</span>';

        let rightColContent = '';
        let leftColContent = '';
        if (trade.is_owner) {
          leftColContent = off
            ? renderSideCard(off, trade.offered_by_name ? `OFFERED BY ${trade.offered_by_name}` : "PARTNER OFFER", rightStatusHtml)
            : `<div class="trade-empty-picker"><h3>AWAITING PARTNER OFFER</h3><p>Another witness must choose an artifact before this exchange can begin.</p></div>`;
          rightColContent = renderSideCard(trade.artifact, "YOUR LISTING", leftStatusHtml);
        } else if (off) {
          rightColContent = renderSideCard(off, "YOUR OFFER", rightStatusHtml);
          if (st !== "COMPLETED" && !trade.is_owner && st !== "PENDING") {
            rightColContent += `<div style="text-align:center;margin-top:8px"><button class="understood-button" id="btn-change-offer" style="padding:4px 10px;font-size:10px">CHANGE ARTIFACT</button></div>`;
          }
        } else {
          rightColContent = `<div class="trade-empty-picker"><h3>CHOOSE AN ARTIFACT</h3><div class="trade-offer-actions"><button class="join" id="btn-choose-offer-collection" type="button">COLLECTION</button><button class="understood-button" id="btn-upload-offer-png" type="button">DROP ARTIFACT</button></div></div>`;
        }

        if (!trade.is_owner) leftColContent = renderSideCard(trade.artifact, `OFFERED BY ${trade.creator_name}`, leftStatusHtml);

        let footerContent = '';
        if (isCompleted) {
          footerContent = `<div class="trade-double-confirm-notice"><span style="color:#5ee893">✓ THIS RELIC EXCHANGE HAS BEEN FULLY EXECUTED</span></div><div class="trade-modal-buttons"><button class="join understood-button" id="btn-close-trade">CLOSE</button></div>`;
        } else if (st === "PENDING") {
          footerContent = `<div class="trade-double-confirm-notice"><span>⚡ DOUBLE CONFIRMATION REQUIRED: Both parties must verify before relics are transferred.</span><div class="double-confirm-checkboxes"><label class="confirm-toggle-label"><input type="checkbox" id="chk-double-confirm"> CONFIRM EXCHANGE</label></div></div><div class="trade-modal-buttons"><button class="trade-cancel-btn" id="btn-cancel-trade" type="button">DECLINE / CANCEL TRADE</button><button class="join trade-confirm-btn" id="btn-execute-trade" type="button" disabled>EXECUTE TRADE &amp; SWAP</button></div>`;
        } else if (trade.is_owner) {
          footerContent = `<div class="trade-double-confirm-notice"><span>Your artifact is listed for trade. When another witness makes an offer, both sides will confirm here.</span></div><div class="trade-modal-buttons"><button class="trade-cancel-btn" id="btn-cancel-trade" type="button">REMOVE LISTING</button><button class="understood-button" id="btn-close-trade" type="button">CLOSE</button></div>`;
        } else {
          footerContent = `<div class="trade-double-confirm-notice"><span>Select an artifact on the right to propose an exchange. Publishing or proposing enters pending status.</span></div><div class="trade-modal-buttons"><button class="understood-button" id="btn-close-trade" type="button">CANCEL</button><button class="join" id="btn-propose-trade" type="button" ${off ? '' : 'disabled'}>PROPOSE TRADE</button></div>`;
        }

        return `<div class="modal" id="trade-modal"><div class="panel modalbox trade-modalbox"><div class="trade-modal-top"><div><div class="eyebrow">PEER-TO-PEER RELIC EXCHANGE</div><h2>TRADE ARTIFACTS</h2><p>Exchanging artifacts between souls.</p></div><button class="archive-close collection-close" id="trade-modal-x" type="button" aria-label="Close trade modal"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"></line><line x1="12" y1="2" x2="2" y2="12"></line></svg></button></div><div class="trade-sbs-grid"><div class="trade-sbs-col" id="col-publisher">${leftColContent}</div><div class="trade-sbs-vs"><span>⇄</span></div><div class="trade-sbs-col ${off ? 'active-choice' : ''}" id="col-offered">${rightColContent}</div></div><div class="trade-sbs-footer">${footerContent}</div></div></div>`;
      };

      const wireEvents = (st, off) => {
        let pArt = $(`#art-${trade.artifact.artifact_id}`);
        if (pArt) {
          let f = pArt.querySelector(".card-front") || pArt;
          f.append(cv(trade.artifact));
        }
        if (off) {
          let oArt = $(`#art-${off.artifact_id}`);
          if (oArt) {
            let f = oArt.querySelector(".card-front") || oArt;
            f.append(cv(off));
          }
        }

        let close = () => $("#trade-modal")?.remove();
        $("#trade-modal-x").onclick = close;
        let bClose = $("#btn-close-trade"); if (bClose) bClose.onclick = close;
        $("#trade-modal").onclick = e => { if (e.target.id === "trade-modal") close(); };

        let btnChoose = $("#btn-choose-offer-collection");
        if (btnChoose) btnChoose.onclick = () => openTradeCollectionPicker(trade.artifact.artifact_id, card => updateModal(st, card));

        let btnUpload = $("#btn-upload-offer-png");
        if (btnUpload) {
          btnUpload.onclick = () => {
            let i = document.createElement("input"); i.type = "file"; i.accept = ".png";
            i.onchange = async () => {
              if (i.files?.[0]) {
                try {
                  let parsed = parse(await i.files[0].arrayBuffer());
                  if (parsed.record) {
                    addToCollection(parsed.record);
                    updateModal(st, parsed.record);
                  }
                } catch { showToast("⚠ UNVERIFIED ARTIFACT"); }
              }
            };
            i.click();
          };
        }

        let btnChange = $("#btn-change-offer");
        if (btnChange) btnChange.onclick = () => updateModal(st, null);

        let btnPropose = $("#btn-propose-trade");
        if (btnPropose) {
          btnPropose.onclick = async () => {
            if (!off) return;
            try {
              let updated = await api(`/api/trades/${encodeURIComponent(trade.id)}/propose`, {
                method: "POST",
                body: JSON.stringify({ offered_artifact: off })
              });
              trade = updated;
              showToast("⚡ TRADE OFFER SUBMITTED · AWAITING CONFIRMATION");
              loadTrades();
              updateModal("PENDING", off);
            } catch (e) {
              showToast(`⚠ ${e.message}`);
            }
          };
        }

        let chkConfirm = $("#chk-double-confirm");
        let btnExecute = $("#btn-execute-trade");
        if (chkConfirm && btnExecute) {
          chkConfirm.onchange = () => {
            btnExecute.disabled = !chkConfirm.checked;
          };
          btnExecute.onclick = async () => {
            try {
              let updated = await api(`/api/trades/${encodeURIComponent(trade.id)}/confirm`, {
                method: "POST",
                body: JSON.stringify({ role: trade.is_owner ? "creator" : "respondent" })
              });
              if (trade.is_owner) {
                if (trade.offered_artifact) addToCollection(trade.offered_artifact);
                removeFromCollection(trade.artifact.artifact_id);
              } else {
                addToCollection(trade.artifact);
                if (off) removeFromCollection(off.artifact_id);
              }
              showToast(`✓ RELIC EXCHANGE COMPLETED! Acquired ${trade.artifact.name}`);
              close();
              collection();
            } catch (e) {
              showToast(`⚠ ${e.message}`);
            }
          };
        }

        let btnCancel = $("#btn-cancel-trade");
        if (btnCancel) {
          btnCancel.onclick = async () => {
            try {
              await api(`/api/trades/${encodeURIComponent(trade.id)}/cancel`, { method: "POST" });
              showToast("TRADE OFFER DECLINED / CANCELLED");
              close();
              loadTrades();
            } catch (e) {
              showToast(`⚠ ${e.message}`);
            }
          };
        }
      };

      const updateModal = (st, off) => {
        $("#trade-modal")?.remove();
        app.insertAdjacentHTML("beforeend", renderModalContent(st, off));
        wireEvents(st, off);
      };

      updateModal(trade.status, offered);
    }

    function openTradeCollectionPicker(excludedArtifactId, onSelect) {
      $("#trade-collection-picker")?.remove();
      let candidates = local.filter(x => x.artifact_id !== excludedArtifactId);
      if (!candidates.length) { showToast("NO ELIGIBLE ARTIFACTS IN YOUR COLLECTION"); return; }
      let classes = [...new Set(candidates.map(x => x.classification).filter(Boolean))].sort();
      app.insertAdjacentHTML("beforeend", `<div class="modal" id="trade-collection-picker"><div class="panel modalbox trade-collection-picker-box"><div class="trade-modal-top"><div><div class="eyebrow">YOUR COLLECTION</div><h2>CHOOSE ARTIFACT</h2><p>Only authentic artifacts from your local collection can be offered.</p></div><button class="archive-close collection-close" id="trade-picker-x" type="button" aria-label="Close collection picker"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"></line><line x1="12" y1="2" x2="2" y2="12"></line></svg></button></div><div class="collection-filters trade-collection-filters"><input id="trade-picker-q" placeholder="SEARCH ARTIFACTS"><select id="trade-picker-r"><option value="">ALL RARITIES</option>${["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"].map(r => `<option>${r}</option>`).join("")}</select><select id="trade-picker-c"><option value="">ALL CLASSES</option>${classes.map(x => `<option>${esc(x)}</option>`).join("")}</select><select id="trade-picker-weirdness"><option value="">ALL WEIRDNESS</option><option value="0-69">0–69</option><option value="70-76">70–76</option><option value="77-85">77–85</option><option value="86-93">86–93</option><option value="94-99">94–99</option></select></div><div class="trade-picker-count" id="trade-picker-count"></div><div class="trade-collection-grid" id="trade-collection-grid"></div></div></div>`);
      const close = () => $("#trade-collection-picker")?.remove();
      const draw = () => {
        let q = $("#trade-picker-q").value.trim().toLowerCase(), rarity = $("#trade-picker-r").value, classification = $("#trade-picker-c").value, weirdness = $("#trade-picker-weirdness").value, [minimum, maximum] = weirdness ? weirdness.split("-").map(Number) : [0, 99];
        let filtered = candidates.filter(x => (!q || `${x.name} ${x.artifact_id}`.toLowerCase().includes(q)) && (!rarity || x.rarity === rarity) && (!classification || x.classification === classification) && (!weirdness || (x.weirdness >= minimum && x.weirdness <= maximum)));
        $("#trade-picker-count").textContent = `${filtered.length} ARTIFACT${filtered.length === 1 ? "" : "S"} AVAILABLE`;
        let grid = $("#trade-collection-grid");
        grid.innerHTML = filtered.length ? filtered.map(x => `<button class="trade-collection-item" type="button" data-id="${esc(x.artifact_id)}"><b class="rarity-name ${esc(x.rarity)}">${esc(x.name)}</b><small>#${esc(x.artifact_id)} · ${esc(x.classification)} · 👁 <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${esc(x.weirdness)}</span></small></button>`).join("") : '<div class="empty">NO MATCHING ARTIFACTS.</div>';
        grid.querySelectorAll(".trade-collection-item").forEach(item => item.onclick = () => {
          let chosen = candidates.find(x => x.artifact_id === item.getAttribute("data-id"));
          if (chosen) { close(); onSelect(chosen); }
        });
      };
      $("#trade-picker-x").onclick = close;
      $("#trade-collection-picker").onclick = e => { if (e.target.id === "trade-collection-picker") close(); };
      ["#trade-picker-q", "#trade-picker-r", "#trade-picker-c", "#trade-picker-weirdness"].forEach(selector => $(selector).oninput = draw);
      draw();
    }

    async function publishTradeArtifact(selected) {
      try {
        await api("/api/trades/publish", { method: "POST", body: JSON.stringify({ artifact: selected }) });
        showToast(`✓ PUBLISHED ${selected.name} FOR TRADE`);
        if (collectionMode !== "trade") { collectionMode = "trade"; collection(); }
        else loadTrades();
      } catch (e) {
        showToast(`⚠ ${e.message}`);
      }
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

function contribute() { let lotId = current?.id; sys("❓ ONE CONTRIBUTION"); app.innerHTML = `<section class="panel wide contribution"><div class=eyebrow>THE VOID WILL ACCEPT SOMETHING IN RETURN</div><div class=voidq>❓</div><h1>LEAVE SOMETHING IN THE VOID</h1><p>Leave an idea behind. You will not know when — or whether — it returns.</p><textarea id=idea maxlength=280 placeholder="e.g. a suspicious toaster that predicts rain"></textarea><div class=formrow><span><b id=chars>0</b>/280</span><button id=release>CAST INTO THE VOID</button></div></section>`; $("#idea").oninput = e => $("#chars").textContent = e.target.value.length; $("#release").onclick = async () => { await api("/api/contribute", { method: "POST", body: JSON.stringify({ text: $("#idea").value }) }); if (lotId) sessionStorage.setItem(`void_contributed_${lotId}`, "1"); app.innerHTML = `<section class="panel wide contribution"><div class=eyebrow>✦ CONTRIBUTION ACCEPTED</div><h1>IT IS NO LONGER YOURS.</h1><p>Destination unknown. Surface date unknown. Attribution none.</p><button id=back>RETURN TO THE VOID</button></section>`; $("#back").onclick = () => go("/void") } }



    async function vaultView() {
      sys("✦ THE VOID PRIVATE VAULT & DISPENSER");

      const isVaultAuth = sessionStorage.getItem("void_vault_authenticated") === "true";
      let savedEmail = localStorage.getItem("void_vault_saved_email") || "";
      const vaultUserEmail = sessionStorage.getItem("void_vault_user_email") || savedEmail || "google-admin@void.internal";

      if (!isVaultAuth) {
        app.innerHTML = `
          <section class="panel wide vault-studio" style="max-width:580px; margin:40px auto; text-align:center; padding:32px 24px;">
            <div class="eyebrow">RESTRICTED ACCESS // VAULT CONTROLLER</div>
            <h1 style="margin:8px 0 12px;">✦ SECURE VAULT ACCESS</h1>
            <p style="margin:0 auto 24px; color:#8ba2bf; max-width:440px; font-size:13px; line-height:1.6;">
              Access to the private Vault, inventory dispenser, and Google Drive storage requires authentication with your authorized Google Account.
            </p>
            <div style="background:#07111d; border:1px solid #1e3a5f; border-radius:8px; padding:28px 20px; display:inline-block; width:100%; box-sizing:border-box;">
              <div style="font-size:32px; margin-bottom:12px;">🔒</div>
              <h3 style="margin:0 0 16px; font-size:15px; color:#e2ecf9;">GOOGLE ACCOUNT VERIFICATION</h3>
              
              <div style="margin-bottom:16px; text-align:left;">
                <label for="vault-google-email" style="display:block; font-size:11px; color:#8ba2bf; margin-bottom:6px; letter-spacing:0.05em; font-weight:700;">GOOGLE ACCOUNT EMAIL:</label>
                <input type="email" id="vault-google-email" placeholder="Enter your Google Account email..." value="${esc(savedEmail)}" style="width:100%; background:#030710; border:1px solid #1e3a5f; color:#e2ecf9; padding:10px 12px; border-radius:4px; font-size:13px; box-sizing:border-box;">
              </div>

              <button id="btn-vault-google-login" type="button" class="btn-primary-glow" style="display:flex; align-items:center; justify-content:center; gap:10px; width:100%; padding:12px 18px; font-size:13px; font-weight:800; cursor:pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                CONTINUE WITH GOOGLE (ВХОД)
              </button>
            </div>
          </section>
        `;

        if ($("#btn-vault-google-login")) {
          const doLogin = async () => {
            const enteredEmail = $("#vault-google-email")?.value?.trim() || "vault-admin@google.com";
            sessionStorage.setItem("void_vault_authenticated", "true");
            sessionStorage.setItem("void_vault_user_email", enteredEmail);
            localStorage.setItem("void_vault_saved_email", enteredEmail);
            showToast(`✓ Успешен вход като ${enteredEmail}`);
            await vaultView();
          };

          $("#btn-vault-google-login").onclick = doLogin;
          $("#vault-google-email")?.addEventListener("keydown", e => {
            if (e.key === "Enter") {
              e.preventDefault();
              doLogin();
            }
          });
        }
        return;
      }

      let apiOnline = false;
      let unspawnedCount = 0;
      let spawnedCount = 0;
      let warpData = null;
      let nextSpawnTimeStr = "NO ACTIVE SPAWN";
      let nextSpawnSub = "Vault queue empty";
      let vaultNextSpawnTimestamp = null;

      try {
        const [status, invRes, warpRes] = await Promise.all([
          VoidAPI.status().catch(() => ({ ok: false })),
          VoidAPI.getInventory().catch(() => null),
          VoidAPI.getWarp().catch(() => null),
        ]);
        apiOnline = status?.ok === true;

        if (invRes) {
          unspawnedCount = Number(invRes.totalUnspawned ?? invRes.unspawnedRemaining ?? 0);
          spawnedCount = Number(invRes.totalSpawned ?? 0);
        }

        if (warpRes) {
          warpData = warpRes;
          const w = warpRes.warp || {};
          const now = Date.now();
          if (w.state === "ACTIVE" || warpRes.active) {
            nextSpawnTimeStr = "✦ DROP ACTIVE NOW";
            nextSpawnSub = "Loot window open (1 min)";
          } else if (w.nextSpawnAt && Number(w.nextSpawnAt) > now) {
            vaultNextSpawnTimestamp = Number(w.nextSpawnAt);
            const dateObj = new Date(vaultNextSpawnTimestamp);
            nextSpawnTimeStr = dateObj.toLocaleTimeString();
            nextSpawnSub = `⏳ In ${fmt(Math.max(0, Math.floor((vaultNextSpawnTimestamp - now) / 1000)))}`;
          } else if (unspawnedCount > 0) {
            nextSpawnTimeStr = "WARP CLOSED";
            nextSpawnSub = `${unspawnedCount} artifacts ready — press START WARP`;
          } else {
            nextSpawnTimeStr = "WARP CLOSED";
            nextSpawnSub = "No artifacts registered from Drive";
          }
        }
      } catch (err) {
        console.error("THE VOID API sync error:", err);
      }

      let storedGdriveImages = [];
      try {
        storedGdriveImages = JSON.parse(localStorage.getItem("void_gdrive_images") || '["VA-000001.png", "VA-000002.png", "VA-000003.png"]');
      } catch {
        storedGdriveImages = ["VA-000001.png", "VA-000002.png", "VA-000003.png"];
      }

      app.innerHTML = `
        <section class="panel wide vault-studio">
          <div class="eyebrow">THE VOID × CLOUDFLARE SECURE DROP ARCHITECTURE</div>
          <div class="panel-header-row">
            <div>
              <h1>✦ SECURE VAULT & DISPENSER</h1>
              <p class="subtitle">Protected administrator control center for artifact queues, Google Drive visual assets, and autonomous dispensing.</p>
            </div>
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <div class="auth-status-badge connected">
                <span class="dot"></span>
                <b>${esc(vaultUserEmail)}</b>
              </div>
              <button id="btn-vault-logout" class="btn-danger-glow" type="button" style="padding:6px 12px; font-size:11px; cursor:pointer;">
                🚪 ИЗХОД (SIGN OUT)
              </button>
            </div>
          </div>

          <!-- INVENTORY STATUS BAR -->
          <div class="vault-inventory-grid">
            <div class="inv-card">
              <span class="inv-label">UNSPAWNED IN VAULT</span>
              <span class="inv-value ${unspawnedCount < 10 ? 'warning' : 'healthy'}" id="inv-unspawned">${unspawnedCount}</span>
              <span class="inv-sub">${unspawnedCount < 10 ? '⚠️ LOW POOL — Time to add next batch' : '✓ Stock is healthy'}</span>
            </div>
            <div class="inv-card">
              <span class="inv-label">TOTAL SPAWNED</span>
              <span class="inv-value" id="inv-spawned">${spawnedCount}</span>
              <span class="inv-sub">Claimed or archived</span>
            </div>
            <div class="inv-card">
              <span class="inv-label">NEXT SPAWN SCHEDULE</span>
              <span class="inv-value healthy" id="inv-next-drop" style="font-size:16px;">${nextSpawnTimeStr}</span>
              <span class="inv-sub" id="inv-next-drop-sub">${nextSpawnSub}</span>
            </div>
            <div class="inv-card">
              <span class="inv-label">GOOGLE DRIVE IMAGES</span>
              <span class="inv-value healthy" id="inv-gdrive">${storedGdriveImages.length}</span>
              <span class="inv-sub">Folder: 1kSLnRIJ-mmxhq2G1x2ikaUYo-sekvZxR</span>
            </div>
            <div class="inv-card action-card">
              <span class="inv-label">WARP CONTROL</span>
              <button id="btn-dispense-now" class="btn-primary-glow" ${(unspawnedCount === 0 || warpData?.warp?.state === "WAITING" || warpData?.warp?.state === "ACTIVE") ? 'disabled' : ''}
                ▶ START WARP
              </button>
              <span class="inv-sub">Starts the global WARP cycle. Available only while WARP is closed.</span>
            </div>
            <div class="inv-card action-card">
              <span class="inv-label">TEST DROP</span>
              <button id="btn-force-drop" class="btn-primary-glow" ${warpData?.warp?.state !== "WAITING" ? 'disabled' : ''}>
                ⚡ FORCED DROP
              </button>
              <span class="inv-sub">Testing only — immediately surfaces the Artifact already scheduled by the running WARP</span>
            </div>
            <div class="inv-card action-card">
              <span class="inv-label">RESET &amp; CLEAR ENGINE</span>
              <button id="btn-reset-vault" class="btn-danger-glow">
                🗑 CLEAR &amp; RESET
              </button>
              <span class="inv-sub">Clears test state + Collection, rescans Drive, leaves Warp closed</span>
            </div>
          </div>

          <!-- SINGLE ARTIFACT CREATION STUDIO -->
          <div class="vault-tools-section" id="artifact-create-studio">
            <div class="tool-header">
              <h3>✦ CREATE NEW ARTIFACT</h3>
              <p>Generate one deterministic draft, attach its PNG artwork, review the prompt and stats, then create it. Draft generation never consumes a serial.</p>
            </div>

            <div class="quick-batch-actions">
              <button id="btn-generate-artifact-draft" class="btn-primary-glow" type="button">✦ GENERATE PROMPT + STATS</button>
            </div>

            <div id="artifact-draft-panel" class="batch-output-container" style="display:none">
              <div class="prompt-item-card">
                <div class="prompt-card-top">
                  <div class="card-title-group">
                    <span class="tag-serial" id="draft-artifact-id">VA-??????</span>
                    <b class="art-name" id="draft-artifact-name">UNGENERATED</b>
                    <span class="tag-rarity" id="draft-artifact-rarity">---</span>
                  </div>
                  <button class="btn-copy-prompt" id="btn-copy-draft-prompt" type="button">COPY PROMPT</button>
                </div>
                <div class="taxon-meta" id="draft-artifact-meta"></div>
                <pre class="prompt-text" id="draft-artifact-prompt"></pre>
              </div>

              <div class="vault-upload-box" id="artifact-image-drop" style="margin-top:14px">
                <div class="upload-icon">▣</div>
                <h3>ARTWORK · PNG</h3>
                <p id="artifact-image-status">No image selected. The Artifact cannot be created without its PNG.</p>
                <button class="btn-outline" type="button" id="btn-select-artifact-image">SELECT PNG</button>
                <input id="artifact-image-input" type="file" accept="image/png,.png" hidden>
                <div id="artifact-image-preview" style="display:none; margin-top:14px"></div>
              </div>

              <div class="quick-batch-actions" style="margin-top:14px">
                <button id="btn-create-artifact" class="btn-primary-glow" type="button" disabled>✦ CREATE ARTIFACT</button>
              </div>
              <div class="upload-log" style="display:block; margin-top:10px">
                <div class="log-item">CREATE is the only action that writes the PNG + canonical metadata and adds the Artifact to the Vault queue.</div>
              </div>
            </div>
          </div>

          <div class="vault-upload-box">
            <div class="upload-icon">☁</div>
            <h3>GOOGLE DRIVE CLOUD STORAGE</h3>
            <p>Canonical Artifact PNGs and registry are stored through the protected Google Apps Script bridge.</p>
            <div class="upload-log" style="display:block">
              <div class="log-item">✓ Drive scan: <b>${storedGdriveImages.length} Artifact images</b></div>
              <div class="log-item" style="color:#7391b5; margin-top:4px;">New artwork is uploaded only through CREATE ARTIFACT above.</div>
            </div>
          </div>
        </section>
      `;

      // Live Vault dynamic timestamp ticker
      if (vaultNextSpawnTimestamp) {
        clearInterval(presenceTimer);
        presenceTimer = setInterval(() => {
          const now = Date.now();
          const dropElem = $("#inv-next-drop");
          const subElem = $("#inv-next-drop-sub");
          if (!dropElem || !subElem) return;
          if (now < vaultNextSpawnTimestamp) {
            const remaining = Math.max(0, Math.floor((vaultNextSpawnTimestamp - now) / 1000));
            dropElem.textContent = new Date(vaultNextSpawnTimestamp).toLocaleTimeString();
            subElem.textContent = `⏳ In ${fmt(remaining)}`;
          } else {
            dropElem.textContent = "SYNCING...";
            subElem.textContent = "Checking Worker state";
            clearInterval(presenceTimer);
            setTimeout(() => vaultView(), 150);
          }
        }, 1000);
      }

      // Logout handler
      if ($("#btn-vault-logout")) {
        $("#btn-vault-logout").onclick = async () => {
          sessionStorage.removeItem("void_vault_authenticated");
          showToast("✓ Изходът от Vault е успешен.");
          await vaultView();
        };
      }

      // Reset test world, clear local Collection, then rescan Drive.
      // IMPORTANT: this does NOT auto-start Warp. The final state remains IDLE / WARP CLOSED.
      if ($("#btn-reset-vault")) {
        $("#btn-reset-vault").onclick = async () => {
          if (!confirm("Clear Vault/Warp test state, clear Collection, and rescan Google Drive? Warp will remain CLOSED until START WARP is pressed.")) return;

          const btn = $("#btn-reset-vault");
          btn.disabled = true;
          btn.textContent = "🗑 RESETTING...";

          try {
            // 1) Hard reset authoritative Worker state -> IDLE.
            await VoidAPI.resetVault();

            // 2) Clear the local test Collection and evolving instances.
            local = [];
            evolvingInstances = {};
            fusionSlotA = null;
            fusionSlotB = null;
            localStorage.removeItem("void_collection");
            localStorage.removeItem("void_evolving_instances");
            localStorage.removeItem("void_claim_id");

            // 3) Ask Worker to scan the real Google Drive folder.
            // Worker returns the image IDs but does NOT start Warp.
            const drive = await VoidAPI.scanDrive();
            const entries = Array.isArray(drive?.images) ? drive.images : [];

            // Keep the visible Drive list in sync with the real scan.
            storedGdriveImages = entries.map(x => x.name || `${x.artifactId}.png`);
            localStorage.setItem("void_gdrive_images", JSON.stringify(storedGdriveImages));

            // 4) Build the deterministic Artifact metadata for each Drive image
            // and register ONLY those Artifacts that actually exist in Drive.
            const artifacts = entries.map(entry => {
              const id = String(entry.artifactId || "").trim();
              const match = id.match(/(?:VA|VOID)[-_]?(\d+)/i);
              const serial = match ? Number(match[1]) : NaN;
              if (!Number.isFinite(serial)) return null;
              const artifact = getArtifactBySerial(serial);
              if (!artifact) return null;
              artifact.id = id;
              artifact.artifact_id = id;
              artifact.imageUrl = VoidAPI.artifactImageUrl(id);
              return artifact;
            }).filter(Boolean);

            if (artifacts.length) {
              await VoidAPI.registerArtifacts(artifacts);
            }

            // 5) Explicitly keep frontend Warp closed. No startWarp() here.
            warpDropActive = false;
            warpStateClosed = true;
            realExpiresAt = null;
            publicRevealAt = null;
            joinedWarpGimmick = false;
            warpJoinedAt = null;
            clearTimeout(publicWarpWakeTimer);
            publicWarpWakeTimer = null;
            lootSecondsRemaining = 0;

            showToast(`✓ RESET COMPLETE. COLLECTION CLEARED. ${artifacts.length} DRIVE ARTIFACTS READY. WARP CLOSED.`);
            await vaultView();
          } catch (err) {
            alert("Reset / Drive scan error: " + err.message);
            btn.disabled = false;
            btn.textContent = "🗑 CLEAR & RESET";
          }
        };
      }

      // The old /api/vault/dispense endpoint no longer exists.
      // This control now starts/resumes the authoritative Worker cycle; it never
      // creates a local drop or local timestamp.
      if ($("#btn-dispense-now")) {
        const forceBtn = $("#btn-dispense-now");
        forceBtn.textContent = "▶ START WARP";
        forceBtn.onclick = async () => {
          forceBtn.disabled = true;
          forceBtn.textContent = "▶ STARTING...";

          try {
            const result = await VoidAPI.startWarp();
            if (result?.warp?.state === "WAITING") {
              showToast("◉ THE VOID IS STIRRING... A NEW WARP HAS BEGUN.");
              // One public read obtains the shared reveal boundary; no polling follows.
              await checkPublicWarpOnce();
            } else if (result?.warp?.state === "ACTIVE") {
              showToast("✦ DROP IS ACTIVE NOW.");
            } else {
              showToast("WARP CLOSED.");
            }
            await vaultView();
          } catch (err) {
            alert("Warp start error: " + err.message);
            forceBtn.disabled = false;
            forceBtn.textContent = "▶ START WARP";
          }
        };
      }

      // Forced Drop is a test-only shortcut.
      if ($("#btn-force-drop")) {
        const forceDropBtn = $("#btn-force-drop");
        forceDropBtn.onclick = async () => {
          forceDropBtn.disabled = true;
          forceDropBtn.textContent = "⚡ SURFACING...";
          try {
            const result = await VoidAPI.forceDrop();
            if (result?.warp?.state === "ACTIVE") {
              showToast(`✦ SOMETHING SURFACED${result.artifact?.name ? ` — ${result.artifact.name}` : ""}. 60 SECONDS TO LOOT.`);
              await checkPublicWarpOnce();
              go("/void");
              return;
            }
            showToast("FORCED DROP DID NOT ACTIVATE.");
            await vaultView();
          } catch (err) {
            alert("Forced Drop error: " + err.message);
            forceDropBtn.disabled = false;
            forceDropBtn.textContent = "⚡ FORCED DROP";
          }
        };
      }

      // Single Artifact creation flow. Draft generation is local-only and does not consume a serial.
      let artifactDraft = null;
      let artifactDraftFile = null;
      let artifactDraftPreviewUrl = null;

      const draftPanel = $("#artifact-draft-panel");
      const imageInput = $("#artifact-image-input");
      const imageDrop = $("#artifact-image-drop");
      const createBtn = $("#btn-create-artifact");

      const setCreateEnabled = () => {
        if (createBtn) createBtn.disabled = !(artifactDraft && artifactDraftFile);
      };

      const renderArtifactDraft = draft => {
        if (!draft || !draftPanel) return;
        draftPanel.style.display = "block";
        $("#draft-artifact-id").textContent = draft.artifact_id || draft.id || "VA-??????";
        $("#draft-artifact-name").textContent = draft.name || "UNNAMED ARTIFACT";
        const rarity = draft.rarity || "COMMON";
        const rarityNode = $("#draft-artifact-rarity");
        rarityNode.textContent = rarity;
        rarityNode.className = `tag-rarity ${rarity}`;
        const taxonomy = draft.taxonomy || {};
        const stats = draft.stats || {};
        $("#draft-artifact-meta").innerHTML = `
          <span>CLASS: ${esc(draft.classification || draft.class || "UNKNOWN")}</span>
          <span>WEIRDNESS: ${esc(draft.weirdness ?? "?")}</span>
          <span>⚡ PWR: ${esc(stats.power ?? "?")} | RES: ${esc(stats.resonance ?? "?")} | STB: ${esc(stats.stability ?? "?")}</span>
          ${taxonomy.chassis_name || taxonomy.organism_name ? `<span>🧬 ${esc(taxonomy.chassis_name || "?")} + ${esc(taxonomy.organism_name || "?")}</span>` : ""}
        `;
        $("#draft-artifact-prompt").textContent = draft.prompt || "";
        setCreateEnabled();
      };

      const clearDraftImage = () => {
        artifactDraftFile = null;
        if (artifactDraftPreviewUrl) URL.revokeObjectURL(artifactDraftPreviewUrl);
        artifactDraftPreviewUrl = null;
        if (imageInput) imageInput.value = "";
        const preview = $("#artifact-image-preview");
        if (preview) {
          preview.style.display = "none";
          preview.innerHTML = "";
        }
        if ($("#artifact-image-status")) $("#artifact-image-status").textContent = "No image selected. The Artifact cannot be created without its PNG.";
        setCreateEnabled();
      };

      const selectDraftImage = file => {
        if (!file) return;
        const isPng = file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
        if (!isPng) {
          showToast("PNG ONLY.");
          return;
        }
        artifactDraftFile = file;
        if (artifactDraftPreviewUrl) URL.revokeObjectURL(artifactDraftPreviewUrl);
        artifactDraftPreviewUrl = URL.createObjectURL(file);
        if ($("#artifact-image-status")) $("#artifact-image-status").textContent = `✓ ${file.name} · ${(file.size / 1024).toFixed(1)} KB`;
        const preview = $("#artifact-image-preview");
        if (preview) {
          preview.style.display = "block";
          preview.innerHTML = `<img src="${artifactDraftPreviewUrl}" alt="Artifact artwork preview" style="display:block;max-width:260px;max-height:260px;object-fit:contain;margin:auto">`;
        }
        setCreateEnabled();
      };

      const fileToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("IMAGE_READ_FAILED"));
        reader.onload = () => {
          const value = String(reader.result || "");
          const comma = value.indexOf(",");
          resolve(comma >= 0 ? value.slice(comma + 1) : value);
        };
        reader.readAsDataURL(file);
      });

      if ($("#btn-generate-artifact-draft")) {
        $("#btn-generate-artifact-draft").onclick = async () => {
          const btn = $("#btn-generate-artifact-draft");
          btn.disabled = true;
          btn.textContent = "✦ GENERATING...";
          try {
            // Drive Registry owns nextSerial. Reading it does not consume it.
            const registry = await VoidAPI.getVaultRegistry();
            const serial = Math.max(1, Number(registry?.nextSerial || 1));
            const generated = getArtifactBySerial(serial);
            if (!generated) throw new Error("DRAFT_GENERATION_FAILED");
            artifactDraft = {
              ...generated,
              id: generated.id || `VA-${String(serial).padStart(6, "0")}`,
              artifact_id: generated.artifact_id || generated.id || `VA-${String(serial).padStart(6, "0")}`,
            };
            clearDraftImage();
            renderArtifactDraft(artifactDraft);
            showToast(`✓ DRAFT ${artifactDraft.artifact_id} GENERATED. ADD ITS PNG, THEN CREATE.`);
          } catch (err) {
            showToast("Draft generation error: " + err.message);
          } finally {
            btn.disabled = false;
            btn.textContent = "✦ GENERATE PROMPT + STATS";
          }
        };
      }

      if ($("#btn-copy-draft-prompt")) {
        $("#btn-copy-draft-prompt").onclick = async () => {
          if (!artifactDraft?.prompt) return;
          await navigator.clipboard.writeText(artifactDraft.prompt);
          const btn = $("#btn-copy-draft-prompt");
          btn.textContent = "✓ COPIED!";
          setTimeout(() => { if ($("#btn-copy-draft-prompt")) $("#btn-copy-draft-prompt").textContent = "COPY PROMPT"; }, 1500);
        };
      }

      if ($("#btn-select-artifact-image") && imageInput) {
        $("#btn-select-artifact-image").onclick = () => imageInput.click();
        imageInput.onchange = () => selectDraftImage(imageInput.files?.[0]);
      }

      if (imageDrop) {
        imageDrop.ondragover = event => { event.preventDefault(); imageDrop.classList.add("drag-hover"); };
        imageDrop.ondragleave = () => imageDrop.classList.remove("drag-hover");
        imageDrop.ondrop = event => {
          event.preventDefault();
          imageDrop.classList.remove("drag-hover");
          selectDraftImage(event.dataTransfer?.files?.[0]);
        };
      }

      if (createBtn) {
        createBtn.onclick = async () => {
          if (!artifactDraft || !artifactDraftFile) return;
          createBtn.disabled = true;
          createBtn.textContent = "✦ CREATING ARTIFACT...";
          try {
            const imageBase64 = await fileToBase64(artifactDraftFile);
            const result = await VoidAPI.createArtifact({
              artifact: artifactDraft,
              imageBase64,
              mimeType: "image/png",
            });
            if (!result?.success || !result?.artifact) throw new Error(result?.error || "CREATE_FAILED");

            const created = normalizePublicArtifact(result.artifact);
            showToast(`✓ ${created.artifact_id || created.id} · ${created.name} CREATED AND ADDED TO VAULT.`);

            artifactDraft = null;
            clearDraftImage();
            await vaultView();
          } catch (err) {
            showToast("Create Artifact error: " + err.message);
            createBtn.disabled = false;
            createBtn.textContent = "✦ CREATE ARTIFACT";
          }
        };
      }

    }

    route();
