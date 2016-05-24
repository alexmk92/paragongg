var Helpers = require('../helpers');

module.exports = {
    fetchNews: function(skip, callback) {
        Helpers.ajax({
            type : "GET",
            contentType : "application/json",
            url : `/api/v1/news?skip=${ skip }`
        }).then(function(payload) {
           callback(null, payload.data);
        });
    }
}