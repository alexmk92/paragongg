var React = require('react');
var ReactDOM = require('react-dom');
var Helpers  = require('../helpers');

var AccountNav = React.createClass({
    getInitialState: function() {
        return {
            username: this.props.username,
            userid: this.props.userid,
            avatar: this.props.avatar || null,
            //amber: this.props.amber,
            //achievements: 1365,
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
    getAvatar: function() {
        var $avatar = '/assets/images/avatar.png';
        if(this.state.avatar != null) {
            $avatar = Helpers.S3URL() + 'images/users/' + this.state.userid + '/avatars/' + this.state.avatar;
        }
        return $avatar;
    },
    render: function() {
        var isAdmin, isMod = false;
        if(this.isMod()) {
            isMod = <li><hr className="slim"/><a href="/moderation"><i className="fa fa-gavel" aria-hidden="true"></i>Moderation</a></li>;
        }
        if(this.isAdmin()) {
            isAdmin = <li><a href="/admin"><i className="fa fa-wrench" aria-hidden="true"></i>Administration</a></li>;
        }
        return(
            <div className="account-dropdown">
                <div className="account-nav-trigger" onClick={this.showContent}>

                    <img className="account-avatar" src={this.getAvatar()} alt="Your avatar" />
                    <span>{this.state.username}</span>
                    {/*<span className="account-amber"><i className="pgg pgg-amber" aria-hidden="true"></i>{this.state.amber}</span>*/}
                    <i className="fa fa-caret-down" aria-hidden="true"></i>

                </div>
                <div className={this.isActive()}>
                    <ul className="account-properties">
                        <li><a href={"/users/" + this.state.username.toLowerCase()}><i className="fa fa-user" aria-hidden="true"></i>View profile</a></li>
                        <li><a href="/account/guides"><i className="fa fa-blind" aria-hidden="true"></i>Your guides</a></li>
                        <li><a href="/account/decks"><i className="fa fa-book" aria-hidden="true"></i>Your decks</a></li>
                        {/*<li><a href="/account/achievements"><i className="fa fa-trophy" aria-hidden="true"></i>Achievements</a></li>*/}
                        {/*<li><a href="/account/store"><i className="pgg pgg-amber" aria-hidden="true"></i>Store</a></li>*/}
                        <li><a href="/account"><i className="fa fa-cog" aria-hidden="true"></i>Settings</a></li>
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
if(element) ReactDOM.render(<AccountNav username={element.dataset.username} userid={element.dataset.userid} avatar={element.dataset.avatar} amber={element.dataset.amber} mod={element.dataset.mod} admin={element.dataset.admin}/>, element);
