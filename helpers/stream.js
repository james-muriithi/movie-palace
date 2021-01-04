const axios = require('axios');
const qs = require('qs');
const { STREAM_URL, STREAM_API_KEY } = require('./urls')

const iframeSrc = (id, season = '', episode = '') => {
    const params = {
        api: STREAM_API_KEY,
        id,
        season,
        episode
    }

    return axios.post(STREAM_URL, qs.stringify(params), {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            'User-Agent': 'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; RM-1152) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254'
        }
    }).then(data => {
        console.log(data);
        return data.data;
    })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

module.exports = iframeSrc