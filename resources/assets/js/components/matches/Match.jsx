var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');

var GameClock = require('./GameClock');
var EventFeed = require('./EventFeed');
var MatchInfo = require('./MatchInfo');
var TeamPanel = require('./TeamPanel');

var Match = React.createClass({
    getInitialState: function() {
        return {
            heroes: this.props.heroes,
            matchInfo: null
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.matchInfo !== nextState.matchInfo;

    },
    componentWillMount: function() {
        this.victor = false;
        this.getMatchInformation();
    },
    componentDidMount: function() {
        this.getMatchInterval = setInterval(function() {
            this.getMatchInformation();
        }.bind(this), 7500);
    },
    /* Maybe we will use again in future as a toggle option to show max shared stats
    // If we use this again in future then we need to set a maxStats state on this component
    // and pass maxStats to the TeamPanel component
    // used so we can share between stat panels
    computeMaxStats: function(matchData) {
        var maxStats = {
            maxHeroDamage: 0,
            maxTowerDamage: 0,
            maxMinionDamage: 0,
            maxJungleDamage: 0,
            maxHarvesterDamage: 0,
            maxInhibitorDamage: 0
        };

        matchData.players.forEach(function(player) {
            if(player.damageToHeroes > maxStats.maxHeroDamage) maxStats.maxHeroDamage = player.damageToHeroes;
            if(player.damageToTowers > maxStats.maxTowerDamage) maxStats.maxTowerDamage = player.damageToTowers;
            if(player.damageToMinions > maxStats.maxMinionDamage) maxStats.maxMinionDamage = player.damageToMinions;
            if(player.damageToJungle > maxStats.maxJungleDamage) maxStats.maxJungleDamage = player.damageToJungle;
            if(player.damageToHarvesters > maxStats.maxHarvesterDamage) maxStats.maxHarvesterDamage = player.damageToHarvesters;
            if(player.damageToInhibitors > maxStats.maxInhibitorDamage) maxStats.maxInhibitorDamage = player.damageToInhibitors;
        });

        return maxStats;
    },
    */
    getMatchInformation: function() {
        if(!Helpers.isNullOrUndefined(replayId)) {
            var deckURL = '/api/v1/matches/find/' + replayId;
            Helpers.ajax({
                type: 'GET',
                url: deckURL,
                cache : false
            }).then(function(replay) {
                if(!Helpers.isNullOrUndefined(replay) && replay.hasOwnProperty('data')) {
                    //var maxStats = this.computeMaxStats(replay.data);
                    var oldTime = replay.data.startedAt;
                    if(replay.data.isLive === true) {
                        var newTime = new Date(oldTime).getTime() + 120000;
                        replay.data.startedAt = new Date(newTime);
                    } else {
                        clearInterval(this.getMatchInterval);
                        console.log('cleared the get match interval and set replay time to its old state');
                        replay.data.startedAt = oldTime;
                    }
                    this.setState({ matchInfo:replay.data });
                }
            }.bind(this));
        }
        /*
        if(this.victor === true) {
            //matchInfo.isLive = false;
            //matchInfo.winningTeam = 0;
        }
        */
    },
    render: function() {
        if(!Helpers.isNullOrUndefined(this.state.matchInfo)) {
            console.log('rendering with: ', this.state.matchInfo);
            return (
                <div>
                    <GameClock startTime={this.state.matchInfo.startedAt}
                               isLive={this.state.matchInfo.isLive}
                               endTime={this.state.matchInfo.gameLength}
                    />
                    <div id="sidebar">
                        <MatchInfo gameType={this.state.matchInfo.gameType}
                                   replayId={this.state.matchInfo.replayId}
                                   dateTime={this.state.matchInfo.startedAt}
                        />
                        <EventFeed players={this.state.matchInfo.players}
                                   events={this.state.matchInfo.towerKills.concat(this.state.matchInfo.playerKills)}
                                   startTime={this.state.matchInfo.startedAt}
                                   isLive={this.state.matchInfo.isLive}
                        />
                    </div>
                    <div className="wrapper">
                        <div className="match-stats">
                            <TeamPanel team={0}
                                       isLive={this.state.matchInfo.isLive}
                                       victor={this.state.matchInfo.winningTeam}
                                       players={this.state.matchInfo.players}
                                       heroes={this.state.heroes}
                                       startTime={this.state.matchInfo.startedAt}
                                       towerKills={this.state.matchInfo.towerKills}
                            />
                            <TeamPanel team={1}
                                       isLive={this.state.matchInfo.isLive}
                                       victor={this.state.matchInfo.winningTeam}
                                       players={this.state.matchInfo.players}
                                       heroes={this.state.heroes}
                                       startTime={this.state.matchInfo.startedAt}
                                       towerKills={this.state.matchInfo.towerKills}
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return(<div className="match-preloader">
                <span className="loading-text"><i className="fa fa-chevron-down" aria-hidden="true"></i> Loading match</span>
                <div className="preload-container">
                    <div className="spinner-container">
                        <div className='uil-ring-css large'>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>);
        }
    }
});

module.exports = Match;

var container = document.querySelector('.match-details');
if(container) {
    ReactDOM.render(<Match heroes={HEROES}/>, container);
}