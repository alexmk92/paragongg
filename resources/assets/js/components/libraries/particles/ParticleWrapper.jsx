var React = require('react');
var ReactDOM = require('react-dom');
var ParticleTheme = require('../../../lib/ParticleThemes');

require('particles.js');

var ParticleWrapper = React.createClass({
    componentDidMount: function() {
        particlesJS('particle-div', ParticleTheme.embersRising());
    },
    render: function() {
        return (
            <div id="particle-div">qwe</div>
        )
    }
});

var element = document.getElementById('particle-wrapper');
if(element) ReactDOM.render(<ParticleWrapper theme={element.dataset.theme}/>, element);
