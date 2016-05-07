import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class GuidesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guides : this.props.guides
        }
    }
    render() {
        var guides = [];
        this.props.guides.forEach(function(guide) {
            guides.push(<GuidePreview key={guide.slug} slug={guide.slug} title={guide.title} created={guide.created} />);
        });
        return(
            <div>
                <GuideFilter />
                {guides}
            </div>
        )
    }
}

class GuidePreview extends Component {
    render() {
        return(
            <a className="guide-preview" href={"/guides/" + this.props.slug}>
                <div className="preview-details">
                    <div className="date">{ this.props.date }</div>
                    <div className="heading"><h2>{ this.props.title }</h2></div>
                </div>
            </a>
        )
    }
}

class GuideFilter extends Component {
    render() {
        return (
            <div id="guide-filter">
                <ul className="heroes">
                    <li><a href="/guides?hero=dekker"><img src="/assets/images/heroes/dekker/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=feng-mao"><img src="/assets/images/heroes/feng-mao/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=gadget"><img src="/assets/images/heroes/gadget/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=gideon"><img src="/assets/images/heroes/gideon/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=grux"><img src="/assets/images/heroes/grux/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=howitzer"><img src="/assets/images/heroes/howitzer/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=iggy-scorch"><img src="/assets/images/heroes/iggy-scorch/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=kallari"><img src="/assets/images/heroes/kallari/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=murdock"><img src="/assets/images/heroes/murdock/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=muriel"><img src="/assets/images/heroes/muriel/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=rampage"><img src="/assets/images/heroes/rampage/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=sevarog"><img src="/assets/images/heroes/sevarog/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=sparrow"><img src="/assets/images/heroes/sparrow/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=steel"><img src="/assets/images/heroes/steel/portrait.jpg"/></a></li>
                    <li><a href="/guides?hero=twinblast"><img src="/assets/images/heroes/twinblast/portrait.jpg"/></a></li>
                </ul>
            </div>
        )
    }
}

var element = document.getElementById('guides-feed');
if(element) ReactDOM.render(<GuidesList guides={GUIDES} />, element);
