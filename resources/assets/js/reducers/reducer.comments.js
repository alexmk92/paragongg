/* A Reducer returns a piece of the applications state */
var t = require('../actions/types');
var update = require('react-addons-update');

// State is not the application state, only the state this reducer is responsible for
module.exports = function(state, action) {
    if(typeof state !== "undefined") {
        switch(action.type) {
            case t.COMMENT_UP_VOTED :
                var lastUpvotedComment = null;
                var newComments = state.comments.map(function(comment) {
                    if(comment.id === action.payload.data.node_id) {
                        comment.voted = action.payload.data.voted;
                        comment.votes = action.payload.data.value;
                        lastUpvotedComment = comment;
                    }
                    return comment;
                });
                return { comments : newComments, lastUpvotedComment : lastUpvotedComment };
            case t.FETCH_COMMENTS :
                return { comments : action.payload.data, lastUpvotedComment: state.lastUpvotedComment };
            case t.COMMENT_REPORTED :
                var newComments = state.comments.map(function(comment) {
                    if(parseInt(comment.id) === parseInt(action.payload.data.ref_id)) {
                        comment.reported = true;
                    }
                    return comment;
                });
                return { comments : newComments };
            case t.DELETE_COMMENT:
                var newComments = state.comments.map(function(comment) {
                    if((parseInt(comment.id) === parseInt(action.payload.data.comment.id))) {
                        comment.body = "The author deleted this comment...";
                        comment.status = "deleted";
                    }
                    return comment;
                });
                return { comments : newComments };
            case t.POSTED_COMMENT :
                // Add our comment to the very start of the array by pushing the original state
                // onto it using reacts immutable update function.
                var newComments = update([action.payload.data.comment], { $push : state.comments });
                return { comments : newComments, lastUpvotedComment: state.lastUpvotedComment };
            default :
                return state;
        }
    }

    return {
        comments: [],
        lastUpvotedComment: null
    };
};