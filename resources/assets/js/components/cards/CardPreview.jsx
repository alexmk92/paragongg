var React = require('react');
var ReactDOM = require('react-dom');
var FlipMove = require('react-flip-move');
var CardTooltip = require('../CardTooltip');

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
    render: function() {
        var _this = this;

        var divStyle = {
            backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/' + _this.props.code + '/background_small.png)'
        };
        var className = "card-preview ";
        if(typeof _this.props.owned !== 'undefined') {
            className += (_this.props.owned) ? "owned" : "missing";
        }
        return (
            <li onClick={this.props.onSelect} onMouseOver={_this.focused} onMouseLeave={_this.blur} className={className} style={divStyle}>
                <div className="card-name">{_this.props.name}</div>
            </li>
        )
    }
});

module.exports = CardPreview;