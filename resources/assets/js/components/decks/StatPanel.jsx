var React = require('react');
var Rcslider = require('rc-slider');
var Helpers = require('../../helpers');

var StatPanel = React.createClass({
    getInitialState: function() {
        return {
            statistics : this.getBaseStats(Helpers.getAllStatistics())
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

        console.log('next props is: ', nextProps);
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
    getBaseStats: function(stats) {
        var allStats = null;
        if(stats) {
            allStats = stats;
        } else {
            allStats = this.state.statistics;
        }
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
    getModifiedStats: function(build) {
        var newStats = this.getInitialState().statistics;
        console.log('collection is: ', build);
        build.slots.forEach(function(slot) {
            if(slot.card) {
                newStats = this.getStatsFromEffectsArray(slot.card, slot.card.effects, newStats);
                // Find all build slots that have this card, and check if we need to process their
                // maxedEffects bonus
                if(slot.card.hasOwnProperty('maxedEffects') && slot.hasOwnProperty('upgrades')) {
                    var upgradeCount = 0;
                    slot.upgrades.forEach(function(upgradeSlot) {
                        if(upgradeSlot.card !== null) {
                            newStats = this.getStatsFromEffectsArray(upgradeSlot.card, upgradeSlot.card.effects, newStats);
                            upgradeCount++;
                        }
                    }.bind(this));
                    // Just incase in future cards can only have 2 upgrades, check the length is the same
                    if(upgradeCount === slot.upgrades.length) {
                        newStats = this.getStatsFromEffectsArray(slot.card, slot.card.maxedEffects, newStats);
                    }
                }
            } else {
                newStats = this.setModifiedStatColor(newStats);
            }
        }.bind(this));
        return newStats;
    },
    // We use this because we want to get the data from the cards maxedEffects and effects
    // arrays, therefore we use this extracted function so we dont repeat the same loop
    // twice in getModifiedStats
    getStatsFromEffectsArray: function(card, effects, newStats) {
        effects.forEach(function(effect) {
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
                        if((effect.stat.toUpperCase() === 'CRITICALDAMAGECHANCE' || effect.stat.toUpperCase() === 'COOLDOWNREDUCTIONPERCENTAGE' || effect.stat.toUpperCase() === 'CRITICALDAMAGEBONUS') && effect.value < 1) {
                            effect.value *= 100;
                        }
                        stat.value = Helpers.dropZeroesAndDelimitNumbers(stat.value = (stat.value + effect.value));
                        newStats = this.setModifiedStatColor(newStats);
                        return true;
                    }
                    return false;
                }.bind(this))
            }
        }.bind(this));

        return newStats;
    },
    // Sets the Green color on stats that are modified from the original base stats, otherwise
    // set the color back to white
    setModifiedStatColor: function(newStats) {
        var startingStats = this.getInitialState();
        startingStats.statistics.forEach(function(oldStat) {
            newStats.some(function(newStat) {
                if(newStat.ref === oldStat.ref) {
                    newStat.modified = newStat.value > oldStat.value;
                    return true;
                }
                return false;
            });
            /*
            if(Helpers.isNullOrUndefined(stat)) {
                newStats.some(function(newStat) {
                    if(newStat.ref === oldStat.ref) {
                        stat = newStat;
                        return true;
                    }
                    return false;
                });
            }
            if(stat && stat.ref === oldStat.ref) {
                console.log('checking if: ' + oldStat.value + ' is greater than or equal to: ' + stat.value);
                stat.modified = !(oldStat.value >= stat.value);
            }
            */
        });

        return newStats;
    },
    getCardStats: function(build) {
        if(typeof build === "undefined" && typeof this.props.cardStats === "undefined") {
            var moddedSlots = this.getInitialState().statistics;
            this.setState({ statistics : moddedSlots });
        } else if(this.props.build) {
            this.setState({ statistics : this.getModifiedStats(build) });
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