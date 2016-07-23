var InteractiveParallax = function(props)  {
    this.state = {
        type : props.type,
        target : props.target,
        strength : props.strength || 0,
        mousePosition : { x : 0, y : 0 },
        scale : props.scale || 1,
        maxScaleFactor : 0.25,
        disableY : typeof props.disableY === "undefined",
        horizontalMultiplier : props.horizontalMultiplier || 1,
        verticalMultiplier : props.verticalMultiplier || 1,
        backgroundURL : props.backgroundURL || "",
        repeat : typeof props.repeat === "undefined" ? true : props.repeat,
        cover : typeof props.cover === "undefined" ? true : props.cover,
        animationSpeed : typeof props.animationSpeed === "undefined" ? 100 : props.animationSpeed,
        startScale : props.scale,
        enableScrollZoom: !typeof props.scrollZoom === "undefined"
    };

    if(this.state.enableScrollZoom) {
        window.addEventListener("scroll", this.zoomElement.bind(this));
    }
};

InteractiveParallax.prototype.mousePositionChanged = function(e) {
    this.state.mousePosition = { x : e.pageX || e.clientX, y : e.pageY || e.clientY };
    this.transitionElement();
};

InteractiveParallax.prototype.transitionElement = function() {
    var elem = document.querySelector(this.state.target);
    if(elem) {
        var bounds      = elem.getBoundingClientRect();
        var strengthX   = (this.state.strength / bounds.width);
        var strengthY   = (this.state.strength / bounds.height);
        var mouseX      = this.state.mousePosition.x;
        var mouseY      = this.state.mousePosition.y;

        mouseX = (mouseX - bounds.left) - (bounds.width / 2);
        mouseY = (mouseY - bounds.top) - (bounds.height / 2);

        var newX = ((strengthX * mouseX) * -1) * this.state.horizontalMultiplier;
        var newY = ((strengthY * mouseY) * -1) * this.state.verticalMultiplier;
        if(!this.state.disableY) newY = 0;

        // Use matrix to move the background
        var repeat = !this.state.repeat ? 'no-repeat' : 'repeat-x';
        var size = !this.state.cover ? 'inherit' : 'contain';
        
        var styleString = "";
        if(this.state.backgroundURL !== "") {
            styleString += "background-image : url(" + this.state.backgroundURL + ");";
            styleString += " background-repeat : " + repeat + ";";
            styleString += " background-size : " + size + ";";
        }

        styleString += " -webkit-transform : matrix(" + this.state.scale + ",0,0," + this.state.scale + ", " + newX + "," + newY + ");";
        styleString += "-moz-transform: matrix(" + this.state.scale + ",0,0," + this.state.scale + "," + newX + "," + newY + ")";
        styleString += "-o-transform: matrix(" + this.state.scale + ",0,0," + this.state.scale + "," + newX + "," + newY + ")";
        styleString += "transform: matrix(" + this.state.scale + ",0,0," + this.state.scale + "," + newX + "," + newY + ")";
        styleString += "-webkit-transition: " + this.state.animationSpeed + "ms;";
        styleString += "-moz-transition: " + this.state.animationSpeed + "ms;";
        styleString += "-o-transition: " + this.state.animationSpeed + "ms;";
        styleString += " transition: " + this.state.animationSpeed + "ms;";

        elem.setAttribute("style", styleString);
    }
};

// TODO Implement the scroll view event, the code below is very buggy!
InteractiveParallax.prototype.zoomElement = function(e) {
    /*
    e.preventDefault();
    console.log(this.state);
    var elem = document.querySelector(this.state.target);
    if(elem) {
        console.log(elem);
        var offsetTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        var totalHeight = elem.getBoundingClientRect().height;
        var scalePercentage = parseFloat((offsetTop / totalHeight) * 100) > 1 ? 100 : parseFloat((offsetTop / totalHeight) * 100);

        console.log(`${this.state.startScale} + ${this.state.maxScaleFactor} / ${scalePercentage} = ${this.state.startScale + (this.state.maxScaleFactor / scalePercentage)}`)
        var newScale = parseFloat(this.state.startScale + (this.state.maxScaleFactor / scalePercentage));
        this.state.scale = parseFloat((this.state.startScale + (this.state.maxScaleFactor / scalePercentage)));
        this.transitionElement();
    }
    */
};

module.exports = InteractiveParallax;