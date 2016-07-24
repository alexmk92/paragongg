var Notification = function() {
    this.initialiseNotifications = function() {
        return true;
    };
    /**
     * Dismisses the notification if it is clicked prematurely
     */
    this.dismissNotification = function(targetNode) {
        var notificationNode = targetNode;
        console.log(notificationNode);
        if(notificationNode) {
            if(notificationNode.className.indexOf("notification notification-") < 0) {
                notificationNode = notificationNode.parentNode;
            }

            if(notificationNode && notificationNode.className !== null && notificationNode.parentNode !== null && notificationNode.parentNode.className === "notification-panel") {
                notificationNode.parentNode.removeChild(notificationNode);
            }
        }
    };
    /**
     * Add a new notification to the DOM, it will be added to the bottom of the stack
     */
    this.addNotification = function(type, message) {
        if(typeof type === "undefined" || type === null || type === "")
            type = "warning";
        var notificationNode = document.querySelector(".notification-panel");
        if(notificationNode) {
            var notification = document.createElement('div');
            notification.id = "notification";
            notification.className = "notification notification-" + type;

            notification.innerHTML = message + "<i class='fa fa-times' aria-hidden='true'></i>";
            notification.addEventListener("click", this.dismissNotification.bind(this, notification));

            notificationNode.appendChild(notification);

            setTimeout(function() {
                this.dismissNotification(notification);
            }.bind(this), 5000);
        }
    };
};

module.exports = Notification;