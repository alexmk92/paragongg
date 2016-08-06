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
        console.log('start time is: ', this.props.startTime);
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
                if(this.props.isLive) {
                    this.setState({
                        timeElapsed: (new Date().getTime() - (1000 * 60 * 60)) - this.state.gameStart.getTime()
                    });
                } else {
                    clearInterval(this.interval);
                }
            }.bind(this), 1000);
        }
    },
    getMatchTime: function() {
        if(this.state.timeElapsed && this.state.startTime !== null) {
            return Helpers.gameMinutes(this.state.timeElapsed);
        } else {
            if(this.props.endTime && !this.props.isLive) {
                return Helpers.gameMinutes(this.props.endTime);
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