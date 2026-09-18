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
  "CURRENT LOT",
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
  "mystery-question",
  "function collectionDetail(a)",
  "SEARCH ARTIFACTS",
  "presence-clock",
  "CLAIM ARTIFACT",
  "archive-close",
  "showToast",
  "record-meta",
  "archive-claim",
  "understood-button",
  "CURRENT LOT #",
  "VIEW ARCHIVE ENTRY",
  "YOUR PRESENCE LEFT A TRACE",
  "reveal-action",
  "go(\"/collection\")",
  "/archive/${encodeURIComponent(a.artifact_id)}",
  "The artifact has surfaced.",
  "Its record is now permanent.",
  "Stay awhile and do whatever...",
  "WHATEVER...",
  "live-dot",
  "active-witnesses",
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
assert.ok(h.includes('aria-label="Leave something to The Void">✉</button>'));
assert.ok(h.includes("winner-contribute"));
assert.ok(h.includes('href="/void-orb.svg"'));
assert.ok(j.includes('class="rarity hidden-rarity">???'));
assert.ok(j.includes("ALL COUNTRIES"));
assert.ok(j.includes("collection-empty"));
assert.ok(j.includes("event-link"));
assert.ok(j.includes("void-orb-mark"));
assert.ok(j.includes("is-flipped"));
assert.ok(j.includes("showAbout"));
assert.ok(j.includes("ARCHIVE SIGNAL ACQUIRED"));
assert.ok(!j.includes("✦ The artifact has surfaced."));
assert.ok(!h.includes("LEAVE SOMETHING TO THE VOID"));
assert.ok(c.includes("system-ui"));
assert.ok(!c.includes("header-presence"));
assert.ok(c.includes("header-contribute"));
assert.ok(c.includes("header-contribute:active"));
assert.ok(c.includes("archive-title"));
assert.ok(c.includes("archive-close:active"));
assert.ok(c.includes("archive-claim:hover"));
assert.ok(c.includes("reveal-panel .condition"));
assert.ok(c.includes(".void-orb{"));
assert.ok(c.includes(".brand:hover b"));
assert.ok(c.includes(".recentpanel .card-back .void-orb-mark"));
assert.ok(c.includes(".lotgrid:has(#presence-clock) .artifact-stage"));
assert.ok(c.includes(".archive-detail-card"));
assert.ok(c.includes(".record h1{\n  color:#f1f6ff"));
assert.ok(c.includes(".join:not(.joined),"));
assert.ok(c.includes(".reveal-panel h1{"));
assert.ok(c.includes(".collection-close{"));
assert.ok(c.includes(".collection-detail .detail-flip-card"));
assert.ok(c.includes("height:260px"));
assert.ok(s.includes("LOT_DURATION_MS"));
assert.ok(s.includes("REVEAL_DURATION_MS"));
assert.ok(s.includes("country_counts:l.countries"));
assert.ok(a.includes("getActivity"));
assert.ok(http.includes("/api/activity"));
assert.ok(http.includes('filename="${name}.png"'));

console.log("✓ product UI and reveal action behavior validated");