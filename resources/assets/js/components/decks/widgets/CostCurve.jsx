var React = require('react');
var VerticalBarChart = require('../../charts/VerticalBarChart');
var Helpers = require('../../../helpers');

var CostCurve = React.createClass({
    componentWillReceiveProps: function(nextProps, nextState) {
        console.log("NEXT PROPS COST CURVE: ", nextProps);
    },
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
        var collection = [];
        if(typeof this.props.deck.all === "undefined")
            collection = this.props.deck;
        else
            collection = this.props.deck.cards.all;

        collection.forEach(function(card) {
            // Push for maximum possible:
            console.log("LOOPING WITH CARD: ", card);
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
                    <VerticalBarChart animated={this.props.animateChart} container="cost-curve-container" max={costCurveData.max} useValue={false} width={ costCurveData.chartWidth } height={ costCurveData.chartHeight } colors={ costCurveData.chartColors } series={costCurveData} />
                </div>
            </div>
        );
    }
});

module.exports = CostCurve;