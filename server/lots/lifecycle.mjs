export const STATES=["CREATED","OPEN","ACTIVE","UNSTABLE","CLOSING","REVEAL","ARCHIVED"];
export function transition(lot,next){
 const a=STATES.indexOf(lot.state),b=STATES.indexOf(next);
 if(b!==a+1) throw new Error(`Invalid Lot transition ${lot.state} → ${next}`);
 return {...lot,state:next};
}
