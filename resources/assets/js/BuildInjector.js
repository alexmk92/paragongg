var React = require('react');
var ReactDOM = require('react-dom');
var BuildPanel = require('./components/decks/BuildPanel');

var TestComponent = React.createClass({
    render: function() {
        return(
            <div>HI THERE</div>
        )
    }
});

window.onload = function() {
    if(DECK) {
        console.log(DECK);
        var article = document.querySelector('.article-body');
        if(article) {
            for(var i = 0; i < article.children.length; i++) {
                var child = article.children[i];
                if(child) {
                    if(child.innerHTML.indexOf('{build') > -1) {
                        var root = document.createElement('div');
                        var buildIndex = parseInt(child.innerHTML.replace(/[^0-9]/g,''));
                        if(!isNaN(buildIndex)) {
                            child.innerHTML = "";
                            child.appendChild(root);
                            ReactDOM.render(<BuildPanel hasStats={false} deck={DECK} buildIndex={buildIndex} />, root);
                        }
                    }
                }
            }
        }
    }
};
//<div id="deck-builds"></div>