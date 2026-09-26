import assert from "node:assert/strict";
import fs from "node:fs";

const h = fs.readFileSync("web/public/index.html", "utf8");
const j = fs.readFileSync("web/public/app.js", "utf8");
const c = fs.readFileSync("web/public/void.css", "utf8");
const s = fs.readFileSync("server/lots/service.mjs", "utf8");
const a = fs.readFileSync("server/activity/index.mjs", "utf8");
const http = fs.readFileSync("server/http/app.mjs", "utf8");

for (const x of [
  "LIVE FEED",
  "CURRENT WARP",
  "RECENTLY DISCOVERED",
  "THE ARCHIVE",
  "COLLECTION",
  "SECRET SETS",
  "LEAVE SOMETHING IN THE VOID"
]) assert.ok((h + j).includes(x), x);

for (const x of ["FORCE CLOSE // DEMO", "NEXT LOT // DEMO", "HOLD TO BID", "ARTIFACT PNG"])
  assert.ok(!j.toUpperCase().includes(x), x);

for (const x of [
  "setTabTitle",
  "THE VOID · ${fmt(seconds)}",
  "UNKNOWN DEPTH",
  "function silhouette(pixels)",
  "function collectionDetail(a)",
  "SEARCH ARTIFACTS",
  "presence-clock",
  "CLAIM",
  "archive-close",
  "showToast",
  "archive-claim",
  "understood-button",
  "CURRENT WARP #",
  "YOUR PRESENCE LEFT A TRACE",
  "<div class=participation-actions><button class=join id=join-next",
  "The artifact has surfaced.",
  "Its record is now permanent.",
  "Stay awhile and do whatever...",
  "WHATEVER...",
  "live-dot",
  "active-witnesses",
  "syncFeed",
  "addFeedEvent",
  "setupSecretStage",
  "startVoidSnake",
  "stopVoidSnake",
  "updateWinnerAction",
  "sessionStorage",
  "flip-card",
  "card-back",
  "reveal-panel",
  "NEW DISCOVERY",
  "addToCollection",
  "archive-detail-card",
  "detail-flip-card",
  "collectionDetail(x)"
]) assert.ok(j.includes(x), x);

for (const x of ["WHAT IS THIS?", "GLOBAL ACTIVITY", "ACTIVE REGIONS", "people are present", "header-presence"])
  assert.ok(!j.includes(x), x);

