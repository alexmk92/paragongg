var React = require('react');
var ReactDOM = require('react-dom');
var CardEffects = require('./CardEffects');
var SearchBar = require('../filter/SearchBar');
var ToggleFilter = require('../filter/ToggleFilter');
var DropDown = require('../filter/DropDown');
var CardPreview = require('./CardPreview');
var Tooltip = require('../libraries/tooltip/Toptip');
var Helpers = require('../../helpers');

var CardsFilter = React.createClass({
    getInitialState: function(){
        return {
            filter_owned : false,
            filter_affinities : [],
            filter_type : 'All',
            search_term : "",
            costOrder : "ASC",
            showOwnedCards : true,
            showActiveCards : false,
            showPassiveCards : false,
            showPrimeHelixCards : false,
            showUpgradeCards : false,
            showCommonCards : false,
            showUncommonCards : false,
            showStarterCards : false,
            showRareCards : false,
            showEpicCards : false,
            affinities : [
                { name : "Fury" },
                { name : "Order" },
                { name : "Growth" },
                { name : "Intellect" },
                { name : "Corruption" },
                { name : "Universal" }
            ],
            statistics : [
                { name : "Physical Damage", iconName : "pgg-physical-damage", ref : "ATTACKRATING", checked : false },
                { name : "Energy Pen", iconName : "pgg-energy-damage", ref : "ENERGYPENETRATIONRATING", checked : false },
                { name : "Physical Pen", iconName : "pgg-physical-penetration", ref : "PHYSICALPENETRATIONRATING", checked : false },
                { name : "Energy Armor", iconName : "pgg-energy-armor", ref : "ENERGYRESISTANCERATING", checked : false },
                { name : "Physical Armor", iconName : "pgg-physical-armor", ref : "PHYSICALRESISTANCERATING", checked : false },
                { name : "Crit Chance", iconName : "pgg-critical-strike-chance", ref : "CRITICALDAMAGECHANCE", checked : false },
                { name : "Crit Damage", iconName : "pgg-critical-strike-damage", ref : "CRITICALDAMAGEBONUS", checked : false },
                { name : "Max Mana", iconName : "pgg-max-mana", ref : "MAXENERGY", checked : false },
                { name : "Max Health", iconName : "pgg-max-health", ref : "MAXHEALTH", checked : false },
                { name : "Mana Regen", iconName : "pgg-mana-regeneration", ref : "ENERGYREGENRATE", checked : false },
                { name : "Health Regen", iconName : "pgg-health-regeneration", ref : "HEALTHREGENRATE", checked : false },
                { name : "Cooldown Reduction", iconName : "pgg-cooldown-reduction", ref : "COOLDOWNREDUCTIONPERCENTAGE", checked : false },
                { name : "Lifesteal", iconName : "pgg-lifesteal", ref : "LIFESTEALRATING", checked : false },
                { name : "Attack Speed", iconName : "pgg-attack-speed", ref : "ATTACKSPEEDRATING", checked : false },
                { name : "Harvester Place Time", iconName : "pgg-harvester-placement-time", ref : "WELLRIGPLACEMENTTIMER", checked : false }
            ],
            moreOptions : this.getMoreOptionsForState(),
            types : [
                { "name" : "Prime Helix" },
                { "name" : "Passive" },
                { "name" : "Equipment" },
                { "name" : "Upgrade" }
            ]
        }
    },
    componentWillMount: function() {
        this.tooltip = this.props.tooltip || new Tooltip();
        
        // Get filter affinities from URL:
        this.filterWasReset = false;

        var options = this.getInitialMoreOptions();

        this.setState({
            filter_affinities : this.getInitialFilterAffinities(),
            statistics : this.getInitialFilterStats(),
            moreOptions : options.moreOptions,
            costOrder : options.booleanValues.costOrder,
            showOwnedCards : options.booleanValues.showOwnedCards,
            showActiveCards : options.booleanValues.showActiveCards,
            showPassiveCards : options.booleanValues.showPassiveCards,
            showPrimeHelixCards : options.booleanValues.showPrimeHelixCards,
            showUpgradeCards : options.booleanValues.showUpgradeCards,
            showCommonCards : options.booleanValues.showCommonCards,
            showUncommonCards : options.booleanValues.showUncommonCards,
            showStarterCards : options.booleanValues.showStarterCards,
            showRareCards : options.booleanValues.showRareCards,
            showEpicCards : options.booleanValues.showEpicCards
        })
    },
    getInitialMoreOptions: function() {
        var hash = window.location.hash;
        var newOptions = JSON.parse(JSON.stringify(this.state.moreOptions));
        var returnOptions = [];

        var booleanValues = {
            costOrder : "ASC",
            showOwnedCards : true,
            showActiveCards : false,
            showPassiveCards : false,
            showPrimeHelixCards : false,
            showUpgradeCards : false,
            showCommonCards : false,
            showUncommonCards : false,
            showStarterCards : false,
            showRareCards : false,
            showEpicCards : false
        };

        newOptions.forEach(function (optionGroup) {
            var options = optionGroup.group.map(function(option) {
                if(hash.indexOf(option.type) > -1) {
                    option.checked = false;

                    var components = hash.split('&');
                    if(Helpers.isNullOrUndefined(components))
                        components = hash.split('#');

                    components.some(function (component) {
                        if (component.indexOf(option.type) > -1) {
                            component = component.replace('#', '');
                            component = component.replace(option.type + '=', '');
                            if (component.indexOf(',') > -1) {
                                component = component.split(',');
                                component.some(function (part) {
                                    if (option.filterLabel.toLowerCase() === part.toLowerCase().trim()) {
                                        switch (part.toLowerCase()) {
                                            case 'descending' : booleanValues.costOrder = 'DESC'; break;
                                            case 'ascending' : booleanValues.costOrder = 'ASC'; break;
                                            case 'passive' : booleanValues.showPassiveCards = true; break;
                                            case 'active' : booleanValues.showActiveCards = true; break;
                                            case 'prime' : booleanValues.showPrimeHelixCards = true; break;
                                            case 'owned' : booleanValues.showOwnedCards = true; break;
                                            case 'upgrade' : booleanValues.showUpgradeCards = true; break;
                                            case 'starter' : booleanValues.showStarterCards = true; break;
                                            case 'common' : booleanValues.showCommonCards = true; break;
                                            case 'uncommon' : booleanValues.showUncommonCards = true; break;
                                            case 'rare' : booleanValues.showRareCards = true; break;
                                            case 'epic' : booleanValues.showEpicCards = true; break;
                                            default: break;
                                        }
                                        option.checked = true;
                                        return true;
                                    }
                                    return false;
                                });
                            } else {
                                if (option.filterLabel.toLowerCase() === component.toLowerCase().trim()) {
                                    switch (component.toLowerCase()) {
                                        case 'descending' : booleanValues.costOrder = 'DESC'; break;
                                        case 'ascending' : booleanValues.costOrder = 'ASC'; break;
                                        case 'passive' : booleanValues.showPassiveCards = true; break;
                                        case 'active' : booleanValues.showActiveCards = true; break;
                                        case 'prime' : booleanValues.showPrimeHelixCards = true; break;
                                        case 'owned' : booleanValues.showOwnedCards = true; break;
                                        case 'upgrade' : booleanValues.showUpgradeCards = true; break;
                                        case 'starter' : booleanValues.showStarterCards = true; break;
                                        case 'common' : booleanValues.showCommonCards = true; break;
                                        case 'uncommon' : booleanValues.showUncommonCards = true; break;
                                        case 'rare' : booleanValues.showRareCards = true; break;
                                        case 'epic' : booleanValues.showEpicCards = true; break;
                                        default: break;
                                    }
                                    option.checked = true;
                                }
                            }
                            return true;
                        }
                        return false;
                    });
                }
                return option;
            }.bind(this));
            returnOptions.push({ group : options });
        }.bind(this));

        return { moreOptions : returnOptions, booleanValues : booleanValues };
    },
    getInitialFilterStats: function() {
        var hash = window.location.hash;
        var newStats = JSON.parse(JSON.stringify(this.state.statistics));
        if (hash.toLowerCase().indexOf('statistics') > -1) {
            hash = hash.replace(/#affinities.*&statistics/, '');
            hash = hash.replace('statistics', '');
            var component = hash.replace(/\D+/g, "").toLowerCase();
            newStats = newStats.map(function (statistic, i) {
                if (parseInt(component[i]) === 1) {
                    statistic.checked = true;
                }
                return statistic;
            });
        }
        return newStats;
    },
    getInitialFilterAffinities: function() {
        var hash = window.location.hash;
        var newAffinities = [];
        hash = hash.replace('#', '').substring(0, hash.indexOf('&'));
        if(hash.toLowerCase().indexOf('affinities') > -1) {
            hash = hash.replace('affinities', '');
            var hashComponents = hash.split(',');
            hashComponents.map(function(component) {
                component = component.replace(/\W+/g, "").toLowerCase();
                this.state.affinities.some(function(affinity) {
                    if(affinity.name.toLowerCase() === component) {
                        newAffinities.push({
                            type : affinity.name
                        });
                        return true;
                    }
                    return false;
                });
            }.bind(this));
        }
        return newAffinities;
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.shouldResetFilter === true) {
            this.resetCardFilter();
        }
    },
    getMoreOptionsForState: function() {
        var options = [];

        if(AUTHED) {
            options.push({ group : [
                { name : "Show cards I don't own", type: "owned", iconName : "", filterLabel : "owned", ref: "TOGGLE_OWNED", checked : true}
            ] });
        }
        options.push(
            { group : [
                { name : "Show Active Cards", type: "category",  iconName : "", filterLabel : "active", ref: "TOGGLE_ACTIVE", checked : false},
                { name : "Show Passive Cards", type: "category", iconName : "", filterLabel : "passive", ref: "TOGGLE_PASSIVE", checked : false},
                { name : "Show Upgrade Cards", type: "category", iconName : "", filterLabel : "upgrade", ref: "TOGGLE_UPGRADE", checked : false},
                { name : "Show Prime Helix Cards", type: "category", iconName : "", filterLabel : "prime", ref: "TOGGLE_PRIME", checked : false}
            ]},
            { group : [
                { name : "Cost (Ascending)", type: "cost", iconName : "", filterLabel : "ascending",  ref: "SORT_ASC", checked : false},
                { name : "Cost (Descending)", type: "cost", iconName : "", filterLabel : "descending", ref: "SORT_DESC", checked : false}
            ]},
            { group: [
                { name : "Starter", iconName : "", type : "rarity", filterLabel : "starter", ref: "RARITY_STARTER", checked : false},
                { name : "Common", iconName : "", type : "rarity", filterLabel : "common", ref: "RARITY_COMMON", checked : false},
                { name : "Uncommon", iconName : "", type : "rarity", filterLabel : "uncommon", ref: "RARITY_UNCOMMON", checked : false},
                { name : "Rare", iconName : "", type : "rarity", filterLabel : "rare", ref: "RARITY_RARE", checked : false},
                { name : "Epic", iconName : "", type : "rarity", filterLabel : "epic", ref: "RARITY_EPIC", checked : false}
            ]}
        );

        return options;
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
        var allStatsDisabled = false;
        var allRaritiesDisabled = false;
        var allCategoriesDisabled = false;

        // Check if all stats are disabled
        var expectedCount = this.state.statistics.length;
        var actualCount = 0;
        this.state.statistics.forEach(function(stat){
            if(stat.checked === false) actualCount++;
        });
        allStatsDisabled = (actualCount === expectedCount);

        var expectedRarityCount = 5;
        var expectedCategoryCount = 4;
        var rarityCount = 0;
        var categoryCount = 0;
        this.state.moreOptions.forEach(function(optionGroup) {
           optionGroup.group.forEach(function(option) {
               if(option.type === 'category' && !option.checked) categoryCount++;
               if(option.type === 'rarity' && !option.checked) rarityCount++;
           });
        });
        allRaritiesDisabled = (rarityCount === expectedRarityCount);
        allCategoriesDisabled = (categoryCount === expectedCategoryCount);

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
        if(!allCategoriesDisabled) {
            // CHECK OTHER PARAMETERS
            /*
            switch(card.type.toUpperCase()) {
                case "UPGRADE": matches = this.state.showUpgradeCards; break;
                case "ACTIVE": matches = this.state.showActiveCards; break;
                case "PASSIVE": matches = this.state.showPassiveCards; break;
                case "PRIME": matches = this.state.showPrimeHelixCards; break;
                default: break;
            }
            */
             if(!this.state.showUpgradeCards && card.type.toUpperCase() === "UPGRADE")
             matches = false;
             if(!this.state.showActiveCards && card.type.toUpperCase() === "ACTIVE")
             matches = false;
             if(!this.state.showPassiveCards && card.type.toUpperCase() === "PASSIVE")
             matches = false;
             if(!this.state.showPrimeHelixCards && card.type.toUpperCase() === "PRIME")
             matches = false;
        }
        if(!allRaritiesDisabled) {
            /*
            switch(card.rarity.toUpperCase()) {
                case "STARTER": matches = this.state.showStarterCards; break;
                case "COMMON": matches = this.state.showCommonCards; break;
                case "UNCOMMON": matches = this.state.showUncommonCards; break;
                case "RARE": matches = this.state.showRareCards; break;
                case "EPIC": matches = this.state.showEpicCards; break;
                default: break;
            }
            */
            if(!this.state.showStarterCards && card.rarity.toUpperCase() === "STARTER")
                matches = false;
            if(!this.state.showCommonCards && card.rarity.toUpperCase() === "COMMON")
                matches = false;
            if(!this.state.showUncommonCards && card.rarity.toUpperCase() === "UNCOMMON")
                matches = false;
            if(!this.state.showRareCards && card.rarity.toUpperCase() === "RARE")
                matches = false;
            if(!this.state.showEpicCards && card.rarity.toUpperCase() === "EPIC")
                matches = false;
        }
        if(!this.state.showOwnedCards && AUTHED && card.owned === false)
            matches = false;
        if(matches === true && !allStatsDisabled) {
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
        if(nextProps.affinities !== this.props.affinities) {
            return true;
        }
        if(nextState.filter_affinities.length !== this.state.filter_affinities.length) {
            return true;
        }
        return nextState !== this.state;
    },
    componentDidUpdate: function() {
        if(this.filterWasReset === true) {
            this.filterWasReset = false;
            this.props.onCardFilterReset();
        }

        var newHash = '';
        // Set the new hash options
        this.state.filter_affinities.forEach(function(affinity) {
            if(newHash.indexOf('#affinities') < 0 && newHash.indexOf(affinity.type) < 0) {
                newHash += '#affinities=' + affinity.type;
            } else {
                newHash += ',' + affinity.type;
            }
        });
        // Set the new sort options - we dont want to show statistics in the string if it is 000000000
        var tempHash = newHash;
        this.state.statistics.forEach(function(statistic) {
            var stat = statistic.checked ? 1 : 0;
            if(tempHash.indexOf('#') > -1 && tempHash.indexOf('statistics') < 0) {
                tempHash += '&statistics=' + stat;
            } else if(tempHash.indexOf('#') < 0 && tempHash.indexOf('statistics') < 0) {
                tempHash += '#statistics=' + stat;
            } else {
                tempHash += stat;
            }
        });
        if(tempHash.indexOf('1') > -1) newHash = tempHash;
        // Set the more options
        this.state.moreOptions.forEach(function(groupContainer) {
            if(!Helpers.isNullOrUndefined(groupContainer)) {
                var expectedCount = groupContainer.group.length;
                var checkedCount = 0;
                var tmpHash = newHash;
                groupContainer.group.forEach(function(option) {
                    if(option.checked) {
                        checkedCount++;
                        if(tmpHash.indexOf('#') > -1 && tmpHash.indexOf(option.type) < 0) {
                            tmpHash += '&' + option.type + '=' + option.filterLabel.toLowerCase();
                        } else if(tmpHash.indexOf('#') < 0 && tmpHash.indexOf(option.type) < 0) {
                            tmpHash += '#' + option.type + '=' + option.filterLabel.toLowerCase();
                        } else {
                            tmpHash += ',' + option.filterLabel.toLowerCase();
                        }
                    }
                });
                if(expectedCount !== checkedCount) {
                    newHash = tmpHash;
                }
            }
        }.bind(this));
        if(!Helpers.isNullOrUndefined(this.state.searchTerm) && this.state.searchTerm !== '') {
            if(newHash.indexOf('#') > -1 && newHash.indexOf('searchterm') < 0) {
                newHash += '&searchterm=' + this.state.searchTerm;
            } else if(newHash.indexOf('#') < 0 && tmpHash.indexOf('searchterm') < 0) {
                newHash += '#searchterm=' + this.state.searchTerm;
            }
        }
        window.location.hash = newHash;
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
        var newStarterCardOption = this.state.showStarterCards;
        var newCommonCardOption = this.state.showCommonCards;
        var newUncommonCardOption = this.state.showUncommonCards;
        var newRareCardOption = this.state.showRareCards;
        var newEpicCardOption = this.state.showEpicCards;

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
            case "RARITY_STARTER": newStarterCardOption = !this.state.showStarterCards;break;
            case "RARITY_COMMON": newCommonCardOption = !this.state.showCommonCards;break;
            case "RARITY_UNCOMMON": newUncommonCardOption = !this.state.showUncommonCards;break;
            case "RARITY_RARE": newRareCardOption = !this.state.showRareCards;break;
            case "RARITY_EPIC": newEpicCardOption = !this.state.showEpicCards;break;
            case "SORT_DESC": newCostOrder = "DESC";break;
            case "SORT_ASC": newCostOrder = "ASC";break;
        }

        this.setState({
            moreOptions : newOptions,
            showCommonCards : newCommonCardOption,
            showUncommonCards : newUncommonCardOption,
            showStarterCards : newStarterCardOption,
            showRareCards : newRareCardOption,
            showEpicCards : newEpicCardOption,
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
        if(Helpers.isClientMobile()) return;

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
        if(Helpers.isClientMobile()) return;
        this.tooltip.showTooltip();
    },
    hideTooltip: function() {
        if(Helpers.isClientMobile()) return;
        this.tooltip.hideTooltip();
    },
    resetCardFilter: function() {
        this.filterWasReset = true;
        this.setState(this.getInitialState());
    },
    render: function() {
        var affinityFilters = [];
        if(this.props.affinities) {
            affinityFilters = this.props.affinities.map(function(affinity, i) {
                var active = false;
                this.state.filter_affinities.map(function(filterAffinity) {
                    if(filterAffinity.type.toLowerCase() === affinity.name.toLowerCase()) {
                        active = true;
                    }
                });
                return <ToggleFilter key={ "affinity_toggle_" + affinity.name.toLowerCase() }
                                     active={active}
                                     targetObject={affinity}
                                     className={ ("pgg pgg-affinity-" + affinity.name.toLowerCase() + " affinity-color ") }
                                     label={ i === 0 ? "AFFINITIES" : "" }
                                     onToggleFilterChanged={this.affinityFilterChanged}
                />
            }.bind(this));
        } else {
            affinityFilters = this.state.affinities.map(function(affinity, i) {
                var active = false;
                this.state.filter_affinities.map(function(filterAffinity) {
                    if(filterAffinity.type.toLowerCase() === affinity.name.toLowerCase()) {
                        active = true;
                    }
                });
                return <ToggleFilter key={ "affinity_toggle_" + affinity.name.toLowerCase() }
                                     className={ ("pgg pgg-affinity-" + affinity.name.toLowerCase() + " affinity-color ") }
                                     active={active}
                                     targetObject={affinity}
                                     label={ i === 0 ? "AFFINITIES" : "" }
                                     onToggleFilterChanged={this.affinityFilterChanged}
                />
            }.bind(this));
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
                <DropDown label="Reset"
                          columns={0}
                          title="RESET FILTER"
                          buttonIcon="fa fa-refresh"
                          options={null}
                          behavesAsButton={true}
                          onButtonClicked={this.resetCardFilter}
                />
            </div>
        )
    }
});

module.exports = CardsFilter;

