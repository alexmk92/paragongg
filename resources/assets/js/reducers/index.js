var Redux = require('redux');

// Import any of our reducers
var CommentReducer = require('./reducer.comments');

// All of our application state is stored in this rootReducer,
// it combines all of our data into one state catalogue so we can
// access it from our React front end
var rootReducer = Redux.combineReducers({
    comments : CommentReducer
});

module.exports = rootReducer;
