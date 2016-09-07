var React = require('react');
var Helpers = require('../../helpers');
var Tooltip = require('../libraries/tooltip/Toptip');
var CardEffects = require('../cards/CardEffects');
var PreloadImage = require('../PreloadImage');

var DeckPreview = React.createClass({
    getInitialState: function() {
        return {
            deckURL : '/decks/' + this.props.deck._id + '/' + this.props.deck.slug
        }
    },
    componentDidMount: function() {
        this.tooltip = this.props.sharedTooltip || new Tooltip();
    },
    showTooltip: function() {
        this.tooltip.showTooltip();
    },
    hideTooltip: function() {
        this.tooltip.hideTooltip();
    },
    renderAffinityBar: function() {
        if(!Helpers.isNullOrUndefined(this.props.deck.affinities)) {
            var total = 0;
            var affinitiesArray = []; // Store to an array of objects so we can sort (currently saved as a single object to work with epics API)

            // We used to save to mongo as an array of affinities, now we save an object, this allows us to render decks using the
            // old format so the index view doesn't break
            if(Object.prototype.toString.call( this.props.deck.affinities ) === '[object Array]') {
                affinitiesArray = this.props.deck.affinities;
            } else {
                for(var k in this.props.deck.affinities) {
                    if(this.props.deck.affinities.hasOwnProperty(k)) {
                        affinitiesArray.push({ name: k, count: this.props.deck.affinities[k] })
                    }
                }
            }

            affinitiesArray.forEach(function(affinityInfo) {
                total += affinityInfo.count;
            });
            affinitiesArray.sort(function(a, b) {
                if (a.count > b.count)
                    return -1;
                if (a.count < b.count)
                    return 1;
                return 0;
            });

            // find the width of each bar
            return affinitiesArray.map(function(affinityInfo) {
                var percentage = ((affinityInfo.count / total) * 100) + "%";
                var affinityClass = "segment " + affinityInfo.name.toLowerCase().trim();
                return (
                    <div key={ "affinity-bar-" + Helpers.uuid() } style={{ width : percentage }} className={ affinityClass }></div>
                )
            });
        }
    },
    getStatLabel: function() {
        // FEATURED BADGE
        var created_at = new Date(this.props.deck.created_at);
        var updated_at = new Date(this.props.deck.updated_at);
        if(this.props.featured === 1)
            return <span className="stat featured">Featured</span>;

        // RECENT BADGE
        var recentUpdatedTimeDiff = Math.abs(updated_at.getTime() - new Date().getTime());
        var recentUpdatedDiffDays = Math.ceil(recentUpdatedTimeDiff / (1000 * 3600 * 24));
        if(updated_at.getTime() > created_at.getTime() && (recentUpdatedDiffDays >= 0 && recentUpdatedDiffDays <= 2))
            return <span className="stat updated">Recently Updated</span>;

        // NEW BADGE
        var timeDiff = Math.abs(created_at.getTime() - new Date().getTime());
        var diffHours = Math.ceil(timeDiff / (1000 * 3600));
        if(diffHours >= 0 && diffHours <= 6)
            return <span className={"stat new"}>New</span>;

        return "";
    },
    getTimeLabel: function() {
        var created_at = new Date(this.props.deck.created_at);
        var updated_at = new Date(this.props.deck.updated_at);

        return updated_at.getTime() > created_at.getTime() ? "last updated" : "created";
    },
    render: function() {
        return (
            <div className="deck-preview-wrapper">
                <a className="deck-preview cf" href={"/decks/" + this.props.deck._id + "/" + this.props.deck.slug}>
                    <div className="deck-hero">
                        <PreloadImage src={ Helpers.S3URL() + "images/heroes/" + this.props.deck.hero.code + "/" + this.props.deck.hero.image + "/portrait_small.png" }
                                      fallbackSrc="assets/images/heroes/null.png"
                        />
                    </div>
                    <div className="deck-details">
                        <div className="title"><h3>{ this.props.deck.title }</h3></div>
                        <div className="details">
                            <span className="emphasis">{ this.props.deck.hero.name }</span> deck by <span className="emphasis">{ this.props.deck.author ? this.props.deck.author.username : "anonymous" }</span> { this.getTimeLabel() } <span className="emphasis">{ Helpers.prettyDate(this.props.deck.updated_at) }</span>
                        </div>
                        <div className="stats">
                            { this.getStatLabel() }
                            <span className="stat"><i className="fa fa-star" aria-hidden="true"></i> { this.props.deck.votes }</span>
                            <span className="stat"><i className="fa fa-eye" aria-hidden="true"></i> { this.props.deck.views }</span>
                        </div>
                    </div>
                </a>
                <div className="affinity-bar">
                    { this.renderAffinityBar() }
                </div>
            </div>
        );
    }
});

module.exports = DeckPreview;
