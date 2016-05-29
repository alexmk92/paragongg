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
        return (
            <Tabs defaultSelected={0}>
                <TabPanel title="Early Game">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto aspernatur debitis, eaque explicabo facere ipsam ipsum itaque iusto laboriosam natus non nostrum placeat quo repudiandae, saepe sapiente tempora voluptate!</TabPanel>
                <TabPanel title="Late Game">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur ex laudantium magnam maxime nulla omnis? Deserunt dicta eum incidunt inventore iure, nesciunt repellendus reprehenderit sed temporibus veniam voluptates, voluptatum.</TabPanel>
            </Tabs>
        )
    }
});

module.exports = DeckBuilderBuilds;