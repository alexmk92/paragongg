var React = require('react');
var ReactDOM = require('react-dom');
var FlipMove = require('react-flip-move');

var JobsFeed = React.createClass({
    getInitialState: function () {
        return {
            jobs: []
        }
    },
    componentDidMount: function () {
        this.getJobs();
        setInterval(this.getJobs, 1000);
    },
    getJobs: function () {
        var httpRequest;
        var _this = this;

        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        httpRequest.open("GET", '/admin/api/jobs?nocache=' + Math.random(), true);

        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    _this.setState({jobs: JSON.parse(httpRequest.responseText)});
                }
            }
        };

        httpRequest.send();
    },
    render: function () {
        var jobs = [];
        this.state.jobs.forEach(function (job) {

            jobs.push(<Job key={job.id}
                           id={job.id}
                           queue={job.queue}
                           payload={job.payload}
                           attempts={job.attempts}
                           reserved={job.reserved}
                           created_at={job.created_at}
            />);

        }, this);
        return (
            <div>
                <h3>Queued jobs ({jobs.length}) </h3>
                <div className="content-wrapper">
                    <FlipMove enterAnimation="fade" leaveAnimation="fade">
                        {jobs}
                    </FlipMove>
                </div>
            </div>
        )
    }
});

var Job = React.createClass({
    render: function () {
        var payload = JSON.parse(this.props.payload);
        return (
            <div className="job">
                <div className="id">{this.props.id}</div>
                <div className="queue"><strong>Queue:</strong> {this.props.queue}</div>
                <div className="attempts"><strong>Attempts:</strong> {this.props.attempts}</div>
                <div className="reserved"><strong>Reserved:</strong> {this.props.reserved}</div>
                <div className="created_at"><strong>Created:</strong> {this.props.created_at}</div>
                <div className="payload" title={this.props.payload}>{payload.data.command.substr(0, 140)}</div>
            </div>
        )
    }
});

var element = document.querySelector('#jobs-feed');
if (element) ReactDOM.render(<JobsFeed/>, element);
