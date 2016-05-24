require('rc-slider/assets/index.css');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rcslider from 'rc-slider';
import { uuid, delimitNumbers } from '../helpers';

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