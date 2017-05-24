export const Blur = (friend) => {
    console.log("you have dismiss : ", friend.first);
    friend = null;
    return {
        type: "FRIEND DISMISSED",
        payload: friend
    }
}
