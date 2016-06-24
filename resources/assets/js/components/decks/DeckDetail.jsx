var React = require('react');
var ReactDOM = require('react-dom');
var CardEffects = require('../cards/CardEffects');
var Toptip = require('../libraries/tooltip/Toptip');
var StatPanel = require('./StatPanel');
var Helpers = require('../../helpers');
var DeckWidget = require('./widgets/Deck');
var CostCurveWidget = require('./widgets/CostCurve');
var SuggestedDecksWidget = require('./widgets/SuggestedDecks');
var SpiderWebChart = require('../charts/SpiderWebChart');
var HorizontalBarChart = require('../charts/HorizontalBarChart');

var DeckDetail = React.createClass({
    getInitialState: function() {
        return {
            comparisons: [
                { label : "HEALING", icon : "pgg pgg-health-regeneration" },
                { label : "REGEN", icon : "pgg pgg-health-regeneration" },
                { label : "DPS", icon : "pgg pgg-cleave" },
                { label : "DEFENSE", icon : "pgg pgg-physical-armor" },
                { label : "CROWD CONTROL", icon : "pgg pgg-attack-speed" },
                { label : "TANKING", icon : "pgg pgg-energy-armor" }
            ],
            compareIndex : 0,
            compareAllBuilds: false,
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
            footer.style.top = ((newBottom + footerHeight) * 1.5) + "px";
        } else {
            footer.style.top = "150%";
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
                    <StatPanel title={ "Build stats" } heroStats={ [] } cardStats={ this.props.deck.cards } />
                </div>
            )
        } else {
            return (
                <div id="statistic-wrapper">
                    <StatPanel title={ "Base stats (" + this.props.deck.hero.name + ")" } heroStats={ [] } />
                    <StatPanel title={ "Build stats" } heroStats={ [] } cardStats={ this.props.deck.cards } />
                </div>
            )
        }
    },
    getComparisonData: function() {
        var stat = this.state.comparisons[this.state.compareIndex];
        var comparisonData = {
            chartHeight: 120,
            chartColors : ["#343a4a", "#42a9e8"],
            max : 0,
            parts : [],
            data : []
        };

        if(stat) {
            // TODO If not builds exist, then we will show deck stats

            // Push for maximum possible:
            comparisonData.parts.push({
                start : "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible (",
                end : " " + stat.label + ")"
            });

            // Push for this build labels:
            comparisonData.parts.push({
                start : "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This build (",
                end : " " + stat.label + ")"
            });

            // Loop over the build and extract relevant info:
            // Push the data
            comparisonData.data.push({ data : [1042]}, { data : [122] });
            comparisonData.max = 1042;
        }

        console.log(comparisonData);
        return comparisonData;
    },
    getAffinityWeighting: function() {
        var comparisonData = {
            chartHeight : 45,
            chartColors : [],
            parts : [],
            data : [],
            max: 0
        };

        var affinityCounts = [];

        // On a null build, show deck affinity weighting
        if(this.state.selectedBuild === null || this.state.selectedBuild.slots.length === 0) {
            this.props.deck.cards.all.forEach(function(card) {
                // Push for maximum possible:
                if(typeof affinityCounts[card.affinity] === "undefined") {
                    affinityCounts[card.affinity] = { label : card.affinity, value : 1 };
                } else {
                    affinityCounts[card.affinity].value += 1;
                }
            });
        } else {
            // Show build affinity weighting
        }
        for(var key in affinityCounts) {
            if(affinityCounts.hasOwnProperty(key)) {
                var affinity = affinityCounts[key];
                var percent = (affinity.value / this.props.deck.cards.all.length) * 100;
                if(affinity.value > comparisonData.max) {
                    comparisonData.max = affinity.value;
                }
                comparisonData.parts.push({
                    start : "<i style='font-size: 16px;' class=''></i> " + affinity.label + " (" + parseInt(percent) + "%)",
                    end : ""
                });
                comparisonData.data.push({
                    data : [affinity.value]
                });
                comparisonData.chartHeight += 45;
                comparisonData.chartColors.push(Helpers.getAffinityColor(key.toUpperCase()));
            }
        }

        console.log(comparisonData);

        return comparisonData;
    },
    toggleAllBuildsComparison: function() {
        this.setState({ compareAllBuilds: !this.state.compareAllBuilds });
    },
    render: function() {
        var affinityWeightingData = this.getAffinityWeighting();
        var statComparisonData = this.getComparisonData();

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

                <div id="chart-wrapper">
                    <div className="chart left">
                        <h3>Build Overview</h3>
                        <div className={ this.state.compareAllBuilds ? "toggle-button active" : "toggle-button" } onClick={this.toggleAllBuildsComparison}><span>Compare all builds in this deck</span></div>
                        <SpiderWebChart container="overview-container" />
                    </div>
                    <div className="chart right">
                        <div className="chart stacked">
                            <h3>Build Comparison <span>COMPARE: DPS</span></h3>
                            <HorizontalBarChart container="build-comparison-container" max={statComparisonData.max} useValue={true} height={ statComparisonData.chartHeight } colors={ statComparisonData.chartColors } series={statComparisonData} />
                        </div>
                        <div className="chart stacked">
                            <h3>Affinity Weighting</h3>
                            <HorizontalBarChart container="affinity-weighting-container" max={affinityWeightingData.max} useValue={false} height={ affinityWeightingData.chartHeight } colors={ affinityWeightingData.chartColors } series={affinityWeightingData} />
                        </div>
                    </div>
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