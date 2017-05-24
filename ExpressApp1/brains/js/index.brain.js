require('babel-polyfill');
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import AllReducers from './reducers/allReducers';
const store = createStore(AllReducers);
import Friend from './components/app';
import FriendList from './components/friendsAside';
import FriendPost from './components/postSection';
import JobsList from './components/jobsAside'
import JobsSection from './components/jobsSection';
ReactDOM.render(
    <Provider store={store}>
        <Friend />
    </Provider>
    , document.getElementById('messages')
);
ReactDOM.render(
    <Provider store={store}>
        <FriendList className=""></FriendList >
    </Provider>
    , document.getElementById('contacts')
);
ReactDOM.render(
    <Provider store={store}>
        <FriendPost className=""></FriendPost >
    </Provider>
    , document.getElementById('post')
);
ReactDOM.render(
    <Provider store={store}>
        <JobsSection className=""></JobsSection >
    </Provider>
    , document.getElementById('post')
);
ReactDOM.render(
    <Provider store={store}>
        <JobsList className=""></JobsList >
    </Provider>
    , document.getElementById('jumbotron')
);
ReactDOM.render(
    <Provider store={store}>
        <JobsSection className=""></JobsSection >
    </Provider>
    , document.getElementById('post')
);