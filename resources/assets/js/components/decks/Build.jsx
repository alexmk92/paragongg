var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');
var StatPanel = require('./StatPanel');
var Tooltip = require('../libraries/tooltip/Toptip');
var ToggleFilter = require('../filter/ToggleFilter');

var Build = React.createClass({
    componentWillMount: function() {
        this.tooltip = this.props.tooltip || new Tooltip();
        this.lastSelectedCard = this.props.lastSelectedCard;
        this.lastSelectedSlot = -1;
        this.queuedCards    = [];
        this.queuedUpgrades = [];
    },
    componentDidMount: function() {
        this.refs.buildTitleInput.focus();
    },
    componentDidUpdate: function() {
        this.updateBuildsWithNewDeck();
        // Perform a quick bind on the selected card
        if(this.props.shouldQuickBindCards) {
            this.quickBind(this.props.selectedCard);
        }
        if(this.props.build.title === "") {
            this.refs.buildTitleInput.value = "";
            this.refs.buildTitleInput.focus();
        }
        this.renderQueuedCards();
    },
    isClientMobile: function() {
        return window.innerWidth <= 1050;
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

        //this.lastSelectedCard = this.props.selectedCard;
        var hasQuantity = this.validateQuantity(true);
        newBuild.cost = this.getBuildCost();

        this.props.onBuildChanged(newBuild, lastModifiedSlot, deselectSelectedCard, toggleQuickBind, !hasQuantity, activeTab);
    },
    updateBuildsWithNewDeck: function() {
        var lastOfTypeRemoved = false;
        if(this.props.lastDeletedCard) {
            this.props.build.slots.forEach(function(slot, slotIndex) {
                var newBuild = this.props.build;
                var newSlots = this.props.build.slots;

                // ALL PARENT CARDS
                if(slot.card && this.props.lastDeletedCard.type !== "Upgrade")
                {
                    // 0 cards found in the deck
                    if(this.props.deck.indexOf(slot.card) < 0) {
                        newSlots.forEach(function(slot, i) {
                            if(slotIndex === i) {
                                slot.occupied = false;
                                slot.card = null;
                                slot.upgrades = [];
                                newSlots[i] = slot;
                            }
                        }.bind(this));

                        newBuild.slots = newSlots;
                        this.buildUpdated(newBuild, slotIndex, this.props.shouldQuickBindCards, null);
                    }
                    // Check for cards that had a multi delete
                    else if(this.props.deck.indexOf(slot.card) > -1) {
                        if(!lastOfTypeRemoved) {
                            var placedQuantity = 0;
                            var lastEncounteredIndex = -1;
                            // Set the quantity, but add 1 as its already been decremented prior
                            var quantityToCheck = this.props.lastDeletedCard.quantity + 1;
                            if(1 < quantityToCheck) {
                                newSlots.forEach(function(slot, slotIndex) {
                                    if(slot.card) {
                                        if(this.props.lastDeletedCard.code === slot.card.code) {
                                            placedQuantity++;
                                            lastEncounteredIndex = slotIndex;
                                        }
                                    }
                                }.bind(this));

                                // Check if a card of this type was placed, if it has been we need to remove it
                                if(placedQuantity >= quantityToCheck) {
                                    newSlots[lastEncounteredIndex].occupied = false;
                                    newSlots[lastEncounteredIndex].card = null;
                                    newSlots[lastEncounteredIndex].upgrades = [];
                                }
                                newBuild.slots = newSlots;

                                lastOfTypeRemoved = true;
                                this.buildUpdated(newBuild, slotIndex, this.props.shouldQuickBindCards, null);
                            }
                        }
                    }
                }
                else if(slot.card) {
                    // Then delete any missing children
                    var deletedSlot = null;
                    var deletedSlotIndex = null;
                    var placedQuantity = 0;

                    slot.upgrades.forEach(function(upgradeSlot, index) {
                        if(upgradeSlot.card) {
                            if(this.props.deck.indexOf(upgradeSlot.card) < 0) {
                                deletedSlotIndex = index;
                                deletedSlot = upgradeSlot;
                            }
                            // Check for cards that had a multi delete
                            else if(this.props.deck.indexOf(upgradeSlot.card) > -1) {
                                // Set the quantity, but add 1 as its already been decremented prior
                                var quantityToCheck = this.props.lastDeletedCard.quantity + 1;
                                if(1 < quantityToCheck) {
                                    if(this.props.lastDeletedCard.code === upgradeSlot.card.code) {
                                        placedQuantity++;
                                        deletedSlot = upgradeSlot;
                                        deletedSlotIndex = index;
                                    }
                                    // Check if a card of this type was placed, if it has been we need to remove it
                                    if(placedQuantity < quantityToCheck) {
                                        deletedSlot = null;
                                        deletedSlotIndex = null;
                                    }
                                }
                            }
                        }
                    }.bind(this));
                    if(deletedSlot !== null && deletedSlotIndex !== null) {
                        newBuild = this.props.build;
                        if(newBuild.slots.indexOf(slot) > -1) {
                            newBuild.slots[newBuild.slots.indexOf(slot)].upgrades[deletedSlotIndex].card = null;
                            this.buildUpdated(newBuild, slotIndex, this.props.shouldQuickBindCards, null);
                        }
                    }
                }
            }.bind(this));
        }
        // JUST DELETE ALL NOT FOUND CARDS
        else {
            var newBuild = this.props.build;
            this.props.build.slots.forEach(function(slot, slotIndex) {
                if(slot.card) {
                    // 0 cards found in the deck
                    if(this.props.deck.indexOf(slot.card) < 0) {
                        newSlots.forEach(function(slot, i) {
                            if(slotIndex === i) {
                                slot.occupied = false;
                                slot.card = null;
                                slot.upgrades = [];
                                newSlots[i] = slot;
                            }
                        }.bind(this));

                        newBuild.slots = newSlots;
                        this.buildUpdated(newBuild, slotIndex, this.props.shouldQuickBindCards, null);
                    }
                }
            }.bind(this));
        }
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
                        label = <span className="upgrade-label">EMPTY SLOT</span>;
                    } else {
                        activeClass = "";
                        if(this.lastSelectedUpgradeSlot !== null) {
                            if (this.lastSelectedUpgradeSlot.parentSlot === slot && slot.upgrades.indexOf(upgrade) === this.lastSelectedUpgradeSlot.upgradeSlotIndex) {
                                activeClass = " selected";
                                /* TODO ADD THIS CODE TO SHOW DELETE WRAPPER FOR UPGRADE SLOTS
                                if(this.props.selectedCard !== null && this.props.selectedCard.type === "Upgrade") {
                                    deleteWrapper = (
                                        <div key={"action-buttons-upgrade-slot"} className="delete-wrapper" onClick={this.bindUpgradeToCard.bind(this, upgrade, slot.card, false)}
                                             onContextMenu={this.removeUpgradeFromCard.bind(this, upgrade, slot.card)}>
                                            <i onClick={this.removeUpgradeFromCard.bind(this, upgrade, slot.card)} className="fa fa-trash"
                                               aria-hidden="true"/>
                                            <i onClick={this.bindUpgradeToCard.bind(this, upgrade, slot.card, false)} className="fa fa-refresh"
                                               aria-hidden="true"/>
                                        </div>
                                    );
                                } else {
                                    deleteWrapper = (
                                        <div key={"action-buttons-upgrade-slot"} className="delete-wrapper" onClick={this.bindUpgradeToCard.bind(this, upgrade, slot.card, false)} onContextMenu={this.removeUpgradeFromCard.bind(this, upgrade, slot.card)}>
                                            <i onClick={this.removeUpgradeFromCard.bind(this, upgrade, slot.card)} className="fa fa-trash" aria-hidden="true" />
                                        </div>
                                    );
                                }
                                */
                            }
                        }
                        label = <span className="upgrade-label"><span className="subtext">{upgrade.card.cost}CP </span>{upgrade.card.name}</span>;
                        slotStyle = { backgroundImage: 'url('+upgrade.card.images.large+')' }
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
    validateAffinity: function(upgradeSlot) {
        var affinityMatches = false;
        if(upgradeSlot && this.props.selectedCard) {
            if(upgradeSlot.requiredAffinity.toLowerCase().indexOf(this.props.selectedCard.affinity.toLowerCase()) > -1)
                affinityMatches = true;
            if(this.props.selectedCard.affinity.toLowerCase().indexOf("universal") > -1)
                affinityMatches = true;

            if(!affinityMatches) {
                var requiredAffinity = upgradeSlot.requiredAffinity.toLowerCase().replace("affinity.", "");
                var attemptedAffinity = this.props.selectedCard.affinity.toLowerCase().replace("affinity.", "");
                this.invokeNotification("warning", "You must apply a " + requiredAffinity + " to this slot, you tried to use " + attemptedAffinity + ".");
            }
            // MUST BE AN UPGRADE
            if(this.props.selectedCard.type !== "Upgrade") {
                this.invokeNotification("warning", "Only upgrade cards may be fitted into that slot!");
                affinityMatches = false;
            }
        }
        return affinityMatches;
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

        if((this.getBuildCost() + this.props.selectedCard.cost) > 60) {
            this.invokeNotification("warning", "You cannot add that card because you would exceed the card points total for this build!");
            return false;
        }

        console.log("GOT HERE NP")
        // GET THE NEXT AVAILABLE SLOT
        if(this.validateQuantity(false) && this.props.selectedCard) {
            // Got here by clicking on parent card to bind child
            this.lastSelectedUpgradeSlot = null;
            if(bindUpgradeAtNextAvailableIndex) {
                var nextAvailableSlot = null;
                upgradeSlot.upgrades.forEach(function (slot, i) {
                    if (slot.card === null && nextAvailableSlot === null) {
                        nextAvailableSlot = i;
                    }
                });
                if (nextAvailableSlot !== null && this.validateAffinity(upgradeSlot.upgrades[nextAvailableSlot])) {
                    var newBuild = this.props.build;
                    var slotIndex = newBuild.slots.indexOf(upgradeSlot);
                    if (slotIndex > -1 && this.props.selectedCard) {
                        newBuild.slots[newBuild.slots.indexOf(upgradeSlot)].upgrades[nextAvailableSlot].card = this.props.selectedCard;
                        this.buildUpdated(newBuild, slotIndex, this.props.shouldQuickBindCards, null);
                    }
                }
            }
            // Got here by clicking on card
            else if(this.validateAffinity(upgradeSlot) && !bindUpgradeAtNextAvailableIndex) {
                // ATTEMPT TO BIND THE CARD
                newBuild = this.props.build;
                newSlots = newBuild.slots;

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
        } else {
            /*
            var parentSlot = null;
            var upgradeIndex = -1;
            this.props.build.slots.some(function(slot) {
                if(slot.card !== null && slot.card.code === card.code) {
                    parentSlot = slot;
                    upgradeIndex = slot.upgrades.indexOf(upgradeSlot);
                    return true;
                }
                return false;
            });
            this.lastSelectedUpgradeSlot = { parentSlot : parentSlot, upgradeSlotIndex : upgradeIndex }
            */
        }
        // Force fire a left click event if we get here so we can set the trash can on an active
        // upgrade slot
        this.forceUpdate();
    },
    removeUpgradeFromCard: function(upgradeSlot, card, event) {
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
    getBuildSlots: function() {
        return this.props.build.slots.map(function(slot, i) {
            var activeClass = "";
            var card = "";
            var cardPulse = "";
            var upgradePulse = "";

            if(this.props.autoPlaceIndex === i && this.isClientMobile() && this.props.selectedCard !== null) {
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
            else if(this.props.autoPlaceIndex != -1 && this.lastSelectedSlot === i && this.isClientMobile() && this.props.selectedCard !== null) {
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

                    if (this.props.lastModifiedSlot === i) {
                        cardPulse = "pulse-glow";
                    }
                }
            }
            // CHECK FOR AUTO ADDING
            if(this.props.shouldQuickBindCards && (this.lastSelectedCard && typeof this.lastSelectedCard !== "undefined")) {
                if((type === this.lastSelectedCard.type || this.lastSelectedCard.type === "Passive")) {
                    if (this.props.lastModifiedSlot === i) {
                        cardPulse = "pulse-glow";
                    }
                }
            }
            if(slot.card !== null) {
                activeClass = "active-placed";

                if(this.props.selectedCard && slot.card.upgradeSlots && slot.card.upgradeSlots > 0 && this.props.selectedCard.type === "Upgrade") {
                    if(this.props.selectedCard.affinity === slot.card.affinity || this.props.selectedCard.affinity === "Universal") {
                        console.log("GOT UPGRADE");
                        upgradePulse = "pulse-upgrade";
                    }
                }

                var cardStyles = { backgroundImage : "url(" + slot.card.images.large + ")"}
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
                if(this.isClientMobile() && slot.card) {
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
                if(!this.isClientMobile()) {
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
            return (
                <li id={"c_" + i}
                    onContextMenu={this.removeCardFromSlot.bind(this, i, true)}
                    onClick={this.bindCardToSlot.bind(this, i)}
                    className={slot.type + " " + activeClass}
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
            var cardWithQuantity = this.props.deck[this.props.deck.indexOf(this.props.selectedCard)];
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
        event.preventDefault();
        this.lastSelectedSlot = index;
        this.lastModifiedSlot = index;
        this.currentBindIndex = index;

        if(this.props.selectedCard !== null) {
            if(this.props.selectedCard.type !== "Upgrade" && ((event.target.className.indexOf("glow-layer") > -1 || event.target.className.indexOf("delete-wrapper") > -1 || event.target.className.indexOf("fa-refresh") > -1))) {
                this.bindCard(index);
            } else if(this.props.selectedCard.type === "Upgrade") {
                var bindSlot = null;
                this.props.build.slots.forEach(function(slot, i) {
                    if(i === index) bindSlot = slot;
                });
                if(event.target.className.indexOf("glow-layer") > -1 || event.target.className.indexOf("delete-wrapper") > -1)
                    this.bindUpgradeToCard(bindSlot, bindSlot.card, true)
            }
        } else if(this.isClientMobile()) {
            var slot = this.props.build.slots[index];
            var elem = event.target;
            if(!slot.card) {
                if(Helpers.hasClass(elem, "glow-layer")) this.requestActiveTab(0, index, null);
            } else if(slot.card && this.lastSelectedSlot === index) {
                if(Helpers.hasClass(elem, "fa-refresh")) this.requestActiveTab(0, index, slot.card);
                if(Helpers.hasClass(elem, "upgrade-label") || Helpers.hasClass(elem, "overlay")) this.requestActiveTab(0, index, "UPGRADES", slot.card);
            }
        }
    },
    bindCard: function(index) {
        if((this.getBuildCost() + this.props.selectedCard.cost) > 60) {
            this.invokeNotification("warning", "You cannot add that card because you would exceed the card points total for this build!");
            return false;
        }

        this.lastSelectedSlot = index;
        this.lastModifiedSlot = index;

        if(this.validateQuantity(false) && this.validateSlot(index)) {
            var newSlots = this.props.build.slots;

            console.log(this.props.selectedCard);
            var upgradeSlots = typeof this.props.selectedCard.upgradeSlots !== "undefined" ? this.props.selectedCard.upgradeSlots : 0;
            console.log(upgradeSlots);
            newSlots.forEach(function (slot, i) {
                if (i === index) {
                    if (this.props.selectedCard) {
                        slot.card = this.props.selectedCard;
                        slot.occupied = true;

                        slot.upgrades = [];
                        for (var j = 0; j < upgradeSlots; j++) {
                            slot.upgrades.push({requiredAffinity: this.props.selectedCard.affinity, card: null})
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
        if(event) {
            this.lastSelectedSlot = index;
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

                if(this.isClientMobile()) {
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
            console.log("Setting build title to: ", value);
            var newBuild = this.props.build;
            newBuild.title = value;

            this.buildUpdated(newBuild, this.lastModifiedSlot, this.props.shouldQuickBindCards, null);
        }
    },
    /* TOOLTIP METHODS */
    setTooltipContent: function(card, message) {
        if(!this.isClientMobile()) {
            var content = null;
            if(card !== null) {
                content = (
                    <div className="pgg-tooltip pgg-tooltip-card">
                        <div className={"head affinity-" + card.affinity.substring(9).toLowerCase()}>{card.name}</div>
                        <div className="content">Description about the card {card.type}</div>
                    </div>
                );

            } else if(message !== null) {
                content = (
                    <div className="pgg-tooltip pgg-tooltip-card">
                        <div className="content">{message}</div>
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
        if(!this.isClientMobile()) {
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
        this.tooltip.hideTooltip();
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
    render: function() {
        var newTitle = Helpers.debounce(function() {
            this.titleChanged();
        }.bind(this), 350);
        //var quickBindLabel = (this.props.shouldQuickBindCards === true) ? "Disable Quick Bind" : "Enable Quick Bind";
        /* USE IN FUTURE MAYBE?
         <ul id="options-wrapper">
         <li onMouseEnter={this.setTooltipContent.bind(this, null, tooltipMessage)} onMouseMove={this.showTooltip.bind(this, null, null)} onMouseLeave={this.hideTooltip}>
         <ToggleFilter onToggleFilterChanged={this.toggleQuickBind} parentClassName={"wide-with-text-only"} label={quickBindLabel} active={this.props.shouldQuickBindCards} />
         </li>
         </ul>
         */
        var panels = "";
        // ONLY SHOW UPGRADE PANEL ON MOBILE
        if(this.isClientMobile()) {
            panels = (
                <div id="statistic-wrapper">
                    <StatPanel  />
                </div>
            )
        } else {
            panels = (
                <div id="statistic-wrapper">
                    <StatPanel  />
                    <StatPanel />
                </div>
            )
        }
        var tooltipMessage = ("Any selected equipment card will automatically be bound to the next available slot, upgrade cards must still need to be manually added to equipment cards.");
        var buildListClass = this.numberOfCardsPlaced() > 0 ? " upgrades-showing" : "";

        return (
            <div id="builds-wrapper">
                <input onChange={newTitle} defaultValue={ "" } className="h2" placeholder="ENTER BUILD TITLE" ref="buildTitleInput" />
                <span className="build-cost">{ this.getBuildCost() }/60 <span>CP</span></span>
                <ul className={"build-list " + buildListClass }>
                    { this.getBuildSlots() }
                </ul>
                { panels }
            </div>
        )
    }
});

module.exports = Build;