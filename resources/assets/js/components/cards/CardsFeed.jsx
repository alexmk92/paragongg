var React = require('react');
var ReactDOM = require('react-dom');
var FlipMove = require('react-flip-move');
var CardsFilter = require('./CardsFilter');
var CardPreview = require('./CardPreview');

var CardsFeed = React.createClass({
    getInitialState: function(){
        return {
            filter_owned : false,
            filter_affinity : 'All',
            filter_type : 'All',
            search_term : "",
            cards : []
        }
    },
    renderCards : function(newCards) {
        this.setState({cards: newCards});
    },
    onCardClicked : function(card) {
        this.props.onCardClicked(card);
    },
    getTotalCardCount: function() {
        if (this.props.affinities) {
            return this.props.cards.length
        }
        else {
            return this.props.cards.length
        }
    },
    render: function() {
        var title = this.props.showTitle ? <h1>Paragon Cards</h1> : "";
        var stickTop = this.props.stickTopOnMobile ? "fixed" : "";
        var doneMobileButton = "";
        if(this.props.stickTopOnMobile) {
            doneMobileButton = (
                <div id="confirm-search-button" onClick={this.props.onDismissFilter}>
                    <span>DONE SEARCHING</span>
                </div>
            );
        }
        return(
            <div>
                { title }
                <div id="filter" className={stickTop}>
                    <CardsFilter stickTopOnMobile={this.props.stickTopOnMobile || null}
                                 forceRedraw={this.props.forceRedraw || null}
                                 affinities={this.props.affinities || null}
                                 tooltip={this.props.tooltip || null}
                                 cards={this.props.cards}
                                 visibleCardCount={ this.state.cards.length }
                                 totalCardCount={ this.getTotalCardCount() }
                                 onFilterChanged={this.renderCards}
                                 cardsRedirectOnClick={ this.props.cardsRedirectOnClick }
                                 onCardClicked={this.onCardClicked}
                    />
                    { doneMobileButton }
                </div>
                <div className="wrapper">
                    <ul className="card-list">
                        <FlipMove>
                            {this.state.cards}
                        </FlipMove>
                    </ul>
                </div>
            </div>
        )
    }
});

module.exports = CardsFeed;

var element = document.querySelector('#cards-feed');
if(element) ReactDOM.render(<CardsFeed cards={CARDS} showTitle={true} cardsRedirectOnClick={true} />, element);
