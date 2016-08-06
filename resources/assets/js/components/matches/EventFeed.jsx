var React = require('react');
var Helpers = require('../../helpers');
var FlipMove = require('react-flip-move');

var EventFeed = React.createClass({
    getInitialState: function() {
        return {
            events: [],
            visibleEvents: []
        }
    },
    getPlayerTeam: function(playerName) {
        var team = null;
        this.props.players.some(function(player) {
            if(playerName.toUpperCase() === player.username.toUpperCase()) {
                team = player.team;
                return true;
            }
            return false;
        });
        return team;
    },
    componentDidMount: function() {
        var sortedEvents = this.sortByTime(this.props.events);
        this.setState({ events: sortedEvents, visibleEvents: this.getVisibleEvents(sortedEvents) })
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextState.visibleEvents.length > this.state.visibleEvents.length;
    },
    componentWillReceiveProps: function(nextProps) {
        var sortedEvents = this.sortByTime(nextProps.events);
        var visibleEvents = this.getVisibleEvents(sortedEvents);
        console.log('visible events length is now: ' + visibleEvents.length + ', it was: ' + this.state.visibleEvents.length);
        this.setState({ events: sortedEvents, visibleEvents: visibleEvents });
    },
    getEventLabel: function(event) {
        if(!Helpers.isNullOrUndefined(event.killed)) {
            // Player kill event
            var killerTeam = this.getPlayerTeam(event.killer);
            var killedTeam = this.getPlayerTeam(event.killed);
            return (
                <div className="event">
                    <i className="pgg pgg-skull"></i>
                    <span>
                        <span className={'team' + killerTeam}>{event.killer}</span> killed <span className={'team' + killedTeam}>{event.killed}</span>
                    </span>
                </div>
            );
        } else {
            // Tower kill event
            var killerTeam = this.getPlayerTeam(event.killer);
            return (
                <div className="event">
                    <i className="pgg pgg-tower"></i>
                <span>
                    <span className={'team' + killerTeam}>{event.killer}</span> destroyed a tower
                </span>
                </div>
            )
        }
    },
    getVisibleEvents: function(sortedEvents) {
        console.log('state in events: ', this.state);
        var visibleEvents = [];
        console.log(this.props.startTime);
        var currentTime = Math.abs((new Date().getTime() - (1000 * 60 * 60)) - this.props.startTime.getTime());


        sortedEvents.forEach(function(event) {
            console.log('checking if: ' + event.timestamp + ' is less than ' + currentTime);
            if(event.timestamp <= currentTime) {
                visibleEvents.push(
                    <li key={'event_' + event.timestamp + '_' + event.killer }>
                        <div className="timestamp">{Helpers.gameMinutes(event.timestamp)}</div>
                        { this.getEventLabel(event) }
                    </li>
                );
            }
        }.bind(this));
        return visibleEvents;
    },
    renderEventsList: function() {
        if(this.state.visibleEvents.length > 0) {
            return (
                <ul className="event-list">
                    <FlipMove>
                        {this.state.visibleEvents}
                    </FlipMove>
                </ul>
            );
        } else {
            return (
                <p>Tower and Kill events will appear here as they happen in game, keep your eyes peeled!</p>
            )
        }
    },
    sortByTime: function(eventList) {
        return eventList.sort(function(a, b) {
            if(a.timestamp > b.timestamp) return -1;
            if(a.timestamp < b.timestamp) return 1;
            return 0;
        });
    },
    render: function() {
        return (
            <div className="sidebox cf hide-mobile">
                <h3>Event feed</h3>
                { this.renderEventsList() }
            </div>
        );
    }
});

module.exports = EventFeed;