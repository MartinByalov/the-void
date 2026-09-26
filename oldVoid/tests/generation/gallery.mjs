import {generate} from "../../engine/core.mjs";import {ascii} from "../../engine/renderer/pixels.mjs";
for(const seed of [7,42,99,313,777]){const a=generate(seed);console.log("\n"+a.name+" // "+a.rarity+" "+a.classification+" // W"+a.weirdness+" // "+a.palette);console.log(ascii(a.pixels))}
