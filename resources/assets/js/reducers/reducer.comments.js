/* A Reducer returns a piece of the applications state */
var t = require('../actions/types');

// State is not the application state, only the state this reducer is responsible for
module.exports = function(state, action) {
    switch(action.type) {
        case t.COMMENT_UP_VOTED :
            return action.payload;
        case t.FETCH_COMMENTS :
            return state.concat(action.payload.data);
            //return [ action.payload.data, ...state ];  // ES6 flat array (concat)
    }
    return [];
};