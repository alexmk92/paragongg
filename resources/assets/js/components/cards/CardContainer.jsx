var React = require("react");
var ReactDOM = require("react-dom");
var CardStats = require("./CardStats");
var InteractiveParallax = require("../../lib/InteractiveParallax");

var CardContainer = React.createClass({
    getInitialState: function() {
        return {
            card : CARD || null,
            parallax : null
        }
    },
    flipCard: function(event) {
        if(typeof this.state.parallax === "undefined" || this.state.parallax === null) {
            this.state.parallax = new InteractiveParallax({
                target : "#card-model-wrapper",
                strength: 4,
                animationSpeed : 150
            });
        } else {
            this.state.parallax.mousePositionChanged(event);
        }
    },
    render: function() {
        console.log(CARD);
        var card = this.state.card;
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
            boxShadow : "0px 0px 270px " + rarity.color,
            opacity : 1.00
        };
        return (
            <div onMouseMove={this.flipCard}>
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
                                <img src={card.images.large} />
                                <span>{ card.name }</span>
                                <div id="card-glow-layer" style={modelStyles}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CardContainer;

var element = document.querySelector("#card-detail-container");
if(element) ReactDOM.render( <CardContainer />, element);
