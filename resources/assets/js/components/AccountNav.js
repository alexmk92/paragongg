var React    = require('react');
var ReactDOM = require('react-dom');

var AccountNav = React.createClass({

    getInitialState: function(){
        return {
            active: false
        }
    },

    showContent: function() {
        this.setState({active: !this.state.active})
    },

    isActive: function() {
        return (this.state.active) ? 'account-nav-panel active' : 'account-nav-panel inactive';
    },

    render: function () {
        //var user = this.props.user;
        return(
            <div className="account-dropdown">
                <div className="account-nav-trigger" onClick={this.showContent}>


                    <img className="account-avatar" src="https://www.gravatar.com/avatar/d5d3310834b43c6f96e200339734c949?s=20&amp;d=https%3A%2F%2Fparagon.gg%2Fimages%2Fdefault-avatar.png" alt="Your avatar" />
                    <span>jamieshepherd</span>
                    <span className="account-amber"><i className="fa fa-diamond" aria-hidden="true"></i>1,534</span>
                    <i className="fa fa-caret-down" aria-hidden="true"></i>

                </div>
                <div className={this.isActive()}>
                    <ul className="account-properties">
                        <li><a href="/"><i className="fa fa-user" aria-hidden="true"></i>View profile</a></li>
                        <li><a href="/"><i className="fa fa-book" aria-hidden="true"></i>Your decks</a></li>
                        <li><a href="/"><i className="fa fa-graduation-cap" aria-hidden="true"></i>Your guides</a></li>
                        <li><a href="/"><i className="fa fa-lock" aria-hidden="true"></i>Manage account</a></li>
                    </ul>
                    <a href="/" className="sign-out"><i className="fa fa-power-off" aria-hidden="true"></i> Sign out</a>

                </div>
            </div>
        );
    }
});

var element = document.getElementById('account-nav');
if(element) ReactDOM.render(<AccountNav />, element);