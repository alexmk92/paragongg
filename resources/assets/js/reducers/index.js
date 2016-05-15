import { combineReducers } from 'redux';

// Import any of our reducers
import CommentReducer from './reducer.comments'

// All of our application state is stored in this rootReducer,
// it combines all of our data into one state catalogue so we can
// access it from our React front end
const rootReducer = combineReducers({
    comments : CommentReducer
});

export default rootReducer;
