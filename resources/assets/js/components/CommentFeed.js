import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { prettyDate, uuid } from '../helpers'

// Actions
import { postComment, fetchComments } from '../actions/comments'

class CommentListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thread_id : props.comment.thread_id || 0,
            parent_id : props.comment.parent_id || 0,
            comment_id : props.comment.id || 0,
            author_id : props.comment.user_id || 0,
            body : props.comment.body || "",
            created_at : props.comment.created_at,
            votes : props.comment.votes || 0,
            reports : props.comment.reports || 0,
            author : props.comment.author || "",
            voted : false,
            childComments : props.childComments || [],
            isChildComment : props.childComment || false
        };

        this.vote = this.vote.bind(this);
        this.reply = this.reply.bind(this);
    }
    vote() {
        if(!this.state.voted) {
            this.setState({
                votes: (this.state.votes + 1),
                voted: true
            });
        }
    }
    report() {

    }
    reply(event) {
        event.preventDefault();
        this.setState({ replying : !this.state.replying });
    }
    getReplies() {

    }
    render() {
        const toggleClass = `fa fa-thumbs-up vote-button ${(this.state.voted ? "active" : "")}`;
        const commentClass = `comment-item ${this.state.isChildComment ? "child-comment" : ""}`;
        const comments = this.state.childComments.map((comment) => {
            if(comment.parent_id === this.state.comment_id) {
                return <CommentListItem childComment={true} key={uuid()} comment={comment} childComments={this.state.childComments} />
            }
        });
        return(
            <li className={commentClass}>
                <img className="comment-avatar" src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80" alt="Your avatar" />
                <span className="author-name">{ this.state.author.name } <span className="created-at">{ prettyDate(this.state.created_at) }</span></span>
                <p className="comment-body">{ this.state.body }</p>
                <a href="#" onClick={this.reply}>Reply</a>
                <i onClick={ this.vote } className={toggleClass} aria-hidden="true"><span>{ this.state.votes }</span></i>
                <a className="report" onClick={this.report} href="#">Report</a>
                <CommentBox isHidden={!this.state.replying} />
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
            isFocused : false,
            isHidden : props.isHidden
        };
        console.log(props);
        this.post = this.post.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.cancelPost = this.cancelPost.bind(this);
    }
    post(event) {
        event.preventDefault();
        this.setState({ posting : true });
        if(this.state.hasText) {
            postComment(this.state.comment, (payload) => {
                this.props.onCommentRequestRefresh( { body : this.state.comment, createdAt : new Date() });
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
        console.log("RENDERING THE COMMENT BOX")
        const buttonClass = (!this.state.isFocused && !this.state.posting) ? "hidden" : "";
        return(
            <div id="comment-box" className={this.state.isHidden ? "hidden" : ""}>
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
        this.state = {
            className : props.className,
            thread_id : 0,
            parent_id : 0,
            comments : [],
            childComments : []
        };
        this.getComments = this.getComments.bind(this)
    }
    componentWillMount() {
        this.getComments();
    }
    getComments() {
        fetchComments(1, (error, data) => {
            if(error === null) {
                var childComments = [];
                var comments = [];
                data.map((comment) => {
                    if(typeof comment !== "undefined") {
                        if(comment.parent_id <= 0) comments.push(comment);
                        else childComments.push(comment);
                    }
                });
                this.setState({ comments, childComments });
            }
        })
    }
    render() {
        const comments = this.state.comments.map((comment) => {
            return <CommentListItem key={uuid()} comment={comment} childComments={this.state.childComments} />
        });
        return (
            <div id="comments-wrapper" className={this.state.className || ""}>
                <CommentBox isHidden={false} onCommentRequestRefresh={ this.getComments } />
                <ul id="comment-list">
                    { comments }
                </ul>
            </div>
        );
    }
}

var element = document.querySelector('#comment-feed');
if(element) ReactDOM.render(<CommentFeed />, element);