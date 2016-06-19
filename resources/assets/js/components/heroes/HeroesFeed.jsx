var React = require('react');
var ReactDOM = require('react-dom');
var FlipMove = require('react-flip-move');
var HeroesFilter = require('./HeroesFilter');
var HeroPreview = require('./HeroPreview');

var HeroesFeed = React.createClass({
    getInitialState: function(){
        return {
            filter_owned : false,
            filter_affinity : 'All',
            filter_type : 'All',
            search_term : "",
            heroes : []
        }
    },
    filter: function(element) {
        switch(element.target.name) {
            case 'owned':
                this.setState({filter_owned: element.target.checked});
                break;
            case 'affinity':
                this.setState({filter_affinity: element.target.value});
                break;
            case 'type':
                this.setState({filter_type: element.target.value});
                break;
        }
    },
    shouldBeVisible: function(hero) {
        return true;
    },
    renderHeroes : function(heroes) {
        this.setState({heroes: heroes});
    },
    inputChanged: function(event) {
        var _this = this;

        event.preventDefault();
        _this.setState({ search_term : event.target.value });
    },
    getTotalHeroCount: function() {
        if (this.props.affinities) {
            return this.props.heroes.length
        }
        else {
            return this.props.heroes.length
        }
    },
    render: function() {
        return(
            <div>
                <h1>Paragon Heroes</h1>
                <div id="filter">
                    <HeroesFilter
                        forceRedraw={this.props.forceRedraw || null}
                        affinities={this.props.affinities || null}
                        tooltip={this.props.tooltip || null}
                        heroes={this.props.heroes}
                        visibleHeroCount={ this.props.heroes.length }
                        totalHeroCount={ this.getTotalHeroCount() }
                        onFilterChanged={this.renderHeroes}
                        cardsRedirectOnClick={ this.props.cardsRedirectOnClick }
                        onCardClicked={this.onCardClicked}
                    />
                </div>
                <div className="wrapper"> 
                    <ul className="hero-list">
                        <FlipMove enterAnimation="fade" leaveAnimation="fade">
                            {this.state.heroes}
                        </FlipMove>
                    </ul>
                </div>
            </div>
        )
    }
});

var element = document.querySelector('#heroes-feed');
if(element) ReactDOM.render(<HeroesFeed heroes={HEROES}/>, element);
