var React = require('react');
var ReactDOM = require('react-dom');
var VerticalBarChart = require('../../charts/VerticalBarChart');

var DeckSidebarCostCurve = React.createClass({
    componentWillReceiveProps: function(nextProps, nextState) {
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

        costCounts[1] = { label : 1, count : 0 };
        costCounts[2] = { label : 2, count : 0 };
        costCounts[3] = { label : 3, count : 0 };
        costCounts[4] = { label : 4, count : 0 };
        costCounts[5] = { label : 5, count : 0 };
        costCounts[6] = { label : 6, count : 0 };
        costCounts[7] = { label : 7, count : 0 };
        costCounts[8] = { label : 8, count : 0 };
        costCounts[9] = { label : 9, count : 0 };
        costCounts[10] = { label : 10, count : 0 };

        // On a null build, show deck affinity weighting
        var collection = [];
        if(typeof this.props.deck.cards === "undefined") {
            collection = this.props.deck;
        }
        else {
            collection = this.props.deck.cards.all
        }

        collection.forEach(function(card) {
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
                comparisonData.chartWidth += 28;
                comparisonData.chartColors.push("#42a9e8");
            }
        }

        return comparisonData;
    },
    render: function() {
        var costCurveData = this.getCostCurveData();
        return(
            <div id="cost-curve-widget" className="cf">
                <div className="title-wrapper gutter-bottom">
                    <h3>COST CURVE</h3>
                </div>
                <div id="cost-curve-wrapper">
                    <VerticalBarChart animated={this.props.animateChart} container="cost-curve-container" max={costCurveData.max} useValue={false} width={ costCurveData.chartWidth } height={ costCurveData.chartHeight } colors={ costCurveData.chartColors } series={costCurveData} />
                </div>
            </div>
        );
    }
});

module.exports = DeckSidebarCostCurve;

var element = document.querySelector("#deck-sidebar-cost-curve");
if(element) ReactDOM.render( <DeckSidebarCostCurve deck={DECK} animateChart={true}/>, element);
