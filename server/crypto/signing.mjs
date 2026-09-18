import crypto from "node:crypto";
export function createKeys(){return crypto.generateKeyPairSync("ed25519")}
export function signRecord(text,privateKey){return crypto.sign(null,Buffer.from(text),privateKey).toString("base64")}
export function verifyRecord(text,signature,publicKey){return crypto.verify(null,Buffer.from(text),publicKey,Buffer.from(signature,"base64"))}
export function publicKeyPEM(key){return key.export({type:"spki",format:"pem"})}
