var React    = require('react');
var Tab      = require('./Tab');
var TabPanel = require('./TabPanel');

var Tabs = React.createClass({
    getInitialState: function() {
        return {
            selected: this.props.defaultSelected,
            tabs: this.props.children,
            expandable: this.props.expandable
        }
    },
    componentWillMount: function() {
        this.setState({tabCount: React.Children.count(this.state.tabs)});
    },
    getTabs: function() {
        var tabs = [];
        if(this.state.tabCount > 0) {
            for(var i = 0; i < this.state.tabCount; i++) {
                tabs.push(<Tab key={i}
                               reactKey={i}
                               selected={this.state.selected}
                               title={this.state.tabs[i].props.title}
                               onSelect={this.setSelected.bind(this, i)}/>);
            }
        }
        return tabs;
    },
    getExpandable: function() {
        if(this.state.expandable) {
            return <li className="Tabbable__Tab create" onClick={this.createTab}>+</li>
        } else {
            return false;
        }
    },
    getPanels: function() {
        var panels = [];
        if(this.state.tabCount > 0) {
            for (var i = 0; i < this.state.tabCount; i++) {
                panels.push(<TabPanel key={i}
                                      reactKey={i}
                                      selected={this.state.selected}>{this.state.tabs[i].props.children}</TabPanel>)
            }
        }
        return panels;
    },
    setSelected: function(tab) {
        this.setState({selected: tab});
    },
    createTab: function() {
        var newTab =
            <TabPanel title="New build">
                <ul className="build-list">
                    <li id="c1" className="active"><span className="slot-label">Active</span></li>
                    <li id="c2" className="active"><span className="slot-label">Active</span></li>
                    <li id="c3" className="active"><span className="slot-label">Active</span></li>
                    <li id="c4" className="active"><span className="slot-label">Active</span></li>
                    <li id="c5" className="passive"><span className="slot-label">Passive</span></li>
                    <li id="c6" className="passive"><span className="slot-label">Passive</span></li>
                </ul>
            </TabPanel>;
        this.setState({
            tabs: this.state.tabs.concat(newTab),
            tabCount: this.state.tabCount+1
        });
    },
    render: function() {
        return (
            <div className="Tabbable">
                <ul>
                    {this.getTabs()}
                    {this.getExpandable()}
                </ul>
                {this.getPanels()}
            </div>
        )
    }
});

module.exports = Tabs;
