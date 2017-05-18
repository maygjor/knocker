export const SelectFriend=(friend)=>{
  console.log("you have selected : ",friend.first);
  return {
    type:"FRIEND SELECTED",
    payload:friend
  }
}
