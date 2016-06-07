var React = require('react');
var ReactDOM = require('react-dom');
var FlipMove = require('react-flip-move');

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
                heroes.push(<HeroPreview affinities={hero.affinities}
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
    getInitialState: function() {
        return {
            affinities: this.props.affinities
        }
    },
    getAffinities: function() {
        var affinities = [];
        this.state.affinities.forEach(function (affinity) {
            affinity = affinity.substring(9).toLowerCase();
            affinities.push(<i key={affinity} className={"pgg pgg-affinity-" + affinity + " affinity-color"} ></i>);
        });
        return affinities;
    },
    render: function() {
        var divStyle = {
            backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/' + this.props.code + '/portrait.png)'
        };
        return (
            <a href={ "/heroes/" + this.props.name.toLowerCase() }>
                <li className="hero-preview" style={divStyle}>
                    <div className="hero-preview-title">
                        <div className="hero-affinities">
                            {this.getAffinities()}
                        </div>
                        <span className="title">{this.props.name}</span>
                    </div>
                </li>
            </a>
        )
    }
});

var element = document.querySelector('#heroes-feed');
if(element) ReactDOM.render(<HeroesFeed heroes={HEROES}/>, element);
