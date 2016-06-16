var React = require("react");

var CommentBox = React.createClass({
    getInitialState: function() {
        return {
            hasText : false,
            characterCount : 0,
            lineCount : 0,
            commentBody : "",
            posting : false,
            isFocused : false,
            enterToPost: true
        }
    },
    componentDidUpdate: function() {
        if(this.refs[0] && (document.activeElement === this.refs[0])) {
            this.refs[0].focus();
        }
    },
    didSubmitComment: function(event) {
        if(event.keyCode === 13) {
            if(event.shiftKey) {
                event.stopPropagation();
            } else {
                this.post(event);
            }
        }
    },
    post: function(event) {
        event.preventDefault();
        if(!this.childBox)
            this.setState({ posting : true });
        else {
            this.setState({ posting: false })
        }
        if(this.state.hasText) {
            var parentId = this.props.childBox === true ? this.props.parentComment.id : 0;
            var value = this.state.commentBody;
            this.props.onCommentSubmitted(value, parentId);
            // when the promise completes we can only re-render the master parent textarea as the
            // child ones will not have yet been rendered, therefore the pointer to "this" does not exist
            this.props.postComment(this.state.commentBody, THREAD_ID, parentId).then(function() {
                if(!this.props.childBox) this.setState({ posting : false, commentBody : "" });
            }.bind(this));
        } else {
            this.cancelPost(event);
            this.setState({ posting : false });
        }
    },
    cancelPost: function(event) {
        event.preventDefault();
        if(this.props.childBox) {
            this.props.onCanceledPost();
        } else {
            this.setState({ posting : false, commentBody : "" });
        }
    },
    inputChanged: function(event) {
        var commentText = event.target.value;
        this.setState({
            hasText : commentText.trim().length > 0,
            lineCount : commentText.split(/\r|\r\n|\n/).length,
            characterCount: commentText.length,
            commentBody : commentText
        });

        // See if we need to increase the size
        if(event.target.clientHeight < event.target.scrollHeight) {
            var rect = event.target.getBoundingClientRect();
            event.target.style.height = rect.height + 17.5 + "px";
        }
    },
    toggleFocus: function(isFocused) {
        this.setState({ isFocused: isFocused});
    },
    render: function() {
        if(AUTHED) {
            var id = this.props.childBox ? this.props.parentComment.id : 0;
            var buttonClass = (!this.state.isFocused && !this.state.posting) ? "hidden" : "";
            return (
                <div id="comment-box">
                    <h3 className="section-heading">Discussion</h3>
                    <form className={this.state.posting ? "disabled" : ""}>
                        <img className="comment-avatar"
                             src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80"
                             alt="Your avatar"/>
                    <textarea
                        autoFocus={true}
                        ref={"commentTextArea" + id }
                        onKeyUp={this.didSubmitComment}
                        onFocus={this.toggleFocus.bind(this, true)}
                        onBlur={this.toggleFocus.bind(this, false)}
                        onChange={this.inputChanged}
                        id="body"
                        name="body"
                        placeholder="Enter your comment..."
                        value={this.state.commentBody}>
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
        } else {
            return (
                <div>
                    <h3 className="section-heading">Discussion</h3>
                    <p id="login">Please <a href="/login">login</a> or <a href="/register">sign up</a> to post your own responses.</p>
                </div>
            )
        }
    }
});

module.exports = CommentBox;