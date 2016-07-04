var React     = require('react');
var ReactDOM  = require('react-dom');
var Helpers   = require('../../helpers');
var FlipMove  = require('react-flip-move');
var Tabbable  = require('../libraries/tabs/Tabbable');
var HeroPanel = require('../heroes/HeroPanel');
var PreloadImage = require('../PreloadImage');

var Tabs      = Tabbable.Tabs;
var TabPanel  = Tabbable.TabPanel;

var GuidesFeed = React.createClass({
    getInitialState: function() {
        return {
            guides : this.props.guides,
            heroes : this.props.heroes
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.heroes !== this.state.heroes;
    },
    onHeroSelected : function(newHero) {
        var newHeroes = [];
        this.state.heroes.forEach(function(hero) {
            if(hero.code !== newHero.code) newHeroes.push(hero);
        });
        this.setState({ heroes : newHeroes });
    },
    heroesListUpdated: function(newHeroes) {
        this.setState({ heroes : newHeroes });
    },
    render: function() {
        return(
            <div>
                <HeroPanel title="Hero guides" placeholder="Search by hero name..." showAffinityFilter={false} heroes={this.props.heroes} isActive={true} onHeroSelected={this.onHeroSelected} onHeroesListUpdated={this.heroesListUpdated} />
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
                                      featured={guide.featured}
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
        return (
            <PreloadImage src={"https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/" + this.props.hero.code + "/" + this.props.hero.image + "/portrait_small.png"}
                          fallbackSrc="assets/images/heroes/null.png"
            />
        );
    },
    gameplayOrHero: function() {
        if(this.props.hero) {
            return this.props.hero.name;
        } else {
            return "Gameplay";
        }
    },
    getStatLabel: function() {
        console.log(this.props);
        // TODO Check to see if the created_at date is today
        var created_at = new Date(this.props.created);
        var updated_at = new Date(this.props.updated);

        if(this.props.featured === 1)
            return <span className="stat featured">Featured</span>

        var timeDiff = Math.abs(created_at.getTime() - updated_at.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if(updated_at.getTime() > created_at.getTime() && (diffDays > 0 && diffDays < 10)) {
            return <span className="stat updated">Recently Updated</span>
        }

        if(diffDays === 0 && diffDays < 7) {
            return (
                <span className={"stat new"}>New</span>
            );
        }

        return <span className="stat"></span>
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
                        { this.getStatLabel() }
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
