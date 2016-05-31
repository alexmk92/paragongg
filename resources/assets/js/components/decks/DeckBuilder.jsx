var React = require('react');
var ReactDOM = require('react-dom');

var DeckBuilderBuilds = require("./DeckBuilderBuilds");
var CardModal         = require("../cards/CardModal");

var DeckBuilder = React.createClass({
    getInitialState: function(){
        return {
            deck: [],
            builds: [],
            modal: false,
            cardSelected: false
        }
    },
    addCard: function(card) {
        this.setState({
            deck: this.state.deck.concat(card)
        });
        this.toggleModal();
    },
    deckCount: function() {
        return this.state.deck.length;
    },
    toggleModal: function() {
        var modal = this.state.modal ? false : true;
        this.setState({modal: modal});
    },
    selectCard: function(card) {
        if(this.state.cardSelected && this.state.cardSelected.code == card.code) {
            this.setState({cardSelected: false});
        } else {
            this.setState({cardSelected: card});
        }
    },
    render: function() {
        var cardList = [];
        var _this = this;
        this.state.deck.forEach(function(card) {
            var className = "";
            if(_this.state.cardSelected.code == card.code) {
                className += " selected";
            }
            var card = (
                <li className={className} key={card.code} style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/'+card.code+'/icon.png)'}} onClick={_this.selectCard.bind(_this, card)}>
                    <div className="wrapper">
                        <span className="count">1x</span>
                        <span className="name">{card.name}</span>
                        <span className="cost">{card.cost} CP</span>
                    </div>
                </li>
            );
            cardList.push(card);
        });
        return (
            <div>
                <CardModal visible={this.state.modal} toggleModal={this.toggleModal} addCard={this.addCard} cards={CARDS}/>
                <div id="sidebar">
                    <div className="sidebox panel cf">
                        <h4>Current Deck</h4>
                        <ul className="deck-list">
                            <div className="deck-list-actions">
                                <a className="btn btn-primary" onClick={this.toggleModal}><i className="fa fa-plus" aria-hidden="true"></i> Add card to deck</a>
                                <span className="deck-total">{this.deckCount()}/40 Cards</span>
                            </div>
                            {cardList}
                        </ul>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="content-wrapper">
                        <span className="breadcrumb">Build a deck</span>
                        <input className="h2" defaultValue="My new deck" />
                        <div className="p">Write a short description about your deck. What team compositions might you use this deck against? Under what situations would you use the different builds? Click here to edit the description text.</div>
                        <DeckBuilderBuilds builds={this.state.builds} cardSelected={this.state.cardSelected}/>
                        <form>
                            <label><input type="checkbox" defaultChecked /> Make this deck public</label>
                            <button name="publish" type="submit" className="btn"><i className="fa fa-check" aria-hidden="true"></i> Save this deck</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});

var element = document.querySelector('#deck-builder');
if(element) ReactDOM.render(<DeckBuilder />, element);