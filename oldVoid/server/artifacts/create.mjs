import {generate} from "../../engine/core.mjs";
import {canonicalRecord,canonicalJSON} from "../../shared/artifact-protocol/canonical.mjs";
import {signRecord} from "../crypto/signing.mjs";
export function createArtifact(seed,provenance,privateKey){
 const artifact=generate(seed), record=canonicalRecord(artifact,provenance), text=canonicalJSON(record);
 return {record,signature:signRecord(text,privateKey),signature_scheme:"Ed25519"};
}
