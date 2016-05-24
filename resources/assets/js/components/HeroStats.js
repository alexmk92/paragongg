require('rc-slider/assets/index.css');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rcslider from 'rc-slider';
import { uuid, delimitNumbers } from '../helpers';

document.addEventListener( 'DOMContentLoaded', function () {
    particlesJS('particle-layer', {
        particles: {
            color: '#fff',
            shape: 'triangle', // "circle", "edge" or "triangle"
            opacity: 0.2,
            size: 1,
            size_random: false,
            nb: 200,
            line_linked: {
                enable_auto: true,
                distance: 250,
                color: '#fff',
                opacity: 0.5,
                width: 1,
                condensed_mode: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 600
                }
            },
            anim: {
                enable: true,
                speed: 2
            }
        },
        interactivity: {
            enable: false,
            mouse: {
                distance: 250
            },
            detect_on: 'canvas', // "canvas" or "window"
            mode: 'grab'
        },
        /* Retina Display Support */
        retina_detect: false
    });
}, false );



class StatisticPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multiplier : 1,
            stats : [
                {
                    icon : "",
                    label : "MAX HEALTH",
                    value : 1900,
                    scaling : 100
                },
                {
                    icon : "",
                    label : "HEALTH REGENERATION",
                    value : "3.8/s",
                    scaling : null
                },
                {
                    icon : "",
                    label : "MAX MANA",
                    value : 561.2,
                    scaling : 100
                },
                {
                    icon : "",
                    label : "MANA REGENERATION",
                    value : "2.25/s",
                    scaling : null
                },
                {
                    icon : "",
                    label : "ENERGY ARMOR",
                    value : 14.4,
                    scaling : 2.2
                },
                {
                    icon : "",
                    label : "PHYSICAL ARMOR",
                    value : 13.8,
                    scaling : 2.2
                },
                {
                    icon : "",
                    label : "MAX MOVEMENT SPEED",
                    value : 420,
                    scaling : null
                }
            ]
        };

        this.sliderChanged = this.sliderChanged.bind(this);
    }
    componentDidMount() {
        this.sliderChanged(1);
    }
    sliderChanged(value) {
        const domNode = `<p>RANK<br/><span>${ value }</span></p>`;
        const elem = document.querySelector(".rc-slider-handle");
        if(typeof elem !== "undefined" && elem !== null) {
            elem.innerHTML = domNode;
            this.setState({ multiplier : value });
        }
    }
    render() {
        /*
        const affinities = this.props.hero.affinities.map((affinity) => {
            return(
                  <li><span>{ affinity }</span></li>
            );
        });
        */
        const affinities = <li>No affinities</li>;
        const roles = <li>No suggested roles</li>;

        const statistics = this.state.stats.map((stat) => {
            const scale = this.state.multiplier === 1 ? 0 : stat.scaling;
            const value = isNaN(stat.value) ? stat.value : delimitNumbers((stat.value + ( scale* this.state.multiplier)).toFixed(1));
            const scaling = stat.scaling !== null ? <span className="scaling">({ stat.scaling } per level)</span> : "";
            return (
                <li key={stat.label}>
                    <span>{ stat.label }</span>
                    <span><img src={ stat.icon } /> { value } { scaling }</span>
                </li>
            );
        });
        return (
            <div>
                <span id="name">{ this.props.hero.name.toUpperCase() }</span>
                <div id="divider"></div>
                <ul id="overview">
                    <li className="parent-list">
                        <span>AFFINITIES</span>
                        <ul>
                            { affinities }
                        </ul>
                    </li>
                    <li className="parent-list">
                        <span>SUGGESTED ROLES</span>
                        <ul>
                            { roles }
                        </ul>
                    </li>
                </ul>

                <div id="rank-slider">
                    <Rcslider defaultValue={1} min={1} max={15} onChange={this.sliderChanged} tipFormatter={null}  />
                </div>

                <ul id="stat-container">
                    { statistics }
                </ul>
            </div>
        );
    }
}

var elem = document.getElementById("hero-stats");
if(typeof elem !== "undefined" && elem) {
    ReactDOM.render(<StatisticPanel hero={ HERO } />, elem);
}