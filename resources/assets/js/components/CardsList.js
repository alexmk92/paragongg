var React     = require('react');
var ReactDOM  = require('react-dom');
var FlipMove  = require('react-flip-move');

var CardsList = React.createClass({
    getInitialState: function () {
        return {
            filter_owned: false,
            filter_affinity: 'All',
            filter_type: 'All'
        }
    },
    filter: function (element) {
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
    shouldBeVisible: function (card) {
        if(this.state.filter_owned == true && card.owned == false) {
            return false;
        }
        if(this.state.filter_affinity != 'All' && this.state.filter_affinity != card.affinity) {
            return false;
        }
        if(this.state.filter_type != 'All' && this.state.filter_type != card.type) {
            return false;
        }
        return true;
    },
    render: function () {
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
                <div id="sidebar">
                    <div className="sidebox panel cf">
                        <h4>Filter cards</h4>
                        <form>
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
                        <label><input name="owned" type="checkbox" onChange={this.filter} /> Show only cards I own</label>
                        <label><input name="hasActive" type="checkbox" onChange={this.filter} /> Has active/passive</label>
                        </form>
                    </div>
                </div>
                <div className="wrapper bordered-right">
                    <ul className="card-list">
                        <FlipMove>
                        {cards}
                        </FlipMove>
                    </ul>
                </div>
            </div>
        );
    }
});

var CardPreview = React.createClass({
    render: function() {
        var divStyle = {
            backgroundImage: 'url(assets/images/cards/' + this.props.code + '/background.png)',
        }
        var className = "card-preview ";
            className += (this.props.owned) ? "owned" : "missing";
        return (
            <li className={className} style={divStyle}>
                <div className="card-name">{this.props.name}</div>
            </li>
        )
    }
});

var element = document.getElementById('card-feed');
if(element) ReactDOM.render(<CardsList cards={CARDS}/>, element);