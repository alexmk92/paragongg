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
        var replyField = AUTHED ? <a href="#" onClick={this.reply}>Reply</a> : "";
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
                <img className="comment-avatar" src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80" alt="Your avatar" />
                <span className="author-name">{ this.props.author.name } <span className="created-at">{ Helpers.prettyDate(this.props.comment.created_at) }</span></span>
                <p className="comment-body">{ this.props.comment.body }</p>
                { replyField }
                <i onClick={ this.vote } className={toggleClass} aria-hidden="true"><span>{ this.props.comment.votes }</span></i>
                <a className="report" onClick={this.report} href="#">Report</a>
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