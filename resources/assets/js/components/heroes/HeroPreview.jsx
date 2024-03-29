var React = require('react');
var Helpers = require('../../helpers');
var PreloadImage = require('../PreloadImage');

var HeroPreview = React.createClass({
    getInitialState: function() {
        return {
            affinities: this.props.hero.affinities
        }
    },
    getAffinities: function() {
        var affinities = [];
        this.state.affinities.forEach(function (affinity) {
            affinity = affinity.toLowerCase();
            affinities.push(<i key={affinity} className={"pgg pgg-affinity-" + affinity + " affinity-color"} ></i>);
        });
        return affinities;
    },
    render: function() {
        return (
            <a href={ "/heroes/" + this.props.hero.slug }>
                <li className="hero-preview">
                    <PreloadImage src={Helpers.S3URL() + 'images/heroes/' + this.props.hero.code + '/' + this.props.hero.image + '/portrait_medium.png'} />
                    <div className="hero-preview-title">
                        <div className="hero-affinities">
                            {this.getAffinities()}
                        </div>
                        <span className="title">{this.props.hero.name}</span>
                        {/*<span className="winrate">65% Win Rate</span>*/}
                        <span className="type">{this.props.hero.type}</span>
                    </div>
                    {/*<div className="winrate-wrapper">
                        <div className="winrate-bar"></div>
                    </div>*/}
                </li>
            </a>
        )
    }
});

module.exports = HeroPreview;
