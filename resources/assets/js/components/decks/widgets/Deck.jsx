var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../../helpers');
var Toptip = require('../../libraries/tooltip/Toptip');
var CardEffects = require('../../cards/CardEffects');

// this will eventually be the side bar
var Deck = React.createClass({
    componentDidMount: function() {
        this.tooltip = this.props.sharedTooltip;
    },
    /* TOOLTIP METHODS */
    setTooltipContent: function(card) {
        if(card)
        {
            var content = (
                <div className="pgg-tooltip pgg-tooltip-card">
                    <div className="card-head">
                        <span className="cost">{card.cost}</span>
                        <div className="header">
                            <span className="name">{card.name}</span>
                            <span className={"rarity rarity-" + card.rarity.toLowerCase()}>{card.rarity}</span>
                            <span className="type">{card.type}</span>
                        </div>
                        <i className={"affinity affinity-color pgg pgg-affinity-" + card.affinity.toLowerCase()}></i>
                    </div>
                    <div className="content">
                        <CardEffects card={card} />
                    </div>
                </div>
            );
            var tooltip = document.getElementById("toptip");
            ReactDOM.render(content, tooltip);
        } else {
            this.hideTooltip();
        }
    },
    showTooltip: function(card) {
        if(card) {
            this.tooltip.showTooltip();
        }
    },
    hideTooltip: function() {
        this.tooltip.hideTooltip();
    },
    renderCards: function(type) {
        if(typeof this.props.deck.cards[type] !== "undefined" && this.props.deck.cards[type].length > 0) {
            return this.props.deck.cards[type].map(function(card) {
                var background = { backgroundImage : 'url(' + card.images.large + ')'};
                return (
                    <li style={background}
                        key={"deck-item-" + card.code }
                        onMouseEnter={this.setTooltipContent.bind(this, card)}
                        onMouseOver={this.showTooltip}
                        onMouseLeave={this.hideTooltip}
                    >
                        <div className="wrapper">
                            <span className="count">{ card.quantity }x</span>
                            <span className="name">{ card.name }</span>
                            <span className="cost">{ card.cost }CP</span>
                        </div>
                    </li>
                )
            }.bind(this))
        } else {
            return (
                <li>
                    <div className="wrapper">
                        <span>No cards of this type have been added.</span>
                    </div>
                </li>
            )
        }
    },
    render: function() {
        return (
            <div className="sidebox panel cf">
                <div className="title-wrapper">
                    <h3>DECK</h3>
                    <span className="subtext">{ this.props.deck.totalCards }/40 CARDS</span>
                </div>
                <span className="subtext">PRIME HELIX</span>
                <ul className="deck-list">
                    { this.renderCards("prime") }
                </ul>
                <span className="subtext">EQUIPMENT</span>
                <ul className="deck-list">
                    { this.renderCards("equipment") }
                </ul>
                <span className="subtext">UPGRADE</span>
                <ul className="deck-list">
                    { this.renderCards("upgrades") }
                </ul>
            </div>
        );
    }
});

module.exports = Deck;