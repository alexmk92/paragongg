export function fetchComments(callback) {
    // Do a real request to the API for all of our comments here

    callback({
        error : {
            code : 200,
            message : "Successfully retrieved comments"
        },
        data : [
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
    });
}

export function postComment(comment, callback) {
    var httpRequest;

    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
    } else {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
    }

    httpRequest.open("POST", "/api/v1/comments/store", true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.setRequestHeader('X-CSRF-TOKEN', csrf);

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            //console.log(httpRequest);
            if (httpRequest.status === 200) {
                //console.log(httpRequest.responseText);
                callback({
                    error : {
                        code : httpRequest.status,
                        message : ""
                    },
                    message : "Successfully posted your comment."
                });
            } else {
                //console.log(httpRequest.responseText);
                callback({
                    error : {
                        code : httpRequest.status,
                        message : ""
                    },
                    message : "Failed to post your comment."
                });
            }
        }
    };

    //console.log("Sending: body=BODYBODY&thread=1")
    httpRequest.send(`body=${comment}&thread=1`);
}