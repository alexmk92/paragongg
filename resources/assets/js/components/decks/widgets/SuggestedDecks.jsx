var React = require('react');

var SuggestedDecks = React.createClass({
    render: function() {
        return(
            <div className="sidebox panel cf">
                <div className="title-wrapper">
                    <h3>OTHER { this.props.hero.name } DECKS</h3>
                </div>

                <ul className="other-decks-list">

                </ul>
            </div>
        );
    }
});

module.exports = SuggestedDecks;