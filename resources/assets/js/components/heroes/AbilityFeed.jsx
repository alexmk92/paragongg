var React = require('react');
var Helpers = require('../../helpers');
var Giffy = require('../Giffy');

var AbilityItem = React.createClass({
    getModifierString: function (ability, modifierType) {
        if (ability.type.toLowerCase() === "primary") {
            var rank = this.props.currentRank - 1 || 0;
            return ability.modifiersByLevel[rank][modifierType];
        }
        var prevValue = null;
        var returnString = "";
        ability.modifiersByLevel.forEach(function (modifier) {
            var value = Math.ceil(modifier[modifierType]);
            if (prevValue !== value) {
                returnString += Math.ceil(modifier[modifierType]) + "/";
            }
            prevValue = value;
        });
        return returnString.substring(0, returnString.length - 1);
    },
    getUltDamageFromPrimary: function (ability, string) {
        if (string.toLowerCase() === this.props.primaryAbility.name.toLowerCase()) {
            return this.getModifierString(this.props.primaryAbility, 'damage');
        }
        return null;
    },
    getFormattedDescription: function (ability) {
        var description = ability.description;
        description = description.split(" ");

        var statuses = [
            {type: "{status:pen}", value: "", icon: ""},
            {type: "{status:slow}", value: "Slow", icon: ""},
            {type: "{status:bleed}", value: "Bleed", icon: ""},
            {type: "{status:psn}", value: "Poison", icon: ""},
            {type: "{status:burn}", value: "Burn", icon: ""},
            {type: "{status:stun}", value: "Stun", icon: ""},
            {type: "{status:slnc}", value: "Silence", icon: ""},
        ];
        var attributes = [
            {type: "{attr:physar}", value: "Physical Armor", icon: "pgg pgg-physical-armor"},
            {type: "{attr:enar}", value: "Energy Armor", icon: "pgg pgg-energy-armor"},
            {type: "{attr:shld}", value: "Shield", icon: "pgg pgg-physical-armor"},
            {type: "{attr:physpen}", value: "Physical Pen", icon: "pgg pgg-physical-penetration"},
            {type: "{attr:enpen}", value: "Energy Pen", icon: "pgg pgg-energy-penetration"},
            {type: "{attr:spd}", value: "Max Movement Speed", icon: "pgg pgg-movement-speed"},
            {type: "{attr:mp}", value: "Mana", icon: "pgg pgg-max-mana"},
            {type: "{attr:cdr}", value: "Cooldown Reduction", icon: "pgg pgg-cooldown-reduction"},
            {type: "{attr:atkspd}", value: "Attack Speed", icon: "pgg pgg-attack-speed"},
            {type: "{attr:hpreg}", value: "Health Regen", icon: "pgg pgg-health-regeneration"},
            {type: "{attr:mpreg}", value: "Mana Regen", icon: "pgg pgg-mana-regeneration"},
            {type: "{attr:hp}", value: "Health", icon: "pgg pgg-max-health"},
            {type: "{attr:dmgbns}", value: "Damage Bonus", icon: "pgg pgg-damage-bonus"},
            {type: "{attr:lfstl}", value: "Lifesteal", icon: "pgg pgg-lifesteal"},
            {type: "{attr:physdmg}", value: "Physical Damage", icon: "pgg pgg-physical-damage"},
            {type: "{attr:endmg}", value: "Energy Damage", icon: "pgg pgg-energy-damage"},
            {type: "{attr:critch}", value: "Crit Chance", icon: "pgg pgg-critical-strike-chance"}
        ];

        var prevType = 'text';
        var multiplier = 1;
        var wordsSinceDealing = 0;
        console.log(ability);
        return description.map(function (string, i) {
            if (string.toLowerCase() === 'dealing') {
                prevType = 'dealing';
            } else {
                // This allows us to override the ult or ability name in the text, i.e. Rampage would have his
                // Q replaced with the ability value instead of label
                wordsSinceDealing += 1;
                if (wordsSinceDealing > 3) {
                    prevType = 'text';
                    wordsSinceDealing = 0;
                }
            }
            if (string.toLowerCase().indexOf('{damage}') > -1) {
                var damageString = this.getModifierString(ability, 'damage');
                if (string.toLowerCase().indexOf('attr:endmg') > -1) {
                    var attribute = null;
                    attributes.some(function (attr) {
                        if (attr.type === '{attr:endmg}') {
                            attribute = attr;
                            return true;
                        }
                        return false;
                    });
                    if (attribute !== null) {
                        return (
                            <span>
                                <span className="statValue" key={"str-" + i}>{damageString} </span>
                                <span className="stat" key={"attr" + i}><i
                                    className={attribute.icon + " pull-icon-left"}></i>{attribute.value} </span>
                            </span>
                        );
                    } else {
                        return <span className="statValue" key={"str-" + i}>{damageString} </span>;
                    }
                }
                return <span className="statValue" key={"str-" + i}>{damageString} </span>;
            } else if (string.toLowerCase().indexOf('{cooldown}') > -1) {
                var cooldownString = this.getModifierString(ability, 'cooldown');
                return <span className="statValue" key={"str-" + i}>{cooldownString} </span>;
            } else if (string.toLowerCase().indexOf('{duration}') > -1) {
                var durationString = this.getModifierString(ability, 'duration');
                return <span className="statValue" key={"str-" + i}>{durationString} </span>;
            } else if (string.toLowerCase().indexOf('{energycost}') > -1) {
                var energycostString = this.getModifierString(ability, 'energycost');
                return <span className="statValue" key={"str-" + i}>{energycostString} </span>;
            } else if (string.toLowerCase().indexOf('{slowpercent}') > -1) {
                var slowString = this.getModifierString(ability, 'slowpercent');
                return <span className="statValue" key={"str-" + i}>{slowString} </span>;
            } else if (string.toLowerCase().indexOf('{atkspdvalue}') > -1) {
                var atkSpdString = this.getModifierString(ability, 'atkspdvalue');
                return <span className="statValue" key={"str-" + i}>{atkSpdString} </span>;
            } else if (string.toLowerCase().indexOf('{slowamount}') > -1) {
                var slowAmountString = this.getModifierString(ability, 'slowamount');
                return <span className="statValue" key={"str-" + i}>{slowAmountString} </span>;
            } else if (string.toLowerCase().indexOf('{stunduration}') > -1) {
                var stunString = this.getModifierString(ability, 'stunduration');
                return <span className="statValue" key={"str-" + i}>{stunString} </span>;
            } else if (string.toLowerCase().indexOf('{bonusdamage}') > -1) {
                var bonusDmgString = this.getModifierString(ability, 'bonusdamage');
                return <span className="statValue" key={"str-" + i}>{bonusDmgString} </span>;
            } else if (string.toLowerCase().indexOf('{ultduration}') > -1) {
                var ultDurationString = this.getModifierString(ability, 'ultduration');
                return <span className="statValue" key={"str-" + i}>{ultDurationString} </span>;
            } else if (string.toLowerCase().indexOf('{damageabilityprimary}') > -1) {
                var damageAbilityString = this.getModifierString(ability, 'damageabilityprimary');
                return <span className="statValue" key={"str-" + i}>{damageAbilityString} </span>;
            } else if (string.toLowerCase().indexOf('{healthpassive}') > -1) {
                var healthPassiveString = this.getModifierString(ability, 'healthpassive');
                return <span className="statValue" key={"str-" + i}>{healthPassiveString} </span>;
            } else if (string.toLowerCase().indexOf('{damageabilityult}') > -1) {
                var ultDamage = this.getModifierString(ability, 'damageabilityult');
                return <span className="statValue" key={"str-" + i}>{ultDamage} </span>;
            } else if (string.toLowerCase().indexOf('{delayduration}') > -1) {
                var delayDurationString = this.getModifierString(ability, 'delayduration');
                return <span className="statValue" key={"str-" + i}>{delayDurationString} </span>;
            } else if (string.toLowerCase().indexOf('{movespeedboost}') > -1) {
                var moveSpeedBoostString = this.getModifierString(ability, 'movespeedboost');
                return <span className="statValue" key={"str-" + i}>{moveSpeedBoostString} </span>;
            } else if (string.toLowerCase().indexOf('{slowamount}') > -1) {
                var slowAmountString = this.getModifierString(ability, 'slowamount');
                return <span className="statValue" key={"str-" + i}>{slowAmountString} </span>;
            } else if (string.toLowerCase().indexOf('{slowduration}') > -1) {
                var slowDurationString = this.getModifierString(ability, 'slowduration');
                return <span className="statValue" key={"str-" + i}>{slowDurationString} </span>;
            } else if (string.toLowerCase().indexOf('{radius}') > -1) {
                var radiusString = this.getModifierString(ability, 'radius');
                return <span className="statValue" key={"str-" + i}>{radiusString} </span>;
            } else if (string.toLowerCase().indexOf('{multiplier}') > -1) {
                var multiplierString = this.getModifierString(ability, 'multiplier');
                return <span className="statValue" key={"str-" + i}>{multiplierString}x </span>;
            } else if (string.toLowerCase().indexOf('{dmgbonusabilityprim}') > -1) {
                var dmgAbilityBonusString = this.getModifierString(ability, 'dmgbonusabilityprim');
                return <span className="statValue" key={"str-" + i}>{dmgAbilityBonusString}% </span>;
            } else if (string.toLowerCase().indexOf('{regenamount}') > -1) {
                var regenAmountstring = this.getModifierString(ability, 'regenamount');
                return <span className="statValue" key={"str-" + i}>{regenAmountstring}/s </span>;
            } else if (string.toLowerCase().indexOf('{jungleregenamount}') > -1) {
                var jungleRegenAmountstring = this.getModifierString(ability, 'jungleregenamount');
                return <span className="statValue" key={"str-" + i}>{jungleRegenAmountstring}/s </span>;
            } else if (string.toLowerCase().indexOf('{regennum}') > -1) {
                var regenNumString = this.getModifierString(ability, 'regennum');
                return <span className="statValue" key={"str-" + i}>{regenNumString}/s </span>;
            } else if (string.toLowerCase().indexOf('{speedboost}') > -1) {
                var speedBoostString = this.getModifierString(ability, 'speedboost');
                return <span className="statValue" key={"str-" + i}>{speedBoostString} </span>;
            } else if (string.toLowerCase().indexOf('{envalue}') > -1) {
                var energyValueString = this.getModifierString(ability, 'envalue');
                return <span className="statValue" key={"str-" + i}>{energyValueString} </span>;
            } else if (string.toLowerCase().indexOf('{physvalue}') > -1) {
                var physValueString = this.getModifierString(ability, 'physvalue');
                return <span className="statValue" key={"str-" + i}>{physValueString} </span>;
            } else if (string.toLowerCase().indexOf('{movespeed}') > -1) {
                var moveSpeedString = this.getModifierString(ability, 'movespeed');
                return <span className="statValue" key={"str-" + i}>{moveSpeedString} </span>;
            } else if (string.toLowerCase().indexOf('{silencedur}') > -1) {
                var silenceDuration = this.getModifierString(ability, 'silencedur');
                return <span className="statValue" key={"str-" + i}>{silenceDuration} </span>;
            } else if (string.toLowerCase().indexOf('{damageduration}') > -1) {
                var damageDuration = this.getModifierString(ability, 'damageduration');
                return <span className="statValue" key={"str-" + i}>{damageDuration} </span>;
            } else if (string.toLowerCase().indexOf('{splitdamage}') > -1) {
                var splitDamage = this.getModifierString(ability, 'splitdamage');
                return <span className="statValue" key={"str-" + i}>{splitDamage} </span>;
            } else if (string.toLowerCase().indexOf('{mana}') > -1) {
                var manaAmount = this.getModifierString(ability, 'mana');
                return <span className="statValue" key={"str-" + i}>{manaAmount} </span>;
            } else if (string.toLowerCase().indexOf('{manacost}') > -1) {
                var manaCostString = this.getModifierString(ability, 'manacost');
                return <span className="statValue" key={"str-" + i}>{manaCostString} </span>;
            } else if (string.toLowerCase().indexOf('{stackingdmg}') > -1) {
                var stackDamageString = this.getModifierString(ability, 'stackingdmg');
                return <span className="statValue" key={"str-" + i}>{stackDamageString} </span>;
            } else if (string.toLowerCase().indexOf('{percentage}') > -1) {
                var percentString = this.getModifierString(ability, 'percentage');
                return <span className="statValue" key={"str-" + i}>{percentString}% </span>;
            } else if (string.toLowerCase().indexOf('{durationprimary}') > -1) {
                var durationString = this.getModifierString(ability, 'durationprimary');
                return <span className="statValue" key={"str-" + i}>{durationString} </span>;
            } else if (string.toLowerCase().indexOf('{shield}') > -1) {
                var shieldString = this.getModifierString(ability, 'shield');
                return <span className="statValue" key={"str-" + i}>{shieldString} </span>;
            }
            console.log(ability);

            // only format abilities which references the ability for damage (such as kallari ult, but not her Q)
            if (prevType === 'dealing' && this.getUltDamageFromPrimary(ability, string.toLowerCase())) {
                prevType = 'text';
                var ultString = this.getUltDamageFromPrimary(ability, string.toLowerCase());
                return <span className="statValue" key={"str-" + i}>{ultString} </span>;
            }
            if (/({[a-zA-Z:]+})/.test(string)) {
                var node = null;
                statuses.some(function (status) {
                    if (string.toLowerCase().indexOf(status.type.toLowerCase()) > -1) {
                        node = <span className="stat" key={"status-" + i}><i
                            className={status.icon + " pull-icon-left"}></i>{status.value} </span>;
                        return true;
                    }
                    return false;
                });
                if (node === null) {
                    attributes.some(function (attribute) {
                        if (string.toLowerCase().indexOf(attribute.type.toLowerCase()) > -1) {
                            node = <span className="stat" key={"attr" + i}><i
                                className={attribute.icon + " pull-icon-left"}></i>{attribute.value} </span>;
                            return true;
                        }
                        return false;
                    });
                }
                return node;
            }
            return <span key={"str-" + i}>{string} </span>;
        }.bind(this));
    },
    renderCooldown: function (ability) {
        if (ability.modifiersByLevel) {
            var cooldownString = "";
            var hasNumber = false;
            var maxNumbers = 4;
            ability.modifiersByLevel.forEach(function (stat) {
                if (stat.cooldown && maxNumbers > 0) {
                    var num = Helpers.dropZeroesAndDelimitNumbers(stat.cooldown);
                    if (cooldownString.indexOf(num) < 0) {
                        cooldownString += num + ' / ';
                        maxNumbers--;
                    }
                    hasNumber = true;
                }
            });
            cooldownString = cooldownString.substr(0, cooldownString.length - 2);
            cooldownString += ' seconds';
            if (hasNumber) {
                return (
                    <span className="ability-cooldown"><i className="fa fa-clock-o"/> { cooldownString }</span>
                )
            } else {
                return <span className="ability-cooldown">Passive</span>
            }
        }
        return '';
    },
    renderAbilityButton: function (ability, index) {
        var button = "";

        if (ability.type.toUpperCase() === 'ULTIMATE') {
            button = <span>R / <img src="/assets/images/icons/ps4-triangle.png" alt="ultimate ps4"/></span>
        } else if (ability.type.toUpperCase() === "PRIMARY") {
            button = <span>LMB / <img src="/assets/images/icons/ps4-r2.png" alt="ultimate "/></span>
        } else if (ability.type.toUpperCase() === "NORMAL") {
            switch (index) {
                case 0:
                    button = <span>RMB / <img src="/assets/images/icons/ps4-r1.png" alt="ultimate "/></span>;
                    break;
                case 1:
                    button = <span>Q / <img src="/assets/images/icons/ps4-square.png" alt="ultimate "/></span>;
                    break;
                case 2:
                    button = <span>E / <img src="/assets/images/icons/ps4-circle.png" alt="ultimate "/></span>;
                    break;
                default:
                    break;
            }
        }

        return <span className="ability-button">{ button }</span>
    },
    abilitySelected: function () {
        this.props.onSelectedAbilityChanged(this.props.ability);
    },
    render: function () {
        if (this.props.ability) {
            var ability = this.props.ability;
            return (
                <div className="ability-container">
                    <div className="video-wrapper">
                        <Giffy videoSrc={this.props.video}
                               isPlaying={this.props.selectedAbility === ability}
                               onItemSelected={this.abilitySelected}
                               singlePlayback={true}
                               hasControls={false}
                               videoIndex={this.props.index}
                        />
                    </div>
                    <div className="text-wrapper">
                        <div className="text-container">
                            <h3>
                                <img className="ability-icon" src={ability.images.icon}/>
                                <div className="ability-title">
                                    { this.renderAbilityButton(ability, this.props.index - 1) }
                                    <span className="ability-name">{ ability.name }</span>
                                    { this.renderCooldown(ability) }
                                </div>
                            </h3>
                            <p>{this.getFormattedDescription(ability)}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
});

var AbilityFeed = React.createClass({
    getInitialState: function () {
        return {
            selectedAbility: null
        }
    },
    setSelectedAbility: function (ability) {
        var newAbility = ability === this.state.selectedAbility ? null : ability;
        this.setState({selectedAbility: newAbility});
    },
    render: function () {
        var abilities = this.props.abilities.map(function (ability, i) {
            return (
                <AbilityItem primaryAbility={this.props.abilities[0]} currentRank={this.props.currentRank}
                             key={ ability.name } ability={ ability } index={i} video={this.props.videos[i]}
                             onSelectedAbilityChanged={this.setSelectedAbility}
                             selectedAbility={this.state.selectedAbility}/>
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