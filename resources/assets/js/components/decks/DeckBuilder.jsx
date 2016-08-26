var React = require('react');
var ReactDOM = require('react-dom');
var CardsFeed = require('../cards/CardsFeed');
var Helpers = require('../../helpers');
var CardEffects = require('../cards/CardEffects');
var Tooltip = require('../libraries/tooltip/Toptip');
var HeroPanel = require('../heroes/HeroPanel');
var Build = require('./Build');
var DeckSidebarCostCurve = require('./widgets/DeckSidebarCostCurve');
var DeckSidebarList = require('./widgets/DeckSidebarList');
var ConfirmModal = require('../ConfirmModal');
var Notification = require('../libraries/notification/Notification');
var Draggable = require('../../lib/Draggable');

var DeckBuilder = React.createClass({
    getInitialState: function() {
        return {
            title: '',
            description: '',
            deck: {
                upgrades: [],
                equipment: [],
                prime: [],
                all: []
            },
            builds: [],
            selectedHero: HEROES[0],
            cardCount: 0,

            affinities: [],
            addedCard: false,
            showCardSection: false,
            quickBind: false,
            selectedCard: null,
            selectedBuild: null,
            lastSelectedCard: null,
            lastSelectedBuild: null,
            playFlashAnimation: false,
            heroPanelActive: true,
            lastModifiedSlot: null,
            isBuildsPanelShowing: false,
            isMobileSearchShowing: false,
            selectedBuildSlotCard: null,
            activeTab: 0
        }
    },
    /* COMPONENT LIFECYCLE METHODS */
    componentWillMount: function() {
        this.tooltip = new Tooltip();
        this.isClientMobile = Helpers.isClientMobile();
        this.isDragging = false;
        this.isAnimatingFlashTab = false;
        this.deckList = null;
        this.updateDeckList = false;
        this.notificationPanel = new Notification();

        var activeTab = this.isClientMobile ? -1 : 0;

        if(!Helpers.isNullOrUndefined(CURRENT_DECK)) {
            var builds = this.getCardsForBuilds(CURRENT_DECK.builds);
            var affinities = this.getHeroAffinities(CURRENT_DECK.hero);
            var selectedBuild = builds.length > 0 ? builds[0] : null;
            var cardCount = 0;
            CURRENT_DECK.cards.all.forEach(function(card) {
                cardCount += card.quantity;
            });

            this.setState({
                title: CURRENT_DECK.title,
                description: CURRENT_DECK.description,
                selectedHero: CURRENT_DECK.hero,
                affinities: affinities,
                deck: CURRENT_DECK.cards,
                builds: builds,
                heroPanelActive: false,
                showCardSection: true,
                selectedBuild: selectedBuild,
                activeTab: activeTab,
                cardCount: cardCount
            });
        } else {
            this.setState({
                activeTab: activeTab
            })
        }
    },
    componentDidMount: function() {
        this.draggableBuilds = new Draggable(this.state.builds, this, 'BUILDS');
        this.lastDeletedCard = null;
        this.placementSlotIndex = -1;
        this.isMouseDown = false;

        window.addEventListener("resize", this.updateViewForDimensions);
        window.addEventListener("scroll", this.onWindowScroll);
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mouseup", this.onMouseUp);
        window.addEventListener("mousemove", this.onMouseMove);

        var textarea = document.querySelector('textarea.deck-description');
        if(textarea) {
            textarea.addEventListener('keydown', autosize);
            function autosize() {
                var el = this;
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }
        }

        if(!Helpers.isNullOrUndefined(CURRENT_DECK)) {
            this.refs.deckNameInput.value = CURRENT_DECK.title;
            this.refs.deckDescriptionInput.value = CURRENT_DECK.description;
        }

        this.updateViewForDimensions();
    },
    componentDidUpdate: function(prevProps, prevState) {
        this.deckList = null;
        this.draggableBuilds.setDataSource(this.state.builds, false);

        if(prevState.activeTab !== this.state.activeTab) {
            window.scrollTo(0,0);
        }
    },
    componentWillUpdate: function(nextProps, nextState) {
        if(nextState.builds.length !== this.state.builds.length) {
            if(nextState.builds.length === 0) {
                this.setState({ selectedBuild: null, isBuildsPanelShowing: false, activeTab: this.isClientMobile ? -1 : 0 });
            } else if(nextState.builds.length < this.state.builds.length) {
                this.setState({ selectedBuild: nextState.builds[0], isBuildsPanelShowing: true, activeTab: 0})
            }
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextState.builds.length !== this.state.builds.length) return true;
        if(nextState.selectedHero.code != this.state.selectedHero.code) return true;
        if(nextState.builds !== this.state.builds) return true;
        if(nextState.activeTab !== this.state.activeTab) return true;
        if(this.updateDeckList) { this.updateDeckList = false; return true; }

        return nextState !== this.state;
    },
    /* WINDOW LISTENERS */
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
    updateViewForDimensions: function() {
        // TODO MAYBE REMOVE SOME OF THIS?
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
    /* DRAGGABLE DELEGATE METHODS */
    onDraggableDataSourceChanged: function(data, type) {
        if(type === 'BUILDS') {
            this.setState({ builds : data });
        }
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
    /* TOOLTIP METHODS */
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
    /* DECK BUILDER METHODS */
    getCardsForBuilds: function(builds) {
        return builds.map(function(build) {
            build.slots = build.slots.map(function(slot) {
                if(slot.card) {
                    slot.card = this.getCardByCode(slot.card);
                    slot.upgrades = slot.upgrades.map(function(upgradeSlot) {
                        if(upgradeSlot.card) {
                            upgradeSlot.card = this.getCardByCode(upgradeSlot.card); // this is just a code passed in JSON so our payload is small
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
        CARDS.all.some(function(card) {
            if(card.code === cardCode) {
                cardToReturn = card;
                return true;
            }
            return false;
        });
        return cardToReturn;
    },
    getHeroAffinities: function(hero) {
        var affinities = [];
        if(hero) {
            affinities = hero.affinities.map(function(affinity) {
                return { name : affinity.replace("Affinity.", "") }
            });
        }
        affinities.push({ name : "Universal" });
        return affinities;
    },
    doesDeckHavePrimeHelix: function(card) {
        var hasPrimeHelix = false;
        if(card.type.toLowerCase() === 'prime') {
            this.state.deck.prime.forEach(function(comparisonCard) {
                if(comparisonCard.type.toLowerCase() === 'prime') hasPrimeHelix = true;
            });
        }
        return hasPrimeHelix;
    },
    getCardType: function(type) {
        switch(type.toLowerCase()) {
            case 'active': return 'equipment'; break;
            case 'passive': return 'equipment'; break;
            case 'upgrade': return 'upgrades'; break;
            case 'prime': return 'prime'; break;
            default: break;
        }
    },
    buildUpdated: function(newBuild, lastModifiedSlot, deselectSelectedCard, toggleQuickBind, disableSelected, setActiveTab) {
        console.log("LAST MODDED SLOT: ", lastModifiedSlot);
        var buildIndex = this.state.builds.indexOf(newBuild);
        var newBuilds = JSON.parse(JSON.stringify(this.state.builds));
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
    addCardToDeck: function(card) {
        if(this.doesDeckHavePrimeHelix(card)) {
            this.notificationPanel.addNotification('warning', 'Each deck may only have 1 Prime Helix, please delete your current one before adding a new one.');
            return;
        }
        if(this.state.cardCount < 40) {
            if(!card.quantity)
                card.quantity = 1;
            var type = this.getCardType(card.type || '');
            var newDeck = {
                all: [],
                upgrades: [],
                equipment: [],
                prime: []
            };
            var foundCard = false;
            this.state.deck.all.forEach(function(oldCard) {
                var oldType = this.getCardType(oldCard.type || '');
                if(card.code === oldCard.code) {
                    foundCard = true;
                    oldCard.quantity++;
                }
                newDeck.all.push(oldCard);
                newDeck[oldType].push(oldCard);
            }.bind(this));
            if(newDeck.all.length === 0 || !foundCard) {
                newDeck.all.push(card);
                newDeck[type].push(card);
            }
            if(this.state.activeTab === 1 || this.state.activeTab === -1) {
                //this.animateFlashTab(event);
            }
            this.setState({
                deck : newDeck,
                addedCard: true,
                lastSelectedCard : card,
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
    deleteCardFromDeck: function(card) {
        var selectedCard = this.state.selectedCard === card ? null : this.state.selectedCard;
        var newActiveTab = this.state.activeTab;

        var newDeck = {
            upgrades: [],
            equipment: [],
            prime: [],
            all: []
        };
        this.state.deck.all.forEach(function(oldCard) {
            if(card.code !== oldCard.code) {
                newDeck.all.push(oldCard);
                newDeck[this.getCardType(oldCard.type)].push(oldCard);
            } else if(oldCard.quantity > 1) {
                oldCard.quantity--;
                newDeck.all.push(oldCard);
                newDeck[this.getCardType(oldCard.type)].push(oldCard);
                if(oldCard.quantity <= 0) {
                    selectedCard = null;
                }
            }
        }.bind(this));

        console.log("SELECTED CARD IS: ", selectedCard);

        if(newDeck.length <= 0) {
            newActiveTab = 0;
            newFlashTabAnimation = false;
        }

        this.lastDeletedCard = card;
        this.updateDeckList = true;
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
            selectedCard : selectedCard,
            selectedBuild : newSelectedBuild,
            activeTab: newActiveTab,
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
                        deck.all.some(function(deckCard) {
                            if(deckCard.name === this.lastDeletedCard.name && slot.card.name === deckCard.name) {
                                cardFound = true;
                                refCard.quantity--;
                                deletedACard = true;
                                newBuild.cost -= deckCard.cost;
                                newBuild.slots[slotIndex].card = null;
                            }
                        }.bind(this));
                    }
                    if(!deletedACard && slot.card.name === this.lastDeletedCard.name) {
                        // Check if there are any left in deck
                        var amountLeft = 0;
                        deck.all.some(function(deckCard) {
                            if(deckCard.name === this.lastDeletedCard.name && slot.card.name === deckCard.name) {
                                amountLeft = deckCard.quantity;
                                return true;
                            }
                            return false;
                        }.bind(this));
                        if(amountLeft <= 0) {
                            deletedACard = true;
                            refCard.quantity--;
                            newBuild.cost -= refCard.cost;
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
                                deck.all.some(function(deckCard) {
                                    if(deckCard.name === this.lastDeletedCard.name && upgradeSlot.card.name === deckCard.name) {
                                        cardFound = true;
                                        refCard.quantity--;
                                        deletedACard = true;
                                        newBuild.cost -= refCard.cost;
                                        newBuild.slots[slotIndex].upgrades[upgradeSlotIndex].card = null;
                                    }
                                }.bind(this));
                            }
                            if(!deletedACard && upgradeSlot.card.name === this.lastDeletedCard.name) {
                                // Check if there are any left in deck
                                var amountLeft = 0;
                                deck.all.some(function(deckCard) {
                                    if(deckCard.name === this.lastDeletedCard.name && upgradeSlot.card.name === deckCard.name) {
                                        amountLeft = deckCard.quantity;
                                        return true;
                                    }
                                    return false;
                                }.bind(this));
                                if(amountLeft <= 0) {
                                    deletedACard = true;
                                    newBuild.cost -= refCard.cost;
                                    refCard.quantity--;
                                    newBuild.slots[slotIndex].upgrades[upgradeSlotIndex].card = null;
                                }
                            }
                        }
                    }.bind(this));
                }
            }.bind(this));
        }
        return newBuild;
    },
    selectCard: function(card) {
        if((this.placementSlotIndex != -1 && this.isClientMobile) || (this.state.selectedCard && this.state.selectedCard.code === card.code)) {
            this.hideSelectedCardPopup();
            this.setState({selectedCard: null, playFlashAnimation: false, activeTab: this.isClientMobile ? -1 : 0});
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
    },
    selectBuild: function(build) {
        if(this.state.builds.indexOf(build) > -1) {
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
    deleteBuild: function(build) {
        if(this.state.selectedBuild.code === build.code) {
            var newBuilds = [];
            this.state.builds.forEach(function(oldBuild) {
                if(oldBuild.code !== build.code) {
                    newBuilds.push(oldBuild);
                }
            });
            console.log("NEW BUILDS IS: ", newBuilds.length);
            if(newBuilds.length === 0) {
                this.setState({ builds: newBuilds });
            } else {
                this.setState({ builds: newBuilds });
            }
        }
    },
    onHeroPanelSelectedHero: function(hero) {
        var currentHero = this.state.selectedHero;
        var deck = this.state.deck;
        var builds = this.state.builds;

        if(this.refs.deckNameInput.value === "" && !this.isClientMobile) {
            this.refs.deckNameInput.focus();
        }

        var newAffinities = this.getHeroAffinities(hero);

        // PROMPT USER IF THEY WANT TO DO THIS
        if(hero.code !== currentHero.code && (deck.length > 0 || (builds.length > 0 && builds[0].cost > 0))) {
            var confirmNode = document.body.appendChild(document.createElement('div'));
            if(confirmNode) {
                var confirm = ReactDOM.render(<ConfirmModal titleIcon="fa-info-circle" title="ATTENTION!" description="Changing your hero will permanently delete any existing builds and this deck, are you sure you want to continue?" cancelText="CANCEL" confirmText="YES CHANGE MY HERO" />, confirmNode);
                confirm.deferred.promise.then(function(resolvedMessage) {
                    ReactDOM.unmountComponentAtNode(confirmNode);
                    this.setState({
                        heroPanelActive : false,
                        selectedHero    : hero,
                        showCardSection : true,
                        selectedBuild: null,
                        lastSelectedBuild: null,
                        affinities : newAffinities,
                        deck : this.getInitialState().deck,
                        builds : [],
                        cardCount: 0
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
    /* VIEW QUERY METHODS */
    isDeckValid: function() {
        return this.state.title !== "" && this.state.selectedHero !== null && this.state.deck.all.length > 0;
    },
    /* UTILITY FUNCTIONS */
    saveDeck: function() {
        if(!this.isDeckValid()) {
            this.notificationPanel.addNotification("warning", "You must select at least one card, one hero and enter a title for this deck before you can save.");
        } else {
            // We need to do this as we store only the card code so we lose the quantity of cards
            var compressedCards = [];
            var affinities = {};
            this.state.deck.all.forEach(function(card) {
                for(var i = 0; i < card.quantity; i++) {
                    compressedCards.push(card.code);

                    // Get the affinity weighting of this deck
                    var found = typeof affinities[card.affinity.toLowerCase()] !== 'undefined';
                    if(found) {
                        affinities[card.affinity.toLowerCase()]+=1;
                    } else {
                        affinities[card.affinity.toLowerCase()]=1;
                    }
                }
            });

            var deckAndBuilds = {
                title : this.state.title,
                affinities: affinities,
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
            if(typeof CURRENT_DECK !== "undefined" && CURRENT_DECK) {
                Helpers.post("/decks/edit/" + CURRENT_DECK._id, { data : json });
            } else {
                Helpers.post("/decks/create", { data : json });
            }
        }
    },
    getClassIfTabIsActive: function(queryTabIndex) {
        var className = '';
        if(queryTabIndex === this.state.activeTab) className += 'active';
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
    /* VIEW MANIPULATION METHODS */
    // Slot index is an optional passed up the tree
    setActiveTab: function(index, slotIndex, filter, selectedCard, event) {
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
            selectedCard : selectedCard,
            playFlashAnimation: false
        })
    },
    toggleBuildView: function(dismiss, sender) {
        var activeTab = this.state.activeTab;

        if(Helpers.isNullOrUndefined(dismiss)) dismiss = true;
        if(!dismiss && (sender === 'edit-button' || sender === 'add-build-button')) {
            activeTab = 0;
        } else if(!dismiss && sender === 'edit-button-mobile') {
            activeTab = -1;
        }

        this.setState({ isBuildsPanelShowing: dismiss, activeTab: activeTab });
    },
    /* DEBOUNCE METHODS */
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
    /* RENDER METHODS */
    renderMobileBackButton: function() {
        if(this.isClientMobile && this.state.isBuildsPanelShowing) {
            return (
                <div id="back-button-mobile" onClick={this.toggleBuildView.bind(this, false)}>
                    <i className="pgg pgg-arrow-left" aria-hidden="true"></i> BACK
                </div>
            )
        }
    },
    validateCardType: function(selectedCard, upgradeCard) {
        if(selectedCard === null || upgradeCard === null)
            return true;

        var hasSamePassiveEffect = false;
        if(upgradeCard && selectedCard && typeof selectedCard.effects !== "undefined") {
            var damageType = selectedCard.damageType || null;
            selectedCard.effects.some(function(effect) {
                var statString = "";
                if(effect.stat) statString = effect.stat.toUpperCase();
                if(effect.description) statString = effect.description.toUpperCase();
                var selectedEffectType = Helpers.getFormattedStatistic(statString, damageType);
                if(upgradeCard.effects) {
                    var damageType = upgradeCard.damageType || null;
                    upgradeCard.effects.forEach(function(upgradeEffect) {
                        if(upgradeEffect.stat) statString = upgradeEffect.stat.toUpperCase();
                        if(upgradeEffect.description) statString = upgradeEffect.description.toUpperCase();
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
    renderDeckList: function() {
        var cards = JSON.parse(JSON.stringify(this.state.deck));
        var selectedCard = this.state.selectedBuildSlotCard || this.state.selectedCard;
        if(this.isClientMobile) {
            if(!Helpers.isNullOrUndefined(selectedCard) || this.deckOptionFilter === 'UPGRADES') {
                cards.prime = [];
                cards.equipment = [];
                cards.upgrades = cards.upgrades.map(function(card) {
                    card.hidden = false;
                    if(!this.validateCardType(selectedCard, card)) {
                        card.hidden = true;
                    }
                    console.log(card.hidden);
                    return card;
                }.bind(this));
            }
        }
        return <DeckSidebarList hasTitleAndExportOptions={false}
                                implementsDelegate={true}
                                showPlacedCount={this.state.isBuildsPanelShowing}
                                selectedBuild={this.state.selectedBuild}
                                onCardDeleted={this.deleteCardFromDeck}
                                onCardSelected={this.selectCard}
                                selectedCard={this.state.selectedCard}
                                deck={{ cards : cards }}
        />
    },
    renderBuildsList: function() {
        var buildList = this.state.builds.map(function(build, buildIndex) {
            var className = "";
            var childClassName = "";
            var deleteWrapperClass = "";
            if(this.state.selectedBuild !== null) {
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
    animateFlashTab: function() {
        if(this.state.activeTab !== 0) {
            var flashTab = document.querySelector(".flash-tab-idle");
            if(flashTab && !this.isAnimatingFlashTab) {
                flashTab.className = 'flash-tab';
                setTimeout(function() {
                    flashTab.className = "flash-tab-idle";
                    this.isAnimatingFlashTab = false;
                }.bind(this), 250);
            }
        }
    },
    addBuild: function() {
        if(this.state.deck.all.length === 0) {
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
                playFlashAnimation: false
            });
        }
    },
    showUpgradeCardsForSlot: function(selectedCard) {
        console.log("UPGRADE SLOT IS: ", selectedCard);
        //this.setState({ selectedBuildSlotCard: selectedCard });
    },
    renderSelectedBuild: function() {
        if(!Helpers.isNullOrUndefined(this.state.selectedBuild)) {
            // Used so the build can do auto bind features when enabled
            var tmpPlacementSlotIndex = this.placementSlotIndex;
            var tmpLastDeletedCard = this.lastDeletedCard;

            // reset to original state
            this.lastDeletedCard = null;
            this.placementSlotIndex = -1;

            return(
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
            )
        }
    },
    // Always deselect the current card when this happens as its an error
    childAddedNotification: function(type, message) {
        this.notificationPanel.addNotification(type, message);
        this.setState({ selectedCard : null });
    },
    /* POP UP FUNCTIONS FOR MOBILE */
    showSelectedCardPopup: function() {
        if(this.isClientMobile) {
            var selectedCardPopup = document.getElementById("selected-card-wrapper");
            if(selectedCardPopup) {
                selectedCardPopup.className = "visible";
            }
        }
    },
    hideSelectedCardPopup: function() {
        var selectedCardPopup = document.getElementById("selected-card-wrapper");
        if(selectedCardPopup) {
            selectedCardPopup.className = "hidden";
            this.setState({ selectedCard : null });
        }
    },
    renderSelectedCardPopup: function() {
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
    renderCostCurve: function() {
        if(this.state.deck.all.length > 0) {
            return (
                <div className="sidebox panel">
                    <DeckSidebarCostCurve animateChart={false} deck={this.state.deck.all} />
                </div>
            );
        }
    },
    render: function() {
        console.log(this.state.selectedCard);
        // Implement debounce for title and description:
        var setTitle = Helpers.debounce(function() {
            this.updateTitle();
        }.bind(this), 350);
        var setDescription = Helpers.debounce(function() {
            this.updateDescription();
        }.bind(this), 350);

        console.log(HEROES);
        console.log(this.state.selectedHero);
        return (
            <div>
                <div id='sidebar' className={this.state.activeTab === -1 ? 'hidden' : ''}>
                    <div id='action-button-wrapper' className={ this.state.isMobileSearchShowing ? 'hidden' : '' }>
                        { this.renderMobileBackButton() }
                        <button onClick={this.toggleBuildView.bind(this, false, 'edit-button')} name='publish' type='submit' className={'btn btn-half btn-faded'}><i className='fa fa-pencil' aria-hidden='true'></i> EDIT DECK</button>
                        <button name='publish' type='submit' onClick={this.saveDeck} className={'btn btn-half ' + (this.isDeckValid() ? 'btn-green' : 'btn-faded')}><i className='fa fa-check' aria-hidden='true'></i> SAVE DECK</button>
                    </div>
                    <div className='dual-tab-wrapper'>
                        <div className='dual-tab-tabs'>
                            <div onClick={this.setActiveTab.bind(this, 0, null, '', null)}
                                 className={'flash-tab-idle ' + this.getClassIfTabIsActive(0)}
                            >
                                <span>MY DECK <span className={'subtext ' + (this.state.cardCount >= 40 ? 'max-capacity' : '') }> ( {this.state.cardCount}/40 )</span></span>
                            </div>
                            <div onClick={this.setActiveTab.bind(this, 1, null, '', null)}
                                 className={this.getClassIfTabIsActive(1) }
                            >
                                <span>MY BUILDS <span className={'subtext ' + (this.state.cardCount >= 40 ? 'max-capacity' : '') }> ( {this.state.builds.length} )</span></span>
                            </div>
                        </div>

                        <div className='dual-tab-panel'>
                            <div className={'mobile-header ' + this.getClassIfTabIsActive(0)} onClick={this.setActiveTab.bind(this, -1, null, '', null)}>
                                <span>YOUR DECK <i className='fa fa-close' /></span>
                            </div>
                            <div className={'sidebox panel cf ' + this.getClassIfTabIsActive(0)}>
                                {this.renderDeckList()}
                            </div>
                        </div>

                        <div className='dual-tab-panel'>
                            <div className={'mobile-header ' + this.getClassIfTabIsActive(1)} onClick={this.setActiveTab.bind(this, -1, null, '')}>
                                <span>YOUR BUILDS <i className='fa fa-close' /></span>
                            </div>
                            <div className={ 'sidebox panel cf ' + this.getClassIfTabIsActive(1) }>
                                <ul className='deck-list draggable-container'>
                                    {this.renderBuildsList()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    { this.renderCostCurve() }
                </div>

                <div className={'deck-builder wrapper ' + (this.state.isBuildsPanelShowing ? 'hidden' : '')}>
                    <div className='content-wrapper'>
                        <div className='deck-title'>
                            <div className='hero-portrait-container'
                                 onClick={this.toggleHeroPanel}
                            >
                                <div className={ this.state.heroPanelActive ? 'glow-wrapper' : 'glow-wrapper updated'}></div>
                                <img className={ this.state.heroPanelActive ? 'hero-portrait updating' : 'hero-portrait'}
                                     src={ Helpers.getHeroImageURL(this.state.selectedHero, 'small') }
                                     alt='active hero portrait'
                                />
                            </div>
                            <div className='title-container '>
                                <span className='breadcrumb'>Building a <strong>{ this.state.selectedHero.name }</strong> deck</span>
                                <input type='text' onChange={setTitle} className='h2 ' placeholder='Enter deck name...' ref='deckNameInput'/>
                            </div>
                        </div>
                        <HeroPanel title='Select a hero' showAffinityFilter={false} heroes={HEROES} isActive={this.state.heroPanelActive} onHeroSelected={this.onHeroPanelSelectedHero} />
                        <textarea onChange={setDescription}
                                  className={' ' + (this.state.heroPanelActive ? 'p deck-description hidden' : 'p deck-description')}
                                  ref='deckDescriptionInput'
                                  placeholder='Enter a short description about your deck, what team compositions might you use this deck against? Under what situations would you use the different builds?'>
                        </textarea>
                        <div id='cards-feed' className={ this.state.showCardSection ? '' : 'hidden' }>
                            <CardsFeed stickTopOnMobile={(this.isClientMobile && this.state.isMobileSearchShowing)}
                                       affinities={this.state.affinities}
                                       tooltip={this.tooltip}
                                       cards={CARDS.all}
                                       cardsRedirectOnClick={false}
                                       onCardClicked={this.addCardToDeck}
                                       onDismissFilter={this.toggleSearchFilter}
                                       heroScaling={this.state.selectedHero.scale}
                            />
                        </div>
                    </div>
                </div>
                <div className={'build-builder wrapper' + (this.state.isBuildsPanelShowing ? '' : ' hidden')}>
                    <div id='back-button' onClick={this.toggleBuildView.bind(this, false)}>
                        <i className="pgg pgg-arrow-left" aria-hidden="true" /> BACK TO DECK BUILDER
                    </div>
                    { this.renderSelectedBuild() }
                </div>
                { this.renderSelectedCardPopup() }
                { this.renderScrollTopButton() }
            </div>
        )
    }
});

var element = document.querySelector('#deck-builder');
if(element) ReactDOM.render(<DeckBuilder />, element);