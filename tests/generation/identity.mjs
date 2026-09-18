import assert from "node:assert/strict";import {OBJECTS} from "../../engine/registry/objects.mjs";import {GRAMMARS} from "../../engine/grammars/families.mjs";import {morphology,MORPHOLOGY_COUNT} from "../../engine/grammars/morphology.mjs";import {render24} from "../../engine/renderer/pixels.mjs";
const signatures=new Map();
for(const [o,d] of Object.entries(OBJECTS)){const p=morphology(o,{variant:d.variant,primitives:GRAMMARS[d.family](()=>.5,d.variant)});const px=render24(p,"IRON");const sig=JSON.stringify(px);if(!signatures.has(sig))signatures.set(sig,[]);signatures.get(sig).push(o)}
const unique=signatures.size,total=Object.keys(OBJECTS).length;
assert.ok(unique>=70,`Only ${unique}/${total} structural signatures`);
console.log(`✓ ${unique}/${total} distinct structural sprite signatures`);
console.log(`✓ ${MORPHOLOGY_COUNT} objects have explicit morphology; remainder use deterministic family modifiers`);
