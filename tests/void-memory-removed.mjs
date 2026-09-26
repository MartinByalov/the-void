import assert from "node:assert/strict";
import fs from "node:fs";

const html = fs.readFileSync("web/public/index.html", "utf8");
const app = fs.readFileSync("web/public/app.js", "utf8");
const css = fs.readFileSync("web/public/void.css", "utf8");

for (const text of ["VOID MEMORY", "VOID KNOWLEDGE GRAPH", "voidMemoryView", 'href="/memory"', 'p === "/memory"']) {
  assert.ok(!(html + app).includes(text), `Public VOID MEMORY reference remains: ${text}`);
}

assert.ok(!css.includes("memory-sections-grid"));
assert.ok(!css.includes("mem-bridge-row"));
console.log("✓ Public VOID MEMORY navigation, route, view, and styles removed");