var React = require('react');
var CardTooltip = require('../Tooltip');

var CardPreview = React.createClass({
    getInitialState: function() {
        return {
            tooltip : null
        }
    },
    focused: function(event) {
        var _this = this;
        if(_this.state.tooltip) {
            _this.state.tooltip.abortClose()
        } else {
            _this.setState({
                tooltip : new CardTooltip({ targetNode : event.target, parentNodeName : "card-preview", uniqueId : _this.props.name, dataURL : "/api/v1/cards/find/"+ _this.props.code })
            });
        }
    },
    blur: function(event) {
        var _this = this;
        if(_this.state.tooltip) {
            _this.state.tooltip.destructor(function(payload) {
                _this.state.tooltip = payload.targetNode
            })
        } else {
            _this.state.tooltip = null;
        }
    },
    showDetail: function(event) {
        event.preventDefault();
        window.location = "/cards/" + this.props.name;
    },
    render: function() {
        var divStyle = {
            backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/' + this.props.code + '/background_small.png)'
        };
        var className = "card-preview ";
        if(typeof this.props.owned !== 'undefined') {
            className += (this.props.owned) ? "owned" : "missing";
        }
        return (
                <li onClick={this.showDetail} onMouseOver={this.focused} onMouseLeave={this.blur} className={className} style={divStyle}>
                    <a href={ "/cards/" + this.props.name }>
                    <div className="card-name">{this.props.name}</div>
                    </a>
                </li>

        )
    }
});

module.exports = CardPreview;

