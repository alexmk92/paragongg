var React = require('react');
var Highcharts = require('highcharts');
var Helpers = require('../../helpers');

var HorizontalBarChart = React.createClass({
    componentDidUpdate: function() {
        this.chart = this.renderChart(this.getBaseTheme());
    },
    shouldComponentUpdate: function(nextProps, nextState) {

        /*
        var matchCount = 0;
        var expectedMatches = this.props.series.parts.length;
        this.props.series.parts.forEach(function(part) {
            console.log(part);
            var matches = false;
            nextProps.series.parts.some(function(nextPart) {
               if(part.start === nextPart.start && part.end === nextPart.end) {
                   matches = true;
                   matchCount += 1;
                   return true;
               }
                return false;
            });
        });
        if(matchCount === expectedMatches)
            return true;

        if(nextProps.series.max === this.props.series.max) {
            return false;
        }
        */
        
        return nextProps !== this.props;
    },
    componentDidMount: function() {
        this.renderChart(this.getBaseTheme());
    },
    componentWillUnmout: function() {
        this.chart.destroy();
    },
    getBaseTheme: function() {
        var theme = this.props.options || {
                colors: this.props.colors || ["#ff6f00", "#64bf22", "#42a9e8", "#aa2ed3", "#2ed3ba", "#e634c2", "#e4e22e"],
                chart: {
                    style: {
                        fontFamily: "Roboto Condensed, sans-serif"
                    },
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

        return theme;
    },
    renderChart: function(theme) {
        Highcharts.setOptions(theme);
        var _this = this;
        this.chart = new Highcharts.Chart({
            chart: {
                renderTo : this.props.container || 'horizontal-bar-container',
                type : 'bar',
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
                    enabled: false
                },
                title: {
                    enabled: false
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                tickLength: 0,
                minorTickLength: 0
            },
            yAxis: {
                labels : {
                    enabled: false
                },
                title: {
                    enabled: false
                },
                tickLength: 0,
                minorTickLength: 0,
                minorGridLineWidth: 0,
                gridLineColor: 'transparent',
                lineColor: 'transparent',
                min: 0,
                max: this.props.max || 999
            },
            tooltip: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0
                },
                bar: {
                    grouping: true,
                    groupPadding:0,
                    pointWidth:45,
                    pointPadding: 0,
                    dataLabels: {
                        enabled: true,
                        inside:true,
                        align: 'left',
                        useHTML: true,
                        color: 'white',
                        style: {
                            fontWeight: 'bold'
                        },
                        verticalAlign: 'middle',
                        formatter: function () {
                            var labelValue = _this.props.useValue ? Helpers.dropZeroesAndDelimitNumbers(this.y) : "";
                            var startText = _this.props.series.parts[this.series.index] ? _this.props.series.parts[this.series.index].start : this.series.name + " (";
                            var endText = _this.props.series.parts[this.series.index] ? _this.props.series.parts[this.series.index].end : "%)";
                            if (this.series.name)
                                return '<span style="margin-left: 0px; text-transform: uppercase; color:white; font-weight: 100; padding: 8px 10px; font-size: 14px; border-radius: 5px; background: rgba(0, 0, 0, 0.4) ">' + startText + labelValue + endText + '</span>';
                            else return '';
                        }
                    }
                }
            },
            series: this.props.series.data
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

module.exports = HorizontalBarChart;