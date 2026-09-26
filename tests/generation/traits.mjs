import assert from "node:assert/strict";import {generate} from "../../engine/core.mjs";
const byObject=new Map();
for(let seed=1;seed<=20000;seed++){const a=generate(seed);if(!byObject.has(a.object))byObject.set(a.object,new Set());byObject.get(a.object).add(JSON.stringify(a.pixels))}
let counts=[...byObject.entries()].map(([o,s])=>[o,s.size]);let min=Math.min(...counts.map(x=>x[1])),avg=counts.reduce((s,x)=>s+x[1],0)/counts.length;
assert.ok(min>=3,`minimum variants only ${min}`);assert.ok(avg>=8,`average variants only ${avg}`);
console.log(`✓ ${byObject.size} semantic objects sampled`);
console.log(`✓ minimum visual variants/object: ${min}`);
console.log(`✓ average visual variants/object: ${avg.toFixed(1)}`);
