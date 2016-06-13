var React = require('react');
var ReactDOM = require('react-dom')
var SearchBar = require('../filter/SearchBar');
var ToggleFilter = require('../filter/ToggleFilter');
var HeroPreview = require('./HeroPreview');

var HeroesFilter = React.createClass({
    getInitialState: function(){
        return {
            filter_owned : false,
            filter_affinities : [],
            filter_type : 'All',
            search_term : "",
            affinities : [
                { name : "Fury" },
                { name : "Order" },
                { name : "Growth" },
                { name : "Intellect" },
                { name : "Corruption" }
            ]
        }
    },
    filter: function(element) {
        switch(element.target.name) {
            case 'owned':
                this.setState({filter_owned: element.target.checked});
                break;
            case 'affinity':
                this.setState({filter_affinity: element.target.value});
                break;
            case 'type':
                this.setState({filter_type: element.target.value});
                break;
        }
    },
    shouldBeVisible: function(hero) {
        // var heroAffinity = hero.affinity.replace("Affinity.", "").toLowerCase();
        var hasSearchTerm = this.state.search_term.length > 0;
        var matches = false;
        //
        // // TODO REFACTOR COMPONENT TO USE STATIC FILTERS ONLY PASSED THROUGH PROPS, NOT SET IN STATE
        // // SEARCH TERM AND AFFINITIES FOR DYNAMIC FILTERS
        // if(this.state.filter_affinities.length !== 0) {
        //     this.state.filter_affinities.forEach(function(affinityFilter) {
        //         var affinity = affinityFilter.type.toLowerCase();
        //
        //         if(heroAffinity === affinity) {
        //             if((hasSearchTerm && hero.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) > -1) || !hasSearchTerm)
        //                 matches = true;
        //         }
        //     }.bind(this));
        // }
        // // SEARCH TERM AND AFFINITIES FOR PROPS (OTHERWISE BREAK ON CARDS PAGE) - USES STATIC FILTERS
        // else if(this.props.affinities) {
        //     this.props.affinities.forEach(function(affinityFilter) {
        //         var affinity = affinityFilter.name.toLowerCase();
        //         if(cardAffinity === affinity) {
        //             if((hasSearchTerm && card.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) > -1) || !hasSearchTerm)
        //                 matches = true;
        //         }
        //     }.bind(this));
        // }
        // SEARCH TERM ONLY
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
    inputChanged: function(searchTerm) {
        this.setState({ search_term : searchTerm });
    },
    updateHeroes: function() {
        var heroes = [];
        this.props.heroes.forEach(function(hero) {
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
        var _this = this;
        var affinityFilters = [];
        // if(this.props.affinities) {
        //     affinityFilters = this.props.affinities.map(function(affinity, i) {
        //         return <ToggleFilter key={ "affinity_toggle_" + affinity.name.toLowerCase() }
        //                              active={false}
        //                              targetObject={affinity}
        //                              className={ ("pgg pgg-affinity-" + affinity.name.toLowerCase() + " affinity-color ") }
        //                              label={ i === 0 ? "AFFINITIES" : "" }
        //                              onToggleFilterChanged={_this.affinityFilterChanged}
        //         />
        //     }.bind(this));
        // } else {
        //     affinityFilters = this.state.affinities.map(function(affinity, i) {
        //         return <ToggleFilter key={ "affinity_toggle_" + affinity.name.toLowerCase() }
        //                              className={ ("pgg pgg-affinity-" + affinity.name.toLowerCase() + " affinity-color ") }
        //                              active={false}
        //                              targetObject={affinity}
        //                              label={ i === 0 ? "AFFINITIES" : "" }
        //                              onToggleFilterChanged={_this.affinityFilterChanged}
        //         />
        //     });
        // }

        return(
            <div className="filter-wrapper">
                <SearchBar label={ "DISPLAYING " + this.props.visibleHeroCount + " OF " + this.props.totalHeroCount + " HEROES" }
                           placeholder="Enter hero name..."
                           onSearchTermChanged={this.inputChanged}
                />
                {/* affinityFilters */}
            </div>
        )
    }
});

module.exports = HeroesFilter;

