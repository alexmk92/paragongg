var React = require("react");
var Helpers = require("../../helpers");

var HeroStatSummary = React.createClass({
    getInitialState : function() {
        return {}
    },
    render: function() {
        var links = this.props.links.map(function(link) {
            switch(link.type) {
                case "WIN/LOSS" :
                    return (
                        <p key={Helpers.uuid()} className="stat-link">
                            W <span style={{ color : "#8deb1d"}}>{link.values.wins}</span>&nbsp;
                            L <span style={{ color : "#ec3030"}}>{ link.values.losses }</span>
                        </p>
                    );
                    break;
                case "DECK" :
                    
                    break;
                case "BUILD" :

                    break;
            }
            return link.label;
        });
        return(
            <div key={Helpers.uuid()} id={this.props.id} className="hero-stat-summary">
                <div className="stat-content-wrapper">
                    <span>{ this.props.subtitle.toUpperCase() }</span>
                    <p><a href={this.props.title.href} target="_blank">{ this.props.title.value.toUpperCase() }</a></p>
                    { links }
                </div>
            </div>
        );
    }
});

module.exports = HeroStatSummary;