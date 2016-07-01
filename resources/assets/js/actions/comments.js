var t = require('../actions/types');
var Helpers = require('../helpers');

var ROOT_URL = '/api/v1/';

module.exports = {
    fetchComments: function (threadId, skip) {
        var request = Helpers.ajax({
            type: "GET",
            url: ROOT_URL + "comments/thread/" + threadId,
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
        var request = Helpers.ajax({
            type : "POST",
            url : ROOT_URL + "vote",
            headers : [{ "X-CSRF-TOKEN" : csrf }],
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            returnType: "json",
            data: [{ "ref_id" : comment.id, "type" : "comment" }]
        });
        
        return {
            type: t.COMMENT_UP_VOTED,
            payload: request
        }
    },
    deleteComment: function(comment) {
        var request = Helpers.ajax({
            type : "GET",
            url : ROOT_URL + "comments/delete/" + comment.id,
            headers : [{ "X-CSRF-TOKEN" : csrf }],
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            returnType: "json"
        });

        return {
            type: t.DELETE_COMMENT,
            payload: request
        }
    },
    reportComment: function(comment) {
        var request = Helpers.ajax({
            type : "POST",
            url : ROOT_URL + "report",
            headers : [{ "X-CSRF-TOKEN" : csrf }],
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            returnType: "json",
            data: [{ "ref_id" : comment.id, "type" : "comment" }]
        });

        return {
            type: t.COMMENT_REPORTED,
            payload: request
        }
    },
    postComment: function (comment, threadId, parentCommentId) {
        // This method now returns a promise for us to consume
        var request = Helpers.ajax({
            type: "POST",
            url: ROOT_URL + "comments/store",
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