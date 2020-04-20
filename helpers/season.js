const axios = require('axios');
const urls = require('./urls');

let getSeason = (tv_id, season) => {
    const tvUrl = `${urls.API_URL}tv/${tv_id}/season/${season}?&language=en-US&api_key=${urls.API_KEY}`
    return axios.get(tvUrl)
        .then((response) => response.data)
        .then(res => {
            return res.episodes;
        })
        .catch((err) => {
            console.log(err)
            return [];
        });
}

module.exports = getSeason;