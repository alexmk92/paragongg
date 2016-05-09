import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactTabs from 'react-tabs'
import Chart from 'chart.js'

const Tab       = ReactTabs.Tab
const Tabs      = ReactTabs.Tabs
const TabList   = ReactTabs.TabList
const TabPanel  = ReactTabs.TabPanel

class PlayerStatsOverview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            twitchLive: this.props.twitchLive,
            twitchTV: this.props.twitchTV
        }

        this.handleSelect = this.handleSelect.bind(this)
        this.initTwitchEmbed = this.initTwitchEmbed.bind(this)
        this.initChartJs = this.initChartJs.bind(this)
    }
    handleSelect(index) {
        if(index != 4) {
            this.player.setMuted(true);
        } else {
            this.player.setMuted(false);
        }
    }
    initTwitchEmbed(el) {
        console.log(this.state.twitchLive);
        console.log(this.state.twitchTV);
        if(this.state.twitchTV) {
            var options = {
                width: 910,
                height: 512,
                channel: this.props.twitchTV,
            };
            this.player = new Twitch.Player(el, options);
            this.player.setVolume(0.5);
            this.player.setMuted(true);
        }
    }
    initChartJs(el) {
        if(el) {
            new Chart(el, {
                type: 'line',
                data: {
                    labels: ["Apr 20", "Apr 21", "Apr 22", "Apr 23", "Apr 24", "Apr 25", "Apr 26", "Apr 27", "Apr 28", "Apr 29", "Apr 30", "May 1"],
                    datasets: [{
                        label: 'Matchmaking Rating',
                        data: [1200, 1215, 1208, 1210, 1209, 1210, 1200, 1250, 1275, 1230, 1250, 1300],
                        borderColor: "#288fce",
                        pointStyle: "circle",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,255,255,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 5,
                        pointHitRadius: 20,
                        fill: false,
                    }]
                },
                options: {

                }
            });
        }
    }
    disableDoubleClick() {
        console.log("Yeah")
    }
    render() {
        return (
            <Tabs forceRenderTabPanel={true} onSelect={this.handleSelect}>
                <TabList>
                    <Tab>Player overview</Tab>
                    <Tab>Elo change</Tab>
                    <Tab>Lifetime stats</Tab>
                    <Tab>Achievements</Tab>
                    <Tab className={this.state.twitchTV ? 'visible' : 'hidden'}><i className={"fa fa-twitch " + this.state.twitchLive} aria-hidden="true"></i> Twitch TV</Tab>
                </TabList>

                {/* Player overview */}
                <TabPanel>
                    <div className="quick-stats">
                        <div className="statbox small">
                            <div className="content">
                                <span className="label">Win/Loss Ratio</span>
                                <span className="statistic">76%</span>
                            </div>
                        </div><div className="statbox small">
                            <div className="content">
                                <span className="label">Games played</span>
                                <span className="statistic">126</span>
                            </div>
                        </div><div className="statbox small">
                            <div className="content">
                                <span className="label">Total played</span>
                                <span className="statistic">513 hrs</span>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                {/* Elo change */}
                <TabPanel>
                    <canvas id="eloChange" ref={el => this.initChartJs(el)}></canvas>
                </TabPanel>

                {/* Lifetime stats */}
                <TabPanel>
                    <p>Lifetime stats</p>
                </TabPanel>

                {/* Achievements */}
                <TabPanel>
                    <p>Achievements</p>
                </TabPanel>

                {/* Twitch TV stream */}
                <TabPanel>
                    <div id="twitchEmbed" ref={el => this.initTwitchEmbed(el)}></div>
                </TabPanel>
            </Tabs>
        )
    }
}

var element = document.getElementById('player-stats-overview');
if(element) {
    ReactDOM.render(<PlayerStatsOverview twitchTV={element.className ? element.className : null} twitchLive={element.dataset.live}/>, element);
}
