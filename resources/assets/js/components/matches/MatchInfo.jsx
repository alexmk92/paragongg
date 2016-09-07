var React = require('react');

var MatchInfo = React.createClass({
    getMatchType: function() {
        switch(this.props.gameType.toUpperCase()) {
            case 'COOP_AI': return 'Coop vs AI'; break;
            case 'SOLO_AI': return 'Solo vs AI'; break;
            case 'PRIVATE': return 'Custom'; break;
            case 'PVP': return 'Player vs Player'; break;
            default: break;
        }
    },
    getMatchIcon: function() {
        //pgg-skull
        switch(this.props.gameType.toUpperCase()) {
            case 'COOP_AI': return 'pgg-paragon-logo'; break;
            case 'SOLO_AI': return 'pgg-paragon-logo'; break;
            case 'PRIVATE': return 'pgg-assassin'; break;
            case 'PVP': return 'pgg-skull'; break;
            default: break;
        }
    },
    handleFocus: function(e) {
        e.target.select();
    },
    render: function() {
        return (
            <div className="sidebox cf">
                <h3>Match information</h3>
                <ul className="stat-list">
                    <li>
                        <label>Match type</label>
                        <span>{this.getMatchType()}</span>
                    </li>
                    <li>
                        <label>Date</label>
                        <span>{this.props.date}</span>
                    </li>
                    <li>
                        <label>Replay ID</label>
                        <span>{this.props.replayId}</span>
                    </li>
                </ul>
            </div>
        )
    }
});

module.exports = MatchInfo;