import assert from "node:assert/strict";import {generateAccepted,evaluateArtifact} from "../server/quality/gate.mjs";
let recent=[];for(let s=1;s<=2000;s++){let {artifact,quality}=generateAccepted(s,recent.slice(0,30));assert.ok(quality.accepted);recent.unshift(artifact)}console.log("✓ 2,000 artifacts passed the quality gate");
