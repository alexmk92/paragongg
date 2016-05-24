var t = require('../actions/types');
var Helpers    = require('../helpers');

module.exports = {
    fetchComments: function (threadId) {
        const request = Helpers.ajax({
            type: "GET",
            url: `/api/v1/comments/thread/${threadId}`,
            contentType: "application/json",
            cache: true
        });

        console.log("Request: ", request);

        return {
            type: t.FETCH_COMMENTS,
            payload: request
        }

    },
    postComment: function (comment, callback) {
        Helpers.ajax({
            type: "POST",
            url: "/api/v1/comments/store",
            headers: [{"X-CSRF-TOKEN": csrf}],
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            returnType: "json",
            data: [{"body": comment, "thread_id": 1}]
        }, (error, data) => {
            if (error === null && data !== null) {
                callback(null, data);
            } else {
                callback(error, null);
            }
        });
    },

    // Wire this action creator to Redux.  This will update the state through the
    // dispatchProps method in CommentFeed
    // TODO
    upVoteComment: function (comment) {
        // upVoteComment is an ActionCreator, it needs to return an action, an object with a type property
        // the type decribes the action
        console.log(`A comment has been selected for up voting: ${comment.created_at}`);
        return {
            type: t.COMMENT_UP_VOTED,
            payload: comment
        }

    }
}