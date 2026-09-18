const noun=o=>o.replaceAll("_"," ");
export function identity(object,anomaly){
 const base=anomaly.adjective;
 const aliases={ONLY_UNOBSERVED:"UNOBSERVED",EMPTY_SIGNAL:"LISTENING",RETURNS_YESTERDAY:"BELATED",WRONG_ROOM:"MISPLACED",REFUSES_PURPOSE:"UNWILLING"};
 return `THE ${aliases[anomaly.id]||base} ${noun(object)}`;
}
