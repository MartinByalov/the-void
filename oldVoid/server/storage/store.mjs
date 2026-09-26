import fs from "node:fs";import path from "node:path";
const dir=path.resolve("data"); fs.mkdirSync(dir,{recursive:true});
const file=n=>path.join(dir,n+".json");
export function read(n,fallback){try{return JSON.parse(fs.readFileSync(file(n),"utf8"))}catch{return fallback}}
export function write(n,v){const f=file(n),t=f+".tmp";fs.writeFileSync(t,JSON.stringify(v,null,2));fs.renameSync(t,f);return v}
export function update(n,fallback,fn){const v=fn(read(n,fallback));return write(n,v)}
