var React     = require('react');
var ReactDOM  = require('react-dom');
var Slider    = require('react-slick');
var Helpers   = require('../../helpers');

var NewsHero = React.createClass({
    getInitialState: function() {
        return {
            featured: this.props.featured || []
        }
    },
    render: function() {
        console.log(this.props.featured);
        var settings = {
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            initialSlide: 1
        };
        var featured = [];
        this.props.featured.forEach(function(news) {
            featured.push(
                <a key={news.slug} href={"/news/" + news.slug}>
                    <img src={"https://s3-eu-west-1.amazonaws.com/paragon.gg/images/news/headers/" + news.header} />
                    <div className="title">
                        <span className="highlight">Featured Article</span><span>{Helpers.prettyDate(news.created_at)}</span>
                        <h1>{news.title}</h1>
                    </div>
                </a>
            );
        });
        console.log(featured);
        return (
            <Slider {...settings}>
                {featured}
            </Slider>
        );
    }
});

var element = document.getElementById('news-hero-banner');
if(element) ReactDOM.render(<NewsHero featured={FEATURED}/>, element);
