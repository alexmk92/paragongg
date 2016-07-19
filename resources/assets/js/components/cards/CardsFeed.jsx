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
            cost_order : "ASC",
            cards : [],
            shouldResetCardFilter: false
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(nextProps.stickTopOnMobile !== this.props.stickTopOnMobile) {
            return true;
        }
        if(nextState.cost_order !== this.state.cost_order) {
            return true;
        }
        if(nextProps.affinities !== this.props.affinities) {
            return true;
        }
        if(nextState.cards.length === this.state.cards.length) {
            if(nextState.cards.length > 0 && this.state.cards.length > 0) {
                return false;
            } else {
                return true;
            }
        }

        return this.state !== nextState;
    },
    renderCards : function(newCards, costOrder) {
        this.setState({cards: newCards, cost_order : costOrder});
    },
    onCardClicked : function(card) {
        this.props.onCardClicked(card);
    },
    getOwnedCardCount: function() {
        var owned = this.props.cards.filter(function (card){
            return card.owned == true;
        });
        return owned.length;
    },
    resetCardFilter: function() {
        this.setState({ shouldResetCardFilter : !this.state.shouldResetCardFilter })
    },
    renderCardList: function() {
        if(this.state.cards.length > 0) {
            return (
                <ul className="card-list">
                    <FlipMove>
                        {this.state.cards}
                    </FlipMove>
                </ul>
            );
        } else {
            return (
                <p>Sorry, there are no cards that match that filter, <a href="#" onClick={this.resetCardFilter}>click here to reset</a></p>
            )
        }
    },
    render: function() {
        var title = this.props.showTitle ? <h1>Paragon Cards</h1> : "";
        var stickTop = this.props.stickTopOnMobile ? "fixed" : "";
        var doneMobileButton = "";
        if(this.props.stickTopOnMobile) {
            doneMobileButton = (
                <div id="confirm-search-button" onClick={this.props.onDismissFilter}>
                    <span>DONE SEARCHING <i className="fa fa-close"></i></span>
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
                                 totalCardCount={ this.props.cards.length }
                                 ownedCardCount={ this.getOwnedCardCount() }
                                 onFilterChanged={this.renderCards}
                                 cardsRedirectOnClick={ this.props.cardsRedirectOnClick }
                                 onCardClicked={this.onCardClicked}
                                 shouldResetFilter={this.state.shouldResetCardFilter}
                                 onCardFilterReset={this.resetCardFilter}
                    />
                    { doneMobileButton }
                </div>
                <div className="wrapper">
                    { this.renderCardList() }
                </div>
            </div>
        )
    }
});

module.exports = CardsFeed;

var element = document.querySelector('#cards-feed');
if(element) ReactDOM.render(<CardsFeed cards={CARDS} showTitle={true} cardsRedirectOnClick={true} />, element);
