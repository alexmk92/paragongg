var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');
var Tooltip = require('../libraries/tooltip/Toptip');
var ToggleFilter = require('../filter/ToggleFilter');

var Build = React.createClass({
    componentWillMount: function() {
        this.tooltip = this.props.tooltip || new Tooltip();
        this.lastSelectedCard = this.props.lastSelectedCard
    },
    componentDidUpdate: function() {
        this.updateBuildsWithNewDeck();

        // Perform a quick bind on the selected card
        if(this.props.shouldQuickBindCards) {
            this.quickBind(this.props.selectedCard);
        }
    },
    quickBind: function() {
        var newBuild = this.props.build;
        // CANNOT QUICK BIND UPGRADES
        if(this.props.selectedCard !== null && this.props.selectedCard.type !== "two") {
            newBuild.slots.some(function (slot, slotIndex) {
                if (slot.card === null) {
                    this.bindCard(slotIndex);
                    return true;
                }
                return false;
            }.bind(this));
        }
    },
    buildUpdated: function(newBuild, lastModifiedSlot, deselectSelectedCard, toggleQuickBind) {
        if(lastModifiedSlot === null)
            lastModifiedSlot = this.props.lastModifiedSlot;
        if(toggleQuickBind === null || typeof toggleQuickBind === "undefined")
            toggleQuickBind = this.props.shouldQuickBindCards;

        this.lastSelectedCard = this.props.selectedCard;

        this.props.onBuildChanged(newBuild, lastModifiedSlot, deselectSelectedCard, toggleQuickBind);
    },
    updateBuildsWithNewDeck: function() {
        var lastOfTypeRemoved = false;
        if(this.props.lastDeletedCard) {
            this.props.build.slots.forEach(function(slot, slotIndex) {
                var newBuild = this.props.build;
                var newSlots = this.props.build.slots;

                // ALL PARENT CARDS
                if(slot.card && this.props.lastDeletedCard.type !== "two")
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
                        this.buildUpdated(newBuild, null, false);
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
                                this.buildUpdated(newBuild, null, false);
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
                            this.buildUpdated(newBuild, null, false);
                        }
                    }
                }
            }.bind(this));
        }
    },
    getUpgradeSlots: function(slot) {
        // Dont show this section on unplaced cards
        if(typeof slot.card === "undefined" || slot.card === null) {
            return "";
        }
        // Friendly message for no slots
        if(typeof slot.upgrades === "undefined" || slot.upgrades.length === 0) {
            return <div className="upgrade-slot"><span>NO UPGRADE SLOTS</span></div>
        } else {
            return slot.upgrades.map(function(upgrade) {
                if(upgrade) {
                    var label = "";
                    var slotStyle = { backgroundImage : "" };
                    if(upgrade.card === null) {
                        label = <span className="upgrade-label">EMPTY SLOT</span>;
                    } else {
                        label = <span className="upgrade-label"><span className="subtext">{upgrade.card.cost}CP </span>{upgrade.card.name}</span>;
                        slotStyle = { backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/'+upgrade.card.code+'/icon.png)' }
                    }

                    return (
                        <div className="upgrade-slot"
                             onContextMenu={this.removeUpgradeFromCard.bind(this, upgrade, slot.card)}
                             onClick={this.bindUpgradeToCard.bind(this, upgrade, slot.card, false)}
                             style={ slotStyle }
                             onMouseEnter={this.setTooltipContent.bind(this, upgrade.card, null)}
                             onMouseOver={this.showTooltip.bind(this, upgrade.card, "upgrade-label")}
                             onMouseLeave={this.hideTooltip}
                        >
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
            if(this.props.selectedCard.type !== "two") {
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
                case "zero" : valid = slotIndex <= 6; break;
                case "one" : valid = slotIndex <= 3; break;
                case "two": valid = false; break;
                case "three": valid = false; break;
                default: break;
            }
        }
        if(!valid) {
            this.invokeNotification("warning", "This card cannot go in that slot.");
        }
        return valid;
    },
    bindUpgradeToCard: function(upgradeSlot, card, bindUpgradeAtNextAvailableIndex) {
        // GET THE NEXT AVAILABLE SLOT
        if(this.validateQuantity()) {
            // Got here by clicking on parent card to bind child
            if(bindUpgradeAtNextAvailableIndex) {
                console.log("ADD AT NEXT INDEX")
                var nextAvailableSlot = null;
                upgradeSlot.upgrades.forEach(function (slot, i) {
                    if (slot.card === null && nextAvailableSlot === null) {
                        nextAvailableSlot = i;
                    }
                });
                if (nextAvailableSlot !== null && this.validateAffinity(upgradeSlot.upgrades[nextAvailableSlot])) {
                    var newBuild = this.props.build;
                    if (newBuild.slots.indexOf(upgradeSlot) > -1 && this.props.selectedCard) {
                        newBuild.slots[newBuild.slots.indexOf(upgradeSlot)].upgrades[nextAvailableSlot].card = this.props.selectedCard;
                        this.buildUpdated(newBuild, null, true);
                    }
                }
            }
            // Got here by clicking on card
            else if(this.validateAffinity(upgradeSlot) && !bindUpgradeAtNextAvailableIndex) {
                console.log("ADD FROM SLOT CLICK")
                // ATTEMPT TO BIND THE CARD
                newBuild = this.props.build;
                newSlots = newBuild.slots;

                this.props.build.slots.forEach(function(oldSlot, index) {
                    if(oldSlot.card !== null && (oldSlot.card.code === card.code)) {
                        var parentIndex = index;
                        var oldUpgradeIndex = oldSlot.upgrades.indexOf(upgradeSlot);
                        if(oldUpgradeIndex > -1) {
                            newSlots[parentIndex].upgrades[oldUpgradeIndex].card = this.props.selectedCard;
                        }
                    }
                }.bind(this));
                newBuild.slots = newSlots;
                this.buildUpdated(newBuild, null, true);
            }
        }
    },
    // TODO FIXED
    removeUpgradeFromCard: function(upgradeSlot, card, event) {
        event.preventDefault();
        var newBuild = this.props.build;
        newBuild.slots = this.props.build.slots.map(function(oldSlot) {
            if(oldSlot.card !== null && (oldSlot.card.code === card.code)) {
                var oldUpgradeIndex = oldSlot.upgrades.indexOf(upgradeSlot);
                if(oldUpgradeIndex > -1) {
                    oldSlot.upgrades[oldUpgradeIndex].card = null;
                }
            }
            return oldSlot;
        }.bind(this));
        this.buildUpdated(newBuild, null, false);
    },
    invokeNotification: function(type, message) {
        this.props.onNotificationInvoked(type, message);
    },
    getBuildSlots: function() {
        return this.props.build.slots.map(function(slot, i) {
            var activeClass = "";
            var card = "";
            var cardPulse = "";

            // IS THIS AN ACTIVE OR PASSIVE SLOT (ACTIVE = ONE)
            var type = (i < 4) ? "one" : "zero" ;

            if((this.props.selectedCard && typeof this.props.selectedCard !== "undefined")) {
                if((type === this.props.selectedCard.type || this.props.selectedCard.type === "zero")) {
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
                if((type === this.lastSelectedCard.type || this.lastSelectedCard.type === "zero")) {
                    if (this.props.lastModifiedSlot === i) {
                        cardPulse = "pulse-glow";
                    }
                }
            }
            if(slot.card !== null) {
                activeClass = "active-placed";
                var cardStyles = { backgroundImage : "url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/" + slot.card.code + "/background_small.png)"}
                card = (
                    <div style={cardStyles}
                         className="placed-card"
                    >
                        <span className="card-title">{ slot.card.name }</span>
                        <div className="upgrade-slot-wrapper">
                            { this.getUpgradeSlots( slot ) }
                        </div>
                    </div>
                );
            }
            var actionButtons = (function() {
                // CANNOT BE A UPGRADE CARD
                if(this.props.selectedCard !== null && this.props.selectedCard.type !== "two") {
                    if(this.props.selectedCard === slot.card) {
                        return (
                            <div className="delete-wrapper" onClick={this.bindCardToSlot.bind(this, i)} onContextMenu={this.removeCardFromSlot.bind(this, i, true)}>
                                <i onClick={this.removeCardFromSlot.bind(this, i, false)} className="fa fa-trash" aria-hidden="true" />
                            </div>
                        );
                    } else {
                        return (
                            <div className="delete-wrapper" onClick={this.bindCardToSlot.bind(this, i)}
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
                        <div className="delete-wrapper" onContextMenu={this.removeCardFromSlot.bind(this, i, true)}>
                            <i onClick={this.removeCardFromSlot.bind(this, i, false)} className="fa fa-trash" aria-hidden="true" />
                        </div>
                    );
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
                </li>
            );
        }.bind(this));
    },
    validateQuantity: function() {
        if(this.props.deck && this.props.selectedCard) {
            // CANT ADD A PRIME HELIX
            if(this.props.selectedCard.type === "three") {
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
                    /*
                    if(cardAtUpgradeIndex !== null)
                        return false;
                       */

                    this.invokeNotification("warning", "You have used all of the available " + this.props.selectedCard.name + "'s in your deck in this build.");
                    return false;
                }
            }
        }
        return false;
    },
    bindCardToSlot: function(index, event) {
        event.preventDefault();
        if(this.props.selectedCard !== null) {
            this.currentBindIndex = index;
            if(this.props.selectedCard.type !== "two" && ((event.target.className.indexOf("glow-layer") > -1 || event.target.className.indexOf("delete-wrapper") > -1 || event.target.className.indexOf("fa-refresh") > -1))) {
                this.bindCard(index);
            } else if(this.props.selectedCard.type === "two") {
                var bindSlot = null;
                this.props.build.slots.forEach(function(slot, i) {
                    if(i === index) bindSlot = slot;
                });
                if(event.target.className.indexOf("glow-layer") > -1 || event.target.className.indexOf("delete-wrapper") > -1)
                    this.bindUpgradeToCard(bindSlot, bindSlot.card, true)
            }
        }
    },
    bindCard: function(index) {
        if(this.validateQuantity() && this.validateSlot(index)) {
            var newSlots = this.props.build.slots;
            var moddedSlot = null;

            // TODO Implement this with real upgrade slot data, so its not random
            var upgradeSlots = (typeof this.props.selectedCard.slots === "undefined") ? 3 : this.props.selectedCard.slots.length;
            newSlots.forEach(function (slot, i) {
                if (i === index) {
                    if (this.props.selectedCard) {
                        slot.card = this.props.selectedCard;
                        slot.occupied = true;

                        // TODO this filter can be universal or affinity, when we get access to upgrade types
                        // we can use multiple required affinities
                        slot.upgrades = [];
                        for (var j = 0; j < upgradeSlots; j++) {
                            slot.upgrades.push({requiredAffinity: this.props.selectedCard.affinity, card: null})
                        }

                        moddedSlot = index;
                    }
                    newSlots[index] = slot;
                }
            }.bind(this));

            var newBuild = this.props.build;
            newBuild.slots = newSlots;
            this.buildUpdated(newBuild, moddedSlot, this.props.shouldQuickBindCards);
        }
    },
    getBuildPoints: function() {
        var points = 0;
        if(this.props.build !== null) {
            this.props.build.slots.forEach(function(slot) {
                if(typeof slot.card !== "undefined" && slot.card !== null) {
                    points += slot.card.cost;
                }
            });
        }
        return points;
    },
    removeCardFromSlot: function(index, wasRightClick, event) {
        if(event) {
            event.preventDefault();
            if(((event.target.className.indexOf("glow-layer") > -1 || event.target.className.indexOf("delete-wrapper") > -1) && wasRightClick) || event.target.className.indexOf("fa-trash") > -1) {
                var newSlots = this.props.build.slots;
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

                this.buildUpdated(newBuild, null, false);
            }
        }

    },
    // TODO THROTTLE THE UPDATE LIMIT SOME HOW
    titleChanged: function(event) {
        var value = event.target.value;
        if(typeof value !== "undefined" && value.length < 60) {
            var newBuild = this.props.build;
            newBuild.title = value;

            this.buildUpdated(newBuild, null, false);
        }
    },
    /* TOOLTIP METHODS */
    setTooltipContent: function(card, message) {
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
    },
    showTooltip: function(card, selector, event) {
        if(card) {
            if(event.target.className.toLowerCase().indexOf(selector.toLowerCase()) > -1) {
                this.tooltip.showTooltip();
            }
        } else if(card === null && selector === null) {
            this.tooltip.showTooltip();
        }
    },
    hideTooltip: function() {
        this.tooltip.hideTooltip();
    },
    toggleQuickBind: function() {
        this.buildUpdated(this.build, null, true, !this.props.shouldQuickBindCards);
    },
    render: function() {
        var tooltipMessage = ("Any selected equipment card will automatically be bound to the next available slot, upgrade cards must still need to be manually added to equipment cards.");
        return (
            <div id="builds-wrapper">
                <ul id="options-wrapper">
                    <li onMouseEnter={this.setTooltipContent.bind(this, null, tooltipMessage)} onMouseMove={this.showTooltip.bind(this, null, null)} onMouseLeave={this.hideTooltip}>
                        <ToggleFilter onToggleFilterChanged={this.toggleQuickBind} parentClassName={"wide-with-text-only"} label="Enable Quick Bind" active={this.props.shouldQuickBindCards} />
                    </li>
                </ul>
                <input onChange={this.titleChanged} className="h2" placeholder="ENTER BUILD TITLE" ref="buildTitleInput" value={ this.props.build.title } />
                <span className="build-cost">{ this.getBuildPoints() }/40 <span>CARD POINTS</span></span>
                <div>
                    <ul className="build-list">
                        { this.getBuildSlots() }
                    </ul>
                </div>
            </div>
        )
    }
});

module.exports = Build;