var React = require('react');
var Helpers = require('../../helpers');

var TeamPanel = React.createClass({
    getInitialState: function() {
        return {
            players: null, 
            maxStats: null
        }  
    },
    componentWillMount: function() {
        var players = this.getPlayers(this.props.players);
        this.setState({ players: players, maxStats: this.computeMaxStats(players) });
    },
    componentWillReceiveProps: function(nextProps) {
        var players = this.getPlayers(nextProps.players);
        this.setState({ players: players, maxStats: this.computeMaxStats(players) });
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        /*
        if(nextProps.maxStats !== this.props.maxStats) {
            return true;
        }
        */
        if(nextProps !== this.props) return true;
        if(this.state !== nextState) return true;
        return true;
        //return false;
    },
    computeMaxStats: function(players) {
        var maxStats = {
            maxHeroDamage: 0,
            maxTowerDamage: 0,
            maxMinionDamage: 0,
            maxJungleDamage: 0,
            maxHarvesterDamage: 0,
            maxInhibitorDamage: 0
        };

        players.forEach(function(player) {
            if(player.damageToHeroes > maxStats.maxHeroDamage) maxStats.maxHeroDamage = player.damageToHeroes;
            if(player.damageToTowers > maxStats.maxTowerDamage) maxStats.maxTowerDamage = player.damageToTowers;
            if(player.damageToMinions > maxStats.maxMinionDamage) maxStats.maxMinionDamage = player.damageToMinions;
            if(player.damageToJungle > maxStats.maxJungleDamage) maxStats.maxJungleDamage = player.damageToJungle;
            if(player.damageToHarvesters > maxStats.maxHarvesterDamage) maxStats.maxHarvesterDamage = player.damageToHarvesters;
            if(player.damageToInhibitors > maxStats.maxInhibitorDamage) maxStats.maxInhibitorDamage = player.damageToInhibitors;
        });

        return maxStats;
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
            case 'HERO': style.width = ((player.damageToHeroes / this.state.maxStats.maxHeroDamage) * 100) + '%';break;
            case 'TOWER': style.width = ((player.damageToTowers / this.state.maxStats.maxTowerDamage) * 100) + '%';break;
            case 'MINION': style.width = ((player.damageToMinions / this.state.maxStats.maxMinionDamage) * 100) + '%';break;
            case 'JUNGLE': style.width = ((player.damageToJungle / this.state.maxStats.maxJungleDamage) * 100) + '%';break;
            case 'HARVESTERS': style.width = ((player.damageToHarvesters / this.state.maxStats.maxHarvesterDamage) * 100) + '%';break;
            case 'INHIBITORS': style.width = ((player.damageToInhibitors / this.state.maxStats.maxInhibitorDamage) * 100) + '%';break;
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
    computeTotalStats: function() {
        var heroDamage = 0;
        var towerDamage = 0;
        var minionDamage = 0;
        var jungleDamage = 0;
        var harvesterDamage = 0;
        var inhibitorDamage = 0;

        this.state.players.forEach(function(player) {
            heroDamage += player.damageToHeroes;
            towerDamage += player.damageToTowers;
            minionDamage += player.damageToMinions;
            jungleDamage += player.damageToJungle;
            harvesterDamage += player.damageToHarvesters;
            inhibitorDamage += player.damageToInhibitors;
        });
        return (
            <tr className="total">
                <td></td>
                <td></td>
                <td className="label"><span>Total:</span></td>
                <td className="damage"><span className="small">{Helpers.pretifyNumber(heroDamage)}</span></td>
                <td className="damage"><span className="small">{Helpers.pretifyNumber(towerDamage)}</span></td>
                <td className="damage"><span className="small">{Helpers.pretifyNumber(minionDamage)}</span></td>
                <td className="damage"><span className="small">{Helpers.pretifyNumber(jungleDamage)}</span></td>
                <td className="damage"><span className="small">{Helpers.pretifyNumber(harvesterDamage)}</span></td>
                <td className="damage"><span className="small">{Helpers.pretifyNumber(inhibitorDamage)}</span></td>
            </tr>
        )
    },
    getResult: function() {
        if(this.props.isLive === false) {
            var result = '';
            if(parseInt(this.props.victor) === 1 || parseInt(this.props.victor) === 0) {
                result = parseInt(this.props.victor) === this.props.team ? 'victory' : 'defeat';
            }
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
                        {this.computeTotalStats()}
                    </tbody>
                </table>
            </div>
        )
    }
});

module.exports = TeamPanel;