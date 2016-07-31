var React    = require('react');
var Helpers  = require('../../helpers');
var CardEffects = require('./CardEffects');
var ParticleTheme = require('../../lib/ParticleThemes');

require('rc-slider/assets/index.css');
require('particles.js');

var CardStats = React.createClass({
    componentDidMount: function() {
        if (this.props.card.rarity == 'Epic') {
            particlesJS('particle-layer', ParticleTheme.epic());
        } else if (this.props.card.rarity == 'Rare') {
            particlesJS('particle-layer', ParticleTheme.rare());
        } else if(this.props.card.rarity == 'Uncommon') {
            particlesJS('particle-layer', ParticleTheme.uncommon());
        } else {
            particlesJS('particle-layer', ParticleTheme.common());
        }
    },
    getAffinity: function(str) {
        return str.replace("Affinity.", "");
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
        var slug = Helpers.convertToSlug(this.props.card.name);
        return (
            <div>
                <span className="breadcrumb">
                    <a href="/cards">CARDS</a> / <a href={ "/cards/" + slug }>{ this.props.card.name }</a>
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
                        <span style={ { color : "rgb("+this.props.rarity.color+")" } }>{ this.props.rarity.label.toUpperCase() }</span>
                        <span>{ this.getType() }</span>
                    </div>
                    <div className="attribute affinity-icon">
                        <i className={"pgg pgg-affinity-" + this.getAffinity(this.props.card.affinity).toLowerCase() + " affinity-color"} aria-hidden="true" />
                    </div>
                    <div className="attribute affinity">
                        { this.getAffinity(this.props.card.affinity).toUpperCase() }
                    </div>
                </div>

                <div className="content">
                    <label>Card Stats</label>
                    <CardEffects card={this.props.card} />
                </div>
            </div>
        );
    }
});

module.exports = CardStats;
