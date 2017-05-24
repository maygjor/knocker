import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class friendPost extends Component {
    render() {
        if (!this.props.friend) {
            return (<div><h1 className="text-center text-md">To many applications?</h1><h2 className="text-center">Swap them faster!</h2><div className="pagedemopostlayout ver2 "><div className="groupdemopost line1"> <div className="textlinedemo"></div><div className="textlinedemo"></div><div className="pictdemo"></div><div className="textlinedemo"></div><div className="textlinedemo"></div><div className="textlinedemo"></div></div><div className="groupdemopost line2"><div className="finger"></div><div className="pictdemo"></div><div className="textlinedemo"></div><div className="textlinedemo"></div><div className="textlinedemo"></div><div className="textlinedemo"></div></div></div></div> );
        }
            return (
                <article className="text over bg-secondary pfl-wrapper">
                    <img className="profile-photo" src="/images/photo.jpg"></img>
                    <div className="profile-info">
                        <h1>{this.props.friend.first} {this.props.friend.last}</h1>
                        <p>{this.props.friend.major} <a href={this.props.friend.facebook} target="_blank">@Facebook</a>.{this.props.friend.summary} <a href={this.props.friend.github} target="_blank">@GetHub</a>.</p>
                        <p>Age:{this.props.friend.age}</p>
                        <p>Description:</p>
                        <p>{this.props.friend.description}</p>
                    </div>
                    <section className="form-control"></section>
                    
                </article>
            );
    }
}

function mapStateToProps(state) {
    return {
        friend: state.activePost
    };
}

export default connect(mapStateToProps)(friendPost);
