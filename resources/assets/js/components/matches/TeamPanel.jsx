var React = require('react');

var TeamPanel = React.createClass({
    getInitialState: function() {
        return {
            
        }  
    },
    getPlayersOnTeam: function() {
        
    },
    render: function() {
        return (
            <div className={"team-stats team" + this.props.team}>
                {this.getPlayersOnTeam()}
            </div>
        )
    }
});

module.exports = TeamPanel;