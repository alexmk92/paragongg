import React, { Component } from 'react'
import ReactDOM             from 'react-dom'
import Masonry              from 'react-masonry-component'

class NewsFeed extends Component {
    constructor(props) {
        super(props)

        this.masonryOptions = {
            percentPosition: true,
            transitionDuration: 0,
            gutter: 30
        }
        // set state here if needed...
        /*
         this.state = {

         }
         */
    }
    handleSelect(index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }
    render() {
        var childElements = this.props.elements.map(function(element){
            return (
                <a className="article-preview" href={"/news/" + element.slug}>
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
            <Masonry
                className={'my-gallery-class'} // default ''
                //elementType={'ul'} // default 'div'
                options={this.masonryOptions} // default {}
                disableImagesLoaded={false} // default false
            >
                {childElements}
            </Masonry>
        );
    }
}

var element = document.getElementById('news-feed');
if(element) ReactDOM.render(<NewsFeed elements={NEWS}/>, element);