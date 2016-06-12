var React = require('react');

var StatPanel = React.createClass({
    getInitialState: function() {
        return {
            statistics : this.props.statistics || [
                { name : "Energy Damage", iconName : "pgg-energy-damage", value : 0, modifier : "" },
                { name : "Physical Damage", iconName : "pgg-physical-damage", value : 0, modifier : "" },
                { name : "Energy Pen", iconName : "pgg-armor-penetration", value : 0, modifier : "" },
                { name : "Physical Pen", iconName : "pgg-physical-penetration", value : 0, modifier : "" },
                { name : "Energy Armor", iconName : "pgg-energy-armor", value : 0, modifier : "" },
                { name : "Physical Armor", iconName : "pgg-physical-armor-2", value : 0, modifier : "" },
                { name : "Crit Chance", iconName : "pgg-critical-strike-chance", value : 0, modifier : "%" },
                { name : "Bonus Crit Damage", iconName : "pgg-critical-strike-damage", value : 0, modifier : "" },
                { name : "Max Mana", iconName : "pgg-max-mana", value : 0, modifier : "" },
                { name : "Max Health", iconName : "pgg-max-health", value : 0, modifier : "" },
                { name : "Mana Regen", iconName : "pgg-mana-regeneration", value : 0, modifier : "" },
                { name : "Health Regen", iconName : "pgg-health-regeneration", value : 0, modifier : "" },
                { name : "Max Movement Speed", iconName : "pgg-movement-speed", value : 0, modifier : "" },
                { name : "Cooldown Reduction", iconName : "pgg-cooldown-reduction", value : 0, modifier : "" },
                { name : "Lifesteal", iconName : "pgg-lifesteal", value : 0, modifier : "" },
                { name : "Attack Speed", iconName : "pgg-attack-speed", value : 0, modifier : "" },
                { name : "Harvester Build Time", iconName : "pgg-harvester-placement-time", value : 0, modifier : "" }
            ]
        };
    },
    getStatisticList: function() {
        return this.state.statistics.map(function(statistic, i) {
            return(
                <li key={"statistic-" + i}>
                    <span><i className={ "pgg " + statistic.iconName } aria-hidden="true" /> { statistic.value + statistic.modifier + " " + statistic.name } </span>
                </li>
            );
        });
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