import React from 'react'
import ReactDOM from 'react-dom'
import CommentFeed from './../containers/CommentFeed.js'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxPromise from 'redux-promise'
import reducers from '../reducers'

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