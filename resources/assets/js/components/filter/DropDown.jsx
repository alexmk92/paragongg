var React = require('react');

var DropDown = React.createClass({
    getInitialState: function() {
        return {
            isVisible: false
        };
    },
    optionClicked: function(option) {
        option.checked = !option.checked;
        this.props.onOptionChanged(option);
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