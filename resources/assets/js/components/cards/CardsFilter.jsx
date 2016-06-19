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
            affinities : [
                { name : "Fury" },
                { name : "Order" },
                { name : "Growth" },
                { name : "Intellect" },
                { name : "Corruption" },
                { name : "Universal" }
            ],
            statistics : [
                { name : "Energy Damage", iconName : "pgg-energy-damage", checked : false },
                { name : "Physical Damage", iconName : "pgg-physical-damage", checked : false },
                { name : "Energy Pen", iconName : "pgg-armor-penetration", checked : false },
                { name : "Physical Pen", iconName : "pgg-physical-penetration", checked : false },
                { name : "Energy Armor", iconName : "pgg-energy-armor", checked : false },
                { name : "Physical Armor", iconName : "pgg-physical-armor-2", checked : false },
                { name : "Crit Chance", iconName : "pgg-critical-strike-chance", checked : false },
                { name : "Bonus Crit Damage", iconName : "pgg-critical-strike-damage", checked : false },
                { name : "Max Mana", iconName : "pgg-max-mana", checked : false },
                { name : "Max Health", iconName : "pgg-max-health", checked : false },
                { name : "Mana Regen", iconName : "pgg-mana-regeneration", checked : false },
                { name : "Health Regen", iconName : "pgg-health-regeneration", checked : false },
                { name : "Max Movement Speed", iconName : "pgg-movement-speed", checked : false },
                { name : "Cooldown Reduction", iconName : "pgg-cooldown-reduction", checked : false },
                { name : "Lifesteal", iconName : "pgg-lifesteal", checked : false },
                { name : "Attack Speed", iconName : "pgg-attack-speed", checked : false },
                { name : "Harvester Placement Time", iconName : "pgg-harvester-placement-time", checked : false }
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
        var cardAffinity = card.affinity.replace("Affinity.", "").toLowerCase();
        var hasSearchTerm = this.state.search_term.length > 0;
        var matches = false;

        // TODO REFACTOR COMPONENT TO USE STATIC FILTERS ONLY PASSED THROUGH PROPS, NOT SET IN STATE
        // SEARCH TERM AND AFFINITIES FOR DYNAMIC FILTERS
        if(this.state.filter_affinities.length !== 0) {
            this.state.filter_affinities.forEach(function(affinityFilter) {
                var affinity = affinityFilter.type.toLowerCase();

                if(cardAffinity === affinity) {
                    if((hasSearchTerm && card.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) > -1) || !hasSearchTerm)
                        matches = true;
                }
            }.bind(this));
        }
        // SEARCH TERM AND AFFINITIES FOR PROPS (OTHERWISE BREAK ON CARDS PAGE) - USES STATIC FILTERS
        else if(this.props.affinities) {
            this.props.affinities.forEach(function(affinityFilter) {
                var affinity = affinityFilter.name.toLowerCase();
                if(cardAffinity === affinity) {
                    if((hasSearchTerm && card.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) > -1) || !hasSearchTerm)
                        matches = true;
                }
            }.bind(this));
        }
        // SEARCH TERM ONLY
        else if((hasSearchTerm && card.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) > -1) || !hasSearchTerm) {
            matches = true;
        }

        return matches;
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextProps.visibleCardCount !== this.props.visibleCardCount) {
            return true;
        }
        if(this.props.forceRedraw) {
            this.forceUpdate();
        }
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
        var cards = [];
        this.props.cards.forEach(function(card) {
            if(this.shouldBeVisible(card) === true) {
                cards.push(<CardPreview card={card}
                                        key={card.code}
                                        redirectsOnClick={this.props.cardsRedirectOnClick}
                                        onCardClicked={this.props.onCardClicked}
                                        onMouseEnter={this.setTooltipContent.bind(this, card)}
                                        onMouseOver={this.showTooltip}
                                        onMouseLeave={this.hideTooltip}
                />);
            }
        }.bind(this));
        this.props.onFilterChanged(cards);
    },
    setTooltipContent: function(card) {
        var content = (
            <div className="pgg-tooltip pgg-tooltip-card">
                <div className="card-head">
                    <span className="cost">{card.cost}</span>
                    <div className="header">
                        <span className="name">{card.name}</span>
                        <span className={"rarity rarity-" + card.rarity}>{card.rarity}</span>
                        <span className="type">{card.type}</span>
                    </div>
                    <i className={"affinity affinity-color pgg pgg-affinity-" + card.affinity.toLowerCase()}></i>
                </div>
                <div className="content">Description about the card {card.type}</div>
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
        var affinityFilters = [];
        if(this.props.affinities) {
            affinityFilters = this.props.affinities.map(function(affinity, i) {
                    return <ToggleFilter key={ "affinity_toggle_" + affinity.name.toLowerCase() }
                                         active={false}
                                         targetObject={affinity}
                                         className={ ("pgg pgg-affinity-" + affinity.name.toLowerCase() + " affinity-color ") }
                                         label={ i === 0 ? "AFFINITIES" : "" }
                                         onToggleFilterChanged={_this.affinityFilterChanged}
                    />
                }.bind(this));
        } else {
            affinityFilters = this.state.affinities.map(function(affinity, i) {
                return <ToggleFilter key={ "affinity_toggle_" + affinity.name.toLowerCase() }
                                     className={ ("pgg pgg-affinity-" + affinity.name.toLowerCase() + " affinity-color ") }
                                     active={false}
                                     targetObject={affinity}
                                     label={ i === 0 ? "AFFINITIES" : "" }
                                     onToggleFilterChanged={_this.affinityFilterChanged}
                />
            });
        }

        return(
            <div className="filter-wrapper">
                <SearchBar label={ "DISPLAYING " + this.props.visibleCardCount + " OF " + this.props.totalCardCount + " CARDS" }
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

