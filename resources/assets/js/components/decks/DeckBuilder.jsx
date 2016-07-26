var React = require('react');
var ReactDOM = require('react-dom');
var CardsFeed = require('../cards/CardsFeed');
var Helpers = require('../../helpers');
var CardEffects = require('../cards/CardEffects');
var Tooltip = require('../libraries/tooltip/Toptip');
var HeroPanel = require('../heroes/HeroPanel');
var Build = require('./Build');
var DeckSidebarCostCurve = require('./widgets/DeckSidebarCostCurve');
var ConfirmModal = require('../ConfirmModal');
var Notification = require('../libraries/notification/Notification');
var Draggable = require('../../lib/Draggable');

var DeckBuilder = React.createClass({
    getInitialState: function(){
        this.tooltip = new Tooltip();
        return {
            title : "",
            description : "",
            deck: [],
            builds: [],
            selectedHero : HEROES[0],
            cardCount : 0,

            affinities: [],
            addedCard : false,
            showCardSection: false,
            quickBind: false,
            selectedCard: null,
            selectedBuild : null,
            lastSelectedCard: null,
            lastSelectedBuild: null,
            playFlashAnimation: false,
            playFlashTabAnimation: false,
            heroPanelActive: true,
            lastModifiedSlot: null,
            isBuildsPanelShowing : false,
            isMobileSearchShowing: false,
            activeTab: this.isClientMobile ? -1 : 0
        }
    },
    onDraggableDataSourceChanged: function(data, type) {
        if(type === 'BUILDS') {
            this.setState({ builds : data });
        }
    },
    componentWillMount: function() {
        // Replace the current notification panel.
        this.isClientMobile = Helpers.isClientMobile();
        this.isDragging = false;
        this.deckList = null;
        this.updateDeckList = false;
        this.notificationPanel = new Notification();
        if(this.isClientMobile) {
            this.setState({ activeTab: -1 })
        }
    },
    componentDidMount: function() {
        this.draggableBuilds = new Draggable(this.state.builds, this, 'BUILDS');
        if(typeof CURRENT_DECK !== "undefined" && CURRENT_DECK) {
            var newBuilds = this.getCardsForBuild(CURRENT_DECK.builds);
            var titleField = this.refs.deckNameInput;
            titleField.value = CURRENT_DECK.title;
            var descriptionField = this.refs.deckDescriptionInput;
            descriptionField.value = CURRENT_DECK.description;
            var newSelectedBuild = newBuilds.length > 0 ? newBuilds[0] : null;
            this.setState({
                title : CURRENT_DECK.title,
                selectedHero : CURRENT_DECK.hero,
                heroPanelActive: false,
                showCardSection: true,
                affinities: this.getAffinities(CURRENT_DECK.hero),
                deck: CURRENT_DECK.cards.all,
                builds: newBuilds,
                selectedBuild: newSelectedBuild,
                playFlashAnimation: false,
                playFlashTabAnimation: false
            })
        }
        if(!this.isClientMobile) this.refs.deckNameInput.focus();

        this.lastDeletedCard = null;
        this.placementSlotIndex = -1;
        this.isMouseDown = false;

        window.addEventListener("resize", this.updateViewForDimensions);
        window.addEventListener("scroll", this.onWindowScroll);
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mouseup", this.onMouseUp);
        window.addEventListener("mousemove", this.onMouseMove);

        var textarea = document.querySelector('textarea.deck-description');
        textarea.addEventListener('keydown', autosize);
        function autosize(){
            var el = this;
            setTimeout(function(){
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            },0);
        }

        this.updateViewForDimensions();
    },
    onMouseDown: function() {
        this.isMouseDown = true;
    },
    onMouseMove: function() {
        if(this.isDragging) {
            if (document.selection) {
                document.selection.empty()
            } else {
                window.getSelection().removeAllRanges()
            }
        }
    },
    onMouseUp: function(e) {
        this.isMouseDown = false;
        this.endDrag(e);
    },
    onWindowScroll: function() {
        var sidebar = document.querySelector("#sidebar");
        var scrollTopButton = document.querySelector("#scroll-top");
        var costCurve = document.querySelector("#cost-curve-widget");
        if(sidebar && scrollTopButton) {
            var doc = document.documentElement;
            var offsetTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            var costCurveOffset = costCurve ? (costCurve.getBoundingClientRect().height + 200) : 0;
            if((sidebar.getBoundingClientRect().height - costCurveOffset) < offsetTop) {
                scrollTopButton.className = "visible";
            } else {
                scrollTopButton.className = "";
            }
        }
    },
    getCardsForBuild: function(builds) {
        return builds.map(function(build) {
            build.slots = build.slots.map(function(slot) {
                if(slot.card) {
                    slot.card = this.getCardByCode(slot.card);
                    slot.upgrades = slot.upgrades.map(function(upgradeSlot) {
                        if(upgradeSlot.card) {
                            upgradeSlot.card = this.getCardByCode(upgradeSlot.card);
                        }
                        return upgradeSlot;
                    }.bind(this));
                }
                return slot;
            }.bind(this));
            build.code = Helpers.uuid(); // tmp code to identify the selected build, this does not get saved
            return build;
        }.bind(this));
    },
    getCardByCode: function(cardCode) {
        var cardToReturn = null;
        CARDS.allCards.some(function(card) {
            if(card.code === cardCode) {
                cardToReturn = card;
                return true;
            }
            return false;
        });
        return cardToReturn;
    },
    componentDidUpdate: function(prevProps, prevState) {
        this.deckList = null;
        this.hideTooltip();
        this.draggableBuilds.setDataSource(this.state.builds, false);
        if(this.lastHoveredCard && !this.isClientMobile) {
            this.setTooltipContent(this.lastHoveredCard);
        }
    },
    componentWillUpdate: function(nextProps, nextState) {
        if((nextState.deck.length > this.state.deck.length) && (nextState.activeTab === 1 || nextState.activeTab === -1)) {
            this.setState({ playFlashTabAnimation: true })
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(this.state.selectedHero !== nextState.selectedHero) {
            this.forceUpdate();
        }
        if(this.state.builds !== nextState.builds) {
            return true;
        }
        if(this.updateDeckList === true) {
            this.updateDeckList = false;
            return true;
        }
        return this.state !== nextState;
    },
    /* UTILITY FUNCTIONS */
    saveDeck: function() {
        if(!this.isDeckValid()) {
            this.notificationPanel.addNotification("warning", "You must select at least one card, one hero and enter a title for this deck before you can save.");
        } else {
            // We need to do this as we store only the card code so we lose the quantity of cards
            var compressedCards = [];
            this.state.deck.forEach(function(card) {
                for(var i = 0; i < card.quantity; i++) {
                    compressedCards.push(card.code);
                }
            });

            var deckAndBuilds = {
                title : this.state.title,
                description : this.state.description,
                author : USER_ID,
                cards : compressedCards,
                builds : this.state.builds.map(function(build) {
                    return {
                        title: build.title,
                        slots: build.slots.map(function(slot) {
                            if(slot.card) slot.card = slot.card.code;
                            slot.upgrades = slot.upgrades.map(function(upgradeSlot) {
                                if(upgradeSlot.card) upgradeSlot.card = upgradeSlot.card.code;
                                return upgradeSlot;
                            });
                            return slot;
                        }),
                        cost: build.cost
                    }
                }),
                hero : this.state.selectedHero.code
            };

            var json = JSON.stringify(deckAndBuilds);

            if(Helpers.isNullOrUndefined(CURRENT_DECK)) {
                Helpers.post("/decks/edit/" + CURRENT_DECK._id, { data : json });
            } else {
                Helpers.post("/decks/create", { data : json });
            }
        }
    },
    updateViewForDimensions: function() {
        this.isClientMobile = Helpers.isClientMobile();
        var sidebar = document.querySelector("#sidebar");
        var selectedCardWrapper = document.querySelector("#selected-card-wrapper");

        if(!this.isClientMobile) {
            document.body.className = "";
            if(selectedCardWrapper) {
                selectedCardWrapper.className = "";
            }
            if(this.state.activeTab === -1) {
                this.setState({ activeTab : 0 });
            }
        } else {
            if(sidebar) {
                if(sidebar.className !== "hidden")
                    sidebar.className = "";
                    sidebar.style.right = "0";
            }
            if(selectedCardWrapper && this.state.selectedCard) {
                selectedCardWrapper.className = "visible";
            }
        }
    },
    /** TOOLTIP FUNCTIONS **/
    setTooltipContent: function(card) {
        if(card && !this.isDragging && !this.isClientMobile)
        {
            if(this.state.selectedCard !== null && (card.code === this.state.selectedCard.code)) {
                return false;
            }
            this.lastHoveredCard = card;
            var content = (
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
            var tooltip = document.getElementById("toptip");
            ReactDOM.render(content, tooltip);
        } else {
            this.hideTooltip();
        }
    },
    showTooltip: function(card) {
        if(card && !this.isDragging && !this.isClientMobile) {
            if(this.state.selectedCard !== null && (card.code === this.state.selectedCard.code)) {
                return false;
            }

            this.lastHoveredCard = card;
            this.tooltip.showTooltip();
        }
    },
    hideTooltip: function() {
        this.tooltip.hideTooltip();
    },
    beginDrag: function(index, e) {
        e.persist();
        setTimeout(function() {
            if(this.isMouseDown) {
                this.isDragging = true;
                this.draggableBuilds.beginDrag(index, e);
            } else {
                this.endDrag(e);
            }
        }.bind(this), 100);
    },
    updateDragPosition: function(e) {
        this.draggableBuilds.updateDragPosition(e);
    },
    endDrag: function(e) {
        this.isDragging = false;
        this.draggableBuilds.endDrag(e);
    },
    validateHelix: function(selectedCard) {
        var valid = true;
        if(selectedCard.type === 'Prime') {
            this.state.deck.forEach(function(card) {
                if(card.type === 'Prime') valid = false;
            });
        }
        return valid;
    },
    addCard: function(selectedCard, event) {
        if(!this.validateHelix(selectedCard)) {
            this.notificationPanel.addNotification('warning', 'Each deck may only have 1 Prime Helix, please delete your current one before adding a new one.');
            return;
        }

        if(this.state.cardCount < 40) {
            if(!selectedCard.quantity)
                selectedCard.quantity = 1;
            var newDeck = [];
            var foundCard = false;
            this.state.deck.forEach(function(card) {
                if(selectedCard.code === card.code) {
                    foundCard = true;
                    card.quantity++;
                }
                newDeck.push(card);
            }.bind(this));
            if(newDeck.length === 0 || !foundCard) {
                newDeck.push(selectedCard);
            }
            if(this.state.activeTab === 1 || this.state.activeTab === -1) {
                this.animateFlashTab(event);
            }
            this.setState({
                deck : newDeck,
                addedCard: true,
                lastSelectedCard : selectedCard,
                playFlashAnimation: true,
                cardCount: this.state.cardCount + 1
            });
        } else {
            this.notificationPanel.addNotification("warning", "Your deck is full!");
            this.setState({
                addedCard: false
            });
        }
    },
    selectCard: function(card, event) {
        if(Helpers.isNullOrUndefined(event)) return;

        event.preventDefault();
        var elem = event.target;

        if(elem.className !== "fa fa-trash" && elem.className !== "delete-icon" && elem.className.indexOf("delete-build-wrapper") < 0) {

            /* PREVENT CARD SELECTION
             var disableSelectedCard = false;
             if(this.state.selectedBuild !== null && this.state.isBuildsPanelShowing) {
             disableSelectedCard = this.getCardQuantityInCurrentDeck(card) >= card.quantity;
             }
             */

            if(this.placementSlotIndex != -1 && this.isClientMobile) {
                this.hideSelectedCardPopup();
                this.setState({selectedCard: null, playFlashAnimation: false, activeTab: -1});
            }


            if(((this.state.selectedCard && this.state.selectedCard.code == card.code) || card.type === "Prime")) {
                this.hideSelectedCardPopup();
                var selectedCard = this.state.isBuildsPanelShowing ? null : card;
                this.setState({selectedCard: selectedCard, playFlashAnimation: false});
            } else {
                this.showSelectedCardPopup();
                var activeTab = this.state.activeTab;
                if(this.state.isBuildsPanelShowing && this.isClientMobile) {
                    activeTab = -1;
                }
                this.setState({selectedCard: card, playFlashAnimation: false, activeTab: activeTab});
            }

        }
    },
    deleteCardFromDeck: function(cardToDelete, event) {
        if(Helpers.isNullOrUndefined(event)) return;

        event.preventDefault();
        var newActiveTab = this.state.activeTab;
        var newSelectedCard = (this.state.selectedCard === cardToDelete) ? null : this.state.selectedCard;
        var newFlashTabAnimation = this.state.playFlashTabAnimation;
        var newIsBuildsPanelShowing = this.state.isBuildsPanelShowing;

        var newDeck = [];
        this.state.deck.forEach(function(card) {
            if(card.code !== cardToDelete.code)
                newDeck.push(card);
            else if(card.quantity > 1) {
                cardToDelete.quantity = card.quantity;
                card.quantity--;
                newDeck.push(card);
            }
        }.bind(this));

        if(newDeck.length <= 0) {
            newIsBuildsPanelShowing = false;
            newActiveTab = 0;
            newFlashTabAnimation = false;
        }

        this.lastDeletedCard = cardToDelete;
        var updatedBuilds = this.updateBuildsWithNewDeck(newDeck);
        var newSelectedBuild = this.state.selectedBuild;
        updatedBuilds.forEach(function(build) {
            if(this.state.selectedBuild) {
                if(build.code === this.state.selectedBuild.code) {
                    newSelectedBuild = build;
                }
            }
        }.bind(this));

        this.setState({
            deck : newDeck,
            builds : updatedBuilds,
            playFlashAnimation: false,
            playFlashTabAnimation: newFlashTabAnimation,
            selectedCard : newSelectedCard,
            selectedBuild : newSelectedBuild,
            activeTab: newActiveTab,
            isBuildsPanelShowing: newIsBuildsPanelShowing,
            cardCount: (this.state.cardCount-1 < 0) ? 0 : this.state.cardCount-1
        });
    },
    updateBuildsWithNewDeck: function(newDeck) {
        var newBuilds = this.state.builds.map(function(build) {
            return this.updateBuildWithNewDeck(build, newDeck);
        }.bind(this));
        return newBuilds;
    },
    updateBuildWithNewDeck: function(build, deck) {
        var deletedACard = false;
        var newBuild = JSON.parse(JSON.stringify(build));
        if(this.lastDeletedCard) {
            var foundCards = [];
            newBuild.slots.forEach(function(slot, slotIndex) {
                // ALL PARENT CARDS
                if(slot.card && this.lastDeletedCard.type !== "Upgrade" && !deletedACard)
                {
                    // Get a reference to the card we're removing so we know its quantity
                    var cardFound = false;
                    var refCard = null;
                    if(foundCards.length > 0) {
                        foundCards.some(function(foundCard) {
                            cardFound = (slot.card.name === foundCard.name);
                            if(cardFound) refCard = JSON.parse(JSON.stringify(slot.card));
                            return cardFound;
                        });
                    }
                    if(!cardFound) {
                        foundCards.push(slot.card);
                        refCard = JSON.parse(JSON.stringify(slot.card));
                    }

                    // Loop over the card slots and see if we need to remove any, we do this
                    // by checking the cards in the deck and decrementing the reference value
                    if(refCard && refCard.quantity > 0 && !deletedACard) {
                        var cardFound = false;
                        deck.some(function(deckCard) {
                            if(deckCard.name === this.lastDeletedCard.name && slot.card.name === deckCard.name) {
                                cardFound = true;
                                refCard.quantity--;
                                deletedACard = true;
                                newBuild.slots[slotIndex].card = null;
                            }
                        }.bind(this));
                    }
                    if(!deletedACard && slot.card.name === this.lastDeletedCard.name) {
                        // Check if there are any left in deck
                        var amountLeft = 0;
                        deck.some(function(deckCard) {
                            if(deckCard.name === this.lastDeletedCard.name && slot.card.name === deckCard.name) {
                                amountLeft = deckCard.quantity;
                                return true;
                            }
                            return false;
                        }.bind(this));
                        if(amountLeft <= 0) {
                            deletedACard = true;
                            refCard.quantity--;
                            newBuild.slots[slotIndex].card = null;
                        }
                    }
                } else if(slot.upgrades.length > 0 && this.lastDeletedCard.type === "Upgrade" && !deletedACard) {
                    // Get a reference to the card we're removing so we know its quantity
                    slot.upgrades.forEach(function(upgradeSlot, upgradeSlotIndex) {
                        if(upgradeSlot.card) {
                            // Get a reference to the card we're removing so we know its quantity
                            var cardFound = false;
                            var refCard = null;
                            if(foundCards.length > 0) {
                                foundCards.some(function(foundCard) {
                                    cardFound = (upgradeSlot.card.name === foundCard.name);
                                    if(cardFound) refCard = JSON.parse(JSON.stringify(upgradeSlot.card));
                                    return cardFound;
                                });
                            }
                            if(!cardFound) {
                                foundCards.push(upgradeSlot.card);
                                refCard = JSON.parse(JSON.stringify(upgradeSlot.card));
                            }

                            // Loop over the card slots and see if we need to remove any, we do this
                            // by checking the cards in the deck and decrementing the reference value
                            if(refCard && refCard.quantity > 0 && !deletedACard) {
                                var cardFound = false;
                                deck.some(function(deckCard) {
                                    if(deckCard.name === this.lastDeletedCard.name && upgradeSlot.card.name === deckCard.name) {
                                        cardFound = true;
                                        refCard.quantity--;
                                        deletedACard = true;
                                        newBuild.slots[slotIndex].upgrades[upgradeSlotIndex].card = null;
                                    }
                                }.bind(this));
                            }
                            if(!deletedACard && upgradeSlot.card.name === this.lastDeletedCard.name) {
                                // Check if there are any left in deck
                                var amountLeft = 0;
                                deck.some(function(deckCard) {
                                    if(deckCard.name === this.lastDeletedCard.name && upgradeSlot.card.name === deckCard.name) {
                                        amountLeft = deckCard.quantity;
                                        return true;
                                    }
                                    return false;
                                }.bind(this));
                                if(amountLeft <= 0) {
                                    deletedACard = true;
                                    refCard.quantity--;
                                    newBuild.slots[slotIndex].upgrades[upgradeSlotIndex].card = null;
                                }
                            }
                        }
                    }.bind(this));
                }
            }.bind(this));
        }
        newBuild.cost = this.getBuildCost(newBuild);
        return newBuild;
    },
    getBuildCost: function(build) {
        var points = 0;
        if(build !== null) {
            build.slots.forEach(function(slot) {
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
    renderDeckList: function() {
        var editDeckButton = "";
        if(this.isClientMobile && (this.state.isBuildsPanelShowing)) {
            editDeckButton = (
                <button onClick={this.toggleBuildView.bind(this, false, "edit-button-mobile")}
                        name="publish"
                        type="submit"
                        className={"btn mobile-full"}
                >
                    <i className="fa fa-pencil" aria-hidden="true"></i> EDIT DECK
                </button>
            );
        }
        if(this.state.deck.length === 0) {
            return (
                <div className={ "sidebox panel cf " + this.isActiveTab(0) }>
                    { editDeckButton }
                    <ul className="deck-list">
                        <li key="no_cards">
                            <div className="wrapper intro-row">
                                <span>Once you have selected a hero, start adding cards from the menu below.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        }
        if(!Helpers.isNullOrUndefined(this.deckList) && this.deckList.length > 0) {
            this.updateDeckList = true;
            return(
                <div className={ "sidebox panel cf " + this.isActiveTab(0) }>
                    { editDeckButton }
                    <span className="subtext">PRIME HELIX</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["Prime"])}
                    </ul>
                    <span className="subtext">EQUIPMENT</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["Passive", "Active"])}
                    </ul>
                    <span className="subtext">UPGRADE</span>
                    <ul className="deck-list">
                        {this.deckList}
                    </ul>
                </div>
            );
        } else if(this.isClientMobile && this.deckOptionFilter && this.deckOptionFilter === "UPGRADES") {
            return(
                <div className={ "sidebox panel cf " + this.isActiveTab(0) }>
                    { editDeckButton }
                    <span className="subtext">UPGRADE</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["Upgrade"])}
                    </ul>
                </div>
            );
        } else if(this.isClientMobile && this.deckOptionFilter && this.deckOptionFilter === "EQUIPMENT") {
            return(
                <div className={ "sidebox panel cf " + this.isActiveTab(0) }>
                    { editDeckButton }
                    <span className="subtext">EQUIPMENT</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["Passive", "Active"])}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className={ "sidebox panel cf " + this.isActiveTab(0) }>
                    { editDeckButton }
                    <span className="subtext">PRIME HELIX</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["Prime"])}
                    </ul>
                    <span className="subtext">EQUIPMENT</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["Passive", "Active"])}
                    </ul>
                    <span className="subtext">UPGRADE</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["Upgrade"])}
                    </ul>
                </div>
            );
        }
    },
    getCardQuantityInCurrentDeck: function(card) {
        if(this.state.isBuildsPanelShowing && this.state.selectedBuild !== null) {
            var finalQuantity = 0;
            this.state.selectedBuild.slots.forEach(function(slot) {
                if(slot.card !== null) {
                    if(slot.card.code === card.code) {
                        finalQuantity = (finalQuantity+1 > card.quantity) ? card.quantity : finalQuantity+1;
                    } else if(card.type === "Upgrade") {
                        slot.upgrades.forEach(function(upgradeCard) {
                            if(upgradeCard.card && upgradeCard.card.code === card.code) {
                                finalQuantity = (finalQuantity+1 > card.quantity) ? card.quantity : finalQuantity+1;
                            }
                        });
                    }
                }
            });
            return finalQuantity;
        }
        return -1;
    },
    validateCardType: function(selectedCard, upgradeCard) {
        if(selectedCard === null || upgradeCard === null)
            return true;

        var hasSamePassiveEffect = false;
        if(upgradeCard && selectedCard && typeof selectedCard.effects !== "undefined") {
            selectedCard.effects.some(function(effect) {
                var statString = "";
                if(effect.stat) statString = effect.stat.toUpperCase();
                if(effect.description) statString = effect.description.toUpperCase();
                var selectedEffectType = Helpers.getFormattedStatistic(statString);
                if(upgradeCard.effects) {
                    upgradeCard.effects.forEach(function(upgradeEffect) {
                        if(upgradeEffect.stat) statString = upgradeEffect.stat.toUpperCase();
                        if(upgradeEffect.description) statString = upgradeEffect.description.toUpperCase();
                        var slotEffectType = Helpers.getFormattedStatistic(statString);
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
    showUpgradeCardsForSlot: function(selectedCard) {
        var cardList = [];
        this.state.deck.forEach(function(card) {
            var className = "";
            var quantityLabel = card.quantity + "x";
            var disableCardRow = false;
            // Set label when adding cards to build
            if(this.state.isBuildsPanelShowing && this.state.selectedBuild !== null) {
                var finalQuantity = this.getCardQuantityInCurrentDeck(card);
                disableCardRow = finalQuantity === card.quantity;
                quantityLabel = finalQuantity + "/" + card.quantity;

                if(disableCardRow) {
                    className += " disabled";
                }
            }
            if(card.type.toUpperCase() === "UPGRADE") {
                if(!this.validateCardType(selectedCard, card)) {
                    className = "invalid";
                }
                cardList.push(
                    <li className={className}
                        key={card.code + "_" + Helpers.uuid() }
                        style={{backgroundImage: 'url('+Helpers.getCardImageURL(card, "medium", "icon")+')'}}
                        onContextMenu={this.deleteCardFromDeck.bind(this, card)}
                        onClick={this.selectCard.bind(this, card)}
                        onMouseEnter={this.setTooltipContent.bind(this, card)}
                        onMouseOver={this.showTooltip.bind(this, card)}
                        onMouseLeave={this.hideTooltip}
                    >
                        <div className={ "wrapper " }>
                            <span className="count">{ quantityLabel }</span>
                            <span className="name">{card.name}</span>
                            <span className="cost">{card.cost} CP</span>
                        </div>
                        <div className="delete-icon" onClick={this.deleteCardFromDeck.bind(this, card)}>
                            <i className="fa fa-trash" aria-hidden="true" />
                        </div>
                    </li>
                );
            }
        }.bind(this));
        this.deckList = cardList;
        this.forceUpdate();
    },
    getCardsInDeck : function(types) {
        var cardList = [];
        var deck = this.state.deck.sort(function(a, b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });
        deck.forEach(function(card) {
            var hasType = false;
            types.forEach(function(type) {
                if(!hasType) hasType = card.type === type;
            });
            if(hasType) {
                var shouldHideCard = false;
                var className = "";
                var childClassName = "";

                if(this.state.lastSelectedCard && (this.state.lastSelectedCard.code === card.code && this.state.playFlashAnimation)) {
                    className += "pulse-card-outer";
                    childClassName += "pulse-card-inner";
                }
                if(this.state.selectedCard && (this.state.selectedCard.code == card.code)) {
                    className += " selected";
                }
                var quantityLabel = card.quantity + "x";
                var disableCardRow = false;
                // Set label when adding cards to build
                if(this.state.isBuildsPanelShowing && this.state.selectedBuild !== null) {
                    var finalQuantity = this.getCardQuantityInCurrentDeck(card);
                    disableCardRow = finalQuantity === card.quantity;
                    quantityLabel = finalQuantity + "/" + card.quantity;

                    if(disableCardRow) {
                        className += " disabled";
                    }

                    if(types[0] === "Upgrade" && !this.validateCardType(this.state.selectedCard, card)) {
                        className += " invalid";
                        if(this.isClientMobile)
                            shouldHideCard = true;
                    }
                }

                if(!shouldHideCard) {
                    cardList.push(
                        <li className={className}
                            key={card.code + "_" + Helpers.uuid() }
                            style={{backgroundImage: 'url('+Helpers.getCardImageURL(card, "medium", "icon")+')'}}
                            onContextMenu={this.deleteCardFromDeck.bind(this, card)}
                            onClick={this.selectCard.bind(this, card)}
                            onMouseEnter={this.setTooltipContent.bind(this, card)}
                            onMouseOver={this.showTooltip.bind(this, card)}
                            onMouseLeave={this.hideTooltip}
                        >
                            <div className={ "wrapper " + childClassName }>
                                <span className="count">{ quantityLabel }</span>
                                <span className="name">{card.name}</span>
                                <span className="cost">{card.cost} CP</span>
                            </div>
                            <div className="delete-icon" onClick={this.deleteCardFromDeck.bind(this, card)}>
                                <i className="fa fa-trash" aria-hidden="true" />
                            </div>
                        </li>
                    );
                }
            }
        }.bind(this));
        if(cardList.length === 0) {
            cardList.push(
                <li key="no_cards">
                    <div className="wrapper">
                        <span>No cards of this type have been added.</span>
                    </div>
                </li>
            );
        }
        return cardList;
    },
    /** BUILD FUNCTIONS **/
    buildCount: function() {
        return this.state.builds.count;
    },
    selectBuild: function(build, event) {
        if(Helpers.isNullOrUndefined(event) || this.isDragging) return;

        event.preventDefault();
        var elem = event.target;
        if(elem.className !== "fa fa-trash" && elem.className !== "delete-icon" && elem.className.indexOf("delete-build-wrapper") < 0) {
            var newActiveTab = this.state.activeTab;
            if(this.state.selectedBuild === build) {
                newActiveTab = 0;
            }
            if(this.isClientMobile && (build === this.state.selectedBuild)) {
                newActiveTab = -1;
            }
            this.setState({selectedBuild: build, playFlashAnimation: false, isBuildsPanelShowing: true, activeTab: newActiveTab });
        }
    },
    deleteBuild: function(build, event) {
        if(Helpers.isNullOrUndefined(event)) return;

        event.preventDefault();
        if(this.state.selectedBuild.code === build.code) {
            var newActiveTab = this.state.activeTab;
            var buildsPanelShowing = this.state.isBuildsPanelShowing;
            var newSelectedBuild = null;
            var newBuilds = [];
            this.state.builds.forEach(function(oldBuild) {
                if(oldBuild.code !== build.code) {
                    newBuilds.push(oldBuild);
                }
            });
            if(newBuilds.length === 0) {
                newActiveTab = 0;
                buildsPanelShowing = false;
                newSelectedBuild = null;
                if(this.isClientMobile) {
                    newActiveTab = -1;
                }
            } else {
                newSelectedBuild = newBuilds[0];
                newActiveTab = 1;
            }
            this.setState({ builds: newBuilds, selectedBuild: newSelectedBuild, activeTab: newActiveTab, isBuildsPanelShowing: buildsPanelShowing });
        }
    },
    getBuilds: function() {
        var buildList = this.state.builds.map(function(build, buildIndex) {
            var className = "";
            var childClassName = "";
            var deleteWrapperClass = "";
            if(this.state.selectedBuild !== null) {
                /*
                 if(this.state.lastSelectedBuild !== null && (this.state.lastSelectedBuild.code === build.code && this.state.playFlashAnimation)) {
                 className += "pulse-card-outer";
                 childClassName += "pulse-card-inner";
                 }
                 */
                if(this.state.selectedBuild.code === build.code) {
                    childClassName += " selected";
                    deleteWrapperClass = " visible";
                }
            }
            var wrapperBackgroundImageURL = "";
            var slotIcons = build.slots.map(function(slot, i) {
                var imageURL = "/assets/images/cards/card-placeholder.png";
                if(slot.card !== null)
                    imageURL = Helpers.getCardImageURL(slot.card, "medium", "icon");

                if(i === 0) wrapperBackgroundImageURL = imageURL;
                var upgradeBadge = "";
                var upgradeCount = 0;
                slot.upgrades.forEach(function(upgradeSlot) {
                    if(upgradeSlot.card !== null) { upgradeCount++ }
                });
                if(upgradeCount > 0)
                    upgradeBadge = <div className="upgrade-badge">{ upgradeCount }</div>

                return (
                    <div key={ "slot-" + i + "-icon" }
                         className={"slot-icon-wrapper" + (slot.card !== null ? " active" : "")}
                         onMouseEnter={this.setTooltipContent.bind(this, slot.card)}
                         onMouseOver={this.showTooltip.bind(this, slot.card)}
                         onMouseLeave={this.hideTooltip}
                    >
                        { upgradeBadge }
                        <div className="slot-icon" style={{ backgroundImage : "url(" + imageURL + ")" }}></div>
                    </div>
                )
            }.bind(this));


            return (
                <li className={"draggable build-item " + className}
                    key={build.code}
                    onClick={this.selectBuild.bind(this, build)}
                    onMouseDown={this.beginDrag.bind(this, buildIndex)}
                    onMouseUp={this.endDrag}
                    onMouseMove={this.updateDragPosition}
                >
                    <div className={ "wrapper with-background " + childClassName } style={{ backgroundImage : "url(" + wrapperBackgroundImageURL + ")" }}>
                        <span className="title">{build.title === "" ? "UNTITLED DECK" : build.title} <span className="subtext">{build.cost}CP</span></span>
                        <span className={"delete-build-wrapper " + deleteWrapperClass}
                              onClick={this.deleteBuild.bind(this, build)}
                        >
                            <i className="fa fa-trash"></i></span>
                        <div className="slot-icon-container">
                            { slotIcons }
                        </div>
                    </div>
                </li>
            );

        }.bind(this));
        if(buildList.length === 0) {
            buildList.push(
                <li key="no_cards">
                    <div className="wrapper intro-row">
                        <span>Create your first build by pressing the button below, make sure you have some cards in your deck first!</span>
                    </div>
                </li>
            );
        }
        buildList.push(
            <li key="add_build" className="create-build" onClick={this.addBuild}>
                <div className="dotted-button">
                    <span>ADD A NEW BUILD</span>
                </div>
            </li>
        );
        return buildList;
    },
    addBuild: function() {
        if(this.state.deck.length === 0) {
            this.notificationPanel.addNotification("warning", "You must add some cards to your deck before creating a build!");
        } else {
            var newBuild = {
                code : "build_" + Helpers.uuid(),
                title : "",
                slots: [
                    { type: "Active",  card : null, upgrades : [], occupied: false, buttonsVisible: false },
                    { type: "Active",  card : null, upgrades : [], occupied: false, buttonsVisible: false },
                    { type: "Active",  card : null, upgrades : [], occupied: false, buttonsVisible: false },
                    { type: "Active",  card : null, upgrades : [], occupied: false, buttonsVisible: false },
                    { type: "Passive", card : null, upgrades : [], occupied: false, buttonsVisible: false },
                    { type: "Passive", card : null, upgrades : [], occupied: false, buttonsVisible: false }
                ],
                cost: 0
            };
            // We dont want to go directly to deck on mobile
            var newActiveTab = this.isClientMobile ? -1 : 0;
            this.toggleBuildView(true, "add-build-button");
            this.setState({
                builds : this.state.builds.concat(newBuild),
                activeTab : newActiveTab,
                selectedBuild: newBuild,
                playFlashAnimation: false,
                playFlashTabAnimation: false
            });
        }
    },
    toggleBuildView: function(dismiss, sender) {
        var showDeckTab = this.state.activeTab;
        var flashTab = this.state.playFlashTabAnimation;
        if(this.state.activeTab === 1 || this.state.activeTab === -1) flashTab = true;
        if(typeof dismiss === "undefined" || dismiss === null) {
            dismiss = true;
        }

        if(dismiss === false && (sender === "edit-button" || sender === "add-build-button")) {
            showDeckTab = 0;
            flashTab = false;
        }
        if(dismiss === false && (sender === "edit-button-mobile")) {
            showDeckTab = -1;
            flashTab = false;
        }

        this.setState({ isBuildsPanelShowing : dismiss, activeTab: showDeckTab, playFlashTabAnimation: flashTab })
    },
    buildUpdated: function(newBuild, lastModifiedSlot, deselectSelectedCard, toggleQuickBind, disableSelected, setActiveTab) {
        var buildIndex = this.state.builds.indexOf(newBuild);
        var newBuilds = this.state.builds;
        var newSelectedCard = deselectSelectedCard ? null : this.state.selectedCard;
        var newActiveTab = this.state.activeTab;
        newBuilds[buildIndex] = newBuild;

        if(disableSelected) newSelectedCard = null;

        // Was a mobile device
        if(this.placementSlotIndex != -1 && this.isClientMobile) {
            this.placementSlotIndex = -1;
            newSelectedCard = null;
        }
        if(typeof setActiveTab !== "undefined" && setActiveTab !== null) {
            newActiveTab = setActiveTab;
        }

        this.setState({ builds : newBuilds, lastModifiedSlot: lastModifiedSlot, selectedCard: newSelectedCard, quickBind : toggleQuickBind, activeTab: newActiveTab });
    },
    /** TAB PANEL FUNCTIONS **/
    animateFlashTab: function(event) {
        var flashTab = document.querySelector(".flash-tab");
        if(flashTab) {
            flashTab.className = "";
            setTimeout(function() {
                flashTab.className = "flash-tab";
            }, 50);
        }
    },
    // Slot index is an optional passed up the tree
    setActiveTab: function(index, slotIndex, filter, selectedCard, event) {
        var showBuildsPanel = this.state.isBuildsPanelShowing;
        if(typeof selectedCard === "undefined" || selectedCard === null)
            selectedCard = this.state.selectedCard;

        var flashTab = false;

        // filter for mobile
        if(this.isClientMobile)
            this.deckOptionFilter = filter;

        if(this.state.addedCard && this.state.isBuildsPanelShowing) {
            flashTab = true;
        }

        if(index === this.state.activeTab && this.isClientMobile) {
            index = -1;
            flashTab = true;
        }
        if(index === 1 && this.isClientMobile) {
            window.scrollTo(0, 0);
        }

        if(typeof slotIndex !== "undefined" && slotIndex !== null) {
            this.placementSlotIndex = slotIndex;
        }

        this.setState({
            activeTab : index,
            addedCard: false,
            selectedBuild: showBuildsPanel ? this.state.selectedBuild : null,
            selectedCard : selectedCard,
            playFlashAnimation: false,
            playFlashTabAnimation: flashTab,
            isBuildsPanelShowing: showBuildsPanel
        })
    },
    isActiveTab: function(index) {
        var className = "";
        if(this.state.activeTab === index) {
            className += " active";
        }
        if(index === 0 && this.state.playFlashTabAnimation)
            className += " flash-tab";
        return className;
    },
    toggleHeroPanel: function() {
        // If the user just dismisses the panel when starting
        if(!this.state.showCardSection) {
            this.onHeroPanelSelectedHero(HEROES[0]);
        }
        // Default toggle behaviour
        this.setState({ heroPanelActive : !this.state.heroPanelActive })
    },
    /** HERO PANEL DROP DOWN FUNCTIONS **/
    onHeroPanelSelectedHero: function(hero) {
        var currentHero = this.state.selectedHero;
        var deck = this.state.deck;
        var builds = this.state.builds;

        if(this.refs.deckNameInput.value === "" && !this.isClientMobile) {
            this.refs.deckNameInput.focus();
        }

        var newAffinities = this.getAffinities(hero);

        // PROMPT USER IF THEY WANT TO DO THIS
        if(hero.code !== currentHero.code && (deck.length > 0 || (builds.length > 0 && builds[0].cost > 0))) {
            var confirmNode = document.body.appendChild(document.createElement('div'));
            if(confirmNode) {
                var confirm = ReactDOM.render(<ConfirmModal titleIcon="fa-info-circle" title="ATTENTION!" description="Changing your hero will permanently delete any existing builds and this deck, are you sure you want to continue?" cancelText="CANCEL" confirmText="YES CHANGE MY HERO" />, confirmNode);
                confirm.deferred.promise.then(function(resolvedMessage) {
                    ReactDOM.unmountComponentAtNode(confirmNode);
                    this.setState({
                        heroPanelActive : !this.state.heroPanelActive,
                        selectedHero    : hero,
                        showCardSection : true,
                        selectedBuild: null,
                        lastSelectedBuild: null,
                        affinities : newAffinities,
                        deck : [],
                        builds : []
                    });
                }.bind(this), function(rejectedMessage) {
                    ReactDOM.unmountComponentAtNode(confirmNode);
                });
            }
        } else {
            this.affinitiesUpdated = true;
            this.setState({
                heroPanelActive : !this.state.heroPanelActive,
                selectedHero    : hero,
                showCardSection : true,
                affinities : newAffinities,
                deck : deck,
                builds : builds
            });
        }
    },
    getSelectedCardPopup: function() {
        if(this.state.selectedCard && typeof this.state.selectedCard.code !== "undefined" && this.isClientMobile) {
            var cardType = "UPGRADE";
            if(this.state.selectedCard.type === "Active" || this.state.selectedCard.type === "Passive") cardType = "EQUIPMENT";
            return (
                <div onClick={this.hideSelectedCardPopup} id="selected-card-wrapper" className="visible">
                    <span>SELECTED: <span className="subtext">{this.state.selectedCard.name} ({cardType})</span> <i className="fa fa-close"></i></span>
                    <div className="black-overlay"></div>
                    <div className="selected-card-background"
                         style={{backgroundImage: 'url(' + Helpers.getCardImageURL(this.state.selectedCard, "medium", "icon") + ')'}}
                    ></div>
                </div>
            )
        }
        else if((this.lastSelectedCard && typeof this.lastSelectedCard.code !== "undefined" && this.isClientMobile)) {
            return (
                <div onClick={this.hideSelectedCardPopup} id="selected-card-wrapper" className="visible">
                    <span>Currently selected: <span className="subtext">{this.lastSelectedCard.name}</span> <i className="fa fa-close"></i></span>
                    <div className="black-overlay"></div>
                    <div className="selected-card-background"
                         style={{backgroundImage: 'url(' + Helpers.getCardImageURL(this.lastSelectedCard, "medium", "icon") + ')'}}
                    ></div>
                </div>
            )
        }
        return <div onClick={this.hideSelectedCardPopup} id="selected-card-wrapper"></div>;
    },
    showSelectedCardPopup: function() {
        if(this.isClientMobile) {
            var selectedCardPopup = document.getElementById("selected-card-wrapper");
            if(selectedCardPopup) {
                selectedCardPopup.className = "visible";
            }
        }
    },
    hideSelectedCardPopup: function() {
        if(this.isClientMobile) {
            var selectedCardPopup = document.getElementById("selected-card-wrapper");
            if(selectedCardPopup) {
                selectedCardPopup.className = "hidden";
                this.setState({ selectedCard : null });
            }
        }
    },
    renderScrollTopButton: function() {
        if(!this.isClientMobile && !this.state.isBuildsPanelShowing) {
            return (
                <div id="scroll-top">
                    <h2>{this.state.cardCount} / 40</h2>
                    <p>CARDS IN DECK</p>
                </div>
            )
        }
    },
    getAffinities: function(hero) {
        var affinities = [];
        if(hero) {
            affinities = hero.affinities.map(function(affinity) {
                return { name : affinity.replace("Affinity.", "") }
            });
        }
        affinities.push({ name : "Universal" });
        return affinities;
    },
    // Always deselect the current card when this happens as its an error
    childAddedNotification: function(type, message) {
        this.notificationPanel.addNotification(type, message);
        this.setState({ selectedCard : null });
    },
    // Shows the search bar filter
    toggleSearchFilter: function() {
        this.setState({ isMobileSearchShowing: !this.state.isMobileSearchShowing });
    },
    updateTitle: function() {
        var value = this.refs.deckNameInput.value;
        if(value) {
            this.setState({ title : value });
        }
    },
    updateDescription: function() {
        var value = this.refs.deckDescriptionInput.value;
        if(value) {
            this.setState({ description : value });
        }
    },
    renderCostCurve: function() {
        if(this.state.deck.length > 0) {
            return (
                <div className="sidebox panel">
                    <DeckSidebarCostCurve animateChart={false} deck={this.state.deck} />
                </div>
            );
        }
    },
    isDeckValid: function() {
        return this.state.title !== "" && this.state.selectedHero !== null && this.state.deck.length > 0;
    },
    // Handles auto bind to a slot
    /** END OF FUNCTIONS **/
    render: function() {
        // Debounce the title and description functions so they're throttled
        var setTitle = Helpers.debounce(function() {
            this.updateTitle();
        }.bind(this), 350);

        var setDescription = Helpers.debounce(function() {
            this.updateDescription();
        }.bind(this), 350);

        // Used to delete cards from deck builder
        var tmpLastDeletedCard = this.lastDeletedCard;
        this.lastDeletedCard = null;

        // Used to auto place into deck
        var tmpPlacementSlotIndex = this.placementSlotIndex;
        //this.placementSlotIndex = -1;

        var backButtonMobile = "";
        var searchButtonMobile = "";
        if(this.isClientMobile) {
            if(this.state.isBuildsPanelShowing) {
                backButtonMobile = (
                    <div id="back-button-mobile" onClick={this.toggleBuildView.bind(this, false)}>
                        <i className="pgg pgg-arrow-left" aria-hidden="true"></i> BACK
                    </div>
                );
            }
        }

        var sidebarClass = this.state.activeTab === -1 ? "hidden" : "";
        var buildClass = "";
        var actionBarHidden = this.state.isMobileSearchShowing ? "hidden" : "";
        var buttonDisabled = this.isDeckValid() ? "btn-green" : "btn-faded";

        return (
            <div>
                <div id="sidebar" className={sidebarClass}>
                    <div id="action-button-wrapper" className={ actionBarHidden }>
                        { backButtonMobile }
                        <button onClick={this.toggleBuildView.bind(this, false, "edit-button")} name="publish" type="submit" className={"btn btn-half btn-faded"}><i className="fa fa-pencil" aria-hidden="true"></i> EDIT DECK</button>
                        <button name="publish" type="submit" onClick={this.saveDeck} className={"btn btn-half " + buttonDisabled}><i className="fa fa-check" aria-hidden="true"></i> SAVE DECK</button>
                    </div>
                    <div className="dual-tab-wrapper">
                        <div className="dual-tab-tabs">
                            <div onClick={this.setActiveTab.bind(this, 0, null, "", null)}
                                 className={this.isActiveTab(0)}
                            >
                                <span>MY DECK <span className={"subtext " + (this.state.cardCount >= 40 ? "max-capacity" : "") }> ( {this.state.cardCount}/40 )</span></span>
                            </div>
                            <div onClick={this.setActiveTab.bind(this, 1, null, "", null)}
                                 className={this.isActiveTab(1) }
                            >
                                <span>MY BUILDS <span className={"subtext " + (this.state.cardCount >= 40 ? "max-capacity" : "") }> ( {this.state.builds.length} )</span></span>
                            </div>
                        </div>
                        <div className="dual-tab-panel">
                            <div className={"mobile-header " + this.isActiveTab(0)} onClick={this.setActiveTab.bind(this, -1, null, "", null)}>
                                <span>YOUR DECK <i className="fa fa-close" /></span>
                            </div>
                            {this.renderDeckList()}
                        </div>
                        <div className="dual-tab-panel">
                            <div className={"mobile-header " + this.isActiveTab(1)} onClick={this.setActiveTab.bind(this, -1, null, "")}>
                                <span>YOUR BUILDS <i className="fa fa-close" /></span>
                            </div>
                            <div className={ "sidebox panel cf " + this.isActiveTab(1) }>
                                <ul className="deck-list draggable-container">
                                    {this.getBuilds()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {this.renderCostCurve()}
                </div>
                <div className={"deck-builder wrapper " + (this.state.isBuildsPanelShowing ? "hidden" : "") + buildClass + " " + (this.isDragging ? '' : '')}>
                    <div className="content-wrapper">
                        <div className="deck-title">
                            <div className="hero-portrait-container"
                                 onClick={this.toggleHeroPanel}
                            >
                                <div className={ this.state.heroPanelActive ? "glow-wrapper" : "glow-wrapper updated"}></div>
                                <img className={ this.state.heroPanelActive ? "hero-portrait updating" : "hero-portrait"}
                                     src={ Helpers.S3URL() + "images/heroes/" + this.state.selectedHero.code + "/" + this.state.selectedHero.image + "/portrait_small.png" }
                                     alt="click me"
                                />
                            </div>
                            <div className="title-container ">
                                <span className="breadcrumb">Building a <strong>{ this.state.selectedHero.name }</strong> deck</span>
                                <input type="text" onChange={setTitle} className="h2 " placeholder="Enter deck name..." ref="deckNameInput"/>
                            </div>
                        </div>
                        <HeroPanel title="Select a hero" showAffinityFilter={false} heroes={HEROES} isActive={this.state.heroPanelActive} onHeroSelected={this.onHeroPanelSelectedHero} />
                        <textarea onChange={setDescription}
                            className={" " + (this.state.heroPanelActive ? "p deck-description hidden" : "p deck-description")}
                            ref="deckDescriptionInput"
                            placeholder="Enter a short description about your deck, what team compositions might you use this deck against? Under what situations would you use the different builds?">
                        </textarea>
                        <div id="cards-feed" className={ this.state.showCardSection ? "" : "hidden" }>
                            <CardsFeed forceRedraw={true}
                                       stickTopOnMobile={(this.isClientMobile && this.state.isMobileSearchShowing)}
                                       affinities={this.state.affinities}
                                       tooltip={this.tooltip}
                                       cards={CARDS.allCards}
                                       cardsRedirectOnClick={false}
                                       onCardClicked={this.addCard}
                                       onDismissFilter={this.toggleSearchFilter}
                            />
                        </div>
                    </div>
                </div>
                <div className={"build-builder wrapper " + (this.state.isBuildsPanelShowing ? "" : "hidden") + buildClass}>
                    <div id="back-button" onClick={this.toggleBuildView.bind(this, false)}>
                        <i className="pgg pgg-arrow-left" aria-hidden="true"></i> BACK TO DECK BUILDER
                    </div>
                    {
                        this.state.selectedBuild ? (
                            <Build
                                hero={this.state.selectedHero}
                                autoPlaceIndex={tmpPlacementSlotIndex}
                                deck={this.state.deck}
                                tooltip={this.tooltip}
                                requestActiveTab={this.setActiveTab}
                                shouldQuickBindCards={this.state.quickBind}
                                selectedCard ={this.state.selectedCard}
                                build={this.state.selectedBuild}
                                lastDeletedCard={tmpLastDeletedCard}
                                lastModifiedSlot={this.state.lastModifiedSlot}
                                onBuildChanged={this.buildUpdated}
                                onNotificationInvoked={this.childAddedNotification}
                                onShowUpgradeCardsForSlot={this.showUpgradeCardsForSlot}
                            />
                        ) : ""
                    }
                </div>
                { this.getSelectedCardPopup() }
                { this.renderScrollTopButton() }
            </div>
        )
    }
});

var element = document.querySelector('#deck-builder');
if(element) ReactDOM.render(<DeckBuilder />, element);
