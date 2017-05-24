import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SelectFriend } from '../actions/selectFriend';
import { Blur } from '../actions/blur';
import { SelectPost } from '../actions/selectPost';
class jobsList extends Component {
    createListItems() {
        return this.props.jobs.map((job) => {

            return (

                <li className="" key={job.id}>
                    <a href="#"
                        onClick={() => { this.props.SelectPost(job); }}
                        onMouseEnter={() => { this.props.SelectFriend(job); }}
                        onMouseLeave={() => { this.props.Blur(job); }}
                        onBlur={() => { this.props.Blur(job); }}
                    >
                        <div draggable="true" className="">
                            <img className="movie icon" src="/images/photo.jpg"></img>
                            <p className="">{job.company} /{job.title} </p>
                            <p>{job.description}</p>
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
        );
    }











    render() {
        return (
            <ul>
                {this.createListItems()}
            </ul>

        );
    }
}

function mapStateToProps(state) {
    return {
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        SelectFriend: SelectFriend,
        Blur: Blur,
        SelectPost: SelectPost
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(jobsList);
