var React = require('react');

var HeroPreview = React.createClass({
    getInitialState: function() {
        return {
            affinities: this.props.hero.affinities
        }
    },
    getAffinities: function() {
        var affinities = [];
        this.state.affinities.forEach(function (affinity) {
            affinity = affinity.substring(9).toLowerCase();
            affinities.push(<i key={affinity} className={"pgg pgg-affinity-" + affinity + " affinity-color"} ></i>);
        });
        return affinities;
    },
    render: function() {
        var divStyle = {
            backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/' + this.props.hero.code + '/portrait.png)'
        };
        return (
            <a href={ "/heroes/" + this.props.hero.name.toLowerCase() }>
                <li className="hero-preview" style={divStyle}>
                    <div className="hero-preview-title">
                        <div className="hero-affinities">
                            {this.getAffinities()}
                        </div>
                        <span className="title">{this.props.hero.name}</span>
                        <span className="winrate">65% Win Rate</span>
                    </div>
                    <div className="winrate-wrapper">
                        <div className="winrate-bar"></div>
                    </div>
                </li>
            </a>
        )
    }
});

module.exports = HeroPreview;
