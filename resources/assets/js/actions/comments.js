import { ajax } from '../helpers';

export function fetchComments(callback) {
    // Do a real request to the API for all of our comments here
    callback(
        null,
        [
            {
                commentId : 1,
                body : "The release date for Iggy & Scorch was just announced. Turns out it's already out and I've just been pretty lazy making the ParagonGG website. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet commodi cumque eligendi iure labore neque non quasi qui quibusdam. Alias asperiores deserunt dolores exercitationem minus, optio tempore velit voluptas.",
                votes : 10,
                createdAt : new Date(),
                author : {
                    name : "Alex Sims",
                    avatarURL : "some_link"
                }
            },
            {
                commentId : 2,
                body : "What a pile of crap, the comments from Alex was just utter dire.",
                votes : 12,
                createdAt : new Date(),
                author : {
                    name : "Alex Sims",
                    avatarURL : "some_link"
                }
            }
        ]
    );
}

export function postComment(comment, callback) {
    ajax({
        type : "POST",
        url : "/api/v1/comments/store",
        headers : [{ "X-CSRF-TOKEN" : csrf }],
        contentType : "application/x-www-form-urlencoded",
        cache : false,
        data : [{ "body" : comment, "thread" : 1 }]
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