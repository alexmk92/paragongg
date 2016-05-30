var React = require('react');
var ReactDOM = require('react-dom');

var DeckBuilderBuilds = require("./DeckBuilderBuilds");
var CardModal         = require("../cards/CardModal");

var DeckBuilder = React.createClass({
    getInitialState: function(){
        return {
            deck: [],
            builds: [],
            modal: false
        }
    },
    addCard: function(e) {
        console.log("adding card");
        console.log(e.currentTarget);
    },
    toggleModal: function() {
        var modal = this.state.modal ? false : true;
        this.setState({modal: modal});
    },
    render: function() {
        var cardList = [];
        this.state.deck.forEach(function(card) {
            console.log(card);
        });
        return (
            <div>
                <CardModal visible={this.state.modal} toggleModal={this.toggleModal} addCard={this.addCard} cards={CARDS}/>
                <div id="sidebar">
                    <div className="sidebox panel cf">
                        <ul className="deck-list">
                            <div className="deck-list-actions">
                                <a className="btn btn-primary" onClick={this.toggleModal}><i className="fa fa-plus" aria-hidden="true"></i> Add card to deck</a>
                                <span className="deck-total">39/40 Cards</span>
                            </div>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_S_U_02/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">The Archmagus</span>
                                    <span className="cost"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="content-wrapper">
                        <span className="breadcrumb">Build a deck</span>
                        <input className="h2" defaultValue="My new deck" />
                        <div className="p" contentEditable="true">Write a short description about your deck. What team compositions might you use this deck against? Under what situations would you use the different builds? Click here to edit the description text.</div>
                        <DeckBuilderBuilds/>
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