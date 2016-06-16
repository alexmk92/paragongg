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
        // TODO
    },
    render: function() {
        var _this = this;
        var toggleClass = 'fa fa-thumbs-up vote-button ' + (this.state.voted ? "active" : "");
        var commentClass = 'comment-item ' + (this.props.comment.childComment ? "child-comment" : "");
        var comments = this.props.childComments.map(function(comment) {
            if(_this.props.comment.id === comment.parent_id) {
                return <CommentListItem childComment={true} key={Helpers.uuid()} comment={comment} childComments={_this.props.childComments} author={ _this.props.author } upVoteComment={_this.props.upVoteComment} />
            }
        });
        return(
            <li className={commentClass}>
                <img className="comment-avatar" src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80" alt="Your avatar" />
                <span className="author-name">{ this.props.author.name } <span className="created-at">{ Helpers.prettyDate(this.props.comment.created_at) }</span></span>
                <p className="comment-body">{ this.props.comment.body }</p>
                <a href="#" onClick={this.reply}>Reply</a>
                <i onClick={ this.vote } className={toggleClass} aria-hidden="true"><span>{ this.props.comment.votes }</span></i>
                <a className="report" onClick={this.report} href="#">Report</a>
                <div className={!this.props.comment.isReplying ? "child-comment-box-wrapper hidden" : "child-comment-box-wrapper"}>
                    <CommentBox />
                </div>
                <ul class="comment-list">
                    { comments }
                </ul>
            </li>
        );
    }
});

module.exports = CommentListItem;