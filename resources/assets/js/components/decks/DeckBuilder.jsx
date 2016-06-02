var React = require('react');
var ReactDOM = require('react-dom');
var CardsFeed = require('../cards/CardsFeed');
var Helpers = require('../../helpers');

var DeckBuilderBuilds = require("./DeckBuilderBuilds");
var CardModal         = require("../cards/CardModal");

var DeckBuilder = React.createClass({
    getInitialState: function(){
        return {
            deck: [],
            builds: [],
            modal: false,
            cardSelected: false,
            lastSelectedCard: null
        }
    },
    addCard: function(selectedCard) {
        if(this.deckCount() < 40) {
            if(!selectedCard.quantity)
                selectedCard.quantity = 1;
            var newDeck = [];
            var foundCard = false;
            this.state.deck.forEach(function(card) {
                if(selectedCard.code === card.code) {
                    foundCard = true;
                    card.quantity++;
                }
                newDeck.push(card);
            }.bind(this));
            if(newDeck.length === 0 || !foundCard) {
                newDeck.push(selectedCard);
            }
            this.setState({
                deck : newDeck,
                lastSelectedCard : selectedCard
            });
        }
    },
    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    },
    deckCount: function() {
        var count = 0;
        this.state.deck.forEach(function(card) {
            count += card.quantity;
        });
        return count;
    },
    toggleModal: function() {
        var modal = this.state.modal ? false : true;
        this.setState({modal: modal});
    },
    selectCard: function(card) {
        if(this.state.cardSelected && this.state.cardSelected.code == card.code) {
            this.setState({cardSelected: false});
        } else {
            this.setState({cardSelected: card});
        }
    },
    render: function() {
        var cardList = this.state.deck.map(function(card) {
            var className = "";
            var childClassName = "";
            if(this.state.lastSelectedCard.code === card.code) {
                className += "pulse-card-outer";
                childClassName += "pulse-card-inner";
            }
            if(this.state.cardSelected.code == card.code) {
                className += " selected";
            }
            return (
                <li className={className}
                    key={card.code + "_" + Helpers.uuid() }
                    style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/'+card.code+'/icon.png)'}}
                    onClick={this.selectCard.bind(this, card)}>
                    <div className={ "wrapper " + childClassName }>
                        <span className="count">{card.quantity }x</span>
                        <span className="name">{card.name}</span>
                        <span className="cost">{card.cost} CP</span>
                    </div>
                </li>
            );

        }.bind(this));
        if(cardList.length === 0) {
            cardList.push(
                <li key="no_cards">
                    <div className="wrapper">
                        <span>To get started, select a card from the cards menu</span>
                    </div>
                </li>
            );
        }
        return (
            <div>
                <div id="sidebar">
                    <div className="sidebox panel cf">
                        <h4>Current Deck <span className="deck-total">{this.deckCount()}/40 Cards</span></h4>
                        <ul className="deck-list">
                            {cardList}
                        </ul>
                    </div>
                </div>
                <div className="deck-builder wrapper">
                    <div className="content-wrapper">
                        <span className="breadcrumb">Build a deck</span>
                        <div className="deck-title">
                            <input className="h2" placeholder="Enter deck name..." />
                            <button name="publish" type="submit" className="btn"><i className="fa fa-check" aria-hidden="true"></i> SAVE DECK</button>
                        </div>
                        <div className="p">
                            Write a short description about your deck. What team compositions might you use this deck against? Under what situations would you use the different builds? Click here to edit the description text.
                        </div>
                        <div id="cards-feed">
                            <CardsFeed cards={CARDS} cardsRedirectOnClick={false} onCardClicked={this.addCard} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

var element = document.querySelector('#deck-builder');
if(element) ReactDOM.render(<DeckBuilder />, element);