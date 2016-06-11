var React = require('react');
var Q = require('q');

var ConfirmModal = React.createClass({
    componentWillMount: function() {
        this.deferred = new Q.defer();
    },
    componentWillUnmount() {
        console.log("UNMOUNTED MODAL");
    },
    cancel: function() {
        return this.deferred.reject("Modal Cancelled");
    },
    confirm: function() {
        return this.deferred.resolve("Modal Confirmed");
    },
    render: function() {
        var icon = this.props.titleIcon ? <i className={"fa " + this.props.titleIcon + ""} aria-hidden="true" /> : "";
        return(
            <div id="modal-background">
                <div id="modal-window">
                    <span className="title">{ icon } { this.props.title || "ARE YOU SURE" }</span>
                    <span className="description">{ this.props.description || "Do you really wantt to do this?" }</span>
                    <div className="button-wrapper">
                        <button onClick={this.cancel} className="btn">{ this.props.cancelText || "CANCEL" }</button>
                        <button onClick={this.confirm} className="btn">{ this.props.confirmText || "CONFIRM" }</button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ConfirmModal;