import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { prettyDate, uuid } from '../helpers'
import FlipMove from 'react-flip-move'

// Actions
import { postComment, fetchComments } from '../actions/comments'

class CommentListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment : props.comment.body,
            createdAt : props.comment.createdAt,
            votes : props.comment.votes || 0,
            author : props.comment.author || "",
            voted : false
        };

        this.vote = this.vote.bind(this);
    }
    vote() {
        if(!this.state.voted) {
            this.setState({
                votes: (this.state.votes + 1),
                voted: true
            });
        }
    }
    render() {
        let toggleClass = "fa fa-thumbs-up vote-button " + (this.state.voted ? "active" : "");
        return(
            <li className="comment-item">
                <img className="comment-avatar" src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80" alt="Your avatar" />
                <span className="author-name">{ this.state.author.name } <span className="created-at">{ prettyDate(this.state.createdAt) }</span></span>
                <p className="comment-body">{ this.state.comment }</p>
                <i onClick={ this.vote } className={toggleClass} aria-hidden="true"><span>{ this.state.votes }</span></i>
                <a className="report" href="">Report</a>
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
            comment : ""
        };
        this.post = this.post.bind(this);
        this.inputChanged = this.inputChanged.bind(this)
    }
    post(event) {
        event.preventDefault();
        this.props.onCommentRequestRefresh( { body : this.state.comment, createdAt : new Date() });
        if(this.state.hasText) {
            postComment(this.state.comment, (payload) => {
                //console.log(payload);
            })
        }
    }
    inputChanged(event) {
        const comment = event.target.value.trim();
        this.setState({
            hasText : comment.length > 0,
            lineCount : comment.split(/\r|\r\n|\n/).length,
            characterCount: comment.length,
            comment : comment
        });
    }
    render() {
        return(
            <div id="comment-box">
                <form>
                    <textarea onChange={this.inputChanged} id="body" name="body" placeholder="Enter your comment"></textarea>
                    <button onClick={this.post}>Submit that shit</button>
                </form>
            </div>
        )
    }
}

class CommentFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments : []
        };
        console.log(this.state);
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
            <div id="comments-wrapper">
                <ul id="comment-list">{comments}</ul>
                <CommentBox onCommentRequestRefresh={ this.getComments } />
            </div>
        );
    }
}

var element = document.querySelector('#comment-feed');
if(element) ReactDOM.render(<CommentFeed />, element);
