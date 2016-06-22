var React = require('react');
var Highcharts = require('highcharts');
require("highcharts/highcharts-more")(Highcharts);


var SpiderWebChart = React.createClass({
    componentDidMount: function() {
        var options = this.props.options || {
                
            };
        this.renderChart();
    },
    componentWillUnmout: function() {
        this.chart.destroy();
    },
    renderChart: function() {
        this.chart = new Highcharts.Chart({
            chart: {
                renderTo : this.props.container || 'spider-web-container',
                polar: true,
                type : 'area'
            },
            title : {
                text: ''
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: ['HEALING', 'DPS', 'CROWD CONTROL', 'TANKING',
                    'DEFENSE', 'REGEN'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            tooltip: {
                shared: true,
                valuePrefix: '$'
            },

            legend: {
                align: 'right',
                verticalAlign: 'top',
                y: 100,
                layout: 'vertical'
            },
            series: [{
                name: 'Allocated Budget',
                data: [43000, 19000, 60000, 35000, 17000, 10000],
                pointPlacement: 'on'
            }, {
                name: 'Actual Spending',
                data: [50000, 39000, 42000, 31000, 26000, 14000],
                pointPlacement: 'on'
            }]
        })
    },
    render: function() {
        return (
            <div id={ this.props.container || "spider-web-container" }>
            </div>
        );
    }
});

module.exports = SpiderWebChart;