import React from 'react';
import FriendsList from '../containers/list';
import FriendDetails from '../containers/friendDetails'
require('../../scss/style.scss');
let App =()=>(
<div>
     <h2>Friend Name</h2>
     <FriendsList />
     <hr/>
     <h2>User Details</h2>
     <FriendDetails />
</div>);
export default App;
