import assert from "node:assert/strict";
import { deriveArtifactFunctions, generateBatchRegistry, getArtifactBySerial } from "../web/public/void-lexicon.js";

const first = getArtifactBySerial(1);
const repeated = getArtifactBySerial(1);
assert.deepEqual(first, repeated, "A serial must always reproduce the same prompt and scene direction");
assert.ok(first.sceneDirection, "Each artifact must expose its generated scene direction");
assert.match(first.prompt, /ARTIFACT DESCRIPTION\n/);
assert.match(first.prompt, /SCENE DIRECTION\n/);
assert.match(first.prompt, /THE VOID STYLE\n/);
assert.match(first.prompt, /Do not default to a front-facing three-quarter hero pose/);
assert.match(first.prompt, /face, expression, and defining hybrid anatomy must remain visibly readable/);
assert.match(first.prompt, /Never show the subject primarily from behind/);
assert.doesNotMatch(first.prompt, /dramatic high-energy fantasy pose with dynamic foreshortening/i);
assert.ok(first.functions.idle.includes(first.taxonomy.organism_name.toLowerCase()));
assert.ok(first.functions.intended.includes(first.taxonomy.chassis_name.toLowerCase()));
assert.equal(first.functions.accidental, first.anomaly);
assert.deepEqual(deriveArtifactFunctions(first), first.functions);

const gyroscopePlesiosaur = [...Array(2160)].map((_, index) => getArtifactBySerial(index + 1)).find(artifact => artifact.taxonomy.chassis_synset === "gyroscope.n.01" && artifact.taxonomy.organism_synset === "plesiosaur.n.01");
assert.ok(gyroscopePlesiosaur, "The registry must contain the gyroscope / plesiosaur pairing");
assert.match(gyroscopePlesiosaur.functions.intended, /measures rotation and preserves orientation/);
assert.match(gyroscopePlesiosaur.functions.idle, /sauropterygia reptile/);
assert.equal(gyroscopePlesiosaur.functions.accidental, gyroscopePlesiosaur.anomaly);

const batch = generateBatchRegistry(1, 500);
const sceneDirections = new Set(batch.map(artifact => artifact.sceneDirection));
assert.ok(sceneDirections.size >= 20, "Sequential artifacts must receive varied scene directions");
assert.ok(batch.every(artifact => artifact.prompt.includes(artifact.sceneDirection)));
assert.ok(batch.every(artifact => !/from behind|behind the subject|rear three-quarter|back-facing|over-the-shoulder|show the back|face not required to be visible/i.test(artifact.sceneDirection)), "Scene directions must preserve a readable face");

console.log(`✓ ${sceneDirections.size} deterministic scene directions distributed across 500 prompt artifacts`);