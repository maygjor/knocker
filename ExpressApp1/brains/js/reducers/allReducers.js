import {combineReducers} from 'redux';
import FriendsReducer from './friendsReducer';
import ActiveFriendReducer from './activeFriendReducer';
const allReducers=combineReducers({
friends:FriendsReducer,
activeFriend:ActiveFriendReducer
});
export default allReducers;
