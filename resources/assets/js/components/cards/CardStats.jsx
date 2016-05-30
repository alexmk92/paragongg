var React    = require('react');
var Rcslider = require('rc-slider');
var Helpers  = require('../../helpers');
var ParticleTheme = require('../../lib/ParticleThemes');

require('rc-slider/assets/index.css');
require('particles.js');

var CardStats = React.createClass({
    getInitialState: function() {
        return {
            passives: [
                {
                    type: "Unique Aura",
                    effect: "+500 Max Health to minions"
                },
                {
                    type: "Unique Active",
                    effect: "Stasis, 2.5s immune to damage and status effects, this line is going longer to demonstrate that the content wraps."
                }
            ],
            upgradeBonuses: [
                {
                    attribute: "Crit Chance",
                    operation: "",
                    value: "8%"
                },
                {
                    attribute: "Energy Damage",
                    operation: "Additive",
                    value: "8%"
                }
            ]
        }
    },
    componentDidMount: function() {
        console.log("COLOR: ", this.props.rarity.color);
        particlesJS('particle-layer', ParticleTheme.embers());
    },
    getAffinity: function(str) {
        return str.replace("Affinity.", "");
    },
    getStatistic: function(stat, i, label) {
        var operation = "";
        switch(stat.opertation) {
            case "Additive" : operation = "+"; break;
            case "Negative" : operation = "-"; break;
            default : operation = ""; break;
        }
        var value = (function() {
            if(!isNaN(stat.value)) {
                return Number(Helpers.delimitNumbers(stat.value)).toFixed(2)
            } else {
                return stat.value;
            }
        })();
        return (
            <li key={label + "_" + i}>
                <span><img src={ stat.icon } />{ operation + value + " " + stat.attribute}</span>
            </li>
        );
    },
    renderStatistics: function() {
        var _this = this;
        var jsx = "";
        var statistics = this.props.card.effects.map(function(stat, i) {
            return _this.getStatistic(stat, i, "stat")
        });
        if(statistics.length > 0) {
            jsx = <div>
                      <span className="stat-header">STATISTICS</span>
                      <ul id="stat-container" className="stat-container">
                         { statistics }
                      </ul>
                  </div>
        }
        return jsx;
    },
    renderPassives: function() {
        var _this = this;
        var jsx = "";
        var passives = this.state.passives.map(function(passive, i) {
            console.log(passive);
            return (
                <li key={"passive_" + i}>
                    <span><span className="italic">{ passive.type + ": "}</span>{ passive.effect }</span>
                </li>
            );
        });
        console.log(passives);
        if(passives.length > 0) {
            jsx = <div className="top-spacer">
                <span className="stat-header">EFFECTS</span>
                <ul id="passive-container" className="stat-container">
                    { passives }
                </ul>
            </div>
        }
        return jsx;
    },
    renderUpgradeBonuses: function() {
        var _this = this;
        var jsx = "";
        var upgradeBonuses = this.state.upgradeBonuses.map(function(upgrade, i) {
            return _this.getStatistic(upgrade, i, "upgrade")
        });
        if(upgradeBonuses.length > 0) {
            jsx = <div className="top-spacer">
                <span className="stat-header upgraded">FULLY UPGRADED BONUS</span>
                <ul id="upgrade-container" className="stat-container">
                    { upgradeBonuses }
                </ul>
            </div>
        }
        return jsx;
    },
    render: function() {
        return (
            <div>
                <p id="breadcrumb">
                    <a href="/cards">
                        CARDS
                    </a> /&nbsp;
                    <a href={ "/cards/" + this.props.card.name }>
                        { this.props.card.name.toUpperCase() }
                    </a>
                </p>
                <span id="name">
                    { this.props.card.name.toUpperCase() }
                </span>
                <div id="divider"></div>
                <div id="attribute-container">
                    <div id="cost-container">
                        <span>COST</span>
                        <span>{ this.props.card.cost === 0 ? Math.floor(Math.random() * (6 - 1 + 1)) + 1 : this.props.card.cost }</span>
                    </div>
                    <div id="vertical-separator"></div>
                    <div id="rarity-container">
                        <span style={ { color : this.props.rarity.color } }>{ this.props.rarity.label.toUpperCase() }</span>
                        <span>{ this.props.card.type.toUpperCase() }</span>
                    </div>
                    <div id="affinity-container">
                        <img src="/assets/images/affinities/fury.png" />
                        <span>{ this.getAffinity(this.props.card.affinity).toUpperCase() }</span>
                    </div>
                </div>
                { this.renderStatistics() }
                { this.renderPassives() }
                { this.renderUpgradeBonuses() }
            </div>
        );
    }
});

module.exports = CardStats;