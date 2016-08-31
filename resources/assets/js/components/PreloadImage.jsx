var React = require('react');

var PreloadImage = React.createClass({
    getInitialState: function() {
        return {
            imageLoaded: false,
            fallbackFailed: false,
            initialRenderFailed: false,
            src: ""
        }
    },
    componentWillMount: function() {
        this.setState({ src : this.props.src });
    },
    imageLoaded: function() {
        this.setState({ imageLoaded : true });
        if(typeof this.props.onImageLoaded !== "undefined" && this.props.onImageLoaded !== null) {
            this.props.onImageLoaded();
        }
    },
    renderFallback: function() {
        var fallbackFailure = this.state.initialRenderFailed === true;
        if(!this.state.fallbackFailed && !this.state.initialRenderFailed && typeof typeof this.props.fallbackSrc !== "undefined") {
            this.setState({
                src : this.props.fallbackSrc,
                initialRenderFailed: true,
                fallbackFailed: fallbackFailure
            })
        }
    },
    componentDidUpdate: function() {
        if(!this.state.fallbackFailed && this.state.initialRenderFailed && typeof this.props.onFallbackImageRendered && this.props.onFallbackImageRendered) {
            this.props.onFallbackImageRendered();
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.src !== this.props.src) {
            this.setState({ imageLoaded : false, src : nextProps.src});
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        // This will force the component to update, happens only when component forcefully updates state
        if(nextState.imageLoaded === false) return true;
        // Prevents refires in this component when the image is loaded
        return (this.state.imageLoaded === false && (nextState.imageLoaded === true));
    },
    render: function() {
        var placeholderImage = (typeof this.props.placeholderSrc !== "undefined") ? <img className={'placeholder ' + (this.state.imageLoaded === false ? 'visible' : 'hidden')} src={this.props.placeholderSrc } /> : '';
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
                     src={this.state.src}
                     onLoad={this.imageLoaded}
                     onError={this.renderFallback}
                />
            </div>
        );
    }
});

module.exports = PreloadImage;