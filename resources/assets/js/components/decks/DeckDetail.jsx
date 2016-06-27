var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var CardEffects = require('../cards/CardEffects');
var Toptip = require('../libraries/tooltip/Toptip');
var StatPanel = require('./StatPanel');
var SelectBox = require('../SelectBox');
var Helpers = require('../../helpers');
var DeckWidget = require('./widgets/Deck');
var CostCurveWidget = require('./widgets/CostCurve');
var SuggestedDecksWidget = require('./widgets/SuggestedDecks');
var SpiderWebChart = require('../charts/SpiderWebChart');
var HorizontalBarChart = require('../charts/HorizontalBarChart');


require('rc-slider/assets/index.css');

var DeckDetail = React.createClass({
    getInitialState: function() {
        return {
            comparisons: [],
            currentRank: 1,
            description: DECK.description,
            compareIndex : 0,
            compareAllBuilds: true,
            selectedTab: 0,
            selectedBuild : this.props.deck.builds.length > 0 ? this.props.deck.builds[0] : null,
            updateTarget: "ALL"
        }
    },
    componentDidMount: function() {
        this.setFooterHeight();
        window.tooltip = new Toptip();
        this.sliderChanged(1);
        if(this.state.compareAllBuilds) {
            setTimeout(function() {
                var newComparisons = this.getComparisonFields();
                this.setState({compareAllBuilds: false, updateTarget : "BUILD-OVERVIEW",  comparisons : newComparisons });
            }.bind(this), 50);
        }
    },
    componentWillMount: function() {
        var newBuilds = DECK.builds.map(function(build) {
            build.slots = build.slots.map(function(slot) {
                if(slot.card) {
                    slot.card = this.getCard(slot.card);
                    slot.upgrades = slot.upgrades.map(function(upgradeSlot) {
                        if(upgradeSlot.card) {
                            upgradeSlot.card = this.getCard(upgradeSlot.card);
                        }
                        return upgradeSlot;
                    }.bind(this));
                }
                return slot;
            }.bind(this));
        }.bind(this));


        // Set up the appropriate stats that are in this build
        var newComparisons = this.getComparisonFields();

        this.setState({ builds: newBuilds, comparisons : newComparisons });
    },
    getComparisonFields: function() {
        if(!this.state.compareAllBuilds) {
            var newComparisons = [];
            DECK.builds.forEach(function(build) {
                newComparisons = this.getComparison(newComparisons, build);
            }.bind(this));
            return newComparisons;
        } else {
            return this.getComparison([], this.state.selectedBuild);
        }
    },
    getComparison: function(newComparisons, build) {
        if(!build) { return newComparisons }
        build.slots.forEach(function(slot) {
            if(slot.card) {
                slot.card.effects.map(function(effect) {
                    var statString = "";
                    if(effect.stat) statString = effect.stat.toUpperCase();
                    if(effect.description) statString = effect.description.toUpperCase();
                    var statCategory = Helpers.getStatisticCategory(statString);

                    if(!this.doesCategoryExistInArray(statCategory, newComparisons)) {
                        if(statCategory !== "")
                            newComparisons.push({ label : statCategory });
                    }
                }.bind(this));
            }
        }.bind(this));
        return newComparisons;
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
    setFooterHeight: function() {
        var footer = document.querySelector("footer");
        var sidebar = document.querySelector(".sidebox");
        if(footer && sidebar) {
            var newBottom = sidebar.getBoundingClientRect().bottom;
            var footerHeight = footer.getBoundingClientRect().height;
            footer.style.top = ((newBottom + footerHeight)) + "px";
        } else {
            footer.style.top = "100%";
        }
    },
    showBuild: function(build, index) {
        this.setState({
            selectedTab: index,
            selectedBuild: build,
            updateTarget: "ALL",
            compareIndex: 0,
            comparisons: this.getComparison([], build)
        });
    },
    getCard: function(cardCode) {
        var cardToReturn = null;
        DECK.cards.all.some(function(card) {
            if(card.code === cardCode) {
                cardToReturn = card;
                return true;
            }
            return false;
        });
        return cardToReturn;
    },
    /* TOOLTIP METHODS */
    setTooltipContent: function(card, message) {
        if(!Helpers.isClientMobile()) {
            var content = null;
            if(card !== null) {
                content = (
                    <div className="pgg-tooltip pgg-tooltip-card">
                        <div className="card-head">
                            <span className="cost">{card.cost}</span>
                            <div className="header">
                                <span className="name">{card.name}</span>
                                <span className={"rarity rarity-" + card.rarity.toLowerCase()}>{card.rarity}</span>
                                <span className="type">{card.type}</span>
                            </div>
                            <i className={"affinity affinity-color pgg pgg-affinity-" + card.affinity.toLowerCase()}></i>
                        </div>
                        <div className="content">
                            <CardEffects card={card} />
                        </div>
                    </div>
                );
            }
            if(content !== null) {
                var tooltip = document.getElementById("toptip");
                ReactDOM.render(content, tooltip);
            }
        }
    },
    showTooltip: function(card, selector, event) {
        if(!Helpers.isClientMobile()) {
            if(card) {
                if(event.target.className.toLowerCase().indexOf(selector.toLowerCase()) > -1 || event.target.className.toLowerCase().indexOf('placed-card') > -1) {
                    window.tooltip.showTooltip();
                }
            } else if(card === null && selector === null) {
                window.tooltip.showTooltip();
            }
        }
    },
    hideTooltip: function() {
        window.tooltip.hideTooltip();
    },
    renderBuildTabs: function() {
        var untitledCount = 1;
        return this.props.deck.builds.map(function(build, i) {
            if(build.title === "") build.title = "untitled build";
            if(build.title.toLowerCase().indexOf("untitled") > -1 && !(/\d/g.test(build.title))) {
                build.title += " " + untitledCount;
                untitledCount+=1;
            }
            return (
                <li key={"build_tab_" + i} className={ (i === this.state.selectedTab ? "active" : "")} onClick={ this.showBuild.bind(this, build, i) }>
                    <span>{ build.title }</span>
                </li>
            )
        }.bind(this));
    },
    sliderChanged: function(value) {
        var domNode = "<p>Rank<br/><span>" + value + "</span></p>";
        var elem = document.querySelector(".rc-slider-handle");
        if(typeof elem !== "undefined" && elem !== null) {
            elem.innerHTML = domNode;
            this.setState({ currentRank : value, updateTarget : "BUILD-COMPARISON" });
        }
    },
    renderBuildSlots: function() {
        var build = this.state.selectedBuild;
        if(build && build.slots.length > 0) {
            return build.slots.map(function(slot, i) {
                if(slot.card !== null) {
                    return (
                        <li id={"c_" + i}
                            className={slot.type + " active-placed"}
                            key={"slot_" + i}
                            onMouseEnter={this.setTooltipContent.bind(this, slot.card)}
                            onMouseOver={this.showTooltip.bind(this, slot.card, "glow-layer")}
                            onMouseLeave={this.hideTooltip}
                        >
                            <span className="slot-label">{slot.type}</span>
                            <div style={{ backgroundImage : "url(" + Helpers.getCardImageURL(slot.card) + ")"}}
                                 className="placed-card"
                                 key={"card-" + i}
                            >
                                <span className="card-title">{ slot.card.name }</span>
                            </div>
                            <div className="upgrade-slot-wrapper">
                                { this.renderUpgradeSlots(slot) }
                            </div>
                        </li>
                    )
                } else {
                    return (
                        <li id={"c_" + i}
                            className={slot.type}
                            key={"slot_" + i}
                            onMouseEnter={this.hideTooltip}
                            onMouseOver={this.hideTooltip}
                            onMouseLeave={this.hideTooltip}
                        >
                            <span className="slot-label">{slot.type}</span>
                            <div className="placed-card"
                                 key={"card-" + i}
                            >
                            </div>
                        </li>
                    )
                }
            }.bind(this));

        }  else {
            var jsx = [];
            for(var i = 0; i < 6; i++) {
                var type = i < 5 ? "Active" : "Passive";
                jsx.push(
                    <li id={"c_" + i}
                        className={type}
                        key={"slot_" + i}
                        onMouseEnter={this.hideTooltip}
                        onMouseOver={this.hideTooltip}
                        onMouseLeave={this.hideTooltip}
                    >
                        <span className="slot-label">{type}</span>
                        <div className="placed-card"
                             key={"card-" + i}
                        >
                        </div>
                    </li>
                )
            }
            jsx.push(<span key="no-builds" style={{display: 'block', fontSize: '16px', marginTop: '-30px'}}>Sorry, there are no builds in this deck!</span>);
            return jsx;
        }
    },
    renderUpgradeSlots: function(slot) {
        if(typeof slot.upgrades === "undefined" || slot.upgrades.length === 0) {
            return <div key={"upgrade-slot" + slot.card.code} className="upgrade-slot"><span>NO UPGRADE SLOTS</span></div>
        } else {
            return slot.upgrades.map(function(upgradeSlot) {
                var label = "";
                var slotStyle = { backgroundImage : "" };
                if(upgradeSlot.card === null) {
                    label = <span className="upgrade-label">EMPTY SLOT</span>;
                } else {
                    label = <span className="upgrade-label"><span className="subtext">{upgradeSlot.card.cost}CP </span>{upgradeSlot.card.name}</span>;
                    slotStyle = { backgroundImage: 'url('+upgradeSlot.card.images.large+')' }
                }

                return (
                    <div className={ "upgrade-slot " }
                         key={"upgrade-slot-" + Helpers.uuid() }
                         style={ slotStyle }
                         onMouseEnter={this.setTooltipContent.bind(this, upgradeSlot.card, null)}
                         onMouseOver={this.showTooltip.bind(this, upgradeSlot.card, "upgrade-label")}
                         onMouseLeave={this.hideTooltip}
                    >
                        { label }
                        <div className="overlay"></div>
                    </div>
                )
            }.bind(this));
        }
    },
    renderStatPanel: function() {
        if(Helpers.isClientMobile()) {
            return (
                <div id="statistic-wrapper">
                    <StatPanel title={ "Build stats" } heroRank={this.state.currentRank} heroStats={ this.props.deck.hero.baseStats  } cardStats={ this.props.deck.cards } build={this.state.selectedBuild} />
                </div>
            )
        } else {
            return (
                <div id="statistic-wrapper">
                    <StatPanel title={ "Base stats (" + this.props.deck.hero.name + ")" } heroRank={this.state.currentRank} heroStats={ this.props.deck.hero.baseStats } />
                    <StatPanel title={ "Build stats" } heroRank={this.state.currentRank} heroStats={ this.props.deck.hero.baseStats } cardStats={ this.props.deck.cards } build={this.state.selectedBuild} />
                </div>
            )
        }
    },
    getMaxStat(type) {
        var buildSlots = [];
        var upgradeSlots = [];
        var upgradeCount = 0;
        var maxEquipmentValue = 0;
        var maxUpgradeValue = 0;

        var explodedEquipment = [];
        var explodedUpgrades = [];
        this.props.deck.cards.equipment.forEach(function(card) {
            for(var i = 0; i < card.quantity; i++) {
                explodedEquipment.push(card);
            }
        });
        this.props.deck.cards.upgrades.forEach(function(card) {
            for(var i = 0; i < card.quantity; i++) {
                explodedUpgrades.push(card);
            }
        });

        if(type === "DAMAGE") {

        } else {
            explodedEquipment.forEach(function(card) {
                card.effects.forEach(function(effect) {
                    var statString = "";
                    if(effect.stat) statString = effect.stat.toUpperCase();
                    if(effect.description) statString = effect.description.toUpperCase();
                    var statCategory = Helpers.getStatisticCategory(statString);

                    if(statCategory === type) {
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
                                    upgradeCount = Math.min(upgradeCount - oldCard.upgradeSlots, 0);
                                    upgradeCount = Math.min(upgradeCount + newCard.upgradeSlots, 0);
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
                        if(effect.value > maxEquipmentValue){
                            maxUpgradeValue = effect.value;
                        }
                        var newUpgradeCard = {
                            value : effect.value
                        };
                        if(upgradeSlots.length < upgradeCount) {
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
            buildSlots.forEach(function(card) { total += card.value; });
            upgradeSlots.forEach(function(upgradeCard) { total += upgradeCard.value });

            return total;
        }
    },
    getValueForEffect: function(effect, desiredEffect) {
        var statString = "";
        if(effect.stat) statString = effect.stat.toUpperCase();
        if(effect.description) statString = effect.description.toUpperCase();
        var statCategory = Helpers.getStatisticCategory(statString);
        var statDetails = Helpers.getFormattedStatistic(statString);

        if(statCategory === desiredEffect) {
            if(effect.stat && effect.stat.toUpperCase() === "LIFESTEALRATING") {
                return { value : effect.value / 100, isPercentage : true }
            } else {
                return { value : effect.value, isPercentage : false };
            }
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

        if(statCategory === "DAMAGE" || statCategory === "CRIT" || statCategory === "ATTACK SPEED") {
            switch(statDetails.label.toUpperCase()) {
                case "PHYSICAL DAMAGE" : currentValues.attackDamage += effect.value; break;
                case "ATTACK SPEED" : currentValues.attackSpeed += effect.value; break;
                case "CRITICAL CHANCE" : currentValues.critChance += effect.value; break;
                case "CRITICAL DAMAGE" : currentValues.critDamage += effect.value; break;
                default: break;
            }
        }

        return currentValues;
    },
    getComparisonData: function() {
        var baseStats = this.props.deck.hero.baseStats || null;

        var stat = this.state.comparisons[this.state.compareIndex];
        var comparisonData = {
            chartHeight: 120,
            chartColors : ["#343a4a", "#42a9e8"],
            max : 0,
            parts : [],
            data : []
        };

        // Get max details

        // Get build details
        if(stat && this.state.selectedBuild) {
            // TODO If not builds exist, then we will show deck stats
            var build = this.state.selectedBuild;

            if(stat.label === "DAMAGE") {
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


                // account for heroes that dont have AS cards
                if(d.attackSpeed < 100) d.attackSpeed += 100;

                // (100/ASR) x BAT=Adj. Atk Time
                d.attackSpeed = Math.min(((100 / d.attackSpeed) * d.baseAttackSpeed) / 100, 2.5);
                d.critDamage += 1;

                var totalDps = (d.attackSpeed * d.attackDamage) + (d.attackSpeed * d.critChance * (d.critDamage-1) * d.attackDamage);

                var maxTotal = d.attackDamage;
                maxTotal += this.getMaxStat("DAMAGE");
                maxTotal = maxTotal > total ? maxTotal : totalDps;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [totalDps] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "/<span style='text-transform: lowercase'>s</span>)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds basic " + stat.label + " (";
                var endLabel = "/<span style='text-transform: lowercase'>s</span>)";

            } else if(stat.label === "HEALTH REGEN") {
                var total = (baseStats.health_regen.value + (baseStats.health_regen.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "HEALTH REGEN");

                maxTotal += this.getMaxStat("HEALTH REGEN");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "/<span style='text-transform: lowercase'>s</span>)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "/<span style='text-transform: lowercase'>s</span>)";

            } else if(stat.label === "ENERGY REGEN") {
                var total = (baseStats.mana_regen.value + (baseStats.mana_regen.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "ENERGY REGEN");

                maxTotal += this.getMaxStat("ENERGY REGEN");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "/<span style='text-transform: lowercase'>s</span>)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "/<span style='text-transform: lowercase'>s</span>)";

            } else if(stat.label === "HEALTH") {
                var total = (baseStats.max_health.value + (baseStats.max_health.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "HEALTH");

                maxTotal += this.getMaxStat("HEALTH");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "MITIGATION") {
                var total = (baseStats.energy_armor.value + (baseStats.energy_armor.scaling * this.state.currentRank)) || 0;
                total += (baseStats.physical_armor.value + (baseStats.physical_armor.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "MITIGATION");

                maxTotal += this.getMaxStat("MITIGATION");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "MANA") {
                var total = (baseStats.max_health.value + (baseStats.max_health.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "MANA");

                maxTotal += this.getMaxStat("MANA");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "PENETRATION") {
                var total = (baseStats.max_health.value + (baseStats.max_health.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "PENETRATION");

                maxTotal += this.getMaxStat("PENETRATION");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = ")";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = ")";
            } else if(stat.label === "CDR") {
                var total = (baseStats.cooldown_reduction.value + (baseStats.cooldown_reduction.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "CDR");

                maxTotal += this.getMaxStat("CDR");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "%)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "%)";
            } else if(stat.label === "LIFESTEAL") {
                var total = (baseStats.lifesteal.value + (baseStats.lifesteal.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "LIFESTEAL");

                maxTotal += this.getMaxStat("LIFESTEAL");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "%)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "%)";
            } else if(stat.label === "CRIT") {
                var total = (baseStats.crit_chance.value + (baseStats.crit_chance.scaling * this.state.currentRank)) || 0;
                //total += (baseStats.crit_bonus.value + (baseStats.crit_bonus.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "CRIT");

                maxTotal += this.getMaxStat("CRIT");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + "ICAL STRIKE CHANCE (";
                var maxEndLabel = "%)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + "ICAL STRIKE CHANCE (";
                var endLabel = "%)";
            } else if(stat.label === "MITIGATION") {
                var total = (baseStats.physical_armor.value + (baseStats.physical_armor.scaling * this.state.currentRank)) || 0;
                total += (baseStats.energy_armor.value + (baseStats.energy_armor.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "MITIGATION");

                maxTotal += this.getMaxStat("MITIGATION");
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "%)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "%)";
            } else if(stat.label === "ATTACK SPEED") {
                var total = (baseStats.attack_speed.value + (baseStats.attack_speed.scaling * this.state.currentRank)) || 0;
                var maxTotal = total;
                total = this.recurseSlotsAndGetValue(build, total, "ATTACK SPEED") / 100;

                maxTotal += this.getMaxStat("ATTACK SPEED");
                maxTotal /= 100;
                maxTotal = maxTotal > total ? maxTotal : total;

                if(maxTotal > comparisonData.max) comparisonData.max = maxTotal;
                comparisonData.data.push({ data : [maxTotal] }, { data : [total] });

                var maxStartLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> Maximum possible " + stat.label + " (";
                var maxEndLabel = "<span style='text-transform: lowercase;'> attacks p/s</span>)";
                var startLabel = "<i style='font-size: 16px;' class='" + stat.icon + "'></i> This builds " + stat.label + " (";
                var endLabel = "<span style='text-transform: lowercase;'> attacks p/s</span>)";
            }

            // Push for maximum possible:
            comparisonData.parts.push({
                start : maxStartLabel,
                end : maxEndLabel
            });
            // Push for this build labels:
            comparisonData.parts.push({
                start : startLabel,
                end : endLabel
            });
        }

        return comparisonData;
    },
    getAffinityWeighting: function() {
        var comparisonData = {
            chartHeight : 45,
            chartColors : [],
            parts : [],
            data : [],
            max: 0
        };

        var affinityCounts = [];
        var maxCards = this.props.deck.cards.all.length;

        // On a null build, show deck affinity weighting
        if(this.state.selectedBuild === null || this.state.selectedBuild.slots.length === 0) {
            this.props.deck.cards.all.forEach(function(card) {
                // Push for maximum possible:
                if(typeof affinityCounts[card.affinity] === "undefined") {
                    affinityCounts[card.affinity] = { label : card.affinity, value : 1 };
                } else {
                    affinityCounts[card.affinity].value += 1;
                }
            });
        } else {
            // Show build affinity weighting
            maxCards = 0;
            this.state.selectedBuild.slots.forEach(function(slot) {
                if(slot.card) {
                    if(typeof affinityCounts[slot.card.affinity] === "undefined") {
                        affinityCounts[slot.card.affinity] = { label : slot.card.affinity, value : 1 };
                        maxCards++;
                    } else {
                        affinityCounts[slot.card.affinity].value += 1;
                        maxCards++;
                    }
                    slot.upgrades.forEach(function(upgradeSlot) {
                        if(upgradeSlot.card) {
                            if(typeof affinityCounts[upgradeSlot.card.affinity] === "undefined") {
                                affinityCounts[upgradeSlot.card.affinity] = { label : upgradeSlot.card.affinity, value : 1 };
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
    getOverviewData: function() {
        var spiderChartData = {
            categories: [],
            data: []
        };

        spiderChartData.categories = this.state.comparisons.map(function(comparisonData) {
            return comparisonData.label
        });

        if(this.props.deck.builds.length > 0) {

            var data = [];

            if(this.state.selectedBuild && !this.state.compareAllBuilds) {
                data.push({
                    name : "",
                    data : [],
                    pointPlacement: 'on'
                });
                data[0].name = this.state.selectedBuild.title === "" ? "UNTITLED DECK" : this.state.selectedBuild.title;
                for(var i = 0; i < spiderChartData.categories.length; i++) { data[0].data[i] = 0 }

                this.state.selectedBuild.slots.forEach(function(slot) {
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
            } else if(this.props.deck.builds.length > 0 && this.state.compareAllBuilds) {
                this.props.deck.builds.forEach(function(build, index) {
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

        return spiderChartData;
    },
    updateComparisonType: function(index) {
        this.setState({ compareIndex : index, updateTarget : "BUILD-COMPARISON" });
    },
    toggleAllBuildsComparison: function() {
        var newComparisons = this.getComparisonFields();
        this.setState({ compareAllBuilds: !this.state.compareAllBuilds, updateTarget : "BUILD-OVERVIEW", comparisons : newComparisons });
    },
    render: function() {
        var affinityWeightingData = this.getAffinityWeighting();
        var statComparisonData = this.getComparisonData();
        var spiderChartData = this.getOverviewData();

        var hiddenStyle = this.props.deck.builds.length > 0 ? {} : { display: "none" };
        var hiddenClass = this.props.deck.builds.length > 0 ? "" : "hidden"

        return (
            <div>
                <div id="deck-info">
                    <div id="hero-avatar">
                        <img src={ Helpers.getHeroImageURL(this.props.deck.hero)} alt={this.props.deck.hero.name} />
                    </div>
                    <div id="title-wrapper">
                        <h2>{this.props.deck.title}</h2>
                        <p>{this.props.deck.description}</p>
                    </div>
                    <div id="vote-wrapper">
                        <i className="fa fa-star"></i> <span>{0}</span>
                    </div>
                </div>

                <ul id="build-tabs">
                    { this.renderBuildTabs() }
                </ul>
                <div id="builds-wrapper">
                    <ul className={"build-list"}>
                        { this.renderBuildSlots() }
                    </ul>
                </div>

                <div id="deck-stat-container">
                    <div id="statistic-title-wrapper">
                        <h3>{ this.state.selectedBuild !== null ? "Build" : "Deck" } statistics</h3>
                        <div id="rank-slider">
                            <Rcslider defaultValue={1} min={1} max={15} onChange={this.sliderChanged} tipFormatter={null}  />
                        </div>
                    </div>
                    { this.renderStatPanel() }
                </div>

                <div id="chart-wrapper">
                    <div className={"chart left " + hiddenClass} style={hiddenStyle}>
                        <h3>{ this.state.selectedBuild !== null ? "Build" : "Deck" }  Overview</h3>
                        <div className={ this.state.compareAllBuilds ? "toggle-button active" : "toggle-button" } onClick={this.toggleAllBuildsComparison}><span>Compare all builds in this deck</span></div>
                        <SpiderWebChart updateTarget={this.state.updateTarget} type="BUILD-OVERVIEW" series={spiderChartData} container="overview-container" />
                    </div>
                    <div className={"chart right " + hiddenClass}>
                        <div className="chart stacked" style={hiddenStyle}>
                            <h3>{ this.state.selectedBuild !== null ? "Build" : "Deck" }  Comparison <SelectBox optionSelectedAtIndex={this.updateComparisonType} label="compare:" value={this.state.comparisons[this.state.compareIndex] ? this.state.comparisons[this.state.compareIndex].label : ""} items={this.state.comparisons} /></h3>
                            <HorizontalBarChart updateTarget={this.state.updateTarget} type="BUILD-COMPARISON" container="build-comparison-container" max={statComparisonData.max} useValue={true} height={ statComparisonData.chartHeight } colors={ statComparisonData.chartColors } series={statComparisonData} />
                        </div>
                        <div className="chart stacked">
                            <h3>{ this.state.selectedBuild !== null ? "Build" : "Deck" }  Affinity Weighting</h3>
                            <HorizontalBarChart updateTarget={this.state.updateTarget} type="AFFINITY-WEIGHTING" container="affinity-weighting-container" max={affinityWeightingData.max} useValue={false} height={ affinityWeightingData.chartHeight } colors={ affinityWeightingData.chartColors } series={affinityWeightingData} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

// Render the main container for this application
var container = document.querySelector("#deck-container");
if(container) {
    ReactDOM.render( <DeckDetail deck={ DECK } />, container);
}
// Render any widgets for the page, we add this here as we dont want
// to override other sidebar instances
var sidebar = document.querySelector(".sidebar-with-widgets");
if(sidebar) {
    var widgets = (
        <div>
            <DeckWidget           deck={ DECK } sharedTooltip={ window.tooltip } />
            <CostCurveWidget      deck={ DECK } />
            <SuggestedDecksWidget hero={ DECK.hero } />
        </div>
    );
    ReactDOM.render( widgets, sidebar );
}
