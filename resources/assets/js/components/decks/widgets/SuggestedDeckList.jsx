var React = require('react');
var ReactDOM = require('react-dom');

var SuggestedDeckList = React.createClass({
    renderDeckList: function() {
        if(DECKS.length > 0) {
            return DECKS.map(function(deck) {
                return (
                    <li className="suggested-deck">
                        HI
                    </li>
                );
            });
        }
    },
    render: function() {
        console.log(DECKS);
        return(
            <ul className="suggested-list">
                {this.renderDeckList()}
            </ul>
        )
    }
});

module.exports = SuggestedDeckList;

var element = document.querySelector("#suggested-decks");
if(element) ReactDOM.render( <SuggestedDeckList decks={DECKS} />, element);