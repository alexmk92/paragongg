var React = require('react');
var CardTooltip = require('../Tooltip');

var CardPreview = React.createClass({
    getInitialState: function() {
        return {
            tooltip : null
        }
    },
    focused: function(event) {
        if(this.state.tooltip) {
            this.state.tooltip.abortClose()
        } else {
            this.setState({
                tooltip : new CardTooltip({ targetNode : event.target, parentNodeName : "card-preview", uniqueId : this.props.card.name, dataURL : "/api/v1/cards/find/"+ this.props.card.code })
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
        if(this.props.redirectsOnClick)
            window.location = "/cards/" + this.props.card.name;
        else {
            this.props.onCardClicked(this.props.card);
        }
    },
    render: function() {
        var divStyle = {
            backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/cards/' + this.props.card.code + '/background_small.png)'
        };
        var className = "card-preview ";
        if(typeof this.props.card.owned !== 'undefined') {
            className += (this.props.card.owned) ? "owned" : "missing";
        }
        return (
                <li onClick={this.showDetail} onMouseOver={this.focused} onMouseLeave={this.blur} className={className} style={divStyle}>
                    <a href={ "/cards/" + this.props.card.name }>
                    <div className="card-name">{this.props.card.name}</div>
                    </a>
                </li>

        )
    }
});

module.exports = CardPreview;

