var React     = require('react');
var Tabbable  = require('../general/tabs/Tabbable');

var Tabs     = Tabbable.Tabs;
var TabPanel = Tabbable.TabPanel;

var DeckBuilderBuilds = React.createClass({
    getInitialState: function(){
        return {
            deck: [],
            builds: [],
        }
    },
    render: function() {
        var showAvailableSlots = "";
        if(this.props.cardSelected) {
            showAvailableSlots = <i className="available-slot fa fa-arrow-circle-o-up" aria-hidden="true"></i>;
        }
        return (
            <Tabs defaultSelected={0}>
                <TabPanel title="Early Game">
                    <ul className="build-list">
                        <li id="c1" className="active"><span className="slot-label">Active</span></li>
                        <li id="c2" className="active"><span className="slot-label">Active</span></li>
                        <li id="c3" className="active"><span className="slot-label">Active</span></li>
                        <li id="c4" className="active"><span className="slot-label">Active</span></li>
                        <li id="c5" className="passive"><span className="slot-label">Passive</span></li>
                        <li id="c6" className="passive"><span className="slot-label">Passive</span></li>
                    </ul>
                </TabPanel>
            </Tabs>
        )
    }
});

module.exports = DeckBuilderBuilds;