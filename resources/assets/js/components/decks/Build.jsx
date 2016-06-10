var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');
var Tooltip = require('../libraries/tooltip/Toptip');

var Build = React.createClass({
    componentWillMount: function() {
        this.tooltip = this.props.tooltip || new Tooltip();
    },
    buildUpdated: function(newBuild, lastModifiedSlot = this.props.lastModifiedSlot) {
        this.props.onBuildChanged(newBuild, lastModifiedSlot);
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
                             onClick={this.bindUpgradeToCard.bind(this, upgrade, slot.card)}
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
    bindUpgradeToCard: function(upgradeSlot, card) {
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
    getBuildSlots: function() {
        return this.props.build.slots.map(function(slot, i) {
            var activeClass = "";
            var card = "";
            var cardPulse = "";

            if(this.props.selectedCard && typeof this.props.selectedCard !== "undefined") {
                activeClass = (slot.card === null) ? "active-slot" : "";

                if(this.props.lastModifiedSlot === i) {
                    cardPulse = "pulse-glow";
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
            return (
                <li id={"c_" + i}
                    onContextMenu={this.removeCardFromSlot.bind(this, i)}
                    onClick={this.bindCardToSlot.bind(this, i)}
                    className={slot.type + " " + activeClass}
                    key={"slot_" + i}
                    onMouseEnter={this.setTooltipContent.bind(this, slot.card)}
                    onMouseOver={this.showTooltip.bind(this, slot.card, "glow-layer")}
                    onMouseLeave={this.hideTooltip}
                >
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
    bindCardToSlot: function(index, event) {
        event.preventDefault();

        if(event.target.className.indexOf("glow-layer") > -1) {
            var newSlots = this.props.build.slots;
            var moddedSlot = null;

            // TODO Implement this with real upgrade slot data, so its not random
            var upgradeSlots = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
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
    removeCardFromSlot: function(index, event) {
        event.preventDefault();
        if(event.target.className.indexOf("glow-layer") > -1) {
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
                    <div className="content">Description about the card</div>
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