var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');

var GameClock = React.createClass({
    getInitialState: function() {
        return {
            gameStart: null,
            timeElapsed: null
        }
    },
    componentWillMount: function() {
        if(this.props.startTime !== null) {
            this.setState({ gameStart: new Date(this.props.startTime) });
        }
    },
    componentDidMount: function() {
        this.updateTimer();
    },
    updateTimer: function() {
        if(this.props.isLive) {
            this.interval = setInterval(function() {
                this.setState({
                    timeElapsed: new Date().getTime() - this.state.gameStart.getTime()
                });
            }.bind(this), 1000);
        } else {
            clearInterval(this.interval);
        }
    },
    getMatchTime: function() {
        if(this.state.timeElapsed && this.state.startTime !== null) {
            return Helpers.prettyTime(this.state.timeElapsed, true);
        } else {
            if(this.props.endTime && !this.props.isLive) {
                return Helpers.prettyTime(this.props.endTime, false);
            }
            return "00:00";
        }
    },
    getMatchStatus: function() {
        var statusLabel = this.props.isLive ? 'Match live' : 'Match finished';
        var statusIcon = this.props.isLive ? 'fa fa-play-circle anim-pulse' : 'fa fa-check';
        return (
            <span className="subheading">
                <i className={statusIcon} aria-hidden="true"></i> { statusLabel }
            </span>
        )
    },
    render: function() {
        return (
            <header>
                {this.getMatchStatus()}
                <h1>{this.getMatchTime()}</h1>
            </header>
        )
    }
});

module.exports = GameClock;