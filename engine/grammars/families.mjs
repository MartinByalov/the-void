// Shared 24×24 structural grammars. Each returns semantic drawing primitives.
const rect=(x,y,w,h,role="body")=>({kind:"rect",x,y,w,h,role});
const px=(x,y,role="detail")=>rect(x,y,1,1,role);
export const GRAMMARS={
 DEVICE:(r,v)=>[rect(3,5,18,13),rect(5,7,13,8,"inset"),rect(7,9,9,4,"screen"),rect(8,19,8,2,"base"),px(19,8,"accent")],
 VESSEL:(r,v)=>[rect(6,5,12,15),rect(8,3,8,3,"rim"),rect(18,8,3,7,"outline"),rect(19,9,2,5,"void"),rect(8,17,8,2,"shade")],
 IMPLEMENT:(r,v)=>[rect(10,3,4,17),rect(7,3,10,4,"head"),rect(9,18,6,3,"grip"),px(11,5,"accent")],
 WEAPON:(r,v)=>[rect(11,2,2,14,"bright"),rect(10,4,1,12,"body"),rect(7,15,10,2,"accent"),rect(10,17,4,5,"grip")],
 SPECIMEN:(r,v)=>[rect(6,7,12,10),rect(8,4,8,5,"body"),rect(5,14,4,5,"shade"),rect(15,14,4,5,"shade"),px(9,6,"bright"),px(14,6,"bright")],
 REMAINS:(r,v)=>[rect(7,5,10,11),rect(5,8,14,6,"body"),rect(8,15,3,5,"shade"),rect(13,15,3,5,"shade"),px(9,9,"void"),px(14,9,"void")],
 PRODUCE:(r,v)=>[rect(6,7,12,12),rect(8,5,8,15,"body"),rect(11,3,2,4,"shade"),rect(13,3,4,2,"accent")],
 VEHICLE:(r,v)=>[rect(3,9,18,8),rect(7,6,9,4,"body"),rect(5,16,4,4,"outline"),rect(15,16,4,4,"outline"),rect(6,17,2,2,"void"),rect(16,17,2,2,"void")],
 APPLIANCE:(r,v)=>[rect(5,5,14,15),rect(7,7,10,8,"inset"),rect(8,8,8,6,"body"),rect(7,19,3,2,"outline"),rect(14,19,3,2,"outline"),px(17,7,"accent")],
 RELIC:(r,v)=>[rect(6,4,12,16),rect(8,6,8,12,"inset"),rect(9,7,6,10,"body"),rect(5,19,14,2,"outline"),px(11,9,"accent")],
 FURNITURE:(r,v)=>[rect(5,8,14,5),rect(6,12,3,9,"shade"),rect(15,12,3,9,"shade"),rect(7,4,10,5,"body")],
 CLOTHING:(r,v)=>[rect(7,5,10,15),rect(4,7,4,8,"shade"),rect(16,7,4,8,"shade"),rect(10,3,4,3,"void")],
 STATIONERY:(r,v)=>[rect(8,3,8,18),rect(10,5,4,14,"bright"),rect(8,18,8,3,"shade")],
 TOY:(r,v)=>[rect(6,7,12,11),rect(8,4,8,5,"body"),rect(7,17,4,4,"shade"),rect(13,17,4,4,"shade"),px(9,8,"accent")],
 INSTRUMENT:(r,v)=>[rect(8,4,8,16),rect(5,7,14,7,"body"),rect(11,2,2,20,"bright"),px(16,9,"accent")],
 FOOD:(r,v)=>[rect(6,8,12,11),rect(8,6,8,14,"body"),rect(8,10,8,2,"accent")],
 ARCHITECTURAL:(r,v)=>[rect(5,3,14,18),rect(7,5,10,16,"inset"),rect(15,12,2,2,"accent")],
 LAB:(r,v)=>[rect(9,4,6,15),rect(7,17,10,4,"base"),rect(10,8,4,9,"bright"),rect(8,3,8,3,"shade")],
 OFFICE:(r,v)=>[rect(5,6,14,14),rect(7,8,10,5,"inset"),rect(8,15,8,3,"bright"),px(17,8,"accent")],
 ODDITY:(r,v)=>[rect(7,5,10,14),rect(5,8,14,8,"body"),rect(9,9,6,6,"inset"),px(12,12,"accent")]

};
