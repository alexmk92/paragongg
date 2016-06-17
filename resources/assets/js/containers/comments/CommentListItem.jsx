var React = require("react");
var Helpers = require("../../helpers.js");
var CommentBox = require('./CommentBox.jsx');

// Actions
var CommentListItem = React.createClass({
    getInitialState: function() {
        return {
            voted : false,
            isReplying : false
        }
    },
    vote: function() {
        if(!this.state.voted) {
            this.props.upVoteComment(this.props.comment);
             this.setState({
                voted: true
             });
        }
    },
    report: function() {
        // TODO
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
    render: function() {
        var toggleClass = 'fa fa-thumbs-up vote-button ' + (this.state.voted ? "active" : "");
        var commentClass = 'comment-item ' + (this.props.comment.childComment ? "child-comment" : "");
        var comments = [];
        this.props.childComments.forEach(function(comment) {
            if(this.props.comment.id === comment.parent_id) {
                comments.push(
                    <CommentListItem postComment={this.props.postComment}
                                     onCommentSubmitted={this.props.onCommentSubmitted}
                                     childComment={ true } key={Helpers.uuid()}
                                     comment={comment} childComments={this.props.childComments}
                                     author={ this.props.author }
                                     upVoteComment={this.props.upVoteComment} />
                );
            }
        }.bind(this));
        return(
            <li className={commentClass}>
                <div className="comment-details">
                    <img className="user-avatar" src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=28" alt="Your avatar" />
                    <a href="">{ this.props.author.name } </a> <span><time className="created-at">{ Helpers.prettyDate(this.props.comment.created_at) }</time></span>
                </div>
                <div className="comment-body">{ this.props.comment.body }</div>
                <div className="comment-actions">
                    <button className="btn btn-small btn-faded" onClick={this.reply}>Reply</button>
                    <button className="btn btn-small btn-faded" onClick={this.vote}>
                        <i className={toggleClass} aria-hidden="true"></i> { this.props.comment.votes }
                    </button>
                    <button className="btn btn-small btn-faded btn-icon">
                        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </button>
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