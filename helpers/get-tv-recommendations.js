const axios = require('axios');
const genres = require('./genres');
const urls = require('../helpers/urls');

let getMovieRecommendations = async(id) => {
    const recommendationUrl = `${urls.API_URL}tv/${id}/recommendations?&language=en-US&api_key=${urls.API_KEY}`
    let g = await genres.allGenres
    return axios.get(recommendationUrl)
        .then((response) => response.data)
        .then(async res => {
            let g = await genres.allGenres
            return res.results.map((item) => {
                item.genre_ids.forEach((gen, index) => {
                    item.genre_ids[index] = g[gen]
                })
                return item
            });
        })
        .catch((err) => {
            console.log(err)
            return [];
        });
}

module.exports = getMovieRecommendations;