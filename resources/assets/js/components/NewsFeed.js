import React, { Component } from 'react'
import ReactDOM             from 'react-dom'
import Masonry              from 'react-masonry-component'

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

        this.getResults = this.getResults.bind(this)
        this.addResults = this.addResults.bind(this)
    }
    componentDidMount() {
        this.getResults();
    }
    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }
    getResults() {
        var httpRequest;

        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
        } else {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
        }

        httpRequest.open("GET", '/api/v1/news?skip=' + this.state.news.length, true);

        //var that = this;
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    var response = JSON.parse(httpRequest.responseText)
                    if(response.length > 0) {
                        this.addResults(response);
                    } else {
                        this.setState({newsEnd: true});
                        console.log('END OF NEWS');
                    }
                } else{
                    console.log("AW NO");
                }
            }

        };

        httpRequest.send();
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