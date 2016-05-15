import { ajax } from '../helpers';

export function fetchComments(threadId, callback) {
    ajax({
        type : "GET",
        url : `/api/v1/comments/thread/${threadId}`,
        contentType : "application/json",
        cache: true
    }, (error, data) => {
        if(error === null && data !== null) {
            console.log(data);
            callback(null, data);
        } else {
            console.log(`Error: ${error.code}, Message: ${error.message}`);
            callback(error, null);
        }
    });
}

export function postComment(comment, callback) {
    ajax({
        type : "POST",
        url : "/api/v1/comments/store",
        headers : [{ "X-CSRF-TOKEN" : csrf }],
        contentType : "application/x-www-form-urlencoded",
        cache : false,
        returnType : "json",
        data : [{ "body" : comment, "thread_id" : 1 }]
    }, (error, data) => {
        if(error === null && data !== null) {
            console.log(data);
            callback(null, data);
        } else {
            console.log(`Error: ${error.code}, Message: ${error.message}`);
            callback(error, null);
        }
    });
}

// Wire this action creator to Redux.  This will update the state through the
// dispatchProps method in CommentFeed
export function upVoteComment(comment) {
    console.log(`A comment has been selected for up voting: ${comment.created_at}`)
}