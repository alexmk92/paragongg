var React = require('react');
var ReactDOM = require('react-dom');
var CardEffects = require('../cards/CardEffects');
var Toptip = require('../libraries/tooltip/Toptip');
var Helpers = require('../../helpers');
var DeckWidget = require('./widgets/Deck');
var CostCurveWidget = require('./widgets/CostCurve');
var SuggestedDecksWidget = require('./widgets/SuggestedDecks');
var BuildStats = require('./BuildStats');
var Notification = require('../libraries/notification/Notification');

var DeckDetail = React.createClass({
    getInitialState: function() {
        return {
            deck : this.props.deck,
            builds: [],
            description: DECK.description,
            selectedTab: 0,
            selectedBuild : this.props.deck.builds.length > 0 ? this.props.deck.builds[0] : null
        }
    },
    componentDidMount: function() {
        //this.setFooterHeight();
        window.tooltip = new Toptip();

        // Replace the current notification panel.
        this.notificationPanel = new Notification();
        this.notificationPanel.initialiseNotifications();
    },
    componentWillMount: function() {
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
    showBuild: function(build, index) {
        this.setState({
            selectedTab: index,
            selectedBuild: build
        });
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
    /* TOOLTIP METHODS */
    setTooltipContent: function(card, message) {
        if(!Helpers.isClientMobile()) {
            var content = null;
            if(card !== null) {
                content = (
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
            }
            if(content !== null) {
                var tooltip = document.getElementById("toptip");
                ReactDOM.render(content, tooltip);
            }
        }
    },
    showTooltip: function(card, selector, event) {
        if(!Helpers.isClientMobile()) {
            if(card) {
                if(event.target.className.toLowerCase().indexOf(selector.toLowerCase()) > -1 || event.target.className.toLowerCase().indexOf('placed-card') > -1) {
                    window.tooltip.showTooltip();
                }
            } else if(card === null && selector === null) {
                window.tooltip.showTooltip();
            }
        }
    },
    hideTooltip: function() {
        window.tooltip.hideTooltip();
    },
    renderBuildTabs: function() {
        var untitledCount = 1;
        return this.state.deck.builds.map(function(build, i) {
            if(build.title === "") build.title = "untitled build";
            if(build.title.toLowerCase().indexOf("untitled") > -1 && !(/\d/g.test(build.title))) {
                build.title += " " + untitledCount;
                untitledCount+=1;
            }
            return (
                <li key={"build_tab_" + i} className={ (i === this.state.selectedTab ? "active" : "")} onClick={ this.showBuild.bind(this, build, i) }>
                    <span>{ build.title }</span>
                </li>
            )
        }.bind(this));
    },
    renderBuildSlots: function() {
        var build = this.state.selectedBuild;
        if(build && build.slots.length > 0) {
            return build.slots.map(function(slot, i) {
                if(slot.card !== null) {
                    return (
                        <li id={"c_" + i}
                            className={slot.type + " active-placed"}
                            key={"slot_" + i}
                            onMouseEnter={this.setTooltipContent.bind(this, slot.card)}
                            onMouseOver={this.showTooltip.bind(this, slot.card, "glow-layer")}
                            onMouseLeave={this.hideTooltip}
                        >
                            <span className="slot-label">{slot.type}</span>
                            <div style={{ backgroundImage : "url(" + Helpers.getCardImageURL(slot.card) + ")"}}
                                 className="placed-card"
                                 key={"card-" + i}
                            >
                                <span className="card-title">{ slot.card.name }</span>
                            </div>
                            <div className="upgrade-slot-wrapper">
                                { this.renderUpgradeSlots(slot) }
                            </div>
                        </li>
                    )
                } else {
                    return (
                        <li id={"c_" + i}
                            className={slot.type}
                            key={"slot_" + i}
                            onMouseEnter={this.hideTooltip}
                            onMouseOver={this.hideTooltip}
                            onMouseLeave={this.hideTooltip}
                        >
                            <span className="slot-label">{slot.type}</span>
                            <div className="placed-card"
                                 key={"card-" + i}
                            >
                            </div>
                        </li>
                    )
                }
            }.bind(this));

        }  else {
            var jsx = [];
            for(var i = 0; i < 6; i++) {
                var type = i < 5 ? "Active" : "Passive";
                jsx.push(
                    <li id={"c_" + i}
                        className={type}
                        key={"slot_" + i}
                        onMouseEnter={this.hideTooltip}
                        onMouseOver={this.hideTooltip}
                        onMouseLeave={this.hideTooltip}
                    >
                        <span className="slot-label">{type}</span>
                        <div className="placed-card"
                             key={"card-" + i}
                        >
                        </div>
                    </li>
                )
            }
            jsx.push(<span key="no-builds" style={{display: 'block', fontSize: '16px', marginTop: '-30px'}}>Sorry, there are no builds in this deck!</span>);
            return jsx;
        }
    },
    renderUpgradeSlots: function(slot) {
        if(typeof slot.upgrades === "undefined" || slot.upgrades.length === 0) {
            return <div key={"upgrade-slot" + slot.card.code} className="upgrade-slot"><span>NO UPGRADE SLOTS</span></div>
        } else {
            return slot.upgrades.map(function(upgradeSlot) {
                var label = "";
                var slotStyle = { backgroundImage : "" };
                if(upgradeSlot.card === null) {
                    label = <span className="upgrade-label">EMPTY SLOT</span>;
                } else {
                    label = <span className="upgrade-label"><span className="subtext">{upgradeSlot.card.cost}CP </span>{upgradeSlot.card.name}</span>;
                    slotStyle = { backgroundImage: 'url('+upgradeSlot.card.images.large+')' }
                }

                return (
                    <div className={ "upgrade-slot " }
                         key={"upgrade-slot-" + Helpers.uuid() }
                         style={ slotStyle }
                         onMouseEnter={this.setTooltipContent.bind(this, upgradeSlot.card, null)}
                         onMouseOver={this.showTooltip.bind(this, upgradeSlot.card, "upgrade-label")}
                         onMouseLeave={this.hideTooltip}
                    >
                        { label }
                        <div className="overlay"></div>
                    </div>
                )
            }.bind(this));
        }
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

                <ul id="build-tabs">
                    { this.renderBuildTabs() }
                </ul>
                <div id="builds-wrapper">
                    <ul className={"build-list"}>
                        { this.renderBuildSlots() }
                    </ul>
                </div>

                <BuildStats requireModuleDependencies={false} selectedBuild={this.state.selectedBuild} hero={this.state.deck.hero} cards={this.state.deck.cards} builds={this.state.builds} />
            </div>
        );
    }
});

// Render the main container for this application
var container = document.querySelector("#deck-container");
if(container) {
    ReactDOM.render( <DeckDetail deck={ DECK } />, container);
}
// Render any widgets for the page, we add this here as we dont want
// to override other sidebar instances
var sidebar = document.querySelector(".sidebar-with-widgets");
if(sidebar) {
    var widgets = (
        <div>
            <DeckWidget           deck={ DECK } sharedTooltip={ window.tooltip } />
            <CostCurveWidget      deck={ DECK } animateChart={true} />
            <SuggestedDecksWidget hero={ DECK.hero } />
        </div>
    );
    ReactDOM.render( widgets, sidebar );
}
