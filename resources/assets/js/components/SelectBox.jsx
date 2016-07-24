var React = require('react');
var Helpers = require('../helpers');

var SelectBox = React.createClass({
    getInitialState: function() {
        return {
            isMenuVisible: false
        }
    },
    componentWillMount: function() {
        if(Helpers.isClientMobile()) {
            this.setState({ isMenuVisible : false });
        }
    },
    toggleMenu: function() {
        this.setState({ isMenuVisible : !this.state.isMenuVisible });
    },
    rowSelected: function(selectedIndex) {
        this.props.optionSelectedAtIndex(selectedIndex);
    },
    renderItems: function() {
        if(this.props.items) {
            return this.props.items.map(function(value, index) {
                return (
                    <li key={"option-" + value.label}
                        onClick={ this.rowSelected.bind(this, index) }
                    >
                        { value.label }
                    </li>
                );
            }.bind(this));
        }
    },
    render: function() {
        return (
            <div className="select-menu" onClick={this.toggleMenu}>
                <span>{this.props.label} <span className="value-label">{this.props.value}</span> <i className="fa fa-sort-down"></i></span>
                <ul className={"menu" + ((this.state.isMenuVisible === true) ? " active" : "")}>
                    { this.renderItems() }
                </ul>
            </div>
        );
    }
});

module.exports = SelectBox;