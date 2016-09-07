var React = require('react');
var ReactDOM = require('react-dom');
var FlipMove = require('react-flip-move');

var JobsFeed = React.createClass({
    getInitialState: function () {
        return {
            queue: []
        }
    },
    componentDidMount: function () {
        this.getQueue();
        setInterval(this.getQueue, 1000);
    },
    getQueue: function () {
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
                    _this.setState({queue: JSON.parse(httpRequest.responseText)});
                }
            }
        };

        httpRequest.send();
    },
    render: function () {
        console.log(this.state.queue);
        return (
            <div>
                <h3>Queue statistics</h3>
                <div className="content-wrapper">
                    <table className="stats">
                        <tr>
                            <td>
                                <label>Jobs in queue</label>
                                <span>{this.state.queue.ApproximateNumberOfMessages}</span>
                            </td>
                            <td>
                                <label>Jobs processing</label>
                                <span>{this.state.queue.ApproximateNumberOfMessagesNotVisible}</span>
                            </td>
                        </tr>
                    </table>



                </div>
            </div>
        )
    }
});

var element = document.querySelector('#jobs-feed');
if (element) ReactDOM.render(<JobsFeed/>, element);
