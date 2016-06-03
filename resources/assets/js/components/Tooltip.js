var Helpers = require('../helpers');
// { uuid, ajax, hashCode } from '../helpers';

var Tooltip = function(props) {
    if (typeof props.uniqueId === "undefined") props.uniqueId = Helpers.uuid();
    if (typeof props.tooltipInfo === "undefined") props.tooltipInfo = {};

    this.initialise({
        targetNode: props.targetNode,
        parentNodeName: props.parentNodeName,
        uniqueId: props.uniqueId,
        tooltipInfo: props.tooltipInfo,
        dataURL: props.dataURL
    });
};

Tooltip.prototype.initialise = function(data) {
    var _this = this;
    var card = _this.getParentNode(data.targetNode, data.parentNodeName);
    var cardRect = card.getBoundingClientRect();

    if (cardRect) {
        this.state = {
            uniqueId: Helpers.hashCode(data.uniqueId),
            tooltipInfo: data.tooltipInfo,
            isFadingOut: false,
            dataURL: data.dataURL,
            isRendered: false,
            targetNode: data.targetNode,
            parentNodeName: data.parentNodeName,
            animationDuration: 300,
            isVisible: false,
            bounds: {
                distanceFromTopLayoutMargin: cardRect.top,
                distanceFromLeftLayoutMargin: cardRect.left,
                distanceFromRightLayoutMargin: cardRect.right,
                distanceFromBottomLayoutMargin: cardRect.bottom,
                viewportWidth: screen.width,
                viewportHeight: screen.height
            },
            frame: {
                origin: {
                    x: cardRect.left,
                    y: cardRect.top
                },
                size: {
                    width: cardRect.width || 0,
                    height : cardRect.height || 0
                }
            }
        };
        this.render();
    }
};

Tooltip.prototype.abortClose = function() {
    this.state.isFadingOut = false;
    var tooltipNode = document.getElementById(this.state.uniqueId);
    //if(typeof tooltipNode !== "undefined" && tooltipNode)
    tooltipNode.className = "tooltip-wrapper tooltip-fade-show";
};

Tooltip.prototype.destructor = function(callback) {
    var _this = this;
    var tooltipNode = document.getElementById(this.state.uniqueId);
    if (tooltipNode) {
        this.state.isFadingOut = true;
        tooltipNode.className = "tooltip-wrapper";
        setTimeout(function() {
            if (_this.state.isFadingOut) {
                var nodeAfterDelay = document.getElementById(_this.state.uniqueId);
                if (nodeAfterDelay) {
                    document.body.removeChild(nodeAfterDelay);
                    callback({node: null, error: null});
                } else {
                    callback({node: null, error: "No node was found in the DOM tree"});
                }
            }
        }, 0);
    }
};

Tooltip.prototype.setPosition = function(node) {
    var _this = this;

    var bodyRect = document.body.getBoundingClientRect();
    var nodeRect = node.getBoundingClientRect();

    var offsetTop = (_this.state.bounds.distanceFromTopLayoutMargin - bodyRect.top) + _this.state.frame.size.height;
    var offsetLeft = _this.state.bounds.distanceFromLeftLayoutMargin + _this.state.frame.size.width;

    // Balance both sides of the equation, we are adding height to our offsetTop so need to
    // that here to check bounds of off screen elements.
    //var viewPortOffsetToBottomMargin = ((bodyRect.top - window.innerHeight.height) + _this.state.frame.size.height) * -1;
    var viewPortOffsetToTopMargin = ((bodyRect.top) - _this.state.frame.size.height) * -1;

    if (node) {
        node.style.position = "absolute";

        // Assigning a second rect property here, on the initial load getBoundingClientRect yields
        // { width: 0, height: 0 ... } we set default values here so that the card will render in the
        // same location

        var rect = {
            height: nodeRect.height,
            width: nodeRect.width
        };

        if (rect.height === 0) rect.height = 200;
        if (rect.width === 0) rect.width = 400;

        // check for off top or bottom of page
        if (offsetTop + rect.height > viewPortOffsetToTopMargin && offsetTop < viewPortOffsetToTopMargin + rect.height) {
            offsetLeft = offsetLeft - nodeRect.width / 2;
            node.style.setProperty("top", offsetTop + this.state.frame.size.height - 20 + "px");
            node.style.setProperty("left", offsetLeft + "px");
        } else {
            offsetLeft = offsetLeft - rect.width / 2;
            node.style.setProperty("top", offsetTop - rect.height - 14 - this.state.frame.size.height / 4 + "px");
            node.style.setProperty("left", offsetLeft + "px");
        }
        // Check if the left or right margins are out of bounds
        if (offsetLeft < 0 || offsetLeft === 0) node.style.setProperty("left", "10px");
        if (offsetLeft + rect.width > window.innerWidth) {
            var overflow = offsetLeft + rect.width - window.innerWidth;
            var newLeft = offsetLeft - overflow - 40 < 0 ? 10 : offsetLeft - overflow - 30;
            node.style.setProperty("left", newLeft + "px");
        }

        return node
    }
};

