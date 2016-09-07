var React = require('react');
var Helpers = require('../../helpers');

var MatchAwards = React.createClass({
    highestKDA: function() {
        if(this.props.kda) {
            return (
                <li className="cf">
                    <i className="pgg pgg-ranger"></i>
                    <div className="content">
                        <span className="title">Master marksman</span>
                        <span className="username"><i className="fa fa-trophy" aria-hidden="true"></i> {this.props.kda.username}</span>
                        <span className="stats"><strong>{this.props.kda.KDA}</strong> KDA ratio</span>
                    </div>
                </li>
            )
        }
        return ""
    },
    highestTowers: function() {
        console.log("highest towers!");
        console.log(this.props.towers);
        if(this.props.towers) {
            return (
                <li className="cf">
                    <i className="pgg pgg-tower"></i>
                    <div className="content">
                        <span className="title">Tower destroyer</span>
                        <span className="username"><i className="fa fa-trophy" aria-hidden="true"></i> {this.props.towers.username}</span>
                        <span className="stats"><strong>{Helpers.pretifyNumber(this.props.towers.damageToTowers)}</strong> damage to towers</span>
                    </div>
                </li>
            )
        }
        return ""
    },
    highestAssists: function() {
        if(this.props.assists) {
            return (
                <li className="cf">
                    <i className="pgg pgg-support"></i>
                    <div className="content">
                        <span className="title">Team player</span>
                        <span className="username"><i className="fa fa-trophy" aria-hidden="true"></i> {this.props.assists.username}</span>
                        <span className="stats"><strong>{this.props.assists.assists}</strong> total assists</span>
                    </div>
                </li>
            )
        }
        return ""
    },
    liveDisclaimer: function() {
        if(!this.props.gameOver) {
            return <span className="liveDisclaimer"><i className="fa fa-info-circle" aria-hidden="true"></i> The game is LIVE and these awards are not yet final!</span>
        }
        return ""
    },
    render: function() {
        return (
            <div className="sidebox cf">
                <h3>Awards</h3>
                {this.liveDisclaimer()}
                <ul className="awards-list">
                    {this.highestKDA()}
                    {this.highestTowers()}
                    {this.highestAssists()}
                </ul>
            </div>
        )
    }
});

module.exports = MatchAwards;