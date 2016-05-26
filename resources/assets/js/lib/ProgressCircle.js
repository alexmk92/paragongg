/* FINISH THIS FOR FUN ONE DAY
var ProgressCircle = function(props) {
    this.state = {
        target : props.target,
        minValue : props.minValue,
        maxValue : props.maxValue,
        value : props.value,
        labelText : props.labelText,
        trackColor : typeof props.trackColor === "undefined" ? "#gray" : props.trackColor,
        barColor : typeof props.barColor === "undefined" ? "#blue" : props.barColor
    }  
};

ProgressCircle.prototype.updateChart = function(value) {

};

ProgressCircle.prototype.render = function() {
    var elem = document.querySelector(this.state.target);
    if(typeof elem !== "undefined" && elem.tagName.toLowerCase() === "canvas" && elem) {
        console.log("RENDERING TO CANVAS")
    } else {
        console.log("PLEASE PROVIDE A CANVAS OBJECT")
    }
};

module.exports = ProgressCircle;
*/