var React = require('react');
var ReactDOM = require('react-dom');

var AccountNav = React.createClass({
    getInitialState: function() {
        return {
            username: this.props.username,
            amber: this.props.amber,
            active: false,
            mod: this.props.mod,
            admin: this.props.admin
        }
    },
    showContent: function() {
        this.setState({active: !this.state.active})
    },
    isAdmin: function() {
        return (this.state.admin) ? true : false;
    },
    isMod: function() {
        return (this.state.mod) ? true : false;
    },
    isActive: function() {
        return (this.state.active) ? 'account-nav-panel active' : 'account-nav-panel inactive';
    },
    render: function() {
        //var user = this.props.user;
        var isAdmin, isMod = false;
        if(this.isMod()) {
            isMod = <li><a href="/moderation"><i className="fa fa-check-square" aria-hidden="true"></i>Moderation</a></li>;
        }
        if(this.isAdmin()) {
            isAdmin = <li><a href="/admin"><i className="fa fa-lock" aria-hidden="true"></i>Administration</a></li>;
        }
        return(
            <div className="account-dropdown">
                <div className="account-nav-trigger" onClick={this.showContent}>

                    <img className="account-avatar" src="https://www.gravatar.com/avatar/d5d3310834b43c6f96e200339734c949?s=20&amp;d=https%3A%2F%2Fparagon.gg%2Fimages%2Fdefault-avatar.png" alt="Your avatar" />
                    <span>{this.state.username}</span>
                    <span className="account-amber"><i className="amber-icon" aria-hidden="true"></i>{this.state.amber}</span>
                    <i className="fa fa-caret-down" aria-hidden="true"></i>

                </div>
                <div className={this.isActive()}>
                    <ul className="account-properties">
                        <li><a href="/users/jamieshepherd"><i className="fa fa-user" aria-hidden="true"></i>View profile</a></li>
                        <li><a href="/account/decks"><i className="fa fa-book" aria-hidden="true"></i>Your decks</a></li>
                        <li><a href="/account"><i className="fa fa-cog" aria-hidden="true"></i>Account settings</a></li>
                        {isMod}
                        {isAdmin}
                    </ul>
                    <a href="/logout" className="sign-out"><i className="fa fa-power-off" aria-hidden="true"></i> Sign out</a>

                </div>
            </div>
        )
    }
});

var element = document.getElementById('account-nav');
if(element) ReactDOM.render(<AccountNav username={element.dataset.username} amber={element.dataset.amber} mod={element.dataset.mod} admin={element.dataset.admin}/>, element);
