var React = require('react');
var ReactDOM = require('react-dom');
var CommentFeed = require('./../containers/CommentFeed.js');
//var createStore = require('redux'), applyMiddleware } from 'redux'
var Provider = require('react-redux');
var ReduxPromise = require('redux-promise')
var Redux = require ('redux');
var Reducer = require('../reducers/index');

// Render the component
var element = document.querySelector('#comment-feed');

if(element) {
    console.log(Reducer);
    var createStoreWithMiddleware = Redux.applyMiddleware(ReduxPromise)(Redux.createStore);
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(Reducer)}>
            <CommentFeed />
        </Provider>
    ,element);
}