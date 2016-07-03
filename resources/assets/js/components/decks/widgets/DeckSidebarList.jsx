var React       = require('react');
var ReactDOM    = require('react-dom');
var Helpers     = require('../../../helpers');
var Toptip      = require('../../libraries/tooltip/Toptip');
var CardEffects = require('../../cards/CardEffects');

// this will eventually be the side bar
var DeckSidebarList = React.createClass({
    componentDidMount: function() {
        this.tooltip = this.props.sharedTooltip || new Toptip();
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
                var background = { backgroundImage : 'url(' + Helpers.getCardImageURL(card, "medium", "icon") + ')'};
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
            <div className="cf">
                <div className="title-wrapper">
                    {this.props.title ? <h4>{this.props.title}</h4> : <h4>Deck</h4>}
                    <span className="subtext">{ this.props.deck.cards.all.length }/40 CARDS</span>
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

module.exports = DeckSidebarList;

// Render the main container for this application
var element = document.querySelector("#deck-sidebar-list");
if(element) ReactDOM.render( <DeckSidebarList deck={DECK} sharedTooltip={window.tooltip} title={element.dataset.title}/>, element);



// Render any widgets for the page, we add this here as we dont want
// to override other sidebar instances
// var sidebar = document.querySelector(".sidebar-with-widgets");
// if(sidebar) {
//     var widgets = (
//         <div>
//             <DeckWidget           deck={ DECK }  />
//             <CostCurveWidget      deck={ DECK } animateChart={true} />
//             <SuggestedDecksWidget hero={ DECK.hero } />
//         </div>
//     );
//     ReactDOM.render( widgets, sidebar );
// }
