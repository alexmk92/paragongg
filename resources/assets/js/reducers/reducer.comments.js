/* A Reducer returns a piece of the applications state */
var t = require('../actions/types');

// State is not the application state, only the state this reducer is responsible for
module.exports = function(state, action) {
    if(typeof state !== "undefined") {
        console.log("ACTION: ", action);
        //console.log("SET THE NEW STATE: ", state);
        switch(action.type) {
            //
            case t.COMMENT_UP_VOTED :
                var newComments = state.comments;
                var lastUpvotedComment = action.payload;
                var commentIndex = newComments.indexOf(lastUpvotedComment);
                if(commentIndex > -1) {
                    lastUpvotedComment.votes += 1;
                    newComments[commentIndex] = lastUpvotedComment;
                    return { comments : newComments, lastUpvotedComment : lastUpvotedComment }
                }
            case t.FETCH_COMMENTS :
                return { comments : action.payload.data, lastUpvotedComment: state.lastUpvotedComment };
            default :
                return state;
        }
    }

    return {
        comments: [],
        lastUpvotedComment: null
    };
};