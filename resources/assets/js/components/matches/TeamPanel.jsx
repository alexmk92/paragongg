var React = require('react');
var Helpers = require('../../helpers');

var TeamPanel = React.createClass({
    getInitialState: function() {
        return {
            players: null
        }  
    },
    componentWillMount: function() {
        var players = this.getPlayers(this.props.players);
        this.setState({ players: players });
    },
    componentWillReceiveProps: function(nextProps) {
        var players = this.getPlayers(nextProps.players);
        this.setState({ players: players });
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextProps.maxStats !== this.props.maxStats) {
            return true;
        }
        if(nextProps !== this.props) return true;
        return true;
        //return false;
    },
    getPlayers: function(playersArray) {
        var players = [];
        playersArray.forEach(function(player) {
            if(player.team === this.props.team) {
                players.push(player);
            }
        }.bind(this));
        return players;
    },
    getHeroName: function(player) {
        return 'Steel';
    },
    getHeroImage: function(player) {
        return "https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png";
    },
    renderStatRows: function() {
        return this.state.players.map(function(player) {
            console.log("PLAYER: ", player);
            return (
                <tr key={"player-row-" + Helpers.uuid()}>
                    <td className="hero">
                        <div className="split">
                            <div>
                                <img className="hero-preview" src={this.getHeroImage(player)} />
                            </div>
                            <div>
                                <span className="highlight">{this.getHeroName(player)}</span>
                                <span className="small">Level {player.heroLevel}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span><a href={"players/" + player.username }>{ player.username }</a></span>
                        <span className="small"><strong className="color master">2293</strong> Master</span>
                    </td>
                    <td>
                        <span>
                            <span className="highlight">{player.kills}</span>/
                            <span className="highlight">{player.deaths}</span>/
                            <span className="highlight">{player.assists}</span>
                        </span>
                        <span className="small">{this.getKDA(player)}</span>
                    </td>
                    <td className="damage">
                        <span className="small">{Helpers.pretifyNumber(player.damageToHeroes)}</span>
                        <div className="damage-bar">
                            <div className="completion" style={this.getPercentageForStat(player, 'HERO')}></div>
                        </div>
                    </td>
                    <td className="damage">
                        <span className="small">{Helpers.pretifyNumber(player.damageToTowers)}</span>
                        <div className="damage-bar">
                            <div className="completion" style={this.getPercentageForStat(player, 'TOWER')}></div>
                        </div>
                    </td>
                    <td className="damage">
                        <span className="small">{Helpers.pretifyNumber(player.damageToMinions)}</span>
                        <div className="damage-bar">
                            <div className="completion" style={this.getPercentageForStat(player, 'MINION')}></div>
                        </div>
                    </td>
                    <td className="damage">
                        <span className="small">{Helpers.pretifyNumber(player.damageToJungle)}</span>
                        <div className="damage-bar">
                            <div className="completion" style={this.getPercentageForStat(player, 'JUNGLE')}></div>
                        </div>
                    </td>
                    <td className="damage">
                        <span className="small">{Helpers.pretifyNumber(player.damageToHarvesters)}</span>
                        <div className="damage-bar">
                            <div className="completion" style={this.getPercentageForStat(player, 'HARVESTERS')}></div>
                        </div>
                    </td>
                    <td className="damage">
                        <span className="small">{Helpers.pretifyNumber(player.damageToInhibitors)}</span>
                        <div className="damage-bar">
                            <div className="completion" style={this.getPercentageForStat(player, 'INHIBITORS')}></div>
                        </div>
                    </td>
                </tr>
            );
        }.bind(this));
    },
    getPercentageForStat: function(player, type) {
        var style = { width: '0%' };
        switch(type.toUpperCase()) {
            case 'HERO': style.width = ((player.damageToHeroes / this.props.maxStats.maxHeroDamage) * 100) + '%';break;
            case 'TOWER': style.width = ((player.damageToTowers / this.props.maxStats.maxTowerDamage) * 100) + '%';break;
            case 'MINION': style.width = ((player.damageToMinions / this.props.maxStats.maxMinionDamage) * 100) + '%';break;
            case 'JUNGLE': style.width = ((player.damageToJungle / this.props.maxStats.maxJungleDamage) * 100) + '%';break;
            case 'HARVESTERS': style.width = ((player.damageToHarvesters / this.props.maxStats.maxHarvesterDamage) * 100) + '%';break;
            case 'INHIBITORS': style.width = ((player.damageToInhibitors / this.props.maxStats.maxInhibitorDamage) * 100) + '%';break;
            default: break;
        }
        return style;
    },
    getKDA: function(player) {
        var tK = 0;
        this.state.players.forEach(function(p) {
            tK += p.kills;
        });
        // Prevent a divide by zero error
        if(tK === 0) tK = 1;
        var deaths = player.deaths === 0 ? 1 : player.deaths;

        var kda = Helpers.dropZeroesAndDelimitNumbers((player.kills + player.assists) / deaths);
        var participation = Math.ceil(((player.kills + player.assists) / tK) * 100);

        return kda + ' KDA (' + participation + '%)';
    },
    getTeamScore: function() {
        if(this.state.players !== null) {
            var k = 0, d = 0, a = 0;
            this.state.players.forEach(function(p) {
                k += p.kills;
                d += p.deaths;
                a += p.assists;
            });
            return k + ' / ' + d + ' / ' + a;
        }
        return '0 / 0 / 0'
    },
    getResult: function() {
        if(this.props.isLive === false) {
            var result = this.props.victor === this.props.team ? 'victory' : 'defeat';
            return(<span className={result}>{result}</span>);
        }
    },
    componentDidMount: function() {
        console.log('players for team: ' + this.props.team, this.state.players);
    },
    render: function() {
        return (
            <div className={"team-stats team" + this.props.team}>
                <div className="team-score">
                    <span className={"subheader team" + this.props.team}>{ this.props.team === 0 ? 'RED' : 'BLUE'} TEAM</span>
                    <span className="score">{this.getTeamScore()}</span>
                </div>
                <div className="result">
                    {this.getResult()}
                </div>
                <table className="scoreboard">
                    <thead>
                    <tr>
                        <th className="hero">Hero</th>
                        <th>Player</th>
                        <th>Score</th>
                        <th className="damage">Heroes</th>
                        <th className="damage">Towers</th>
                        <th className="damage">Minions</th>
                        <th className="damage">Jungle</th>
                        <th className="damage">Rigs</th>
                        <th className="damage">Inhibitors</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderStatRows()}
                    </tbody>
                </table>
            </div>
        )
    }
});

module.exports = TeamPanel;