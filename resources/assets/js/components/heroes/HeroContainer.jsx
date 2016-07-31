var React = require("react");
var ReactDOM = require("react-dom");
var Helpers   = require('../../helpers');
var InteractiveParallax = require("../../lib/InteractiveParallax");
var HeroStats = require("./HeroStats");
var HeroGraph = require("./HeroGraph");
var AbilityFeed = require("./AbilityFeed");
var HeroStatSummary = require("./HeroStatSummary");
var PreloadImage = require('../PreloadImage');

var HeroContainer = React.createClass({
    getInitialState : function() {
        return {
            backgroundParallax : null,
            heroRank : 1,
            hasFallbackImage: false,
            renderParticles: false
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
                horizontalMultiplier : 1
            }) })
        } else {
            this.state.backgroundParallax.mousePositionChanged(e);
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextState.renderParticles !== this.state.renderParticles) return true;
        if(nextState.heroRank !== this.state.heroRank) return true;
        if(nextState.hasFallbackImage !== this.state.hasFallbackImage) return true;

        return false;
    },
    updateHeroRank: function(rank) {
        this.setState({ heroRank : rank });
    },
    renderGraph: function() {
        return;
        return (
            <div id="graph-wrapper">
                <h3 className="section-heading">Game Statistics <span className="subheader">{ HERO.name} stats, last 7 days</span></h3>
                <HeroGraph />
            </div>
        );
    },
    renderTopStatistics: function() {
        return;
        return (
            <div id="top-content-wrapper">
                <HeroStatSummary id="topHero"
                                 key="topHero"
                                 subtitle={"TOP " + HERO.name + " PLAYER"}
                                 title={ {value : "BEECKON", href : "#"} }
                                 href="#"
                                 links={[
                                         { type : "WIN/LOSS", values : { wins : 147, losses : 152 }}
                                     ]}
                />
                <HeroStatSummary id="topDeck"
                                 key="topDeck"
                                 subtitle={"TOP " + HERO.name + " DECK"}
                                 title={ {value : "BEECKON", href : "#"} }
                                 href="#"
                                 links={[
                                         { type : "WIN/LOSS", values : { wins : 147, losses : 152 }}
                                     ]}
                />
                <HeroStatSummary id="topBuild"
                                 key="topBuild"
                                 subtitle={"TOP " + HERO.name + " BUILD"}
                                 title={ {value : "BEECKON", href : "#"} }
                                 href="#"
                                 links={[
                                         { type : "WIN/LOSS", values : { wins : 147, losses : 152 }}
                                     ]}
                />
            </div>
        );
    },
    fallbackImageRendered: function() {
        this.setState({ hasFallbackImage : true });
    },
    heroModelLoaded: function() {
        this.setState({ renderParticles: true });
    },
    render: function() {
        var modelClass = this.state.hasFallbackImage ? ' fallback-portrait' : '';
        var modelURL = Helpers.S3URL() + "images/heroes/" + HERO.code + "/cutout.png";
        if(Helpers.isClientMobile()) {
            modelClass = ' mobile-portrait';
            modelURL = Helpers.S3URL() + "images/heroes" + HERO.code + "/" + HERO.image + "/portrait_medium.png";
        }
        return(
            <div>
                <div onMouseOver={this.updateParallax} className="hero-container">
                    <div className="anim-fadeIn" id="hero-model-wrapper">
                        <div id="hero-model" className={"anim-flicker" + modelClass}>
                            <PreloadImage src={modelURL}
                                          fallbackSrc={Helpers.S3URL() + 'images/heroes/' + HERO.code + '/' + HERO.image + '/portrait_medium.png'}
                                          size="large"
                                          onFallbackImageRendered={this.fallbackImageRendered}
                                          onImageLoaded={this.heroModelLoaded}
                            />
                        </div>
                    </div>
                    <div id="left-wrapper">
                        <div id="hero-stats">
                            <HeroStats onHeroRankChanged={this.updateHeroRank} heroRank={this.state.heroRank} hero={ HERO } />
                        </div>
                    </div>
                    <div id="particle-layer" className={this.state.renderParticles ? 'visible' : ''}></div>
                </div>
                { this.renderGraph() }
                { this.renderTopStatistics() }
                <div id="abilities-wrapper">
                    <AbilityFeed currentRank={this.state.heroRank} abilities={ HERO.abilities } videos={ HERO.videos } />
                </div>
            </div>
        );
    }
});

var element = document.querySelector("#hero-wrapper");
if(element) ReactDOM.render( <HeroContainer />, element);


