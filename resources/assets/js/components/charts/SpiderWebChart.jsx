var React = require('react');
var Highcharts = require('highcharts');
require("highcharts/highcharts-more")(Highcharts);


var SpiderWebChart = React.createClass({
    componentDidMount: function() {
        var theme = this.props.options || {
            colors: ["#ff6f00", "#64bf22", "#42a9e8", "#aa2ed3", "#2ed3ba", "#e634c2", "#e4e22e"],
            chart: {
                style: {
                    fontFamily: "Roboto, sans-serif"
                },
                plotBorderColor: '#5a606f'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                gridLineColor: '#343a4a',
                labels: {
                    style: {
                        fontFamily : "Roboto Condensed",
                        color: '#fff'
                    }
                },
                lineColor: '#343a4a',
                minorGridLineColor: '#343a4a',
                tickColor: '#343a4a',
                title: {
                    style: {
                        color: '#A0A0A3'

                    }
                }
            },
            yAxis: {
                gridLineColor: '#343a4a',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#343a4a',
                minorGridLineColor: '#343a4a',
                tickColor: '#343a4a',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                series: {
                    fillOpacity: 0.20,
                    dataLabels: {
                        color: '#B0B0B3'
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            legend: {
                enabled : false,
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },

            // special colors for some of the
            legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
            background2: '#505053',
            dataLabelsColor: '#B0B0B3',
            textColor: '#C0C0C0',
            contrastTextColor: '#F0F0F3',
            maskColor: 'rgba(255,255,255,0.3)'
        };
        this.renderChart(theme);
    },
    componentWillUnmout: function() {
        this.chart.destroy();
    },
    renderChart: function(theme) {
        Highcharts.setOptions(theme);
        this.chart = new Highcharts.Chart({
            chart: {
                renderTo : this.props.container || 'spider-web-container',
                polar: true,
                type : 'area',
                backgroundColor : 'rgba(0, 0, 0, 0)'
            },
            credits: {
                enabled: false
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
            series: this.props.data || [{
                name: 'Allocated Budget',
                data: [43000, 19000, 60000, 35000, 17000, 10000],
                pointPlacement: 'on'
            }, {
                name: 'Actual Spending',
                data: [50000, 39000, 42000, 31000, 26000, 14000],
                pointPlacement: 'on'
            }]
        });
    },
    render: function() {
        var styles = { width : this.props.width || "300px", height: this.props.height || "300px" };
        return (
            <div style={ styles } id={ this.props.container || "spider-web-container" }>
            </div>
        );
    }
});

module.exports = SpiderWebChart;