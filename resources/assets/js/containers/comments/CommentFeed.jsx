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
    componentDidMount: function() {
        // update the time stamps for now, to give a real time feel
        setInterval(function() {
            this.forceUpdate();
        }.bind(this), 15000);
    },
    renderComments: function() {
        var comments = [];
        var initialCommentCollection = [];
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
                            author={ USER }
                            childComments={ this.props.comments }
                            upVoteComment={ this.props.upVoteComment }
                            onCommentSubmitted={this.appendPendingComment}
                            postComment={this.props.postComment}
                        />
                    );
                }
            }.bind(this));
        }
        if(comments.length === 0) {
            return (
                <li className="no-comments">
                    <span>No comments on this post yet, be the first to start the discussion!</span>
                </li>
            );
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
        
        var tempComment = document.createElement("li");
        tempComment.className = "comment-item";
        tempComment.id = "pending-comment";

        // TODO React way of creating element here
        tempComment.innerHTML += "<img class='comment-avatar' src='' alt='Your avatar' />";
        tempComment.innerHTML += "<span class='author-name'>" + USER.username + " <span class='created-at'>" + Helpers.prettyDate(new Date())+ "</span></span>";
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
            <div>
                <h3 className="section-heading">Discussion</h3>
                <CommentBox rootComment={null} isHidden={false} onCommentSubmitted={this.appendPendingComment} postComment={this.props.postComment} />
                <ul id="comment-list" className={ AUTHED ? "" : "no-comment-box"}>
                    { comments }
                </ul>
            </div>
        );
    }
});

// Connect to Redux, whatever is returned from here will show up as props within CommentFeed
function mapStateToProps(state) {
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
