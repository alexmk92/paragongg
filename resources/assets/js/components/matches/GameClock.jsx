var React = require('react');
var ReactDOM = require('react-dom');
var Helpers = require('../../helpers');

var GameClock = React.createClass({
    getInitialState: function() {
        return {
            gameStart: null,
            timeElapsed: null,
            isLive: true
        }
    },
    componentWillMount: function() {
        if(this.props.startTime !== null) {
            this.setState({ gameStart: new Date(this.props.startTime), isLive: this.props.isLive });
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if(!nextProps.isLive) {
            setTimeout(function() {
                this.setState({ isLive: false });
            }.bind(this), 2500);
        }
    },
    componentDidMount: function() {
        if(this.state.isLive) {
            this.updateTimer();
        }
    },
    updateTimer: function() {
        setInterval(function() {
            this.setState({
                timeElapsed: new Date().getTime() - this.state.gameStart.getTime()
            });
        }.bind(this), 1000);
    },
    getMatchTime: function() {
        if(this.state.timeElapsed && this.state.startTime !== null) {
            return Helpers.prettyTime(this.state.timeElapsed, true);
        } else {
            if(this.props.endTime && !this.state.isLive) {
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