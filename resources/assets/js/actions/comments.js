import { ajax } from '../helpers';
import t from '../actions/types'

export function fetchComments(threadId) {
    const request = ajax({
        type : "GET",
        url : `/api/v1/comments/thread/${threadId}`,
        contentType : "application/json",
        cache: true
    });

    console.log("Request: ", request);

    return {
        type : t.FETCH_COMMENTS,
        payload : request
    }

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
            callback(null, data);
        } else {
            callback(error, null);
        }
    });
}

// Wire this action creator to Redux.  This will update the state through the
// dispatchProps method in CommentFeed
export function upVoteComment(comment) {
    // upVoteComment is an ActionCreator, it needs to return an action, an object with a type property
    // the type decribes the action
    console.log(`A comment has been selected for up voting: ${comment.created_at}`);
    return {
        type : t.COMMENT_UP_VOTED,
        payload : comment
    }
}