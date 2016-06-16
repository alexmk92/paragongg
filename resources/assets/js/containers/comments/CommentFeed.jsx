var React      = require('react');
var Redux      = require('redux');
var ReactRedux = require('react-redux');
var Action     = require('../../actions/comments');
var Helpers    = require('../../helpers');

var CommentListItem = require('./CommentListItem');
var CommentBox = require('./CommentBox');

var CommentFeed = React.createClass({
    componentWillMount: function() {
        this.props.fetchComments(1);
    },
    render: function() {
        var author = {
            name : "Alex Sims"
        };
        console.log("NEW PROPS: ", this.props);
        var comments = [];
        this.props.comments.forEach(function(comment) {
            if(comment.parent_id === 0 || comment.parent_id === null) {
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
        }.bind(this));
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
    console.log("NEW STATE: ", state);
    return {
        comments : state.commentsReducer.comments,
        lastUpVotedComment : state.commentsReducer.lastUpvotedComment
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
