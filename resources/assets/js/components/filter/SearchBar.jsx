var React = require('react');

var SearchBar = React.createClass({
    getInitialState : function() {
        return {
            searchTerm : ""
        }
    },
    updateSearchTerm : function(e) {
        e.preventDefault();
        var value = e.target.value;
        this.setState({
            searchTerm : value
        });
        this.props.onSearchTermChanged(value);
    },
    render : function() {
        return (
            <div className="search-bar-wrapper">
                <label>{ this.props.label }</label>
                <input placeholder={this.props.placeholder || "Enter search term..."}
                       className="search-bar"
                       type="text"
                       value={this.state.searchTerm}
                       onChange={this.updateSearchTerm}
                />
            </div>
        );
    }
});

module.exports = SearchBar;