var React = require("react");
var ReactDOM = require("react-dom");
var CardStats = require("./CardStats");
var InteractiveParallax = require("../../lib/InteractiveParallax");

var CardContainer = React.createClass({
    getInitialState: function() {
        return {
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
        var rarity = (function() {
            var rarityProps = null;
            switch(CARD.rarity.toUpperCase()) {
                case "EPIC": rarityProps = { color : "#b547d9", label : "Epic Rare" }; break; // EPIC RARE
                case "RARE": rarityProps = { color : "#477ed9", label : "Rare" }; break; // 477ed9 RARE
                case "COMMON" : rarityProps = { color : "#d4d4d4", label : "Common" }; break; // 953ab4 COMMON
                case "UNCOMMON" : rarityProps = { color : "#47d95f", label : "Uncommon" }; break; // d4d4d4 UNCOMMON
                case "STARTER" : rarityProps = { color : "#aaa", label : "Starter" }; break; // STARTER
                default : rarityProps = {};break;
            }
            return rarityProps;
        })();
        var modelStyles = {
            boxShadow : rarity.label === "Starter" ? "" : "0px 0px 270px " + rarity.color,
            opacity : 1.00
        };
        return (
            <div onMouseMove={this.flipCard}>
                <div className="card-container">
                    <div id="particle-layer"></div>
                    <div className="card-stats-wrapper">
                        <div className="card-stats">
                            <CardStats rarity={ rarity } card={ CARD } />
                        </div>
                        <div id="blur-layer"></div>
                    </div>
                    <div className="anim-fadeIn" id="card-model-wrapper">
                        <div id="card-model" className="anim-flicker">
                            <div id="card-model-container">
                                <img src={CARD.images.large} />
                                <span>{ CARD.name }</span>
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
