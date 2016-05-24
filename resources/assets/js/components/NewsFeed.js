var React     = require('react');
var ReactDOM  = require('react-dom');
var Masonry   = require('react-masonry-component');
var Action = require('../actions/news');

var NewsFeed = React.createClass({
    getInitialState: function() {
        return {
            news: [],
            newsEnd: false
        }
    },
    componentWillMount: function() {
        this.options = {
            stagger: true
        };
        this.masonryOptions = {
            percentPosition: true,
            //transitionDuration: 0,
            gutter: 30,
        };
    },
    componentDidMount: function() {
        this.getResults();
        window.addEventListener('scroll', this.handleScroll);
    },
    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll: function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.getResults();
        }
    },
    handleSelect: function(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    },
    getResults: function() {
        var _this = this;
        Action.fetchNews(this.state.news.length, function(error, data) {
            if(error === null && data !== null) {
                console.log(data);
                if(data.length > 0) {
                    _this.addResults(data);
                } else {
                    _this.setState({newsEnd: true});
                    console.log('END OF NEWS');
                }
            }
        });
    },
    addResults: function(response) {
        if(this.options.stagger) {
            response.forEach(function(post) {
                this.setState({news: this.state.news.concat(post)}); // Stagger this somehow?
            }, this);
        } else {
            this.setState({news: this.state.news.concat(response)});
        }
    },
    render: function() {
        const childElements = this.state.news.map(function(element){
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
                    { childElements }
                </Masonry>
                <div>
                    <p id="end-of-news-label" className={this.state.newsEnd ? "" : "hidden"}>No more news!</p>
                </div>
            </div>
        );
    }
});

var element = document.getElementById('news-feed');
if(element) ReactDOM.render(<NewsFeed/>, element);