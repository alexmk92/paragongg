var Toptip = function() {
    this.active = false;
    this.tooltip = document.createElement("div");
    // Event listener?
    this.init = function() {
        this.tooltip.setAttribute("id", "toptip");
        var testContent = document.createTextNode("YOLO");
        this.tooltip.appendChild(testContent);
        document.body.appendChild(this.tooltip);
    }
    this.setContent = function(content) {
        console.log(content);
        while (this.tooltip.firstChild) {
            this.tooltip.removeChild(this.tooltip.firstChild);
        }
        this.tooltip.appendChild(content);
    }
    this.showTooltip = function() {
        this.active = true;
        this.tooltip.style.display = "block";
        // Create listener
        document.addEventListener("mousemove", this.updatePosition.bind(this));
    }
    this.hideTooltip = function() {
        this.active = false;
        this.tooltip.style.display = "none";
        // Destroy listener
        document.removeEventListener("mousemove", this.updatePosition);
    }
    this.updatePosition = function(event) {
        this.tooltip.style.left = event.clientX + "px";
        this.tooltip.style.top = event.clientY  + document.body.scrollTop + "px";
    }
    this.init();
}

module.exports = Toptip;