var React = require('react');

var TabPanel = React.createClass({
    render: function() {
        if(this.props.selected == this.props.reactKey) {
            return (
                <div className="Tabbable__TabPanel">
                    {this.props.children}
                </div>
            )
        }
        return false;
    }
});

module.exports = TabPanel;