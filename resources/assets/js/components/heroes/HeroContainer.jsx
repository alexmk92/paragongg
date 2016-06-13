var React = require("react");
var ReactDOM = require("react-dom");
var InteractiveParallax = require("../../lib/InteractiveParallax");
var HeroStats = require("./HeroStats");
var HeroGraph = require("./HeroGraph");
var AbilityFeed = require("./AbilityFeed");

var HeroContainer = React.createClass({
    getInitialState : function() {
        return {
            backgroundParallax : null
        }
    },
    updateParallax : function(e) {
        e.preventDefault();
        if(this.state.backgroundParallax === null) {
            this.setState({ backgroundParallax : new InteractiveParallax({
                type : "background-image",
                target : "#hero-background",
                strength : 5,
                scale : 1,
                repeat : true,
                cover : true,
                disableY : true,
                animationSpeed : 350,
                verticalMultiplier : 0,
                horizontalMultiplier : 1,
                backgroundURL : "/assets/hero/" + HERO.name.toLowerCase() + "/terrain.jpg"
            }) })
        } else {
            this.state.backgroundParallax.mousePositionChanged(e);
        }
    },
    render: function() {
        var modelURL = "/assets/hero/" + HERO.code + "/portrait.png";
        return(
            <div>
                <div onMouseOver={this.updateParallax} className="hero-container">
                    <div id="left-wrapper">
                        <div id="hero-stats">
                            <HeroStats hero={ HERO } />
                        </div>
                    </div>
                    <div id="particle-layer"></div>
                    <div className="anim-fadeIn" id="hero-model-wrapper">
                        <div id="hero-model" className="anim-flicker">
                            <img src={modelURL} />
                        </div>
                    </div>
                </div>
                <div id="graph-wrapper">
                    <HeroGraph />
                </div>
                <div id="abilities-wrapper">
                    <AbilityFeed abilities={ HERO.abilities } />
                </div>
            </div>
        );
    }
});

var element = document.querySelector("#hero-wrapper");
if(element) ReactDOM.render( <HeroContainer />, element);