Tooltip.prototype.getParentNode = function(el, selector) {
    if (typeof selector === "undefined")
        selector = "card-preview";

    /*
     selector = selector.trim()
     if (el.className.trim() !== selector) {
     // traverse parents
     while (el.className.trim() !== selector) {
     el = el.parentNode
     if (!el) return null
     }
     return el
     } else {
     return el
     }
     */
    return el;
};

Tooltip.prototype.updateTooltipInfo = function() {
    var data = this.state.tooltipInfo;
    var node = document.getElementById(this.state.uniqueId);

    if(node) {
        var cardStats = data.effects.map(function(effect) {
            return "<p>" + effect.attribute + " [" + effect.operation + "]</p>";
        });

        var nodeContent = '';
        nodeContent += '<div class="card-tooltip">';
        nodeContent += '      <div class="head-bar">';
        nodeContent += "          <span class=\"head-card-name\">" + data.name + "</span>";
        nodeContent += '          <div class="head-card-row">';
        nodeContent += "              <span class=\"head-card-type\">Equipment</span>";
        nodeContent += "              <span class=\"head-card-cost\">Cost: " + data.cost + "</span>";
        nodeContent += '          </div>';
        nodeContent += '          <div class="head-card-row">';
        nodeContent += "              <span class=\"head-card-affinity\">" + data.affinity + "</span>";
        nodeContent += "              <span class=\"head-card-rarity\">Common</span>";
        nodeContent += '          </div>';
        nodeContent += '      </div>';
        nodeContent += '      <div class="card-content">';
        nodeContent += "          " + cardStats;
        nodeContent += "          $Upgrade slots: {data.upgradeSlots}";
        nodeContent += '      </div>';
        nodeContent += '</div>';

        node.innerHTML = nodeContent;
        this.setPosition(node);
    }
};

Tooltip.prototype.render = function() {
    var _this = this;
    if (!this.state.isRendered && !document.getElementById(this.state.uniqueId)) {
        Helpers.ajax({
            contentType : "application/json",
            returnType : "json",
            type : "GET",
            url : this.state.dataURL,
            cache : true
        }).then(function(payload) {
            _this.state.tooltipInfo = payload.data;
            _this.updateTooltipInfo();
        });

        this.state.isRendered = true;
        var rootNode = document.createElement("div");
        rootNode.setAttribute("id", this.state.uniqueId);
        rootNode.setAttribute("class", "tooltip-wrapper tooltip-fade-show");
        rootNode.setAttribute("width", "400px");
        rootNode.setAttribute("height", "500px");

        var nodeContent = '';
        nodeContent += '<div class="card-tooltip">';
        nodeContent += '      <div class="card-content">';
        nodeContent += '          <i class="fa fa-spinner fa-spin"></i> Loading...';
        nodeContent += '      </div>';
        nodeContent += '</div>';

        rootNode.innerHTML = nodeContent;
        this.state.isVisible = true;

        document.body.appendChild(this.setPosition(rootNode));
    }
};

module.exports = Tooltip;