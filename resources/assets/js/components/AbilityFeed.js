import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AbilityItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false
        }
    }
    render() {
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
}

class AbilityFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
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
}

const elem = document.getElementById("abilities-wrapper");
if(typeof elem !== "undefined" && elem !== null) {
    ReactDOM.render( <AbilityFeed abilities={ HERO.abilities } />, elem);
}