/*
 * Any component with the .draggable class may be dragged by Draggable.
 * Draggable maintains a data structure from the source component, handles
 * any re-ordering and then returns the updated object
 */

var Helpers = require('../helpers');

var Draggable = function(dataSource, component, type) {
    this.draggableState = {
        dataSource : dataSource, // The data source we are tracking, this will update react state
        component : component, // The React component which we will send delegate messages to
        type : type, // If we want to track multiple drag items we can do so with this string, the consumer would check the type in onDraggableDataSourceChanged
        dragNode : null, // A deep copy of the inactive node, used so we can have a tooltip follow the cursor
        inactiveNode : null, // Reference to the current dragging node, we set its opacity to an inactive state
        expireTimerActive : false, // Expire timer determines whether to abort a drag
        currentItemIndex : -1, // -1 if no item is selected, else the index we want to modify
        itemContainer: null,  // This is the parent of the draggable component, we reference coordinates with this
        itemHeight: 0, // The height of the item, used so we can determine the new position
        totalItems: 0, // The number of items in the collection so we can find the new index
        usesAnchor: false,
        draggableAnchorSet: false,
        anchorX: 145,
        anchorY : 84
    };
};

Draggable.prototype.onDataSourceUpdated = function() {
    this.draggableState.component.onDraggableDataSourceChanged(this.draggableState.dataSource, this.draggableState.type);
};

// Safety method to ensure that the data source is always an object
Draggable.prototype.setDataSource = function(dataSource, shouldUpdateComponent) {
    if(!Helpers.isNullOrUndefined(dataSource)) {
        this.draggableState.dataSource = dataSource;
        this.draggableState.totalItems = dataSource.length;
        if(shouldUpdateComponent) {
            this.onDataSourceUpdated();
        }
    }
};

Draggable.prototype.beginDrag = function(itemIndex, event) {
    var elem = event.target;
    if(!Helpers.isNullOrUndefined(elem)) {
        // Reset the anchor point
        this.draggableState.anchorX = 0;
        this.draggableState.anchorY = 0;
        this.draggableState.draggableAnchorSet = false;

        // Get the node with the draggable class.
        if(!elem.className.indexOf('draggable') > -1) {
            var attempts = 10;
            while(attempts > 0) {
                if(elem.className.indexOf('draggable') > -1) {
                    attempts = 0;
                } else {
                    elem = elem.parentNode;
                    attempts--;
                }
            }
            // If the parent container doesn't exist, set it here:
            var parentElem = elem;
            if(Helpers.isNullOrUndefined(this.draggableState.itemContainer)) {
                attempts = 10;
                while(attempts > 0) {
                    if(parentElem.parentNode.className.indexOf('draggable-container') > -1) {
                        this.draggableState.itemContainer = parentElem.parentNode;
                        attempts = 0;
                    } else {
                        attempts--;
                        parentElem = parentElem.parentNode;
                    }
                }
            }

            this.draggableState.itemHeight = elem.getBoundingClientRect().height;

            this.draggableState.dragNode = elem.cloneNode(true);
            this.draggableState.dragNode.id = 'active-drag-node';

            this.draggableState.inactiveNode = elem;
            this.draggableState.inactiveNode.id = 'drag-inactive';

            this.draggableState.currentItemIndex = itemIndex;
        }
    }
};

