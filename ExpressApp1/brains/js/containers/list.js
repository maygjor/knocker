import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { SelectFriend } from '../actions/selectFriend';
import { Blur } from '../actions/blur';
import { SelectPost } from '../actions/selectPost';
class friendsList extends Component{
  createListItems(){
      return this.props.friends.map((friend) => {

       return (

           <li className="" key={friend.id}>
               <a href="#" 
                   onClick={() => { this.props.SelectPost(friend); }}
                   onMouseEnter={() => { this.props.SelectFriend(friend); }}
                   onMouseLeave={() => { this.props.Blur(friend); }}
                   onBlur={() => { this.props.Blur(friend); }}
                     >
                   <div draggable="true" className="">
                       <img className="movie icon" src="/images/photo.jpg"></img>
                       <p  className="">{friend.first} {friend.last} </p>
                   </div>
               </a>
           </li>


           /*
          <li className="flex-item"
              key={friend.id}
            onClick={()=>{this.props.SelectFriend(friend);}}
        >
        {friend.first} {friend.last}</li>

           */



      );
   }
  );}











  render() {
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
        SelectFriend: SelectFriend,
        Blur: Blur,
        SelectPost:SelectPost}, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(friendsList);
