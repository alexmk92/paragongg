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
        if(!Helpers.isNullOrUndefined(this.props.deck.affinities)) {
            var total = 0;
            this.props.deck.affinities.forEach(function(affinityInfo) {
                total += affinityInfo.count;
            });
            this.props.deck.affinities.sort(function(a, b) {
                if (a.count > b.count)
                    return -1;
                if (a.count < b.count)
                    return 1;
                return 0;
            });

            // find the width of each bar
            return this.props.deck.affinities.map(function(affinityInfo) {
                var percentage = ((affinityInfo.count / total) * 100) + "%";
                var affinityClass = "segment " + affinityInfo.name.toLowerCase().trim();
                return (
                    <div key={ "affinity-bar-" + Helpers.uuid() } style={{ width : percentage }} className={ affinityClass }></div>
                )
            });
        }
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
            return <span className="stat featured">Featured</span>;

        var recentUpdatedTimeDiff = Math.abs(updated_at.getTime() - new Date().getTime());
        var recentUpdatedDiffDays = Math.ceil(recentUpdatedTimeDiff / (1000 * 3600 * 24));

        if(updated_at.getTime() > created_at.getTime() && (recentUpdatedDiffDays >= 0 && recentUpdatedDiffDays <= 10))
            return <span className="stat updated">Recently Updated</span>;

        var timeDiff = Math.abs(created_at.getTime() - new Date().getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if(diffDays >= 0 && diffDays < 7)
            return <span className={"stat new"}>New</span>;

        return "";
    },
    getCardTotal: function() {
        var total = 0;
        this.props.deck.cards.all.forEach(function(card) {
            total += card.quantity;
        });
        return total;
    },
    getTimeLabel: function() {
        var created_at = new Date(this.props.deck.created_at);
        var updated_at = new Date(this.props.deck.updated_at);

        return updated_at.getTime() > created_at.getTime() ? "last updated" : "created";
    },
    render: function() {
        var userVoted = this.props.deck.voted ? "active" : "";
        return (
            <div className="deck-preview-wrapper">
                <a className="deck-preview cf" href={"/decks/" + this.props.deck._id + "/" + this.props.deck.slug}>
                    <div className="deck-hero">
                        <PreloadImage src={ Helpers.S3URL() + "images/heroes/" + this.props.deck.hero.code + "/" + this.props.deck.hero.image + "/portrait_small.png" }
                                      fallbackSrc="assets/images/heroes/null.png"
                        />
                    </div>
                    <div className="deck-details">
                        <div className="title"><h3>{ this.props.deck.title }</h3></div>
                        <div className="details">
                            <span className="emphasis">{ this.props.deck.hero.name }</span> deck by <span className="emphasis">{ this.props.deck.author ? this.props.deck.author.username : "anonymous" }</span> { this.getTimeLabel() } <span className="emphasis">{ Helpers.prettyDate(this.props.deck.updated_at) }</span>
                        </div>
                        <div className="stats">
                            { this.getStatLabel() }
                            <span className="stat"><i className="fa fa-star" aria-hidden="true"></i> { this.props.deck.votes }</span>
                            <span className="stat"><i className="fa fa-eye" aria-hidden="true"></i> { this.props.deck.views }</span>
                        </div>
                    </div>
                </a>
                <div className="affinity-bar">
                    { this.renderAffinityBar() }
                </div>
            </div>
        );
    }
});

module.exports = DeckPreview;
