import assert from "node:assert/strict";import {OBJECTS} from "../../engine/registry/objects.mjs";import {GRAMMARS} from "../../engine/grammars/families.mjs";import {generate} from "../../engine/core.mjs";
const names=Object.keys(OBJECTS), families=new Set(Object.values(OBJECTS).map(x=>x.family));
assert.equal(names.length,500);assert.equal(families.size,20);for(const f of families)assert.equal(typeof GRAMMARS[f],"function");
let seen=new Set();for(let seed=1;seed<=100000&&seen.size<500;seed++)seen.add(generate(seed).object);
assert.equal(seen.size,500);
console.log("✓ VOID-500 registry contains exactly 500 semantic targets");
console.log("✓ 20 grammar families have renderers");
console.log("✓ all 500 targets reached through deterministic generation");
