export const SelectPost = (friend) => {
    console.log("you have selected : ", friend.first ," Post.");
    return {
        type: "POST SELECTED",
        payload: friend
    }
}
