var React = require('react');
var ReactDOM = require('react-dom');
var Helpers    = require('../../helpers');
var DeckPreview = require('./DeckPreview');
var Tooltip = require('../libraries/tooltip/Toptip');

var DeckList = React.createClass({
    componentWillMount: function() {
        this.tooltip = new Tooltip();
    },
    renderDeckList: function() {
        var decks = DECKS.map(function(deck) {
            console.log(deck);
            return (
                <DeckPreview key={Helpers.uuid()}
                             deck={deck}
                             sharedTooltip={this.tooltip}
                />
            );
        }.bind(this));

        return decks;
    },
    render: function() {
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