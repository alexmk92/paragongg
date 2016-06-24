var React = require('react');
var Helpers  = require('../../helpers');

var CardEffects = React.createClass({
    getFormattedCardDescription: function(description) {
        var description = description.split(" ");

        var statuses = [
            { type : "{status:pen}", value : "", icon : "" },
            { type : "{status:slow}", value : "Slow",  icon : "" },
            { type : "{status:bleed}", value : "Bleed",  icon : "" },
            { type : "{status:psn}", value : "Poison",  icon : "" },
            { type : "{status:burn}", value : "Burn",  icon : "" }
        ];
        var attributes = [
            { type : "{attr:physar}", value : "Physical Armor", icon : "pgg pgg-physical-armor" },
            { type : "{attr:enar}", value : "Energy Armor", icon : "pgg pgg-energy-armor" },
            { type : "{attr:shld}", value : "Shield", icon : "pgg pgg-physical-armor" },
            { type : "{attr:physpen}", value : "Physical Pen", icon : "pgg pgg-physical-penetration" },
            { type : "{attr:enpen}", value : "Energy Pen", icon : "pgg pgg-energy-penetration" },
            { type : "{attr:spd}", value : "Max Movement Speed", icon : "pgg pgg-movement-speed" },
            { type : "{attr:mp}", value : "Mana", icon : "pgg pgg-max-mana" },
            { type : "{attr:cdr}", value : "Cooldown Reduction", icon : "pgg pgg-cooldown-reduction" },
            { type : "{attr:atkspd}", value : "Attack Speed", icon : "pgg pgg-attack-speed" },
            { type : "{attr:hpreg}", value : "Health Regen", icon : "pgg pgg-health-regeneration" },
            { type : "{attr:mpreg}", value : "Mana Regen", icon : "pgg pgg-mana-regeneration" },
            { type : "{attr:hp}", value : "Health", icon : "pgg pgg-max-health" },
            { type : "{attr:dmgbns}", value : "Damage Bonus", icon : "pgg pgg-damage-bonus" },
            { type : "{attr:lfstl}", value : "Lifesteal", icon : "pgg pgg-lifesteal" },
            { type : "{attr:physdmg}", value : "Physical Damage", icon : "pgg pgg-physical-damage" },
            { type : "{attr:endmg}", value : "Energy Damage", icon : "pgg pgg-energy-damage" },
            { type : "{attr:critch}", value : "Crit Chance", icon : "pgg pgg-critical-strike-chance" }
        ];
        
        var formattedDescription = <span></span>;

        description.forEach(function(string) {
            
            if(/({[a-zA-Z:]+})/.test(string)) {
                statuses.forEach(function(status) {
                    string.replace(status.type, status.value);
                });
                attributes.forEach(function(attribute) {
                    string.replace(attribute.type, attribute.value);
                });
            }
        })

        return description;
    },
    getStats: function(effects) {
        var items = [];
        effects.forEach(function(stat, i) {
            if(stat.stat) {
                var statistic = Helpers.getFormattedStatistic(stat.stat);
                items.push(
                    <li key={stat.label + "_" + i}>
                        <span className="value">{ Helpers.dropZeroesAndDelimitNumbers(stat.value) + "" + statistic.modifier }</span>
                        <i className={statistic.icon} aria-hidden="true" /><span>{ statistic.label}</span>
                    </li>
                );
            }
            if(stat.description) {
                var passiveOrActive = stat.passive ? "Passive" : "Active";
                var isUnique        = stat.unique ? "Unique " : "";
                var passiveName     = isUnique + passiveOrActive;

                items.push(
                    <li key={"passive_" + i}>
                        <span><span className="actipassive">{ passiveName + ": "}</span>{ this.getFormattedCardDescription(stat.description) }</span>
                    </li>
                );
            }
        }.bind(this));
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