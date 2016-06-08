var React = require('react');
var ReactDOM = require('react-dom');
var CardsFeed = require('../cards/CardsFeed');
var Helpers = require('../../helpers');
var Tooltip = require('../libraries/tooltip/Toptip');
var HeroPanel = require('../heroes/HeroPanel.jsx');
var Build = require('./Build');

/*
 window.onscroll = function(event) {
     var sidebar = document.querySelector(".dual-tab-wrapper");
     if(typeof sidebar !== "undefined" && sidebar) {
         var bodyRect = { width: window.innerWidth, height: window.innerHeight };
         var sidebarRect = sidebar.getBoundingClientRect();

         var offsetTop = (typeof window.pageYOffset !== "undefined") ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

         // Check if we can see the sidebar
         sidebar.style.top = offsetTop + "px";
         if((sidebarRect.top + sidebarRect.height) < 0) {
             sidebar.style.top = (oldTop + (sidebarRect.height + 100)) + "px";
         } else {
            sidebar.style.top = 0 + "px";
         }
     }
 };
*/


var DeckBuilder = React.createClass({
    getInitialState: function(){
        this.tooltip = new Tooltip();
        return {
            deck: [],
            builds: [],
            modal: false,
            cardSelected: false,
            selectedBuild : null,
            lastSelectedCard: null,
            lastSelectedBuild: null,
            playFlashAnimation: false,
            heroPanelActive: true,
            selectedHeroURL : "https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/" + HEROES[0].code + "/portrait_small.png",
            isBuildsPanelShowing : false,
            activeTab: 0  // 0 decks, 1 builds
        }
    },
    componentDidMount: function() {
        this.refs.deckNameInput.focus();
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state !== nextState;
    },
    toggleModal: function() {
        var modal = this.state.modal ? false : true;
        this.setState({modal: modal});
    },
    /** TOOLTIP FUNCTIONS **/
    setTooltipContent: function(card) {
        var content = (
            <div className="pgg-tooltip pgg-tooltip-card">
                <div className={"head affinity-" + card.affinity.substring(9).toLowerCase()}>{card.name}</div>
                <div className="content">Description about the card</div>
            </div>
        );
        var tooltip = document.getElementById("toptip");
        ReactDOM.render(content, tooltip);
    },
    showTooltip: function() {
        this.tooltip.showTooltip();
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
    addCard: function(selectedCard) {
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
            this.setState({
                deck : newDeck,
                lastSelectedCard : selectedCard,
                playFlashAnimation: true
            });
        }
    },
    selectCard: function(card, event) {
        event.preventDefault();

        var elem = event.target;
        if(elem.className !== "fa fa-trash" && elem.className !== "delete-icon") {
            if(this.state.cardSelected && this.state.cardSelected.code == card.code) {
                this.setState({cardSelected: false, playFlashAnimation: false});
            } else {
                this.setState({cardSelected: card, playFlashAnimation: false});
            }
        }
    },
    deleteCardFromDeck : function(selectedCard, event) {
        event.preventDefault();

        var newDeck = [];
        this.state.deck.forEach(function(card) {
            if(card.code !== selectedCard.code)
                newDeck.push(card);
            else if(card.quantity > 1) {
                card.quantity--;
                newDeck.push(card);
            }
        });
        this.setState({ deck : newDeck, playFlashAnimation: false });
    },
    getCardsInDeck : function() {
        var cardList = this.state.deck.map(function(card) {
            var className = "";
            var childClassName = "";
            if(this.state.lastSelectedCard.code === card.code && this.state.playFlashAnimation) {
                className += "pulse-card-outer";
                childClassName += "pulse-card-inner";
            }
            if(this.state.cardSelected.code == card.code) {
                className += " selected";
            }
            return (
                <li className={className}
                    key={card.code + "_" + Helpers.uuid() }
                    style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/'+card.code+'/icon.png)'}}
                    onContextMenu={this.deleteCardFromDeck.bind(this, card)}
                    onClick={this.selectCard.bind(this, card)}
                    onMouseEnter={this.setTooltipContent.bind(this, card)}
                    onMouseOver={this.showTooltip}
                    onMouseLeave={this.hideTooltip}
                >
                    <div className={ "wrapper " + childClassName }>
                        <span className="count">{card.quantity }x</span>
                        <span className="name">{card.name}</span>
                        <span className="cost">{card.cost} CP</span>
                    </div>
                    <div className="delete-icon" onClick={this.deleteCardFromDeck.bind(this, card)}>
                        <i className="fa fa-trash" aria-hidden="true" />
                    </div>
                </li>
            );

        }.bind(this));
        if(cardList.length === 0) {
            cardList.push(
                <li key="no_cards">
                    <div className="wrapper">
                        <span>To get started, select a card from the cards menu</span>
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
        if(elem.className !== "fa fa-trash" && elem.className !== "delete-icon") {
            if(this.state.selectedBuild && this.state.selectedBuild.code == build.code) {
                this.setState({selectedBuild: null, playFlashAnimation: false, isBuildsPanelShowing: true });
            } else {
                this.setState({selectedBuild: build, playFlashAnimation: false, isBuildsPanelShowing: true });
            }
        }
    },
    getBuilds: function() {
        var buildList = this.state.builds.map(function(build) {
            var className = "";
            var childClassName = "";
            if(this.state.selectedBuild !== null) {
                if(this.state.lastSelectedBuild !== null && (this.state.lastSelectedBuild.code === build.code && this.state.playFlashAnimation)) {
                    className += "pulse-card-outer";
                    childClassName += "pulse-card-inner";
                }
                if(this.state.selectedBuild.code === build.code) {
                    className += " selected";
                }
            }
            return (
                <li className={className}
                    key={build.code}
                    onClick={this.selectBuild.bind(this, build)}
                >
                    <div className={ "wrapper " + childClassName }>
                        <span className="count">{build.quantity }x</span>
                        <span className="name">{build.name}</span>
                        <span className="cost">{build.cost} CP</span>
                    </div>
                </li>
            );

        }.bind(this));
        if(buildList.length === 0) {
            buildList.push(
                <li key="no_cards">
                    <div className="wrapper">
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
        var build = {
            code : "build_" + Helpers.uuid(),
            title : "",
            cards: [],
            cost: 0
        };
        this.setState({
            builds : this.state.builds.concat(build),
            activeTab : 0,
            selectedBuild: build,
            playFlashAnimation: false
        });
        this.toggleBuildView();
    },
    toggleBuildView: function(dismiss = true) {
        this.setState({ isBuildsPanelShowing : dismiss })
    },
    /** TAB PANEL FUNCTIONS **/
    setActiveTab: function(index) {
        this.setState({ activeTab : index, playFlashAnimation: false })
    },
    isActiveTab: function(index) {
        if(this.state.activeTab === index) {
            return " active "
        }
        return "";
    },
    toggleHeroPanel: function() {
        this.setState({ heroPanelActive : !this.state.heroPanelActive })
    },
    /** HERO PANEL DROP DOWN FUNCTIONS **/
    onHeroPanelSelectedHero: function(hero) {
        if(this.refs.deckNameInput.value === "") {
            this.refs.deckNameInput.focus();
        }
        this.setState({
            heroPanelActive : !this.state.heroPanelActive,
            selectedHeroURL : "https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/" + hero.code + "/portrait_small.png"
        });
    },
    /** END OF FUNCTIONS **/
    render: function() {
        console.log("BUILDS PANEL IS SHOWING? " + this.state.isBuildsPanelShowing);
        return (
            <div>
                <div id="sidebar">
                    <div className="dual-tab-wrapper">
                        <div className="dual-tab-tabs">
                            <div onClick={this.setActiveTab.bind(this, 0)}
                                 className={this.isActiveTab(0)}
                            >
                                <span>MY DECK <span className="subtext"> ( {this.deckCount()}/40 )</span></span>
                            </div>
                            <div onClick={this.setActiveTab.bind(this, 1)}
                                 className={this.isActiveTab(1) }
                            >
                                <span>MY BUILDS</span>
                            </div>
                        </div>
                        <div className="dual-tab-panel">
                            <div className={ "sidebox panel cf" + this.isActiveTab(0) }>
                                <h4>Current Deck <span className="deck-total">{this.deckCount()}/40 Cards</span></h4>
                                <ul className="deck-list">
                                    {this.getCardsInDeck()}
                                </ul>
                            </div>
                        </div>
                        <div className="dual-tab-panel">
                            <div className={ "sidebox panel cf" + this.isActiveTab(1) }>
                                <h4>Builds <span className="deck-total">{this.buildCount()}/40 Cards</span></h4>
                                <ul className="deck-list">
                                    {this.getBuilds()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"deck-builder wrapper " + (this.state.isBuildsPanelShowing ? "hidden" : "")}>
                    <div className="content-wrapper">
                        <span className="breadcrumb">Build a deck</span>
                        <div className="deck-title">
                            <div className="hero-portrait-container"
                                 onClick={this.toggleHeroPanel}
                            >
                                <div className={ this.state.heroPanelActive ? "glow-wrapper" : "glow-wrapper updated"}></div>
                                <img className={ this.state.heroPanelActive ? "hero-portrait updating" : "hero-portrait"}
                                     src={this.state.selectedHeroURL}
                                     alt="click me"
                                />
                            </div>
                            <input className="h2" placeholder="Enter deck name..." ref="deckNameInput" />
                            <button name="publish" type="submit" className="btn"><i className="fa fa-check" aria-hidden="true"></i> SAVE DECK</button>
                        </div>
                        <HeroPanel showAffinityFilter={false} heroes={HEROES} isActive={this.state.heroPanelActive} onHeroSelected={this.onHeroPanelSelectedHero} />
                        <div className="p">
                            Write a short description about your deck. What team compositions might you use this deck against? Under what situations would you use the different builds? Click here to edit the description text.
                        </div>
                        <div id="cards-feed">
                            <CardsFeed tooltip={this.tooltip} cards={CARDS} cardsRedirectOnClick={false} onCardClicked={this.addCard} />
                        </div>
                    </div>
                </div>
                <div className={"build-builder wrapper " + (this.state.isBuildsPanelShowing ? "" : "hidden")}>
                    <div id="back-button" onClick={this.toggleBuildView.bind(this, false)}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i> BACK TO DECK BUILDER
                    </div>
                    <div id="builds-wrapper">
                        {
                            this.state.selectedBuild ? <Build build={this.state.selectedBuild} /> : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
});

var element = document.querySelector('#deck-builder');
if(element) ReactDOM.render(<DeckBuilder />, element);