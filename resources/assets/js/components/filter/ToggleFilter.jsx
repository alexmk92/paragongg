var React = require('react');

var ToggleFilter = React.createClass({
    getInitialState: function() {
        return {
            isActive: this.props.active
        }
    },
    toggled: function() {
        this.setState({ isActive : !this.state.isActive });
        this.props.onToggleFilterChanged(!this.state.isActive, this.props.targetObject);
    },
    render: function() {
        var active = this.state.isActive ? "active" : "";
        return(
            <div className={"toggle-filter " + ( this.props.parentClassName || "" )} onClick={this.toggled}>
                <label>{ this.props.label }</label>
                <i className={ this.props.className + " " + active}></i>
                <div className={ "underline " + active }></div>
            </div>
        );
    }
});

module.exports = ToggleFilter;
