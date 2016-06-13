var React = require("react");
var Highcharts = require("highcharts");
var Chart = require("../Chart");
var ChartTheme = require("../../lib/ChartThemes");
var HeroStatSummary = require("./HeroStatSummary");

var HeroGraph = React.createClass({
    getInitialState: function () {
        return {
            backgroundParallax: null,
            progressCircles: [
                {
                    container: "banGauge",
                    options: {
                        chart: {
                            type: 'solidgauge',
                            marginTop: 0
                        },

                        title: {
                            text: '',
                            style: {
                                fontSize: '0px'
                            }
                        },

                        tooltip: {
                            borderWidth: 0,
                            backgroundColor: 'none',
                            shadow: false,
                            style: {
                                fontSize: '16px'
                            },
                            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: 200">{point.y}%</span>',
                            positioner: function (labelWidth, labelHeight) {
                                return {
                                    x: 160 - labelWidth / 2,
                                    y: 160
                                };
                            }
                        },

                        pane: {
                            startAngle: 0,
                            endAngle: 360,
                            background: [{ // Track for Stand
                                outerRadius: '49%',
                                innerRadius: '51%',
                                backgroundColor: "#13161f",
                                borderWidth: 0
                            }]
                        },

                        yAxis: {
                            min: 0,
                            max: 100,
                            lineWidth: 0,
                            tickPositions: []
                        },

                        plotOptions: {
                            solidgauge: {
                                borderWidth: '8px',
                                dataLabels: {
                                    enabled: false
                                },
                                linecap: 'round',
                                stickyTracking: false
                            }
                        },

                        series: [{
                            name: 'Stand',
                            borderColor: Highcharts.getOptions().colors[2],
                            data: [{
                                color: Highcharts.getOptions().colors[2],
                                radius: '50%',
                                innerRadius: '50%',
                                y: 50
                            }]
                        }]
                    }
                },
                {
                    container: "winGauge",
                    options: {
                        chart: {
                            type: 'solidgauge',
                            marginTop: 0
                        },

                        title: {
                            text: '',
                            style: {
                                fontSize: '0px'
                            }
                        },

                        tooltip: {
                            borderWidth: 0,
                            backgroundColor: 'none',
                            shadow: false,
                            style: {
                                fontSize: '16px'
                            },
                            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: 200">{point.y}%</span>',
                            positioner: function (labelWidth, labelHeight) {
                                return {
                                    x: 160 - labelWidth / 2,
                                    y: 160
                                };
                            }
                        },

                        pane: {
                            startAngle: 0,
                            endAngle: 360,
                            background: [{ // Track for Stand
                                outerRadius: '49%',
                                innerRadius: '51%',
                                backgroundColor: "#13161f",
                                borderWidth: 0
                            }]
                        },

                        yAxis: {
                            min: 0,
                            max: 100,
                            lineWidth: 0,
                            tickPositions: []
                        },

                        plotOptions: {
                            solidgauge: {
                                borderWidth: '8px',
                                dataLabels: {
                                    enabled: false
                                },
                                linecap: 'round',
                                stickyTracking: false
                            }
                        },

                        series: [{
                            name: 'Stand',
                            borderColor: Highcharts.getOptions().colors[2],
                            data: [{
                                color: Highcharts.getOptions().colors[2],
                                radius: '50%',
                                innerRadius: '50%',
                                y: 50
                            }]
                        }]
                    }
                },
                {
                    container: "pickGauge",
                    options: {
                        chart: {
                            type: 'solidgauge',
                            marginTop: 0
                        },

                        title: {
                            text: '',
                            style: {
                                fontSize: '0px'
                            }
                        },

                        tooltip: {
                            borderWidth: 0,
                            backgroundColor: 'none',
                            shadow: false,
                            style: {
                                fontSize: '16px'
                            },
                            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: 200">{point.y}%</span>',
                            positioner: function (labelWidth, labelHeight) {
                                return {
                                    x: 160 - labelWidth / 2,
                                    y: 160
                                };
                            }
                        },

                        pane: {
                            startAngle: 0,
                            endAngle: 360,
                            background: [{ // Track for Stand
                                outerRadius: '49%',
                                innerRadius: '51%',
                                backgroundColor: "#13161f",
                                borderWidth: 0
                            }]
                        },

                        yAxis: {
                            min: 0,
                            max: 100,
                            lineWidth: 0,
                            tickPositions: []
                        },

                        plotOptions: {
                            solidgauge: {
                                borderWidth: '8px',
                                dataLabels: {
                                    enabled: false
                                },
                                linecap: 'round',
                                stickyTracking: false
                            }
                        },

                        series: [{
                            name: 'Stand',
                            borderColor: Highcharts.getOptions().colors[2],
                            data: [{
                                color: Highcharts.getOptions().colors[2],
                                radius: '50%',
                                innerRadius: '50%',
                                y: 50
                            }]
                        }]
                    }
                }
            ],
            statGraph: {
                container: "stat-spline",
                options: {
                    chart: {
                        type: 'areaspline'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        min: 0.5,
                        max: 7 - 1.5,

                        categories: [
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                            'Sunday'
                        ],
                        plotBands: [{ // visualize the weekend
                            from: 2.5,
                            to: 3.5,
                            color: 'rgba(255, 255, 255, .025)'
                        }]
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    series: [{
                        name: 'Wins',
                        data: [3, 4, 3, 5, 4, 10, 12]
                    }, {
                        name: 'Picks',
                        data: [1, 3, 4, 3, 3, 5, 4]
                    }, {
                        name: 'Bans',
                        data: [4, 9, 3, 2, 8, 1, 12]
                    }]
                }
            }
        }
    },
    render: function () {
        return (
            <div>
                <Chart key={"chart_" + this.state.statGraph.container}
                       container={this.state.statGraph.container}
                       options={this.state.statGraph.options}
                       theme={ChartTheme.areaSplineDark()}
                       hideTooltip={true}
                />
                <div id="top-content-wrapper">
                    <HeroStatSummary id="topHero"
                                     key="topHero"
                                     subtitle={"TOP " + HERO.name + " PLAYER"}
                                     title={ {value : "BEECKON", href : "#"} }
                                     href="#"
                                     links={[
                                         { type : "WIN/LOSS", values : { wins : 147, losses : 152 }}
                                     ]}
                    />
                    <HeroStatSummary id="topDeck"
                                     key="topDeck"
                                     subtitle={"TOP " + HERO.name + " DECK"}
                                     title={ {value : "BEECKON", href : "#"} }
                                     href="#"
                                     links={[
                                         { type : "WIN/LOSS", values : { wins : 147, losses : 152 }}
                                     ]}
                    />
                    <HeroStatSummary id="topBuild"
                                     key="topBuild"
                                     subtitle={"TOP " + HERO.name + " BUILD"}
                                     title={ {value : "BEECKON", href : "#"} }
                                     href="#"
                                     links={[
                                         { type : "WIN/LOSS", values : { wins : 147, losses : 152 }}
                                     ]}
                    />
                </div>
            </div>
        );
    }
});

module.exports = HeroGraph;

