/* A Reducer returns a piece of the applications state */
import t from '../actions/types'

// State is not the application state, only the state this reducer is responsible for
export default function(state = [], action) {
    console.log("Action received: ", action);
    switch(action.type) {
        case t.COMMENT_UP_VOTED :
            return action.payload;
        case t.FETCH_COMMENTS :
            return state.concat(action.payload.data);
            //return [ action.payload.data, ...state ];  // ES6 flat array (concat)
    }

    return [];
}