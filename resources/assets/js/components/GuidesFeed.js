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
            guides : this.props.guides
        }
    }
    render() {
        return(
            <div>
                <GuideFilter />
                <GuideResults guides={this.state.guides}/>
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
                <a href={`/guides?hero=${this.props.url}`}>
                     <img src={`/assets/images/heroes/${this.props.url}/portrait.jpg`} />
                     <span>{this.props.name}</span>
                </a>
            </li>
        );
    }
}

class GuideFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_term : "",
            heroes : [
                { name : "Dekker", url : "dekker" },
                { name : "Feng-mao", url : "feng-mao" },
                { name : "Gadget", url : "gadget" },
                { name : "Gideon", url : "gideon" },
                { name : "Grux", url : "grux" },
                { name : "Howitzer", url : "howitzer" },
                { name : "Iggy &amp Scorch", url : "iggy-scorch" },
                { name : "Kallari", url : "kallari" },
                { name : "Murdock", url : "murdock" },
                { name : "Muriel", url : "muriel" },
                { name : "Rampage", url : "rampage" },
                { name : "Sevarog", url : "sevarog" },
                { name : "Sparrow", url : "sparrow" },
                { name : "Steel", url : "steel" },
                { name : "Twinblast", url : "twinblast" }
            ]
        };

        this.inputChanged = this.inputChanged.bind(this);
    }

    inputChanged(event) {
        event.preventDefault();
        this.setState({ search_term : event.target.value })
    }
    render() {
        var heroes = [];
        this.state.heroes.forEach((hero) => {
            console.log("SEARCHING FOR HERO THAT CONTAINS " + this.state.search_term);
            if(hero.name.toLowerCase().indexOf(this.state.search_term.toLowerCase()) > -1) {
               heroes.push(
                   <HeroListItem
                       key={hero.name}
                       name={hero.name}
                       url={hero.url}
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
        console.log(this.state.guides);
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
        console.log(this.props);
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
if(element) ReactDOM.render(<GuidesFeed guides={GUIDES} />, element);
