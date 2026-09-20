const app = document.querySelector("#app"), $ = s => document.querySelector(s);
const api = async (u, o = {}) => { let r = await fetch(u, { headers: { "content-type": "application/json" }, ...o }), x = await r.json(); if (!r.ok) throw Error(x.error || r.statusText); return x };
let timer = null, presenceTimer = null, visitorTimer = null, voidSnake = null, current = null, local = [], joinAttempts = 0, homeArchive = [], liveVisitors = 0, activeWitnesses = 0, collectionMode = "owned", selectedSecretSet = "", feedEvents = [], feedSnapshot = null, feedRenderSnapshot = null, chatSnapshot = null;
try { let s = JSON.parse(localStorage.getItem("void_collection") || "[]"); if (Array.isArray(s)) local = s } catch(e) {}
function saveLocal() { try { localStorage.setItem("void_collection", JSON.stringify(local)) } catch(e) {} }
function addToCollection(a) { if (a && !local.some(x => x.artifact_id === a.artifact_id)) { local.push(a); saveLocal() } }
function removeFromCollection(id) { local = local.filter(x => x.artifact_id !== id); saveLocal() }
const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const fmt = s => `${String(Math.floor((s || 0) / 3600)).padStart(2, "0")}:${String(Math.floor((s || 0) % 3600 / 60)).padStart(2, "0")}:${String(Math.floor((s || 0) % 60)).padStart(2, "0")}`;
const weirdnessTier = value => ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"][Math.min(6, Math.floor(Math.max(0, Math.min(100, Number(value) || 0)) / (101 / 7)))];
function cv(a) { let c = document.createElement("canvas"); c.width = c.height = 24; let g = c.getContext("2d"); for (let y = 0; y < 24; y++)for (let x = 0; x < 24; x++) { g.fillStyle = a.pixels?.[y]?.[x] || "#050b14"; g.fillRect(x, y, 1, 1) } return c }
function silhouette(pixels) { let wrap = document.createElement("div"), c = document.createElement("canvas"), g = c.getContext("2d"); wrap.className = "queued-silhouette"; c.width = c.height = 24; for (let y = 0; y < 24; y++)for (let x = 0; x < 24; x++)if (pixels?.[y]?.[x]) { g.fillStyle = "#020407"; g.fillRect(x, y, 1, 1) } wrap.append(c); return wrap }
function go(p) { history.pushState({}, '', p); route() } window.onpopstate = route; document.addEventListener("click", e => { let a = e.target.closest("[data-link]"); if (a) { e.preventDefault(); go(a.getAttribute("href")) } });
function nav() { document.querySelectorAll("nav a").forEach(a => a.classList.toggle("active", location.pathname.startsWith(a.getAttribute("href")))) }
function sys(t) { $("#sysmsg").textContent = t }
async function route() { stopVoidSnake(); clearInterval(timer); clearInterval(presenceTimer); clearInterval(visitorTimer); setTabTitle(false); nav(); if ($("#winner-contribute")) $("#winner-contribute").hidden = true; visitorTimer = setInterval(refreshActivity, 5000); if (location.pathname !== "/" && location.pathname !== "/void") refreshActivity(); let p = location.pathname; if (p === "/" || p === "/void") return voidHome(); if (p === "/archive") return archive(); if (p.startsWith("/archive/")) return detail(decodeURIComponent(p.split("/").pop())); if (p === "/collection") return collection(); app.innerHTML = '<section class="panel wide empty">NOTHING IS HERE.</section>' }

