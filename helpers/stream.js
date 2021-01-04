const axios = require('axios');
const qs = require('qs');
const { STREAM_URL, STREAM_API_KEY } = require('./urls')

    const iframeSrc = (id, season = '', episode = '') => {
        api='d3670532ab1cd85d042cbe4f922f726b';
        url = 'https://www.vidstreamapi.com/stream_src.php';
        request = new XMLHttpRequest();
        request.open("POST", url);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("api="+STREAM_API_KEY+"&id="+id+"&season="+season+"&episode="+episode);
        request.onreadystatechange = function () {
            if (request.status === 200){
                return request.response;
            }
            return null;
        }
    }

module.exports = iframeSrc