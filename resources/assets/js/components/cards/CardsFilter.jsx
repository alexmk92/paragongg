var React = require('react');
var SearchBar = require('../filter/SearchBar');
var ToggleFilter = require('../filter/ToggleFilter');
var DropDown = require('../filter/DropDown');
var CardPreview = require('./CardPreview');

/* OLD FILTER
 <h5>{this.state.cards.length} cards found</h5>
 <div id="sidebar">
 <div className="sidebox panel cf">
 <h4>Filter cards</h4>
 <form>
 <label>Search by name</label>
 <input onChange={this.inputChanged} type="text" placeholder="Card Name" />
 <label>Affinity</label>
 <select name="affinity" onChange={this.filter} defaultValue="All">
 <option value="All">All</option>
 <option value="Affinity.Universal">Universal</option>
 <option value="Affinity.Corruption">Corruption</option>
 <option value="Affinity.Fury">Fury</option>
 <option value="Affinity.Growth">Growth</option>
 <option value="Affinity.Intellect">Intellect</option>
 <option value="Affinity.Order">Order</option>
 </select>
 <label>Type</label>
 <select name="type" onChange={this.filter} defaultValue="All">
 <option value="All">All</option>
 <option value="one">Equipment</option>
 <option value="two">Upgrade</option>
 <option value="zero">Token</option>
 <option value="three">Prime Helix</option>
 </select>
 <label>Rarity</label>
 <select name="type" onChange={this.filter} defaultValue="All">
 <option value="All">All</option>
 <option value="Rarity.Common">Common</option>
 <option value="Rarity.Uncommon">Uncommon</option>
 <option value="Rarity.Rare">Rare</option>
 <option value="Rarity.EpicRare">Epic Rare</option>
 </select>
 { AUTHED ? <label><input name="owned" type="checkbox" onChange={this.filter} /> Show only cards I own</label> : '' }
 <label><input name="hasActive" type="checkbox" onChange={this.filter} /> Has active/passive</label>
 </form>
 </div>
 </div>
 */

var CardsFilter = React.createClass({
    getInitialState: function(){
        return {
            filter_owned : false,
            filter_affinities : [
                { "type" : "Fury" },
                { "type" : "Order" },
                { "type" : "Growth" },
                { "type" : "Intellect" },
                { "type" : "Corruption" }
            ],
            filter_type : 'All',
            search_term : "",
            affinities : [
                { "name" : "Fury" },
                { "name" : "Order" },
                { "name" : "Growth" },
                { "name" : "Intellect" },
                { "name" : "Corruption" }
            ],
            statistics : [
                { "name" : "Energy Damage", "iconName" : "pgg-energy-damage", "checked" : true },
                { "name" : "Physical Damage", "iconName" : "pgg-physical-damage", "checked" : true },
                { "name" : "Energy Pen", "iconName" : "pgg-armor-penetration", "checked" : true },
                { "name" : "Physical Pen", "iconName" : "pgg-physical-penetration", "checked" : true },
                { "name" : "Energy Armor", "iconName" : "pgg-energy-armor", "checked" : true },
                { "name" : "Physical Armor", "iconName" : "pgg-physical-armor-2", "checked" : true },
                { "name" : "Crit Chance", "iconName" : "pgg-critical-strike-chance", "checked" : true },
                { "name" : "Bonus Crit Damage", "iconName" : "pgg-critical-strike-damage", "checked" : true },
                { "name" : "Max Mana", "iconName" : "pgg-max-mana", "checked" : true },
                { "name" : "Max Health", "iconName" : "pgg-max-health", "checked" : true },
                { "name" : "Mana Regen", "iconName" : "pgg-mana-regeneration", "checked" : true },
                { "name" : "Health Regen", "iconName" : "pgg-health-regeneration", "checked" : true },
                { "name" : "Max Movement Speed", "iconName" : "pgg-movement-speed", "checked" : true },
                { "name" : "Cooldown Reduction", "iconName" : "pgg-cooldown-reduction", "checked" : true },
                { "name" : "Lifesteal", "iconName" : "pgg-lifesteal", "checked" : true },
                { "name" : "Attack Speed", "iconName" : "pgg-attack-speed", "checked" : true },
                { "name" : "Harvester Placement Time", "iconName" : "pgg-harvester-placement-time", "checked" : true }
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
        console.log(this.props.cards);
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
                cards.push(<CardPreview affinity={card.affinity}
                                        key={card.code}
                                        owned={card.owned}
                                        code={card.code}
                                        cost={card.cost}
                                        name={card.name}
                />);
            }
        }, _this);
        this.props.onFilterChanged(cards);
    },
    render: function() {
        var _this = this;
        var affinityFilters = this.state.affinities.map(function(affinity, i) {
            return <ToggleFilter key={ "affinity_toggle_" + affinity.name.toLowerCase() }
                                 affinity={affinity}
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
                <DropDown label="STATS"
                          columns={ 2 }
                          title="SELECT STATISTIC TYPES"
                          options={ this.state.statistics }
                          onOptionChanged={this.dropDownChanged}
                />
            </div>
        )
    }
});

module.exports = CardsFilter;

