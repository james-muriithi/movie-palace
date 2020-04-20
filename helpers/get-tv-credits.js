const axios = require('axios');
const urls = require('../helpers/urls');


let getTvShow = async(id) => {
    const tvUrl = `${urls.API_URL}tv/${id}/credits?&language=en-US&api_key=${urls.API_KEY}&append_to_response=videos`
    return axios.get(tvUrl)
        .then((response) => response.data)
        .then(res => res)
        .catch((err) => {
            console.log(err)
            return [];
        });
}

module.exports = getTvShow;