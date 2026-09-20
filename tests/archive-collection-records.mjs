import assert from "node:assert/strict";
import fs from "node:fs";

const app = fs.readFileSync("web/public/app.js", "utf8");
const section = (start, end) => app.slice(app.indexOf(start), app.indexOf(end, app.indexOf(start)));
const archiveRenderer = section("function drawArchive(a)", "\nasync function detail");
const collectionRenderer = section("function drawLocalCards()", "\nfunction collectionDetail(a)");
const detailRenderer = section("function collectionDetail(a)", "\nfunction contribute()");

for (const [name, renderer] of [
  ["Archive", archiveRenderer],
  ["Collection", collectionRenderer],
  ["Artifact detail", detailRenderer]
]) {
  assert.ok(renderer.length > 0, `${name} renderer must exist`);
  assert.doesNotMatch(renderer, /append\(cv\(/, `${name} must not mount generated visual output`);
  assert.doesNotMatch(renderer, /cardart|collection-detail-art|detail-flip-card/, `${name} must not render an artifact image container`);
}

assert.match(archiveRenderer, /ARCHIVED RECORD/);
assert.match(collectionRenderer, /LOCAL RECORD/);
assert.match(detailRenderer, /VISUAL MATERIAL NOT YET GENERATED/);

console.log("✓ Archive and Collection render artifact records without generated images");