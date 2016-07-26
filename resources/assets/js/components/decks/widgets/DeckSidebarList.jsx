var React       = require('react');
var ReactDOM    = require('react-dom');
var Helpers     = require('../../../helpers');
var Toptip      = require('../../libraries/tooltip/Toptip');
var CardEffects = require('../../cards/CardEffects');

// this will eventually be the side bar
var DeckSidebarList = React.createClass({
    getInitialState: function() {
        return {
            cards : this.props.deck.cards
        }
    },
    componentDidMount: function() {
        this.tooltip = this.props.sharedTooltip || new Toptip();
    },
    componentWillMount: function() {
        var newCards = {
            all : this.sortCards('all'),
            upgrades : this.sortCards('upgrades'),
            equipment : this.sortCards('equipment'),
            prime : this.sortCards('prime')
        };
        this.setState({ cards : newCards });
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.deck !== this.props.deck) {
            this.setState({ cards : nextProps.deck.cards });
        }
    },
    sortCards: function(type) {
        console.log(type);
        console.log(this.props.deck.cards);
        var newCards = this.props.deck.cards[type].sort(function(a, b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });

        return newCards;
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
    selectCard: function(card) {
        if(Helpers.isNullOrUndefined(this.props.implementsDelegate) || this.props.implementsDelegate === false) return true;
        this.props.onCardSelected(card);
    },
    deleteCard: function(card, event) {
        if(Helpers.isNullOrUndefined(this.props.implementsDelegate) || this.props.implementsDelegate === false) return true;
        event.preventDefault();
        this.props.onCardDeleted(card);
    },
    renderDeleteDetail: function(card) {
        if(!Helpers.isNullOrUndefined(this.props.implementsDelegate)) {
            return (
                <div className="delete-icon" onClick={this.deleteCard.bind(this, card)}>
                    <i className="fa fa-trash" aria-hidden="true" />
                </div>
            )
        }
    },
    renderCards: function(type) {
        var hidden = false;
        if(typeof this.state.cards[type] !== "undefined" && this.props.deck.cards[type].length > 0 && !hidden) {
            return this.state.cards[type].map(function(card) {
                if(!Helpers.isNullOrUndefined(this.props.implementsDelegate) && !Helpers.isNullOrUndefined(card.hidden)) {
                    hidden = card.hidden;
                }
                var background = { backgroundImage : 'url(' + Helpers.getCardImageURL(card, "medium", "icon") + ')'};
                return (
                    <li style={background}
                        key={"deck-item-" + card.code }
                        onMouseEnter={this.setTooltipContent.bind(this, card)}
                        onMouseOver={this.showTooltip}
                        onMouseLeave={this.hideTooltip}
                        onContextMenu={this.deleteCard.bind(this, card)}
                        onClick={this.selectCard.bind(this, card)}
                    >
                        <div className="wrapper">
                            <span className="count">{ card.quantity }x</span>
                            <span className="name">{ card.name }</span>
                            <span className="cost">{ card.cost }CP</span>
                        </div>
                        { this.renderDeleteDetail(card) }
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
    renderTitleAndExportOptions: function() {
        if(!Helpers.isNullOrUndefined(this.props.hasTitleAndExportOptions)) {
            if(this.props.hasTitleAndExportOptions === false) return '';
        }
        return (
            <div className="title-wrapper">
                {this.props.title ? <h4>{this.props.title}</h4> : <h4>Deck</h4>}
                <a href={"/decks/export/" + this.props.deck._id} className="btn btn-primary btn-half btn-margin-bottom" title="Export this deck to your Paragon account"><i className="fa fa-upload" aria-hidden="true"></i> Export deck</a>
                <a className="btn btn-faded btn-half btn-margin-bottom" title="Make a copy of this deck to edit on Paragon.gg"><i className="fa fa-clone" aria-hidden="true"></i> Make a copy</a>
                <span className="subtext">{ this.props.deck.cards.all.length }/40 CARDS</span>
            </div>
        )
    },
    render: function() {
        return (
            <div className="cf">
                { this.renderTitleAndExportOptions() }
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

var element = document.querySelector("#deck-sidebar-list");
if(element) ReactDOM.render( <DeckSidebarList deck={DECK} sharedTooltip={window.tooltip} title={element.dataset.title}/>, element);
