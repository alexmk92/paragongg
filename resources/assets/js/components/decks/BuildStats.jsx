var React = require('react');
var Rcslider = require('rc-slider');
var SpiderWebChart = require('../charts/SpiderWebChart');
var HorizontalBarChart = require('../charts/HorizontalBarChart');
var StatPanel = require('./StatPanel');
var SelectBox = require('../SelectBox');
var Helpers = require('../../helpers');

require('rc-slider/assets/index.css');

var BuildStats = React.createClass({
    getInitialState: function() {
        return {
            updateTarget: "ALL",
            compareAllBuilds: true,
            compareIndex: 0,
            comparisons: [],
            currentRank: 1,
            showDeckOverview: false
        }
    },
    componentDidMount: function() {
        this.sliderChanged(1);
        if(this.state.compareAllBuilds) {
            setTimeout(function() {
                var newComparisons = this.getComparisonFields();
                this.setState({compareAllBuilds: false, updateTarget : "BUILD-OVERVIEW",  comparisons : newComparisons });
            }.bind(this), 50);
        }
    },
    componentWillMount: function() {
        // Set up the appropriate stats that are in this build
        var newComparisons = this.getComparisonFields();
        this.setState({ comparisons : newComparisons });
    },
    componentWillReceiveProps: function(nextProps, nextState) {
        this.setState({ updateTarget: "ALL", comparisons : this.getComparison([], nextProps.selectedBuild), compareIndex: 0});
    },
    getComparisonFields: function() {
        return this.getComparison([], this.props.selectedBuild);
    },
    getComparison: function(newComparisons, build) {
        // Get comparison data for deck
        if(this.isSelectedBuildEmpty(build)) {
            this.props.cards.all.forEach(function(card) {
                if(card) {
                    card.effects.map(function(effect) {
                        var statString = "";
                        // We don't want to include +Health of health regen pots on activataeables
                        if(Helpers.isNullOrUndefined(effect.cooldown)) {
                            if(!Helpers.isNullOrUndefined(effect.passive) && effect.passive === true) {
                                return;
                            }
                            if(effect.stat) statString = effect.stat.toUpperCase();
                            if(effect.description) statString = effect.description.toUpperCase();
                            var statCategory = Helpers.getStatisticCategory(statString);

                            if(Helpers.isNullOrUndefined(this.props.selectedBuild) && !this.doesCategoryExistInArray(statCategory, newComparisons)) {
                                if(statCategory !== "" && statCategory !== "DPS") newComparisons.push({ label : statCategory });
                            } else if(!this.doesCategoryExistInArray(statCategory, newComparisons)) {
                                if(statCategory !== "") newComparisons.push({ label : statCategory });
                            }
                        }
                    }.bind(this));
                }
            }.bind(this));
            return newComparisons;
        } else {
            // Get comparison data for the selected build
            build.slots.forEach(function(slot) {
                if(slot.card) {
                    slot.card.effects.map(function(effect) {
                        var statString = "";
                        if(Helpers.isNullOrUndefined(effect.cooldown)) {
                            if(!Helpers.isNullOrUndefined(effect.passive) && effect.passive === true) {
                                return;
                            }
                            if(effect.stat) statString = effect.stat.toUpperCase();
                            if(effect.description) statString = effect.description.toUpperCase();
                            var statCategory = Helpers.getStatisticCategory(statString);

                            // Always add a DPS field
                            if(!this.doesCategoryExistInArray("DPS", newComparisons)) {
                                if(statCategory !== "") newComparisons.push({ label : "DPS" });
                            }

                            if(!this.doesCategoryExistInArray(statCategory, newComparisons)) {
                                if(statCategory !== "")
                                    newComparisons.push({ label : statCategory });
                            }
                        }
                    }.bind(this));
                }
            }.bind(this));
            return newComparisons;
        }
    },
    doesCategoryExistInArray: function(category, comparisons) {
        var found = false;
        comparisons.some(function(comparison) {
            if(comparison.label === category) {
                found = true;
                return true;
            }
            return false;
        });
        return found;
    },
    sliderChanged: function(value) {
        var domNode = "<p>Rank<br/><span>" + value + "</span></p>";
        var elem = document.querySelector(".rc-slider-handle");
        if(typeof elem !== "undefined" && elem !== null) {
            elem.innerHTML = domNode;
            this.setState({ currentRank : value, updateTarget : "BUILD-COMPARISON" });
        }
    },
    renderStatPanel: function() {
        if(Helpers.isClientMobile()) {
            return (
                <div id="statistic-wrapper">
                    <StatPanel reset={this.props.resetStatPanel} title={ "Build stats" } heroRank={this.state.currentRank} heroStats={ this.props.hero.baseStats  } cardStats={ this.props.cards } build={this.props.selectedBuild} />
                </div>
            )
        } else {
            return (
                <div id="statistic-wrapper">
                    <StatPanel reset={this.props.resetStatPanel} title={ "Base stats (" + this.props.hero.name + ")" } heroRank={this.state.currentRank} heroStats={ this.props.hero.baseStats } />
                    <StatPanel title={ "Build stats" } heroRank={this.state.currentRank} heroStats={ this.props.hero.baseStats } cardStats={ this.props.cards } build={this.props.selectedBuild} />
                </div>
            )
        }
    },
    getMaxStat: function(type) {
        var buildSlots = [];
        var upgradeSlots = [];
        var upgradeCount = 0;
        var maxEquipmentValue = 0;
        var maxUpgradeValue = 0;

        var explodedEquipment = [];
        var explodedUpgrades = [];

        this.props.cards.equipment.forEach(function(card) {
            for(var i = 0; i < card.quantity; i++) {
                explodedEquipment.push(card);
            }
        });
        this.props.cards.upgrades.forEach(function(card) {
            for(var i = 0; i < card.quantity; i++) {
                explodedUpgrades.push(card);
            }
        });

        if(type === "DPS") {

        } else {
            explodedEquipment.forEach(function(card) {
                card.effects.forEach(function(effect) {
                    var statString = "";
                    if(effect.stat) statString = effect.stat.toUpperCase();
                    if(effect.description) statString = effect.description.toUpperCase();
                    var statCategory = Helpers.getStatisticCategory(statString);

                    if(statCategory === type) {
                        if(statCategory === "CRIT" && effect.value < 1) {
                            effect.value *= 100;
                        }
                        if(effect.value > maxEquipmentValue){
                            maxEquipmentValue = effect.value;
                        }
                        var newCard = {
                            value : effect.value,
                            upgrades : card.upgradeSlots
                        };
                        if(buildSlots.length < 6) {
                            upgradeCount += card.upgradeSlots;
                            buildSlots.push(newCard);
                        } else {
                            // Bind cards with a higher value
                            buildSlots.some(function(oldCard, i) {
                                if(oldCard.value > newCard.value) {
                                    upgradeCount = Math.max(upgradeCount - oldCard.upgradeSlots, 0);
                                    upgradeCount = Math.max(upgradeCount + newCard.upgradeSlots, 0);
                                    buildSlots[i] = newCard;
                                    return true;
                                }
                                return false;
                            });
                        }
                    }
                }.bind(this));
            }.bind(this));

            explodedUpgrades.forEach(function(upgradeCard) {
                upgradeCard.effects.forEach(function(effect) {
                    var statString = "";
                    if(effect.stat) statString = effect.stat.toUpperCase();
                    if(effect.description) statString = effect.description.toUpperCase();
                    var statCategory = Helpers.getStatisticCategory(statString);

                    if(statCategory === type) {
                        if(statCategory === "CRIT") {
                        }
                        if(statCategory === "CRIT" && effect.value < 1) {
                            effect.value *= 100;
                        }
                        if(effect.value > maxUpgradeValue){
                            maxUpgradeValue = effect.value;
                        }
                        var newUpgradeCard = {
                            value : effect.value
                        };
                        if(upgradeCount > 0) {
                            upgradeSlots.push(newUpgradeCard);
                        } else {
                            // Bind cards with a higher value
                            upgradeSlots.some(function(oldUpgradeCard, i) {
                                if(oldUpgradeCard.value > newUpgradeCard.value) {
                                    upgradeSlots[i] = newUpgradeCard;
                                    return true;
                                }
                                return false;
                            });
                        }
                    }
                }.bind(this));
            }.bind(this));

            // Get the total for this build
            var total = 0;

            buildSlots.forEach(function(card) {
                if(parseInt(card.value)) {
                    total += card.value;
                }
            });
            upgradeSlots.forEach(function(upgradeCard) {
                if(parseInt(upgradeCard.value)) {
                    total += upgradeCard.value;
                }
            });

            return total;
        }
    },
    getValueForEffect: function(effect, desiredEffect) {
        var statString = "";
        if(effect.stat) statString = effect.stat.toUpperCase();
        if(effect.description) statString = effect.description.toUpperCase();
        var statCategory = Helpers.getStatisticCategory(statString);
        var statDetails = Helpers.getFormattedStatistic(statString);


        if(statCategory === desiredEffect && !Helpers.isNullOrUndefined(effect.value)) {
            if(statCategory === "CRIT") { // Critical strike is expressed as a float, 0.059 === 5.9%
                return { value : effect.value * 100, isPercentage : true }
            }
            return { value : effect.value, isPercentage : false };
        } else {
            return { value : 0, isPercentage : false };
        }
    },
    recurseSlotsAndGetValue: function(build, baseTotal, effectType) {
        build.slots.forEach(function(slot) {
            if(slot.card) {
                slot.card.effects.forEach(function(effect) {
                    var value = this.getValueForEffect(effect, effectType);
                    if(typeof value.value !== "undefined") {
                        baseTotal += value.value;
                    }
                }.bind(this));
                slot.upgrades.forEach(function(upgradeSlot) {
                    if(upgradeSlot.card) {
                        upgradeSlot.card.effects.forEach(function(effect) {
                            var value = this.getValueForEffect(effect, effectType);
                            if(typeof value.value !== "undefined") {
                                baseTotal += value.value;
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
        }.bind(this));
        return baseTotal;
    },
    computeDamageForEffect: function(effect, currentValues) {
        var statString = "";
        if(effect.stat) statString = effect.stat.toUpperCase();
        if(effect.description) statString = effect.description.toUpperCase();
        var statCategory = Helpers.getStatisticCategory(statString);
        var statDetails = Helpers.getFormattedStatistic(statString);

        if(statCategory === "PHYSICAL DAMAGE" || statCategory === "CRIT" || statCategory === "ATTACK SPEED") {
            if(!Helpers.isNullOrUndefined(statDetails)) {
                switch(statDetails.label.toUpperCase()) {
                    case "PHYSICAL DAMAGE" : currentValues.attackDamage += effect.value; break;
                    case "ATTACK SPEED" : currentValues.attackSpeed += effect.value; break;
                    case "CRITICAL CHANCE" : currentValues.critChance += effect.value; break;
                    case "CRITICAL DAMAGE" : currentValues.critDamage += effect.value; break;
                    default: break;
                }
            }
        }

        return currentValues;
    },
    getComparisonData: function() {
        var baseStats = this.props.hero.baseStats || {
                "physical_damage" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "energy_damage" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "crit_chance" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "crit_bonus" : {
                    "value" : 150.0,
                    "scaling" : 0.0
                },
                "attack_speed" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "physical_pen" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "energy_pen" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "max_health" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "health_regen" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "max_mana" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "mana_regen" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "lifesteal" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "physical_armor" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "energy_armor" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "cooldown_reduction" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                },
                "movement_speed" : {
                    "value" : 0.0,
                    "scaling" : 0.0
                }
            };
        if(baseStats === null) return null;

        var stat = this.state.comparisons[this.state.compareIndex];
        var emptyBuild = this.isSelectedBuildEmpty(this.props.selectedBuild);
        if(!emptyBuild && this.state.showDeckOverview) emptyBuild = true;
        var comparisonData = {
            chartHeight: emptyBuild ? 80 : 120,
            chartColors : ["#343a4a", "#42a9e8"],
            max : 0,
            parts : [],
            data : []
        };

        // Get max details

        // Get build details
        if(stat) {
            // TODO This could probably be reformatted to only use DPS as an edge case, other stats
            // could be analysed independently
            var build = this.props.selectedBuild;

            if(stat.label === "DPS") {
                var d = {
                    critChance : 0,
                    critDamage : 0,
                    attackDamage : 0,
                    attackSpeed : 0,
                    baseAttackSpeed : 100
                };

                if(baseStats) {
                    d.baseAttackSpeed = (baseStats.attack_speed.value + (baseStats.attack_speed.scaling * this.state.currentRank));
                    d.attackDamage = (baseStats.physical_damage.value + (baseStats.physical_damage.scaling * this.state.currentRank));
                    d.critChance = (baseStats.crit_chance.value + (baseStats.crit_chance.scaling * this.state.currentRank)) / 100;
                    d.critDamage = (baseStats.crit_bonus.value + (baseStats.crit_bonus.scaling * this.state.currentRank)) / 100;
                }

                if(build) {
                    build.slots.forEach(function(slot) {
                        if(slot.card) {
                            slot.card.effects.forEach(function(effect) {
                                d = this.computeDamageForEffect(effect, d);
                                slot.upgrades.forEach(function(upgradeSlot) {
                                    if(upgradeSlot.card) {
                                        upgradeSlot.card.effects.forEach(function(effect) {
                                            d = this.computeDamageForEffect(effect, d);
                                        }.bind(this));
                                        if(upgradeSlot.card.maxedEffects) {
                                            upgradeSlot.card.maxedEffects.forEach(function(effect) {
                                                d = this.computeDamageForEffect(effect, d);
                                            }.bind(this));
                                        }
                                    }
                                }.bind(this));
                            }.bind(this));
                            if(slot.card.maxedEffects) {
                                slot.card.maxedEffects.forEach(function(effect) {
                                    d = this.computeDamageForEffect(effect, d);
                                }.bind(this));
                            }
                        }
                    }.bind(this));
                } else if(Helpers.isNullOrUndefined(this.props.selectedBuild)) {
                    this.props.cards.all.forEach(function(card) {
                        if(card) {
                            card.effects.forEach(function(effect) {
                                d = this.computeDamageForEffect(effect, d);
                            }.bind(this));
                            if(card.maxedEffects) {
                                card.maxedEffects.forEach(function(effect) {
                                    d = this.computeDamageForEffect(effect, d);
                                }.bind(this));
                            }
                        }
                    }.bind(this));
                }

                // account for heroes that dont have AS cards
                if(d.attackSpeed < 100) d.attackSpeed += 100;

                // (100/ASR) x BAT=Adj. Atk Time
                if(d.baseAttackSpeed === 0) d.baseAttackSpeed = 100;
                d.attackSpeed = Math.min(((100 / d.attackSpeed) * d.baseAttackSpeed) / 100, 2.5);
                d.critDamage += 1;

                var totalDps = (d.attackSpeed * d.attackDamage) + (d.attackSpeed * d.critChance * (d.critDamage-1) * d.attackDamage);

                var maxTotal = d.attackDamage;
                maxTotal += this.getMaxStat("DPS");
                maxTotal = maxTotal > total ? maxTotal : totalDps;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                //comparisonData.data.push({ data : [maxTotal] }, { data : [totalDps] });
                //comparisonData.data.push({ data : [maxTotal] }); // we only have one collection as DPS doesnt have an algorithm for compute yet
                if(!Helpers.isNullOrUndefined(this.props.selectedBuild)) {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                //var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                //var maxEndLabel = "/<span style='text-transform: lowercase'>s</span>)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds current " + stat.label + " (";
                var endLabel = "/<span style='text-transform: lowercase'>s</span>)";

            } else if(stat.label === "HEALTH REGEN") {
                var total = (baseStats.health_regen.value + (baseStats.health_regen.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!Helpers.isNullOrUndefined(this.props.selectedBuild)) {
                    total = this.recurseSlotsAndGetValue(build, total, "HEALTH REGEN");
                }

                maxTotal += this.getMaxStat("HEALTH REGEN");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "/<span style='text-transform: lowercase'>s</span>)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "/<span style='text-transform: lowercase'>s</span>)";

            } else if(stat.label === "ENERGY REGEN") {
                var total = (baseStats.mana_regen.value + (baseStats.mana_regen.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!Helpers.isNullOrUndefined(this.props.selectedBuild)) {
                    total = this.recurseSlotsAndGetValue(build, total, "ENERGY REGEN");
                }

                maxTotal += this.getMaxStat("ENERGY REGEN");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "/<span style='text-transform: lowercase'>s</span>)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "/<span style='text-transform: lowercase'>s</span>)";

            } else if(stat.label === "HEALTH") {
                var total = (baseStats.max_health.value + (baseStats.max_health.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "HEALTH");
                }

                maxTotal += this.getMaxStat("HEALTH");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "MITIGATION") {
                var total = (baseStats.energy_armor.value + (baseStats.energy_armor.scaling * this.state.currentRank)) || 0;
                total += (baseStats.physical_armor.value + (baseStats.physical_armor.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "MITIGATION");
                }

                maxTotal += this.getMaxStat("MITIGATION");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "MANA") {
                var total = (baseStats.max_health.value + (baseStats.max_health.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "MANA");
                }

                maxTotal += this.getMaxStat("MANA");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "PENETRATION") {
                var total = (baseStats.max_health.value + (baseStats.max_health.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "PENETRATION");
                }

                maxTotal += this.getMaxStat("PENETRATION");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "CDR") {
                var total = (baseStats.cooldown_reduction.value + (baseStats.cooldown_reduction.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "CDR");
                }

                maxTotal += this.getMaxStat("CDR");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "%)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "%)";
            } else if(stat.label === "LIFESTEAL") {
                var total = (baseStats.lifesteal.value + (baseStats.lifesteal.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "LIFESTEAL");
                }

                maxTotal += this.getMaxStat("LIFESTEAL");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "%)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "%)";
            } else if(stat.label === "CRIT") {
                var total = (baseStats.crit_chance.value + (baseStats.crit_chance.scaling * this.state.currentRank)) || 0;
                //total += (baseStats.crit_bonus.value + (baseStats.crit_bonus.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "CRIT");
                }

                maxTotal += this.getMaxStat("CRIT");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + "ICAL STRIKE CHANCE (";
                var maxEndLabel = "%)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + "ICAL STRIKE CHANCE (";
                var endLabel = "%)";
            } else if(stat.label === "MITIGATION") {
                var total = (baseStats.physical_armor.value + (baseStats.physical_armor.scaling * this.state.currentRank)) || 0;
                total += (baseStats.energy_armor.value + (baseStats.energy_armor.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "MITIGATION");
                }

                maxTotal += this.getMaxStat("MITIGATION");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "%)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "%)";
            } else if(stat.label === "ATTACK SPEED") {
                var total = (baseStats.attack_speed.value + (baseStats.attack_speed.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "ATTACK SPEED");
                }

                maxTotal += this.getMaxStat("ATTACK SPEED");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "PHYSICAL DAMAGE") {
                var total = (baseStats.physical_damage.value + (baseStats.physical_damage.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "PHYSICAL DAMAGE");
                }

                maxTotal += this.getMaxStat("PHYSICAL DAMAGE");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "ENERGY DAMAGE") {
                var total = (baseStats.energy_damage.value + (baseStats.energy_damage.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                if(!emptyBuild) {
                    total = this.recurseSlotsAndGetValue(build, total, "ENERGY DAMAGE");
                }

                maxTotal += this.getMaxStat("ENERGY DAMAGE");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                if(!emptyBuild) {
                    comparisonData.data.push({ data : [maxTotal] }, { data : [total] });
                } else {
                    comparisonData.data.push({ data : [maxTotal] });
                }

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            }

            if(!Helpers.isNullOrUndefined(maxStartLabel) && !Helpers.isNullOrUndefined(maxEndLabel)) {
                // Push for maximum possible:
                comparisonData.parts.push({
                    start : maxStartLabel,
                    end : maxEndLabel
                });
            }
            if(!Helpers.isNullOrUndefined(this.props.selectedBuild)) {
                if (!Helpers.isNullOrUndefined(startLabel) && !Helpers.isNullOrUndefined(endLabel)) {
                    // Push for this build labels:
                    comparisonData.parts.push({
                        start: startLabel,
                        end: endLabel
                    });
                }
            }
        }

        return comparisonData;
    },
    getAffinityWeighting: function() {
        var comparisonData = {
            chartHeight : 35,
            chartColors : [],
            parts : [],
            data : [],
            max: 0
        };

        var affinityCounts = [];
        var maxCards = this.props.cards.all.length;

        // On a null build, show deck affinity weighting
        if (this.isSelectedBuildEmpty(this.props.selectedBuild) || this.props.selectedBuild.slots.length === 0) {
            this.props.cards.all.forEach(function (card) {
                // Push for maximum possible:
                if (typeof affinityCounts[card.affinity] === "undefined") {
                    affinityCounts[card.affinity] = {label: card.affinity, value: 1};
                } else {
                    affinityCounts[card.affinity].value += 1;
                }
            });
        } else {
            // Show build affinity weighting
            maxCards = 0;
            this.props.selectedBuild.slots.forEach(function (slot) {
                if (slot.card) {
                    if (typeof affinityCounts[slot.card.affinity] === "undefined") {
                        affinityCounts[slot.card.affinity] = {label: slot.card.affinity, value: 1};
                        maxCards++;
                    } else {
                        affinityCounts[slot.card.affinity].value += 1;
                        maxCards++;
                    }
                    slot.upgrades.forEach(function (upgradeSlot) {
                        if (upgradeSlot.card) {
                            if (typeof affinityCounts[upgradeSlot.card.affinity] === "undefined") {
                                affinityCounts[upgradeSlot.card.affinity] = {
                                    label: upgradeSlot.card.affinity,
                                    value: 1
                                };
                                maxCards++;
                            } else {
                                affinityCounts[upgradeSlot.card.affinity].value += 1;
                                maxCards++;
                            }
                        }
                    });
                }
            }.bind(this));
        }
        for(var key in affinityCounts) {
            if(affinityCounts.hasOwnProperty(key)) {
                var affinity = affinityCounts[key];
                var percent = (affinity.value / maxCards) * 100;
                if(affinity.value > comparisonData.max) {
                    comparisonData.max = affinity.value;
                }
                comparisonData.parts.push({
                    start : "<i style='font-size: 16px;' class=''></i> " + affinity.label + " (" + parseInt(percent) + "%)",
                    end : ""
                });
                comparisonData.data.push({
                    data : [affinity.value]
                });
                comparisonData.chartHeight += 45;
                comparisonData.chartColors.push(Helpers.getAffinityColor(key.toUpperCase()));
            }
        }

        return comparisonData;
    },
    isSelectedBuildEmpty: function(build) {
        if(Helpers.isNullOrUndefined(build)) return true;
        var empty = true;
        build.slots.forEach(function(slot) {
            if(slot.card && empty) empty = false;
        });
        return empty;
    },
    getOverviewData: function() {
        var spiderChartData = {
            categories: [],
            data: []
        };

        spiderChartData.categories = [];
        this.state.comparisons.forEach(function(comparisonData) {
            if(comparisonData.label !== "DPS") spiderChartData.categories.push(comparisonData.label);
        });

        var emptyBuild = this.isSelectedBuildEmpty(this.props.selectedBuild);
        if(!emptyBuild && this.state.showDeckOverview) emptyBuild = true;
        if(this.props.builds.length > 0 && !emptyBuild) {
            var data = [];
            if(this.props.selectedBuild && !this.state.compareAllBuilds) {
                data.push({
                    name : "",
                    data : [],
                    pointPlacement: 'on'
                });
                data[0].name = this.props.selectedBuild.title === "" ? "UNTITLED DECK" : this.props.selectedBuild.title;
                for(var i = 0; i < spiderChartData.categories.length; i++) { data[0].data[i] = 0 }

                this.props.selectedBuild.slots.forEach(function(slot) {
                    if(slot.card) {
                        slot.card.effects.forEach(function(effect) {
                            var statString = "";
                            if(effect.stat) statString = effect.stat.toUpperCase();
                            if(effect.description) statString = effect.description.toUpperCase();
                            var stat = Helpers.getStatisticCategory(statString);
                            var statIndex = spiderChartData.categories.indexOf(stat);
                            if(statIndex > -1) {
                                data[0].data[statIndex]++
                            }
                            slot.upgrades.forEach(function(upgradeSlot) {
                                if(upgradeSlot.card) {
                                    upgradeSlot.card.effects.forEach(function(effect) {
                                        var statString = "";
                                        if(effect.stat) statString = effect.stat.toUpperCase();
                                        if(effect.description) statString = effect.description.toUpperCase();
                                        var stat = Helpers.getStatisticCategory(statString);
                                        var statIndex = spiderChartData.categories.indexOf(stat);
                                        if(statIndex > -1) {
                                            data[0].data[statIndex]++
                                        }
                                    }.bind(this));
                                }
                            }.bind(this));
                        }.bind(this))
                    }
                }.bind(this));
            } else if(this.state.compareAllBuilds) {
                this.props.builds.forEach(function(build, index) {
                    var title = build.title === "" ? ("Untitled Deck " + index) : build.title;
                    data.push({
                        name : title,
                        data : [],
                        pointPlacement: 'on'
                    });

                    for(var i = 0; i < spiderChartData.categories.length; i++) { data[index].data[i] = 0 }
                    build.slots.forEach(function(slot) {
                        if(slot.card) {
                            slot.card.effects.forEach(function(effect) {
                                var statString = "";
                                if(effect.stat) statString = effect.stat.toUpperCase();
                                if(effect.description) statString = effect.description.toUpperCase();
                                var stat = Helpers.getStatisticCategory(statString);
                                var statIndex = spiderChartData.categories.indexOf(stat);
                                if(statIndex > -1) {
                                    data[index].data[statIndex]++
                                }
                                slot.upgrades.forEach(function(upgradeSlot) {
                                    if(upgradeSlot.card) {
                                        upgradeSlot.card.effects.forEach(function(effect) {
                                            var statString = "";
                                            if(effect.stat) statString = effect.stat.toUpperCase();
                                            if(effect.description) statString = effect.description.toUpperCase();
                                            var stat = Helpers.getStatisticCategory(statString);
                                            var statIndex = spiderChartData.categories.indexOf(stat);
                                            if(statIndex > -1) {
                                                data[index].data[statIndex]++
                                            }
                                        }.bind(this));
                                    }
                                }.bind(this));
                            }.bind(this))
                        }
                    }.bind(this));
                }.bind(this));
            }
            spiderChartData.data = data;
        }
        else if(Helpers.isNullOrUndefined(this.props.selectedBuild) || emptyBuild ) {
            data = [];
            data.push({
                name : "",
                data : [],
                pointPlacement: 'on'
            });
            data[0].name = "DECK";
            for(var i = 0; i < spiderChartData.categories.length; i++) { data[0].data[i] = 0 }

            this.props.cards.all.forEach(function(card) {
                if(card) {
                    card.effects.forEach(function(effect) {
                        var statString = "";
                        if(effect.stat) statString = effect.stat.toUpperCase();
                        if(effect.description) statString = effect.description.toUpperCase();
                        var stat = Helpers.getStatisticCategory(statString);
                        var statIndex = spiderChartData.categories.indexOf(stat);
                        if(statIndex > -1) {
                            data[0].data[statIndex]++
                        }
                    }.bind(this))
                }
            }.bind(this));
            spiderChartData.data = data;
        }
        return spiderChartData;
    },
    updateComparisonType: function(index) {
        this.setState({ compareIndex : index, updateTarget : "BUILD-COMPARISON" });
    },
    toggleAllBuildsComparison: function() {
        var newComparisons = this.getComparisonFields();
        this.setState({ compareAllBuilds: !this.state.compareAllBuilds, updateTarget : "BUILD-OVERVIEW", comparisons : newComparisons });
    },
    showBuildOverview: function() {
        this.setState({ showDeckOverview: false });
    },
    showDeckOverview: function() {
        this.setState({ showDeckOverview: true });
    },
    render: function() {

        var isBuildEmpty = this.isSelectedBuildEmpty(this.props.selectedBuild);
        var emptyBuildWarning = '';
        if(this.props.builds.length > 0 && isBuildEmpty) {
            emptyBuildWarning = <blockquote>This build has no cards, we are therefore showing stats possible for this deck.</blockquote>
        }
        var hiddenStyle = (!isBuildEmpty) ? {} : { display: "none" };
        if(!isBuildEmpty && this.state.showDeckOverview) isBuildEmpty = true;
        if(!Helpers.isNullOrUndefined(this.props.forceShowStatPanel) && this.props.forceShowStatPanel === true) {
            hiddenStyle = {};
        }

        /* ADD THIS UNDER STAT PANEL
        <ul className="build-tabs">
            <li key={"build_tab_0"} className={this.state.showDeckOverview ? '' : 'active'} onClick={this.showBuildOverview}>
                <span>Build Overview</span>
            </li>
            <li key={"build_tab_1"} className={this.state.showDeckOverview ? 'active' : ''} onClick={this.showDeckOverview}>
                <span>Deck Overview</span>
            </li>
        </ul>
        <br/>
        */

        var affinityWeightingData = this.getAffinityWeighting();
        var statComparisonData = this.getComparisonData();
        if(statComparisonData !== null) {
            var spiderChartData = this.getOverviewData();

            return (
                <div>
                    <div id="deck-stat-container" style={hiddenStyle}>
                        <div id="statistic-title-wrapper">
                            <h3>{ isBuildEmpty !== null ? "Build" : "Deck" } statistics</h3>
                            <div id="rank-slider">
                                <Rcslider defaultValue={1} min={1} max={15} onChange={this.sliderChanged}
                                          tipFormatter={null}/>
                            </div>
                        </div>
                        { this.renderStatPanel() }
                    </div>

                    { emptyBuildWarning }

                    <div id="chart-wrapper" className="cf">

                        <div className="chart left">
                            <h3 style={{marginBottom: '25px'}}>{ isBuildEmpty ? "Deck " : "Build " }
                                Composition</h3>
                            <SpiderWebChart requireModuleDependencies={this.props.requireModuleDependencies}
                                            updateTarget={this.state.updateTarget} type="BUILD-OVERVIEW"
                                            series={spiderChartData} container="overview-container"/>
                        </div>
                        <div className="chart right">
                            <div className="chart stacked">
                                <h3>{ isBuildEmpty ? "Deck Statistics" : "Build Comparison" }  <SelectBox
                                    optionSelectedAtIndex={this.updateComparisonType} label="compare:"
                                    value={this.state.comparisons[this.state.compareIndex] ? this.state.comparisons[this.state.compareIndex].label : ""}
                                    items={this.state.comparisons}/></h3>
                                <HorizontalBarChart updateTarget={this.state.updateTarget} type="BUILD-COMPARISON"
                                                    container="build-comparison-container" max={statComparisonData.max}
                                                    useValue={true} height={ statComparisonData.chartHeight }
                                                    colors={ statComparisonData.chartColors }
                                                    series={statComparisonData}/>
                            </div>
                            <div className="chart stacked">
                                <h3>{ isBuildEmpty ? "Deck" : "Build" } Affinity Weighting</h3>
                                <HorizontalBarChart updateTarget={this.state.updateTarget} type="AFFINITY-WEIGHTING"
                                                    container="affinity-weighting-container"
                                                    max={affinityWeightingData.max} useValue={false}
                                                    height={ affinityWeightingData.chartHeight }
                                                    colors={ affinityWeightingData.chartColors }
                                                    series={affinityWeightingData}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <p>This hero has no base stats, therefore no stat panel can be shown</p>
        }

    }
});

module.exports = BuildStats;