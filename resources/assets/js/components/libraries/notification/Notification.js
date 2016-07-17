var Notification = function() {
    /**
     * Dismisses the notification if it is clicked prematurely
     */
    this.dismissNotification = function(event) {
        var notificationNode = event.target;
        console.log(notificationNode);
        if(notificationNode) {
            if(notificationNode.className.indexOf("notification notification-") < 0) {
                notificationNode = notificationNode.parentNode;
            }

            notificationNode.className += " fade-out";
            setTimeout(function() {
                if(notificationNode && notificationNode.className !== null && notificationNode.parentNode !== null && notificationNode.parentNode.className === "notification-panel") {
                    notificationNode.parentNode.removeChild(notificationNode);
                }
            }, 200);
        }
    };
    /**
     * Add a new notification to the DOM, it will be added to the bottom of the stack
     */
    this.addNotification = function(type, message) {
        console.log("TYPE IS: " + type + " AND MESSAGE IS: ", message);
        if(typeof type === "undefined" || type === null || type === "")
            type = "warning";

        //var notificationNode = document.querySelector(".notification-panel-wrapper");
        var notificationNode = document.querySelector(".notification-panel");
        if(notificationNode) {

            //return '<div id="notification" class="notification notification-'.$notification[0].'" onclick="this.style.display=\'none\';">'.$notification[1].'<i class="fa fa-times" aria-hidden="true"></i></div>';
            var notification = document.createElement('div');
            notification.id = "notification";
            notification.className = "notification notification-" + type;

            notification.innerHTML = message + "<i class='fa fa-times' aria-hidden='true'></i>";
            notification.addEventListener("click", this.dismissNotification);

            notificationNode.appendChild(notification);

            /*
            var notificationPanel = document.createElement("div");
            notificationPanel.className = "notification-panel";

            var notification = document.createElement("div");
            notification.className = "notification notification-" + type;

            notification.innerHTML = "<span class='notification-title'>" + message + "</span> <i class='fa fa-times' aria-hidden='true'/>";

            notificationPanel.appendChild(notification);

            if(notificationNode.appendChild(notificationPanel)) {
                notificationPanel.addEventListener("click", this.dismissNotification);

                setTimeout(function() {
                    if(notificationPanel) {
                        if(notificationNode.className.indexOf("notification-panel") > -1) {
                            var notificationToFade = notificationPanel;
                            if(notificationPanel.className !== "notification") {
                                for(var child=notificationPanel.firstChild; child!==null; child=child.nextSibling) {
                                    if(child.className !== null && child.className.indexOf("notification notification-") > -1) {
                                        notificationToFade = child;
                                    }
                                }
                            }
                            notificationToFade.className += " fade-out";
                            setTimeout(function() {
                                notificationNode.removeChild(notificationPanel);
                            }, 300)
                        }
                    }
                }, 5000);
            }
            */
        }
    };
};

module.exports = Notification;