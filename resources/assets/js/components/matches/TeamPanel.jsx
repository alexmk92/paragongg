var React = require('react');
var Helpers = require('../../helpers');

var TeamPanel = React.createClass({
    getInitialState: function() {
        return {
            heroes: this.props.heroes,
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
        return this.state !== nextState;

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
        var heroName = '-';
        this.state.heroes.some(function (item) {
            if(player.hero == item.codename) {
                heroName = item.name;
                return true;
            }
        });
        return heroName;
    },
    getPlayerName: function(player) {
        var icon = player.accountId === 'bot' ? (<i className="fa fa-android" aria-hidden="true"></i>) : '';
        return <a href={"/players/" + player.username}>{player.username} {icon}</a>
    },
    getHeroImage: function(player) {
        var heroImage = '/assets/images/heroes/null.png';
        this.state.heroes.some(function (item) {
            if(player.hero == item.codename) {
                heroImage = 'https://s3.amazonaws.com/paragongg-us/images/heroes/'+item.code+'/'+item.image+'/portrait_small.png';
                return true;
            }
        });
        return heroImage;
    },
    getElo: function(player) {
        var eloString = player.accountId === 'bot' ? (<span>Bot Account</span>) : (<span><strong className="color master">2293</strong> Master</span>);
        return (
            <span className="small">
                {eloString}
            </span>
        )
    },
    renderStatRows: function() {
        return this.state.players.map(function(player) {
            return (
                <tr key={"player-row-" + Helpers.uuid()}>
                    <td className="hero">
                        <div className="split">
                            <div>
                                <img className="hero-preview" src={this.getHeroImage(player)} title={this.getHeroName(player)} />
                            </div>
                            <div>
                                <span>{this.getPlayerName(player)}</span>
                                <span className="small">Level {player.heroLevel}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span>
                            <span className="highlight">{player.kills}</span>/
                            <span className="highlight">{player.deaths}</span>/
                            <span className="highlight">{player.assists}</span>
                            <span className="small">{this.getKP(player)}</span>
                        </span>
                        <span className="small">{this.getKDA(player)} KDA</span>
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
            case 'HERO': style.width = ((parseInt(player.damageToHeroes) / this.state.maxStats.maxHeroDamage) * 100) + '%';break;
            case 'TOWER': style.width = ((parseInt(player.damageToTowers) / this.state.maxStats.maxTowerDamage) * 100) + '%';break;
            case 'MINION': style.width = ((parseInt(player.damageToMinions) / this.state.maxStats.maxMinionDamage) * 100) + '%';break;
            case 'JUNGLE': style.width = ((parseInt(player.damageToJungle) / this.state.maxStats.maxJungleDamage) * 100) + '%';break;
            case 'HARVESTERS': style.width = ((parseInt(player.damageToHarvesters) / this.state.maxStats.maxHarvesterDamage) * 100) + '%';break;
            case 'INHIBITORS': style.width = ((parseInt(player.damageToInhibitors) / this.state.maxStats.maxInhibitorDamage) * 100) + '%';break;
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

        return Helpers.dropZeroesAndDelimitNumbers((player.kills + player.assists) / deaths);
    },
    getKP: function(player) {
        var tK = 0;
        this.state.players.forEach(function(p) {
            tK += p.kills;
        });

        var participation = Math.ceil(((player.kills + player.assists) / tK) * 100);
        if(isNaN(participation)) participation = 0;

        return ' (' + participation + '%)';
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
    getTeamTowers: function() {
        var currentTime = Helpers.getUTCTime() - new Date(this.props.startTime).getTime();
        var kills = 0;
        this.props.towerKills.forEach(function(event) {
            var killer = null;
            this.state.players.some(function(player) {
                if(event.killer === player.username) {
                    killer = event.killer;
                    return true;
                }
                return false;
            });
            if(killer !== null && (event.timestamp <= currentTime || !this.props.isLive)) {
                kills++;
            }
        }.bind(this));
        return kills;
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
                <td className="damageLabel"><span className="small">Total damage:</span></td>
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
                    <span className={"subheader team" + this.props.team}>{ this.props.team === 0 ? 'ORANGE' : 'BLUE'} TEAM</span>
                    <span className="score">{this.getTeamScore()}</span>
                    <span className="towers"><i className="pgg pgg-tower"></i>{this.getTeamTowers()}</span>
                </div>
                <div className="result">
                    {this.getResult()}
                </div>
                <table className="scoreboard">
                    <thead>
                    <tr>
                        <th className="hero">Player</th>
                        <th>Score</th>
                        <th className="damage">Heroes</th>
                        <th className="damage">Towers</th>
                        <th className="damage">Minions</th>
                        <th className="damage">Jungle</th>
                        <th className="damage">Wells</th>
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