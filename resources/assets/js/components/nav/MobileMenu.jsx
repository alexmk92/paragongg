var React = require('react');
var ReactDOM = require('react-dom');

var MobileMenu = React.createClass({
    getInitialState: function() {
        return {
            active: false,
            panel: document.getElementById('nav-links')
        }
    },
    toggleMenu: function() {
        this.setState({active: !this.state.active});
    },
    toggleIcon: function() {
        if(this.state.active) {
            return "fa fa-times";
        }
        return "fa fa-bars";
    },
    render: function() {
        this.state.panel.className = this.state.active ? 'active' : '';
        return(
            <div onClick={this.toggleMenu}>
                <i className={this.toggleIcon()} aria-hidden="true"></i>
            </div>
        )
    }
});

var element = document.getElementById('mobile-menu');
if(element) ReactDOM.render(<MobileMenu/>, element);
