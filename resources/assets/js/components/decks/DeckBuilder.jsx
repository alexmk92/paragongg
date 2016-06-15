var React = require('react');
var ReactDOM = require('react-dom');
var CardsFeed = require('../cards/CardsFeed');
var Helpers = require('../../helpers');
var Tooltip = require('../libraries/tooltip/Toptip');
var HeroPanel = require('../heroes/HeroPanel');
var Build = require('./Build');
var ConfirmModal = require('../ConfirmModal');
var Notification = require('../libraries/notification/Notification');

var DeckBuilder = React.createClass({
    getInitialState: function(){
        this.tooltip = new Tooltip();
        return {
            deck: [],
            builds: [],
            modal: false,
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
            selectedHero : HEROES[0],
            isBuildsPanelShowing : false,
            isMobileSearchShowing: false,
            activeTab: this.isClientMobile() ? -1 : 0
        }
    },
    componentDidMount: function() {
        if(!this.isClientMobile()) this.refs.deckNameInput.focus();

        this.lastDeletedCard = null;
        this.placementSlotIndex = -1;

        window.addEventListener("resize", this.updateViewForDimensions);

        var textareaA = document.querySelector('textarea.h2');
        var textareaB = document.querySelector('textarea.p');
        textareaA.addEventListener('keydown', autosize);
        function autosize(){
            var el = this;
            setTimeout(function(){
                el.style.cssText = 'height:auto; padding:0';
                // for box-sizing other than "content-box" use:
                // el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            },0);
        }
        textareaB.addEventListener('keydown', autosize);
        function autosize(){
            var el = this;
            setTimeout(function(){
                el.style.cssText = 'height:auto; padding:0';
                // for box-sizing other than "content-box" use:
                // el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + (el.scrollHeight + 60) + 'px';
            },0);
        }

        // Replace the current notification panel.
        this.notificationPanel = new Notification();
        this.notificationPanel.initialiseNotifications();
    },
    updateViewForDimensions: function() {
        var selectedCardWrapper = document.querySelector("#selected-card-wrapper");
        if(!this.isClientMobile()) {
            document.body.className = "";
            if(selectedCardWrapper) {
                selectedCardWrapper.className = "";
            }
            if(this.state.activeTab === -1) {
                this.setState({ activeTab : 0 });
            }
            //this.forceUpdate();
        } else {
            if(selectedCardWrapper && this.state.selectedCard) {
                selectedCardWrapper.className = "visible";
            }
        }
    },
    componentDidUpdate: function() {
        this.hideTooltip();
        if(this.lastHoveredCard && !this.isClientMobile()) {
            this.setTooltipContent(this.lastHoveredCard);
        }
        if(this.isClientMobile()) {
            if(this.state.activeTab !== -1 || this.state.isMobileSearchShowing) {
                if(typeof document.body.className === "undefined" || document.body.className === "") {
                    document.body.className = "no-scroll";
                }
            } else {
                if(typeof document.body.className === "undefined" || document.body.className === "no-scroll"){
                    document.body.className = "";
                }
            }
        }
    },
    componentWillUpdate: function(nextProps, nextState) {
        if((nextState.deck.length > this.state.deck.length) && (nextState.activeTab === 1 || nextState.activeTab === -1)) {
            this.setState({ playFlashTabAnimation: true })
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state !== nextState;
    },
    isClientMobile: function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        // Allows us to run the mobile code on desktop for dev purposes.
        if(!check)
            check = window.innerWidth <= 1050;

        return check;
    },
    toggleModal: function() {
        var modal = this.state.modal ? false : true;
        this.setState({modal: modal});
    },
    /** TOOLTIP FUNCTIONS **/
    setTooltipContent: function(card) {
        if(card)
        {
            if(this.state.selectedCard !== null && (card.code === this.state.selectedCard.code)) {
                return false;
            }
            this.lastHoveredCard = card;
            var content = (
                <div className="pgg-tooltip pgg-tooltip-card">
                    <div className={"head affinity-" + card.affinity.substring(9).toLowerCase()}>{card.name}</div>
                    <div className="content">Description about the card {card.type}</div>
                </div>
            );
            var tooltip = document.getElementById("toptip");
            ReactDOM.render(content, tooltip);
        } else {
            this.hideTooltip();
        }
    },
    showTooltip: function(card) {
        if(card) {
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
    /** CARD FUNCTIONS **/
    deckCount: function() {
        var count = 0;
        this.state.deck.forEach(function(card) {
            count += card.quantity;
        });
        return count;
    },
    addCard: function(selectedCard, event) {
        if(this.deckCount() < 40) {

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
                playFlashAnimation: true
            });
        } else {
            this.notificationPanel.addNotification("warning", "Your deck is full!");
            this.setState({
                addedCard: false
            });
        }
    },
    selectCard: function(card, event) {
        event.preventDefault();
        var elem = event.target;

        if(elem.className !== "fa fa-trash" && elem.className !== "delete-icon" && elem.className.indexOf("delete-build-wrapper") < 0) {

            /* PREVENT CARD SELECTION
            var disableSelectedCard = false;
            if(this.state.selectedBuild !== null && this.state.isBuildsPanelShowing) {
                disableSelectedCard = this.getCardQuantityInCurrentDeck(card) >= card.quantity;
            }
            */

            if(this.placementSlotIndex != -1 && this.isClientMobile()) {
                this.hideSelectedCardPopup();
                this.setState({selectedCard: null, playFlashAnimation: false, activeTab: -1});
            }


            if(((this.state.selectedCard && this.state.selectedCard.code == card.code) || card.type === "three")) {
                this.hideSelectedCardPopup();
                this.setState({selectedCard: null, playFlashAnimation: false});
            } else {
                this.showSelectedCardPopup();
                var activeTab = this.state.activeTab;
                if(this.state.isBuildsPanelShowing && this.isClientMobile()) {
                    activeTab = -1;
                }
                this.setState({selectedCard: card, playFlashAnimation: false, activeTab: activeTab});
            }

        }
    },
    deleteCardFromDeck : function(cardToDelete, event) {
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
        this.setState({
            deck : newDeck,
            playFlashAnimation: false,
            playFlashTabAnimation: newFlashTabAnimation,
            selectedCard : newSelectedCard,
            activeTab: newActiveTab,
            isBuildsPanelShowing: newIsBuildsPanelShowing
        });
    },
    renderDeckList: function() {

        var editDeckButton = "";
        if(this.isClientMobile() && (this.state.isBuildsPanelShowing)) {
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
                <div className={ "sidebox panel cf" + this.isActiveTab(0) }>
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
        if(this.isClientMobile() && this.deckOptionFilter && this.deckOptionFilter === "UPGRADES") {
            console.log("FILTER IS: " + this.deckOptionFilter + " AND THE SELECTED CARD IS ", this.state.selectedCard);
            return(
                <div className={ "sidebox panel cf" + this.isActiveTab(0) }>
                    { editDeckButton }
                    <span className="subtext">UPGRADE</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["two"])}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className={ "sidebox panel cf" + this.isActiveTab(0) }>
                    { editDeckButton }
                    <span className="subtext">PRIME HELIX</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["three"])}
                    </ul>
                    <span className="subtext">EQUIPMENT</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["zero", "one"])}
                    </ul>
                    <span className="subtext">UPGRADE</span>
                    <ul className="deck-list">
                        {this.getCardsInDeck(["two"])}
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
                    } else if(card.type === "two") {
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
    getCardsInDeck : function(types) {
        var cardList = [];
        this.state.deck.forEach(function(card) {
            var hasType = false;
            types.forEach(function(type) {
                if(!hasType) hasType = card.type === type;
            });
            if(hasType) {
                var className = "";
                var childClassName = "";
                if(this.state.lastSelectedCard.code === card.code && this.state.playFlashAnimation) {
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
                }
                if(disableCardRow) {
                    className += " disabled";
                }

                var cardMarkup = (
                    <li className={className}
                        key={card.code + "_" + Helpers.uuid() }
                        style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/'+card.code+'/icon.png)'}}
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

                if(this.state.selectedCard && this.state.selectedCard.type !== "two" && card.type === "two" && this.state.isBuildsPanelShowing) {
                    var cardAffinity = card.affinity.toLowerCase();
                    var selectedAffinity = this.state.selectedCard.affinity.toLowerCase();
                    console.log("CHECKING IF " + cardAffinity + " CONTAINS universal");
                    console.log("CHECKING IF " + cardAffinity + " CONTAINS " + selectedAffinity);
                    if(cardAffinity.indexOf("universal") > -1) {
                        cardList.push( cardMarkup );
                    } else if(cardAffinity.indexOf(selectedAffinity) > -1) {
                        cardList.push( cardMarkup );
                    }
                } else {
                    cardList.push(
                        cardMarkup
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
        event.preventDefault();
        var elem = event.target;
        if(elem.className !== "fa fa-trash" && elem.className !== "delete-icon" && elem.className.indexOf("delete-build-wrapper") < 0) {
            var newActiveTab = this.state.activeTab;
            if(this.state.selectedBuild === build) {
                newActiveTab = 0;
            }
            if(this.isClientMobile() && (build === this.state.selectedBuild)) {
                newActiveTab = -1;
            }
            this.setState({selectedBuild: build, playFlashAnimation: false, isBuildsPanelShowing: true, activeTab: newActiveTab });
        }
    },
    deleteBuild: function(build, event) {
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
                if(this.isClientMobile()) {
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
        var buildList = this.state.builds.map(function(build) {
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
                    imageURL = "https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/" + slot.card.code + "/icon.png";

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
                <li className={"build-item " + className}
                    key={build.code}
                    onClick={this.selectBuild.bind(this, build)}
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
            var newActiveTab = this.isClientMobile() ? -1 : 0;
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
        if(this.placementSlotIndex != -1 && this.isClientMobile()) {
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
        if(this.isClientMobile())
            this.deckOptionFilter = filter;

         if(this.state.addedCard && this.state.isBuildsPanelShowing) {
             flashTab = true;
         }

        if(index === this.state.activeTab && this.isClientMobile()) {
            index = -1;
            flashTab = true;
        }
        if(index === 1 && this.isClientMobile()) {
            window.scrollTo(0, 0);
        }

        if(typeof slotIndex !== "undefined" && slotIndex !== null) {
            this.placementSlotIndex = slotIndex;
        }

        this.setState({
            activeTab : index,
            addedCard: false,
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
        this.setState({ heroPanelActive : !this.state.heroPanelActive })
    },
    /** HERO PANEL DROP DOWN FUNCTIONS **/
    onHeroPanelSelectedHero: function(hero) {
        var currentHero = this.state.selectedHero;
        var deck = this.state.deck;
        var builds = this.state.builds;

        if(this.refs.deckNameInput.value === "") {
            this.refs.deckNameInput.focus();
        }

        // PROMPT USER IF THEY WANT TO DO THIS
        if(hero.code !== currentHero.code && (deck.length > 0 || (builds.length > 0 && builds[0].cost > 0))) {
            var confirmNode = document.body.appendChild(document.createElement('div'));
            if(confirmNode) {
                var confirm = ReactDOM.render(<ConfirmModal titleIcon="fa-info-circle" title="ATTENTION!" description="Changing your hero will permanently delete any existing builds and this deck, are you sure you want to continue?" cancelText="CANCEL" confirmText="YES CHANGE MY HERO" />, confirmNode);
                confirm.deferred.promise.then(function(resolvedMessage) {
                    this.setState({
                        heroPanelActive : !this.state.heroPanelActive,
                        selectedHero    : hero,
                        showCardSection : true,
                        deck : [],
                        builds : []
                    });
                    ReactDOM.unmountComponentAtNode(confirmNode);
                }.bind(this), function(rejectedMessage) {
                    ReactDOM.unmountComponentAtNode(confirmNode);
                });
            }
        } else {
            this.setState({
                heroPanelActive : !this.state.heroPanelActive,
                selectedHero    : hero,
                showCardSection : true,
                deck : deck,
                builds : builds
            });
        }
    },
    getSelectedCardPopup: function() {
        if(this.state.selectedCard && this.isClientMobile()) {
            var cardType = "UPGRADE";
            if(this.state.selectedCard.type === "one" || this.state.selectedCard.type === "zero") cardType = "EQUIPMENT";
            return (
                <div onClick={this.hideSelectedCardPopup} id="selected-card-wrapper" className="visible">
                    <span>SELECTED: <span className="subtext">{this.state.selectedCard.name} ({cardType})</span> <i className="fa fa-close"></i></span>
                    <div className="black-overlay"></div>
                    <div className="selected-card-background"
                         style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/'+this.state.selectedCard.code+'/icon.png)'}}
                    ></div>
                </div>
            )
        }
        if((this.lastSelectedCard && this.isClientMobile())) {
            return (
                <div onClick={this.hideSelectedCardPopup} id="selected-card-wrapper" className="visible">
                    <span>Currently selected: <span className="subtext">{this.lastSelectedCard.name}</span> <i className="fa fa-close"></i></span>
                    <div className="black-overlay"></div>
                    <div className="selected-card-background"
                         style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/'+this.lastSelectedCard.code+'/icon.png)'}}
                    ></div>
                </div>
            )
        }
        return <div onClick={this.hideSelectedCardPopup} id="selected-card-wrapper"></div>;
    },
    showSelectedCardPopup: function() {
        if(this.isClientMobile()) {
            var selectedCardPopup = document.getElementById("selected-card-wrapper");
            if(selectedCardPopup) {
                selectedCardPopup.className = "visible";
            }
        }
    },
    hideSelectedCardPopup: function() {
        if(this.isClientMobile()) {
            var selectedCardPopup = document.getElementById("selected-card-wrapper");
            if(selectedCardPopup) {
                selectedCardPopup.className = "hidden";
                this.setState({ selectedCard : null });
            }
        }
    },
    getAffinities: function() {
        var affinities = [];
        if(this.state.selectedHero) {
            affinities = this.state.selectedHero.affinities.map(function(affinity) {
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
    // Handles auto bind to a slot
    /** END OF FUNCTIONS **/
    render: function() {
        // Used to delete cards from deck builder
        var tmpLastDeletedCard = this.lastDeletedCard;
        this.lastDeletedCard = null;

        // Used to auto place into deck
        var tmpPlacementSlotIndex = this.placementSlotIndex;
        //this.placementSlotIndex = -1;

        var backButtonMobile = "";
        var searchButtonMobile = "";
        if(this.isClientMobile()) {
            if(this.state.isBuildsPanelShowing) {
                backButtonMobile = (
                    <div id="back-button-mobile" onClick={this.toggleBuildView.bind(this, false)}>
                        <i className="pgg pgg-arrow-left" aria-hidden="true"></i> BACK
                    </div>
                );
            } else if(!this.state.heroPanelActive) {
                searchButtonMobile = (
                    <button id="search-button-mobile" name="search-cards" type="submit" onClick={this.toggleSearchFilter}>
                        <i className="fa fa-search" aria-hidden="true"></i> SEARCH CARDS
                    </button>
                );
            }
        }

        var sidebarClass = this.state.activeTab === -1 ? "hidden" : "";
        var buildClass = "";
        var stickSearchFilterTop = (this.isClientMobile() && this.state.isMobileSearchShowing);
        var actionBarHidden = this.state.isMobileSearchShowing ? "hidden" : "";
        return (
            <div>
                <div id="sidebar" className={sidebarClass}>
                    <div id="action-button-wrapper" className={ actionBarHidden }>
                        { backButtonMobile }
                        <button onClick={this.toggleBuildView.bind(this, false, "edit-button")} name="publish" type="submit" className={"btn inline narrow"}><i className="fa fa-pencil" aria-hidden="true"></i> EDIT DECK</button>
                        <button name="publish" type="submit" className="btn inline wide"><i className="fa fa-check" aria-hidden="true"></i> SAVE DECK</button>
                        { searchButtonMobile }
                    </div>
                    <div className="dual-tab-wrapper">
                        <div className="dual-tab-tabs">
                            <div onClick={this.setActiveTab.bind(this, 0, null, "", null)}
                                 className={this.isActiveTab(0)}
                            >
                                <span>MY DECK <span className={"subtext " + (this.deckCount() >= 40 ? "max-capacity" : "") }> ( {this.deckCount()}/40 )</span></span>
                            </div>
                            <div onClick={this.setActiveTab.bind(this, 1, null, "", null)}
                                 className={this.isActiveTab(1) }
                            >
                                <span>MY BUILDS <span className={"subtext " + (this.deckCount() >= 40 ? "max-capacity" : "") }> ( {this.state.builds.length} )</span></span>
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
                            <div className={ "sidebox panel cf" + this.isActiveTab(1) }>
                                <ul className="deck-list">
                                    {this.getBuilds()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"deck-builder wrapper " + (this.state.isBuildsPanelShowing ? "hidden" : "") + buildClass}>
                    <div className="content-wrapper">
                        <div className="deck-title">
                            <div className="hero-portrait-container"
                                 onClick={this.toggleHeroPanel}
                            >
                                <div className={ this.state.heroPanelActive ? "glow-wrapper" : "glow-wrapper updated"}></div>
                                <img className={ this.state.heroPanelActive ? "hero-portrait updating" : "hero-portrait"}
                                     src={ "https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/" + this.state.selectedHero.code + "/portrait_small.png" }
                                     alt="click me"
                                />
                            </div>
                            <div className="title-container">
                                <span className="breadcrumb">Building a <strong>{ this.state.selectedHero.name }</strong> deck</span>
                                <textarea className="h2" placeholder="Enter deck name..." ref="deckNameInput"></textarea>
                            </div>
                        </div>
                        <HeroPanel showAffinityFilter={false} heroes={HEROES} isActive={this.state.heroPanelActive} onHeroSelected={this.onHeroPanelSelectedHero} />
                        <textarea className={"p " + (!this.state.heroPanelActive ? "-pull-up" : "") } ref="deckDescriptionInput" placeholder="Enter a short description about your deck, what team compositions might you use this deck against? Under what situations would you use the different builds?">
                        </textarea>
                        <div id="cards-feed" className={ this.state.showCardSection ? "" : "hidden" }>
                            <CardsFeed forceRedraw={true}
                                       stickTopOnMobile={stickSearchFilterTop}
                                       affinities={this.getAffinities()}
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
                            />
                        ) : ""
                    }
                </div>
                { this.getSelectedCardPopup() }
            </div>
        )
    }
});

var element = document.querySelector('#deck-builder');
if(element) ReactDOM.render(<DeckBuilder />, element);