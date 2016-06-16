var React      = require('react');
var Redux      = require('redux');
var ReactRedux = require('react-redux');
var Action     = require('../../actions/comments');
var Helpers    = require('../../helpers');

var CommentListItem = require('./CommentListItem');
var CommentBox = require('./CommentBox');

var CommentFeed = React.createClass({
    componentWillMount: function() {
        this.props.fetchComments(THREAD_ID);
    },
    renderComments: function() {
        var comments = [];
        var initialCommentCollection = [];
        var author = {
            name : "Alex Sims"
        };

        this.removePendingComments();

        if(this.props.comments.length === 0) {
            initialCommentCollection = COMMENTS;
        } else {
            initialCommentCollection = this.props.comments;
        }
        if(initialCommentCollection.length > 0) {
            initialCommentCollection.forEach(function(comment) {
                if(comment.parent_id === 0 || comment.parent_id === null) {
                    comments.push(
                        <CommentListItem
                            key={Helpers.uuid()}
                            comment={comment}
                            author={ author }
                            childComments={ this.props.comments }
                            upVoteComment={ this.props.upVoteComment }
                            onCommentSubmitted={this.appendPendingComment}
                            postComment={this.props.postComment}
                        />
                    );
                }
            }.bind(this));
        }
        return comments;
    },
    removePendingComments: function() {
        var pendingComment = document.querySelector("#pending-comment");
        if(pendingComment) {
            var parentNode = pendingComment.parentNode;
            if(parentNode) {
                parentNode.removeChild(pendingComment);
            }
        }
    },
    appendPendingComment: function(commentContent, parentId) {

        var author = {
            name : "Alex"
        };

        var tempComment = document.createElement("li");
        tempComment.className = "comment-item";
        tempComment.id = "pending-comment";

        tempComment.innerHTML += "<img class='comment-avatar' src='' alt='Your avatar' />";
        tempComment.innerHTML += "<span class='author-name'>" + author.name + " <span class='created-at'>" + Helpers.prettyDate(new Date())+ "</span></span>";
        tempComment.innerHTML += "<p class='comment-body'>" + commentContent + "</p>";
        tempComment.innerHTML += "<a href='#'>Reply</a>";
        tempComment.innerHTML += "<i class='fa fa-thumbs-up vote-button' aria-hidden='true'><span>0</span></i>";
        tempComment.innerHTML += "<a class='report' href='#'>Report</a>";

        var commentList = document.querySelector("#comment-list");
        if(parentId > 0) {
            commentList = document.querySelector("#comment-" + parentId + "-child-comments");
        }
        if(commentList) {
            commentList.insertBefore(tempComment, commentList.childNodes[0]);
        }
    },
    render: function() {
        var comments = this.renderComments();
        return (
            <div id="comments-wrapper" className={this.props.className || ""}>
                <CommentBox rootComment={null} isHidden={false} onCommentSubmitted={this.appendPendingComment} postComment={this.props.postComment} />
                <ul id="comment-list">
                    { comments }
                </ul>
            </div>
        );
    }
});

// Connect to Redux, whatever is returned from here will show up as props within CommentFeed
function mapStateToProps(state) {
    console.log("NEW STATE: ", state);
    return {
        comments : state.commentsReducer.comments,
        lastUpVotedComment : state.commentsReducer.lastUpvotedComment
    }
}
// Whenever upVoteComment is called, the result should be passed to all of our reducers.
// Anything returned from this will end up as props on CommentFeed container,
// allowing us to call the action on our component
function mapDispatchToProps(dispatch) {
    return Redux.bindActionCreators({
        upVoteComment : Action.upVoteComment,
        fetchComments : Action.fetchComments,
        postComment : Action.postComment
    }, dispatch)
}
// Promote CommentFeed from a component to a container
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CommentFeed);
