var React = require('react');
var Rcslider = require('rc-slider');
var Helpers = require('../../helpers');

var StatPanel = React.createClass({
    getInitialState: function() {
        return {
            statistics : Helpers.getAllStatistics()
        };
    },
    componentDidMount: function() {
        this.getCardStats(this.props.build);
    },
    componentWillMount: function() {
        this.heroRank = 1;
    },
    componentWillReceiveProps: function(nextProps) {
        this.heroRank = nextProps.heroRank;

        // Get the stats for the next build we pass in
        if(!Helpers.isNullOrUndefined(nextProps.build)) {
            this.getCardStats(nextProps.build);
        }
    },
    getStatisticList: function() {
        return this.state.statistics.map(function(statistic, i) {
            var active = statistic.modified ? "active" : "";
            var value = Helpers.dropZeroesAndDelimitNumbers(((statistic.value / statistic.divider) * statistic.multiplier));
            return(
                <li key={"statistic-" + i}>
                    <span className={ active }><i className={ statistic.icon } aria-hidden="true" /> { (value || 0) + "" + statistic.modifier + " " + statistic.label  } </span>
                </li>
            );
        });
    },
    getBaseStats: function() {
        var allStats = this.state.statistics;
        // Loop over base stats here too...
        if(this.props.heroStats) {
            allStats.forEach(function(baseStat) {
                if(this.props.heroStats[baseStat.statRef]) {
                    var heroStat = this.props.heroStats[baseStat.statRef];
                    baseStat.value = (heroStat.value + (this.heroRank * heroStat.scaling));
                }
            }.bind(this));
        }
        return allStats;
    },
    getModifiedStats: function(collection) {
        var newStats = this.getBaseStats();
        collection.forEach(function(card) {
            card.effects.forEach(function(effect) {
                if(typeof effect.stat !== "undefined" && effect.stat) {
                    var compareStat = effect.stat.toUpperCase();
                    // allows us to determine between energy and physical damage
                    if(effect.stat.toUpperCase() === 'ATTACKRATING') {
                        if(card.damageType && card.damageType.toUpperCase() === 'ENERGY') {
                            compareStat = 'ATTACKRATING-E';
                        } else {
                            compareStat = 'ATTACKRATING-P';
                        }
                    }
                    // New stats is what we merge with the final array
                    newStats.some(function(stat) {
                        if(stat.ref === compareStat) {
                            // This function will ensure that scalings for physical damage/pen wont work for energy damage scaling heroes
                            if(!Helpers.isNullOrUndefined(this.props.heroScaling)) {
                                if((compareStat === 'ATTACKRATING-P' || compareStat === 'PHYSICALPENETRATIONRATING') && this.props.heroScaling.toUpperCase() === 'ENERGYDAMAGE') {
                                    stat.modified = false;
                                    return true;
                                } else if((compareStat === 'ATTACKRATING-E' || compareStat === 'ENERGYPENETRATIONRATING') && this.props.heroScaling.toUpperCase() === 'PHYSICALDAMAGE') {
                                    stat.modified = false;
                                    return true;
                                }
                            }
                            var oldValue = stat.value;
                            stat.value = Helpers.dropZeroesAndDelimitNumbers(stat.value = (stat.value + effect.value));
                            stat.modified = stat.value !== oldValue;

                            return true;
                        }
                        return false;
                    }.bind(this))
                }
            }.bind(this));
        }.bind(this));
        return newStats;
    },
    getCardStats: function(build) {
        if(typeof build === "undefined" && typeof this.props.cardStats === "undefined") {
            var moddedSlots = this.getBaseStats();
            this.setState({ statistics : moddedSlots });
        } else if(this.props.build) {
            var extractedCards = [];
            build.slots.forEach(function(slot) {
                if(slot.card) {
                    extractedCards.push(slot.card);
                    slot.upgrades.forEach(function(upgradeSlot) {
                        if(upgradeSlot.card) {
                            extractedCards.push(upgradeSlot.card);
                        }
                    })
                }
            });
            var moddedSlots = this.getModifiedStats(extractedCards);
            this.setState({ statistics : moddedSlots });
        }
    },
    render: function() {
        return(
            <div className="statistic-panel">
                <span className="title">{ this.props.title || "TITLE" }</span>
                <ul className="statistic-list">
                    { this.getStatisticList() }
                </ul>
            </div>
        );
    }
});

module.exports = StatPanel;