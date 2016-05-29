var React    = require('react');
var Tab      = require('./Tab');
var TabPanel = require('./TabPanel');

var Tabs = React.createClass({
    getInitialState: function() {
        return {
            selected: this.props.defaultSelected,
            tabs: this.props.children
        }
    },
    componentWillMount: function() {
        this.setState({tabCount: React.Children.count(this.state.tabs)});
    },
    getTabs: function() {
        var tabs = [];
        for(var i = 0; i < this.state.tabCount; i++) {
            tabs.push(<Tab key={i} reactKey={i} selected={this.state.selected} title={this.state.tabs[i].props.title} onSelect={this.setSelected.bind(this, i)}/>);
        }
        return tabs;
    },
    getPanels: function() {
        var panels = [];
        for(var i = 0; i < this.state.tabCount; i++) {
            panels.push(<TabPanel key={i} reactKey={i} selected={this.state.selected}>{this.state.tabs[i].props.children}</TabPanel>)
        }
        return panels;
    },
    setSelected: function(tab) {
        this.setState({selected: tab});
    },
    createTab: function() {
        var newTab = <TabPanel title="New build">Example new tab</TabPanel>;
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
                    <li className="Tabbable__Tab create" onClick={this.createTab}>+</li>
                </ul>
                {this.getPanels()}
            </div>
        )
    }
});

module.exports = Tabs;