/* A Reducer returns a piece of the applications state */
var t = require('../actions/types');

// State is not the application state, only the state this reducer is responsible for
module.exports = function(state, action) {
    console.log("Action received: ", action);
    console.log("I AM THE COMMENT REDUCER");
    switch(action.type) {
        case t.COMMENT_UP_VOTED :
            return action.payload;
        case t.FETCH_COMMENTS :
            return state.concat(action.payload.data);
            //return [ action.payload.data, ...state ];  // ES6 flat array (concat)
    }
    return [];
};