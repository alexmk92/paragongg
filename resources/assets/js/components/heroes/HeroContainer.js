var React = require("react");
var ReactDOM = require("react-dom");
var InteractiveParallax = require("../../lib/InteractiveParallax");
var HeroSpinner = require("./HeroSpinner");
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
                strength : 2,
                scale : 1,
                repeat : true,
                cover : true,
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
        var styles = {
            "backgroundImage" : "url('/assets/hero/" + HERO.name.toLowerCase() + "/terrain.jpg')",
            "backgroundRepeat" : "no-repeat",
            "backgroundSize" : "contain"
        };
        var modelURL = "/assets/hero/" + HERO.name + "/portrait.png";
        return(
            <div>
                <div onMouseOver={this.updateParallax} className="hero-container">
                    <div id="hero-background" style={styles}></div>
                    <div id="heroes-spinner">
                        <HeroSpinner heroes={ HEROES } activeHero={ HERO } heroDisplayCount={ 5 }/>
                    </div>
                    <div id="left-wrapper">
                        <div id="hero-stats">
                            <HeroStats hero={ HERO } />
                        </div>
                        <div id="blur-layer"></div>
                    </div>
                    <div id="particle-layer"></div>
                    <div className="anim-fadeIn" id="hero-model-wrapper">
                        <div id="hero-model" className="anim-flicker">
                            <img src={modelURL} />
                            <div id="blur"></div>
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

var elem = document.querySelector("#hero-wrapper");
if(typeof elem !== "undefined" && elem) {
    ReactDOM.render( <HeroContainer />, elem);
}


