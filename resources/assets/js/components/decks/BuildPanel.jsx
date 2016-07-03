var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');
var Toptip = require('../libraries/tooltip/Toptip');
var CardEffects = require('../cards/CardEffects');
var PreloadImage = require('../PreloadImage');

var BuildPanel = React.createClass({
    getInitialState: function() {
        return {
            selectedTab: 0,
            selectedBuild : this.props.builds.length > 0 ? this.props.builds[0] : null
        }
    },
    componentDidMount: function() {
        this.tooltip = new Toptip();
    },
    componentDidUpdate: function(prevProps, prevState) {
        if(prevState.selectedBuild !== this.state.selectedBuild && this.props.onSelectedBuildChanged !== null)
            this.props.onSelectedBuildChanged(this.state.selectedBuild);
    },
    showBuild: function(build, index) {
        this.setState({
            selectedTab: index,
            selectedBuild: build
        });
    },
    renderBuildTabs: function() {
        var untitledCount = 1;
        return this.props.builds.map(function(build, i) {
            if(build.title === "") build.title = "untitled build";
            if(build.title.toLowerCase().indexOf("untitled") > -1 && !(/\d/g.test(build.title))) {
                build.title += " " + untitledCount;
                untitledCount+=1;
            }
            return (
                <li key={"build_tab_" + i} className={ (i === this.state.selectedTab ? "active" : "")} onClick={ this.showBuild.bind(this, build, i) }>
                    <span>{ build.title }</span>
                </li>
            )
        }.bind(this));
    },
    renderBuildSlots: function() {
        var build = this.state.selectedBuild;
        if(build && build.slots.length > 0) {
            return build.slots.map(function(slot, i) {
                if(slot.card !== null) {
                    return (
                        <li id={"c_" + i}
                            className={slot.type + " active-placed"}
                            key={"slot_" + i}
                            onMouseEnter={this.setTooltipContent.bind(this, slot.card)}
                            onMouseOver={this.showTooltip.bind(this, slot.card, "glow-layer")}
                            onMouseLeave={this.hideTooltip}
                        >
                            <span className="slot-label">{slot.type}</span>
                            <div className="placed-card"
                                 key={"card-" + i}
                            >
                                <PreloadImage src={Helpers.getCardImageURL(slot.card)}
                                              placeholderSrc="/assets/images/cards/card-placeholder.png"
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
            var jsx = [];
            for(var i = 0; i < 6; i++) {
                var type = i < 5 ? "Active" : "Passive";
                jsx.push(
                    <li id={"c_" + i}
                        className={type + " empty-slot"}
                        key={"slot_" + i}
                        onMouseEnter={this.hideTooltip}
                        onMouseOver={this.hideTooltip}
                        onMouseLeave={this.hideTooltip}
                    >
                        <span className="slot-label">{type}</span>
                        <div className="placed-card"
                             key={"card-" + i}
                        >
                        </div>
                    </li>
                )
            }
            jsx.push(<span key="no-builds" style={{display: 'block', fontSize: '16px', marginTop: '-30px'}}>Sorry, there are no builds in this deck!</span>);
            return jsx;
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
                    slotStyle = { backgroundImage: 'url('+upgradeSlot.card.images.large+')' }
                }

                return (
                    <div className={ "upgrade-slot " }
                         key={"upgrade-slot-" + Helpers.uuid() }
                         style={ slotStyle }
                         onMouseEnter={this.setTooltipContent.bind(this, upgradeSlot.card, null)}
                         onMouseOver={this.showTooltip.bind(this, upgradeSlot.card, "upgrade-label")}
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
        console.log("RENDERING CARD: ", card);
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
        return (
            <div>
                <ul id="build-tabs">
                    { this.renderBuildTabs() }
                </ul>
                <div id="builds-wrapper">
                    <ul className={"build-list"}>
                    { this.renderBuildSlots() }
                    </ul>
                </div>
            </div>
        )
    }
});

module.exports = BuildPanel;

var element = document.querySelector('#deck-builds');
if(element) {
    ReactDOM.render(<BuildPanel builds={[]} />, element);
}


