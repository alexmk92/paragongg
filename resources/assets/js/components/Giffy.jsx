var React = require('react');

var Giffy = React.createClass({
    toggleActiveState: function() {
        if(this.props.singlePlayback === true) {
            this.props.onItemSelected();
        }
    },
    componentDidUpdate: function() {
        var videos = document.querySelectorAll('video');
        videos.forEach(function(video, index) {
            if(video && video.poster) {
                if(video.poster.indexOf(this.props.videoSrc) > -1 && this.props.isPlaying === false && index === this.props.videoIndex) {
                    video.pause();
                }
            }
        }.bind(this));
    },
    render: function() {
        return (
        <div className="video-container">
            <div className={"giffy-wrapper" + (this.props.isPlaying ? " playing" : "")}
                 onClick={this.toggleActiveState}
            >
                <div className="gfyitem"
                     data-title="false"
                     data-autoplay={this.props.isPlaying}
                     data-controls="true"
                     data-expand="false"
                     data-id={this.props.videoSrc}
                >
                </div>
            </div>
        </div>
        );
    }
});

module.exports = Giffy;