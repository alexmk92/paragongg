var React = require('react');
var Helpers = require('../../helpers');

var DropDown = React.createClass({
    getInitialState: function() {
        return {
            isVisible: false,
            hasDismissEventListener: false
        };
    },
    optionClicked: function(option) {
        option.checked = !option.checked;
        this.props.onOptionChanged(option);
        this.forceUpdate();
    },
    // If the body is clicked anywhere but this element, then dismiss
    dismissMenuOnElementClick: function(event) {
        var elem = event.target;
        // Throttle the recursiveness so we dont need to traverse the entire tree
        var iterations = 6;
        var isDropDownMenu = false;
        while(elem.parentNode && iterations > 0) {
            // Check root node first
            if(!Helpers.isNullOrUndefined(elem.className)) {
                if(elem.className === "menu" || elem.className === "menu active" || elem.className.indexOf("button") > -1) {
                    isDropDownMenu = true;
                } else {
                    // Traverse to child node and check for match
                    elem = elem.parentNode;
                    if(!Helpers.isNullOrUndefined(elem.className)) {
                        if(elem.className === "menu" || elem.className === "menu active" || elem.className.indexOf("button") > -1) {
                            isDropDownMenu = true;
                        }
                    }
                }
            }
            iterations--;
        }
        this.setState({ isVisible : isDropDownMenu });
    },
    // Prevent the component re-rendering in an infinite loop.
    shouldComponentUpdate: function(nextProps, nextState) {
       return this.state !== nextState;
    },
    componentDidUpdate: function() {
        if(this.state.isVisible) {
            window.addEventListener('click', this.dismissMenuOnElementClick);
        } else {
            window.removeEventListener('click', this.dismissMenuOnElementClick);
        }
    },
    // Update the visibility of the component
    dropDownClicked: function() {
        // This is a drop down menu
        if(!Helpers.isNullOrUndefined(this.props.options)) {
            this.setState({ isVisible : !this.state.isVisible });
        } else if(!Helpers.isNullOrUndefined(this.props.behavesAsButton) && this.props.behavesAsButton === true) {
            this.props.onButtonClicked();
        }
    },
    renderOptionItem: function(option) {
        if(!Helpers.isNullOrUndefined(option.name)) {
            return (
                <li className={ "cols-" + this.props.columns }
                    key={option.name}
                    onClick={ this.optionClicked.bind(this, option) }
                >
                    <span className={ "option " + (option.checked ? "checked" : "") }>
                        <i className={ "pgg " + option.iconName } />
                        { option.name.toUpperCase() }
                    </span>
                </li>
            );
        }
    },
    renderOptions: function() {
        if(!Helpers.isNullOrUndefined(this.props.options)) {
            var groups = [];
            var isGroupSection = false;

            this.props.options.forEach(function(option) {
                if(option.group) {
                    isGroupSection = true;
                    var group = option.group.map(function(optionGroup) {
                        return this.renderOptionItem(optionGroup);
                    }.bind(this));
                    groups.push(group);
                } else {
                    isGroupSection = false;
                    groups.push(this.renderOptionItem(option));
                }
            }.bind(this));

            if(isGroupSection) {
                return groups.map(function(group, i) {
                    return <ul key={"option_list_" + i}>{group}</ul>
                });
            } else {
                return <ul key={"option_list_1"}>{ groups }</ul>
            }
        }
    },
    render: function() {
        var active = this.state.isVisible ? "active" : "";
        var options = this.renderOptions();
        return (
            <div className="drop-down-menu">
                <label>{ this.props.label }</label>
                <div onClick={ this.dropDownClicked }
                     className={ "button " + this.props.label.toLowerCase() }>
                    <i className={ this.props.buttonIcon } aria-hidden="true"></i>
                </div>
                <div className={ "menu " + active }>
                    <div className="tooltip-triangle"></div>
                    <div className="title">
                        <span>{ this.props.title }</span>
                        <div className="divider"></div>
                    </div>
                    { options }
                </div>
            </div>
        );
    }
});

module.exports = DropDown;

/*
 <div className="menu">
 <p>Im a menu item</p>
 </div>
 */
