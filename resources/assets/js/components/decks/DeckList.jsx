var React = require('react');
var ReactDOM = require('react-dom');
var Helpers    = require('../../helpers');
var DeckPreview = require('./DeckPreview');
var HeroPanel = require('../heroes/HeroPanel');
var Tabbable  = require('../libraries/tabs/Tabbable');
var Tooltip = require('../libraries/tooltip/Toptip');
var Notification = require('../libraries/notification/Notification');

var Tabs      = Tabbable.Tabs;
var TabPanel  = Tabbable.TabPanel;

var DeckList = React.createClass({
    getInitialState: function() {
        console.log(this.props);
        return {
            selectedType: 'featured',
            heroes : this.props.heroes || null,
            take: 10,
            decks: {
                featured: {
                    decks : this.props.decks.featured,
                    skip : this.props.decks.featured.length,
                    fetching: false,
                    endOfPage: false
                },
                recent: {
                    decks : this.props.decks.recent,
                    skip : this.props.decks.recent.length,
                    fetching: false,
                    endOfPage: false
                },
                rated: {
                    decks : this.props.decks.rated,
                    skip : this.props.decks.rated.length,
                    fetching: false,
                    endOfPage: false
                },
                views: {
                    decks : this.props.decks.views,
                    skip : this.props.decks.views.length,
                    fetching: false,
                    endOfPage: false
                }
            }
        }
    },
    componentWillMount: function() {
        this.tooltip = new Tooltip();

        // Bind scroll event
        window.addEventListener('scroll', this.handleScroll);
    },
    /*
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextState.decks[nextState.selectedType].decks.length !== this.state.decks[this.state.selectedType].decks.length) return true;
        if(nextState.selectedType !== this.state.selectedType) return true;
        if(nextState.decks[this.state.selectedType].fetching !== this.state.decks[this.state.selectedType].fetching) return true;
        if(nextState.decks[this.state.selectedType].endOfPage !== this.state.decks[this.state.selectedType].endOfPage) return true;
        return nextState.heroes !== this.state.heroes;
    },
    */
    componentDidMount: function() {
        // Replace the current notification panel.
        this.notificationPanel = new Notification();
        this.notificationPanel.initialiseNotifications();
    },
    setSelectedType: function(index) {
        var type = '';
        switch(index) {
            case 0: type = 'featured'; break;
            case 1: type = 'recent'; break;
            case 2: type = 'rated'; break;
            case 3: type = 'views'; break;
            default: break;
        }
        this.setState({ selectedType : type });
    },
    getResults: function() {
        var endOfPage = this.state.decks[this.state.selectedType].endOfPage;
        var fetching = this.state.decks[this.state.selectedType].fetching;
        if(!endOfPage && !fetching) {
            var skip = this.state.decks[this.state.selectedType].skip;
            var deckURL = '/api/v1/decks?skip=' + skip + '&take=' + this.state.take;
            if(HERO !== null) {
                deckURL += '&hero=' + HERO.code;
            }
            console.log(deckURL);
            Helpers.ajax({
                type: 'GET',
                url: deckURL,
                cache : false
            }).then(function(decksList) {
                if(decksList.data.length === 0) {
                    var decks = JSON.parse(JSON.stringify(this.state.decks));
                    decks[this.state.selectedType].endOfPage = true;
                    this.setState({ decks : decks });
                    return;
                }

                var newGuides = decksList.data.map(function(deck) {
                    return deck;
                });

                var decks = JSON.parse(JSON.stringify(this.state.decks));
                decks[this.state.selectedType].fetching = false;
                decks[this.state.selectedType].skip += 10;
                decks[this.state.selectedType].guides = decks[this.state.selectedType].guides.concat(newDecks);

                this.setState({ decks: decks });
            }.bind(this));
            var decks = JSON.parse(JSON.stringify(this.state.decks));
            decks[this.state.selectedType].fetching = true;
            this.setState({ decks: decks });
        }
    },
    /*
    getResults: function() {
        if(!this.state.endOfPage && !this.state.fetching) {
            Helpers.ajax({
                type: 'GET',
                url: '/api/v1/decks?skip=' + this.skip + '&take=' + this.take,
                cache : false
            }).then(function(decksList) {
                if(decksList.data.length === 0) {
                    this.setState({ endOfPage : true });
                    return;
                }

                var newDecks = decksList.data.map(function(deck) {
                    return deck;
                });
                this.skip += 10;
                this.setState({ decks : this.state.decks.concat(newDecks), fetching: false });
            }.bind(this));
            this.setState({ fetching: true });
        }
    },
    */
    handleScroll: function() {
        var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight || !hasScrollbar) {

        }
        this.getResults();
    },
    upvoteDeck: function(deck) {
        if(AUTHED) {
            Helpers.ajax({
                type : "POST",
                url :  "/api/v1/vote",
                headers : [{ "X-CSRF-TOKEN" : csrf }],
                contentType: "application/x-www-form-urlencoded",
                cache: false,
                returnType: "json",
                data: [{ "ref_id" : deck._id, "type" : "deck" }]
            }).then(function(payload) {
                deck.voted = payload.data.voted;
                deck.votes = payload.data.value;
                // make a shallow copy of the state
                var newDecks = JSON.parse(JSON.stringify(this.state.decks));
                // Mutate state for the correc tdeck
                for(var k in this.state.decks) {
                    if(k === this.state.selectedType) {
                        console.log(newDecks);
                        newDecks[k].decks = this.state.decks[k].decks.map(function(oldDeck) {
                            if(oldDeck._id === deck._id) {
                                oldDeck = deck;
                            }
                            return oldDeck;
                        });
                    }
                }
                this.setState({ decks : newDecks });
            }.bind(this), function(err) {
                console.log("ERROR WHEN UPVOTING: ", err);
            });
        } else {
            this.notificationPanel.addNotification('warning', 'Sorry, you must be logged in to up-vote a deck.');
        }
    },
    renderDeckList: function() {
        var decks = this.state.decks[this.state.selectedType].decks.map(function(deck) {
            if(!deck.voted) deck.voted = false;
            return (
                <DeckPreview key={Helpers.uuid()}
                             deck={deck}
                             sharedTooltip={this.tooltip}
                             onDeckUpvoted={this.upvoteDeck}
                />
            );
        }.bind(this));

        return decks;
    },
    renderInfiniteScrollStatus: function() {
        var jsx = '';
        if(this.state.decks[this.state.selectedType].fetching) jsx = <span><i className="fa fa-spinner fa-spin"></i> Fetching new decks</span>;
        if(this.state.decks[this.state.selectedType].endOfPage) jsx = <span><i className="fa fa-check"></i> You've reached the end of the page</span>;
        return jsx;
    },
    render: function() {
        return(
            <div>
                <HeroPanel title="Hero decks" placeholder="Search by hero name..." showAffinityFilter={false} heroes={HEROES} isActive={true} onHeroSelected={this.onHeroSelected} onHeroesListUpdated={this.heroesListUpdated}  linkType="decks"/>

                <Tabs defaultSelected={0} expandable={false} className="padless" onSelectedTabUpdated={this.setSelectedType}>
                    {/* Featured */}
                    <TabPanel title="Featured">
                        <ul className="main-list">
                            { this.renderDeckList() }
                        </ul>
                    </TabPanel>
                    {/* Recently updated */}
                    <TabPanel title="Recently updated">
                        <ul className="main-list">
                            { this.renderDeckList() }
                        </ul>
                    </TabPanel>
                    {/* Top rated */}
                    <TabPanel title="Top rated">
                        <ul className="main-list">
                            { this.renderDeckList() }
                        </ul>
                    </TabPanel>
                    {/* Most views */}
                    <TabPanel title="Most views">
                        <ul className="main-list">
                            { this.renderDeckList() }
                        </ul>
                    </TabPanel>
                </Tabs>

                <div id="infinite-scroll-status" className="infinite-scroll-end">
                    {this.renderInfiniteScrollStatus()}
                </div>
            </div>
        );
    }
});

var element = document.querySelector("#decks-feed");
if(element) ReactDOM.render( <DeckList decks={DECKS} heroes={HEROES} />, element);