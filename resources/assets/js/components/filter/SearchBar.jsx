var React = require('react');
var Helpers = require('../../helpers');

var SearchBar = React.createClass({
    getInitialState : function() {
        return {
            searchTerm : ""
        }
    },
    updateSearchTerm : function() {
        var value = this.refs.searchBarInput.value;
        if(typeof value !== "undefined" && value.length < 60) {
            this.setState({ searchTerm : value });
            this.props.onSearchTermChanged(value);
        }
    },
    render : function() {
        var searchTermChanged = Helpers.debounce(function() {
            this.updateSearchTerm();
        }.bind(this), 150);
        var isActiveClass = typeof this.props.isInputActive !== 'undefined' && this.props.isInputActive === true ? ' input-active' : '';
        return (
            <div className="search-bar-wrapper">
                <label>{ this.props.label }</label>
                <input placeholder={this.props.placeholder || "Enter search term..."}
                       ref="searchBarInput"
                       className={"search-bar " + isActiveClass}
                       type="text"
                       defaultValue={this.state.searchTerm}
                       onChange={searchTermChanged}
                       onFocus={this.props.onGotFocus}
                       onBlur={this.props.onLostFocus}
                />
            </div>
        );
    }
});

module.exports = SearchBar;