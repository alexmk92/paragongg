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
    render: function() {
        var title = this.props.showTitle ? <h2>Paragon Cards</h2> : "";
        var cards = this.state.cards;
        return(
            <div>
                { title }
                <div id="filter">
                    <CardsFilter cards={this.props.cards}
                                 onFilterChanged={this.renderCards}
                                 cardsRedirectOnClick={ this.props.cardsRedirectOnClick }
                                 onCardClicked={this.onCardClicked}
                    />
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
