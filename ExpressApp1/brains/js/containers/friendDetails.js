import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
class friendDetails extends Component{
  render(){
    if(!this.props.friend){
      return(<p>Start chating by selecting contact</p>);
    }
    return (
        <article className="rec-margin text-primary">
         <img src="/images/photo.jpg" />
         <p>{this.props.friend.first} {this.props.friend.last}</p>
         <p>Age:{this.props.friend.age}</p>
         <p>Description:</p>
         <p>{this.props.friend.description}</p>
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
