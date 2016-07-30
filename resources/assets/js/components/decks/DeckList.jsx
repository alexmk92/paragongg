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
        return {
            selectedType: 'recent',
            heroes : this.props.heroes || null,
            take: 10,
            decks: {
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

        var hash = window.location.hash.toLowerCase();
        if(hash.indexOf('recent') > -1) {
            this.setState({ selectedType : 'recent' });
        } else if(hash.indexOf('rated') > -1) {
            this.setState({ selectedType : 'rated' });
        } else if(hash.indexOf('views') > -1) {
            this.setState({ selectedType : 'views' });
        } else {
            window.location.hash = '';
        }

        // Bind scroll event
        window.addEventListener('scroll', this.handleScroll);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextState.decks[nextState.selectedType].decks.length !== this.state.decks[this.state.selectedType].decks.length) return true;
        if(nextState.selectedType !== this.state.selectedType) return true;
        if(nextState.decks[this.state.selectedType].fetching !== this.state.decks[this.state.selectedType].fetching) return true;
        if(nextState.decks[this.state.selectedType].endOfPage !== this.state.decks[this.state.selectedType].endOfPage) return true;
        if(nextState.decks[nextState.selectedType].decks.length === this.state.decks[this.state.selectedType].decks.length) return false;
        return nextState.heroes !== this.state.heroes;
    },
    componentDidMount: function() {
        // Replace the current notification panel.
        this.notificationPanel = new Notification();
        this.notificationPanel.initialiseNotifications();
    },
    componentDidUpdate: function() {
        var newHash = '';
        if(newHash.indexOf('#') < 0) {
            newHash = '#filter=' + this.state.selectedType;
        }
        window.location.hash = newHash;
    },
    setSelectedType: function(index) {
        var type = '';
        switch(index) {
            case 0: type = 'recent'; break;
            case 1: type = 'rated'; break;
            case 2: type = 'views'; break;
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

                var newDecks = decksList.data.map(function(deck) {
                    return deck;
                });

                var decks = JSON.parse(JSON.stringify(this.state.decks));
                decks[this.state.selectedType].fetching = false;
                decks[this.state.selectedType].skip += 10;
                decks[this.state.selectedType].decks = decks[this.state.selectedType].decks.concat(newDecks);

                this.setState({ decks: decks });
            }.bind(this));
            var decks = JSON.parse(JSON.stringify(this.state.decks));
            decks[this.state.selectedType].fetching = true;
            this.setState({ decks: decks });
        }
    },
    handleScroll: function() {
        var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight + 50 || !hasScrollbar) {
            this.getResults();
        }
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
        if(decks.length === 0) {
            var type = Helpers.isNullOrUndefined(HERO) ? this.state.selectedType : HERO.name;
            return <p>Sorry, there are no decks for {type}, <a href="/decks/create">be the first to create one</a></p>
        }

        return decks;
    },
    renderInfiniteScrollStatus: function() {
        var jsx = '';
        if(this.state.decks[this.state.selectedType].fetching) jsx = <span><i className="fa fa-spinner fa-spin"></i> Fetching new decks</span>;
        if(this.state.decks[this.state.selectedType].endOfPage) jsx = <span><i className="fa fa-check"></i> You've reached the end of the page</span>;
        return jsx;
    },
    getIndexForSelectedType: function() {
        switch(this.state.selectedType.toLowerCase()) {
            case 'recent' : return 0; break;
            case 'rated' : return 1; break;
            case 'views' : return 2; break;
            default : return 0;
        }
    },
    render: function() {
        return(
            <div>
                <HeroPanel title="Hero decks" placeholder="Search by hero name..." showAffinityFilter={false} heroes={HEROES} isActive={true} onHeroSelected={this.onHeroSelected} onHeroesListUpdated={this.heroesListUpdated}  linkType="decks"/>

                <Tabs defaultSelected={this.getIndexForSelectedType()} expandable={false} className="padless" onSelectedTabUpdated={this.setSelectedType}>
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