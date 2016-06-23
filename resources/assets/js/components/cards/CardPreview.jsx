var React = require('react');
var Helpers = require('../../helpers');

var CardPreview = React.createClass({
    getInitialState: function() {
        return {
            tooltip : null
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
            backgroundImage: 'url(' + Helpers.S3URL() + 'images/cards/' + this.props.card.code + '/' + this.props.card.background + '/background_medium.png)'
        };
        var className = "card-preview ";
        if(typeof this.props.card.owned !== 'undefined') {
            className += (this.props.card.owned) ? "owned" : "missing";
        }
        return (
                <li onClick={this.showDetail}
                    onMouseEnter={this.props.onMouseEnter}
                    onMouseOver={this.props.onMouseOver}
                    onMouseLeave={this.props.onMouseLeave}
                    className={className} style={divStyle}>
                    <a href={ "/cards/" + this.props.card.name }>
                        <div className="card-name">{this.props.card.name}</div>
                    </a>
                </li>
        )
    }
});

module.exports = CardPreview;

