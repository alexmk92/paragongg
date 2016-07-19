var React    = require('react');
var Rcslider = require('rc-slider');
var Helpers  = require('../../helpers');
var ParticleTheme = require('../../lib/ParticleThemes');

require('rc-slider/assets/index.css');
require('particles.js');

var HeroStats = React.createClass({
    getInitialState: function() {
        return {
            multiplier : 1,
            statistics : []
        }
    },
    componentDidMount: function() {
        this.sliderChanged(1);
        particlesJS('particle-layer', ParticleTheme.sparks());
    },
    componentWillMount: function() {
        var baseStats = this.getBaseStats(Helpers.getAllStatistics());
        this.setState({ statistics: baseStats });
    },
    sliderChanged: function(value) {
        var domNode = "<p>Rank<br/><span>" + value + "</span></p>";
        var elem = document.querySelector(".rc-slider-handle");
        if(typeof elem !== "undefined" && elem !== null) {
            elem.innerHTML = domNode;
            this.setState({ multiplier : value });
        }
    },
    componentDidUpdate: function(prevProps, prevState) {
        if(prevState.multiplier !== this.state.mutliplier)
            this.props.onHeroRankChanged(this.state.multiplier);
    },
    renderSuggestedRoles: function() {
        return;
        var roles = <li>No suggested roles</li>;
        if(this.props.hero.roles > 0) {
            roles = this.props.hero.roles.map(function(role) {
                return(
                    <li className={"pgg pgg-role-" + role.toLowerCase()} title={"Role: " + role }></li>
                );
            });
        }
        return (
            <div>
                <label>Suggested Roles</label>
                { roles }
            </div>
        );
    },
    getBaseStats: function(allStats) {
        // Loop over base stats here too...
        if(this.props.hero.baseStats) {
            allStats.forEach(function(baseStat) {
                if(this.props.hero.baseStats[baseStat.statRef]) {
                    var heroStat = this.props.hero.baseStats[baseStat.statRef];
                    baseStat.scaling = heroStat.scaling;
                    baseStat.value = (heroStat.value + (this.props.heroRank * heroStat.scaling));
                }
            }.bind(this));
        }
        return allStats;
    },
    renderStatistics: function() {
        var statistics = [];
        this.state.statistics.forEach(function(stat) {
            console.log("STAT:", stat);
            if(stat.ref === "MAXHEALTH" || stat.ref === "MAXENERGY" || stat.ref === "HEALTHREGENRATE"
                || stat.ref === "ENERGYREGENRATE" || stat.ref === "ENERGYRESISTANCERATING" || stat.ref === "PHYSICALRESISTANCERATING"
                || stat.ref === "MAXMOVEMENTSPEED") {
                var value = isNaN(stat.value) ? stat.value : Helpers.delimitNumbers((stat.value + ( this.props.heroRank * stat.scaling)).toFixed(1));
                value += (stat.multiplier === 100 ? '%' : '');
                var scaling = (stat.scaling !== null && stat.scaling > 0) ?
                    <span className="scaling">({ stat.scaling } per level)</span> : "";
                statistics.push(
                    <li key={stat.label}>
                        <label>{ stat.label }</label>
                        <span><i className={"pgg pgg-" + stat.icon }></i> { value } { scaling }</span>
                    </li>
                );
            }
        }.bind(this));
        return statistics;
    },
    render: function() {

        var affinities = this.props.hero.affinities.map(function(affinity) {
            return(
                  <i className={"affinity-color pgg pgg-affinity-" + affinity.toLowerCase()} title={"Affinity: " + affinity }></i>
            );
        });

        /*
        var statistics = this.state.stats.map(function(stat) {
            var scale = _this.state.multiplier === 1 ? 0 : stat.scaling;
            var value = isNaN(stat.value) ? stat.value : Helpers.delimitNumbers((stat.value + ( scale * _this.state.multiplier)).toFixed(1));
            var scaling = stat.scaling !== null ? <span className="scaling">({ stat.scaling } per level)</span> : "";
            return (
                <li key={stat.label}>
                    <label>{ stat.label }</label>
                    <span><i className={"pgg pgg-" + stat.icon }></i> { value } { scaling }</span>
                </li>
            );
        });
        */

        return (
            <div>
                <span className="breadcrumb">
                    <a href="/heroes">Heroes</a> / <a href={ "/heroes/" + this.props.hero.name }>{ this.props.hero.name }</a>
                </span>
                <h1 id="name">{ this.props.hero.name.toUpperCase() }</h1>
                <div className="attributes">
                    <div className="attribute affinities">
                        <label>Affinities</label>
                        { affinities }
                    </div>
                    <div className="attribute roles">
                        { this.renderSuggestedRoles() }
                    </div>
                </div>

                <div id="rank-slider">
                    <Rcslider defaultValue={1} min={1} max={15} onChange={this.sliderChanged} tipFormatter={null}  />
                </div>

                <ul id="stat-container">
                    { this.renderStatistics() }
                </ul>
            </div>
        );
    }
});

module.exports = HeroStats;