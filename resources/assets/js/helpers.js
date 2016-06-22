module.exports = {
    debounce: function(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    },
    // TODO REFACTOR TO SUPPORT AN ARRAY OF CLASSES
    hasClass: function(element, selector) {
        if(!element) { return false; }
        return element.className.indexOf(selector) > -1;
    },
    getFormattedCardDescription: function(description) {
        return description
            .replace("<", "")
            .replace("</", "")
            .replace("keyBurning", "burning");
    },
    getFormattedStatistic: function(statLabel) {
        switch(statLabel.toUpperCase()) {
            case "ATTACKSPEEDRATING": return { label : "Attack Speed", icon: "pgg pgg-attack-speed", modifier : "" }; break;
            case "COOLDOWNREDUCTIONPERCENTAGE": return { label : "Cooldown Reduction", icon: "pgg pgg-cooldown-reduction", modifier : "%" }; break;
            case "MAXENERGY" : return { label : "Max Mana", icon: "pgg pgg-max-mana", modifier : "" }; break;
            case "MAXHEALTH" : return { label : "Max Health", icon: "pgg pgg-max-health", modifier : "" }; break;
            case "ENERGYREGENRATE" : return { label : "Energy Regen", icon: "pgg pgg-mana-regeneration", modifier : "/s" }; break;
            case "ATTACKRATING" : return { label : "Physical Damage", icon: "pgg pgg-physical-damage", modifier : "" }; break;
            case "LIFESTEALRATING" : return { label : "Lifesteal", icon: "pgg pgg-lifesteal", modifier : "%" }; break;
            case "PHYSICALPENETRATIONRATING" : return { label : "Physical Pen", icon: "pgg pgg-physical-penetration", modifier : "%" }; break;
            case "ENERGYPENETRATIONRATING" : return { label : "Energy Pen", icon: "pgg pgg-armor-penetration", modifier : "%" }; break;
            case "CRITICALDAMAGEBONUS" : return { label : "Critical Damage", icon: "pgg pgg-critical-strike-damage", modifier : "" }; break;
            case "CRITICALDAMAGECHANCE" : return { label : "Critical Chance", icon: "pgg pgg-critical-strike-chance", modifier : "%" }; break;
            case "HEALTHREGENRATE" : return { label : "Health Regen", icon: "pgg pgg-health-regeneration", modifier : "/s" }; break;
            case "ENERGYRESISTANCERATING" : return { label : "Energy Armor", icon: "pgg pgg-energy-armor", modifier : "" }; break;
            case "PHYSICALRESISTANCERATING" : return { label : "Physical Armor", icon : "pgg pgg-physical-armor", modifier : "" }; break;
            case "WELLRIGPLACEMENTTIMER" : return { label : "Harvester Placement Time", icon: "pgg pgg-harvester-placement-time", modifier : "/s" }; break;
            default : return { label : ("undefined label: " + statLabel), icon: "", modifier : "" };
        }
    },
    prettyDate : function(time)
    {
        var local = new Date();
        var system_date = new Date(Date.parse(time));
        var user_date = new Date(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate(),  local.getUTCHours(), local.getUTCMinutes(), local.getUTCSeconds());

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
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = 16 * Math.random() | 0;
            return ('x' == c ? r : r & 3 | 8).toString(16)
        });
    },
    hashCode : function(str) {
        return str.split('').reduce(function (prevHash, currVal) {
            return (prevHash << 5) - prevHash + currVal.charCodeAt(0);
        }, 0);    },
    delimitNumbers : function(str) {
        return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
            return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
        });
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
     * @param callback - Callback function to be implemented on invoker once the promise has been resolved or rejected
     */
    ajax: function ajax(payload) {
        return new Promise(function (resolve, reject) {
            if (typeof payload.contentType === "undefined") payload.contentType = "application/x-www-form-urlencoded";
            if (typeof payload.cache === "undefined") payload.cache = true;
            if (typeof payload.data === "undefined") payload.data = [];
            if (typeof payload.headers === "undefined") payload.headers = [];
            if (typeof payload.returnType === "undefined") payload.returnType = "json";
            if (typeof payload.type === "undefined") payload.type = "GET";
            if (typeof payload.url === "undefined") callback({ code: 400, message: "A URL must be supplied for a request to be made. Please ensure your payload object include a url property" }, null);

            var httpRequest;
            var requestData = "";

            // Set up Parsers for our return type, this allows us to do a quick callback
            var parsers = new Map([["json", JSON.parse], ["text", function (text) {
                    return text;
                }], ["_", function () {
                    return null;
                }]]),
                t = payload.returnType.toLowerCase();
            if (!parsers.has(t)) t = "_";

            // Check if we don't want to cache this request, if a user sets cache to true
            // we check for false here as the internal block fires a nocache url.
            if (payload.type === "GET" && !payload.cache) payload.url = payload.url + "?_=" + new Date().getTime();

            if (window.XMLHttpRequest) {
                httpRequest = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
            } else {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
            }

            // Set headers
            httpRequest.open(payload.type, payload.url, true);
            httpRequest.setRequestHeader("Content-type", payload.contentType);
            payload.headers.map(function (object) {
                Object.keys(object).forEach(function (key) {
                    httpRequest.setRequestHeader(key, object[key]);
                });
            });

            // Build the payload to send
            if (payload.contentType.toLowerCase() === "application/x-www-form-urlencoded") {
                payload.data.map(function (object) {
                    Object.keys(object).forEach(function (key) {
                        requestData += key + "=" + object[key] + "&";
                    });
                });
                requestData = requestData.replace(/&\s*$/, "");
            } else if (payload.contentType.toLowerCase() === "application/json") {
                requestData = payload.data;
            }

            // Initialise the listener on request
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        if (httpRequest.responseText === null) {
                            reject(Error(httpRequest.statusText));
                        }
                        resolve({ data: parsers.get(t)(httpRequest.responseText) });
                    } else {
                        reject(Error(httpRequest.statusText));
                    }
                }
            };

            httpRequest.send(requestData);
        });
    },
    heroOrGameplay: function(element) {
        if(element.value == "gameplay") {
            document.getElementById('hero-form').style.display = 'none';
        } else {
            document.getElementById('hero-form').style.display = 'block';
        }
    },
    generateSlug: function(element) {
        return document.getElementById('url-slug').value = this.convertToSlug(element.value);
    },
    convertToSlug: function(Text) {
        return Text
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-');
    },
    S3URL: function() {
        return 'https://s3-eu-west-1.amazonaws.com/paragon.gg/';
    },
    // http://stackoverflow.com/a/133997/826479
    post: function(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "_token");
        hiddenField.setAttribute("value", csrf);
        
        form.appendChild(hiddenField);

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }
};