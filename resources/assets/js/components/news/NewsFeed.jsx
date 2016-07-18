var React     = require('react');
var ReactDOM  = require('react-dom');
var Masonry   = require('react-masonry-component');
var Action    = require('../../actions/news');
var Helpers   = require('../../helpers');

var NewsFeed = React.createClass({
    getInitialState: function() {
        return {
            news: [],
            newsEnd: false
        }
    },
    componentWillMount: function() {
        this.fetching = false;
        this.options = {
            stagger: false,
            staggerAmount: 50
        };
        this.masonryOptions = {
            percentPosition: true,
            //transitionDuration: 0,
            gutter: 30
        };
    },
    componentDidMount: function() {
        this.getResults();
        window.addEventListener('scroll', this.handleScroll);
    },
    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if(this.state.news.length !== nextState.news.length) return true;
        if(this.state.newsEnd !== nextState.newsEnd) return true;

        return false;
    },
    handleScroll: function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.getResults();
        }
    },
    getResults: function() {
        if(!this.fetching) {
            Action.fetchNews(this.state.news.length, function(error, data) {
                if(error === null && data !== null) {
                    if(data.length > 0) {
                        this.addResults(data);
                        this.fetching = false;
                    } else {
                        this.fetching = false;
                        this.setState({newsEnd: true});
                    }
                }
            }.bind(this));
        }
        this.fetching = true;
    },
    addResults: function(response) {
        if(this.options.stagger) {
            var i = 0;
            var interval = setInterval(function() {
                this.setState({news: this.state.news.concat(response[i])}); // Stagger this somehow?
                i++;
                if(i >= response.length) clearInterval(interval);
            }.bind(this), this.options.staggerAmount);
        } else {
            this.setState({news: this.state.news.concat(response)});
        }
    },
    render: function() {
        var childElements = this.state.news.map(function(element){
            return (
                <a className="article-preview"
                   href={"/news/" + element.id + "/" + element.slug}
                   key={element.slug}>
                    <div className="preview-image">
                        <img src={Helpers.S3URL() + "images/news/thumbnails/" + element.thumbnail}/>
                    </div>
                    <div className="preview-title">
                        <span>{Helpers.prettyDate(element.created_at)}</span>
                        <h2>{element.title}</h2>
                    </div>
                </a>
            );
        });

        return (
            <div>
                <Masonry
                    className={'my-gallery-class'}
                    options={this.masonryOptions}
                    disableImagesLoaded={false}>
                    { childElements }
                </Masonry>
                <div>
                    <p id="end-of-news-label" className={this.state.newsEnd ? "" : "hidden"}><i className="fa fa-check"></i>You've reached the end of the page</p>
                </div>
            </div>
        );
    }
});

var element = document.getElementById('news-feed');
if(element) ReactDOM.render(<NewsFeed/>, element);