async function voidHome() {
  current = await api("/api/lot"); if (current.revealed && current.winner) addToCollection(current.revealed); homeArchive = await api("/api/archive"); await refreshActivity(); drawHome(current, homeArchive); refreshChat();
  timer = setInterval(async () => { try { let previous = current, next = current.joined ? await api("/api/heartbeat", { method: "POST" }) : await api("/api/lot"); current = next; if (next.state !== previous.state || !!next.revealed !== !!previous.revealed || !!next.found_owner !== !!previous.found_owner) { if (next.revealed && next.winner) addToCollection(next.revealed); homeArchive = await api("/api/archive"); drawHome(next, homeArchive) } else updateHome(current) } catch { } }, 5000);
  presenceTimer = setInterval(() => { if (current?.joined && !current?.revealed) { current.my_presence_seconds = (current.my_presence_seconds || 0) + 1; updatePresence(current) } }, 1000)
}
async function refreshActivity() { try { let a = await api("/api/activity"); liveVisitors = a.current?.live_visitors || 0; activeWitnesses = a.current?.participants || 0; syncFeed(a, current, homeArchive); if ($("#online")) $("#online").textContent = liveVisitors; if ($("#active-witnesses")) $("#active-witnesses").textContent = activeWitnesses; renderFeed(); refreshChat() } catch { } }
async function refreshChat() { if (!$("#warp-chat")) return; try { let chat = await api("/api/chat"), key = `${chat.warp_id}|${chat.messages.map(x => `${x.id}:${x.created_at}`).join(",")}`; if (key !== chatSnapshot) { chatSnapshot = key; renderChat(chat) } } catch { } }
function renderChat(chat) { let wrap = $("#warp-chat"); if (!wrap) return; let messages = chat.messages.map(x => `<div class="chat-message ${x.mode === "TRADE" ? "trade-message" : ""}"><b>${esc(x.name)}${x.mode === "TRADE" ? " · TRADE" : ""}</b><span>${esc(x.text)}</span></div>`).join("") || `<div class="chat-empty">NO MESSAGES YET.</div>`; wrap.innerHTML = `<div class="warp-chat-head"><h3>CHAT</h3><label class="chat-trade-mode"><input id="chat-trade-mode" type="checkbox"> <span>TRADE</span></label></div><div class="chat-messages">${messages}</div><form class="chat-form" id=chat-form><input id=chat-input maxlength=280 placeholder="SEND A MESSAGE..." aria-label="Send a chat message"><button type=submit>SEND</button></form>`; let tradeMode = $("#chat-trade-mode"), input = $("#chat-input"); if (tradeMode) tradeMode.onchange = () => { input.placeholder = tradeMode.checked ? "SEND A TRADE MESSAGE..." : "SEND A MESSAGE..." }; let form = $("#chat-form"); if (form) form.onsubmit = async e => { e.preventDefault(); let text = input.value; if (!text.trim()) return; try { input.disabled = true; await api("/api/chat", { method:"POST", body:JSON.stringify({text,mode:tradeMode?.checked ? "TRADE" : "CHAT"}) }); input.value = ""; chatSnapshot = null; await refreshChat() } catch (error) { showToast(error.message.replaceAll("_", " ")) } finally { if ($("#chat-input")) $("#chat-input").disabled = false } } }
function addFeedEvent(message, key = `${Date.now()}-${message}`) { if (feedEvents.some(x => x.key === key)) return; feedEvents.unshift({ time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), message, key }); feedEvents = feedEvents.slice(0, 24) }
function syncFeed(activity, l, arc) { if (!l) return; let snapshot = { id: l.id, state: l.state, archiveId: arc[0]?.artifact_id || null }; if (!feedSnapshot) { addFeedEvent(`The Warp #${l.id} is ${l.found_owner ? "awaiting a new signal" : "accepting witnesses"}`, `warp-${l.id}`) } else { if (snapshot.id !== feedSnapshot.id) addFeedEvent(`The Warp #${snapshot.id} is accepting witnesses`, `warp-${snapshot.id}`); if (snapshot.state !== feedSnapshot.state) addFeedEvent(snapshot.state === "REVEAL" ? "The Warp changed state" : `The Warp #${snapshot.id} is active`, `state-${snapshot.id}-${snapshot.state}`); if (snapshot.archiveId && snapshot.archiveId !== feedSnapshot.archiveId && arc[0]) addFeedEvent(`<a class=event-link href=/archive/${encodeURIComponent(arc[0].artifact_id)} data-link>${esc(arc[0].name)} entered The Void</a>`, `archive-${snapshot.archiveId}`) } feedSnapshot = snapshot }
function feedKey(key) { return encodeURIComponent(key) }
function feed() { return feedEvents.map(x => `<div class=event data-feed-key="${feedKey(x.key)}"><time>${x.time}</time><div>${x.message}</div></div>`).join("") }
function renderFeed() { let node = $("#feed"), snapshot = feedEvents.map(x => x.key).join("|"); if (!node || snapshot === feedRenderSnapshot) return; let existing = new Map([...node.children].map(event => [event.dataset.feedKey, event])), active = new Set; for (let x of feedEvents) { let key = feedKey(x.key), event = existing.get(key); if (!event) { event = document.createElement("div"); event.className = "event"; event.dataset.feedKey = key; event.innerHTML = `<time>${x.time}</time><div>${x.message}</div>` } node.append(event); active.add(key) } for (let [key, event] of existing) if (!active.has(key)) event.remove(); feedRenderSnapshot = snapshot }
function drawHome(l, arc) {
  sys(l.revealed ? "ARTIFACT SURFACED" : l.found_owner ? "ARTIFACT FOUND ITS NEW OWNER" : "CLOSING CONDITION UNKNOWN");
  app.innerHTML = `<section class=platform>
    <aside class="panel feedpanel"><h3>LIVE FEED</h3><div id=feed>${feed(arc, l)}</div></aside>
    <section class="panel lotpanel"><div class=panel-title><h2>${l.revealed ? "NEW DISCOVERY" : "UNKNOWN ARTIFACT"}</h2></div><div class=lotgrid><div><div class=artifact-stage id=stage></div><div class=activity-strip><span>ACTIVE SOULS: <b><i class=live-dot></i><span id=active-witnesses>${activeWitnesses}</span></b></span><span>CLAIM: <b id=claim-under-stage>${esc(l.claim_label)}</b></span></div><div id=trace-slot></div></div><div id=lotdetails></div></div></section>
    <section id=warp-chat class="panel warp-chat"><div class="warp-chat-head"><h3>CHAT</h3><label class="chat-trade-mode"><input type="checkbox" disabled> <span>TRADE</span></label></div><form class="chat-form"><input disabled placeholder="LOADING CHAT..." aria-label="Loading chat"><button disabled>SEND</button></form></section>
  <section class="panel recentpanel"><div class=panel-title><h2>RECENTLY DISCOVERED</h2></div><div class="recent-slider"><div class=recentgrid id=recent></div><button class="recent-nav recent-nav-prev" id=recent-prev type=button aria-label="Show previous discoveries">←</button><button class="recent-nav recent-nav-next" id=recent-next type=button aria-label="Show next discoveries">→</button></div></section>
  </section>`;
  feedRenderSnapshot = feedEvents.map(x => x.key).join("|");
  drawLotPart(l); drawRecent(arc.slice(0, 12)); updateHome(l);
}
function drawLotPart(l) {
  stopVoidSnake(); let st = $("#stage"), d = $("#lotdetails"), joinNext = async () => { current = await api("/api/join", { method: "POST", body: JSON.stringify({ country: Intl.DateTimeFormat().resolvedOptions().timeZone || "UNKNOWN" }) }); joinAttempts = 0; drawLotPart(current); chatSnapshot = null; refreshChat() }; if (!st) return; st.innerHTML = "";
  if (l.revealed) { let a = l.revealed; let c = cv(a); c.className = "hero-pixel reveal-artifact"; st.append(c); d.innerHTML = `<div class=reveal-panel><div class=lot-kicker>CURRENT WARP #${l.id}</div><h1>${esc(a.name)}</h1><p>${esc(a.lore)}</p><div class=statbox>${kv("Classification", a.classification)}${kv("Rarity", `<span class="rarity ${esc(a.rarity)}">${esc(a.rarity)}</span>`)}${kv("Weirdness", `<span class="detail-weirdness weirdness-val ${weirdnessTier(a.weirdness)}">${a.weirdness}</span>`)}${kv("Status", "ARCHIVED")}</div><p class=condition>${l.winner ? "The artifact has surfaced.<br>Its record is now permanent." : "The artifact surfaced for another SOUL.<br>Its record is now permanent."}</p></div><div class="participation-actions lot-action-height"><button class=join id=join-next type=button>JOIN THE WARP</button></div>`; $("#trace-slot").innerHTML = l.winner ? '<a class="trace-note" href="/collection" data-link>YOUR PRESENCE LEFT A TRACE</a>' : `<div class="trace-note reveal-owner-note">${esc(a.name)} FOUND ITS NEW OWNER</div>`; $("#join-next").onclick = joinNext }
  else if (l.found_owner) { st.append(silhouette(l.next_warp?.silhouette_pixels)); $("#trace-slot").innerHTML = `<div class="owner-found-panel"><h1>${esc(l.surfaced_name || "AN ARTIFACT")}</h1><strong>FOUND ITS NEW OWNER</strong><p>The artifact has left THE VOID.</p></div>`; d.innerHTML = `<div class=lot-kicker>NEXT WARP #${esc(l.next_warp?.id || "???")}</div><p>The next WARP is accepting witnesses now.</p><div class=participation-actions><button class=join id=join-next type=button>JOIN THE WARP</button></div>`; $("#join-next").onclick = joinNext }
  else { $("#trace-slot").innerHTML = ""; let mystery = document.createElement("button"); mystery.type = "button"; mystery.className = `mystery mystery-shape-${Math.abs(Number(l.id) || 0) % 20}`; mystery.setAttribute("aria-label", "Open The Void support window"); mystery.innerHTML = '<span class="mystery-question">?</span>'; mystery.onclick = showAbout; st.append(mystery); setupSecretStage(st, mystery); d.innerHTML = `<div class=lot-kicker>CURRENT WARP #${l.id}</div><p>Its true nature is hidden... for now.</p><div class="statbox current-lot-stats">${kv("Classification", "???")}<div class=rarity-row><span>Rarity</span><b><span class="rarity hidden-rarity">???</span></b></div>${kv("Origin", "???")}${kv("Weirdness", "???")}</div><p class=condition>Closing condition unknown.<br>Stay awhile and do whatever...</p><div class="participation-actions lot-action-height">${l.joined ? `<button class="join joined" id=join aria-label="Presence recorded"><span id=presence-clock>${fmt(l.my_presence_seconds)}</span></button>` : '<button class=join id=join>JOIN THE WARP</button>'}</div>`; $("#join").onclick = async () => { if (l.joined) { joinAttempts++; if (joinAttempts >= 3) showToast("WHATEVER..."); else if (joinAttempts >= 2) showToast("THE VOID DOESN'T CARE FOR YOUR PERSISTENCE."); else showToast("YOUR PRESENCE IS ALREADY RECORDED."); return } await joinNext() }; updateHome(l) }
}
function setupSecretStage(stage, mystery) { let attempts = 0; stage.classList.add("secret-stage"); stage.onclick = event => { if (voidSnake || event.target.closest(".mystery")) return; attempts++; if (attempts < 4) { mystery.classList.remove("secret-stir-1", "secret-stir-2", "secret-stir-3"); void mystery.offsetWidth; mystery.classList.add(`secret-stir-${attempts}`); return } startVoidSnake(stage, mystery) } }
function stopVoidSnake() { if (!voidSnake) return; clearInterval(voidSnake.timer); document.removeEventListener("keydown", voidSnake.onKey); voidSnake.canvas.remove(); voidSnake.stage.classList.remove("snake-active"); voidSnake = null }
function startVoidSnake(stage, mystery) { let canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), columns = 24, rows = 12, snake = [{x:11,y:6},{x:10,y:6},{x:9,y:6}], direction = {x:1,y:0}, pending = direction, food = {x:17,y:3}; canvas.className = "void-snake-canvas"; canvas.width = columns; canvas.height = rows; canvas.setAttribute("aria-label", "Void snake game. Use arrow keys or WASD to move."); stage.prepend(canvas); stage.classList.add("snake-active"); let placeFood = () => { do food = {x:Math.floor(Math.random()*columns),y:Math.floor(Math.random()*rows)}; while (snake.some(part => part.x === food.x && part.y === food.y)) }; let draw = () => { ctx.clearRect(0,0,columns,rows); ctx.fillStyle = "#b94cff"; for (let i = snake.length - 1; i >= 0; i--) { let part = snake[i]; ctx.globalAlpha = Math.max(.34, 1 - i / (snake.length + 3)); ctx.fillRect(part.x,part.y,1,1) } ctx.globalAlpha = 1; ctx.fillStyle = "#e7c6ff"; ctx.fillRect(snake[0].x,snake[0].y,1,1); ctx.fillStyle = "#7f4dff"; ctx.fillRect(food.x,food.y,1,1) }; let step = () => { direction = pending; let head = {x:(snake[0].x + direction.x + columns) % columns,y:(snake[0].y + direction.y + rows) % rows}; if (snake.some(part => part.x === head.x && part.y === head.y)) { snake = [{x:11,y:6},{x:10,y:6},{x:9,y:6}]; direction = pending = {x:1,y:0}; placeFood() } else { snake.unshift(head); if (head.x === food.x && head.y === food.y) placeFood(); else snake.pop() } draw() }; let onKey = event => { let move = ({ArrowUp:{x:0,y:-1},w:{x:0,y:-1},W:{x:0,y:-1},ArrowDown:{x:0,y:1},s:{x:0,y:1},S:{x:0,y:1},ArrowLeft:{x:-1,y:0},a:{x:-1,y:0},A:{x:-1,y:0},ArrowRight:{x:1,y:0},d:{x:1,y:0},D:{x:1,y:0}})[event.key]; if (!move) return; event.preventDefault(); if (move.x !== -direction.x || move.y !== -direction.y) pending = move }; voidSnake = {stage,canvas,onKey,timer:setInterval(step,115)}; document.addEventListener("keydown", onKey); mystery.classList.add("secret-snake-awake"); draw() }
const kv = (a, b) => `<div><span>${a}</span><b>${b}</b></div>`;
function setTabTitle(show, seconds = 0) { document.title = show ? `THE VOID · ${fmt(seconds)}` : "THE VOID" }
function updatePresence(l) { if ($("#presence-clock")) $("#presence-clock").textContent = fmt(l.my_presence_seconds); if ($("#presence")) $("#presence").textContent = fmt(l.my_presence_seconds); if ($("#claim")) $("#claim").textContent = l.claim_label; if ($("#claim-under-stage")) $("#claim-under-stage").textContent = l.claim_label; if ($("#active-witnesses")) $("#active-witnesses").textContent = activeWitnesses; setTabTitle(!!(l.joined && !l.revealed), l.my_presence_seconds) }
function updateWinnerAction(l) { let button = $("#winner-contribute"), submitted = sessionStorage.getItem(`void_contributed_${l?.id}`) === "1"; if (!button) return; button.hidden = !(l?.winner && !submitted); if (!button.hidden) button.onclick = contribute }
function updateHome(l) { if ($("#online")) $("#online").textContent = liveVisitors; updateWinnerAction(l); updatePresence(l) }
  function drawRecent(a) { let g = $("#recent"); if (!g) return; g.innerHTML = ""; let previous = $("#recent-prev"), next = $("#recent-next"); for (let x of a) { let c = document.createElement("article"); c.className = "artifactcard flip-card recent-artifact-card"; c.innerHTML = `<div class="card-face card-front"><div class=cardart></div><div class=cardbody><small class=card-class>${esc(x.classification)}</small><b class="card-name rarity-name ${esc(x.rarity)}">${esc(x.name)}</b><small class="card-weirdness recent-weirdness">👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${x.weirdness}</span></small></div></div><div class="card-face card-back"><span class="void-orb-mark">◉</span><small class="recent-back-id"></small></div>`; c.querySelector(".cardart").append(cv(x)); c.onclick = () => c.classList.toggle("is-flipped"); let nb = c.querySelector(".card-name"); if (nb) nb.onclick = e => { e.stopPropagation(); collectionDetail(x) }; g.append(c) } let updateNavigation = () => { let atStart = g.scrollLeft <= 1, atEnd = g.scrollLeft + g.clientWidth >= g.scrollWidth - 1; if (previous) previous.disabled = atStart; if (next) next.disabled = atEnd }; let move = direction => { let card = g.querySelector(".recent-artifact-card"), amount = (card?.getBoundingClientRect().width || g.clientWidth) + 9; g.scrollBy({ left: direction * amount, behavior: "smooth" }) }; if (previous) previous.onclick = () => move(-1); if (next) next.onclick = () => move(1); g.onscroll = updateNavigation; requestAnimationFrame(updateNavigation) }
  function showToast(message) { app.insertAdjacentHTML("beforeend", `<div class="modal toast-modal" id=toast><div class="panel modalbox"><strong>${esc(message)}</strong><button class="join understood-button" id=toastclose>UNDERSTOOD</button></div></div>`); $("#toastclose").onclick = () => $("#toast")?.remove() }
