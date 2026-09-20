import assert from "node:assert/strict";import {generate} from "../../engine/core.mjs";
for(let seed=1;seed<=500;seed++){let a=generate(seed),b=generate(seed);assert.deepEqual(a,b);assert.equal(a.pixels.length,24);assert.equal(a.pixels[0].length,24);assert.ok(a.semantic_traits.length)}
console.log("✓ 500 deterministic semantic artifacts rendered at 24×24");
