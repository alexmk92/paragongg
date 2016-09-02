var React = require('react');

var MatchInfo = React.createClass({
    getMatchType: function() {
        switch(this.props.gameType.toUpperCase()) {
            case 'COOP_AI': return 'Coop vs AI'; break;
            case 'SOLO_AI': return 'Solo vs AI'; break;
            case 'PRIVATE': return 'Custom'; break;
            case 'FEATURED': return 'Featured'; break;
            case 'PVP': return 'Player vs Player'; break;
            default: break;
        }  
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