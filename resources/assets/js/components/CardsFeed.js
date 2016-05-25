var React = require('react');
var ReactDOM = require('react-dom');
var FlipMove = require('react-flip-move');
var CardTooltip = require('./CardTooltip');

var CardsFeed = React.createClass({
    getInitialState: function(){
        return {
            filter_owned : false,
            filter_affinity : 'All',
            filter_type : 'All',
            search_term : ""
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
        if(_this.state.filter_owned == true && card.owned == false) {
            return false;
        }
        if(_this.state.filter_affinity != 'All' && _this.state.filter_affinity != card.affinity) {
            return false;
        }
        if(_this.state.filter_type != 'All' && _this.state.filter_type != card.type) {
            return false;
        }
        if(card.name.toLowerCase().indexOf(_this.state.search_term.toLowerCase()) > -1) {
            return true;
        }
        return false;
    },
    inputChanged: function(event) {
        var _this = this;

        event.preventDefault();
        _this.setState({ search_term : event.target.value });
    },
    render: function() {
        var _this = this;

        var cards = [];
        this.props.cards.forEach(function(card) {

            if(_this.shouldBeVisible(card) == true) {
                cards.push(<CardPreview affinity={card.affinity}
                    key={card.code}
                    owned={card.owned}
                    code={card.code}
                    cost={card.cost}
                    name={card.name}
                />);
            }
        }, _this);
        // Sort by cost
        cards.sort(function(a,b) { return a.cost - b.cost; });
        return(
            <div>
                <h2>Paragon Cards</h2>
                <h5>{cards.length} cards found</h5>
                <div id="sidebar">
                    <div className="sidebox panel cf">
                        <h4>Filter cards</h4>
                        <form>
                        <label>Search by name</label>
                        <input onChange={_this.inputChanged} type="text" placeholder="Card Name" />
                        <label>Affinity</label>
                        <select name="affinity" onChange={_this.filter} defaultValue="All">
                            <option value="All">All</option>
                            <option value="Affinity.Universal">Universal</option>
                            <option value="Affinity.Corruption">Corruption</option>
                            <option value="Affinity.Fury">Fury</option>
                            <option value="Affinity.Growth">Growth</option>
                            <option value="Affinity.Intellect">Intellect</option>
                            <option value="Affinity.Order">Order</option>
                        </select>
                        <label>Type</label>
                        <select name="type" onChange={_this.filter} defaultValue="All">
                            <option value="All">All</option>
                            <option value="one">Equipment</option>
                            <option value="two">Upgrade</option>
                            <option value="zero">Token</option>
                            <option value="three">Prime Helix</option>
                        </select>
                        <label>Rarity</label>
                        <select name="type" onChange={_this.filter} defaultValue="All">
                            <option value="All">All</option>
                            <option value="Rarity.Common">Common</option>
                            <option value="Rarity.Uncommon">Uncommon</option>
                            <option value="Rarity.Rare">Rare</option>
                            <option value="Rarity.EpicRare">Epic Rare</option>
                        </select>
                        { AUTHED ? <label><input name="owned" type="checkbox" onChange={_this.filter} /> Show only cards I own</label> : ''}
                        <label><input name="hasActive" type="checkbox" onChange={_this.filter} /> Has active/passive</label>
                        </form>
                    </div>
                </div>
                <div className="wrapper">
                    <ul className="card-list">
                        <FlipMove>
                        {cards}
                        </FlipMove>
                    </ul>
                </div>
            </div>
        )
    }
});

var CardPreview = React.createClass({
    getInitialState: function() {
        return {
            tooltip : null
        }
    },
    focused: function(event) {
        var _this = this;
        if(_this.state.tooltip) {
            _this.state.tooltip.abortClose()
        } else {
            _this.setState({
                tooltip : new CardTooltip({ targetNode : event.target, parentNodeName : "card-preview", uniqueId : _this.props.name, dataURL : "/api/v1/cards/find/"+ _this.props.code })
            });
        }
    },
    blur: function(event) {
        var _this = this;
        if(_this.state.tooltip) {
            _this.state.tooltip.destructor(function(payload) {
                _this.state.tooltip = payload.targetNode
            })
        } else {
            _this.state.tooltip = null;
        }
    },
    render: function() {
        var _this = this;

        var divStyle = {
            backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/' + _this.props.code + '/background_small.png)'
        };
        var className = "card-preview ";
        if(typeof _this.props.owned !== 'undefined') {
            className += (_this.props.owned) ? "owned" : "missing";
        }
        return (
            <li onMouseOver={_this.focused} onMouseLeave={_this.blur} className={className} style={divStyle}>
                <div className="card-name">{_this.props.name}</div>
            </li>
        )
    }
});

var element = document.querySelector('#cards-feed');
if(element) ReactDOM.render(<CardsFeed cards={CARDS}/>, element);
