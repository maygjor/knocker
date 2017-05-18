import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import AllReducers from './reducers/allReducers';
const store = createStore(AllReducers);
import App from './components/app';
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('messages')
);
