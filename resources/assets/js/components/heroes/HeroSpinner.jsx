var React = require('react');
var Helpers = require('../../helpers');

var HeroSpinner = React.createClass({
    getInitialState: function () {
        return {
            heroes: [],
            activeIndex: 0
        }
    },
    componentDidMount: function () {
        this.sortToMiddle();
    },
    sortToMiddle: function () {

        var _this = this;

        // Sort alphabetically first
        this.props.heroes.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        // Now build a new array sorting to middle
        var heroesLength = this.props.heroes.length;
        var activeIndex = (function () {
            var index = -1;
            _this.props.heroes.every(function (hero, i) {
                if (hero.name === _this.props.activeHero.name) {
                    index = i;
                    return false;
                }
                return true;
            });
            return index;
        })();

        if (activeIndex > 0) {
            var heroes = [];
            var sampleSizePerSide = Math.floor(this.props.heroDisplayCount / 2);
            if (sampleSizePerSide > Math.floor(heroesLength / 2)) {
                sampleSizePerSide = 1;
            }
            var middleIndex = Math.floor(this.props.heroDisplayCount / 2) + 1;
            console.log("middle index is" + middleIndex);
            console.log(this.props.heroes);

            var indexes = (function () {
                var indexes = [];
                var index = 0;
                for (var i = sampleSizePerSide; i > 0; i--) {
                    // Left hand indexes
                    if (activeIndex - (i) < 0) indexes[index] = _this.props.heroes.length - (i - 1);
                    else indexes[index] = activeIndex - (i);
                    index++;
                }
                for (var j = sampleSizePerSide; j > 0; j--) {
                    // Right hand indexes
                    if (activeIndex + (j) >= _this.props.heroes.length) indexes[index] = j;
                    else indexes[index] = (activeIndex + (j));
                    index++;
                }
                return indexes;
            })();

            var middleInserted = false;
            for (var i = 0; i < this.props.heroDisplayCount; i++) {
                var index = middleInserted ? indexes[i - 1] : indexes[i];
                console.log("hero at index" + i + "in indexes is " + this.props.heroes[index].name + ", its index in the master array is " + index);
                if (i === middleIndex - 1) {
                    heroes.push(this.props.heroes[activeIndex]);
                    middleInserted = true;
                }
                else heroes.push(this.props.heroes[index]);
            }

            this.setState({heroes: heroes, activeIndex: middleIndex})
        }
    },
    render: function () {
        var _this = this;
        var heroes = this.state.heroes.map(function (hero, i) {
            return (
                <li className={ i === (_this.state.activeIndex - 1) ? "active" : "" } key={ Helpers.uuid() }>
                    <a href={"/heroes/" + hero.name }>
                        <img
                            src={"https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/" + hero.code + "/portrait_small.png"}/>
                        <span>{hero.name}</span>
                    </a>
                </li>
            );
        });
        return (
            <ul>{heroes}</ul>
        )
    }
});

module.exports = HeroSpinner;
