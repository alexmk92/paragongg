var React = require('react');

var CostCurve = React.createClass({
    render: function() {
        return(
            <div className="sidebox panel cf">
                <div className="title-wrapper">
                    <h3>COST CURVE</h3>
                </div>
                <div className="graph-wrapper">

                </div>
            </div>
        );
    }
});

module.exports = CostCurve;