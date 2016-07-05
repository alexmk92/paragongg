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
            heroes : this.props.heroes,
            selectedType: 'featured',
            take: 1,
            guides: {
                featured: {
                    guides : this.props.guides,
                    skip : 5,
                    fetching: false,
                    endOfPage: false
                },
                updated: {
                    guides : this.props.guides,
                    skip : 5,
                    fetching: false,
                    endOfPage: false
                },
                rated: {
                    guides : this.props.guides,
                    skip : 5,
                    fetching: false,
                    endOfPage: false
                },
                views: {
                    guides : this.props.guides,
                    skip : 5,
                    fetching: false,
                    endOfPage: false
                },
                newest: {
                    guides : this.props.guides,
                    skip : 5,
                    fetching: false,
                    endOfPage: false
                }
            }
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextState.guides[this.state.selectedType].guides.length !== this.state.guides[this.state.selectedType].guides.length) return true;
        return nextState.heroes !== this.state.heroes;
    },
    componentWillMount: function() {
        // Bind scroll event
        var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
        if(hasScrollbar) window.addEventListener('scroll', this.handleScroll);
        else window.addEventListener('wheel', this.handleScroll);
    },
    handleScroll: function() {
        var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight || !hasScrollbar) {
            this.getResults();
        }
    },
    updateSelectedType: function(type) {
        this.setState({ selectedType: type });
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
    getResults: function() {
        var endOfPage = this.state.guides[this.state.selectedType].endOfPage;
        var fetching = this.state.guides[this.state.selectedType].fetching;
        if(!endOfPage && !fetching) {
            var skip = this.state.guides[this.state.selectedType].skip;
            Helpers.ajax({
                type: 'GET',
                url: '/api/v1/guides?filter=' + this.state.selectedType + '&skip=' + skip + '&take=' + this.state.take,
                cache : false
            }).then(function(guidesList) {
                if(guidesList.data.length === 0) {
                    var guides = JSON.parse(JSON.stringify(this.state.guides));
                    guides.endOfPage = true;
                    this.setState({ guides : guides });
                    return;
                }

                var newGuides = guidesList.data.map(function(guide) {
                    return guide;
                });

                var guides = JSON.parse(JSON.stringify(this.state.guides));
                guides[this.state.selectedType].fetching = false;
                guides[this.state.selectedType].skip += 1;
                guides[this.state.selectedType].guides = guides[this.state.selectedType].guides.concat(newGuides);

                this.setState({ guides: guides });
            }.bind(this));
            var guides = JSON.parse(JSON.stringify(this.state.guides));
            guides[this.state.selectedType].fetching = true;
            this.setState({ guides: guides });
        }
    },
    render: function() {
        return(
            <div>
                <HeroPanel title="Hero guides" placeholder="Search by hero name..." showAffinityFilter={false} heroes={this.props.heroes} isActive={true} onHeroSelected={this.onHeroSelected} onHeroesListUpdated={this.heroesListUpdated} />
                <GuideResults guides={this.state.guides}
                              heroes={this.state.heroes}
                              onSelectedTypeChanged={this.updateSelectedType}
                              selectedType={this.state.selectedType}
                />
            </div>
        )
    }
});

var GuideResults = React.createClass({
    getInitialState: function() {
        return {
            heroes : this.props.heroes
        }
    },
    getHero: function(code) {
        var foundHero = {};
        this.state.heroes.some(function(hero) {
            if(hero.code == code) {
                foundHero = hero;
                return true;
            }
            return false;
        });
        return foundHero;
    },
    setSelectedType: function(index) {
        var type = '';
        switch(index) {
            case 0: type = 'featured'; break;
            case 1: type = 'updated'; break;
            case 2: type = 'rated'; break;
            case 3: type = 'views'; break;
            case 4: type = 'newest'; break;
            default: break;
        }
        this.props.onSelectedTypeChanged(type);
    },
    render: function() {
        var guides = [];
        this.props.guides[this.props.selectedType].guides.forEach(function(guide) {
            var hero = this.getHero(guide.hero_code);
            console.log("HERO IS: ", hero);
            guides.push(<GuidePreview key={guide.id + '_' + Helpers.uuid()}
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
        }.bind(this));
        return (
            <Tabs defaultSelected={0} expandable={false} className="padless" onSelectedTabUpdated={this.setSelectedType}>
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
    gameplayOrHero: function() {
        if(this.props.hero) {
            return this.props.hero.name;
        } else {
            return "Gameplay";
        }
    },
    getStatLabel: function() {
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
    getTimeLabel: function() {
        var created_at = new Date(this.props.created);
        var updated_at = new Date(this.props.updated);

        return updated_at.getTime() > created_at.getTime() ? "last updated" : "created";
    },
    render: function() {
        console.log("PROPS IN CHILD: ", this.props);
        return(
            <a className="guide-preview cf" href={"/guides/" + this.props.id + "/" + this.props.slug}>
                <div className="guide-hero">
                    <PreloadImage src={ Helpers.S3URL() + "images/heroes/" + this.props.hero.code + "/" + this.props.hero.image + "/portrait_small.png" }
                                  fallbackSrc="assets/images/heroes/null.png"
                    />
                </div>
                <div className="guide-details">
                    <div className="title"><h3>{ this.props.title }</h3></div>
                    <div className="details">
                        <span className="emphasis">{this.gameplayOrHero()}</span> guide by <span className="emphasis">{ this.props.username }</span> { this.getTimeLabel() } <span className="emphasis">{ Helpers.prettyDate(this.props.updated) }</span>
                    </div>
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
