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
            selectedBuild : null
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextState.selectedBuild !== this.state.selectedBuild)
            return true;
        if(nextState.builds.length !== this.state.builds.length)
            return true;
        return this.state !== nextState;
    },
    componentWillMount: function() {
        // Replace the current notification panel.
        this.notificationPanel = new Notification();
        this.notificationPanel.initialiseNotifications();
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
    buildsUpdated: function(newSelectedBuild, newBuilds ) {
        this.setState({ selectedBuild: newSelectedBuild, builds : newBuilds });
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
                </div>

                <BuildPanel deck={DECK}
                            onSelectedBuildChanged={this.buildsUpdated}
                            onBuildsUpdated={this.buildsUpdated}
                />

                <BuildStats requireModuleDependencies={false} selectedBuild={this.state.selectedBuild} hero={this.state.deck.hero} cards={this.state.deck.cards} builds={this.state.builds} />
            </div>
        );
    }
});

var element = document.querySelector("#deck-container");
if(element) ReactDOM.render( <DeckDetail deck={ DECK } />, element);

