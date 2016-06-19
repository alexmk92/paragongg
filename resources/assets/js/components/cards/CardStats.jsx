var React    = require('react');
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
        particlesJS('particle-layer', ParticleTheme.embers());
    },
    getAffinity: function(str) {
        return str.replace("Affinity.", "");
    },
    renderStatistics: function() {
        var jsx = "";
        var statistics = [];
        this.props.card.effects.forEach(function(stat, i) {
            if(stat.stat) {
                var statistic = Helpers.getFormattedStatistic(stat.stat);
                console.log("STAT IS: ", statistic);
                statistics.push(
                    <li key={stat.label + "_" + i}>
                        <span className="value">{Number(stat.value).toFixed(2) + "" + statistic.modifier }</span> <span><i className={statistic.icon} aria-hidden="true" /> { statistic.label} </span>
                    </li>
                );
            }
        }.bind(this));
        if(statistics.length > 0) {
            jsx = <div>
                      <label>Statistics</label>
                      <ul id="stat-container" className="stat-container">
                         { statistics }
                      </ul>
                  </div>
        }
        return jsx;
    },
    renderPassives: function() {
        var jsx = "";
        var passives = [];
        this.props.card.effects.forEach(function(passive, i) {
            if(passive.description) {
                console.log("Found a passive: ", passive);
                var passiveOrActive = passive.passive ? "Passive" : "Active";
                var isUnique = passive.unique ? "Unique " : "";

                var passiveName = isUnique + passiveOrActive;
                passives.push(
                    <li key={"passive_" + i}>
                        <span><strong>{ passiveName + ": "}</strong>{ Helpers.getFormattedCardDescription(passive.description) }</span>
                    </li>
                );
            }
        });
        if(passives.length > 0) {
            jsx = <div className="passive-stats">
                <label>Effects</label>
                <ul className="stat-container">
                    { passives }
                </ul>
            </div>
        }
        return jsx;
    },
    renderUpgradeBonuses: function() {
        var jsx = "";
        var upgradeBonuses = [];
        if(this.props.card.maxedEffects) {
            this.props.card.maxedEffects.forEach(function(upgrade, i) {
                var upgradeDetails = Helpers.getFormattedStatistic(upgrade.stat);
                upgradeBonuses.push(
                    <li key={upgradeDetails.label + "_" + i}>
                        <span><i className={upgradeDetails.icon} aria-hidden="true" /> { upgradeDetails.label + " " + Number(upgrade.value).toFixed(2) + "" + upgradeDetails.modifier }</span>
                    </li>
                );
            }.bind(this));
            if(upgradeBonuses.length > 0) {
                jsx = <div className="fully-upgraded-stats">
                    <label className="upgraded">Fully Upgraded Bonus</label>
                    <ul id="upgrade-container" className="stat-container">
                        { upgradeBonuses }
                    </ul>
                </div>
            }
        }
        return jsx;
    },
    getType: function() {
        var type = this.props.card.type.toUpperCase().trim();
        switch(type) {
            case "ZERO" : return "PASSIVE";
            case "ONE" : return "ACTIVE";
            case "TWO" : return "UPGRADE";
            case "THREE" : return "PRIME HELIX";
            default : return type;
        }
    },
    render: function() {
        return (
            <div>
                <span className="breadcrumb">
                    <a href="/cards">CARDS</a> / <a href={ "/cards/" + this.props.card.name }>{ this.props.card.name }</a>
                </span>
                <h1 id="name">
                    { this.props.card.name.toUpperCase() }
                </h1>
                <div className="attributes">
                    <div className="attribute cost">
                        <label>Cost</label>
                        <span>{ this.props.card.cost }</span>
                    </div>
                    <div className="attribute rarity">
                        <span style={ { color : this.props.rarity.color } }>{ this.props.rarity.label.toUpperCase() }</span>
                        <span>{ this.getType() }</span>
                    </div>
                    <div className="attribute affinity-icon">
                        <i className={"pgg pgg-affinity-" + this.getAffinity(this.props.card.affinity).toLowerCase() + " affinity-color"} aria-hidden="true" />
                    </div>
                    <div className="attribute affinity">
                        { this.getAffinity(this.props.card.affinity).toUpperCase() }
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
