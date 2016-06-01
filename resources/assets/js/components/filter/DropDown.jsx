var React = require('react');

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
    },
    // If the body is clicked anywhere but this element, then dismiss
    dismissMenuOnElementClick: function(event) {
        var elem = event.target;
        // Throttle the recursiveness so we dont need to traverse the entire tree
        var iterations = 6;
        var isDropDownMenu = false;
        while(elem.parentNode && iterations > 0) {
            // Check root node first
            if(elem.className === "menu" || elem.className === "menu active" || elem.className === "button") {
                isDropDownMenu = true;
            } else {
                // Traverse to child node and check for match
                elem = elem.parentNode;
                if(elem.className === "menu" || elem.className === "menu active" || elem.className === "button") {
                    isDropDownMenu = true;
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
        this.setState({ isVisible : !this.state.isVisible });
    },
    render: function() {
        var active = this.state.isVisible ? "active" : "";
        var options = this.props.options.map(function(option) {
            return (
                <li className={ "cols-" + this.props.columns }
                    key={option.name}>
                    <input type="checkbox"
                           defaultChecked={ option.checked }
                           onChange={function() { this.optionClicked(option) }.bind(this) }
                    />
                    <span>
                        <i className={ "pgg " + option.iconName } />
                        { option.name.toUpperCase() }
                    </span>
                </li>
            );
        }.bind(this));
        return (
            <div className="drop-down-menu">
                <label>{ this.props.label }</label>
                <div className="button"
                     onClick={ this.dropDownClicked }>
                    <span>S</span>
                </div>
                <div className={ "menu " + active }>
                    <div className="tooltip-triangle"></div>
                    <div className="title">
                        <span>{ this.props.title }</span>
                        <div className="divider"></div>
                    </div>
                    <ul>
                        { options }
                    </ul>
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