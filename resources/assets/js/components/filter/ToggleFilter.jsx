var React = require('react');

var ToggleFilter = React.createClass({
    getInitialState: function() {
        return {
            isActive: false
        }
    },
    toggled: function() {
        this.setState({ isActive : !this.state.isActive });
        this.props.onToggleFilterChanged(!this.state.isActive, this.props.affinity);
    },
    render: function() {
        var active = this.state.isActive ? "active" : "";
        return(
            <div className="toggle-filter" onClick={this.toggled}>
                <i className={ "fa fa-trophy affinity-" + this.props.affinity.name.toLowerCase() }></i>
                <div className={ "underline " + active }></div>
            </div>
        );
    }
});

module.exports = ToggleFilter;