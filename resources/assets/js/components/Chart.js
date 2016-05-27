var React = require("react");
var Highcharts = require("highcharts");
require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/solid-gauge")(Highcharts);

var ChartTheme = require("../lib/ChartThemes");

var Chart = React.createClass({
    getInitialState: function () {
        return {}
    },
    renderChart: function () {
        var _this = this;
        var node = this.refs[this.props.container];
        console.log(this.props);
        console.log(Highcharts.getOptions().colors);
        if (typeof this.props.theme !== "undefined") {
            Highcharts.setOptions(this.props.theme);
        }

        var chart = Highcharts.chart(node, this.props.options);
        if(!this.props.hideTooltip) {
            chart.tooltip.refresh(chart.series[0].points[0]);
        } else {
        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        //return nextProps.model.length > 0;
        return true;
    },
    componentDidUpdate: function () {
        //this.renderChart();
    },
    componentDidMount: function () {
        console.log("UPDATING");
        this.renderChart();
    },
    render: function () {
        return (
            <div id={this.props.container} ref={this.props.container}></div>
        );
    }
});

module.exports = Chart;