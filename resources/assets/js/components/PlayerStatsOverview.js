var React     = require('react');
var ReactDOM  = require('react-dom');
var ReactTabs = require('react-tabs');

const Tab       = ReactTabs.Tab;
const Tabs      = ReactTabs.Tabs;
const TabList   = ReactTabs.TabList;
const TabPanel  = ReactTabs.TabPanel;

var PlayerStatsOverview = React.createClass({
    getInitialState: function() {
        return {
            twitchLive: this.props.twitchLive,
            twitchTV: this.props.twitchTV
        }
    },
    handleSelect: function(index) {
        if(index != 4) {
            this.player.setMuted(true);
        } else {
            this.player.setMuted(false);
        }
    },
    initTwitchEmbed: function(el) {
        console.log(this.state.twitchLive);
        console.log(this.state.twitchTV);
        if(this.state.twitchTV) {
            var options = {
                width: 910,
                height: 512,
                channel: this.props.twitchTV
            };
            this.player = new Twitch.Player(el, options);
            this.player.setVolume(0.5);
            this.player.setMuted(true);
        }
    },
    initChartJs: function(el) {

    },
    render: function() {
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
});

var element = document.getElementById('player-stats-overview');
if(element) ReactDOM.render(<PlayerStatsOverview twitchTV={element.className ? element.className : null} twitchLive={element.dataset.live}/>, element);
