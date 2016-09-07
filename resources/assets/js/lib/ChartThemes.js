var Highcharts = require("highcharts");

module.exports = {
    areaSplineDark : function() {
        return Highcharts.theme = {
            colors : ["#8deb1d", "#ec8d30", "#ec3030"],
            chart : {
                backgroundColor: "transparent",
                height: 600
            },
            plotOptions: {
                pointPlacement : "on",
                column : {
                    pointPadding: 0,
                    groupPadding: 0
                },
                areaspline: {
                    fillOpacity: 0.085,
                    lineWidth: 3
                }
            },
            legend : {
                verticalAlign : "top",
                itemStyle : {
                    font: '11pt Roboto Condensed, sans-serif',
                    color: "#5a606f"
                },
                itemHoverStyle : {
                    color: "#fff"
                }
            },
            credits : false,
            tooltip : {
                shared : true,
                animation: true,
                backgroundColor : "rgba(0,0,0,0.7)",
                borderColor : "#3c95cd",
                borderRadius : 5,
                borderWidth: 1,
                style : {
                    font: '12pt Roboto Condensed, sans-serif',
                    color: "#fff"
                }
            },
            yAxis : {
                gridLineColor : "#13161f",
                tickColor: 'rgba(0,0,0,0)'
            },
            xAxis : {
                gridLineColor : "#13161f",
                tickColor: 'rgba(0,0,0,0)',
                lineColor : "#13161f",
                labels : {
                    y: -12,
                    useHTML : true,
                    style : {
                        font: '10pt Roboto Condensed, sans-serif',
                        color : "#fff"
                    }
                }
            }
        }
    },
    gaugeDark: function() {
        return {
            colors: ["#8deb1d", "#ec8d30", "#ec3030"],
            chart: {
                colors: ["#8deb1d", "#ec8d30", "#ec3030"],
                backgroundColor: "transparent",
                style: {
                    fontFamily: "'Roboto Condensed', sans-serif"
                },
                plotBorderColor: '#606063'
            },
            colors: ["#8deb1d", "#ec8d30", "#ec3030"],
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Stand
                    outerRadius: '44%',
                    innerRadius: '56%',
                    backgroundColor: "#13161f",
                    borderWidth: 0
                }]
            },
            credits : false,
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                style: {
                    color: '#F0F0F0'
                }
            }
        }
    }
};