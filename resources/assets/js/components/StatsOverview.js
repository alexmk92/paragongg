var React     = require('react');
var ReactDOM  = require('react-dom');
var ReactTabs = require('react-tabs');

const Tab       = ReactTabs.Tab
const Tabs      = ReactTabs.Tabs
const TabList   = ReactTabs.TabList
const TabPanel  = ReactTabs.TabPanel

var StatsOverview = React.createClass({
    handleSelect: function(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    },
    render: function() {
        return (
            <Tabs onSelect={this.handleSelect} selectedIndex={0}>
                <TabList>
                    <Tab>Top players</Tab>
                    <Tab>Hero stats</Tab>
                    <Tab>Recent games</Tab>
                </TabList>

                {/* Top players */}
                <TabPanel>
                    <table className="minimal">
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>MMR</th>
                            <th>Name</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>W/L%</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>#1</td>
                            <td>2205</td>
                            <td><a href="/">Beeckon</a></td>
                            <td>314</td>
                            <td>22</td>
                            <td>92%</td>
                        </tr>
                        <tr><td>#2</td><td>2195</td><td>Aphostle</td><td>720</td><td>105</td><td>90%</td></tr>
                        <tr><td>#3</td><td>2193</td><td>TrueUnTrue</td><td>314</td><td>22</td><td>92%</td></tr>
                        <tr><td>#4</td><td>2192</td><td>LewdJules</td><td>720</td><td>105</td><td>90%</td></tr>
                        <tr><td>#5</td><td>2191</td><td>Martyrivia</td><td>314</td><td>22</td><td>92%</td></tr>
                        <tr><td>#6</td><td>2190</td><td>DaPotatoKing</td><td>720</td><td>105</td><td>90%</td></tr>
                        <tr><td>#7</td><td>2185</td><td>EzPzy</td><td>314</td><td>22</td><td>92%</td></tr>
                        <tr><td>#8</td><td>2177</td><td>Selwonk</td><td>720</td><td>105</td><td>90%</td></tr>
                        <tr><td>#9</td><td>2175</td><td>MilkDrunk</td><td>314</td><td>22</td><td>92%</td></tr>
                        <tr><td>#10</td><td>2170</td><td>ImSko</td><td>720</td><td>105</td><td>90%</td></tr>
                        </tbody>
                    </table>
                </TabPanel>

                {/* Hero stats */}
                <TabPanel>
                    <h2>Soon</h2>
                </TabPanel>

                {/* Recent games */}
                <TabPanel>
                    <h2>Soon</h2>
                </TabPanel>
            </Tabs>
        );
    }
});

var element = document.getElementById('stats-overview');
if(element) ReactDOM.render(<StatsOverview />, element);
