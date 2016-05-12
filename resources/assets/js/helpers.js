module.exports = {
     prettyDate : function(time){
         var system_date = new Date(Date.parse(time));
         var user_date = new Date();

         var diff = Math.floor((user_date - system_date) / 1000);
         if (diff <= 1) {return "just now";}
         if (diff < 20) {return diff + " seconds ago";}
         if (diff < 40) {return "half a minute ago";}
         if (diff < 60) {return "less than a minute ago";}
         if (diff <= 90) {return "one minute ago";}
         if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
         if (diff <= 5400) {return "1 hour ago";}
         if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
         if (diff <= 129600) {return "1 day ago";}
         if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
         if (diff <= 777600) {return "1 week ago";}
         return "on " + system_date;
    },
    uuid : function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = 16 * Math.random() | 0;
            return ('x' == c ? r : r & 3 | 8).toString(16)
        });
    }
};