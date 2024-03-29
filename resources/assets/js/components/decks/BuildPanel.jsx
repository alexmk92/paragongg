var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');
var Toptip = require('../libraries/tooltip/Toptip');
var CardEffects = require('../cards/CardEffects');
var PreloadImage = require('../PreloadImage');

var BuildPanel = React.createClass({
    getInitialState: function() {
        return {
            builds: [],
            selectedTab: 0,
            selectedBuild : null
        }
    },
    componentDidMount: function() {
        this.tooltip = new Toptip();
        if(!Helpers.isNullOrUndefined(this.props.modifyState) && this.props.modifyState === false) {
            return;
        }

        var newBuilds = this.props.deck.builds.map(function(build) {
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
            return build;
        }.bind(this));

        this.setState({ builds: newBuilds, selectedBuild : newBuilds[0] });
    },
    getCard: function(cardCode) {
        var cardToReturn = null;
        this.props.deck.cards.all.some(function(card) {
            if(card.code === cardCode) {
                cardToReturn = card;
                return true;
            }
            return false;
        });
        return cardToReturn;
    },
    componentDidUpdate: function(prevProps, prevState) {
        if(prevState.selectedBuild !== this.state.selectedBuild && typeof this.props.onSelectedBuildChanged !== "undefined")
            this.props.onSelectedBuildChanged(this.state.selectedBuild, this.state.builds);
        if(prevState.builds.length !== this.state.builds.length && typeof this.props.onBuildsUpdated !== "undefined")
            this.props.onSelectedBuildChanged(this.state.selectedBuild, this.state.builds);
    },
    showBuild: function(build, index) {
        this.setState({
            selectedTab: index,
            selectedBuild: build
        });
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("UPDATING WITH: ", nextProps.buildIndex);
    },
    renderBuildTabs: function() {
        var untitledCount = 1;
        return this.state.builds.map(function(build, i) {
            if(build.title === "") build.title = "untitled build";
            if(build.title.toLowerCase().indexOf("untitled") > -1 && !(/\d/g.test(build.title))) {
                build.title += " " + untitledCount;
                untitledCount+=1;
            }
            return (
                <li key={"build_tab_" + i} className={ (i === this.state.selectedTab ? "active" : "")} onClick={ this.showBuild.bind(this, build, i) }>
                    <span>{ build.title } <span className="cost">{build.cost}CP</span></span>
                </li>
            )
        }.bind(this));
    },
    renderBuildSlots: function(buildIndex) {
        var build = this.state.selectedBuild;
        // Render the build at the given index if sent by an inline build
        if(!Helpers.isNullOrUndefined(buildIndex)) {
            build = this.state.builds[0];
        }
        if(build && build.slots.length > 0) {
            return build.slots.map(function(slot, i) {
                if(slot.card !== null) {
                    return (
                        <li id={"c_" + i}
                            className={slot.type + " active-placed"}
                            key={"slot_" + i}
                        >
                            <span className="slot-label">{slot.type}</span>
                            <div className="placed-card"
                                 key={"card-" + i}
                                 onMouseEnter={this.setTooltipContent.bind(this, slot.card)}
                                 onMouseOver={this.showTooltip.bind(this, slot.card)}
                                 onMouseLeave={this.hideTooltip}
                            >
                                <PreloadImage src={Helpers.getCardImageURL(slot.card)}
                                              placeholderSrc="/assets/images/cards/card-placeholder.png"
                                              fallbackSrc="/assets/images/cards/card-placeholder.png"
                                />
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
                            className={slot.type + " empty-slot"}
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
            return <blockquote>Sorry there are no builds in this deck</blockquote>;
            /*
            if(!Helpers.isNullOrUndefined(this.props.hasStats) && this.props.hasStats === true)
                jsx.push(<span key="no-builds" style={{display: 'block', fontSize: '16px', marginTop: '-30px', padding: '20px 0 60px 0'}}>Sorry, there are no builds in this deck, therefore we computed a statistical analysis on what can be achieved from this deck!</span>);
            return jsx;
            */
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
                    slotStyle = { backgroundImage: 'url('+Helpers.getCardImageURL(upgradeSlot.card, 'medium', 'icon')+')' }
                }

                return (
                    <div className={ "upgrade-slot " }
                         key={"upgrade-slot-" + Helpers.uuid() }
                         style={ slotStyle }
                         onMouseEnter={this.setTooltipContent.bind(this, upgradeSlot.card, null)}
                         onMouseOver={this.showTooltip.bind(this, upgradeSlot.card)}
                         onMouseLeave={this.hideTooltip}
                    >
                        { label }
                        <div className="overlay"></div>
                    </div>
                )
            }.bind(this));
        }
    },
    /* TOOLTIP METHODS */
    setTooltipContent: function(card) {
        if(card)
        {
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
        if(card) {
            this.tooltip.showTooltip();
        }
    },
    hideTooltip: function() {
        this.tooltip.hideTooltip();
    },
    render: function() {
        if(Helpers.isNullOrUndefined(this.props.buildIndex)) {
            // render all builds in this
            return (
                <div>
                    <ul className="build-tabs">
                        { this.renderBuildTabs() }
                    </ul>
                    <div className="builds-wrapper">
                        <ul className={"build-list"}>
                            { this.renderBuildSlots() }
                        </ul>
                    </div>
                </div>
            )
        } else {
            // This is an inline build
            return (
                <div>
                    <div className="builds-wrapper">
                        <ul className={"build-list"}>
                            { this.renderBuildSlots(this.props.buildIndex) }
                        </ul>
                    </div>
                </div>
            )
        }

    }
});

module.exports = BuildPanel;

var element = document.querySelector('#deck-builds');
if(element) {
    ReactDOM.render(<BuildPanel deck={DECK} />, element);
}


