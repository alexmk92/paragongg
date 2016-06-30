var React = require('react');
var ReactDOM = require('react-dom');
var Helpers    = require('../../helpers');
var DeckPreview = require('./DeckPreview');
var Tooltip = require('../libraries/tooltip/Toptip');

var DeckList = React.createClass({
    getInitialState: function() {
        return {
            decks: []
        }
    },
    componentWillMount: function() {
        this.tooltip = new Tooltip();
        this.setState({ decks : DECKS })
    },
    upvoteDeck: function(deck) {
        console.log("Upvoting deck: ", deck);
        Helpers.ajax({
            type : "POST",
            url :  "/api/v1/vote",
            headers : [{ "X-CSRF-TOKEN" : csrf }],
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            returnType: "json",
            data: [{ "ref_id" : deck._id, "type" : "deck" }]
        }).then(function(payload) {
            deck.voted = payload.data.voted;
            deck.votes = payload.data.value;
            var newDecks = this.state.decks.map(function(oldDeck) {
                if(oldDeck._id === deck._id) {
                    oldDeck = deck;
                }
                return oldDeck;
            });
            this.setState({ decks : newDecks });
        }.bind(this), function(err) {
            console.log("ERROR WHEN UPVOTING: ", err);
        });
    },
    renderDeckList: function() {
        var decks = this.state.decks.map(function(deck) {
            if(!deck.voted) deck.voted = false;
            return (
                <DeckPreview key={Helpers.uuid()}
                             deck={deck}
                             sharedTooltip={this.tooltip}
                             onDeckUpvoted={this.upvoteDeck}
                />
            );
        }.bind(this));

        return decks;
    },
    render: function() {
        console.log("RE RENDERING");
        return(
            <div>
                <h2>Decks index</h2>

                <div id="sidebar">
                    SIDE BAR HERE WITH CREATE DECK BUTTON
                    <a className="btn btn-primary" href="/decks/create">Create a deck</a>
                </div>

                <div id="wrapper">
                    <div id="featured-decks">
                        FEATURED DECKS WOULD GO HERE
                    </div>
                    REST OF DECKS
                    <ul id="main-list">
                        { this.renderDeckList() }
                    </ul>
                </div>
            </div>
        );
    }
});

var element = document.querySelector("#deck-list-wrapper");
if(element) ReactDOM.render( <DeckList />, element);