Draggable.prototype.setDraggableAnchor = function(mouseX, mouseY) {
    // Set the anchor for where the tooltip origin should start, relative to the item body
    if(this.draggableState.usesAnchor && !this.draggableState.draggableAnchorSet) {
        // Map the mouses current x/y coords to the anchor point on the tooltip body
        // add as this will be 0 indexed, this allows us to find the correct top offset as its starting point
        var itemHeight = this.draggableState.itemHeight;

        // Map the x/y coordinates to the container so we can find how much we moved, this will give us a 0,0 coordinate space
        var containerBounds = this.draggableState.itemContainer.getBoundingClientRect();

        // get the ending client x/y position
        var startX = (mouseX + document.body.scrollLeft) - containerBounds.left;
        var startY = (mouseY + document.body.scrollTop) - containerBounds.top;

        // Find which node is being intersected
        var foundAnchor = false;
        for(var i = 0; i < this.draggableState.totalItems; i++) {
            var heightAtIndex = itemHeight * (i+1);
            var upperBounds = heightAtIndex;
            var lowerBounds = heightAtIndex - itemHeight;
            if(startY > lowerBounds && startY < upperBounds && !foundAnchor) {
                foundAnchor = true;
                this.draggableState.anchorX = Math.ceil(startX);
                //this.draggableState.anchorY = Math.ceil((upperBounds - startY));
            }
        }
        this.draggableState.draggableAnchorSet = true;
    }
};

Draggable.prototype.updateDragPosition = function(e) {
    if(e) {
        var mouseX = e.clientX + document.body.scrollLeft;
        var mouseY = e.clientY + document.body.scrollTop;

        if(!Helpers.isNullOrUndefined(this.draggableState.dragNode)) {
            this.setDraggableAnchor(mouseX, mouseY);

            var dragTooltip = document.querySelector('#drag-tooltip-container');
            if(Helpers.isNullOrUndefined(dragTooltip)) {
                dragTooltip = document.createElement('div');
                dragTooltip.id = 'drag-tooltip-container';
                dragTooltip.style.position = 'absolute';
                dragTooltip.style.zIndex = 999999999;

                dragTooltip.appendChild(this.draggableState.dragNode);
                document.body.appendChild(dragTooltip);
            }
            dragTooltip.style.top = (mouseY - this.draggableState.anchorY) + 'px';
            dragTooltip.style.left = (mouseX - this.draggableState.anchorX) + 'px';
        }
        this.highlightDropzone(mouseY);
    }
};

Draggable.prototype.endDrag = function(e) {
    var newDataSource = this.computeNewIndexes(e);
    this.resetChildClasses();
    this.cleanup();

    // Invoke
    if(!Helpers.isNullOrUndefined(newDataSource)) {
        this.setDataSource(newDataSource, true);
    }
};

Draggable.prototype.cleanup = function() {
    // Remove any draggable styles and reset the inactive node to null
    if(this.draggableState.inactiveNode) {
        this.draggableState.inactiveNode.id = '';
        this.draggableState.inactiveNode = null;
    }
    // Destroy the 'tooltip' for the drag node
    if(this.draggableState.dragNode) {
        var dragTooltip = document.querySelector('#drag-tooltip-container');
        if(dragTooltip) {
            document.body.removeChild(dragTooltip);
        }
        this.draggableState.dragNode = null;
    }

    // Destroy the item container, as this could change on a different drag instance
    if(this.draggableState.itemContainer) {
        this.draggableState.itemContainer = null;
    }

    // Reset the current item index, we don't want invalid drags
    this.draggableState.currentItemIndex = -1;
};

Draggable.prototype.highlightDropzone = function(mouseY) {
    this.resetChildClasses();
    if(this.draggableState.itemContainer) {
        var childNodes = this.draggableState.itemContainer.getElementsByTagName('li');
        if(!Helpers.isNullOrUndefined(childNodes)) {
            // This will hide the border for ones we dont want to place
            var foundDraggable = false;
            for(var i = 0; i < childNodes.length; i++) {
                if(this.doesNodeIntersectDraggableAtIndex(mouseY, i) && !foundDraggable) {
                    foundDraggable = true;
                    childNodes[i].className = childNodes[i].className.replace('droppable-hidden', '').trim();
                }
            }
        }
    }
};

Draggable.prototype.resetChildClasses = function() {
    if(this.draggableState.itemContainer) {
        var childNodes = this.draggableState.itemContainer.getElementsByTagName('li');
        if(!Helpers.isNullOrUndefined(childNodes)) {
            for(var i = 0; i < childNodes.length; i++) {
                var childNode = childNodes[i];
                // Reset the class to base
                var classString = childNode.className;
                classString = classString.replace('droppable', '');
                classString = classString.replace('droppable-hidden', '');
                classString = classString.trim();

                // Always have a droppable class as this applies the border color
                classString += ' droppable';
                classString += ' droppable-hidden';
                childNode.className = classString;
            }
        }
    }
};

