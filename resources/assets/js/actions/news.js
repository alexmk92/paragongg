import { ajax } from '../helpers'

export function fetchNews(skip, callback) {
    ajax({
        type : "GET",
        contentType : "application/json",
        url : `/api/v1/news?skip=${ skip }`
    }).then((payload) => {
       callback(null, payload.data);
    });
}