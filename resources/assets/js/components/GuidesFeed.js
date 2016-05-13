import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactTabs from 'react-tabs'

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

class GuideFilter extends Component {
    render() {
        return (
            <div id="guide-filter">
                <div className="header">
                    <span className="heading">Hero guides</span>
                    <input className="hero-search" type="text" placeholder="Start typing a hero name to search..." autoFocus="true"/>
                </div>
                <ul className="heroes">
                    <li><a href="/guides?hero=dekker"><img src="/assets/images/heroes/dekker/portrait.jpg"/><span>Dekker</span></a></li>
                    <li><a href="/guides?hero=feng-mao"><img src="/assets/images/heroes/feng-mao/portrait.jpg"/><span>Feng-mao</span></a></li>
                    <li><a href="/guides?hero=gadget"><img src="/assets/images/heroes/gadget/portrait.jpg"/></a><span>Gadget</span></li>
                    <li><a href="/guides?hero=gideon"><img src="/assets/images/heroes/gideon/portrait.jpg"/></a><span>Gideon</span></li>
                    <li><a href="/guides?hero=grux"><img src="/assets/images/heroes/grux/portrait.jpg"/></a><span>Grux</span></li>
                    <li><a href="/guides?hero=howitzer"><img src="/assets/images/heroes/howitzer/portrait.jpg"/><span>Howitzer</span></a></li>
                    <li><a href="/guides?hero=iggy-scorch"><img src="/assets/images/heroes/iggy-scorch/portrait.jpg"/><span>Iggy &amp; Scorch</span></a></li>
                    <li><a href="/guides?hero=kallari"><img src="/assets/images/heroes/kallari/portrait.jpg"/><span>Kallari</span></a></li>
                    <li><a href="/guides?hero=murdock"><img src="/assets/images/heroes/murdock/portrait.jpg"/><span>Murdock</span></a></li>
                    <li><a href="/guides?hero=muriel"><img src="/assets/images/heroes/muriel/portrait.jpg"/><span>Muriel</span></a></li>
                    <li><a href="/guides?hero=rampage"><img src="/assets/images/heroes/rampage/portrait.jpg"/><span>Rampage</span></a></li>
                    <li><a href="/guides?hero=sevarog"><img src="/assets/images/heroes/sevarog/portrait.jpg"/><span>Sevarog</span></a></li>
                    <li><a href="/guides?hero=sparrow"><img src="/assets/images/heroes/sparrow/portrait.jpg"/><span>Sparrow</span></a></li>
                    <li><a href="/guides?hero=steel"><img src="/assets/images/heroes/steel/portrait.jpg"/><span>Steel</span></a></li>
                    <li><a href="/guides?hero=twinblast"><img src="/assets/images/heroes/twinblast/portrait.jpg"/><span>Twinblast</span></a></li>
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
