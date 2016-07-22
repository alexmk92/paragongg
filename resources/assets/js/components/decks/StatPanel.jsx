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
        this.getCardStats();
    },
    componentWillMount: function() {
        this.heroRank = 1;
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props;
    },
    componentWillReceiveProps: function(nextProps) {
        var newStatistics = this.state.statistics.map(function(stat) {
            stat.modified = false;
            return stat;
        });

        this.heroRank = nextProps.heroRank;
        this.setState({ statistics : newStatistics });
        this.getCardStats();
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
                    // New stats is what we merge with the final array
                    newStats.some(function(stat) {
                        if(stat.ref === effect.stat.toUpperCase()) {
                            var oldValue = stat.value;
                            stat.value = Helpers.dropZeroesAndDelimitNumbers(stat.value = (stat.value + effect.value));
                            if(stat.value !== oldValue) stat.modified = true;
                            else stat.modified = false;

                            return true;
                        }
                        return false;
                    })
                }
            });
        });
        return newStats;
    },
    getCardStats: function() {
        if(typeof this.props.build === "undefined" && typeof this.props.cardStats === "undefined") {
            var moddedSlots = this.getBaseStats();
            this.setState({ statistics : moddedSlots });
        } else if(this.props.build) {
            var extractedCards = [];
            this.props.build.slots.forEach(function(slot) {
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