function showAbout() { if ($("#modal")) return; app.insertAdjacentHTML("beforeend", `<div class=modal id=modal><div class="panel modalbox"><button class=modal-x id=modalx aria-label="Close"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"></line><line x1="12" y1="2" x2="2" y2="12"></line></svg></button><h2>THE VOID</h2><div class=voidq>◉</div><strong>UNKNOWN DEPTH</strong><p>Ideas enter here. Artifacts sometimes return.</p><a class=coffee-button href="https://www.buymeacoffee.com/thevoid" target="_blank" rel="noopener noreferrer"><img class="mx-auto h-14" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee"></a></div></div>`); let close = () => $("#modal")?.remove(); $("#modalx").onclick = close; $("#modal").onclick = e => { if (e.target.id === "modal") close() }; document.onkeydown = e => { if (e.key === "Escape") close() } }

  async function archive() { sys("ARCHIVE SIGNAL ACQUIRED"); let all = await api("/api/archive"), rarities = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"]; app.innerHTML = `<section class="panel wide"><div class=archive-top><div><button class="section-back" id="archive-back" type="button" aria-label="Back to The Void">←</button><div class=eyebrow>PERMANENT PUBLIC RECORD</div><h1>THE ARCHIVE</h1><p>Artifacts that escaped THE VOID.</p></div><div class=filters><input id=q placeholder="SEARCH"><select id=archive-sort aria-label="Sort artifacts alphabetically"><option value="asc">NAME A–Z</option><option value="desc">NAME Z–A</option></select><select class="rarity-filter" id=r><option value="">ALL RARITIES</option>${rarities.map(r => `<option class="rarity-option ${r}">${r}</option>`).join("")}</select><select id=c><option value="">ALL CLASSES</option></select></div></div><div class=summary>${sum("ARTIFACTS", all.length)}${sum("TOTAL WEIRDNESS", all.reduce((s, x) => s + x.weirdness, 0))}${sum("LEGENDARY+", all.filter(x => ["LEGENDARY", "MYTHIC", "DIVINE"].includes(x.rarity)).length)}${sum("WEIRDEST", all.length ? Math.max(...all.map(x => x.weirdness)) : 0)}</div><div class=archivegrid id=agrid></div></section>`; $("#archive-back").onclick = () => go("/void"); [...new Set(all.map(x => x.classification))].sort().forEach(x => $("#c").insertAdjacentHTML("beforeend", `<option>${esc(x)}</option>`)); function filter() { updateRarityFilter($("#r")); let q = $("#q").value.toLowerCase(), r = $("#r").value, c = $("#c").value, order = $("#archive-sort").value, items = all.filter(x => (!q || (x.name + " " + x.artifact_id).toLowerCase().includes(q)) && (!r || x.rarity === r) && (!c || x.classification === c)); items.sort((a, b) => order === "desc" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)); drawArchive(items) } ["#q", "#archive-sort", "#r", "#c"].forEach(x => $(x).oninput = filter); ["#archive-sort", "#r"].forEach(x => $(x).onchange = filter); filter() }
const sum = (n, v) => `<div><b>${v}</b><small>${n}</small></div>`;
 function drawArchive(a) { let g = $("#agrid"); g.innerHTML = ""; if (!a.length) { g.innerHTML = '<div class="empty archive-empty" aria-label="No artifacts"><span class="void-orb">◉</span></div>'; return } for (let x of a) { let c = document.createElement("article"); c.className = "artifactcard flip-card archive-artifact-card"; c.innerHTML = `<div class="card-face card-front"><div class=cardart><small class="trade-art-id">#${esc(x.artifact_id)}</small></div><div class=cardbody><small class=card-class>${esc(x.classification)}</small><b class="card-name rarity-name ${esc(x.rarity)}">${esc(x.name)}</b><small class=card-weirdness>👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${esc(x.weirdness)}</span></small></div></div><div class="card-face card-back"><span class="void-orb-mark">◉</span><small class="archive-back-id"></small></div>`; c.querySelector(".cardart").append(cv(x)); c.onclick = () => c.classList.toggle("is-flipped"); let nb = c.querySelector(".card-name"); if (nb) nb.onclick = e => { e.stopPropagation(); history.pushState({}, '', `/archive/${encodeURIComponent(x.artifact_id)}`); collectionDetail(x) }; g.append(c) } }

  async function detail(id) { sys("🔎 ARCHIVE RECORD"); let all = await api("/api/archive"), a = all.find(x => x.artifact_id === id); if (!a) { app.innerHTML = '<section class="panel wide empty">❓ RECORD NOT FOUND.</section>'; return } await archive(); collectionDetail(a) }
 const rr = (a, b) => `<div class=recordrow><span>${esc(a)}</span><span>${esc(b)}</span></div>`;
 const weirdnessRow = value => `<div class=recordrow><span>WEIRDNESS</span><span class="detail-weirdness weirdness-val ${weirdnessTier(value)}">${esc(value)}</span></div>`;
 const updateRarityFilter = select => { if (!select) return; select.className = `rarity-filter ${select.value || "ALL"}` };

function parse(buf) { let b = new Uint8Array(buf), p = 8; while (p < b.length) { let n = ((b[p] << 24) | (b[p + 1] << 16) | (b[p + 2] << 8) | b[p + 3]) >>> 0, t = String.fromCharCode(...b.slice(p + 4, p + 8)); if (t === "tEXt") { let d = b.slice(p + 8, p + 8 + n), z = d.indexOf(0); if (new TextDecoder().decode(d.slice(0, z)) === "VOID_ARTIFACT") return JSON.parse(new TextDecoder().decode(d.slice(z + 1))) } p += 12 + n } throw Error("UNVERIFIED") }
function collection() {
  sys(collectionMode === "owned" ? "COLLECTION // OWNED" : "RELIC EXCHANGE // TRADE MARKET");
  app.innerHTML = `<section class="panel wide"><div class=archive-top><div>${collectionMode === "trade" ? '<button class="exchange-back" id="exchange-back" type="button" aria-label="Back to collection">←</button><div class=eyebrow>LOCAL VAULT &amp; EXCHANGE</div>' : '<button class="section-back" id="collection-back" type="button" aria-label="Back to The Void">←</button><div class=eyebrow>LOCAL VAULT &amp; EXCHANGE</div>'}<h1>${collectionMode === "owned" ? "COLLECTION" : "EXCHANGE"}</h1><p>${collectionMode === "owned" ? "Your artifacts live with you, not with<br>THE VOID." : "Your artifacts live with you, not with THE VOID."}</p></div><div class="collection-header-controls">${collectionMode === 'owned' ? `<button class="trade-entry-btn" id="tab-trade" type="button">TRADE</button><div class="filters collection-filters"><input id=collection-q placeholder="SEARCH ARTIFACTS"><select id=collection-sort aria-label="Sort artifacts alphabetically"><option value="asc">NAME A–Z</option><option value="desc">NAME Z–A</option></select><select class="rarity-filter" id=collection-r><option value="">ALL RARITIES</option>${["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE"].map(r => `<option class="rarity-option ${r}">${r}</option>`).join("")}</select><select id=collection-c><option value="">ALL CLASSES</option></select><select id=collection-weirdness><option value="">ALL WEIRDNESS</option><option value="0-69">0–69</option><option value="70-76">70–76</option><option value="77-85">77–85</option><option value="86-93">86–93</option><option value="94-99">94–99</option></select></div>` : `<select class="trade-mode-filter" id="trade-filter-status" aria-label="Filter trades"><option value="">ALL TRADES</option><option value="OPEN">OPEN FOR TRADE</option><option value="PENDING">PENDING CONFIRMATION</option><option value="MINE">MY PUBLISHED TRADES</option></select>`}</div></div><div id="collection-view-body"></div></section>`;
  $("#exchange-back") && ($("#exchange-back").onclick = () => { collectionMode = "owned"; collection() });
  $("#collection-back") && ($("#collection-back").onclick = () => go("/void"));
  $("#tab-trade") && ($("#tab-trade").onclick = () => { collectionMode = "trade"; collection() });
  if (collectionMode === "owned") renderOwnedView(); else renderTradeView();
}

function renderOwnedView() {
  let b = $("#collection-view-body"); if (!b) return;
  b.innerHTML = `<div id=drop class=drop><div><span class=drop-icon>📦</span>DROP ARTIFACTS HERE</div></div><div id=csum class=summary></div><div id=sets class=sets></div><div id=cgrid class=archivegrid></div>`;
  let d = $("#drop");
  d.ondragover = e => { e.preventDefault(); d.classList.add("drag") };
  d.ondragleave = () => d.classList.remove("drag");
  d.ondrop = e => { e.preventDefault(); d.classList.remove("drag"); load(e.dataTransfer.files) };
  d.onclick = () => { let i = document.createElement("input"); i.type = "file"; i.multiple = true; i.accept = ".png"; i.onchange = () => load(i.files); i.click() };
  [...new Set(local.map(x => x.classification))].sort().forEach(x => $("#collection-c").insertAdjacentHTML("beforeend", `<option>${esc(x)}</option>`));
  ["#collection-q", "#collection-sort", "#collection-r", "#collection-c", "#collection-weirdness"].forEach(x => $(x).oninput = () => { updateRarityFilter($("#collection-r")); drawCollection() });
  ["#collection-sort", "#collection-r"].forEach(x => $(x).onchange = () => { updateRarityFilter($("#collection-r")); drawCollection() });
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
    $("#trade-modal").onclick = e => { if (e.target.id === "trade-modal") close() };

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
  $("#trade-collection-picker").onclick = e => { if (e.target.id === "trade-collection-picker") close() };
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

async function load(fs) { for (let f of fs) try { let x = parse(await f.arrayBuffer()); if (!x.record || !x.signature) throw Error(); if (!local.some(a => a.artifact_id === x.record.artifact_id)) { local.push(x.record); saveLocal() } } catch { $("#drop").innerHTML = "⚠ UNVERIFIED ARTIFACT" } drawCollection() }
const secretSets = [
  {name:"SIGNAL WITHOUT SOURCE",complete:items=>items.some(item=>item.classification==="SIGNAL"),matches:item=>item.classification==="SIGNAL"},
  {name:"HIGH STRANGENESS",complete:items=>items.filter(item=>item.weirdness>=90).length>=3,matches:item=>item.weirdness>=90},
  {name:"RELICS OF USE",complete:items=>items.filter(item=>["RELIC","IMPLEMENT"].includes(item.classification)).length>=4,matches:item=>["RELIC","IMPLEMENT"].includes(item.classification)},
  {name:"THE WRONG DRAWER",complete:items=>items.length>=7,matches:()=>true}
];
function drawCollection() { if (!$("#csum")) return; $("#csum").innerHTML = sum("ARTIFACTS", local.length) + sum("TOTAL WEIRDNESS", local.reduce((s, x) => s + x.weirdness, 0)) + sum("LEGENDARY+", local.filter(x => ["LEGENDARY", "MYTHIC", "DIVINE"].includes(x.rarity)).length) + sum("CLASSES", new Set(local.map(x => x.classification)).size); $("#sets").innerHTML = '<h3>SECRET SETS</h3>' + secretSets.map(set => `<button class="set set-filter ${set.complete(local) ? "unlocked" : ""} ${selectedSecretSet === set.name ? "active" : ""}" type="button" data-secret-set="${esc(set.name)}" aria-pressed="${selectedSecretSet === set.name}">${esc(set.name)}</button>`).join(""); document.querySelectorAll("[data-secret-set]").forEach(button => button.onclick = () => { let name = button.getAttribute("data-secret-set"); selectedSecretSet = selectedSecretSet === name ? "" : name; drawCollection() }); drawLocalCards() }
 function drawLocalCards() { let g = $("#cgrid"); if (!g) return; let q = $("#collection-q")?.value.toLowerCase() || "", order = $("#collection-sort")?.value || "asc", r = $("#collection-r")?.value || "", cl = $("#collection-c")?.value || "", weirdness = $("#collection-weirdness")?.value || "", secretSet = secretSets.find(set => set.name === selectedSecretSet), items = local.filter(x => { let [minimum, maximum] = weirdness ? weirdness.split("-").map(Number) : [0, 99]; return (!q || `${x.name} ${x.artifact_id}`.toLowerCase().includes(q)) && (!r || x.rarity === r) && (!cl || x.classification === cl) && (!weirdness || (x.weirdness >= minimum && x.weirdness <= maximum)) && (!secretSet || secretSet.matches(x)) }); items.sort((a, b) => order === "desc" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)); g.innerHTML = ""; if (!items.length) { g.innerHTML = '<div class="empty collection-empty" aria-label="No artifacts"><span class="void-orb">◉</span></div>'; return } for (let x of items) { let c = document.createElement("article"); c.className = "artifactcard flip-card collection-card"; c.innerHTML = `<div class="card-face card-front"><div class=cardart><small class="trade-art-id">#${esc(x.artifact_id)}</small></div><div class=cardbody><small class=card-class>${esc(x.classification)}</small><b class="card-name rarity-name ${esc(x.rarity)}">${esc(x.name)}</b><small class=card-weirdness>👁 Weirdness <span class="detail-weirdness weirdness-val ${weirdnessTier(x.weirdness)}">${x.weirdness}</span></small></div></div><div class="card-face card-back"><span class="void-orb-mark">◉</span><small class="collection-back-id"></small></div>`; c.querySelector(".cardart").append(cv(x)); c.onclick = () => c.classList.toggle("is-flipped"); let nb = c.querySelector(".card-name"); if (nb) nb.onclick = e => { e.stopPropagation(); collectionDetail(x) }; g.append(c) } }
function collectionDetail(a) {
  let owned = local.some(x => x.artifact_id === a.artifact_id), actions = a.claimable ? `<a class="join archive-claim card-modal-claim" id=collection-dl href="/api/artifact/${encodeURIComponent(a.artifact_id)}/download">CLAIM</a>` : owned ? `<button class="understood-button" id=collection-quick-trade type=button>TRADE</button>` : `<span class="collection-record-status">ARCHIVED RECORD</span>`;
  $("#collection-modal")?.remove();
  app.insertAdjacentHTML("beforeend", `<div class=modal id=collection-modal><div class="collection-detail-modal"><div class="panel modalbox collection-detail vertical-card-modal archive-detail-card ${esc(a.rarity)}" data-rarity="${esc(a.rarity)}"><div class=card-header><div class=card-title-group><h2 class="rarity-name ${esc(a.rarity)}">${esc(a.name)}</h2></div><button class="archive-close collection-close" id=collection-x type=button aria-label="Close collection artifact"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="2" x2="12" y2="12"></line><line x1="12" y1="2" x2="2" y2="12"></line></svg></button></div><div class=card-info><div class="card-art-container collection-detail-art"><div class="detailart flip-card detail-flip-card" id=collection-detail-art><span class="card-face card-front"><small class="trade-art-id">#${esc(a.artifact_id)}</small></span><span class="card-face card-back"><span class="void-orb-mark">◉</span><small class="detail-back-id"></small></span></div></div><p class=lore>${esc(a.lore || "")}</p><div class=collection-stats>${rr("CLASSIFICATION", a.classification)}${rr("ANOMALY", String(a.anomaly || "UNKNOWN").replaceAll("_", " "))}${weirdnessRow(a.weirdness)}${(a.stats || []).map(s => rr(s.name, `${s.value}${s.unit || ""}`)).join("")}</div></div></div><div class=collection-detail-actions>${actions}</div></div></div>`);
  let detailArt = $("#collection-detail-art"), close = () => $("#collection-modal")?.remove();
  detailArt.querySelector(".card-front").append(cv(a));
  detailArt.onclick = () => detailArt.classList.toggle("is-flipped");
  $("#collection-x").onclick = close;
  $("#collection-modal").onclick = e => { if (e.target.id === "collection-modal") close() };
  $("#collection-quick-trade") && ($("#collection-quick-trade").onclick = () => { close(); collectionMode = "trade"; collection() });
  document.onkeydown = e => { if (e.key === "Escape") close() };
}

function contribute() { let lotId = current?.id; sys("❓ ONE CONTRIBUTION"); app.innerHTML = `<section class="panel wide contribution"><div class=eyebrow>THE VOID WILL ACCEPT SOMETHING IN RETURN</div><div class=voidq>❓</div><h1>LEAVE SOMETHING IN THE VOID</h1><p>Leave an idea behind. You will not know when — or whether — it returns.</p><textarea id=idea maxlength=280 placeholder="e.g. a suspicious toaster that predicts rain"></textarea><div class=formrow><span><b id=chars>0</b>/280</span><button id=release>CAST INTO THE VOID</button></div></section>`; $("#idea").oninput = e => $("#chars").textContent = e.target.value.length; $("#release").onclick = async () => { await api("/api/contribute", { method: "POST", body: JSON.stringify({ text: $("#idea").value }) }); if (lotId) sessionStorage.setItem(`void_contributed_${lotId}`, "1"); app.innerHTML = `<section class="panel wide contribution"><div class=eyebrow>✦ CONTRIBUTION ACCEPTED</div><h1>IT IS NO LONGER YOURS.</h1><p>Destination unknown. Surface date unknown. Attribution none.</p><button id=back>RETURN TO THE VOID</button></section>`; $("#back").onclick = () => go("/void") } }
route();