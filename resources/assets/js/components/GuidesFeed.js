import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactTabs from 'react-tabs'
import FlipMove from 'react-flip-move'

const Tab       = ReactTabs.Tab
const Tabs      = ReactTabs.Tabs
const TabList   = ReactTabs.TabList
const TabPanel  = ReactTabs.TabPanel

class GuidesFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guides : props.guides,
            heroes : props.heroes
        }
    }
    render() {
        return(
            <div>
                <GuideFilter heroes={this.state.heroes} />
                <GuideResults guides={this.state.guides} />
            </div>
        )
    }
}

class HeroListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li>
                <a href={`/guides?hero=${this.props.hero.name}`}>
                    <img src={`https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/${this.props.hero.code}/portrait_small.png`} />
                    <span>{this.props.hero.name}</span>
                </a>
            </li>
        );
    }
}

class GuideFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term : ""
        };

        this.inputChanged = this.inputChanged.bind(this);
    }

    inputChanged(event) {
        event.preventDefault();
        this.setState({ search_term : event.target.value })
    }
    render() {
        var heroes = [];
        this.props.heroes.forEach((hero) => {
            if(hero.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) > -1) {
                heroes.push(
                    <HeroListItem
                        key={hero.name}
                        hero={hero}
                    />
                );
            }
        });
        return (
            <div id="guide-filter">
                <div className="header">
                    <span className="heading">Hero guides</span>
                    <input onChange={this.inputChanged} className="hero-search" type="text" placeholder="Start typing a hero name to search..." autoFocus="true"/>
                </div>
                <ul className="heroes">
                    <FlipMove>
                        { heroes }
                    </FlipMove>
                </ul>
            </div>
        )
    }
}

class GuideResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guides : this.props.guides
        }
    }
    componentDidMount() {
    }
    render() {
        var guides = [];
        this.state.guides.forEach(function(guide) {
            guides.push(<GuidePreview key={guide.slug} slug={guide.slug} title={guide.title} created={guide.created} user_id={guide.user_id} />);
        });
        return (
            <Tabs onSelect={this.handleSelect} selectedIndex={0} className="padless">
                <TabList>
                    <Tab>Featured</Tab>
                    <Tab>Recently updated</Tab>
                    <Tab>Top rated</Tab>
                    <Tab>Most views</Tab>
                    <Tab>Newest</Tab>
                </TabList>

                {/* Featured */}
                <TabPanel>
                    {guides}
                </TabPanel>

                {/* Recently updated */}
                <TabPanel>
                    {guides}
                </TabPanel>

                {/* Top rated */}
                <TabPanel>
                    {guides}
                </TabPanel>

                {/* Most views */}
                <TabPanel>
                    {guides}
                </TabPanel>

                {/* Newest */}
                <TabPanel>
                    {guides}
                </TabPanel>
            </Tabs>
        );
    }
}

class GuidePreview extends Component {
    componentDidMount() {
    }
    render() {
        return(
            <a className="guide-preview cf" href={"/guides/" + this.props.slug}>
                <div className="guide-hero">
                    <img src="/assets/images/heroes/dekker/portrait.jpg"/>
                </div>
                <div className="guide-details">
                    <div class="title"><h3>{ this.props.title }</h3></div>
                    <div class="author">by { this.props.user_id }</div>
                </div>
            </a>
        )
    }
}

var element = document.getElementById('guides-feed');
if(element) ReactDOM.render(<GuidesFeed guides={GUIDES} heroes={HEROES} />, element);
