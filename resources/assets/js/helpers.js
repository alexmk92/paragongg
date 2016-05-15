module.exports = {
     prettyDate : function(time)
     {
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
    uuid : function()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = 16 * Math.random() | 0;
            return ('x' == c ? r : r & 3 | 8).toString(16)
        });
    },
    hashCode : function(str) {
        return str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
    },
    /**
     * Makes an AJAX request to a given URL and calls back to the user
     * @param payload - Fields
        * contentType (String) : Defaults to "application/x-www-form-urlencoded"
        * cache (Boolean) : Defaults to false, we should only cache GET requests
        * data (Array<Object>) : An array object containing data to send.  Must be Key Value pairs { key : "", value : "" }
        * headers (Array<Object>) : Defaults to [], pass an array of objects { type : "", value : "" }
        * returnType (String) : Defaults to JSON, specifies the return type from our request, text/json etc.
        * type (String) : The type of request we are going to make, GET/PUT/POST/DELETE
        * url (String) : The URL that we will hit, returns a 400 error if no url is supplied
     * @param callback - Callback function to be implemented on invoker, calls back with an error, message and data object
     */
    ajax : function(payload, callback)
    {
        if(typeof payload.contentType === "undefined") payload.contentType = "application/x-www-form-urlencoded";
        if(typeof payload.cache === "undefined") payload.cache = true;
        if(typeof payload.data === "undefined") payload.data = [];
        if(typeof payload.headers === "undefined") payload.headers = [];
        if(typeof payload.returnType === "undefined") payload.returnType = "json";
        if(typeof payload.type === "undefined") payload.type = "GET";
        if(typeof payload.url === "undefined") callback({ code : 400, message: "A URL must be supplied for a request to be made. Please ensure your payload object include a url property"}, null);

        var httpRequest;
        var requestData = "";

        // Set up Parsers for our return type, this allows us to do a quick callback
        let parsers = new Map([
            ["json", JSON.parse],
            ["text", (text) => text],
            ["_", () => null]
        ]), t = payload.returnType.toLowerCase();
        if(!parsers.has(t))
            t = "_";

        // Check if we don't want to cache this request, if a user sets cache to true
        // we check for false here as the internal block fires a nocache url.
        if(payload.type === "GET" && !payload.cache)
            payload.url = `${payload.url}?_=${new Date().getTime()}`;

        console.log("URL IS " + payload.url);

        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
        } else {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
        }

        // Set headers
        httpRequest.open(payload.type, payload.url, true);
        httpRequest.setRequestHeader("Content-type", payload.contentType);
        payload.headers.map((object) => {
            Object.keys(object).forEach((key) => {
                httpRequest.setRequestHeader(key, object[key]);
                console.log("Added header:");
                console.log(`${key} : ${object[key]}`);
            });
        });

        // Build the payload to send
        if(payload.contentType.toLowerCase() === "application/x-www-form-urlencoded") {
            payload.data.map((object) => {
                Object.keys(object).forEach((key) => {
                    requestData += `${key}=${object[key]}&`;
                });
            });
            requestData = requestData.replace(/&\s*$/, "");
        } else if(payload.contentType.toLowerCase() === "application/json") {
            requestData = payload.data
            console.log("SET JSON REQUEST DATA")
        }

        // Initialise the listener on request
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                //console.log(httpRequest);
                if (httpRequest.status === 200) {
                    callback(null, parsers.get(t)(httpRequest.responseText));
                } else {
                    callback({code : httpRequest.status, message : httpRequest.statusText}, null);
                }
            }
        };

        console.log("Headers are ");
        console.log("Request data is, now sending:");
        console.log(requestData);
        httpRequest.send(requestData);
    }
};