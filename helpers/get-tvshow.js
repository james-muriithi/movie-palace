const axios = require('axios');
const urls = require('../helpers/urls');


let getTvShow = async(id) => {
    const tvUrl = `${urls.API_URL}tv/${id}?&language=en-US&api_key=${urls.API_KEY}&append_to_response=videos,keywords`
    return axios.get(tvUrl)
        .then((response) => response.data)
        .then(async res => {
            let genres = []
            res.genres.map(item => { genres.push(item.name) });
            res.genres = genres

            if (res.keywords) {
                let keywords = []
                res.keywords.results.map(item => { keywords.push(item.name) });
                res.keywords = keywords
            }

            return res;
        })
        .catch((err) => {
            console.log(err)
            return [];
        });
}

module.exports = getTvShow;