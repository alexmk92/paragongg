import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { prettyDate, uuid } from '../helpers'

// Actions
import { postComment, fetchComments } from '../actions/comments'

//var hasChildComments = false;
//var childCommentCount = 1;

class CommentListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentId : props.comment.commentId || 0,
            comment : props.comment.body,
            createdAt : props.comment.createdAt,
            votes : props.comment.votes || 0,
            author : props.comment.author || "",
            voted : false
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

    }
    getReplies() {

    }
    render() {
        let toggleClass = "fa fa-thumbs-up vote-button " + (this.state.voted ? "active" : "");
        //let childComments = this.getReplies();
        return(
            <li className="comment-item">
                <img className="comment-avatar" src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80" alt="Your avatar" />
                <span className="author-name">{ this.state.author.name } <span className="created-at">{ prettyDate(this.state.createdAt) }</span></span>
                <p className="comment-body">{ this.state.comment }</p>
                <a href="#" onClick={this.reply}>Reply</a>
                <i onClick={ this.vote } className={toggleClass} aria-hidden="true"><span>{ this.state.votes }</span></i>
                <a className="report" onClick={this.report} href="">Report</a>
            </li>
            // Adds sub comments but crashes for time being
            //{ (childCommentCount > 0) ? <CommentFeed className="child-feed" showInput={this.state.showChildInput} /> : "" }
            //{ (childCommentCount === 0) ? hasChildComments = false : childCommentCount-- }
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
        console.log("State of box is")
        console.log(this.state)
    }
    post(event) {
        event.preventDefault();
        this.setState({ posting : true });
        if(this.state.hasText) {
            postComment(this.state.comment, (payload) => {
                //console.log(payload);
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
        this.state = {
            className : props.className,
            threadId : 0,
            parentCommentId : 0,
            comments : []
        };
        this.getComments = this.getComments.bind(this)
    }
    componentWillMount() {
        this.getComments();
    }
    getComments(comment) {
        fetchComments((payload) => {
            if(payload.error.code === 200) {
                var comments = payload.data;
                console.log("Attempting to push " + comment + " to the array of length " + comments.length);
                if(typeof comment !== "undefined") {
                    comments.push(comment)
                    console.log(`pushed ${comment} to comments array of length ${comments.length}, comments is now: `)
                    console.log(comments);
                }
                this.setState({ comments })
            }
        })
    }
    render() {
        const comments = this.state.comments.map((comment) => {
            return <CommentListItem key={uuid()} comment={comment} />
        });
        return (
            <div id="comments-wrapper" className={this.state.className || ""}>
                <CommentBox onCommentRequestRefresh={ this.getComments } />
                <ul id="comment-list">
                    { comments }
                </ul>
            </div>
        );
    }
}

var element = document.querySelector('#comment-feed');
if(element) ReactDOM.render(<CommentFeed />, element);
