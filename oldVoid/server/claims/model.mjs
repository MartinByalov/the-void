export function claimWeight(activeMinutes,{continuous=true}={}){
 const baseline=1.65, scale=16, cap=95, m=Math.min(Math.max(activeMinutes,0),cap);
 return baseline+1.18*Math.log1p(m/scale)+(continuous?0.18:0);
}
export function selectClaim(claims,random=Math.random){
 const eligible=claims.filter(x=>x.active);
 if(!eligible.length) return null;
 const weighted=eligible.map(x=>({...x,w:claimWeight(x.minutes,{continuous:x.continuous})}));
 let roll=random()*weighted.reduce((s,x)=>s+x.w,0);
 for(const x of weighted){roll-=x.w;if(roll<=0)return x}
 return weighted.at(-1);
}
