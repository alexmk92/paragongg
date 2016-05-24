var React = require('react');
var ReactDOM = require('react-dom');
var CommentFeed = require('./../containers/CommentFeed.js');
//var createStore = require('redux'), applyMiddleware } from 'redux'
var Provider = require('react-redux');
var ReduxPromise = require('redux-promise')
require ('redux');
require ('../reducers');

// Render the component
var element = document.querySelector('#comment-feed');

if(element) {
    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <CommentFeed />
        </Provider>
    ,element);
}