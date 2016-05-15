import { uuid, ajax, hashCode } from '../helpers';

export default class CardTooltip {
    constructor(props) {
        if (typeof props.uniqueId === "undefined") props.uniqueId = uuid;
        if (typeof props.tooltipInfo === "undefined") props.tooltipInfo = {};

        this.initialise({
            targetNode: props.targetNode,
            parentNodeName: props.parentNodeName,
            uniqueId: props.uniqueId,
            tooltipInfo: props.tooltipInfo,
            dataURL: props.dataURL
        });
    }
    initialise(data) {
        var card = this.getParentNode(data.targetNode, data.parentNodeName);
        var cardRect = card.getBoundingClientRect();

        if (cardRect) {
            this.state = {
                uniqueId: hashCode(data.uniqueId),
                tooltipInfo: data.tooltipInfo,
                isFadingOut: false,
                dataURL: data.dataURL,
                isRendered: false,
                targetNode: data.targetNode,
                parentNodeName: data.parentNodeName,
                animationDuration: 200,
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
    }

    abortClose() {
        this.state.isFadingOut = false;
        var tooltipNode = document.getElementById(this.state.uniqueId);
        tooltipNode.className = "tooltip-wrapper tooltip-fade-show";
    }

    destructor(callback) {
        var tooltipNode = document.getElementById(this.state.uniqueId);
        if (tooltipNode) {
            this.state.isFadingOut = true;
            tooltipNode.className = "tooltip-wrapper";
            setTimeout(() => {
                if (this.state.isFadingOut) {
                    const nodeAfterDelay = document.getElementById(this.state.uniqueId);
                    if (nodeAfterDelay) {
                        document.body.removeChild(nodeAfterDelay);
                        callback({node: null, error: null});
                    } else {
                        callback({node: null, error: "No node was found in the DOM tree"});
                    }
                }
            }, this.state.animationDuration);
        }
    }

    setPosition(node) {
        const bodyRect = document.body.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();

        var offsetTop = (this.state.bounds.distanceFromTopLayoutMargin - bodyRect.top) + this.state.frame.size.height;
        var offsetLeft = this.state.bounds.distanceFromLeftLayoutMargin + this.state.frame.size.width;

        // Balance both sides of the equation, we are adding height to our offsetTop so need to
        // that here to check bounds of off screen elements.
        const viewPortOffsetToBottomMargin = ((bodyRect.top - window.innerHeight.height) + this.state.frame.size.height) * -1;
        const viewPortOffsetToTopMargin = ((bodyRect.top) - this.state.frame.size.height) * -1;

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
            if ((offsetTop + rect.height) > viewPortOffsetToTopMargin && (offsetTop) < (viewPortOffsetToTopMargin + rect.height)) {
                offsetLeft = offsetLeft - (nodeRect.width / 2);
                node.style.setProperty("top", `${(offsetTop + this.state.frame.size.height) - 20}px`);
                node.style.setProperty("left", `${offsetLeft}px`);
            } else {
                offsetLeft = offsetLeft - (rect.width / 2);
                node.style.setProperty("top", `${(offsetTop - rect.height - 14) - this.state.frame.size.height / 4}px`);
                node.style.setProperty("left", `${offsetLeft}px`);
            }
            // Check if the left or right margins are out of bounds
            if (offsetLeft < 0 || offsetLeft === 0) node.style.setProperty("left", "10px");
            if ((offsetLeft + rect.width) > window.innerWidth) {
                const overflow = (offsetLeft + rect.width) - window.innerWidth;
                const newLeft = offsetLeft - overflow - 40 < 0 ? 10 : offsetLeft - overflow - 30;
                node.style.setProperty("left", `${newLeft}px`);
            }

            return node
        }
    }

    getParentNode(el, selector) {
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
    }
    
    updateTooltipInfo() {
        const data = this.state.tooltipInfo;
        const node = document.getElementById(this.state.uniqueId);

        if(node) {
            const cardStats = data.effects.map((effect) => {
                return `<p>${effect.attribute} [${effect.operation}]</p>`;
            });

            var nodeContent = '';
            nodeContent += '<div class="card-tooltip">';
            nodeContent += '      <div class="head-bar">';
            nodeContent += `          <span class="head-card-name">${data.name}</span>`;
            nodeContent += '          <div class="head-card-row">';
            nodeContent += `              <span class="head-card-type">Equipment</span>`;
            nodeContent += `              <span class="head-card-cost">Cost: ${data.cost}</span>`;
            nodeContent += '          </div>';
            nodeContent += '          <div class="head-card-row">';
            nodeContent += `              <span class="head-card-affinity">${data.affinity}</span>`;
            nodeContent += `              <span class="head-card-rarity">Common</span>`;
            nodeContent += '          </div>';
            nodeContent += '      </div>';
            nodeContent += '      <div class="card-content">';
            nodeContent += `          ${cardStats}`;
            nodeContent += `          $Upgrade slots: {data.upgradeSlots}`;
            nodeContent += '      </div>';
            nodeContent += '</div>';

            node.innerHTML = nodeContent;
            this.setPosition(node);
        }
    }

    render() {
        if (!this.state.isRendered && !document.getElementById(this.state.uniqueId)) {

            ajax({
                contentType : "application/json",
                returnType : "json",
                type : "GET",
                url : this.state.dataURL,
                cache : true
            }, (error, data) => {
                if(error === null && data !== null) {
                    this.state.tooltipInfo = data;
                    this.updateTooltipInfo();
                } else {
                    console.log(`Error: ${error.code}.  Message: ${error.message}`);
                }
            });

            this.state.isRendered = true;
            var rootNode = document.createElement("div");
            rootNode.setAttribute("id", this.state.uniqueId);
            rootNode.setAttribute("class", "tooltip-wrapper");
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
            setTimeout(() => {
                rootNode.className = "tooltip-wrapper tooltip-fade-show";
            }, 100);
        }
    }
}