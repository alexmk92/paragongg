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
    getHeroImageURL: function(hero, size) {
        if(!hero) return "";
        
        if(!size) size = "small";
        return this.S3URL() + "images/heroes/" + hero.code + "/" + hero.image + "/portrait_" + size + ".png"
    },
    // To be used by all components that consume all stats, such as the StatPanel
    getAllStatistics: function() {
        return [
            { ref : "ATTACKSPEEDRATING", label : "Attack Speed", icon: "pgg pgg-attack-speed", modifier : "", value : 0, modified: false, multiplier: 1, statRef: "attack_speed" },
            { ref : "COOLDOWNREDUCTIONPERCENTAGE", label : "Cooldown Reduction", icon: "pgg pgg-cooldown-reduction", modifier : "%", value : 0, modified: false, multiplier: 100, statRef: "cooldown_reduction" },
            { ref : "MAXENERGY", label : "Max Mana", icon: "pgg pgg-max-mana", modifier : "", value : 0, modified: false, multiplier: 1, statRef: "max_mana" },
            { ref : "MAXHEALTH", label : "Max Health", icon: "pgg pgg-max-health", modifier : "", value : 0, modified: false, multiplier: 1, statRef: "max_health" },
            { ref : "ENERGYREGENRATE", label : "Energy Regen", icon: "pgg pgg-mana-regeneration", modifier : "/s", value : 0, modified: false, multiplier: 1, statRef: "mana_regen"   },
            { ref : "ATTACKRATING", label : "Physical Damage", icon: "pgg pgg-physical-damage", modifier : "", value : 0, modified: false, multiplier: 1, statRef: "physical_damage"   },
            { ref : "LIFESTEALRATING", label : "Lifesteal", icon: "pgg pgg-lifesteal", modifier : "", value : 0, modified: false, multiplier: 1, statRef: "lifesteal"   },
            { ref : "PHYSICALPENETRATIONRATING", label : "Physical Pen", icon: "pgg pgg-physical-penetration", modifier : "", value : 0, modified: false, multiplier: 1, statRef: "physical_pen"   },
            { ref : "ENERGYPENETRATIONRATING", label : "Energy Pen", icon: "pgg pgg-armor-penetration", modifier : "", value : 0, modified: false, multiplier: 1, statRef: "energy_pen"   },
            { ref : "CRITICALDAMAGEBONUS", label : "Critical Damage", icon: "pgg pgg-critical-strike-damage", modifier : "%", value : 0, modified: false, multiplier: 100, statRef: "crit_bonus"   },
            { ref : "CRITICALDAMAGECHANCE", label : "Critical Chance", icon: "pgg pgg-critical-strike-chance", modifier : "%", value : 0, modified: false, multiplier: 100, statRef: "crit_chance"   },
            { ref : "HEALTHREGENRATE", label : "Health Regen", icon: "pgg pgg-health-regeneration", modifier : "/s", value : 0, modified: false, multiplier: 1, statRef: "health_regen"  },
            { ref : "ENERGYRESISTANCERATING", label : "Energy Armor", icon: "pgg pgg-energy-armor", modifier : "", value : 0, modified: false, multiplier: 1, statRef: "energy_armor"   },
            { ref : "PHYSICALRESISTANCERATING", label : "Physical Armor", icon : "pgg pgg-physical-armor", modifier : "", value : 0, modified: false, multiplier: 1, statRef: "physical_armor"   },
            { ref : "WELLRIGPLACEMENTTIMER", label : "Placement Time", icon: "pgg pgg-harvester-placement-time", modifier : "s", value : 0, modified: false, multiplier: 1, statRef: ""   }
        ]
    },
    getAffinityColor: function(affinity) {
        switch (affinity.trim().toUpperCase()) {
            case "FURY": return "#c92a22";
            case "GROWTH": return "#7dab1a";
            case "ORDER": return "#e5c174";
            case "INTELLECT": return "#17a8e0";
            case "CORRUPTION": return "#7d005e";
            case "UNIVERSAL": return "#ccc";
            default: return "#000";
        }
    },
    getFormattedStatistic: function(statLabel) {
        switch(statLabel.toUpperCase()) {
            case "ATTACKSPEEDRATING": return { label : "Attack Speed", icon: "pgg pgg-attack-speed", modifier : "", multiplier: 1 }; break;
            case "COOLDOWNREDUCTIONPERCENTAGE": return { label : "Cooldown Reduction", icon: "pgg pgg-cooldown-reduction", modifier : "%", multiplier: 100 }; break;
            case "MAXENERGY" : return { label : "Max Mana", icon: "pgg pgg-max-mana", modifier : "", multiplier: 1 }; break;
            case "MAXHEALTH" : return { label : "Max Health", icon: "pgg pgg-max-health", modifier : "", multiplier: 1 }; break;
            case "ENERGYREGENRATE" : return { label : "Energy Regen", icon: "pgg pgg-mana-regeneration", modifier : "/s", multiplier: 1 }; break;
            case "ATTACKRATING" : return { label : "Physical Damage", icon: "pgg pgg-physical-damage", modifier : "", multiplier: 1 }; break;
            case "LIFESTEALRATING" : return { label : "Lifesteal", icon: "pgg pgg-lifesteal", modifier : "", multiplier: 1 }; break;
            case "PHYSICALPENETRATIONRATING" : return { label : "Physical Pen", icon: "pgg pgg-physical-penetration", modifier : "", multiplier: 1 }; break;
            case "ENERGYPENETRATIONRATING" : return { label : "Energy Pen", icon: "pgg pgg-armor-penetration", modifier : "", multiplier: 1 }; break;
            case "CRITICALDAMAGEBONUS" : return { label : "Critical Damage", icon: "pgg pgg-critical-strike-damage", modifier : "%", multiplier: 100 }; break;
            case "CRITICALDAMAGECHANCE" : return { label : "Critical Chance", icon: "pgg pgg-critical-strike-chance", modifier : "%", multiplier: 100 }; break;
            case "HEALTHREGENRATE" : return { label : "Health Regen", icon: "pgg pgg-health-regeneration", modifier : "/s", multiplier: 1 }; break;
            case "ENERGYRESISTANCERATING" : return { label : "Energy Armor", icon: "pgg pgg-energy-armor", modifier : "", multiplier: 1 }; break;
            case "PHYSICALRESISTANCERATING" : return { label : "Physical Armor", icon : "pgg pgg-physical-armor", modifier : "", multiplier: 1 }; break;
            case "WELLRIGPLACEMENTTIMER" : return { label : "Placement Time", icon: "pgg pgg-harvester-placement-time", modifier : "s", multiplier: 1 }; break;
            default : return { label : ("undefined label: " + statLabel), icon: "", modifier : "", multiplier: 1 }; break;
        }
    },
    getStatisticCategory: function(stat) {
        if(stat.includes("{ATTR:HP}")){
            return "HEALTH";
        }
        else if(stat.includes("{ATTR:MANA}")) {
            return "MANA";
        }
        else if(stat.includes("{ATTR:PHYSAR}") || stat.includes("{ATTR:ENAR}") || stat.includes("{ATTR:SHLD}")) {
            return "MITIGATION";
        }
        else if(stat.includes("{ATTR:ATKSPD}")) {
            return "ATTACK SPEED";
        }
        else if(stat.includes("{ATTR:SPD}") || stat.includes("{ATTR:MP}") ||
            stat.includes("{ATTR:DMGBNS}") || stat.includes("{ATTR:PHYSDMG}") || stat.includes("{ATTR:ENDMG}") ||
            stat.includes("{STATUS:BLEED}") || stat.includes("{STATUS:PSN}") || stat.includes("{STATUS:BURN}")) {
            return "DAMAGE";
        }
        else if(stat.includes("{ATTR:PHYSPEN}") || stat.includes("{ATTR:ENPEN}") || stat.includes("{STATUS:PEN}")) {
            return "PENETRATION";
        }
        else if(stat.includes("{ATTR:HPREG}")) {
            return "HEALTH REGEN";
        }
        else if(stat.includes("{ATTR:LFSTL}")) {
            return "LIFESTEAL";
        }
        else if(stat.includes("{ATTR:MPREG}")) {
            return "ENERGY REGEN";
        }
        else if(stat.includes("{ATTR:CRITCH}")) {
            return "CRIT";
        }
        else if(stat.includes("{STATUS:SLOW}")) {
            return "";
        }
        else if(stat.includes("{ATTR:CDR}")) {
            return "CDR";
        }

        // ATTR Strings dont work here as cant do includes ina  switch
        switch(stat) {
            case "ATTACKSPEEDRATING": return "ATTACK SPEED"; break;
            case "COOLDOWNREDUCTIONPERCENTAGE" : return "CDR"; break;
            case "MAXENERGY" : return "MANA"; break;
            case "MAXHEALTH": return "HEALTH"; break;
            case "ENERGYREGENRATE" : return "ENERGY REGEN"; break;
            case "ATTACKRATING" : return "DAMAGE"; break;
            case "LIFESTEALRATING" : return "LIFESTEAL"; break;
            case "PHYSICALPENETRATIONRATING" : return "PENETRATION"; break;
            case "ENERGYPENETRATIONRATING" : return "PENETRATION"; break;
            case "CRITICALDAMAGEBONUS" : return "CRIT"; break;
            case "CRITICALDAMAGECHANCE" : return "CRIT"; break;
            case "HEALTHREGENRATE" : return "HEALTH REGEN"; break;
            case "ENERGYRESISTANCERATING" : return "MITIGATION"; break;
            case "PHYSICALRESISTANCERATING" : return "MITIGATION"; break;
            case "WELLRIGPLACEMENTTIMER" : return ""; break;
            default : return ""; break;
        }
    },
    getCardImageURL: function(card, size, type) {
        if(!card) return "";

        if(!size) size = "medium";
        if(type === "icon")
            return this.S3URL() + "images/cards/" + card.code + "/" + card.icon + "/icon_" + size + '.png';
        else
            return this.S3URL() + 'images/cards/' + card.code + '/' + card.background + '/background_' + size.toLowerCase() + '.png';
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
    dropZeroesAndDelimitNumbers: function(str) {
        if(isNaN(parseFloat(Number(this.delimitNumbers(str)).toFixed(1)))) {
            return parseFloat((Number(str).toFixed(1)));
        } else {
            return parseFloat(Number(this.delimitNumbers(str)).toFixed(1))
        }
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
        return 'https://s3.amazonaws.com/paragongg-us/';
    },
    isClientMobile: function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        // Allows us to run the mobile code on desktop for dev purposes.
        if(!check)
            check = window.innerWidth <= 1050;

        return check;
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