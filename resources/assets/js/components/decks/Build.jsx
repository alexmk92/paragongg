var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');
var CardEffects = require('../cards/CardEffects');
var Tooltip = require('../libraries/tooltip/Toptip');
var ToggleFilter = require('../filter/ToggleFilter');
var BuildStats = require('./BuildStats');

var Build = React.createClass({
    componentWillMount: function() {
        this.isClientMobile = Helpers.isClientMobile();
        this.tooltip = this.props.tooltip || new Tooltip();
        this.lastSelectedCard = this.props.lastSelectedCard;
        this.lastSelectedUpgradeSlot = null;
        this.lastSelectedSlot = -1;
        this.queuedCards    = [];
        this.queuedUpgrades = [];

        window.addEventListener('resize', this.updateViewForDimensions);

        // No tooltip on mobile
        if(this.isClientMobile) {
            this.tooltip = null;
        }
    },
    componentDidMount: function() {
        window.scrollTo(0, 0);
        if(this.isClientMobile) {
            this.refs.buildTitleInput.focus();
        }
        if(this.props.build.title !== "") {
            this.refs.buildTitleInput.value = this.props.build.title;
        }
    },
    updateViewForDimensions: function() {
        if(!Helpers.isClientMobile()) {
            this.tooltip = this.props.tooltip || new Tooltip();
        } else {
            this.tooltip = null;
        }
    },
    shouldComponentUpdate: function(nextProps) {
        // This allows us to update the build with the new deleted cards each load
        if(nextProps.build.code !== this.props.build.code) {
            return true;
        }
        return nextProps !== this.props;
    },
    componentDidUpdate: function(prevProps, prevState) {
        //this.updateBuildsWithNewDeck();
        // Perform a quick bind on the selected card
        if(prevProps.build.code !== this.props.build.code) {
            window.scrollTo(0, 0);
        }
        if(this.props.shouldQuickBindCards) {
            this.quickBind(this.props.selectedCard);
        }
        if(this.props.build.title === "") {
            this.refs.buildTitleInput.value = "";
            if(!this.isClientMobile) this.refs.buildTitleInput.focus();
        } else {
            this.refs.buildTitleInput.value = this.props.build.title;
        }
        this.renderQueuedCards();
    },
    quickBind: function() {
        var newBuild = this.props.build;
        // CANNOT QUICK BIND UPGRADES
        if(this.props.selectedCard !== null && this.props.selectedCard.type !== "Upgrade") {
            newBuild.slots.some(function (slot, slotIndex) {
                if (slot.card === null) {
                    this.bindCard(slotIndex);
                    return true;
                }
                return false;
            }.bind(this));
        }
    },
    buildUpdated: function(newBuild, lastModifiedSlot, deselectSelectedCard, toggleQuickBind, activeTab) {
        if(lastModifiedSlot === null)
            lastModifiedSlot = this.lastModifiedSlot;
        if(toggleQuickBind !== true)
            toggleQuickBind = false;

        console.log("THE BUILD UPDATED WITH: ", newBuild);
        //this.lastSelectedCard = this.props.selectedCard;
        var hasQuantity = this.validateQuantity(true);
        newBuild.cost = this.getBuildCost();

        this.lastSelectedSlot = -1;
        this.props.onBuildChanged(newBuild, lastModifiedSlot, deselectSelectedCard, toggleQuickBind, !hasQuantity, activeTab);
    },
    getUpgradeSlots: function(slot, activeClass) {
        // Dont show this section on unplaced cards
        var deleteWrapper = "";
        if(typeof slot.card === "undefined" || slot.card === null) {
            return "";
        }
        // Friendly message for no slots
        if(typeof slot.upgrades === "undefined" || slot.upgrades.length === 0) {
            return <div key={"upgrade-slot" + slot.card.code} className="upgrade-slot"><span>NO UPGRADE SLOTS</span></div>
        } else {
            return slot.upgrades.map(function(upgrade) {
                if(upgrade) {
                    var label = "";
                    var slotStyle = { backgroundImage : "" };
                    if(upgrade.card === null) {
                        activeClass = "";
                        label = <span className="upgrade-label">EMPTY SLOT</span>;
                    } else {
                        activeClass = "";
                        if(this.lastSelectedUpgradeSlot !== null) {
                            if (this.lastSelectedUpgradeSlot.parentSlot === slot && slot.upgrades.indexOf(upgrade) === this.lastSelectedUpgradeSlot.upgradeSlotIndex) {
                                activeClass = " selected";
                            }
                        }
                        label = <span className="upgrade-label"><span className="subtext">{upgrade.card.cost}CP </span>{upgrade.card.name}</span>;
                        slotStyle = { backgroundImage: 'url('+Helpers.getCardImageURL(upgrade.card, "medium", "icon")+')' }
                    }

                    return (
                        <div className={ "upgrade-slot " + activeClass }
                             key={"upgrade-slot-" + Helpers.uuid() }
                             onContextMenu={this.removeUpgradeFromCard.bind(this, upgrade, slot.card)}
                             onClick={this.bindUpgradeToCard.bind(this, upgrade, slot.card, false)}
                             style={ slotStyle }
                             onMouseEnter={this.setTooltipContent.bind(this, upgrade.card, null)}
                             onMouseOver={this.showTooltip.bind(this, upgrade.card, "upgrade-label")}
                             onMouseLeave={this.hideTooltip}
                        >
                            { deleteWrapper }
                            { label }
                            <div className="overlay"></div>
                        </div>
                    )
                }
            }.bind(this));
        }
    },
    validateCardType: function(upgradeSlot) {
        var hasSamePassiveEffect = false;
        if(upgradeSlot && this.props.selectedCard) {
            var passiveList = "";
            var damageType = this.props.selectedCard.damageType || null;
            this.props.selectedCard.effects.some(function(effect) {
                if(effect.stat && effect.stat.toUpperCase() === 'ATTACKRATING') {
                    if(this.props.selectedCard.damageType && this.props.selectedCard.damageType.toUpperCase() === 'ENERGY') {
                        effect.stat = 'ATTACKRATING-E';
                    } else {
                        effect.stat = 'ATTACKRATING-P';
                    }
                }
                var statString = "";
                if(effect.stat) statString = effect.stat.toUpperCase();
                else if(effect.description) statString = effect.description.toUpperCase();
                var selectedEffectType = Helpers.getFormattedStatistic(statString, damageType);
                if(upgradeSlot.parentCard.effects) {
                    passiveList = "";
                    upgradeSlot.parentCard.effects.forEach(function(slotEffect) {
                        if(slotEffect.stat && slotEffect.stat.toUpperCase() === 'ATTACKRATING') {
                            if(upgradeSlot.parentCard.damageType && upgradeSlot.parentCard.damageType.toUpperCase() === 'ENERGY') {
                                slotEffect.stat = 'ATTACKRATING-E';
                            } else {
                                slotEffect.stat = 'ATTACKRATING-P';
                            }
                        }
                        if(slotEffect.stat) statString = slotEffect.stat.toUpperCase();
                        else if(slotEffect.description) statString = slotEffect.description.toUpperCase();
                        var slotEffectType = Helpers.getFormattedStatistic(statString, damageType);
                        if(!Helpers.isNullOrUndefined(slotEffectType)) {
                            passiveList += slotEffectType.label + ", ";
                        }
                        if(!Helpers.isNullOrUndefined(selectedEffectType) && !Helpers.isNullOrUndefined(slotEffectType) && selectedEffectType.label === slotEffectType.label) {
                            hasSamePassiveEffect = true;
                        }
                    }.bind(this));
                } else { hasSamePassiveEffect = false }
                return hasSamePassiveEffect;
            }.bind(this));

            if(!hasSamePassiveEffect) {
                this.invokeNotification("warning", "You must slot an upgrade card which has the following passives: " + passiveList);
            }

            // MUST BE AN UPGRADE
            if(this.props.selectedCard.type !== "Upgrade") {
                this.invokeNotification("warning", "Only upgrade cards may be fitted into that slot!");
                hasSamePassiveEffect = false;
            }
        }
        return hasSamePassiveEffect;
    },
    validateSlot: function(slotIndex) {
        var valid = false;
        if(this.props.selectedCard) {
            switch(this.props.selectedCard.type) {
                case "Passive" : valid = slotIndex <= 6; break;
                case "Active" : valid = slotIndex <= 3; break;
                case "Upgrade": valid = false; break;
                case "Prime": valid = false; break;
                default: break;
            }
        }
        if(!valid) {
            this.invokeNotification("warning", "This card cannot go in that slot.");
        }
        return valid;
    },
    bindUpgradeToCard: function(upgradeSlot, card, bindUpgradeAtNextAvailableIndex) {
        if(this.props.selectedCard !== null && (this.getBuildCost() + this.props.selectedCard.cost) > 60) {
            this.lastSelectedSlot = -1;
            this.invokeNotification("warning", "You cannot add that card because you would exceed the card points total for this build!");
            //this.forceUpdate();
            return false;
        }

        // GET THE NEXT AVAILABLE SLOT
        if(this.validateQuantity(false) && this.props.selectedCard) {
            // Got here by clicking on parent card to bind child
            this.lastSelectedUpgradeSlot = null;
            // Ensure we dont get a callstack error when trying to replace an existing card slot
            //if(upgradeSlot.card !== null) upgradeSlot.card === null;
            if(bindUpgradeAtNextAvailableIndex) {
                var nextAvailableSlot = null;
                upgradeSlot.upgrades.forEach(function (slot, i) {
                    if (slot.card === null && nextAvailableSlot === null) {
                        nextAvailableSlot = i;
                    }
                });
                if (nextAvailableSlot !== null && this.validateCardType(upgradeSlot.upgrades[nextAvailableSlot])) {
                    var newBuild = this.props.build;
                    var slotIndex = newBuild.slots.indexOf(upgradeSlot);
                    if (slotIndex > -1 && this.props.selectedCard) {
                        newBuild.slots[newBuild.slots.indexOf(upgradeSlot)].upgrades[nextAvailableSlot].card = this.props.selectedCard;
                        this.buildUpdated(newBuild, slotIndex, this.props.shouldQuickBindCards, null);
                    }
                }
            }
            // Got here by clicking on card
            else if(this.validateCardType(upgradeSlot) && !bindUpgradeAtNextAvailableIndex) {
                // ATTEMPT TO BIND THE CARD
                newBuild = this.props.build;
                var newSlots = newBuild.slots;


                var lastModdedSlot = null;
                this.props.build.slots.forEach(function(oldSlot, index) {
                    if(oldSlot.card !== null && (oldSlot.card.code === card.code)) {
                        var oldUpgradeIndex = oldSlot.upgrades.indexOf(upgradeSlot);
                        if(oldUpgradeIndex > -1) {
                            lastModdedSlot = index;
                            newSlots[lastModdedSlot].upgrades[oldUpgradeIndex].card = this.props.selectedCard;
                        }
                    }
                }.bind(this));

                newBuild.slots = newSlots;
                this.buildUpdated(newBuild, lastModdedSlot, this.props.shouldQuickBindCards, null);
            }
        }
    },
    removeUpgradeFromCard: function(upgradeSlot, card, event) {
        if(Helpers.isNullOrUndefined(event)) return;

        event.preventDefault();
        var newBuild = this.props.build;
        var lastModdedSlot = null;
        newBuild.slots = this.props.build.slots.map(function(oldSlot, index) {
            if(oldSlot.card !== null && (oldSlot.card.code === card.code)) {
                var lastUpgradeIndex = oldSlot.upgrades.indexOf(upgradeSlot);
                if(lastUpgradeIndex > -1) {
                    lastModdedSlot = index;
                    oldSlot.upgrades[lastUpgradeIndex].card = null;
                }
            }
            return oldSlot;
        }.bind(this));
        this.buildUpdated(newBuild, lastModdedSlot, this.props.shouldQuickBindCards, null);
    },
    invokeNotification: function(type, message) {
        this.props.selectedCard = null;
        this.props.onNotificationInvoked(type, message);
    },
    renderQueuedCards: function() {
        if(this.queuedCards) {
            this.queuedCards.forEach(function(action) {
                this.bindCard(action.index);
            }.bind(this));
            this.queuedCards = [];
        }
        if(this.queuedUpgrades) {
            this.queuedUpgrades.forEach(function(action) {
                this.bindUpgradeToCard(action.slot, action.card, action.bindAtNextIndex);
            }.bind(this));
            this.queuedUpgrades = [];
        }
    },
    hasSamePassiveEffects: function(selectedCard, upgradeCard) {
        if(selectedCard === null || upgradeCard === null)
            return true;

        var hasSamePassiveEffect = false;
        if(upgradeCard && selectedCard && typeof selectedCard.effects !== "undefined") {
            selectedCard.effects.some(function(effect) {
                var statString = "";
                if(effect.stat) statString = effect.stat.toUpperCase();
                if(effect.description) statString = effect.description.toUpperCase();
                var damageType = selectedCard.damageType || null;
                var selectedEffectType = Helpers.getFormattedStatistic(statString, damageType);
                if(upgradeCard.effects) {
                    upgradeCard.effects.forEach(function(upgradeEffect) {
                        if(upgradeEffect.stat) statString = upgradeEffect.stat.toUpperCase();
                        if(upgradeEffect.description) statString = upgradeEffect.description.toUpperCase();
                        var damageType = upgradeCard.damageType || null;
                        var slotEffectType = Helpers.getFormattedStatistic(statString, damageType);
                        if(!Helpers.isNullOrUndefined(selectedEffectType) && !Helpers.isNullOrUndefined(slotEffectType) && selectedEffectType.label === slotEffectType.label) {
                            hasSamePassiveEffect = true;
                        }
                    });
                } else { hasSamePassiveEffect = false }
                return hasSamePassiveEffect;
            });
        }
        return hasSamePassiveEffect;
    },
    getBuildSlots: function() {
        return this.props.build.slots.map(function(slot, i) {
            var activeClass = "";
            var card = "";
            var cardPulse = "";
            var upgradePulse = "";

            if(this.props.autoPlaceIndex === i && this.isClientMobile && this.props.selectedCard !== null) {
                if(this.props.selectedCard.type !== "Upgrade") {
                    this.queuedCards.push({
                        slot: slot,
                        index : i
                    });
                } else {
                    this.queuedUpgrades.push({
                        slot: slot,
                        card : slot.card,
                        bindAtNextIndex: true
                    })
                }
            }
            else if(this.props.autoPlaceIndex != -1 && this.lastSelectedSlot === i && this.isClientMobile && this.props.selectedCard !== null) {
                if(typeof slot.upgrades !== "undefined" || slot.upgrades !== null ) {
                    //this.bindUpgradeToCard(slot.upgrades[this.props.autoPlaceIndex], slot.card, false);
                    this.queuedUpgrades.push({
                        slot: slot.upgrades[this.props.autoPlaceIndex],
                        card: slot.card,
                        bindAtNextIndex: false
                    });
                }
            }

            // IS THIS AN ACTIVE OR PASSIVE SLOT (ACTIVE = ONE)
            var type = (i < 4) ? "Active" : "Passive" ;

            if((this.props.selectedCard && typeof this.props.selectedCard !== "undefined")) {
                if((type === this.props.selectedCard.type || this.props.selectedCard.type === "Passive")) {
                    if(!this.props.shouldQuickBindCards) {
                        activeClass = (slot.card === null) ? "active-slot " : "";
                    }

                    /*
                    if (this.props.lastModifiedSlot === i) {
                        //cardPulse = "pulse-glow";
                    }
                    */
                }
            }
            // CHECK FOR AUTO ADDING
            if(this.props.shouldQuickBindCards && (this.lastSelectedCard && typeof this.lastSelectedCard !== "undefined")) {
                /*
                if((type === this.lastSelectedCard.type || this.lastSelectedCard.type === "Passive")) {
                    if (this.props.lastModifiedSlot === i) {
                        cardPulse = "pulse-glow";
                    }
                }
                */
            }
            if(slot.card !== null) {
                activeClass = "active-placed";

                if(this.props.selectedCard && slot.card.upgradeSlots && slot.card.upgradeSlots > 0 && this.props.selectedCard.type === "Upgrade") {
                    if(this.props.selectedCard.affinity === slot.card.affinity || this.props.selectedCard.affinity === "Universal") {
                        upgradePulse = "";
                    }
                }

                var cardStyles = { backgroundImage : "url(" + Helpers.getCardImageURL(slot.card, "medium") + ")"};
                card = (
                    <div style={cardStyles}
                         className="placed-card"
                         key={"card-" + i}
                    >
                        <span className="card-title">{ slot.card.name }</span>
                    </div>
                );
            }
            var actionButtons = (function() {
                // ALWAYS RETURN THIS VIEW FOR MOBILE ON TRAP
                if(this.isClientMobile && slot.card) {
                    return (
                        <div key={"action-buttons-" + i } className={"delete-wrapper"} onClick={this.bindCardToSlot.bind(this, i)}
                             onContextMenu={this.removeCardFromSlot.bind(this, i, true)}>
                            <i onClick={this.removeCardFromSlot.bind(this, i, false)} className="fa fa-trash"
                               aria-hidden="true"/>
                            <i onClick={this.requestActiveTab.bind(this, 0, i, slot.card)} className="fa fa-refresh"
                               aria-hidden="true"/>
                        </div>
                    );
                }
                // CANNOT BE A UPGRADE CARD
                if(!this.isClientMobile) {
                    if(this.props.selectedCard !== null && this.props.selectedCard.type !== "Upgrade") {
                        if(this.props.selectedCard === slot.card) {
                            return (
                                <div key={"action-buttons-" + i } className="delete-wrapper" onClick={this.bindCardToSlot.bind(this, i)} onContextMenu={this.removeCardFromSlot.bind(this, i, true)}>
                                    <i onClick={this.removeCardFromSlot.bind(this, i, false)} className="fa fa-trash" aria-hidden="true" />
                                </div>
                            );
                        } else {
                            return (
                                <div key={"action-buttons-" + i } className="delete-wrapper" onClick={this.bindCardToSlot.bind(this, i)}
                                     onContextMenu={this.removeCardFromSlot.bind(this, i, true)}>
                                    <i onClick={this.removeCardFromSlot.bind(this, i, false)} className="fa fa-trash"
                                       aria-hidden="true"/>
                                    <i onClick={this.bindCardToSlot.bind(this, i)} className="fa fa-refresh"
                                       aria-hidden="true"/>
                                </div>
                            );
                        }
                    } else {
                        return (
                            <div key={"delete-wrapper-" + i } className="delete-wrapper" onContextMenu={this.removeCardFromSlot.bind(this, i, true)}>
                                <i onClick={this.removeCardFromSlot.bind(this, i, false)} className="fa fa-trash" aria-hidden="true" />
                            </div>
                        );
                    }
                }
            }.bind(this))();
            if(!Helpers.isNullOrUndefined(this.props.selectedCard) && !this.isClientMobile) {
                if(this.props.selectedCard.type.toUpperCase() === "UPGRADE") {
                    if(!this.hasSamePassiveEffects(this.props.selectedCard, slot.card)) {
                        activeClass += " faded";
                    }
                }
            }
            if(this.lastSelectedSlot > -1 && !this.isClientMobile) {
                if(i !== this.lastSelectedSlot && activeClass.indexOf("faded") < 0) {
                    activeClass += " faded";
                }
            }
            return (
                <li id={"c_" + i}
                    onContextMenu={this.removeCardFromSlot.bind(this, i, true)}
                    onClick={this.bindCardToSlot.bind(this, i)}
                    className={slot.type + " build-slot " + activeClass}
                    key={"slot_" + i}
                    onMouseEnter={this.setTooltipContent.bind(this, slot.card, null)}
                    onMouseOver={this.showTooltip.bind(this, slot.card, "glow-layer")}
                    onMouseLeave={this.hideTooltip}
                >
                    { actionButtons }
                    <div className={"glow-layer " + cardPulse + "-inner"}></div>
                    <div className={"glow-layer " + cardPulse + "-outer"}></div>
                    <span className="slot-label">{slot.type}</span>
                    { card }
                    <div className={"pulsing-arrow " + activeClass}>
                        <i className="fa fa-arrow-circle-up" aria-hidden="true" />
                    </div>
                    <div className="upgrade-slot-wrapper">
                        { this.getUpgradeSlots( slot, upgradePulse ) }
                    </div>
                </li>
            );
        }.bind(this));
    },
    requestActiveTab: function(tabIndex, slot, filter, card) {
        this.lastSelectedSlot = slot;
        if(typeof filter === "undefined" || filter === null)
            filter = null;

        this.props.requestActiveTab(tabIndex, slot, filter, card);
    },
    validateQuantity: function(surpressNotification) {
        if(this.props.deck && this.props.selectedCard) {
            // CANT ADD A PRIME HELIX
            if(this.props.selectedCard.type === "Prime" && !surpressNotification) {
                this.invokeNotification("warning", "You can't add a Prime Helix to a build.");
                return false;
            }
            // MAKE SURE WE HAVE ENOUGH CARDS IN THE DECK
            var cardWithQuantity = null;
            this.props.deck.all.some(function(deckCard) {
                if(deckCard.code === this.props.selectedCard.code) {
                    cardWithQuantity = deckCard;
                    return true;
                }
                return false;
            }.bind(this));
            if(cardWithQuantity) {
                var cardsOfTypeFound = 0;
                var currentSlotIndex = -1;
                var currentUpgradeIndex = -1;
                this.props.build.slots.forEach(function(slot, index) {
                    if(slot.card !== null && slot.card.code === this.props.selectedCard.code) {
                        cardsOfTypeFound += 1;
                        currentSlotIndex = index;
                    }
                    slot.upgrades.forEach(function(slot, index) {
                        if(slot.card !== null && slot.card.code === this.props.selectedCard.code) {
                            cardsOfTypeFound += 1;
                            currentUpgradeIndex = index;
                        }
                    }.bind(this))
                }.bind(this));
                if(((cardWithQuantity.quantity - cardsOfTypeFound) > 0)) {
                    return true;
                } else {
                    if(this.currentBindIndex === currentSlotIndex)
                        return false;

                    if(!surpressNotification) {
                        this.invokeNotification("warning", "You have used all of the available " + this.props.selectedCard.name + "'s in your deck in this build.");
                    }

                    return false;
                }
            }
        }
        return false;
    },
    bindCardToSlot: function(index, event) {
        if(Helpers.isNullOrUndefined(event)) return;
        event.preventDefault();
        var elem = event.target;
        
        this.lastModifiedSlot = index;
        this.currentBindIndex = index;

        if(elem.className.indexOf("fa-trash") > -1 || this.lastSelectedSlot === index) {
            this.lastSelectedSlot = -1;
        } else {
            this.lastSelectedSlot = index;
        }

        if(this.props.selectedCard !== null) {
            if(this.props.selectedCard.type !== "Upgrade" && ((elem.className.indexOf("glow-layer") > -1 || elem.className.indexOf("delete-wrapper") > -1 || elem.className.indexOf("fa-refresh") > -1))) {
                this.bindCard(index);
                this.lastSelectedSlot = -1;
            } else if(this.props.selectedCard.type === "Upgrade") {
                var bindSlot = null;
                this.props.build.slots.forEach(function(slot, i) {
                    if(i === index) { bindSlot = slot; }
                });
                if(elem.className.indexOf("glow-layer") > -1 || elem.className.indexOf("delete-wrapper") > -1)
                    this.bindUpgradeToCard(bindSlot, bindSlot.card, true);
                this.lastSelectedSlot = -1;
            }
        } else if(this.isClientMobile) {
            var slot = this.props.build.slots[index];
            if(!slot.card) {
                if(Helpers.hasClass(elem, "glow-layer")) this.requestActiveTab(0, index, "EQUIPMENT");
            } else if(slot.card && this.lastSelectedSlot === index) {
                if(Helpers.hasClass(elem, "fa-refresh")) this.requestActiveTab(0, index, slot.card);
                if(Helpers.hasClass(elem, "upgrade-label") || Helpers.hasClass(elem, "overlay")) this.requestActiveTab(0, index, "UPGRADES", slot.card);
            }
        } else {
            var slot = this.props.build.slots[index];
            if(slot && slot.card !== null) {
                this.props.onShowUpgradeCardsForSlot(slot.card);
            }
        }
    },
    bindCard: function(index) {
        if(this.props.selectedCard !== null && (this.getBuildCost() + this.props.selectedCard.cost) > 60) {
            this.lastSelectedSlot = index;
            this.invokeNotification("warning", "You cannot add that card because you would exceed the card points total for this build!");
            return false;
        }
        
        this.lastModifiedSlot = index;

        if(this.validateQuantity(false) && this.validateSlot(index)) {
            var newSlots = this.props.build.slots;

            var upgradeSlots = typeof this.props.selectedCard.upgradeSlots !== "undefined" ? this.props.selectedCard.upgradeSlots : 0;
            newSlots.forEach(function (slot, i) {
                if (i === index) {
                    if (this.props.selectedCard) {
                        var card = (JSON.parse(JSON.stringify(this.props.selectedCard)));
                        card.quantity = 1;
                        slot.card = card;
                        slot.occupied = true;

                        slot.upgrades = [];
                        for (var j = 0; j < upgradeSlots; j++) {
                            slot.upgrades.push({requiredAffinity: this.props.selectedCard.affinity, card: null, parentCard: slot.card})
                        }
                    }
                    newSlots[index] = slot;
                }
            }.bind(this));

            var newBuild = this.props.build;
            newBuild.slots = newSlots;
            
            this.buildUpdated(newBuild, index, this.props.shouldQuickBindCards, null);
        }
    },
    getBuildCost: function() {
        var points = 0;
        if(this.props.build !== null) {
            this.props.build.slots.forEach(function(slot) {
                if(typeof slot.card !== "undefined" && slot.card !== null) {
                    points += slot.card.cost;
                    slot.upgrades.forEach(function(upgradeSlot) {
                        if(upgradeSlot.card) {
                            points += upgradeSlot.card.cost;
                        }
                    });
                }
            });
        }
        return points;
    },
    removeCardFromSlot: function(index, wasRightClick, event) {
        if(Helpers.isNullOrUndefined(event)) return;

        if(event) {
            this.lastSelectedSlot = -1;
            this.lastModifiedSlot = index;

            event.preventDefault();
            if(((event.target.className.indexOf("glow-layer") > -1 || event.target.className.indexOf("delete-wrapper") > -1) && wasRightClick) || event.target.className.indexOf("fa-trash") > -1) {
                var newSlots = this.props.build.slots;
                var activeTab = null;
                newSlots.forEach(function(slot, i) {
                    if(index === i) {
                        slot.upgrades = [];
                        slot.occupied = false;
                        slot.card = null;
                        newSlots[i] = slot;
                    }
                }.bind(this));

                var newBuild = this.props.build;
                newBuild.slots = newSlots;

                if(this.isClientMobile) {
                    activeTab = -1;
                }

                this.buildUpdated(newBuild, index, this.props.shouldQuickBindCards, activeTab);
            }
        }

    },
    // TODO THROTTLE THE UPDATE LIMIT SOME HOW
    titleChanged: function() {
        var value = this.refs.buildTitleInput.value;
        if(typeof value !== "undefined" && value.length < 60) {
            var newBuild = this.props.build;
            newBuild.title = value;

            this.buildUpdated(newBuild, this.lastModifiedSlot, this.props.shouldQuickBindCards, null);
        }
    },
    /* TOOLTIP METHODS */
    setTooltipContent: function(card, message) {
        if(!this.isClientMobile && this.tooltip !== null) {
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
        if(Helpers.isNullOrUndefined(event)) return;

        if(!this.isClientMobile && this.tooltip !== null) {
            if(card) {
                if(event.target.className.toLowerCase().indexOf(selector.toLowerCase()) > -1) {
                    this.tooltip.showTooltip();
                }
            } else if(card === null && selector === null) {
                this.tooltip.showTooltip();
            }
        }
    },
    hideTooltip: function() {
        if(this.tooltip !== null) {
            this.tooltip.hideTooltip();
        }
    },
    toggleQuickBind: function() {
        this.buildUpdated(this.build, null, true, !this.props.shouldQuickBindCards, null);
    },
    numberOfCardsPlaced: function() {
        var total = 0;
        this.props.build.slots.forEach(function(slot) {
            if(slot.card) total++;
        });
        return total;
    },
    // Sort cards for the build stats component, sorts into all, equipment, upgrades, prime
    sortCards: function(cards) {
        var sortedCards = {
            all : [],
            upgrades : [],
            equipment : [],
            prime : []
        };

        cards.forEach(function(card) {
            for(var i = 0; i < card.quantity; i++) {
                sortedCards.all.push(card);
                switch(card.type.toUpperCase()) {
                    case "UPGRADE": sortedCards.upgrades.push(card);break;
                    case "ACTIVE": sortedCards.equipment.push(card);break;
                    case "PASSIVE": sortedCards.equipment.push(card);break;
                    case "PRIME": sortedCards.prime.push(card);break;
                    default: break;
                }
            }
        });

        return sortedCards;
    },
    render: function() {
        var newTitle = Helpers.debounce(function() {
            this.titleChanged();
        }.bind(this), 350);
        var buildListClass = this.numberOfCardsPlaced() > 0 ? " upgrades-showing" : "";

        return (
            <div className="builds-wrapper">
                <input defaultValue={this.props.build.title} onChange={newTitle} className="h2" placeholder="ENTER BUILD TITLE" ref="buildTitleInput" />
                <span className="build-cost">{ this.getBuildCost() }/60 <span>CP</span></span>
                <ul className={"build-list " + buildListClass }>
                    { this.getBuildSlots() }
                </ul>
                <BuildStats requireModuleDependencies={false} forceShowStatPanel={true} resetStatPanel={true} selectedBuild={this.props.build} hero={this.props.hero} cards={this.sortCards(this.props.deck.all)} builds={[this.props.build]} />
            </div>
        )
    }
});

module.exports = Build;