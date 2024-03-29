var React = require("react");
var ReactDOM = require("react-dom");
var Helpers  = require('../../helpers');
var CardStats = require("./CardStats");
var PreloadImage = require('../PreloadImage');
var InteractiveParallax = require("../../lib/InteractiveParallax");

var CardContainer = React.createClass({
    getInitialState: function() {
        return {
            parallax : null,
            renderGlow: false
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
    cardModelLoaded: function() {
        this.setState({ renderGlow: true })
    },
    render: function() {
        var rarity = (function() {
            var rarityProps = null;
            switch(CARD.rarity.toUpperCase()) {
                case "EPIC": rarityProps = { color : "181,71,217", label : "Epic Rare" }; break; // EPIC RARE
                case "RARE": rarityProps = { color : "71,126,217", label : "Rare" }; break; // 477ed9 RARE
                case "COMMON" : rarityProps = { color : "212,212,212", label : "Common" }; break; // 953ab4 COMMON
                case "UNCOMMON" : rarityProps = { color : "71,217,95", label : "Uncommon" }; break; // d4d4d4 UNCOMMON
                case "STARTER" : rarityProps = { color : "170,170,170", label : "Starter" }; break; // STARTER
                default : rarityProps = {};break;
            }
            return rarityProps;
        })();
        var modelStyles = {
            boxShadow : rarity.label === "Starter" ? "" : "rgba("+ rarity.color +", 0.5) 0px 0px 150px 30px"
        };
        //noinspection ES6ModulesDependencies
        return (
            <div onMouseMove={this.flipCard}>
                <div className="card-container">
                    <div className="card-stats-wrapper">
                        <div className="card-stats">
                            <CardStats rarity={ rarity } card={ CARD } />
                        </div>
                    </div>
                    <div className="anim-fadeIn" id="card-model-wrapper">
                        <div id="card-model" className="anim-flicker">
                            <div id="card-model-container">
                                <PreloadImage src={Helpers.S3URL() + 'images/cards/' + CARD.code + '/' + CARD.background + '/background_large.png'}
                                              placeholderSrc="/assets/images/card-placeholder.png"
                                              fallbackSrc="/assets/images/card-placeholder.png"
                                              onImageLoaded={this.cardModelLoaded}
                                              size="large"
                                />
                                <span>{ CARD.name }</span>
                                <div id="card-glow-layer" style={modelStyles} className={this.state.renderGlow ? 'visible' : ''}></div>
                            </div>
                        </div>
                    </div>
                    <div id="particle-layer" className={this.state.renderGlow ? 'visible' : ''}></div>
                </div>
            </div>
        );
    }
});

module.exports = CardContainer;

var element = document.querySelector("#card-detail-container");
if(element) ReactDOM.render( <CardContainer />, element);
