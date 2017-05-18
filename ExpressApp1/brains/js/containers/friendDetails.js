import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
class friendDetails extends Component{
  render(){
    if(!this.props.friend){
      return(<h1>select a fried to start chat..</h1>);
    }
    return(
      <article>
         <img src={this.props.friend.thumbnail} />
         <h2>Name:{this.props.friend.first} {this.props.friend.last}</h2>
         <h3>Age:{this.props.friend.age}</h3>
         <strong>Description:</strong>
         <h4>{this.props.friend.description}</h4>
      </article>
    );
  }
}

function mapStateToProps(state){
  return{
    friend:state.activeFriend
  };
}

export default connect(mapStateToProps)(friendDetails);
