var t = require('../actions/types');
var Helpers = require('../helpers');

var ROOT_URL = '/api/v1/comments';

module.exports = {
    fetchComments: function (threadId, skip) {
        var request = Helpers.ajax({
            type: "GET",
            url: ROOT_URL + "/thread/" + threadId + "/fetch/" + skip,
            contentType: "application/json",
            cache: true
        });

        return {
            type: t.FETCH_COMMENTS,
            payload: request
        }

    },
    // Wire this action creator to Redux.  This will update the state through the
    // dispatchProps method in CommentFeed
    // TODO
    upVoteComment: function (comment) {
        // upVoteComment is an ActionCreator, it needs to return an action, an object with a type property
        // the type decribes the action
        Helpers.ajax({
            type : "POST",
            url : ROOT_URL + "/upvote/" + comment.id,
            headers : [{ "X-CSRF-TOKEN" : csrf }],
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            returnType: "json",
            data: [{"user_id": 1}]
        });

        return {
            type: t.COMMENT_UP_VOTED,
            payload: comment
        }
    },
    postComment: function (comment, threadId, parentCommentId) {
        // This method now returns a promise for us to consume
        var request = Helpers.ajax({
            type: "POST",
            url: "/api/v1/comments/store",
            headers: [{"X-CSRF-TOKEN": csrf}],
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            returnType: "json",
            data: [{"body": comment, "thread_id": threadId, "parent_comment_id" : parentCommentId}]
        });

        return {
            type: t.POSTED_COMMENT,
            payload: request
        }
    }
}