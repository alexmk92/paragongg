var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');
var PreloadImage = require('../PreloadImage');

var MatchItem = React.createClass({
    getInitialState: function() {
        return {
            player: null,
            result: null
        }
    },
    componentWillMount: function() {
        var player = null;
        this.props.match.players.some(function(p) {
            if(p.accountId === pId) {
                player = p;
                return true;
            }
            return false;
        });
        this.setState({ player : player, result: this.getMatchResult(player) });
    },
    getMatchResult: function(player) {
        console.log('does: ' + player.team + ' equal ' + this.props.match.winningTeam);
        if(player && player.team === this.props.match.winningTeam)
            return 'win';
        return 'loss';
    },
    render: function() {
        var matchResult = this.state.result;
        var matchResultLink = matchResult;
        if(matchResultLink === 'loss') matchResultLink = 'lose'; // we dont want orange highlighting on the left border, it looks too colourful
        return(
            <li>
                <a href={'/tmatches/' + this.props.match.replayId} className={'match-preview ' + matchResultLink}>
                    <table>
                        <tr>
                            <td className="hero-played">
                                <PreloadImage src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                            </td>
                            <td className="kda">
                                <span className="kills">{ this.state.player.kills }</span>/<span className="deaths">{ this.state.player.deaths }</span>/<span className="assists">{ this.state.player.assists }</span>
                            </td>
                            <td>
                                <span className="tag">
                                    <span className={matchResult}>{matchResult} {Helpers.prettyDate(new Date(this.props.match.startedAt))}</span>
                                </span>
                                <span className="tag">
                                    <span className="label">Duration</span>
                                </span>
                                <span className="tag">
                                    <span className="label">Match mode</span> {this.props.match.gameType.replace('_', '')}
                                </span>
                            </td>
                            <td className="final">
                                <span className="btn btn-faded"><i className="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                            </td>
                        </tr>
                    </table>
                </a>
            </li>
        )
    }
});

var MatchFeed = React.createClass({
    getInitialState: function() {
        return {
            matches: [],
            skip: 0,
            take: 10,
            fetching: false,
            endOfPage: false
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextState.matches.length !== this.state.matches.length) return true;
        return nextState !== this.state;
    },
    componentWillMount: function() {
        // Bind scroll event
        window.addEventListener('scroll', this.handleScroll);

        this.getMatchHistory();
    },
    handleScroll: function() {
        var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight + 50 || !hasScrollbar) {
            this.getMatchHistory();
        }
    },
    getMatchHistory: function() {
        if(!this.state.fetching && !this.state.endOfPage) {
            this.setState({ fetching: true });
            var matchURL = '/api/v1/matches/player/' + pId + '?skip=' + this.state.skip + '&take=' + this.state.take;
            console.log('querying: ', matchURL);
            Helpers.ajax({
                type: 'GET',
                url: matchURL,
                cache : false
            }).then(function(matches) {
                var oldMatches = JSON.parse(JSON.stringify(this.state.matches));
                var endOfPage = matches.data.length < this.state.take || matches.data.length === 0;
                var skip = this.state.skip + this.state.take;
                this.setState({ matches: oldMatches.concat(matches.data), endOfPage: endOfPage, skip: skip, fetching: false });
            }.bind(this));
        }
    },
    renderMatches: function() {
        if(this.state.matches.length > 0) {
            return this.state.matches.map(function(match) {
                return <MatchItem match={match} />
            });
        } else {
            return <p>This user is yet to play any games this season.</p>
        }
    },
    renderInfiniteScrollStatus: function() {
        var jsx = '';
        if(this.state.fetching) jsx = <span><i className="fa fa-spinner fa-spin"></i> Fetching more of your match history</span>;
        if(this.state.endOfPage) jsx = <span><i className="fa fa-check"></i> You've reached the end of the page</span>;
        return jsx;
    },
    render: function() {
        return (
            <div>
                <ul>{this.renderMatches()}</ul>

                <div id="infinite-scroll-status" className="infinite-scroll-end">
                    {this.renderInfiniteScrollStatus()}
                </div>
            </div>
        )
    }
});

var elem = document.querySelector('#match-feed');
if(elem) {
    ReactDOM.render(<MatchFeed />, elem);
}