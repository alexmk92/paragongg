import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { uuid } from '../helpers';

class HeroSpinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroes: [],
            activeIndex : 0
        };

        this.sortToMiddle = this.sortToMiddle.bind(this);
    }
    componentDidMount() {
        this.sortToMiddle();
    }
    sortToMiddle() {

        // Sort alphabetically first
        this.props.heroes.sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });

        // Now build a new array sorting to middle
        const heroesLength = this.props.heroes.length;
        const activeIndex = (() => {
            var index = -1;
            this.props.heroes.every((hero, i) => {
                if (hero.name === this.props.activeHero.name) {
                    index = i;
                    return false;
                }
                return true;
            });
            return index;
        })();

        if(activeIndex > 0) {
            const heroes = [];
            var sampleSizePerSide = Math.floor(this.props.heroDisplayCount / 2);
            if(sampleSizePerSide > Math.floor(heroesLength / 2)) {
                sampleSizePerSide = 1;
            }
            const middleIndex = Math.floor(this.props.heroDisplayCount / 2) + 1;
            console.log(`middle index is ${middleIndex}`)
            console.log(this.props.heroes);

            const indexes = (() => {
                const indexes = [];
                var index = 0;
                for(var i = sampleSizePerSide; i > 0; i--) {
                    // Left hand indexes
                    if(activeIndex - (i) < 0) indexes[index] = this.props.heroes.length - (i - 1);
                    else indexes[index] = activeIndex - (i);
                    index++;
                }
                for(var j = sampleSizePerSide; j > 0; j--) {
                    // Right hand indexes
                    if(activeIndex + (j) >= this.props.heroes.length) indexes[index] = j;
                    else indexes[index] = (activeIndex + (j));
                    index++;
                }
                return indexes;
            })();

            var middleInserted = false;
            for(var i = 0; i < this.props.heroDisplayCount; i++) {
                const index = middleInserted ? indexes[i-1] : indexes[i];
                console.log(`hero at index ${i} in indexes is ${this.props.heroes[index].name}, its index in the master array is ${index}`);
                if(i === middleIndex - 1) { heroes.push(this.props.heroes[activeIndex]); middleInserted = true; }
                else heroes.push(this.props.heroes[index]);
            }

            this.setState({ heroes : heroes, activeIndex : middleIndex })
        }
    }
    render() {
        const heroes = this.state.heroes.map((hero, i) => {
            return (
                <li className={ i === (this.state.activeIndex - 1) ? "active" : "" } key={ uuid() }>
                    <a href={`/heroes/${hero.name}`}>
                        <img src={`https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/${hero.code}/portrait_small.png`} />
                        <span>{hero.name}</span>
                    </a>
                </li>
            );
        });
        return (
            <ul>{heroes}</ul>
        )
    }
}

var elem = document.getElementById("heroes-spinner");
if(typeof elem !== "undefined" && elem) {
    ReactDOM.render(<HeroSpinner heroes={ HEROES } activeHero={ HERO } heroDisplayCount={ 5 } />, elem);
}