var React = require('react');
var Helpers = require('../../helpers');
var Tooltip = require('../libraries/tooltip/Toptip');
var ReactDOM = require('react-dom');
var CardEffects = require('../cards/CardEffects');

var DeckPreview = React.createClass({
    componentDidMount: function() {
        this.tooltip = this.props.sharedTooltip;
    },
    setTooltipContent: function(card) {
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
        this.props.deck.cards.forEach(function(card){
            if(cardCounts.length === 0 ){
                cardCounts.push({ affinity : card.affinity, value : Number(1) });
            } else {
                var affinityFound = false;
                var existingObject = null;
                cardCounts.forEach(function(cardObject) {
                    if(cardObject.affinity === card.affinity && !affinityFound) {
                        affinityFound = true;
                        existingObject = cardObject;
                    }
                });
                if(affinityFound) {
                    existingObject.value += 1;
                } else {
                    cardCounts.push({ affinity : card.affinity, value : Number(1) });
                }
            }
        });
        cardCounts.sort(function(a, b) {
            if (a.value > b.value)
                return -1;
            if (a.value < b.value)
                return 1;
            return 0;
        });

        // find the width of each bar
        var total = this.props.deck.cards.length;
        var bars = cardCounts.map(function(affinityInfo, i) {
            var percentage = ((affinityInfo.value / total) * 100) + "%";
            var affinityClass = "bar bar-color-" + affinityInfo.affinity.toLowerCase().trim();
            return (
                <div key={ "affinity-bar-" + Helpers.uuid() }style={{ width : percentage }} className={ affinityClass }></div>
            )
        });

        return bars;
    },
    shiftPreviewLeft: function() {
        console.log("SCROLL LEFT");
    },
    shiftPreviewRight: function() {
        console.log("SCROLL RIGHT");
    },
    renderDeckPreview: function() {
        /*
         <div className="slide-left"
         onClick={this.shiftPreviewLeft}
         >
         LEFT ARROW
         </div>
         <div className="slide-right"
         onClick={this.shiftPreviewRight}
         >
         RIGHT ARROW
         </div>
         */
        var sortedCards = [];
        this.props.deck.cards.forEach(function(card) {
            card.quantity = 1;
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
        });
        console.log(sortedCards);
        return (
            <div className="deck-preview-wrapper">
                <ul className="deck-preview">
                    {
                        sortedCards.map(function (card) {
                            return (
                                <li onMouseEnter={this.setTooltipContent.bind(this, card)}
                                    onMouseOver={this.showTooltip}
                                    onMouseLeave={this.hideTooltip}
                                    key={ "deck-card-" + Helpers.uuid() }
                                >
                                    <div className="black-overlay"></div>
                                    <div className={ "card-quantity " + card.borderColor }>{ card.quantity }</div>
                                    <div className="card-preview-container"
                                         style={{backgroundImage : this.getCardBackgroundURL(card)}}>
                                    </div>
                                </li>
                            );
                        }.bind(this))
                    }
                </ul>
            </div>
        )

    },
    renderNewBadge() {
        // TODO Check to see if the created_at date is today
        return (
            <span className="badge new">NEW</span>
        );
    },
    getCardBackgroundURL(card) {
        return 'url(' + card.images.large + ')'
    },
    getRandomBackground: function() {
        var index = Math.floor(Math.random() * ((this.props.deck.cards.length-1) - 0 + 1)) + 0;
        console.log("GETTING BG AT " + index);
        //return { backgroundImage : this.getCardBackgroundURL(this.props.deck.cards[index]) };
    },
    render: function() {
        return (
            <li style={ this.getRandomBackground() } className="deck-preview-container">
                <div className="hero-portrait">
                    <img src={ this.props.deck.hero.avatarURL } />
                </div>

                <div className="title-wrapper">
                    <h3>{ this.props.deck.title }</h3>
                    <span className="author">{ this.renderNewBadge() }<span className="subtext">Published by</span> <a href="#">{ this.props.deck.author.name }</a></span>
                </div>

                <div className="build-overview">
                    <span className="large-text">{ this.props.deck.cards.length }<span className="subtext">CARDS</span></span>
                    <span className="large-text">{ this.props.deck.builds.length }<span className="subtext">BUILDS</span></span>
                </div>



                <div className="mid-section">
                    <div className="votes-panel">
                        <i className="fa fa-star"></i>
                        <span>{ Helpers.delimitNumbers(this.props.deck.upvotes) }</span>
                    </div>
                    { this.renderDeckPreview() }
                </div>


                <div className="stat-bar">
                    <div className="buttons-left">
                        <a href="#">SHARE</a>
                    </div>
                    <div className="buttons-right">
                        <span><i className="fa fa-comment"></i> { Helpers.delimitNumbers(this.props.deck.commentCount) }</span>
                        <span><i className="fa fa-eye"></i> { Helpers.delimitNumbers(this.props.deck.viewCount) }</span>
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