Draggable.prototype.doesNodeIntersectDraggableAtIndex = function(currentY, index) {
    if(this.draggableState.currentItemIndex !== -1 && this.draggableState.currentItemIndex !== index) {
        // add as this will be 0 indexed, this allows us to find the correct top offset as its starting point
        var intersectNodeHeight = this.draggableState.itemHeight * (index + 1);

        // Map the x/y coordinates to the container so we can find how much we moved, this will give us a 0,0 coordinate space
        var containerBounds = this.draggableState.itemContainer.getBoundingClientRect();
        currentY -= containerBounds.top;

        var upperInsertionBounds = intersectNodeHeight;
        var lowerInsertionBounds = upperInsertionBounds - this.draggableState.itemHeight;

        if(currentY < upperInsertionBounds && currentY > lowerInsertionBounds) {
            return true;
        }
    }
    return false;
};

Draggable.prototype.computeNewIndexes = function(e) {
    if(Helpers.isNullOrUndefined(e)) return null;

    // Get the current item and find its top offset from its parent container
    if(this.draggableState.currentItemIndex !== -1) {
        // add as this will be 0 indexed, this allows us to find the correct top offset as its starting point
        var itemStartingOffset = this.draggableState.itemHeight * (this.draggableState.currentItemIndex + 1);
        var tolerance = this.draggableState.itemHeight * 0.45; // we want a threshold of when indexes should be swapped 65% here

        // get the ending client x/y position of the mouse (we are not concerned with the X position as height only determines new index)
        var endY = e.clientY + document.body.scrollTop;

        // Map the x/y coordinates to the container so we can find how much we moved, this will give us a 0,0 coordinate space
        var containerBounds = this.draggableState.itemContainer.getBoundingClientRect();
        endY -= containerBounds.top;

        // Lets now check what the new index bounds should be
        var swapIndex = -1;
        if(endY < (itemStartingOffset - tolerance)) {
            // Pivot down the table
            if(this.draggableState.currentItemIndex !== 0) {
                // Loop backward through indexes and check which bounds we are in
                for(var i = 0; i < this.draggableState.currentItemIndex; i++) {
                    var upperInsertionBounds = this.draggableState.itemHeight * (i + 1);
                    var lowerInsertionBounds = upperInsertionBounds - this.draggableState.itemHeight;
                    if(endY < upperInsertionBounds && endY > lowerInsertionBounds && swapIndex === -1) {
                        swapIndex = i;
                    }
                }
            } else {
                return null;
            }
        } else if(endY > (itemStartingOffset - tolerance)) {
            // Pivot up the table
            if(this.draggableState.currentItemIndex !== (this.draggableState.totalItems -1)) {
                // Loop backward through indexes and check which bounds we are in
                for(var i = this.draggableState.currentItemIndex; i < this.draggableState.totalItems; i++) {
                    var upperInsertionBounds = this.draggableState.itemHeight * (i + 1);
                    var lowerInsertionBounds = upperInsertionBounds - this.draggableState.itemHeight;
                    if(endY < upperInsertionBounds && endY > lowerInsertionBounds && swapIndex === -1) {
                        swapIndex = i;
                    }
                }
            } else {
                return null;
            }
        }

        if(swapIndex !== -1) {
            // Swap items at the index:
            var tmpSwapDataA = this.draggableState.dataSource[this.draggableState.currentItemIndex];
            var tmpSwapDataB = this.draggableState.dataSource[swapIndex];

            var newDataSource = this.draggableState.dataSource;
            newDataSource[this.draggableState.currentItemIndex] = tmpSwapDataB;
            newDataSource[swapIndex] = tmpSwapDataA;

            return newDataSource;
        } else {
            return null;
        }
    }
};

module.exports = Draggable;