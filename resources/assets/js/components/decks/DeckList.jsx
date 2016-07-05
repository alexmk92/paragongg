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
            decks: [],
            fetching: false,
            endOfPage: false
        }
    },
    componentWillMount: function() {
        this.tooltip = new Tooltip();
        this.setState({ decks : DECKS });

        // Bind scroll event
        window.addEventListener('scroll', this.handleScroll);
    },
    componentDidMount: function() {
        // start skip at 10 as PHP renders first 10
        this.skip = 10;
        this.take = 10;
        // Replace the current notification panel.
        this.notificationPanel = new Notification();
        this.notificationPanel.initialiseNotifications();
    },
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
    handleScroll: function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
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
                var newDecks = this.state.decks.map(function(oldDeck) {
                    if(oldDeck._id === deck._id) {
                        oldDeck = deck;
                    }
                    return oldDeck;
                });
                this.setState({ decks : newDecks });
            }.bind(this), function(err) {
                console.log("ERROR WHEN UPVOTING: ", err);
            });
        } else {
            this.notificationPanel.addNotification('warning', 'Sorry, you must be logged in to up-vote a deck.');
        }
    },
    renderDeckList: function() {
        var decks = this.state.decks.map(function(deck) {
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
        if(this.state.fetching) jsx = <span><i className="fa fa-spinner fa-spin"></i> Fetching new results</span>;
        if(this.state.endOfPage) jsx = <span><i className="fa fa-check"></i> You've reached the end of the page</span>;
        return jsx;
    },
    render: function() {
        console.log("UPDATING, DECKS HAS A LENGTH OF " + this.state.decks.length + " AND IS NOW: ", this.state.decks);
        return(
            <div>
                <HeroPanel title="Hero guides" placeholder="Search by hero name..." showAffinityFilter={false} heroes={HEROES} isActive={true} onHeroSelected={this.onHeroSelected} onHeroesListUpdated={this.heroesListUpdated} />

                <Tabs defaultSelected={0} expandable={false} className="padless">
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
                    {/* Newest */}
                    <TabPanel title="Newest">
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
if(element) ReactDOM.render( <DeckList />, element);