var React = require('react');
var ReactDOM = require('react-dom')
var SearchBar = require('../filter/SearchBar');
var ToggleFilter = require('../filter/ToggleFilter');
var DropDown = require('../filter/DropDown');
var CardPreview = require('./CardPreview');
var Tooltip = require('../libraries/tooltip/Toptip');

var CardsFilter = React.createClass({
    getInitialState: function(){
        this.tooltip = this.props.tooltip || new Tooltip();
        return {
            filter_owned : false,
            filter_affinities : [],
            filter_type : 'All',
            search_term : "",
            affinities : this.props.affinities || [
                { "name" : "Fury" },
                { "name" : "Order" },
                { "name" : "Growth" },
                { "name" : "Intellect" },
                { "name" : "Corruption" },
                { "name" : "Universal" }
            ],
            statistics : [
                { "name" : "Energy Damage", "iconName" : "pgg-energy-damage", "checked" : false },
                { "name" : "Physical Damage", "iconName" : "pgg-physical-damage", "checked" : false },
                { "name" : "Energy Pen", "iconName" : "pgg-armor-penetration", "checked" : false },
                { "name" : "Physical Pen", "iconName" : "pgg-physical-penetration", "checked" : false },
                { "name" : "Energy Armor", "iconName" : "pgg-energy-armor", "checked" : false },
                { "name" : "Physical Armor", "iconName" : "pgg-physical-armor-2", "checked" : false },
                { "name" : "Crit Chance", "iconName" : "pgg-critical-strike-chance", "checked" : false },
                { "name" : "Bonus Crit Damage", "iconName" : "pgg-critical-strike-damage", "checked" : false },
                { "name" : "Max Mana", "iconName" : "pgg-max-mana", "checked" : false },
                { "name" : "Max Health", "iconName" : "pgg-max-health", "checked" : false },
                { "name" : "Mana Regen", "iconName" : "pgg-mana-regeneration", "checked" : false },
                { "name" : "Health Regen", "iconName" : "pgg-health-regeneration", "checked" : false },
                { "name" : "Max Movement Speed", "iconName" : "pgg-movement-speed", "checked" : false },
                { "name" : "Cooldown Reduction", "iconName" : "pgg-cooldown-reduction", "checked" : false },
                { "name" : "Lifesteal", "iconName" : "pgg-lifesteal", "checked" : false },
                { "name" : "Attack Speed", "iconName" : "pgg-attack-speed", "checked" : false },
                { "name" : "Harvester Placement Time", "iconName" : "pgg-harvester-placement-time", "checked" : false }
            ],
            types : [
                { "name" : "Prime Helix" },
                { "name" : "Passive" },
                { "name" : "Equipment" },
                { "name" : "Upgrade" }
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
    shouldBeVisible: function(card) {
        var _this = this;
        // CASE WHEN WE ARE USING THE SEARCH FILTER
        if(_this.state.filter_affinities.length !== 0) {
            var matches = false;
            _this.state.filter_affinities.forEach(function(affinityFilter) {
                var cardAffinity = card.affinity.replace("Affinity.", "").toLowerCase();
                var affinity = affinityFilter.type.toLowerCase();
                var hasSearchTerm = _this.state.search_term.length > 0;

                if(cardAffinity === affinity) {
                    if((hasSearchTerm && card.name.toLowerCase().indexOf(_this.state.search_term.toLowerCase()) > -1) || !hasSearchTerm)
                        matches = true;
                }
            });
            return matches;
        } else {
            return true;
        }
        /*
        if(_this.state.filter_owned == true && card.owned == false) {
            return false;
        }
        if(_this.state.filter_type != 'All' && _this.state.filter_type != card.type) {
            return false;
        }
        if(card.name.toLowerCase().indexOf(_this.state.search_term.toLowerCase()) > -1) {
            return true;
        }
        */
        return false;
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState !== this.state;
    },
    componentDidUpdate: function() {
        this.updateCards();
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
    dropDownChanged: function(newOption) {
        var newStats = this.state.statistics.map(function(statistic) {
            if(newOption === statistic)
                return newOption;
            return statistic;
        }.bind(this));
        this.setState({
            statistics : newStats
        });
    },
    updateCards: function() {
        var _this = this;
        var cards = [];
        this.props.cards.forEach(function(card) {
            if(_this.shouldBeVisible(card) === true) {
                cards.push(<CardPreview card={card}
                                        key={card.code}
                                        redirectsOnClick={this.props.cardsRedirectOnClick}
                                        onCardClicked={this.props.onCardClicked}
                                        onMouseEnter={this.setTooltipContent.bind(this, card)}
                                        onMouseOver={this.showTooltip}
                                        onMouseLeave={this.hideTooltip}
                />);
            }
        }, _this);
        this.props.onFilterChanged(cards);
    },
    setTooltipContent: function(card) {
        var content = (
            <div className="pgg-tooltip pgg-tooltip-card">
                <div className={"head affinity-" + card.affinity.substring(9).toLowerCase()}>{card.name}</div>
                <div className="content">Description about the card</div>
            </div>
        );
        var tooltip = document.getElementById("toptip");
        ReactDOM.render(content, tooltip);
    },
    showTooltip: function() {
        this.tooltip.showTooltip();
    },
    hideTooltip: function() {
        this.tooltip.hideTooltip();
    },
    render: function() {
        var _this = this;
        var affinityFilters = this.state.affinities.map(function(affinity, i) {
            return <ToggleFilter key={ "affinity_toggle_" + affinity.name.toLowerCase() }
                                 affinity={affinity}
                                 active={false}
                                 label={ i === 0 ? "AFFINITIES" : "" }
                                 onToggleFilterChanged={_this.affinityFilterChanged}
                    />
        });

        return(
            <div className="filter-wrapper">
                <SearchBar label="SEARCH BY NAME"
                           placeholder="Enter card name..."
                           onSearchTermChanged={this.inputChanged}
                />
                { affinityFilters }
                <DropDown label="Stats"
                          columns={ 2 }
                          title="FILTER BY STATS"
                          options={ this.state.statistics }
                          onOptionChanged={this.dropDownChanged}
                />
            </div>
        )
    }
});

module.exports = CardsFilter;

