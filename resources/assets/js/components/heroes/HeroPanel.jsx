var React = require('react');
var SearchBar = require('../../components/filter/SearchBar');
var ToggleFilter = require('../filter/ToggleFilter');
var FlipMove = require('react-flip-move');

var HeroPanel = React.createClass({
    getInitialState: function() {
        return {
            heroes : [],
            searchTerm : "",
            filter_affinities : [
                { "type" : "Fury" },
                { "type" : "Order" },
                { "type" : "Growth" },
                { "type" : "Intellect" },
                { "type" : "Corruption" }
            ],
            affinities : [
                { "name" : "Fury" },
                { "name" : "Order" },
                { "name" : "Growth" },
                { "name" : "Intellect" },
                { "name" : "Corruption" }
            ]
        }
    },
    shouldBeVisible: function(hero) {
        var hasAffinity = false;
        this.state.filter_affinities.forEach(function(affinity) {
            hero.affinities.forEach(function(hero_affinity) {
                if(hero_affinity.toLowerCase().indexOf(affinity.type.toLowerCase()) > -1) {
                    hasAffinity = true;
                }
            });
        });
        return hasAffinity && (hero.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1);
    },
    onSearchTermChanged: function(searchTerm) {
        this.setState({ searchTerm : searchTerm });
    },
    affinityFilterChanged: function(isActive, affinity) {
        var filters = [];
        if(this.state.filter_affinities.length === 0 && isActive) {
            filters.push({ "type" : affinity.name.toLowerCase() })
        } else {
            this.state.filter_affinities.forEach(function(filter) {
                if((filter.type.toLowerCase() === affinity.name.toLowerCase()) && !isActive) {
                } else {
                    filters.push(filter);
                }
            });
            if(isActive) {
                filters.push({ "type" : affinity.name.toLowerCase() });
            }
        }
        this.setState({ filter_affinities: filters });
    },
    getAffinityFilters: function() {
        if(!this.props.showAffinityFilter) {
            return "";
        }
        return this.state.affinities.map(function(affinity, i) {
            return <ToggleFilter key={ "affinity_toggle_" + affinity.name.toLowerCase() }
                                 affinity={affinity}
                                 label={ i === 0 ? "HERO AFFINITIES" : "" }
                                 onToggleFilterChanged={this.affinityFilterChanged}
            />
        }.bind(this));
    },
    selectedHero: function(hero) {
        this.props.onHeroSelected(hero);
    },
    getHeroes: function() {
        var heroes = [];
        this.props.heroes.forEach(function(hero) {
            if(this.shouldBeVisible(hero)) {
                heroes.push(
                    <li key={"hero_panel_" + hero.name} className="hero-row" onClick={this.selectedHero.bind(this, hero)}>
                        <a href="#">
                            <img
                                src={"https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/" + hero.code + "/portrait_small.png" }/>
                            <span>{hero.name.toUpperCase()}</span>
                        </a>
                    </li>
                );
            }
        }.bind(this));
        if(heroes.length === 0) {
            heroes.push(<li className="hero-row"><span>We're sorry, no heroe's match the search term {this.state.searchTerm}</span></li>)
        }
        return heroes;
    },
    render: function() {
        return (
            <div className={this.props.isActive ? "hero-panel visible " : "hero-panel"}>
                <div className="filter-wrapper">
                    <SearchBar label="HERO NAME" placeholder="Enter hero name..." onSearchTermChanged={this.onSearchTermChanged} />
                    { this.getAffinityFilters() }
                </div>
                <div className="list-wrapper">
                    <ul>
                        <FlipMove>
                            { this.getHeroes() }
                        </FlipMove>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = HeroPanel;