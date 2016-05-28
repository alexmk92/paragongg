var React = require('react');

var AbilityItem = React.createClass({
    getInitialState: function() {
        return {
            playing: false
        }
    },
    render: function() {
        console.log(this.props.ability);
        return (
            <div className="ability-container">
                <div className="video-wrapper">
                    A VIDEO
                </div>
                <div className="text-wrapper">
                    SOME TEXT
                </div>
            </div>
        );
    }
});

var AbilityFeed = React.createClass({
    render: function() {
        var abilities = this.props.abilities.map(function(ability) {
            return (
                <AbilityItem key={ ability.name } ability={ ability } />
            );
        });
        return (
            <div>
                <div id="ability-header">
                    <h2>ABILITIES</h2>
                </div>
                { abilities }
            </div>
        );
    }
});

module.exports = AbilityFeed;