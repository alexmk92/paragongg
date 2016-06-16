var t = require('../actions/types');
var Helpers = require('../helpers');

var ROOT_URL = '/api/v1/comments';

module.exports = {
    fetchComments: function (threadId) {
        var request = Helpers.ajax({
            type: "GET",
            url: ROOT_URL + "/thread/" + threadId,
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
        var config = {
            type : "UPDATE",
            url : ROOT_URL + "/upvote/" + comment.id,
            headers : [{ "X-CSRF-TOKEN" : csrf }],
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            returnType: "json",
            data: [{"body": comment, "thread_id": 1}]
        };

        return {
            type: t.COMMENT_UP_VOTED,
            payload: comment
        }
    },
    postComment: function (comment, callback) {
        var config = {
            type: "POST",
            url: "/api/v1/comments/store",
            headers: [{"X-CSRF-TOKEN": csrf}],
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            returnType: "json",
            data: [{"body": comment, "thread_id": 1}]
        };
        // This method now returns a promise for us to consume
        Helpers.ajax(config).then(function(data) {
            callback(null, data);
        }, function(error) {
            callback(error, null);
        });
    }
}