var React = require('react');

var Tab = React.createClass({
    render: function() {
        var className = "Tabbable__Tab";
        if(this.props.selected == this.props.reactKey) {
            className += " selected";
        }
        return (
            <li className={className} onClick={this.props.onSelect}>
                {this.props.title}
            </li>
        )
    }
});

module.exports = Tab;