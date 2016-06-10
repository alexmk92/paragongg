var React = require('react');

var ToggleFilter = React.createClass({
    getInitialState: function() {
        return {
            isActive: this.props.active
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
                <label>{ this.props.label }</label>
                <i className={ "pgg pgg-affinity-" + this.props.affinity.name.toLowerCase() + " affinity-color " + active}></i>
                <div className={ "underline " + active }></div>
            </div>
        );
    }
});

module.exports = ToggleFilter;
