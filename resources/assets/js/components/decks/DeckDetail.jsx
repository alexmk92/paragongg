var React = require('react');
var ReactDOM = require('react-dom');
var CardEffects = require('../cards/CardEffects');
var Helpers = require('../../helpers');
var BuildStats = require('./BuildStats');
var Notification = require('../libraries/notification/Notification');
var BuildPanel = require('./BuildPanel');

var DeckDetail = React.createClass({
    getInitialState: function() {
        return {
            deck : this.props.deck,
            builds: [],
            description: DECK.description,
            selectedBuild : this.props.deck.builds.length > 0 ? this.props.deck.builds[0] : null
        }
    },
    componentWillMount: function() {
        // Replace the current notification panel.
        this.notificationPanel = new Notification();
        this.notificationPanel.initialiseNotifications();
        var newBuilds = this.state.deck.builds.map(function(build) {
            build.slots = build.slots.map(function(slot) {
                if(slot.card) {
                    slot.card = this.getCard(slot.card);
                    slot.upgrades = slot.upgrades.map(function(upgradeSlot) {
                        if(upgradeSlot.card) {
                            upgradeSlot.card = this.getCard(upgradeSlot.card);
                        }
                        return upgradeSlot;
                    }.bind(this));
                }
                return slot;
            }.bind(this));
            return build;
        }.bind(this));

        this.setState({ builds: newBuilds });
    },
    setFooterHeight: function() {
        var footer = document.querySelector("footer");
        var sidebar = document.querySelector(".sidebox");
        if(footer && sidebar) {
            var newBottom = sidebar.getBoundingClientRect().bottom;
            var footerHeight = footer.getBoundingClientRect().height;
            footer.style.top = ((newBottom + footerHeight)) + "px";
        } else {
            footer.style.top = "100%";
        }
    },
    getCard: function(cardCode) {
        var cardToReturn = null;
        DECK.cards.all.some(function(card) {
            if(card.code === cardCode) {
                cardToReturn = card;
                return true;
            }
            return false;
        });
        return cardToReturn;
    },
    upvoteDeck: function() {
        if(AUTHED) {
            var newDeck = this.state.deck;
            Helpers.ajax({
                type : "POST",
                url :  "/api/v1/vote",
                headers : [{ "X-CSRF-TOKEN" : csrf }],
                contentType: "application/x-www-form-urlencoded",
                cache: false,
                returnType: "json",
                data: [{ "ref_id" : newDeck._id, "type" : "deck" }]
            }).then(function(payload) {
                newDeck.voted = payload.data.voted;
                newDeck.votes = payload.data.value;
                this.setState({ deck : newDeck });
            }.bind(this), function(err) {
                console.log("ERROR WHEN UPVOTING: ", err);
            });
        } else {
            this.notificationPanel.addNotification('warning', 'Sorry, you must be logged in to up-vote a deck.');
        }
    },
    selectedBuildUpdated: function(newSelectedBuild) {
        this.setState({ selectedBuild: newSelectedBuild });  
    },
    render: function() {
        return (
            <div>
                <div id="deck-info">
                    <div id="hero-avatar">
                        <img src={ Helpers.getHeroImageURL(this.state.deck.hero)} alt={this.state.deck.hero.name} />
                    </div>
                    <div id="title-wrapper">
                        <h2>{this.state.deck.title}</h2>
                        <p>{this.state.deck.description}</p>
                    </div>
                    <div id="vote-wrapper">
                        <i className={"fa fa-star " + (this.state.deck.voted ? "active" : "")} onClick={this.upvoteDeck}></i> <span>{this.state.deck.votes || 0}</span>
                    </div>
                </div>

                <BuildPanel builds={this.state.builds} onSelectedBuildChanged={this.selectedBuildUpdated} />

                <BuildStats requireModuleDependencies={false} selectedBuild={this.state.selectedBuild} hero={this.state.deck.hero} cards={this.state.deck.cards} builds={this.state.builds} />
            </div>
        );
    }
});

var element = document.querySelector("#deck-container");
if(element) ReactDOM.render( <DeckDetail deck={ DECK } />, element);

