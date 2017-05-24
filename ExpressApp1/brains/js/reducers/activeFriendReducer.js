export default function(state=null,action){
switch(action.type){
  case "FRIEND SELECTED":
     return action.payload;
     break;
  case "FRIEND DISMISSED":
      return action.payload;
      break;
}
return state;
}
