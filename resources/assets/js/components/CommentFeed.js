var React = require('react');
var ReactDOM = require('react-dom');
var CommentFeed = require('./../containers/CommentFeed.js');
var Provider = require('react-redux').Provider;
var createStore = require("redux").createStore;
var applyMiddleware = require("redux").applyMiddleware;
var ReduxPromise = require('redux-promise');

var reducers = require('../reducers/index');

// Render the component
var element = document.querySelector('#comment-feed');

if(element) {
    console.log(reducers);
    var createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
    console.log("middleware store: ", createStoreWithMiddleware);
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <CommentFeed />
        </Provider>
    ,element);
}