var React = require('react');
var ReactDOM = require('react-dom');
var CardEffects = require('../cards/CardEffects');
var Toptip = require('../libraries/tooltip/Toptip');
var StatPanel = require('./StatPanel');
var Helpers = require('../../helpers');
var DeckWidget = require('./widgets/Deck');
var CostCurveWidget = require('./widgets/CostCurve');
var SuggestedDecksWidget = require('./widgets/SuggestedDecks');

var DeckDetail = React.createClass({
    getInitialState: function() {
        return {
            selectedBuild : this.props.deck.builds.length > 0 ? this.props.deck.builds[0] : null
        }
    },
    componentDidMount: function() {
        this.setFooterHeight();
        window.tooltip = new Toptip();
    },
    setFooterHeight: function() {
        var footer = document.querySelector("footer");
        var sidebar = document.querySelector(".sidebox");
        if(footer && sidebar) {
            var newBottom = sidebar.getBoundingClientRect().bottom;
            var footerHeight = footer.getBoundingClientRect().height;
            footer.style.top = (newBottom + footerHeight) + "px";
        } else {
            footer.style.top = "100%";
        }
    },
    showBuild: function(build) {
        console.log("DISPLAYING BUILD: ", build);
    },
    /* TOOLTIP METHODS */
    setTooltipContent: function(card) {
        if(!Helpers.isClientMobile()) {
            if(card !== null) {
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
                            <CardEffects card={card}/>
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
    // extra methods to ensure that parent component doesnt show the card
    showTooltip: function(card, selector, event) {
        if(!Helpers.isClientMobile()) {
            if(card) {
                if(event.target.className.toLowerCase().indexOf(selector.toLowerCase()) > -1) {
                    this.tooltip.showTooltip();
                }
            } else if(card === null && selector === null) {
                this.tooltip.showTooltip();
            }
        }
    },
    hideTooltip: function() {
        this.tooltip.hideTooltip();
    },
    renderBuildTabs: function() {
        var untitledCount = 1;
        return this.props.deck.builds.map(function(build, i) {
            if(build.title.toLowerCase().indexOf("untitled") > -1) {
                build.title = build.title.trim() + " " + untitledCount;
                untitledCount++;
            }
            return (
                <li key={"build_tab_" + i} onClick={ this.showBuild.bind(this, build) }>
                    <span>{ build.title }</span>
                </li>
            )
        }.bind(this));
    },
    renderBuildSlots: function() {
        var build = this.state.selectedBuild;
        if(build.slots.length > 0) {
            return build.slots.map(function(slot, i) {
               if(slot.card !== null) {
                   return (
                       <li id={"c_" + i}
                           className={slot.type}
                           key={"slot_" + i}
                           onMouseEnter={this.setTooltipContent.bind(this, slot.card)}
                           onMouseOver={this.showTooltip.bind(this, slot.card, "glow-layer")}
                           onMouseLeave={this.hideTooltip}
                       >
                           <span className="slot-label">{slot.type}</span>
                           { card }
                           <div className="upgrade-slot-wrapper">
                               { this.getUpgradeSlots(slot) }
                           </div>
                       </li>
                   )
               }
            });

        }  else {
            return <li className="no-builds"><span>No builds exists for this deck, sorry!</span></li>
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
                        { deleteWrapper }
                        { label }
                        <div className="overlay"></div>
                    </div>
                )
            });
        }
    },
    renderStatPanel: function() {
        if(Helpers.isClientMobile()) {
            return (
                <div id="statistic-wrapper">
                    <StatPanel heroStats={ [] } cardStats={ this.props.deck.cards } />
                </div>
            )
        } else {
            return (
                <div id="statistic-wrapper">
                    <StatPanel heroStats={ [] } />
                    <StatPanel heroStats={ [] } cardStats={ this.props.deck.cards } />
                </div>
            )
        }
    },
    render: function() {
        return (
            <div>
                <ul id="build_tabs">
                    { this.renderBuildTabs() }
                </ul>
                <ul className={"build-list"}>
                    { this.renderBuildSlots() }
                </ul>

                <div id="deck-stat-container">
                    <h3>Build statistics</h3>
                    { this.renderStatPanel() }
                </div>

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
var sidebar = document.querySelector("#sidebar");
if(sidebar) {
    var widgets = (
        <div>
            <DeckWidget           deck={ DECK } sharedTooltip={ window.tooltip } />
            <CostCurveWidget      deck={ DECK } />
            <SuggestedDecksWidget hero={ DECK.hero } />
        </div>
    );
    ReactDOM.render( widgets, sidebar );
}