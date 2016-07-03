var React = require('react');
var Helpers = require('../../helpers');

var AbilityItem = React.createClass({
    getInitialState: function() {
        return {
            playing: false
        }
    },
    getFormattedDescription: function(description) {
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
    renderCooldown: function(ability) {
        if(ability.modifiersByLevel) {
            var cooldownString = "";
            ability.modifiersByLevel.forEach(function(stat) {
               if(stat.cooldown) {
                   var num = Helpers.dropZeroesAndDelimitNumbers(stat.cooldown);
                   if(cooldownString.indexOf(num) < 0)
                        cooldownString += num + ' / ';
               }
            });
            cooldownString = cooldownString.substr(0, cooldownString.length - 2);
            cooldownString += ' seconds';
            return (
                <span className="ability-cooldown"><i className="fa fa-clock-o" /> { cooldownString }</span>
            )
        }
        return '';
    },
    render: function() {
        if(this.props.ability) {
            var ability = this.props.ability;
            console.log(ability);
            return (
                <div className="ability-container">
                    <div className="video-wrapper">
                        <div className="video-container">
                            <img src="/assets/images/ability-placeholder.jpg" alt="video gif placeholder" />
                        </div>
                    </div>
                    <div className="text-wrapper">
                        <div className="text-container">
                            <h3>
                                <img className="ability-icon" src={ability.images.icon} />
                                <div className="ability-title">
                                    <span className="ability-button">Ability button here</span>
                                    <span className="ability-name">{ ability.name }</span>
                                    { this.renderCooldown(ability) }
                                </div>
                            </h3>
                            <p>{this.getFormattedDescription(ability.description)}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
});

var AbilityFeed = React.createClass({
    render: function() {
        var abilities = this.props.abilities.map(function(ability) {
            return (
                <AbilityItem key={ ability.name } ability={ ability } />
            );
        }.bind(this));
        return (
            <div>
                <h3 className="section-heading">Abilities</h3>
                { abilities }
            </div>
        );
    }
});

module.exports = AbilityFeed;