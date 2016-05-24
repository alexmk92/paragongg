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
        if(this.state.filter_owned == true && card.owned == false) {
            return false;
        }
        if(this.state.filter_affinity != 'All' && this.state.filter_affinity != card.affinity) {
            return false;
        }
        if(this.state.filter_type != 'All' && this.state.filter_type != card.type) {
            return false;
        }
        if(card.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) > -1) {
            return true;
        }
        return false;
    },
    inputChanged: function(event) {
        event.preventDefault();
        this.setState({ search_term : event.target.value });
    },
    render: function() {
        var cards = [];
        this.props.cards.forEach(function(card) {

            if(this.shouldBeVisible(card) == true) {
                cards.push(<CardPreview affinity={card.affinity}
                    key={card.code}
                    owned={card.owned}
                    code={card.code}
                    cost={card.cost}
                    name={card.name}
                />);
            }
        }, this);
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
                        { AUTHED ? <label><input name="owned" type="checkbox" onChange={this.filter} /> Show only cards I own</label> : ''}
                        <label><input name="hasActive" type="checkbox" onChange={this.filter} /> Has active/passive</label>
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
        if(this.state.tooltip) {
            this.state.tooltip.abortClose()
        } else {
            this.setState({
                tooltip : new CardTooltip({ targetNode : event.target, parentNodeName : "card-preview", uniqueId : this.props.name, dataURL : `/api/v1/cards/find/${this.props.code}` })
            })
        }
    },
    blur: function(event) {
        this.state.tooltip.destructor((payload) => {
            this.state.tooltip = payload.targetNode
        })
    },
    render: function() {
        var divStyle = {
            backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/' + this.props.code + '/background_small.png)',
        }
        var className = "card-preview ";
        if(typeof this.props.owned !== 'undefined') {
            className += (this.props.owned) ? "owned" : "missing";
        }
        return (
            <li onMouseOver={this.focused} onMouseLeave={this.blur} className={className} style={divStyle}>
                <div className="card-name">{this.props.name}</div>
            </li>
        )
    }
});

var element = document.querySelector('#cards-feed');
if(element) ReactDOM.render(<CardsFeed cards={CARDS}/>, element);
