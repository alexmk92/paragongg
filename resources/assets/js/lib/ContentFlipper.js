var ContentFlipper = function(props)  {
    this.state = {
        target : props.target,
        strength : props.strength || 0,
        mousePosition : { x : 0, y : 0 },
        animationSpeed : typeof props.animationSpeed === "undefined" ? 100 : props.animationSpeed
    };
};

ContentFlipper.prototype.mousePositionChanged = function(e) {
    console.log("FLIPPER UPDATED");
    this.state.mousePosition = { x : e.pageX || e.clientX, y : e.pageY || e.clientY };
    this.transformElement();
};

// TODO this will eventually rotate the element based on mouse pos
ContentFlipper.prototype.transformElement = function() {
    var elem = document.querySelector(this.state.target);
    if(elem) {
        var bounds      = elem.getBoundingClientRect();
        var strengthX   = (this.state.strength / bounds.width);
        var strengthY   = (this.state.strength / bounds.height);
        var mouseX      = this.state.mousePosition.x;
        var mouseY      = this.state.mousePosition.y;

        mouseX = (mouseX - bounds.left) - (bounds.width / 2);
        mouseY = (mouseY - bounds.top) - (bounds.height / 2);

        var newX = ((strengthX * mouseX) * -1);
        var newY = ((strengthY * mouseY) * -1);

        // Use matrix to move the background
        var repeat = !this.state.repeat ? 'no-repeat' : 'repeat-x';
        var size = !this.state.cover ? 'inherit' : 'contain';

        var styleString = "";

        /*  TODO Modify to use rotateX and rotateY params
        styleString += " -webkit-transform : matrix(1,0,0,1, " + newX + "," + newY + ");";
        styleString += "-moz-transform: matrix(" + this.state.scale + ",0,0," + this.state.scale + "," + newX + "," + newY + ")";
        styleString += "-o-transform: matrix(" + this.state.scale + ",0,0," + this.state.scale + "," + newX + "," + newY + ")";
        styleString += "transform: matrix(" + this.state.scale + ",0,0," + this.state.scale + "," + newX + "," + newY + ")";
        styleString += "-webkit-transition: " + this.state.animationSpeed + "ms;";
        styleString += "-moz-transition: " + this.state.animationSpeed + "ms;";
        styleString += "-o-transition: " + this.state.animationSpeed + "ms;";
        styleString += " transition: " + this.state.animationSpeed + "ms;";
        */

        elem.setAttribute("style", styleString);
    }
};

module.exports = ContentFlipper;