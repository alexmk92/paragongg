var React = require('react');
var ReactDOM = require('react-dom');

var DeckBuilderBuilds = require("./DeckBuilderBuilds");

var DeckBuilder = React.createClass({
    getInitialState: function(){
        return {
            deck: [],
            builds: [],
        }
    },
    render: function() {
        return (
            <div>
                <div id="sidebar">
                    <div className="sidebox panel cf">
                        <ul className="deck-list">
                            <div className="deck-list-actions">
                                <a className="btn btn-primary"><i className="fa fa-plus" aria-hidden="true"></i> Add card to deck</a>
                                <span className="deck-total">39/40 Cards</span>
                            </div>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_S_U_02/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">The Archmagus</span>
                                    <span className="cost"></span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_S_U_06/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Health Potion</span>
                                    <span className="cost">1CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_F_02/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Madstone Gem</span>
                                    <span className="cost">2CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_24/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Agoran Scepter</span>
                                    <span className="cost">3CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_F_13/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Brand of the Ironeater</span>
                                    <span className="cost">3CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_F_04/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Meltdown</span>
                                    <span className="cost">3CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_F_06/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Micro-Nuke</span>
                                    <span className="cost">3CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_02/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">3x</span>
                                    <span className="name">Riftmagus Scepter</span>
                                    <span className="cost">3CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_29/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Staff of Adamant</span>
                                    <span className="cost">3CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_18/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Whirling Wand</span>
                                    <span className="cost">3CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_05/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Minor Kinetic</span>
                                    <span className="cost">1CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_04/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">6x</span>
                                    <span className="name">Cast</span>
                                    <span className="cost">2CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_06/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">4x</span>
                                    <span className="name">Kinetic</span>
                                    <span className="cost">2CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_55/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Shock</span>
                                    <span className="cost">2CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_U_47/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">5x</span>
                                    <span className="name">Wound</span>
                                    <span className="cost">2CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_C_I_16/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">2x</span>
                                    <span className="name">Focused Shock</span>
                                    <span className="cost">3CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_U_U_14/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">1x</span>
                                    <span className="name">Greater Drain</span>
                                    <span className="cost">3CP</span>
                                </div>
                            </li>
                            <li style={{backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/Beta_U_U_02/icon.png)'}}>
                                <div className="wrapper">
                                    <span className="count">8x</span>
                                    <span className="name">Major Cast</span>
                                    <span className="cost">3CP</span>
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