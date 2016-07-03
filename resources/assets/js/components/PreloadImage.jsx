var React = require('react');

var PreloadImage = React.createClass({
    getInitialState: function() {
        return {
            imageLoaded: false
        }
    },
    imageLoaded: function() {
        this.setState({ imageLoaded : true });
        if(this.props.onImageLoaded !== null) {
            this.props.onImageLoaded();
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return (this.state.imageLoaded === false && (nextState.imageLoaded === true));
    },
    render: function() {
        var placeholderImage = this.props.placeholderSrc ? <img className={'placeholder ' + (this.state.imageLoaded === false ? 'visible' : 'hidden')} src={this.props.placeholderSrc } /> : '';
        return (
            <div className="preload-container">
                <div className={"spinner-container" + (this.state.imageLoaded ? ' hidden' : '')}>
                    <span className="aligner"></span>
                    <div className={'uil-ring-css ' + (this.props.size || 'small') + (this.state.imageLoaded ? ' hidden' : '')}>
                        <div></div>
                    </div>
                </div>
                { placeholderImage }
                <img className={this.state.imageLoaded === false ? '' : 'visible'}
                     src={this.props.src}
                     onLoad={this.imageLoaded}
                />
            </div>
        );
    }
});

module.exports = PreloadImage;