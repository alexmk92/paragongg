var React = require("react");
var Helpers = require("../../helpers.js");
var CommentBox = require('./CommentBox.jsx');

// Actions
var CommentListItem = React.createClass({
    getInitialState: function() {
        return {
            isReplying : false,
            isShowingOptionMenu: false
        }
    },
    vote: function() {
        this.props.upVoteComment(this.props.comment);
    },
    reportComment: function() {
        this.props.reportComment(this.props.comment);
    },
    deleteComment: function() {
        this.props.deleteComment(this.props.comment);
    },
    reply: function(event) {
        event.preventDefault();
        this.setState({ isReplying : !this.state.isReplying });
    },
    getReplies: function() {
        // TODO IF A COMMENT HAS LOADS OF SUB COMMENTS WE SHOULD LOAD THEM HERE....
    },
    closeCommentBox : function() {
        this.setState({ isReplying: false });
    },
    toggleOptionMenu: function() {
        this.setState({ isShowingOptionMenu: !this.state.isShowingOptionMenu });
    },
    getCommentBody: function() {
        var commentBodyClass = "";
        var commentBody = this.props.comment.body;
        if(this.props.comment.status.toUpperCase() === "DELETED") {
            commentBodyClass = " deleted-comment";
            commentBody = "The author deleted this comment..."
        }

        return <div className={"comment-body" + commentBodyClass}>{ commentBody }</div>
    },
    render: function() {
        console.log(this.props);
        var toggleClass = 'fa fa-thumbs-up vote-button';
        var commentClass = 'comment-item ' + (this.props.comment.childComment ? "child-comment" : "");
        var comments = [];
        this.props.childComments.forEach(function(comment) {
            if(this.props.comment.id === comment.parent_id) {
                comments.push(
                    <CommentListItem postComment={this.props.postComment}
                                     onCommentSubmitted={this.props.onCommentSubmitted}
                                     childComment={ true } key={Helpers.uuid()}
                                     comment={comment} childComments={this.props.childComments}
                                     author={ USER }
                                     reportComment={this.props.reportComment}
                                     deleteComment={this.props.deleteComment}
                                     upVoteComment={this.props.upVoteComment} />
                );
            }
        }.bind(this));

        moreOptionsButton = "";
        if(AUTHED && this.props.comment.status !== "deleted") {
            var deleteIcon = parseInt(this.props.comment.user_id) === parseInt(USER.id) ? <span onClick={this.deleteComment}><i className="fa fa-trash" aria-hidden="true"></i> Delete</span> : "";
            var moreOptionsButton = (
                <button className={"btn btn-small btn-faded btn-icon more-button" + (this.state.isShowingOptionMenu ? " active" : "")} onClick={this.toggleOptionMenu}>
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    <div className={ "more-container" + (this.state.isShowingOptionMenu ? " visible" : "")}>
                        <span className={this.props.comment.reported ? "active" : ""} onClick={this.reportComment}><i className="fa fa-flag" aria-hidden="true"></i> Report</span>
                        { deleteIcon }
                    </div>
                </button>
            );
        }

        return(
            <li className={commentClass}>
                <div className="comment-details">
                    <img className="user-avatar" src={Helpers.getUserAvatarImageURL(USER)} alt="Your avatar" />
                    <a href="">{ this.props.author.username } </a> <span><time className="created-at">{ Helpers.prettyDate(this.props.comment.created_at) }</time></span>
                </div>
                { this.getCommentBody() }
                <div className="comment-actions">
                    <button className="btn btn-small btn-faded" onClick={this.reply}>Reply</button>
                    <button className={"btn btn-small btn-faded " + (this.props.comment.voted ? "active" : "")} onClick={this.vote}>
                        <i className={toggleClass} aria-hidden="true"></i> { this.props.comment.votes }
                    </button>
                    { moreOptionsButton }
                </div>

                <div className={"child-comment-box-wrapper " + (this.state.isReplying ? "" : " hidden")}>
                    <CommentBox parentComment={this.props.comment} postComment={this.props.postComment} onCommentSubmitted={this.props.onCommentSubmitted} childBox={true} onCanceledPost={this.closeCommentBox} />
                </div>
                <ul id={"comment-" + this.props.comment.id + "-child-comments"} className="comment-list">
                    { comments }
                </ul>
            </li>
        );
    }
});

module.exports = CommentListItem;