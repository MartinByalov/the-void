const R=(x,y,w,h,role="body")=>({kind:"rect",x,y,w,h,role});
const P=(x,y,role="detail")=>R(x,y,1,1,role);

const exact={
 CRT:[R(4,6,15,11),R(6,8,10,6,"screen"),R(18,8,2,2,"accent"),R(9,18,7,2,"base")],
 TELEPHONE:[R(6,8,12,10),R(5,5,14,4,"shade"),R(8,11,8,5,"inset"),R(9,12,2,2,"accent"),R(13,12,2,2,"accent")],
 FLOPPY:[R(5,4,14,16),R(8,4,8,6,"shade"),R(8,13,8,5,"bright"),R(15,5,2,4,"void")],
 RADIO:[R(4,7,16,12),R(6,9,8,7,"inset"),R(15,9,3,3,"accent"),R(17,4,1,4,"outline")],
 CAMERA:[R(5,8,14,10),R(9,6,6,3,"shade"),R(9,10,7,7,"inset"),R(11,12,3,3,"bright")],
 CALCULATOR:[R(6,3,12,18),R(8,5,8,4,"screen"),R(8,11,2,2,"accent"),R(11,11,2,2,"bright"),R(14,11,2,2,"accent"),R(8,15,2,2,"bright"),R(11,15,2,2,"accent"),R(14,15,2,2,"bright")],
 CLOCK:[R(6,5,12,14),R(8,7,8,9,"inset"),R(11,9,2,5,"bright"),R(12,12,3,2,"accent"),R(9,19,6,2,"base")],
 KEY:[R(4,8,8,8),R(6,10,4,4,"void"),R(11,11,10,3,"body"),R(17,14,2,3,"body"),R(20,14,1,2,"body")],
 HAMMER:[R(5,4,14,5),R(10,8,4,13,"grip"),R(11,10,2,9,"shade")],
 SCISSORS:[R(6,4,3,12),R(15,4,3,12),R(8,12,8,3,"bright"),R(5,15,5,5,"outline"),R(14,15,5,5,"outline"),R(6,16,3,3,"void"),R(15,16,3,3,"void")],
 SWORD:[R(11,2,2,14,"bright"),R(10,4,1,12),R(7,15,10,2,"accent"),R(10,17,4,5,"grip")],
 AXE:[R(10,3,4,18,"grip"),R(5,4,9,7,"body"),R(4,6,3,3,"bright")],
 FROG:[R(7,6,10,9),R(5,8,14,5),R(6,14,5,5,"shade"),R(13,14,5,5,"shade"),P(9,7,"bright"),P(14,7,"bright")],
 FISH:[R(5,9,12,7),R(16,7,5,11,"shade"),R(4,11,3,3,"bright"),P(8,10,"void")],
 SNAIL:[R(8,8,10,10),R(4,14,14,5,"body"),R(10,10,5,5,"inset"),P(5,12,"bright"),P(7,11,"bright")],
 SKULL:[R(7,5,10,10),R(5,8,14,5),R(8,14,3,6,"shade"),R(13,14,3,6,"shade"),R(8,9,3,3,"void"),R(13,9,3,3,"void")],
 BONE:[R(10,5,4,14),R(7,3,4,5),R(13,3,4,5),R(7,17,4,4),R(13,17,4,4)],
 APPLE:[R(6,8,12,11),R(8,6,8,14),R(11,3,2,4,"shade"),R(13,4,4,2,"accent")],
 BANANA:[R(6,5,4,13),R(8,14,9,5),R(15,11,4,7),R(7,6,2,4,"bright")],
 MUSHROOM:[R(5,6,14,7),R(8,4,8,3,"body"),R(10,12,5,9,"shade"),R(11,13,3,7,"bright")],
 CAR:[R(4,10,16,7),R(8,7,8,4),R(6,16,4,4,"outline"),R(15,16,4,4,"outline"),R(7,17,2,2,"void"),R(16,17,2,2,"void")],
 BICYCLE:[R(4,14,6,6,"outline"),R(15,14,6,6,"outline"),R(6,16,2,2,"void"),R(17,16,2,2,"void"),R(8,12,9,2,"body"),R(11,9,2,6,"bright")],
 BOAT:[R(4,13,16,6),R(7,11,10,3,"body"),R(11,4,2,9,"outline"),R(12,5,6,6,"bright")],
 TOASTER:[R(5,7,14,12),R(7,5,10,4,"shade"),R(8,6,3,1,"void"),R(13,6,3,1,"void"),R(19,10,2,5,"accent"),R(7,19,3,2,"outline"),R(14,19,3,2,"outline")],
 FAN:[R(9,4,6,6,"body"),R(5,8,14,5,"shade"),R(9,12,6,6,"body"),R(11,17,2,4,"outline"),R(7,20,10,2,"base")],
 LAMP:[R(8,4,8,7,"bright"),R(6,9,12,3,"body"),R(11,11,2,8,"shade"),R(7,19,10,2,"base")],
 BOOK:[R(5,5,14,15),R(7,7,5,11,"inset"),R(12,7,5,11,"bright"),R(11,5,2,15,"outline")],
 CANDLE:[R(10,7,4,13,"bright"),R(9,19,6,2,"base"),R(11,3,2,4,"accent"),P(12,2,"bright")],
 BELL:[R(7,6,10,11),R(5,14,14,4,"body"),R(10,18,4,3,"accent"),R(10,4,4,3,"shade")],
 MASK:[R(6,5,12,15),R(8,9,3,3,"void"),R(13,9,3,3,"void"),R(10,15,4,2,"accent")]
};

export function morphology(object, fallback){
 if(exact[object]) return exact[object];
 // Generic semantic modifier makes members of the same family differ deterministically.
 const v=fallback.variant||0, out=[...fallback.primitives];
 if(v%3===0) out.push(R(4+(v%5),3,2,3,"accent"));
 if(v%3===1) out.push(R(17,7+(v%6),2,4,"bright"));
 if(v%3===2) out.push(R(7+(v%7),18,4,2,"shade"));
 if(v%2===0) out.push(P(8+(v%9),8+(v%5),"accent"));
 return out;
}
export const MORPHOLOGY_COUNT=Object.keys(exact).length;
