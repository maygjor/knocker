import {combineReducers} from 'redux';
import FriendsReducer from './friendsReducer';
import ActiveFriendReducer from './activeFriendReducer';
import ActivePostReducer from './activePostReducer';
import JobsReducer from './jobsReducer';
const allReducers=combineReducers({
friends:FriendsReducer,
activeFriend: ActiveFriendReducer,
activePost: ActivePostReducer,
jobs: JobsReducer
});
export default allReducers;
