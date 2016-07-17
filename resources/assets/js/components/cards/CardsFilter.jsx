var React = require('react');
var ReactDOM = require('react-dom')
var CardEffects = require('./CardEffects');
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
            costOrder : "ASC",
            showOwnedCards : true,
            showActiveCards : true,
            showPassiveCards : true,
            showPrimeHelixCards : true,
            showUpgradeCards : true,
            affinities : [
                { name : "Fury" },
                { name : "Order" },
                { name : "Growth" },
                { name : "Intellect" },
                { name : "Corruption" },
                { name : "Universal" }
            ],
            statistics : [
                { name : "Physical Damage", iconName : "pgg-physical-damage", ref : "ATTACKRATING", checked : true },
                { name : "Energy Pen", iconName : "pgg-energy-damage", ref : "ENERGYPENETRATIONRATING", checked : true },
                { name : "Physical Pen", iconName : "pgg-physical-penetration", ref : "PHYSICALPENETRATIONRATING", checked : true },
                { name : "Energy Armor", iconName : "pgg-energy-armor", ref : "ENERGYRESISTANCERATING", checked : true },
                { name : "Physical Armor", iconName : "pgg-physical-armor", ref : "PHYSICALRESISTANCERATING", checked : true },
                { name : "Crit Chance", iconName : "pgg-critical-strike-chance", ref : "CRITICALDAMAGECHANCE", checked : true },
                { name : "Crit Damage", iconName : "pgg-critical-strike-damage", ref : "CRITICALDAMAGEBONUS", checked : true },
                { name : "Max Mana", iconName : "pgg-max-mana", ref : "MAXENERGY", checked : true },
                { name : "Max Health", iconName : "pgg-max-health", ref : "MAXHEALTH", checked : true },
                { name : "Mana Regen", iconName : "pgg-mana-regeneration", ref : "ENERGYREGENRATE", checked : true },
                { name : "Health Regen", iconName : "pgg-health-regeneration", ref : "HEALTHREGENRATE", checked : true },
                { name : "Cooldown Reduction", iconName : "pgg-cooldown-reduction", ref : "COOLDOWNREDUCTIONPERCENTAGE", checked : true },
                { name : "Lifesteal", iconName : "pgg-lifesteal", ref : "LIFESTEALRATING", checked : true },
                { name : "Attack Speed", iconName : "pgg-attack-speed", ref : "ATTACKSPEEDRATING", checked : true },
                { name : "Harvester Place Time", iconName : "pgg-harvester-placement-time", ref : "WELLRIGPLACEMENTTIMER", checked : true }
            ],
            moreOptions : [],
            types : [
                { "name" : "Prime Helix" },
                { "name" : "Passive" },
                { "name" : "Equipment" },
                { "name" : "Upgrade" }
            ]
        }
    },
    componentWillMount: function() {
        var options = [];

        if(AUTHED) {
            options.push({ group : [
                { name : "Show cards I don't own", iconName : "", ref: "TOGGLE_OWNED", checked : true}
            ] });
        }
        options.push({ group : [
                { name : "Show Active Cards", iconName : "", ref: "TOGGLE_ACTIVE", checked : true},
                { name : "Show Passive Cards", iconName : "", ref: "TOGGLE_PASSIVE", checked : true},
                { name : "Show Upgrade Cards", iconName : "", ref: "TOGGLE_UPGRADE", checked : true},
                { name : "Show Prime Helix Cards", iconName : "", ref: "TOGGLE_PRIME", checked : true}
            ]},
            { group : [
                { name : "Cost (Ascending)", iconName : "", ref: "SORT_ASC", checked : true},
                { name : "Cost (Descending)", iconName : "", ref: "SORT_DESC", checked : false}
            ]});

        this.setState({ moreOptions : options });
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
        // CHECK OTHER PARAMETERS
        if(!this.state.showUpgradeCards && card.type.toUpperCase() === "UPGRADE")
            matches = false;
        if(!this.state.showActiveCards && card.type.toUpperCase() === "ACTIVE")
            matches = false;
        if(!this.state.showPassiveCards && card.type.toUpperCase() === "PASSIVE")
            matches = false;
        if(!this.state.showPrimeHelixCards && card.type.toUpperCase() === "PRIME")
            matches = false;
        if(!this.state.showOwnedCards && AUTHED && card.owned === false)
            matches = false;
        if(matches !== false) {
            if(card.effects) {
                card.effects.forEach(function(effect) {
                    if(effect.stat) {
                        this.state.statistics.some(function(stat) {
                            if(stat.ref === effect.stat.toUpperCase()) {
                                matches = stat.checked;
                                return true;
                            }
                            return false;
                        }.bind(this));
                    }
                }.bind(this));
            }
            if(card.maxedEffects && matches === false) {
                card.maxedEffects.forEach(function (effect) {
                    if (effect.stat) {
                        this.state.statistics.some(function (stat) {
                            if (stat.ref === effect.stat.toUpperCase()) {
                                matches = stat.checked;
                                return true;
                            }
                            return false;
                        }.bind(this));
                    }
                }.bind(this));
            }
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
    moreOptionsChanged: function(newOption) {
        var newHelixOption = this.state.showPrimeHelixCards;
        var newPassiveOption = this.state.showPassiveCards;
        var newActiveOption = this.state.showActiveCards;
        var newUpgradeOption = this.state.showUpgradeCards;
        var newOwnedOption = this.state.showOwnedCards;
        var newCostOrder = this.state.costOrder;

        var newOptions = this.state.moreOptions.map(function(option) {
            if(newOption.ref === "SORT_ASC") {
                if(option.group) {
                    option.group = option.group.map(function(groupOption) {
                       if(groupOption.ref === "SORT_DESC")  {
                           groupOption.checked = false;
                       }
                       return groupOption
                    }.bind(this));
                } else if(option.ref === "SORT_DESC") {
                    option.checked = false;
                }
            } else if(newOption.ref === "SORT_DESC") {
                if(option.group) {
                    option.group = option.group.map(function(groupOption) {
                        if(groupOption.ref === "SORT_ASC")  {
                            groupOption.checked = false;
                        }
                        return groupOption
                    }.bind(this));
                } else if(option.ref === "SORT_ASC") {
                    option.checked = false;
                }
            }

           if(newOption === option) {
               return newOption;
           }
           return option;
        }.bind(this));

        switch(newOption.ref.toUpperCase()) {
            case "TOGGLE_ACTIVE": newActiveOption = !this.state.showActiveCards;break;
            case "TOGGLE_PASSIVE": newPassiveOption = !this.state.showPassiveCards;break;
            case "TOGGLE_UPGRADE": newUpgradeOption = !this.state.showUpgradeCards;break;
            case "TOGGLE_PRIME": newHelixOption = !this.state.showPrimeHelixCards;break;
            case "TOGGLE_OWNED": newOwnedOption = !this.state.showOwnedCards;break;
            case "SORT_DESC": newCostOrder = "DESC";break;
            case "SORT_ASC": newCostOrder = "ASC";break;
        }

        this.setState({
            moreOptions : newOptions,
            showPrimeHelixCards : newHelixOption,
            showPassiveCards : newPassiveOption,
            showActiveCards : newActiveOption,
            showUpgradeCards : newUpgradeOption,
            showOwnedCards : newOwnedOption,
            costOrder : newCostOrder
        });
    },
    sortCardsByCost: function() {
        return this.props.cards.sort(function(cardA, cardB) {
            if(this.state.costOrder === "ASC")
                return parseFloat(cardA.cost) - parseFloat(cardB.cost);
            else
                return parseFloat(cardB.cost) - parseFloat(cardA.cost);
        }.bind(this));
    },
    updateCards: function() {
        var sortedCards = this.sortCardsByCost();
        var cards = [];
        sortedCards.forEach(function(card) {
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
        this.props.onFilterChanged(cards, this.state.costOrder);
    },
    setTooltipContent: function(card) {
        var content = (
            <div className="pgg-tooltip pgg-tooltip-card">
                <div className="card-head">
                    <span className="cost">{card.cost}</span>
                    <div className="header">
                        <span className="name">{card.name}</span>
                        <span className={"rarity rarity-" + card.rarity.toLowerCase()}>{card.rarity}</span>
                        <span className="type">{card.type}</span>
                    </div>
                    <i className={"affinity affinity-color pgg pgg-affinity-" + card.affinity.toLowerCase()}></i>
                </div>
                <div className="content">
                    <CardEffects card={card} />
                </div>
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
                <SearchBar label={ "Displaying " + this.props.visibleCardCount + " of " + this.props.totalCardCount + " cards" + " (" + this.props.ownedCardCount + " owned )" }
                           placeholder="Enter card name..."
                           onSearchTermChanged={this.inputChanged}
                />
                { affinityFilters }
                <DropDown label="Stats"
                          columns={ 2 }
                          title="FILTER BY STATS"
                          buttonIcon="pgg pgg-armor-penetration"
                          options={ this.state.statistics }
                          onOptionChanged={this.dropDownChanged}
                />
                <DropDown label="Sort"
                          columns={ 2 }
                          title="SORT RESULTS"
                          buttonIcon="fa fa-sort"
                          options={ this.state.moreOptions }
                          onOptionChanged={this.moreOptionsChanged}
                />
            </div>
        )
    }
});

module.exports = CardsFilter;

