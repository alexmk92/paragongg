var React      = require('react');
var Redux      = require('redux');
var ReactRedux = require('react-redux');
var Action     = require('../../actions/comments');
var Helpers    = require('../../helpers');
var Notification = require('../../components/libraries/notification/Notification');

var CommentListItem = require('./CommentListItem');
var CommentBox = require('./CommentBox');

var CommentFeed = React.createClass({
    componentWillMount: function() {
        this.props.fetchComments(THREAD_ID, 0);
    },
    componentDidMount: function() {
        this.skip = 0;
        this.updating = false;
        this.notificationPanel = new Notification();
        this.notificationPanel.initialiseNotifications();
        window.addEventListener('scroll', this.handleScroll);
    },
    handleScroll: function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.getResults();
        }
    },
    getResults: function() {
        if(!this.updating && !this.props.endOfComments) {
            this.updating = true;
            this.skip += 5;
            this.props.fetchComments(THREAD_ID, this.skip).then(function() {
                setTimeout(function() {
                    this.updating = false;
                }.bind(this), 50);
            }.bind(this))
        }
    },
    reportComment: function(comment) {
        this.props.reportComment(comment).then(function() {
            this.notificationPanel.addNotification('success', 'Thanks, we\'ll investigate this comment as soon as possible!');
        }.bind(this), function(err) {
            this.notificationPanel.addNotification('warning', 'Sorry, we couldn\t handle your request at this time, please try again.');
        }.bind(this));
    },
    deleteComment: function(comment) {
        this.props.deleteComment(comment).then(function() {
            this.notificationPanel.addNotification('success', 'Deleted your comment successfully.');
        }.bind(this), function(err) {
            this.notificationPanel.addNotification('warning', 'Sorry, we couldn\'t delete that comment, try again later.');
        }.bind(this));
    },
    renderComments: function() {
        var comments = [];
        var initialCommentCollection = this.props.comments;
        this.removePendingComments();

        if(initialCommentCollection.length === 0) {
            initialCommentCollection = COMMENTS;
        }
        if(initialCommentCollection.length > 0) {
            initialCommentCollection.forEach(function(comment) {
                if(comment.parent_id === 0 || comment.parent_id === null) {
                    comments.push(
                        <CommentListItem
                            key={Helpers.uuid()}
                            comment={comment}
                            voted={comment.voted}
                            author={{ id : comment.user_id, username : comment.username, avatar : comment.avatar }}
                            childComments={ this.props.comments }
                            upVoteComment={ this.props.upVoteComment }
                            reportComment={ this.reportComment }
                            deleteComment={ this.deleteComment }
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
        tempComment.innerHTML += "<div class='comment-details'>";
        tempComment.innerHTML += "  <img class='user-avatar' src='" + Helpers.getUserAvatarImageURL(USER) + "' alt='Your avatar' />";
        tempComment.innerHTML += "  <a href=''>" + USER.username + "</a>";
        tempComment.innerHTML += "  <span><time class='created-at'>" + Helpers.prettyDate(new Date())+ "</time></span>";
        tempComment.innerHTML += "</div>";
        tempComment.innerHTML += "<div class='comment-body'>" + commentContent + "</div>";
        tempComment.innerHTML += "<div class='comment-actions'>";
        tempComment.innerHTML += "  <button class='btn btn-small btn-faded'>Reply</button>";
        tempComment.innerHTML += "  <button class='btn btn-small btn-faded'>";
        tempComment.innerHTML += "      <i class='fa fa-thumbs-up vote-button' aria-hidden='true'></i> 0";
        tempComment.innerHTML += "  </button>";
        tempComment.innerHTML += "  <button class='btn btn-small btn-faded btn-icon more-button'>";
        tempComment.innerHTML += "      <i class='fa fa-ellipsis-h' aria-hidden='true'></i>";
        tempComment.innerHTML += "  </button>";
        tempComment.innerHTML += "</div>";

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
                <div className={"infinite-scroll-end " + (this.props.endOfComments ? "" : "hidden")}><i className="fa fa-check"></i> You've reached the end of the page</div>
            </div>
        );
    }
});

// Connect to Redux, whatever is returned from here will show up as props within CommentFeed
function mapStateToProps(state) {
    return {
        comments : state.commentsReducer.comments,
        lastUpVotedComment : state.commentsReducer.lastUpvotedComment,
        endOfComments : state.commentsReducer.endOfComments
    }
}
// Whenever upVoteComment is called, the result should be passed to all of our reducers.
// Anything returned from this will end up as props on CommentFeed container,
// allowing us to call the action on our component
function mapDispatchToProps(dispatch) {
    return Redux.bindActionCreators({
        upVoteComment : Action.upVoteComment,
        fetchComments : Action.fetchComments,
        postComment : Action.postComment,
        reportComment: Action.reportComment,
        deleteComment: Action.deleteComment
    }, dispatch)
}
// Promote CommentFeed from a component to a container
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CommentFeed);
