var React     = require('react');
var ReactDOM  = require('react-dom');
var Toptip    = require('./libraries/tooltip/Toptip');
var Helpers  = require('../helpers');
var CardEffects = require('./cards/CardEffects');

var Tooltip = React.createClass({
    getInitialState: function() {
        this.toptip = this.props.toptip || new Toptip();
        return {
            name: "",
            card: null,
            reference: this.props.reference
        };
    },
    setTooltipContent: function() {
        if(this.state.card != null) {
            var content = (
                <div className="pgg-tooltip pgg-tooltip-card">
                    <div className="card-head">
                        <span className="cost">{this.state.card.cost}</span>
                        <div className="header">
                            <span className="name">{this.state.card.name}</span>
                            <span className={"rarity rarity-epic" + this.state.card.rarity.toLowerCase()}>{this.state.card.rarity}</span>
                            <span className="type">{this.state.card.type}</span>
                        </div>
                        <i className={"affinity affinity-color pgg pgg-affinity-" + this.state.card.affinity.toLowerCase()}></i>
                    </div>
                    <div className="content">
                        <CardEffects card={this.state.card} />
                    </div>
                </div>
            );
            var toptip = document.getElementById("toptip");
            ReactDOM.render(content, toptip);
        } else {
            Helpers.ajax({
                type: 'GET',
                url: '/api/v1/cards/search/' + this.state.reference,
                cache : true
            }).then(function(response) {
                this.setState({
                    name: response.data.name,
                    card: response.data
                });

                var content = (
                    <div className="pgg-tooltip pgg-tooltip-card">
                        <div className="card-head">
                            <span className="cost">{response.data.cost}</span>
                            <div className="header">
                                <span className="name">{response.data.name}</span>
                                <span className={"rarity rarity-epic" + response.data.rarity.toLowerCase()}>{response.data.rarity}</span>
                                <span className="type">{response.data.type}</span>
                            </div>
                            <i className={"affinity affinity-color pgg pgg-affinity-" + response.data.affinity.toLowerCase()}></i>
                        </div>
                        <div className="content">
                            <CardEffects card={response.data} />
                        </div>
                    </div>
                );
                var toptip = document.getElementById("toptip");
                ReactDOM.render(content, toptip);

            }.bind(this));
        }

    },
    showTooltip: function() {
        this.toptip.showTooltip();
    },
    hideTooltip: function() {
        this.toptip.hideTooltip();
    },
    render: function() {

        return (
            <a href={"/cards/" + this.state.reference }
               onMouseEnter={this.setTooltipContent}
               onMouseOver={this.showTooltip}
               onMouseLeave={this.hideTooltip}>
                { this.state.reference }
            </a>
        )
    }
});

var element = document.getElementsByClassName('pgg-trigger-tooltip');
if(element.length > 0) {
    for(var i = 0; i < element.length; i++) {
        ReactDOM.render(<Tooltip reference={element[i].dataset.ref} />, element[i]);
    }
}