var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var CardEffects = require('../cards/CardEffects');
var Toptip = require('../libraries/tooltip/Toptip');
var StatPanel = require('./StatPanel');
var SelectBox = require('../SelectBox');
var Helpers = require('../../helpers');
var DeckWidget = require('./widgets/Deck');
var CostCurveWidget = require('./widgets/CostCurve');
var SuggestedDecksWidget = require('./widgets/SuggestedDecks');
var SpiderWebChart = require('../charts/SpiderWebChart');
var HorizontalBarChart = require('../charts/HorizontalBarChart');

require('rc-slider/assets/index.css');

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
            builds: DECK.builds,
            cards: DECK.cards,
            title: DECK.title,
            hero: DECK.hero,
            currentRank: 1,
            description: DECK.description,
            compareIndex : 0,
            compareAllBuilds: false,
            selectedTab: 0,
            selectedBuild : this.props.deck.builds.length > 0 ? this.props.deck.builds[0] : null
        }
    },
    componentDidMount: function() {
        this.setFooterHeight();
        window.tooltip = new Toptip();
        this.sliderChanged(1);
    },
    componentWillMount: function() {
        var newBuilds = DECK.builds.map(function(build) {
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
        return this.props.deck.builds.map(function(build, i) {
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
    sliderChanged: function(value) {
        var domNode = "<p>Rank<br/><span>" + value + "</span></p>";
        var elem = document.querySelector(".rc-slider-handle");
        if(typeof elem !== "undefined" && elem !== null) {
            elem.innerHTML = domNode;
            this.setState({ currentRank : value });
        }
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
            }.bind(this));
        }
    },
    renderStatPanel: function() {
        if(Helpers.isClientMobile()) {
            return (
                <div id="statistic-wrapper">
                    <StatPanel title={ "Build stats" } heroRank={this.state.currentRank} heroStats={ this.state.hero.baseStats  } cardStats={ this.state.cards } build={this.state.selectedBuild} />
                </div>
            )
        } else {
            return (
                <div id="statistic-wrapper">
                    <StatPanel title={ "Base stats (" + this.props.deck.hero.name + ")" } heroRank={this.state.currentRank} heroStats={ [] } />
                    <StatPanel title={ "Build stats" } heroRank={this.state.currentRank} heroStats={ this.state.hero.baseStats } cardStats={ this.state.cards } build={this.state.selectedBuild} />
                </div>
            )
        }
    },
    getDataForStat: function(statType, collection) {

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
            if(stat === "DAMAGE") {

            } else if(stat.label === "REGEN") {

            } else if(stat.label === "HEALTH") {

            } else if(stat.label === "MITIGATION") {

            } else if(stat.label === "MANA") {

            }

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
        var maxCards = this.props.deck.cards.all.length;

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
            maxCards = 0;
            this.state.selectedBuild.slots.forEach(function(slot) {
                if(slot.card) {
                    if(typeof affinityCounts[slot.card.affinity] === "undefined") {
                        affinityCounts[slot.card.affinity] = { label : slot.card.affinity, value : 1 };
                        maxCards++;
                    } else {
                        affinityCounts[slot.card.affinity].value += 1;
                        maxCards++;
                    }
                    slot.upgrades.forEach(function(upgradeSlot) {
                        if(upgradeSlot.card) {
                            if(typeof affinityCounts[upgradeSlot.card.affinity] === "undefined") {
                                affinityCounts[upgradeSlot.card.affinity] = { label : upgradeSlot.card.affinity, value : 1 };
                                maxCards++;
                            } else {
                                affinityCounts[upgradeSlot.card.affinity].value += 1;
                                maxCards++;
                            }
                        }
                    });
                }
            }.bind(this));
        }
        for(var key in affinityCounts) {
            if(affinityCounts.hasOwnProperty(key)) {
                var affinity = affinityCounts[key];
                var percent = (affinity.value / maxCards) * 100;
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

        return comparisonData;
    },
    updateComparisonType: function(index) {
        this.setState({ compareIndex : index });
    },
    toggleAllBuildsComparison: function() {
        this.setState({ compareAllBuilds: !this.state.compareAllBuilds });
    },
    render: function() {
        var affinityWeightingData = this.getAffinityWeighting();
        var statComparisonData = this.getComparisonData();

        return (
            <div>
                <div id="deck-info">
                    <div id="hero-avatar">
                        <img src={ Helpers.getHeroImageURL(this.state.hero)} alt={this.state.hero.name} />
                    </div>
                    <div id="title-wrapper">
                        <h2>{this.state.title}</h2>
                        <p>{this.state.description}</p>
                    </div>
                    <div id="vote-wrapper">
                        <i className="fa fa-star"></i> <span>{0}</span>
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

                <div id="deck-stat-container">
                    <div id="statistic-title-wrapper">
                        <h3>{ this.state.selectedBuild !== null ? "Build" : "Deck" } statistics</h3>
                        <div id="rank-slider">
                            <Rcslider defaultValue={1} min={1} max={15} onChange={this.sliderChanged} tipFormatter={null}  />
                        </div>
                    </div>
                    { this.renderStatPanel() }
                </div>

                <div id="chart-wrapper">
                    <div className="chart left">
                        <h3>{ this.state.selectedBuild !== null ? "Build" : "Deck" }  Overview</h3>
                        <div className={ this.state.compareAllBuilds ? "toggle-button active" : "toggle-button" } onClick={this.toggleAllBuildsComparison}><span>Compare all builds in this deck</span></div>
                        <SpiderWebChart container="overview-container" />
                    </div>
                    <div className="chart right">
                        <div className="chart stacked">
                            <h3>{ this.state.selectedBuild !== null ? "Build" : "Deck" }  Comparison <SelectBox optionSelectedAtIndex={this.updateComparisonType} label="compare:" value={this.state.comparisons[this.state.compareIndex].label} items={this.state.comparisons} /></h3>
                            <HorizontalBarChart container="build-comparison-container" max={statComparisonData.max} useValue={true} height={ statComparisonData.chartHeight } colors={ statComparisonData.chartColors } series={statComparisonData} />
                        </div>
                        <div className="chart stacked">
                            <h3>{ this.state.selectedBuild !== null ? "Build" : "Deck" }  Affinity Weighting</h3>
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
var sidebar = document.querySelector(".sidebar-with-widgets");
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
