var React = require('react');

var Build = React.createClass({
   render: function() {
       return (
            <div>
                <h2>{ this.props.build.code || "" }</h2>
                <ul className="build-list">
                    <li id="c1" className="active"><span className="slot-label">Active</span></li>
                    <li id="c2" className="active"><span className="slot-label">Active</span></li>
                    <li id="c3" className="active"><span className="slot-label">Active</span></li>
                    <li id="c4" className="active"><span className="slot-label">Active</span></li>
                    <li id="c5" className="passive"><span className="slot-label">Passive</span></li>
                    <li id="c6" className="passive"><span className="slot-label">Passive</span></li>
                </ul>
            </div>
       )
   }
});

module.exports = Build;