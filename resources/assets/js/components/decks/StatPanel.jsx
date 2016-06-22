var React = require('react');
var Rcslider = require('rc-slider');
var Helpers = require('../../helpers');

var StatPanel = React.createClass({
    getInitialState: function() {
        return {
            statistics : this.props.statistics || Helpers.getAllStatistics()
        };
    },
    componentDidMount: function() {
        this.getCardStats();
    },
    getStatisticList: function() {
        return this.state.statistics.map(function(statistic, i) {
            var active = statistic.modified ? "active" : "";
            return(
                <li key={"statistic-" + i}>
                    <span className={ active }><i className={ statistic.icon } aria-hidden="true" /> { (statistic.value || 0) + "" + statistic.modifier + " " + statistic.label  } </span>
                </li>
            );
        });
    },
    getHeroStats: function() {
        return [{}, {}, {}];
        if(this.props.heroStats) {

        }
    },
    getCardStats: function() {
        if(typeof this.props.cardStats !== undefined && this.props.cardStats) {
            var baseStats = this.getHeroStats();
            var newStats = this.state.statistics;
            this.props.cardStats.all.forEach(function(card) {
                card.effects.forEach(function(effect) {
                    if(typeof effect.stat !== "undefined" && effect.stat) {
                        // This is the hero stats, we will eventually check for type but this is to
                        // prove the concept that we can get multiple stats
                        baseStats.some(function(stat, i) {
                            effect.value += i * 1.75
                        });
                        // New stats is what we merge with the final array
                        newStats.some(function(stat) {
                            if(stat.ref === effect.stat.toUpperCase()) {
                                stat.value = Helpers.dropZeroesAndDelimitNumbers(stat.value = effect.value);
                                stat.modified = true;
                                return true;
                            }
                            return false;
                        })
                    }
                });
            });
            this.setState({ statistics : newStats });
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