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
            stats : [
                {
                    icon : "max-health",
                    label : "MAX HEALTH",
                    value : 1900,
                    scaling : 100
                },
                {
                    icon : "health-regeneration",
                    label : "HEALTH REGENERATION",
                    value : "3.8/s",
                    scaling : null
                },
                {
                    icon : "max-mana",
                    label : "MAX MANA",
                    value : 561.2,
                    scaling : 100
                },
                {
                    icon : "mana-regeneration",
                    label : "MANA REGENERATION",
                    value : "2.25/s",
                    scaling : null
                },
                {
                    icon : "energy-armor",
                    label : "ENERGY ARMOR",
                    value : 14.4,
                    scaling : 2.2
                },
                {
                    icon : "physical-armor",
                    label : "PHYSICAL ARMOR",
                    value : 13.8,
                    scaling : 2.2
                },
                {
                    icon : "movement-speed",
                    label : "MAX MOVEMENT SPEED",
                    value : 420,
                    scaling : null
                }
            ]
        }
    },
    componentDidMount: function() {
        this.sliderChanged(1);

        particlesJS('particle-layer', ParticleTheme.sparks());
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
    render: function() {

        var _this = this;
        var affinities = this.props.hero.affinities.map(function(affinity) {
            return(
                  <i className={"affinity-color pgg pgg-affinity-" + affinity.toLowerCase()} title={"Affinity: " + affinity }></i>
            );
        });

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
                    { statistics }
                </ul>
            </div>
        );
    }
});

module.exports = HeroStats;