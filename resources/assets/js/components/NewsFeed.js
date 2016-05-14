import React, { Component } from 'react'
import ReactDOM             from 'react-dom'
import Masonry              from 'react-masonry-component'
import { fetchNews }        from '../actions/news'

class NewsFeed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            news: [],
            newsEnd: false
        }
        this.options = {
            stagger: true
        }
        this.masonryOptions = {
            percentPosition: true,
            //transitionDuration: 0,
            gutter: 30,
        }

        this.getResults = this.getResults.bind(this);
        this.addResults = this.addResults.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        this.getResults();
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.getResults();
        }
    }
    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }
    getResults() {
        fetchNews(this.state.news.length, (error, data) => {
            if(error === null && data !== null) {
                console.log(data);
                if(data.length > 0) {
                    this.addResults(data);
                } else {
                    this.setState({newsEnd: true});
                    console.log('END OF NEWS');
                }
            }
        });
    }
    addResults(response) {
        console.log("ADDING RESULTS");
        if(this.options.stagger == true) {
            response.forEach(function(post) {
                this.setState({news: this.state.news.concat(post)}); // Stagger this somehow?
            }, this);
        } else {
            this.setState({news: this.state.news.concat(response)});
        }
    }
    render() {
        var childElements = this.state.news.map(function(element){
            return (
                <a className="article-preview" href={"/news/" + element.slug} key={element.slug}>
                    <div className="article-image">
                        <img src="/assets/images/example-preview.jpg"/>
                    </div>
                    <div className="heading">
                        <h2>{element.title}</h2>
                    </div>
                </a>
            );
        });

        return (
            <div>
                <Masonry
                    className={'my-gallery-class'} // default ''
                    //elementType={'ul'} // default 'div'
                    options={this.masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                >
                    {childElements}
                </Masonry>
                <div>
                    <button onClick={this.getResults}>Hello</button>
                </div>
            </div>
        );
    }
}

var element = document.getElementById('news-feed');
if(element) ReactDOM.render(<NewsFeed/>, element);