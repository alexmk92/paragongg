var React = require('react');
var ReactDOM = require('react-dom');
var Helpers    = require('../../helpers');
var DeckPreview = require('./DeckPreview');
var Tooltip = require('../libraries/tooltip/Toptip');
var Notification = require('../libraries/notification/Notification');

var DeckList = React.createClass({
    getInitialState: function() {
        return {
            decks: []
        }
    },
    componentWillMount: function() {
        this.tooltip = new Tooltip();
        this.setState({ decks : DECKS })

        // Bind scroll event
        window.addEventListener('scroll', this.handleScroll);
    },
    componentDidMount: function() {
        // Replace the current notification panel.
        this.notificationPanel = new Notification();
        this.notificationPanel.initialiseNotifications();
    },
    getResults: function() {
        Helpers.ajax({
            url: '/api/v1/decks'
        }).then(function(data) {
            console.log(data);
        }, function(err) {
            console.log(err);
        });
    },
    handleScroll: function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.getResults();
        }
    },
    upvoteDeck: function(deck) {
        if(AUTHED) {
            Helpers.ajax({
                type : "POST",
                url :  "/api/v1/vote",
                headers : [{ "X-CSRF-TOKEN" : csrf }],
                contentType: "application/x-www-form-urlencoded",
                cache: false,
                returnType: "json",
                data: [{ "ref_id" : deck._id, "type" : "deck" }]
            }).then(function(payload) {
                console.log("PAYLOAD IS: ", payload);
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
        } else {
            this.notificationPanel.addNotification('warning', 'Sorry, you must be logged in to up-vote a deck.');
        }
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