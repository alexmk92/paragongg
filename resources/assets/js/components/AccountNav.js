import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class AccountNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            amber: this.props.amber,
            active: false,
            admin: this.props.admin
        }

        this.showContent = this.showContent.bind(this)
    }
    showContent() {
        this.setState({active: !this.state.active})
    }
    isAdmin() {
        return (this.state.admin) ? true : false;
    }
    isActive() {
        return (this.state.active) ? 'account-nav-panel active' : 'account-nav-panel inactive';
    }
    render() {
        //var user = this.props.user;
        var isAdmin = false;
        if(this.isAdmin()) {
            isAdmin = <li><a href="/admin"><i className="fa fa-lock" aria-hidden="true"></i>Administration</a></li>;
        }
        return(
            <div className="account-dropdown">
                <div className="account-nav-trigger" onClick={this.showContent}>

                    <img className="account-avatar" src="https://www.gravatar.com/avatar/d5d3310834b43c6f96e200339734c949?s=20&amp;d=https%3A%2F%2Fparagon.gg%2Fimages%2Fdefault-avatar.png" alt="Your avatar" />
                    <span>{this.state.username}</span>
                    <span className="account-amber"><i className="fa fa-diamond" aria-hidden="true"></i>{this.state.amber}</span>
                    <i className="fa fa-caret-down" aria-hidden="true"></i>

                </div>
                <div className={this.isActive()}>
                    <ul className="account-properties">
                        <li><a href="/users/jamieshepherd"><i className="fa fa-user" aria-hidden="true"></i>View profile</a></li>
                        <li><a href="/account/decks"><i className="fa fa-book" aria-hidden="true"></i>Your decks</a></li>
                        <li><a href="/account/guides"><i className="fa fa-graduation-cap" aria-hidden="true"></i>Your guides</a></li>
                        <li><a href="/account"><i className="fa fa-cog" aria-hidden="true"></i>Manage account</a></li>
                        {isAdmin}
                    </ul>
                    <a href="/logout" className="sign-out"><i className="fa fa-power-off" aria-hidden="true"></i> Sign out</a>

                </div>
            </div>
        )
    }
}

var element = document.getElementById('account-nav');
if(element) ReactDOM.render(<AccountNav username={element.dataset.username} amber={element.dataset.amber} admin={element.dataset.admin}/>, element);
