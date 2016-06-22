var React = require('react');
var Helpers = require('../../helpers');

var StatPanel = React.createClass({
    getInitialState: function() {
        return {
            statistics : this.props.statistics || Helpers.getAllStatistics()
        };
    },
    getStatisticList: function() {
        this.getCardStats();
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
        if(this.props.heroStats) {

        }
    },
    getCardStats: function() {
        if(typeof this.props.cardStats !== undefined && this.props.cardStats) {
            console.log(this.props.cardStats);
            var newStats = [];
            /*
            this.props.cardStats.forEach(function(stat) {
                console.log("STAT: ", stat);
            });
            */
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