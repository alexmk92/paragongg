var React     = require('react');
var ReactDOM  = require('react-dom');
var Helpers   = require('../../helpers');
var FlipMove  = require('react-flip-move');
var Tabbable  = require('../libraries/tabs/Tabbable');

var Tabs      = Tabbable.Tabs;
var TabPanel  = Tabbable.TabPanel;

var GuidesFeed = React.createClass({
    getInitialState: function() {
        return {
            guides : this.props.guides,
            heroes : this.props.heroes
        }
    },
    render: function() {
        return(
            <div>
                <GuideHeroFilter heroes={this.state.heroes} />
                <GuideResults guides={this.state.guides} heroes={this.state.heroes} />
            </div>
        )
    }
});

var HeroListItem = React.createClass({
    render: function() {
        return (
            <li>
                <a href={"/guides?hero=" +this.props.hero.slug }>
                    <img src={ Helpers.S3URL() + "images/heroes/" + this.props.hero.code + "/" + this.props.hero.image + "/portrait_small.png" } />
                    <span>{this.props.hero.name}</span>
                </a>
            </li>
        );
    }
});

var GuideHeroFilter = React.createClass({
    getInitialState: function() {
        return {
            search_term : ""
        }
    },
    inputChanged: function(event) {
        event.preventDefault();
        this.setState({ search_term : event.target.value })
    },
    render: function() {
        var heroes = [];
        var _this = this;
        this.props.heroes.forEach(function(hero) {
            console.log(hero);
            if(hero.name.toLowerCase().indexOf(_this.state.search_term.toLowerCase()) > -1) {
                heroes.push(
                    <HeroListItem
                        key={hero.name}
                        hero={hero}
                    />
                );
            }
        });
        return (
            <div id="heroes-filter">
                <div className="header">
                    <span className="heading">Hero guides</span>
                    <input onChange={this.inputChanged} className="hero-search" type="text" placeholder="Start typing a hero name to search..." autoFocus="true"/>
                </div>
                <ul className="heroes">
                    <FlipMove>
                        { heroes }
                    </FlipMove>
                </ul>
            </div>
        )
    }
});

var GuideResults = React.createClass({
    getInitialState: function() {
        return {
            heroes : this.props.heroes,
            guides : this.props.guides
        }
    },
    getHero: function(code) {
        var foundHero = {};
        this.props.heroes.some(function(hero) {
            if(hero.code == code) {
                foundHero = hero;
                return true;
            }
            return false;
        });
        return foundHero;
    },
    render: function() {
        var guides = [];
        this.state.guides.forEach(function(guide) {
            var hero = this.getHero(guide.hero_code);
            console.log(hero);
            guides.push(<GuidePreview key={guide.id}
                                      id={guide.id}
                                      slug={guide.slug}
                                      title={guide.title}
                                      created={guide.created_at}
                                      updated={guide.updated_at}
                                      user_id={guide.user_id}
                                      username={guide.username}
                                      hero={hero}
                                      views={guide.views}
                                      votes={guide.votes}
            />);
        }, this);
        return (
            <Tabs defaultSelected={0} expandable={false} className="padless">

                {/* Featured */}
                <TabPanel title="Featured">
                    {guides}
                </TabPanel>
                {/* Recently updated */}
                <TabPanel title="Recently updated">
                    {guides}
                </TabPanel>
                {/* Top rated */}
                <TabPanel title="Top rated">
                    {guides}
                </TabPanel>
                {/* Most views */}
                <TabPanel title="Most views">
                    {guides}
                </TabPanel>
                {/* Newest */}
                <TabPanel title="Newest">
                    {guides}
                </TabPanel>
            </Tabs>
        );
    }
});

var GuidePreview = React.createClass({
    getPortrait: function() {
        if(this.props.hero) {
            return <img src={"https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/" + this.props.hero.code + "/" + this.props.hero.image + "/portrait_small.png"}/>
        } else {
            return <img src="/assets/images/heroes/null.png"/>
        }
    },
    gameplayOrHero: function() {
        if(this.props.hero) {
            return this.props.hero.name;
        } else {
            return "Gameplay";
        }
    },
    render: function() {
        return(
            <a className="guide-preview cf" href={"/guides/" + this.props.id + "/" + this.props.slug}>
                <div className="guide-hero">
                    {this.getPortrait()}
                </div>
                <div className="guide-details">
                    <div className="title"><h3>{ this.props.title }</h3></div>
                    <div className="details"><span className="emphasis">{this.gameplayOrHero()}</span> guide by <span className="emphasis">{ this.props.username }</span> updated <span className="emphasis">{ Helpers.prettyDate(this.props.updated) }</span></div>
                    <div className="stats">
                        <span className="stat featured">Featured</span>
                        <span className="stat"><i className="fa fa-star" aria-hidden="true"></i> { this.props.votes }</span>
                        <span className="stat"><i className="fa fa-eye" aria-hidden="true"></i> { this.props.views }</span>
                    </div>
                </div>
            </a>
        )
    }
});

var element = document.getElementById('guides-feed');
if(element) ReactDOM.render(<GuidesFeed guides={GUIDES} heroes={HEROES} />, element);
