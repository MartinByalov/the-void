const COLORS={
 ARCHIVE_BEIGE:["#171615","#625a4d","#a89b80","#ded1ad","#8d5d3c"], TERMINAL_GREEN:["#07110b","#183c27","#3d7950","#91c78b","#d5c56a"],
 IRON:["#111418","#394149","#77818a","#c0c7cb","#8a6139"], MARSH_GREEN:["#0c130c","#30452b","#657a42","#a1aa68","#d4bd68"],
 BONE:["#171511","#5d584a","#aaa28b","#e1dac0","#805c3d"], INDUSTRIAL_GREY:["#101214","#363c40","#737b7d","#bec2bc","#c88c42"],
 COBALT:["#0b1019","#18365d","#32659a","#82a9c8","#d4aa5b"], OBSIDIAN:["#09090c","#25232e","#4c465a","#8a8197","#b87554"],
 PHOSPHOR_AMBER:["#191305","#5b4210","#aa7b20","#f1ca5a","#fff2aa"], DEAD_BLUE:["#0b1015","#233746","#456a7d","#86adbd","#c5dfd7"], STATIC_GREY:["#101114","#41444a","#858990","#c4c8cc","#e0b45b"], EMERGENCY_RED:["#1a080b","#5c1720","#a8343d","#ed7270","#ffd29a"], NIGHT_VIOLET:["#100b19","#31234d","#62438d","#aa87d8","#e0b6ff"],
 OXIDIZED_BRONZE:["#151512","#4f4d32","#817a48","#b9ab65","#78a898"], DUST_GREY:["#151619","#46474b","#797b80","#b9bbc0","#c19768"], CEREMONIAL_RED:["#1b090b","#5d1d1b","#963a2e","#d87a54","#e6c66e"], BONE_IVORY:["#181611","#5c5848","#a69d80","#ddd4b9","#a6734d"], MUSEUM_GREEN:["#0c1715","#284940","#4d7965","#91b49a","#d2bb69"],
 TOXIC_LIME:["#0b1308","#29491c","#5c8f31","#b3df56","#efff9a"], MUD_BROWN:["#17110d","#4b3324","#80563a","#b88b60","#d7c679"], COLD_BLUE:["#09131a","#214457","#417b95","#8fc0d2","#d4edda"], PALE_FLESH:["#1b1212","#5d4140","#a87770","#d9aea0","#f3d783"], MOSS:["#0d140b","#31452a","#5e7540","#9cab62","#d9ca71"],
 ENAMEL_CREAM:["#161511","#545044","#99917d","#ddd4ba","#b95d4b"], BOTTLE_GREEN:["#091612","#1e4b3b","#397b61","#75b796","#d7cb75"], CLAY_RED:["#1c100c","#603021","#9b5438","#d28a61","#e6c675"], SMOKE:["#111215","#3c4148","#6c737c","#b6bdc3","#8ca4ba"], MILK_GLASS:["#10171a","#385158","#719299","#bcd9d3","#f1e4aa"],
 BRASS:["#191407","#59451a","#97752b","#d5b95c","#f7e59a"], RUST:["#1b0f0a","#66321d","#9d512c","#c97b45","#e0b46a"], WORKSHOP_BLUE:["#09121c","#203f5a","#3d7198","#78b0cb","#f0c66c"], BLACKENED_STEEL:["#0b0d10","#2d343b","#59636c","#99a4a8","#c48c58"], SAFETY_YELLOW:["#181504","#5d4e0b","#a88a17","#e5ca42","#fff1a0"],
 BLOOD_RED:["#190708","#5a161c","#942d36","#d55c5d","#efb06d"], CEREMONIAL_GOLD:["#181204","#584114","#967125","#d4af4e","#fff0a5"], FROST:["#0a1118","#254455","#528198","#9bc9d8","#e7fbff"],
 ASH:["#121213","#444347","#77757a","#b7b4b8","#d4a46a"], FOSSIL_BROWN:["#17130f","#51412c","#816646","#b69a70","#d6c77d"], CHALK:["#171716","#53524e","#929087","#d5d2c5","#b7a46a"], PEAT:["#15100c","#4d3523","#765039","#a77b55","#c8b66f"], OLD_IVORY:["#181611","#5c5748","#a99f81","#ded4b7","#b48858"],
 CONTROL_GREEN:["#08150e","#1d4b31","#3a8050","#7fc98a","#d8ed93"], WARNING_ORANGE:["#1a0e05","#643114","#a9571b","#e4943f","#ffe08a"], BEIGE:["#171511","#514b3f","#8b806b","#c7bda2","#c38a58"], BLACK:["#08090a","#24272b","#4c5258","#899198","#c5a46a"], LAB_BLUE:["#07121c","#1a3b59","#32678e","#78b4d1","#d4e8a0"]
};
export function paletteColors(name){return COLORS[name]||COLORS.ARCHIVE_BEIGE}
export function render24(primitives,palette){
 const c=paletteColors(palette), map={outline:c[0],void:c[0],shade:c[1],body:c[2],inset:c[1],bright:c[3],accent:c[4],detail:c[4]};
 const pixels=Array.from({length:24},()=>Array(24).fill(null));
 for(const p of primitives) for(let y=p.y;y<p.y+p.h;y++)for(let x=p.x;x<p.x+p.w;x++)if(x>=0&&x<24&&y>=0&&y<24)pixels[y][x]=map[p.role]||c[2];
 return pixels;
}
export function ascii(pixels){return pixels.map(row=>row.map(x=>x?"██":"  ").join("")).join("\n")}
