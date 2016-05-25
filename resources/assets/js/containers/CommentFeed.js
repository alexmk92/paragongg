var React      = require('react');
var Redux      = require('redux');
var ReactRedux = require('react-redux');
var Action     = require('../actions/comments');
var Helpers    = require('../helpers');
//import { postComment, upVoteComment, fetchComments } from '../actions/comments'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
//import { prettyDate, uuid } from '../helpers'

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
            /*
            this.setState({
                votes: (this.state.votes + 1),
                voted: true
            });
            */
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
        var toggleClass = 'fa fa-thumbs-up vote-button ' + (this.state.voted ? "active" : "");
        var commentClass = 'comment-item ' + (this.props.comment.childComment ? "child-comment" : "");
        var comments = this.props.childComments.map(function(comment) {
            if(this.props.comment.id === comment.parent_id) {
                return <CommentListItem childComment={true} key={Helpers.uuid()} comment={comment} childComments={this.props.childComments} author={ this.props.author } upVoteComment={this.props.upVoteComment} />
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

var CommentBox = React.createClass({
    getInitialState: function() {
        return {
            hasText : false,
            characterCount : 0,
            lineCount : 0,
            comment : "",
            posting : false,
            isFocused : false
        }
    },
    post: function(event) {
        event.preventDefault();
        this.setState({ posting : true });
        if(this.state.hasText) {
            Action.postComment(this.state.comment, function(payload) {
                //this.props.onCommentRequestRefresh();
                this.setState({ posting : false, comment : "" });
            })
        } else {
            this.cancelPost(event);
            this.setState({ posting : false });
        }
    },
    cancelPost: function(event) {
        event.preventDefault();
        this.setState({ posting : false, comment : "" });
    },
    inputChanged: function(event) {
        var comment = event.target.value;
        this.setState({
            hasText : comment.trim().length > 0,
            lineCount : comment.split(/\r|\r\n|\n/).length,
            characterCount: comment.length,
            comment : comment
        });

        // See if we need to increase the size
        if(event.target.clientHeight < event.target.scrollHeight) {
            var rect = event.target.getBoundingClientRect();
            event.target.style.height = rect.height + 17.5 + "px";
        }
    },
    render: function() {
        console.log("re-rendering comment")
        var buttonClass = (!this.state.isFocused && !this.state.posting) ? "hidden" : "";
        return(
            <div id="comment-box">
                <form className={this.state.posting ? "disabled" : ""}>
                    <img className="comment-avatar" src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80" alt="Your avatar" />
                    <textarea
                        onFocus={function() {this.setState({ isFocused : true })}}
                        onBlur={function() {this.setState({ isFocused : false })}}
                        onChange={this.inputChanged}
                        id="body"
                        name="body"
                        placeholder="Enter your comment"
                        value={this.state.comment}>
                    </textarea>
                    <button
                        className={ buttonClass }
                        onClick={this.post}>Post
                    </button>
                    <button
                        className={ buttonClass }
                        onClick={this.cancelPost}>Cancel
                    </button>
                </form>
            </div>
        )
    }
});

var CommentFeed = React.createClass({
    componentWillMount: function() {
        this.props.fetchComments(1);
    },
    render: function() {
        console.log("COMMENTS IS");
        console.log(this.props);
        var author = {
            name : "Alex Sims"
        }
        var comments = [];
        this.props.comments.forEach(function(comment) {
            if(comment.parent_id === 0) {
                comments.push(
                    <CommentListItem
                        key={Helpers.uuid()}
                        comment={comment}
                        author={ author }
                        childComments={ this.props.comments }
                        upVoteComment={ this.props.upVoteComment }
                    />
                );
            }
        });
        return (
            <div id="comments-wrapper" className={this.props.className || ""}>
                <CommentBox isHidden={false}  />
                <ul id="comment-list">
                    { comments }
                </ul>
            </div>
        );
    }
});

// Connect to Redux, whatever is returned from here will show up as props within CommentFeed
function mapStateToProps(state) {
    return {
        comments : state.comments
    }
}
// Whenever upVoteComment is called, the result should be passed to all of our reducers.
// Anything returned from this will end up as props on CommentFeed container,
// allowing us to call the action on our component
function mapDispatchToProps(dispatch) {
    return Redux.bindActionCreators({
        upVoteComment : Action.upVoteComment,
        fetchComments : Action.fetchComments
    }, dispatch)
}
// Promote CommentFeed from a component to a container
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CommentFeed);
