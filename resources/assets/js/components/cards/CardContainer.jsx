var React = require("react");
var ReactDOM = require("react-dom");
var CardStats = require("./CardStats");

var CardContainer = React.createClass({
    getInitialState: function() {
        return {
            card : CARD || null
        }
    },
    render: function() {
        var card = this.state.card;
        var cardModelURL = "https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/" + card.code + "/background.png";
        var rarity = (function() {
            var rarity = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            var rarityDetails = "";
            switch(rarity) {
                case 1: rarityDetails = { color : "#b547d9", label : "Epic Rare" }; break; // EPIC RARE
                case 2: rarityDetails = { color : "#477ed9", label : "Rare" }; break; // 477ed9 RARE
                case 3: rarityDetails = { color : "#47d95f", label : "Common" }; break; // 953ab4 COMMON
                case 4: rarityDetails = { color : "#d4d4d4", label : "Uncommon" }; break; // d4d4d4 UNCOMMON
                default : rarityDetails = {};break;
            }
            return rarityDetails;
        })();
        var modelStyles = {
            boxShadow : "0px 0px 500px " + rarity.color,
            opacity : 0.65
        };
        return (
            <div>
                <div className="card-container">
                    <div id="particle-layer"></div>
                    <div id="left-wrapper">
                        <div id="card-stats">
                            <CardStats rarity={ rarity } card={ card } />
                        </div>
                        <div id="blur-layer"></div>
                    </div>
                    <div className="anim-fadeIn" id="card-model-wrapper">
                        <div id="card-model" className="anim-flicker">
                            <div id="card-model-container">
                                <img src={cardModelURL} />
                            </div>
                            <div id="card-glow-layer" style={modelStyles}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CardContainer;

var elem = document.querySelector("#card-detail-container");
if(typeof elem !== "undefined" && elem) {
    console.log("FOUND ELEM");
    ReactDOM.render( <CardContainer />, elem);
}