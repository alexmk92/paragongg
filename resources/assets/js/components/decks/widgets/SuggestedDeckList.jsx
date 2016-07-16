var React = require('react');
var ReactDOM = require('react-dom');
var PreloadImage = require('../../PreloadImage');
var Helpers = require('../../../helpers');

var SuggestedDeckList = React.createClass({
    getCardTotal: function(deck) {
        var total = 0;
        deck.cards.all.forEach(function(card) {
            total += card.quantity;
        });
        return total;
    },
    renderDeckList: function() {
        if(DECKS.length > 0) {
            return DECKS.map(function(deck) {
                console.log(deck);
                return (
                    <li className="suggested-deck">
                        <PreloadImage src={Helpers.getHeroImageURL(deck.hero)} fallbackSrc="/assets/images/heroes/null.png" />
                        <h3><a href={"/decks/" + deck._id + "/" + deck.slug}>{deck.title}</a></h3>
                        <span>{this.getCardTotal(deck)} Cards</span>
                        <span>{deck.builds.length} Builds</span>
                    </li>
                );
            }.bind(this));
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