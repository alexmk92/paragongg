var React = require('react');
var VerticalBarChart = require('../../charts/VerticalBarChart');
var Helpers = require('../../../helpers');

var CostCurve = React.createClass({
    getCostCurveData: function() {
        var comparisonData = {
            chartHeight : 225,
            chartWidth: 45,
            chartColors : [],
            max : 0,
            parts : [],
            data : []
        };

        var costCounts = [];

        costCounts[0] = { label : 0, count : 0 };
        costCounts[1] = { label : 1, count : 0 };
        costCounts[2] = { label : 2, count : 0 };
        costCounts[3] = { label : 3, count : 0 };
        costCounts[4] = { label : 4, count : 0 };
        costCounts[5] = { label : 5, count : 0 };
        costCounts[6] = { label : 6, count : 0 };
        costCounts[7] = { label : 7, count : 0 };

        // On a null build, show deck affinity weighting
        console.log("THIS IS THE DECK: ", this.props.deck.cards);
        this.props.deck.cards.all.forEach(function(card) {
            // Push for maximum possible:
            if(typeof costCounts[card.cost] !== "undefined") {
                costCounts[card.cost].count += card.quantity;
            }
        });

        for(var key in costCounts) {
            if(costCounts.hasOwnProperty(key)) {
                var costCount = costCounts[key];
                comparisonData.parts.push({
                    start : "<i style='font-size: 16px;' class=''></i> " + costCount.count,
                    end : ""
                });
                if(costCount.count > comparisonData.max) {
                    comparisonData.max = costCount.count
                }
                comparisonData.data.push({
                    name : costCount.label + "CP",
                    y : costCount.count
                });
                comparisonData.chartWidth += 35;
                comparisonData.chartColors.push("#42a9e8");
            }
        }

        return comparisonData;
    },
    render: function() {
        var costCurveData = this.getCostCurveData();
        return(
            <div className="sidebox panel cf">
                <div className="title-wrapper">
                    <h3>COST CURVE</h3>
                </div>
                <div id="cost-curve-wrapper">
                    <VerticalBarChart container="cost-curve-container" max={costCurveData.max} useValue={false} width={ costCurveData.chartWidth } height={ costCurveData.chartHeight } colors={ costCurveData.chartColors } series={costCurveData} />
                </div>
            </div>
        );
    }
});

module.exports = CostCurve;