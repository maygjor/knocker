import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SelectFriend} from '../actions/selectFriend';
class friendsList extends Component{
  createListItems(){
   return this.props.friends.map((friend) =>{
      return(
        <li key={friend.id}
            onClick={()=>{this.props.SelectFriend(friend);}}
        >
        {friend.first} {friend.last}</li>
      );}
  );}

  render(){
    return(
      <ul>
        {this.createListItems()}
      </ul>

    );
  }
}

function mapStateToProps(state) {
    return {
        friends: state.friends
    };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    SelectFriend:SelectFriend},dispatch)}

export default connect(mapStateToProps,matchDispatchToProps)(friendsList);
