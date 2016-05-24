var React = require('react');
var ReactDOM = require('react-dom');

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
        const abilities = this.props.abilities.map((ability) => {
            return (
                <AbilityItem key={ ability.name } ability={ ability } />
            );
        });
        return (
            <div>
                <h2>ABILITIES</h2>
                { abilities }
            </div>
        );
    }
});

var element = document.getElementById("abilities-wrapper");
if(element) ReactDOM.render( <AbilityFeed abilities={ HERO.abilities } />, element);