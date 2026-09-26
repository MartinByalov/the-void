import zlib from "node:zlib";
const crcTable=(()=>{let t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc=b=>{let c=0xffffffff;for(const x of b)c=crcTable[(c^x)&255]^(c>>>8);return (c^0xffffffff)>>>0};
const chunk=(type,data)=>{let t=Buffer.from(type),len=Buffer.alloc(4),cr=Buffer.alloc(4);len.writeUInt32BE(data.length);cr.writeUInt32BE(crc(Buffer.concat([t,data])));return Buffer.concat([len,t,data,cr])};
const hex=s=>{let s2=s?.startsWith("#")?s.slice(1):"777777";return [parseInt(s2.slice(0,2),16),parseInt(s2.slice(2,4),16),parseInt(s2.slice(4,6),16)]};
const glyphs={" ":[0,0,0,0,0,0,0],A:[14,17,17,31,17,17,17],B:[30,17,17,30,17,17,30],C:[15,16,16,16,16,16,15],D:[30,17,17,17,17,17,30],E:[31,16,16,30,16,16,31],F:[31,16,16,30,16,16,16],G:[15,16,16,23,17,17,15],H:[17,17,17,31,17,17,17],I:[31,4,4,4,4,4,31],J:[7,2,2,2,2,18,12],K:[17,18,20,24,20,18,17],L:[16,16,16,16,16,16,31],M:[17,27,21,21,17,17,17],N:[17,25,21,19,17,17,17],O:[14,17,17,17,17,17,14],P:[30,17,17,30,16,16,16],Q:[14,17,17,17,21,18,13],R:[30,17,17,30,20,18,17],S:[15,16,16,14,1,1,30],T:[31,4,4,4,4,4,4],U:[17,17,17,17,17,17,14],V:[17,17,17,17,17,10,4],W:[17,17,17,21,21,21,10],X:[17,17,10,4,10,17,17],Y:[17,17,10,4,4,4,4],Z:[31,1,2,4,8,16,31],"0":[14,17,19,21,25,17,14],"1":[4,12,4,4,4,4,14],"2":[14,17,1,2,4,8,31],"3":[30,1,1,14,1,1,30],"4":[2,6,10,18,31,2,2],"5":[31,16,16,30,1,1,30],"6":[14,16,16,30,17,17,14],"7":[31,1,2,4,8,8,8],"8":[14,17,17,14,17,17,14],"9":[14,17,17,15,1,1,14],":":[0,4,0,0,4,0,0],"-":[0,0,0,31,0,0,0],".":[0,0,0,0,0,4,0],"/":[1,2,4,8,16,0,0]};
function paintText(pixels,text,x,y,scale,color){for(const ch of String(text).toUpperCase()){const glyph=glyphs[ch]||glyphs[" "];for(let gy=0;gy<7;gy++)for(let gx=0;gx<5;gx++)if((glyph[gy]>>(4-gx))&1)for(let sy=0;sy<scale;sy++)for(let sx=0;sx<scale;sx++){const px=x+gx*scale+sx,py=y+gy*scale+sy;if(px>=0&&py>=0&&px<pixels.w&&py<pixels.h)pixels.data[py*pixels.w+px]=color}x+=6*scale}}
export function artifactPNG(record,signature){
 const w=720,h=980,bg=[5,11,20,255],pixels={w,h,data:Array.from({length:w*h},()=>bg)},line=[24,49,75,255],ink=[216,228,246,255],muted=[129,148,174,255],accent=[139,92,255,255];
 const rect=(x,y,rw,rh,c)=>{for(let py=Math.max(0,y);py<Math.min(h,y+rh);py++)for(let px=Math.max(0,x);px<Math.min(w,x+rw);px++)pixels.data[py*w+px]=c};
 rect(0,0,w,h,[5,11,20,255]);rect(24,24,w-48,h-48,line);rect(38,38,w-76,100,[8,19,33,255]);
 paintText(pixels,"THE VOID",62,66,5,ink);paintText(pixels,record.rarity||"UNKNOWN",62,112,3,accent);paintText(pixels,"ARTIFACT",62,144,3,muted);
 rect(78,190,564,564,[7,17,29,255]);
 const scale=20;for(let y=0;y<24;y++)for(let x=0;x<24;x++){const c=record.pixels[y][x],rgb=c?hex(c):[5,6,8];rect(120+x*scale,218+y*scale,scale,scale,[...rgb,255])}
 paintText(pixels,String(record.name||"UNKNOWN").slice(0,24),62,798,4,ink);paintText(pixels,"RARITY "+(record.rarity||"UNKNOWN"),62,846,3,muted);paintText(pixels,"WEIRDNESS "+(record.weirdness??"--"),62,882,3,muted);paintText(pixels,"CLASS "+(record.classification||"UNKNOWN"),62,918,3,muted);
 const raw=[];for(let y=0;y<h;y++){raw.push(0);for(let x=0;x<w;x++)raw.push(...pixels.data[y*w+x])}
 const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=6;
 const payload=JSON.stringify({record,signature,signature_scheme:"Ed25519"});
 const txt=Buffer.from("VOID_ARTIFACT\0"+payload,"utf8");
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk("IHDR",ih),chunk("tEXt",txt),chunk("IDAT",zlib.deflateSync(Buffer.from(raw))),chunk("IEND",Buffer.alloc(0))]);
}
