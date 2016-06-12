var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');
var Tooltip = require('../libraries/tooltip/Toptip');

var Build = React.createClass({
    componentWillMount: function() {
        this.tooltip = this.props.tooltip || new Tooltip();
    },
    componentDidUpdate: function() {
        this.updateBuildsWithNewDeck();
    },
    buildUpdated: function(newBuild, lastModifiedSlot = this.props.lastModifiedSlot) {
        this.props.onBuildChanged(newBuild, lastModifiedSlot);
    },
    updateBuildsWithNewDeck: function() {
        this.props.build.slots.forEach(function(slot, slotIndex) {
             if(slot.card) {
                 if(this.props.deck.indexOf(slot.card) < 0) {
                     var newSlots = this.props.build.slots;
                     newSlots.forEach(function(slot, i) {
                         if(slotIndex === i) {
                             slot.occupied = false;
                             slot.card = null;
                             newSlots[i] = slot;
                         }
                     }.bind(this));

                     var newBuild = this.props.build;
                     newBuild.slots = newSlots;

                     this.buildUpdated(newBuild, null);
                 }
                 else {
                     // Then delete any missing children
                     var deletedSlot = null;
                     var deletedSlotIndex = null;

                     slot.upgrades.forEach(function(upgradeSlot, index) {
                         if(upgradeSlot.card) {
                             if(this.props.deck.indexOf(upgradeSlot.card) < 0) {
                                 deletedSlotIndex = index;
                                 deletedSlot = upgradeSlot;
                             }
                         }
                     }.bind(this));
                     if(deletedSlot !== null && deletedSlotIndex !== null) {
                         newBuild = this.props.build;
                         if(newBuild.slots.indexOf(slot) > -1) {
                             newBuild.slots[newBuild.slots.indexOf(slot)].upgrades[deletedSlotIndex].card = null;
                             this.buildUpdated(newBuild);
                         }
                     }
                 }
             }
        }.bind(this));
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
                             onMouseEnter={this.setTooltipContent.bind(this, upgrade.card)}
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
            if(upgradeSlot.requiredAffinity.toLowerCase().indexOf(this.props.selectedCard.affinity.toLowerCase()) > -1) {
                affinityMatches = true;
            } else {
                var requiredAffinity = upgradeSlot.requiredAffinity.toLowerCase().replace("affinity.", "");
                var attemptedAffinity = this.props.selectedCard.affinity.toLowerCase().replace("affinity.", "");
                this.invokeNotification("warning", "You must apply a " + requiredAffinity + " to this slot, you tried to use " + attemptedAffinity + ".");
            }
            if(this.props.selectedCard.affinity.toLowerCase().indexOf("universal") > -1)
                affinityMatches = true;
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
            if(bindUpgradeAtNextAvailableIndex === true) {
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
                        this.buildUpdated(newBuild);
                    }
                }
            }
            // Got here by clicking on card
            else if(this.validateAffinity(upgradeSlot)) {
                // ATTEMPT TO BIND THE CARD
                var newBuild = this.props.build;
                newBuild.slots = this.props.build.slots.map(function(oldSlot) {
                    if(oldSlot.card !== null && (oldSlot.card.code === card.code)) {
                        var oldUpgradeIndex = oldSlot.upgrades.indexOf(upgradeSlot);
                        if(oldUpgradeIndex > -1) {
                            upgradeSlot.card = this.props.selectedCard;
                            oldSlot.upgrades[oldUpgradeIndex] = upgradeSlot;
                        }
                    }
                    return oldSlot;
                }.bind(this));
                this.buildUpdated(newBuild);
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
        this.buildUpdated(newBuild);
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

            if(this.props.selectedCard && typeof this.props.selectedCard !== "undefined") {
                if(type === this.props.selectedCard.type || this.props.selectedCard.type === "zero") {
                    activeClass = (slot.card === null) ? "active-slot " : "";

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
                    onMouseEnter={this.setTooltipContent.bind(this, slot.card)}
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
        this.currentBindIndex = index;
        if(((event.target.className.indexOf("glow-layer") > -1 || event.target.className.indexOf("delete-wrapper") > -1 || event.target.className.indexOf("fa-refresh") > -1) && this.validateQuantity()) && this.validateSlot(index)) {
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
            //this.setState({ build : newBuild, lastModifiedSlot: moddedSlot });
            this.buildUpdated(newBuild, moddedSlot);
        } else if(event.target.className.indexOf("glow-layer") > -1 && this.props.selectedCard.type === "two") {
            var bindSlot = null;
            this.props.build.slots.forEach(function(slot, i) {
                if(i === index) bindSlot = slot;
            });
            this.bindUpgradeToCard(bindSlot, bindSlot.card, true)
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
        console.log(index);
        console.log(wasRightClick);
        console.log(event);
        if(event) {
            event.preventDefault();
            if(event.target.className.indexOf("glow-layer") > -1 || event.target.className.indexOf("fa-trash") > -1 || wasRightClick) {
                var newSlots = this.props.build.slots;
                newSlots.forEach(function(slot, i) {
                    if(index === i) {
                        slot.occupied = false;
                        slot.card = null;
                        newSlots[i] = slot;
                    }
                }.bind(this));

                var newBuild = this.props.build;
                newBuild.slots = newSlots;

                this.buildUpdated(newBuild, null);
            }
        }

    },
    // TODO THROTTLE THE UPDATE LIMIT SOME HOW
    titleChanged: function(event) {
        var value = event.target.value;
        if(typeof value !== "undefined" && value.length < 60) {
            var newBuild = this.props.build;
            newBuild.title = value;

            this.buildUpdated(newBuild);
        }
    },
    /* TOOLTIP METHODS */
    setTooltipContent: function(card) {
        if(card !== null) {
            var content = (
                <div className="pgg-tooltip pgg-tooltip-card">
                    <div className={"head affinity-" + card.affinity.substring(9).toLowerCase()}>{card.name}</div>
                    <div className="content">Description about the card {card.type}</div>
                </div>
            );
            var tooltip = document.getElementById("toptip");
            ReactDOM.render(content, tooltip);
        }
    },
    showTooltip: function(card, selector, event) {
        if(event.target.className.toLowerCase().indexOf(selector.toLowerCase()) > -1) {
            if(card) this.tooltip.showTooltip();
        }
    },
    hideTooltip: function() {
        this.tooltip.hideTooltip();
    },
    render: function() {
        return (
            <div id="builds-wrapper">
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