assert.ok(h.includes('>COLLECTION</a>'));
assert.ok(h.includes('class="void-orb"'));
assert.ok(h.includes("THE VOID IS LISTENING"));
assert.ok(!h.includes("✦ THE VOID IS LISTENING"));
assert.ok(!j.includes('"✦ ARTIFACT SURFACED"'));
assert.ok(h.includes('aria-label="Leave something to The Void">✉</button>'));
assert.ok(h.includes("winner-contribute"));
assert.ok(h.includes('href="/void-orb.svg"'));
assert.ok(h.includes('rel="icon" type="image/svg+xml" sizes="any"'));
assert.ok(j.includes('class="statbox current-lot-stats"'));
assert.ok(j.includes('deriveArtifactFunctions(activeWarpArtifact)'));
const currentWarpLabels = ["CLASS", "RARITY", "WEIRDNESS", "IDLE", "INTENDED", "ACCIDENTAL"];
for (const label of currentWarpLabels) assert.ok(j.includes(`kv("${label}"`), label);
const currentWarpStats = j.match(/<div class=\"statbox current-lot-stats\">(.+?)<\/div><p class=condition>/s)?.[1] || "";
let previousCurrentWarpLabelIndex = -1;
for (const label of currentWarpLabels) {
  const labelIndex = currentWarpStats.indexOf(`kv("${label}"`);
  assert.ok(labelIndex > previousCurrentWarpLabelIndex, `Current Warp ${label} order`);
  previousCurrentWarpLabelIndex = labelIndex;
}
for (const oldLabel of ["IDLE FUNCTION", "INTENDED FUNCTION", "ACCIDENTAL FUNCTION"]) assert.ok(!currentWarpStats.includes(`kv("${oldLabel}"`), oldLabel);
assert.ok(currentWarpStats.includes('class="rarity ${esc(activeWarpArtifact?.rarity || "UNKNOWN")}')); 
assert.ok(currentWarpStats.includes('detail-weirdness weirdness-val ${weirdnessTier(activeWarpArtifact?.weirdness)}'));
assert.ok(!j.includes('kv("CLASSIFICATION", warpDropActive'));
assert.ok(!j.includes('kv("Origin", "THE VOID")'));
assert.ok(!j.includes('<div class=rarity-row><span>Rarity</span>'));
assert.ok(j.includes("ALL WEIRDNESS"));
assert.ok(!j.includes("collection-country"));
assert.ok(j.includes("collection-weirdness"));
assert.ok(j.includes("collection-empty"));
assert.ok(j.includes('<div class="empty collection-empty" aria-label="No artifacts"><span class="void-orb">◉</span></div>'));
assert.ok(j.includes('<div class="empty archive-empty" aria-label="No artifacts"><span class="void-orb">◉</span></div>'));
assert.ok(j.includes('sum("LEGENDARY+", local.filter(x => ["LEGENDARY", "MYTHIC", "DIVINE"].includes(x.rarity)).length)'));
assert.ok(j.includes('sum("LEGENDARY+", all.filter(x => ["LEGENDARY", "MYTHIC", "DIVINE"].includes(x.rarity)).length)'));
assert.ok(!j.includes('sum("MYTHIC+", local.filter(x => ["MYTHIC", "DIVINE"].includes(x.rarity)).length)'));
assert.ok(j.includes("archive-empty"));
assert.ok(!j.includes('sum("DIVINE", all.filter(x => x.rarity === "DIVINE").length)'));
assert.ok(!j.includes("NOTHING MATCHES THIS VIEW"));
assert.ok(!j.includes('${sum("MYTHIC+", all.filter(x => ["MYTHIC", "DIVINE"].includes(x.rarity)).length)}${sum("WEIRDEST"'));
assert.ok(j.includes("drop-icon"));
assert.ok(!j.includes("or choose artifacts from your device"));
assert.ok(j.includes("event-link"));
assert.ok(j.includes("void-orb-mark"));
assert.ok(c.includes("flex-direction:column"));
assert.ok(c.includes(".chat-form{\n  display:flex;\n  gap:6px;\n  margin-top:auto"));
assert.ok(c.includes(".chat-form input,.contribution textarea{"));
assert.ok(c.includes(".chat-form input:focus,.contribution textarea:focus{"));
assert.ok(j.includes("archive-artifact-card"));
assert.ok(j.includes("class=card-class"));
assert.ok(j.includes("class=card-weirdness"));
assert.ok(j.includes("archive-back-id"));
assert.ok(j.includes('class="archive-back-id">#${esc(x.artifact_id)}</small>'));
assert.ok(j.includes('class="archive-back-id">#${esc(x.artifactId)}</small>'));
assert.ok(j.includes("recent-back-id"));
assert.ok(j.includes("collection-back-id"));
assert.ok(j.includes("rarity-name"));
assert.ok(j.includes("const weirdnessTier"));
assert.ok(j.includes("Math.min(100, Number(value) || 0)"));
assert.ok(j.includes("const weirdnessRow"));
assert.ok(j.includes('${anomalyDescription ? `<p class="lore card-description-text">${esc(anomalyDescription)}</p>` : ""}'));
assert.ok(!j.includes('let descriptionText = a.description || a.artifactDescription'));
assert.match(j, /\$\{a\.organicTaxon \? rr\("ORGANIC TAXON", a\.organicTaxon\) : ""\}\s*\$\{anomalyStatsHtml\}/);
  assert.ok(j.includes("function renderFeed"));
  assert.ok(j.includes("data-feed-key"));
assert.ok(j.includes("is-flipped"));
assert.ok(j.includes("showAbout"));
assert.ok(j.includes("mystery.onclick = showAbout"));
assert.ok(j.includes("attempts < 4"));
assert.ok(j.includes("snake-active"));
assert.ok(j.includes("columns = 24, rows = 12"));
assert.ok(j.includes("(snake[0].x + direction.x + columns) % columns"));
assert.ok(j.includes("(snake[0].y + direction.y + rows) % rows"));
assert.ok(j.includes("document.addEventListener(\"keydown\", onKey)"));
assert.ok(j.includes("stopVoidSnake();"));
assert.ok(j.includes("https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"));
assert.ok(j.includes('alt="Buy Me a Coffee"'));
assert.ok(j.includes("ARCHIVE SIGNAL ACQUIRED"));
assert.ok(j.includes("ARCHIVED RECORD"));
assert.ok(j.includes('>CLAIM</a>'));
assert.ok(j.includes("collection-detail-actions"));
assert.ok(j.includes('id=collection-detail-art'));
assert.ok(j.includes("detailArt.append(cv(a))"));
assert.ok(j.includes("AWAITING PARTNER OFFER"));
assert.ok(j.includes('renderSideCard(trade.artifact, "YOUR LISTING"'));
assert.ok(j.includes("${esc(a.name)} FOUND ITS NEW OWNER"));
assert.ok(j.includes("found_owner"));
assert.ok(j.includes("JOIN THE WARP"));
assert.ok(j.includes("next_warp?.silhouette_pixels"));
assert.ok(j.includes('<div class=participation-actions><button class=join id=join-next'));
assert.ok(j.includes("CHAT"));
assert.ok(j.includes('class="panel warp-chat"'));
assert.ok(j.includes("chat-trade-mode"));
assert.ok(j.includes("mode:tradeMode?.checked ? \"TRADE\" : \"CHAT\""));
assert.ok(j.includes(">SEND</button>"));
assert.ok(!j.includes("A witness entered the WARP"));
assert.ok(!j.includes("TRADE SIGNALS"));
assert.ok(!j.includes("NO LINKS · 280 CHARACTERS · 1 SIGNAL / 3S"));
assert.ok(j.includes('id="btn-choose-offer-collection" type="button">COLLECTION'));
assert.ok(j.includes("DROP ARTIFACT"));
assert.ok(j.includes('id="trade-publish-btn" type="button">TRADE</button>'));
assert.ok(!j.includes("TRADE AN ARTIFACT"));
assert.ok(j.includes('<h1>${collectionMode === "owned" ? "COLLECTION" : "EXCHANGE"}</h1>'));
assert.ok(j.includes('id="exchange-back"'));
assert.ok(j.includes('id="archive-back"'));
assert.ok(j.includes('id="collection-back"'));
assert.ok(j.includes('"Your artifacts live with you, not with<br>THE VOID."'));
assert.ok(j.includes("OFFERED BY SOUL"));
assert.ok(j.includes('id=archive-sort aria-label="Sort artifacts alphabetically"'));
assert.ok(j.includes('id=collection-sort aria-label="Sort artifacts alphabetically"'));
assert.ok(j.includes('option value="asc">NAME A–Z</option>'));
assert.ok(j.includes('option value="desc">NAME Z–A</option>'));
assert.ok(j.includes("a.name.localeCompare(b.name)"));
assert.ok(j.includes('class="rarity-filter" id=r'));
assert.ok(j.includes('class="rarity-filter" id=collection-r'));
assert.ok(j.includes("updateRarityFilter"));
assert.ok(!j.includes('id="tab-collection"'));
assert.ok(j.includes('sys(collectionMode === "owned" ? "COLLECTION // OWNED" : "RELIC EXCHANGE // TRADE MARKET")'));
assert.ok(j.includes("publishTradeArtifact"));
assert.ok(!j.includes("openPublishModal"));
assert.ok(!j.includes("PUBLISH ARTIFACT FOR TRADE</button>"));
assert.ok(j.includes("openTradeCollectionPicker"));
assert.ok(j.includes("trade-picker-weirdness"));
assert.ok(!j.includes("trade-picker-country"));
assert.ok(j.includes("mystery-shape-${Math.abs(Number(l.id) || 0) % 20}"));
assert.ok(j.includes("activeWitnesses"));
assert.ok(j.includes("ACTIVE SOULS: <b><i class=live-dot></i><span id=active-witnesses>"));
assert.ok(j.includes("CLAIM: <b id=claim-under-stage>${esc(l.claim_label)}</b>"));
assert.ok(!j.includes("ACTIVE WITNESSES"));
assert.ok(j.includes("recent-artifact-card"));
assert.ok(j.includes('class="recent-back-id">#${esc(x.artifact_id)}</small>'));
assert.ok(!j.includes('class="card-weirdness recent-weirdness"'));
assert.ok(j.includes('art.onclick = e => { e.stopPropagation(); collectionDetail(x, { hideProperties: true }); }'));
  assert.ok(j.includes("recent-prev"));
  assert.ok(j.includes("recent-next"));
  assert.ok(j.includes("Show previous discoveries"));
  assert.ok(j.includes("Show next discoveries"));
  assert.ok(j.includes("g.scrollBy"));
  assert.ok(j.includes("arc.slice(0, 12)"));
assert.ok(j.includes('href="/collection" data-link>YOUR PRESENCE LEFT A TRACE'));
assert.ok(j.includes('class="trace-note reveal-owner-note">${esc(a.name)} FOUND ITS NEW OWNER'));
assert.ok(j.includes("The Warp #${l.id}"));
assert.ok(j.includes("The Warp changed state"));
assert.ok(j.includes("entered The Void"));
assert.ok(!j.includes('✦ <a class=event-link'));
assert.ok(j.includes("selectedSecretSet"));
assert.ok(j.includes("SIGNAL WITHOUT SOURCE"));
assert.ok(j.includes("data-secret-set"));
assert.ok(j.includes("function refreshChat"));
assert.ok(j.includes('api("/api/chat"'));
assert.ok(j.includes("renderFeed(); refreshChat()"));
assert.ok(!j.includes('$("#feed").innerHTML = feed()'));
assert.ok(!j.includes("JOIN THE LOT"));
assert.ok(!j.includes("VIEW ARCHIVE ENTRY"));
assert.ok(!j.includes("✦ The artifact has surfaced."));
assert.ok(!h.includes("LEAVE SOMETHING TO THE VOID"));
assert.ok(c.includes("system-ui"));
assert.ok(!c.includes("header-presence"));
assert.ok(c.includes("header-contribute"));
assert.ok(c.includes("header-contribute:active"));
assert.ok(c.includes(".coffee-button img"));
assert.ok(c.includes(".modal-x{"));
assert.ok(c.includes("#modal .modalbox{"));
assert.ok(c.includes("border-color:#8b5cff"));
assert.ok(c.includes("top:12px;"));
assert.ok(c.includes("archive-title"));
assert.ok(c.includes("archive-close:active"));
assert.ok(c.includes("archive-claim:hover"));
assert.ok(c.includes("reveal-panel .condition"));
assert.ok(c.includes(".void-orb{"));
assert.ok(c.includes(".brand:hover b"));
assert.ok(c.includes(".recentpanel .card-back .void-orb-mark"));
assert.ok(c.includes("transform:translate(-50%,-50%)"));
assert.ok(c.includes(".recentpanel .card-back{\n  position:absolute;\n  inset:0;"));
assert.ok(c.includes(".lotgrid:has(#presence-clock) .artifact-stage"));
assert.ok(c.includes(".archive-detail-card"));
assert.ok(c.includes(".record h1{\n  color:#f1f6ff"));
assert.ok(c.includes(".join:not(.joined),"));
assert.ok(c.includes(".current-lot-stats span"));
assert.ok(c.includes(".collection-record-status"));
assert.ok(c.includes(".trade-card .badge"));
assert.ok(c.includes(".trade-collection-grid"));
assert.ok(c.includes(".collection-detail-actions"));
assert.ok(c.includes("width:410px"));
assert.ok(c.includes(".owner-found-panel"));
assert.ok(c.includes(".lotgrid:not(:has(#presence-clock)) .participation-actions{\n  margin-top:auto"));
assert.ok(c.includes(".lot-action-height .join,\n#trace-slot .trace-note{\n  min-height:54px;\n  height:54px;"));
assert.ok(c.includes(".activity-strip{\n  border:1px solid var(--line);\n  border-top:0;\n  min-height:54px;"));
assert.ok(c.includes(".queued-silhouette"));
assert.ok(c.includes(".queued-silhouette::before"));
assert.ok(c.includes(".void-snake-canvas{"));
assert.ok(c.includes("aspect-ratio:2/1"));
assert.ok(c.includes(".mystery.secret-stir-1"));
assert.ok(c.includes("@keyframes secret-stir-three"));
assert.ok(c.includes("color:#ff4f64"));
assert.ok(c.includes("#feed .event"));
assert.ok(c.includes(".warp-chat{"));
assert.ok(c.includes(".chat-form{"));
assert.ok(c.includes("--chat-trade-control-width:52px"));
assert.ok(c.includes("flex:0 0 var(--chat-trade-control-width)"));
assert.ok(c.includes(".recent-artifact-card .card-back"));
assert.ok(c.includes(".recent-artifact-card{\n  position:relative;\n  height:235px;"));
assert.ok(c.includes(".recent-artifact-card .cardart{\n  height:195px;"));
assert.ok(c.includes(".recent-artifact-card .recent-back-id{"));
assert.ok(c.includes("top:10px;"));
assert.ok(c.includes(".card-weirdness{"));
  assert.ok(c.includes(".recent-slider{"));
  assert.ok(c.includes(".recent-nav{"));
  assert.ok(c.includes(".recent-nav:hover:not(:disabled){border-color:#8b5cff"));
  assert.ok(c.includes(".recent-slider{position:relative;isolation:isolate}"));
  assert.ok(c.includes(".recent-nav-prev{left:8px}"));
  assert.ok(c.includes(".recent-nav-next{right:8px}"));
  assert.ok(c.includes(".recentgrid{position:relative;z-index:0;"));
  assert.ok(c.includes("scroll-snap-type:inline mandatory"));
  assert.ok(c.includes(".recent-artifact-card.is-flipped"));
assert.ok(c.includes(".set-filter.active"));
assert.ok(c.includes("feed-event-in"));
assert.ok(c.includes(".reveal-panel .statbox span.rarity.RARE"));
assert.ok(c.includes(".reveal-panel .statbox span.rarity.UNCOMMON"));
assert.ok(c.includes(".reveal-panel .statbox span.rarity.EPIC"));
assert.ok(c.includes(".reveal-panel .statbox span.rarity.LEGENDARY"));
assert.ok(c.includes(".reveal-panel .statbox span.rarity.MYTHIC"));
assert.ok(c.includes(".reveal-panel .statbox span.rarity.DIVINE"));
assert.ok(c.includes(".reveal-panel .statbox b .rarity.LEGENDARY"));
assert.ok(c.includes(".archive-detail-card .collection-detail-art"));
assert.ok(c.includes(".archive-artifact-card .card-back"));
assert.ok(c.includes(".archive-back-id,"));
assert.ok(c.includes("top:10px;"));
assert.ok(c.includes(".archive-artifact-card .archive-back-id{"));
assert.ok(c.includes("font-size:12px;"));
assert.ok(c.includes("background:#081321d4;"));
assert.ok(c.includes("border:1px solid #233d5e;"));
assert.ok(c.includes(".archive-artifact-card,\n.collection-card{\n  height:270px;"));
assert.ok(c.includes(".drop-icon{display:block;margin-bottom:16px;font-size:38px;line-height:1}"));
assert.ok(c.includes(".collection-card .card-back{position:absolute;inset:0;border:2px solid #a970ff"));
assert.ok(c.includes(".rarity-name.RARE{color:#42d9ff"));
assert.ok(c.includes(".artifact-stage.secret-stage{position:relative;overflow:hidden;cursor:default}"));
assert.ok(c.includes(".collection-header-controls{"));
assert.ok(c.includes("width:min(630px,100%);"));
assert.ok(c.includes("grid-template-columns:minmax(130px,1.3fr) repeat(4,minmax(0,1fr));"));
assert.ok(c.includes(".collection-header-controls:has(#tab-trade){\n  flex-wrap:nowrap;"));
assert.ok(c.includes(".collection-header-controls #tab-trade{\n  flex-shrink:0"));
assert.ok(c.includes(".collection-empty .void-orb,\n.archive-empty .void-orb{"));
assert.ok(c.includes("grid-template-columns:2fr repeat(4,minmax(120px,1fr));"));
assert.ok(c.includes(".trade-entry-btn{"));
assert.ok(c.includes(".trade-publish-btn{"));
assert.ok(c.includes(".exchange-back{"));
assert.ok(c.includes(".section-back{"));
assert.ok(c.includes(".rarity-filter.RARE{color:#42d9ff}"));
assert.ok(c.includes(".rarity-option.DIVINE{color:#fff0a3}"));
assert.ok(c.includes("min-height:78px;"));
assert.ok(c.includes(".warp-chat{--chat-trade-control-width:56px}"));
assert.ok(c.includes(".chat-trade-mode{justify-content:space-between;white-space:nowrap}"));
assert.ok(c.includes(".recent-artifact-card .cardbody{flex:0 0 auto;height:auto;padding:6px 9px 9px}"));
assert.ok(c.includes(".recent-artifact-card .card-name{\n  width:100%;\n  margin:0;\n  text-align:left"));
assert.ok(c.includes(".recent-artifact-card .cardbody .card-name{\n  display:block;\n  text-align:left;"));
assert.ok(c.includes(".feedpanel{padding:14px;grid-column:1;grid-row:1 / 2;align-self:stretch;height:100%;box-sizing:border-box}"));
assert.ok(c.includes("@media(min-width:1051px){\n  .feedpanel{\n    contain:size"));
assert.ok(c.includes(".lotgrid:not(:has(#presence-clock)) #lotdetails>.condition{"));
assert.ok(c.includes("#lotdetails>.current-lot-stats{\n  margin-bottom:0"));
assert.ok(c.includes("#lotdetails>.condition{\n  flex:1;\n  align-content:center;\n  margin:0;\n  padding:14px 0"));
assert.ok(c.includes("#lotdetails>.condition + .participation-actions{\n  margin-top:0"));
assert.ok(c.includes("margin:0 0 20px;"));
assert.ok(c.includes("@media(min-width:1051px){\n  .top nav{\n    position:absolute;\n    left:calc(14px + 380px + 12px + 1px + 14px - 16px)"));
assert.ok(c.includes(".coffee-button{margin-top:28px}"));
assert.ok(c.includes(".archive-empty{"));
assert.ok(c.includes(".collection-empty::before{\n  content:none"));
assert.ok(c.includes(".trade-offer-actions button{"));
assert.ok(c.includes(".collection-stats .detail-weirdness.RARE{color:#42d9ff"));
assert.ok(c.includes(".reveal-owner-note{"));
assert.ok(c.includes("border-color:#17132d"));
for(const rarity of ["COMMON","UNCOMMON","RARE","EPIC","LEGENDARY","MYTHIC","DIVINE"]) assert.ok(j.includes(`\"${rarity}\"`), rarity);
assert.ok(c.includes(".reveal-panel h1{"));
assert.ok(c.includes(".collection-close{"));
assert.ok(c.includes(".trade-mode-filter{"));
assert.ok(c.includes(".trade-footer-actions{"));
assert.ok(c.includes(".collection-detail .detail-flip-card"));
assert.ok(c.includes(".collection-detail-flip-card{"));
assert.ok(c.includes(".collection-detail-flip-card>.card-back{"));
assert.ok(j.includes('class="card-face card-back collection-detail-back"'));
assert.ok(j.includes('class="recent-back-id"'));
assert.ok(j.includes('class="void-orb collection-detail-back-orb"'));
assert.ok(c.includes("transform-style:preserve-3d;"));
assert.ok(c.includes(".collection-detail-flip-card>.card-back{\n  position:absolute;\n  inset:0;\n  z-index:1!important;"));
assert.ok(c.includes(".collection-detail-flip-card>.collection-detail-front>.archive-detail-card:hover{"));
assert.ok(c.includes("background:radial-gradient(circle at center,#2d1760 0,#100b22 34%,#000 72%)!important;"));
assert.ok(c.includes("transform:translate(-50%,-50%)"));
assert.ok(c.includes("border:3px solid #a970ff!important;"));
assert.ok(c.includes(".collection-detail-flip-card>.card-back .recent-back-id{"));
assert.ok(c.includes(".collection-detail-flip-card>.card-back .recent-back-id{\n  display:block;\n  top:10px;\n  left:11px;\n  bottom:auto;\n  font-size:12px;"));
assert.ok(c.includes("background:linear-gradient(135deg,#b94cff 0%,#d18bff 48%,#565cff 100%);"));
assert.ok(j.includes('let anomalyDescription = a.anomaly || "";'));
assert.ok(j.includes('a.classification || a.taxonomy?.category || a.taxonomy?.classType || "UNKNOWN"'));
assert.ok(j.includes('${rr("CLASS", classification)}\n                  ${weirdnessRow(a.weirdness)}'));
assert.ok(j.includes('"IDLE FUNCTION": "IDLE"'));
assert.ok(j.includes('"INTENDED FUNCTION": "INTENDED"'));
assert.ok(j.includes('"ACCIDENTAL FUNCTION": "ACCIDENTAL"'));
assert.ok(!j.includes('${rr("CLASSIFICATION", classification)}'));
assert.ok(!j.includes('<small class="detail-card-id">#${esc(a.artifact_id || a.artifactId || "")}</small>'));
assert.ok(c.includes("border-width:3px!important;"));
assert.ok(c.includes(".collection-detail-flip-card>.collection-detail-front>.archive-detail-card.RARE,"));
assert.ok(c.includes("height:270px"));
assert.ok(s.includes("LOT_DURATION_MS"));
assert.ok(s.includes("REVEAL_DURATION_MS"));
assert.ok(s.includes("country_counts:l.countries"));
assert.ok(s.includes("revealed:l.revealed?.record||null"));
assert.ok(s.includes("if(l.revealed){if(Date.now()>=Date.parse(l.revealed_at||l.ends_at)+Number(process.env.REVEAL_DURATION_MS||45000))return getLot(session)"));
assert.ok(s.includes("l.next_lot=l.next_lot||newLot()"));
assert.ok(s.includes("silhouette_pixels:artifact.pixels.map(row=>row.map(Boolean))"));
assert.ok(a.includes("getActivity"));
assert.ok(http.includes("/api/activity"));
assert.ok(http.includes('"/api/chat"&&req.method==="GET"'));
assert.ok(http.includes('"/api/chat"&&req.method==="POST"'));
assert.ok(http.includes('filename="${name}.png"'));
assert.ok(http.includes('".svg":"image/svg+xml"'));
assert.ok(http.includes('if(x.winner_session!==sid)return json(res,403,{error:"NOT_AVAILABLE"})'));

console.log("✓ product UI and reveal action behavior validated");