import os from "node:os";
const port=Number(process.env.PORT||3000);
console.log("\nTHE VOID — multi-device local test");
console.log(`This computer: http://localhost:${port}`);
for(const nets of Object.values(os.networkInterfaces()))for(const n of nets||[])if(n.family==="IPv4"&&!n.internal)console.log(`Same Wi-Fi/LAN: http://${n.address}:${port}`);
console.log("\nKeep this terminal open while testing.\n");
await import("./http/app.mjs");
