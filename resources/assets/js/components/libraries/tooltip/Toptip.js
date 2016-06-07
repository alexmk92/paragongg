var Toptip = function() {
    this.active = false;
    this.tooltip = document.createElement("div");
    this.tooltip.setAttribute("id", "toptip");
    document.body.appendChild(this.tooltip);

    /**
     * Show the tooltip, add mousemove listener
     */
    this.showTooltip = function() {
        this.tooltip.style.display = "block";
        document.addEventListener("mousemove", this.updatePosition.bind(this));
    }

    /**
     * Hide the tooltip, remove mousemove listener
     */
    this.hideTooltip = function() {
        this.tooltip.style.display = "none";
        document.removeEventListener("mousemove", this.updatePosition);
    }

    /**
     * Update the tooltip position
     * @param event
     */
    this.updatePosition = function(event) {
        this.tooltip.style.left = event.clientX + "px";
        this.tooltip.style.top = event.clientY  + document.body.scrollTop + "px";
    }

    /**
     * Set content of the tooltip
     * @param content
     */
    this.setContent = function(content) {
        // Delete any existing content
        while (this.tooltip.firstChild) {
            this.tooltip.removeChild(this.tooltip.firstChild);
        }
        // Append new content
        this.tooltip.appendChild(content);
    }
}

module.exports = Toptip;