var React = require('react');
var ReactDOM = require('react-dom');
var FlipMove = require('react-flip-move');
var CardTooltip = require('../CardTooltip');
var CardFilter = require('./CardsFilter');
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
    /*
    shouldComponentUpdate: function(nextProps, nextState) {
        console.log("Should we update? " + nextState.cards === this.state.cards);
        return nextState.cards === this.state.cards;
    },
    */
    renderCards : function(newCards) {
        this.setState({cards: newCards});
    },
    render: function() {
        return(
            <div>
                <h2>Paragon Cards</h2>
                <div id="filter">
                    <CardFilter cards={this.props.cards} onFilterChanged={this.renderCards} />
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

var element = document.querySelector('#cards-feed');
if(element) ReactDOM.render(<CardsFeed cards={CARDS}/>, element);
