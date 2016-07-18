var React = require('react');
var ReactDOM = require('react-dom');
var Helpers  = require('../../helpers');

var CardEffects = React.createClass({
    getFormattedCardDescription: function(description) {
        description = description.split(" ");

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
        
        return description.map(function (string, i) {
            if (/({[a-zA-Z:]+})/.test(string)) {
                var node = null;
                statuses.some(function (status) {
                    if(status.type.toLowerCase() === string.toLowerCase()) {
                        node = <span key={"status-"+i}><i className={status.icon + " pull-icon-left"}></i>{status.value} </span>
                        return true;
                    }
                    return false;
                });
                if(node === null) {
                    attributes.some(function (attribute) {
                        if(attribute.type.toLowerCase() === string.toLowerCase()) {
                            node = <span key={"attr"+i}><i className={attribute.icon + " pull-icon-left"}></i>{attribute.value} </span>
                            return true;
                        }
                        return false;
                    });
                }
                return node;
            }
            return <span key={"str-"+i}>{string} </span>;
        });
    },
    getStats: function(effects) {
        var items = [];
        effects.forEach(function(stat, i) {
            if(stat.stat && stat.stat.toUpperCase() !== "DAMAGEBONUSSOURCE") {
                var statistic = Helpers.getFormattedStatistic(stat.stat);
                items.push(
                    <li key={"stat_" + i}>
                        <span className="value">{ Helpers.dropZeroesAndDelimitNumbers((stat.value * statistic.multiplier)) + "" + statistic.modifier }</span>
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
        console.log(items);
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
