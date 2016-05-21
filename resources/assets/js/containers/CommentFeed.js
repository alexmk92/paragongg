import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { prettyDate, uuid } from '../helpers'

// Actions
import { postComment, upVoteComment, fetchComments } from '../actions/comments'

class CommentListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voted : false,
            isReplying : false
        };

        this.vote = this.vote.bind(this);
        this.reply = this.reply.bind(this);
    }
    vote() {
        if(!this.state.voted) {
            this.props.upVoteComment(this.props.comment);
            /*
            this.setState({
                votes: (this.state.votes + 1),
                voted: true
            });
            */
        }
    }
    report() {

    }
    reply(event) {
        event.preventDefault();
        this.setState({ isReplying : !this.state.isReplying });
    }
    getReplies() {

    }
    render() {
        const toggleClass = `fa fa-thumbs-up vote-button ${(this.state.voted ? "active" : "")}`;
        const commentClass = `comment-item ${this.props.comment.childComment ? "child-comment" : ""}`;
        const comments = this.props.childComments.map((comment) => {
            if(this.props.comment.id === comment.parent_id) {
                return <CommentListItem childComment={true} key={uuid()} comment={comment} childComments={this.props.childComments} author={ this.props.author } upVoteComment={this.props.upVoteComment} />
            }
        });
        return(
            <li className={commentClass}>
                <img className="comment-avatar" src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80" alt="Your avatar" />
                <span className="author-name">{ this.props.author.name } <span className="created-at">{ prettyDate(this.props.comment.created_at) }</span></span>
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
}

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasText : false,
            characterCount : 0,
            lineCount : 0,
            comment : "",
            posting : false,
            isFocused : false
        };
        this.post = this.post.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.cancelPost = this.cancelPost.bind(this);
    }
    post(event) {
        event.preventDefault();
        this.setState({ posting : true });
        if(this.state.hasText) {
            postComment(this.state.comment, (payload) => {
                //this.props.onCommentRequestRefresh();
                this.setState({ posting : false, comment : "" });
            })
        } else {
            this.cancelPost(event);
            this.setState({ posting : false });
        }
    }
    cancelPost(event) {
        event.preventDefault();
        this.setState({ posting : false, comment : "" });
    }
    inputChanged(event) {
        const comment = event.target.value;
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
    }
    render() {
        console.log("re-rendering comment")
        const buttonClass = (!this.state.isFocused && !this.state.posting) ? "hidden" : "";
        return(
            <div id="comment-box">
                <form className={this.state.posting ? "disabled" : ""}>
                    <img className="comment-avatar" src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80" alt="Your avatar" />
                    <textarea
                        onFocus={() => {this.setState({ isFocused : true })}}
                        onBlur={() => {this.setState({ isFocused : false })}}
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
}

class CommentFeed extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.fetchComments(1);
    }
    render() {
        console.log("COMMENTS IS");
        console.log(this.props);
        const author = {
            name : "Alex Sims"
        }
        const comments = [];
        this.props.comments.forEach((comment) => {
            if(comment.parent_id === 0) {
                comments.push(
                    <CommentListItem
                        key={uuid()}
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
}

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
    return bindActionCreators({
        upVoteComment : upVoteComment,
        fetchComments : fetchComments
    }, dispatch)
}
// Promote CommentFeed from a component to a container
export default connect(mapStateToProps, mapDispatchToProps)(CommentFeed);
