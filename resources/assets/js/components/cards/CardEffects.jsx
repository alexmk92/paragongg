var React = require('react');
var Helpers  = require('../../helpers');

var CardEffects = React.createClass({
    getStats: function(effects) {
        var items = [];
        effects.forEach(function(stat, i) {
            if(stat.stat) {
                var statistic = Helpers.getFormattedStatistic(stat.stat);
                items.push(
                    <li key={stat.label + "_" + i}>
                        <i className={statistic.icon} aria-hidden="true" />  <span className="value">{ Helpers.dropZeroesAndDelimitNumbers(stat.value) + "" + statistic.modifier }</span> <span>{ statistic.label} </span>
                    </li>
                );
            }
            if(stat.description) {
                var passiveOrActive = stat.passive ? "Passive" : "Active";
                var isUnique        = stat.unique ? "Unique " : "";
                var passiveName     = isUnique + passiveOrActive;

                items.push(
                    <li key={"passive_" + i}>
                        <span><span className="actipassive">{ passiveName + ": "}</span>{ Helpers.getFormattedCardDescription(stat.description) }</span>
                    </li>
                );
            }
        });
        return items;
    },
    render: function() {
        var effects, maxedEffects;
        if(this.props.card.effects && this.props.card.effects.length > 0) {
            effects = (
                <ul className="effects">
                    {this.getStats(this.props.card.effects)}
                </ul>
            );
        }
        if(this.props.card.maxedEffects && this.props.card.maxedEffects.length > 0) {
            maxedEffects = (
                <ul className="maxedEffects">
                    <label>Fully Upgraded Bonus</label>
                    {this.getStats(this.props.card.maxedEffects)}
                </ul>
            );
        }

        return (
            <div>
                {effects}
                {maxedEffects}
            </div>
        );

    }
});

module.exports = CardEffects;