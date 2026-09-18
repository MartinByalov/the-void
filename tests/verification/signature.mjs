import assert from "node:assert/strict";import {createKeys,signRecord,verifyRecord} from "../../server/crypto/signing.mjs";
const {privateKey,publicKey}=createKeys(),s='{"artifact":"VOID"}',sig=signRecord(s,privateKey);
assert.equal(verifyRecord(s,sig,publicKey),true);assert.equal(verifyRecord(s+"x",sig,publicKey),false);console.log("✓ Ed25519 signing / tamper rejection");
