var React = require('react');
var ReactDOM = require('react-dom');
var FlipMove = require('react-flip-move');
var CardTooltip = require('../CardTooltip');

var HeroesFeed = React.createClass({
    getInitialState: function(){
        return {
            filter_owned : false,
            filter_affinity : 'All',
            filter_type : 'All',
            search_term : ""
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
    inputChanged: function(event) {
        var _this = this;

        event.preventDefault();
        _this.setState({ search_term : event.target.value });
    },
    render: function() {
        var _this = this;

        var heroes = [];
        this.props.heroes.forEach(function(hero) {

            if(_this.shouldBeVisible(hero) == true) {
                heroes.push(<HeroPreview affinity={hero.affinities}
                                        key={hero.code}
                                        code={hero.code}
                                        hero={hero.roles}
                                        name={hero.name}
                />);
            }
        }, _this);
        // Sort by name
        //heroes.sort(function(a,b) { return a.cost - b.cost; });
        return(
            <div>
                <h1>Paragon Heroes</h1>
                <i className="pgg pgg-affinity-corruption"></i>
                <h5>{heroes.length} total heroes</h5>
                <div className="wrapper">
                    <ul className="hero-list">
                        <FlipMove>
                            {heroes}
                        </FlipMove>
                    </ul>
                </div>
            </div>
        )
    }
});

var HeroPreview = React.createClass({
    render: function() {
        var divStyle = {
            backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/' + this.props.code + '/portrait.png)'
        };
        return (
            <a href={ "/heroes/" + this.props.name.toLowerCase() }>
                <li className="hero-preview" style={divStyle}>
                    <div className="hero-preview-title">
                        <span className="title">{this.props.name}</span>
                    </div>
                </li>
            </a>
        )
    }
});

var element = document.querySelector('#heroes-feed');
if(element) ReactDOM.render(<HeroesFeed heroes={HEROES}/>, element);
