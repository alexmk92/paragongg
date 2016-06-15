var React = require('react');
var ReactDOM = require('react-dom');
var CommentFeed = require('./CommentFeed');
var Provider = require('react-redux').Provider;
var createStore = require("redux").createStore;
var applyMiddleware = require("redux").applyMiddleware;
var ReduxPromise = require('redux-promise');

var reducers = require('../../reducers/index');

// Render the component
var element = document.querySelector('#comment-feed');

if(element) {
    var createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <CommentFeed />
        </Provider>
    ,element);
}