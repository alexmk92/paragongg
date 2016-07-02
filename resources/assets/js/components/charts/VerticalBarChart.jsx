var React = require('react');
var Highcharts = require('highcharts');

var VerticalBarChart = React.createClass({
    componentDidMount: function() {
        var theme = this.getBaseTheme();
        this.renderChart(theme);
    },
    componentDidUpdate: function() {
        this.chart = this.renderChart(this.getBaseTheme());
    },
    componentWillUnmout: function() {
        this.chart.destroy();
    },
    getBaseTheme: function() {
        return {
            colors: this.props.colors || ["#ff6f00", "#64bf22", "#42a9e8", "#aa2ed3", "#2ed3ba", "#e634c2", "#e4e22e"],
            chart: {
                style: {
                    fontFamily: "Roboto Condensed, sans-serif"
                }
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
                        fontFamily : "Roboto",
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
                    fillOpacity: 0.25,
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
    },
    renderChart: function(theme) {
        Highcharts.setOptions(theme);
        var _this = this;
        this.chart = new Highcharts.Chart({
            chart: {
                renderTo : this.props.container || 'horizontal-bar-container',
                type : 'column',
                backgroundColor : 'rgba(0, 0, 0, 0)'
            },
            credits: {
                enabled: false
            },
            title : {
                text: ''
            },
            xAxis: {
                labels : {
                    enabled: true,
                    useHTML: true
                },
                title: {
                    enabled: false
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                tickLength: 0,
                minorTickLength: 0,
                tickWidth: 0,
                type : 'category'
            },
            yAxis: {
                labels : {
                    enabled: false
                },
                title: {
                    enabled: false
                },
                endOnTick: false,
                tickLength: 0,
                minorTickLength: 0,
                minorGridLineWidth: 0,
                gridLineColor: 'transparent',
                lineColor: 'transparent',
                min: 0,
                max : this.props.max || 10
            },
            tooltip: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    animation: (this.props.animated === true ? true : false)
                },
                column: {
                    grouping: true,
                    groupPadding:0,
                    pointWidth:28,
                    pointPadding: 0,
                    dataLabels: {
                        enabled : true,
                        crop: false,
                        overflow: 'none',
                        inside: true,
                        color: 'white',
                        useHTML: true,
                        style : {
                            textShadow: false,
                        },
                        formatter: function () {
                            if (this.series.name)
                                return '<span style="text-align: center; margin-top: -15px; display: block; text-transform: uppercase; color:white; font-weight: 100; font-size: 14px; width: 20px; height: 20px; background: rgba(0, 0, 0, 0.4); border-radius: 50%;">' + this.point.y + '</span>';
                            else return '';
                        }
                    }
                }
            },
            series: [{ data : this.props.series.data }] || [
                {
                    data: [297]
                },
                {
                    data: [55]
                },
                {
                    data: [107]
                }
            ]
        });
    },
    render: function() {
        var styles = { width : this.props.width || "500px", height: this.props.height || "170px" };
        return (
            <div style={ styles } id={ this.props.container || "horizontal-bar-container" }>
            </div>
        );
    }
});

module.exports = VerticalBarChart;