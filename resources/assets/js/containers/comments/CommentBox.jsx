var React = require("react");

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
            this.props.onCommentSubmitted(this.state.comment);
            this.props.postComment(this.state.comment, THREAD_ID).then(function() {
                this.setState({ posting : false, comment : "" });
            }.bind(this));
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
    toggleFocus: function(isFocused) {
        this.setState({ isFocused: isFocused});
    },
    render: function() {
        if(AUTHED) {
            var buttonClass = (!this.state.isFocused && !this.state.posting) ? "hidden" : "";
            return (
                <div id="comment-box">
                    <h3 className="section-heading">Discussion</h3>
                    <form className={this.state.posting ? "disabled" : ""}>
                        <img className="comment-avatar"
                             src="https://s.gravatar.com/avatar/bae38bd358b0325c7a3c049a4671a9cf?s=80"
                             alt="Your avatar"/>
                    <textarea
                        onFocus={this.toggleFocus.bind(this, true)}
                        onBlur={this.toggleFocus.bind(this, false)}
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
        } else {
            return (
                <p id="login">Please <a href="/login">login</a> or <a href="/register">sign up</a> to post your own responses.</p>
            )
        }
    }
});

module.exports = CommentBox;