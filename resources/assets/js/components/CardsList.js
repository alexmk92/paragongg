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
        if(this.state.filter_affinity == 'All' || this.state.filter_affinity == card.affinity) {
            return true;
        } else {
            return false;
        }
    },
    render: function () {
        var cards = [];
        this.props.cards.forEach(function(card) {
            if(this.shouldBeVisible(card) == true) {
                cards.push(<CardPreview affinity={card.affinity}
                    key={card.code}
                    code={card.code}
                    name={card.name}
                />);
            }
        }, this);
        return(
            <div>
                <div id="sidebar">
                    <div className="sidebox panel cf">
                        <h4>Filter cards</h4>
                        <form>
                        <label><input name="owned" type="checkbox" onChange={this.filter} /> Owned</label>
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
        return (
            <li className='card-preview' style={divStyle}>
                <div className="card-name">{this.props.name}</div>
            </li>
        )
    }
});

var element = document.getElementById('card-feed');
if(element) ReactDOM.render(<CardsList cards={CARDS}/>, element);