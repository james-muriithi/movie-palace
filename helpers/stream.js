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
                'Access-Control-Allow-Origin': '*',        
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
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