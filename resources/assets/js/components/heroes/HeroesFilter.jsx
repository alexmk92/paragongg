var React        = require('react');
var SearchBar    = require('../filter/SearchBar');
var ToggleFilter = require('../filter/ToggleFilter');
var HeroPreview  = require('./HeroPreview');

var HeroesFilter = React.createClass({
    getInitialState: function(){
        return {
            search_term : ""
        }
    },
    shouldBeVisible: function(hero) {
        var hasSearchTerm = this.state.search_term.length > 0;
        var matches = false;

        if((hasSearchTerm && hero.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) > -1) || !hasSearchTerm) {
            matches = true;
        }

        return matches;
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextProps.visibleHeroCount !== this.props.visibleHeroCount) {
            return true;
        }
        if(this.props.forceRedraw) {
            this.forceUpdate();
        }
        return nextState !== this.state;
    },
    componentDidUpdate: function() {
        this.updateHeroes();
    },
    componentDidMount: function() {
        this.inputChanged("");
    },
    inputChanged: function(searchTerm) {
        this.setState({ search_term : searchTerm });
    },
    sortHeroes: function() {
        var sortedHeroes = [];

        var mostRecentlyCreatedHero = null;
        var nameSortedHeroes = this.props.heroes.sort(function(a, b) {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });

        nameSortedHeroes.forEach(function(recentHero) {
            if(mostRecentlyCreatedHero === null || recentHero.created_at > mostRecentlyCreatedHero.created_at) {
                mostRecentlyCreatedHero = recentHero;
            }
        });

        var containsMostRecentHero = false;
        this.props.heroes.forEach(function(hero, i) {
            if(!containsMostRecentHero) {
                sortedHeroes[i] = mostRecentlyCreatedHero;
                containsMostRecentHero = true;
            } else if(hero !== mostRecentlyCreatedHero) {
                sortedHeroes[i] = hero;
            }
        }.bind(this));

        return sortedHeroes;
    },
    updateHeroes: function() {
        var heroes = [];
        var sortedHeroes = this.sortHeroes();
        sortedHeroes.forEach(function(hero) {
            if(this.shouldBeVisible(hero) === true) {
                heroes.push(<HeroPreview hero={hero}
                                         key={hero.code}
                                         redirectsOnClick={this.props.heroesRedirectOnClick}
                                         onCardClicked={this.props.onCardClicked}
                />);
            }
        }.bind(this));
        this.props.onFilterChanged(heroes);
    },
    render: function() {
        return(
            <div className="filter-wrapper">
                <SearchBar label={ "Displaying " + this.props.visibleHeroCount + " of " + this.props.totalHeroCount + " heroes" }
                           placeholder="Enter hero name..."
                           onSearchTermChanged={this.inputChanged}
                />
            </div>
        )
    }
});

module.exports = HeroesFilter;

