const COLORS={
 ARCHIVE_BEIGE:["#171615","#625a4d","#a89b80","#ded1ad","#8d5d3c"], TERMINAL_GREEN:["#07110b","#183c27","#3d7950","#91c78b","#d5c56a"],
 IRON:["#111418","#394149","#77818a","#c0c7cb","#8a6139"], MARSH_GREEN:["#0c130c","#30452b","#657a42","#a1aa68","#d4bd68"],
 BONE:["#171511","#5d584a","#aaa28b","#e1dac0","#805c3d"], INDUSTRIAL_GREY:["#101214","#363c40","#737b7d","#bec2bc","#c88c42"],
 COBALT:["#0b1019","#18365d","#32659a","#82a9c8","#d4aa5b"], OBSIDIAN:["#09090c","#25232e","#4c465a","#8a8197","#b87554"]
};
export function paletteColors(name){return COLORS[name]||COLORS.ARCHIVE_BEIGE}
export function render24(primitives,palette){
 const c=paletteColors(palette), map={outline:c[0],void:c[0],shade:c[1],body:c[2],inset:c[1],bright:c[3],accent:c[4],detail:c[4]};
 const pixels=Array.from({length:24},()=>Array(24).fill(null));
 for(const p of primitives) for(let y=p.y;y<p.y+p.h;y++)for(let x=p.x;x<p.x+p.w;x++)if(x>=0&&x<24&&y>=0&&y<24)pixels[y][x]=map[p.role]||c[2];
 return pixels;
}
export function ascii(pixels){return pixels.map(row=>row.map(x=>x?"██":"  ").join("")).join("\n")}
