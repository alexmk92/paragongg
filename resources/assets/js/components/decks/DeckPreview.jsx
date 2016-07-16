var React = require('react');
var Helpers = require('../../helpers');
var Tooltip = require('../libraries/tooltip/Toptip');
var ReactDOM = require('react-dom');
var CardEffects = require('../cards/CardEffects');
var PreloadImage = require('../PreloadImage');

var DeckPreview = React.createClass({
    getInitialState: function() {
        return {
            deckURL : '/decks/' + this.props.deck._id + '/' + this.props.deck.slug
        }
    },
    componentDidMount: function() {
        this.tooltip = this.props.sharedTooltip || new Tooltip();
    },
    setTooltipContent: function(card) {
        if(card) {
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
        }
    },
    showTooltip: function() {
        this.tooltip.showTooltip();
    },
    hideTooltip: function() {
        this.tooltip.hideTooltip();
    },
    renderAffinityBar: function() {
        // this will compute card %age and then set color accordingly
        var cardCounts = [];
        var total = 0;
        this.props.deck.cards.all.forEach(function(card){
            if(card) {
                if(cardCounts.length === 0 ){
                    total += card.quantity;
                    cardCounts.push({ affinity : card.affinity, value : card.quantity });
                } else {
                    var affinityFound = false;
                    var existingObject = null;
                    cardCounts.forEach(function(cardObject) {
                        if(cardObject.affinity === card.affinity && !affinityFound) {
                            affinityFound = true;
                        }
                    });
                    if(!affinityFound) {
                        total += card.quantity;
                        cardCounts.push({ affinity : card.affinity, value : card.quantity });
                    }
                }
            }
        }.bind(this));
        cardCounts.sort(function(a, b) {
            if (a.value > b.value)
                return -1;
            if (a.value < b.value)
                return 1;
            return 0;
        });

        // find the width of each bar
        var bars = cardCounts.map(function(affinityInfo, i) {
            var percentage = ((affinityInfo.value / total) * 100) + "%";
            var affinityClass = "bar bar-color-" + affinityInfo.affinity.toLowerCase().trim();
            return (
                <div key={ "affinity-bar-" + Helpers.uuid() }style={{ width : percentage }} className={ affinityClass }></div>
            )
        });

        return bars;
    },
    upvoteDeck: function() {
        this.props.onDeckUpvoted(this.props.deck);
    },
    renderDeckPreview: function() {
        var sortedCards = [];
        this.props.deck.cards.all.forEach(function(card) {
            if(card) {
                //card.quantity = 1;
                card.borderColor = card.affinity.toLowerCase();
                if(sortedCards.length === 0) {
                    sortedCards.push(card);
                } else {
                    var cardExists = false;
                    sortedCards.forEach(function(newCard) {
                        if(card.code === newCard.code) {
                            newCard.quantity++;
                            cardExists = true;
                        }
                    });
                    if(!cardExists) {
                        sortedCards.push(card);
                    }
                }
            }
        }.bind(this));
        return (
            <div className="deck-preview-wrapper">
                <ul className="deck-preview">
                    {
                        sortedCards.map(function (card) {
                            if(card) {
                                return (
                                    <li onMouseEnter={this.setTooltipContent.bind(this, card)}
                                        onMouseOver={this.showTooltip}
                                        onMouseLeave={this.hideTooltip}
                                        key={ "deck-card-" + Helpers.uuid() }
                                    >
                                        <div className="black-overlay"></div>
                                        <div className={ "card-quantity " + card.borderColor }>{ card.quantity }</div>
                                        <div className="card-preview-container">
                                            <PreloadImage src={ Helpers.getCardImageURL(card, 'small', 'icon') }
                                                          placeholderSrc="/assets/images/card-placeholder.png"
                                                          fallbackSrc="/assets/images/card-placeholder.png"
                                            />
                                        </div>
                                    </li>
                                );
                            }
                            return "";
                        }.bind(this))
                    }
                </ul>
            </div>
        )

    },
    getStatLabel: function() {
        // TODO Check to see if the created_at date is today
        var created_at = new Date(this.props.deck.created_at);
        var updated_at = new Date(this.props.deck.updated_at);

        if(this.props.featured === 1)
            return <span className="badge featured">Featured</span>

        var timeDiff = Math.abs(created_at.getTime() - updated_at.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if(updated_at.getTime() > created_at.getTime() && (diffDays > 0 && diffDays < 10)) {
            return <span className="badge updated">Recently Updated</span>
        }

        if(diffDays === 0 && diffDays < 7) {
            return (
                <span className={"badge new"}>New</span>
            );
        }

        return '';
    },
    getCardTotal: function() {
        var total = 0;
        this.props.deck.cards.all.forEach(function(card) {
            total += card.quantity;
        });
        return total;
    },
    render: function() {
        var userVoted = this.props.deck.voted ? "active" : "";
        return (
            <li className="deck-preview-container">
                <div className="hero-portrait">
                    <PreloadImage src={ Helpers.getHeroImageURL(this.props.deck.hero) } />
                </div>

                <div className="title-wrapper">
                    <h3><a href={this.state.deckURL}>{ this.props.deck.title }</a></h3>
                    <span className="author">{ this.getStatLabel() }<span className="subtext">Published by</span> <a href="#">{ this.props.deck.author ? this.props.deck.author.username : "anonymous" }</a></span>
                </div>

                <div className="build-overview">
                    <span className="large-text">{ this.getCardTotal() }<span className="subtext">CARDS</span></span>
                    <span className="large-text">{ this.props.deck.builds.length }<span className="subtext">BUILDS</span></span>
                </div>

                <div className="mid-section">
                    <div className="votes-panel">
                        <i className={"fa fa-star " + userVoted} onClick={ this.upvoteDeck }></i>
                        <span>{ Helpers.delimitNumbers(this.props.deck.votes || 0) }</span>
                    </div>
                    { this.renderDeckPreview() }
                </div>


                <div className="stat-bar">
                    <div className="buttons-left">
                        <a href="#">SHARE</a>
                    </div>
                    <div className="buttons-right">
                        <span><i className="fa fa-eye"></i> { Helpers.delimitNumbers(this.props.deck.views || 0) }</span>
                    </div>
                </div>
                <div className="black-overlay"></div>
                <div className="affinity-bar">
                    { this.renderAffinityBar() }
                </div>
            </li>
        );
    }
});

module.exports = DeckPreview;
