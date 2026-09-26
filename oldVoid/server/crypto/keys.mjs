import fs from "node:fs";import path from "node:path";import crypto from "node:crypto";
const dir=path.resolve("data");fs.mkdirSync(dir,{recursive:true});const priv=path.join(dir,"void-private.pem"),pub=path.join(dir,"void-public.pem");
export function keys(){if(!fs.existsSync(priv)){const k=crypto.generateKeyPairSync("ed25519");fs.writeFileSync(priv,k.privateKey.export({type:"pkcs8",format:"pem"}),{mode:0o600});fs.writeFileSync(pub,k.publicKey.export({type:"spki",format:"pem"}))}
 return {privateKey:crypto.createPrivateKey(fs.readFileSync(priv)),publicKey:crypto.createPublicKey(fs.readFileSync(pub))}}
export function publicPEM(){keys();return fs.readFileSync(pub,"utf8")}
