const axios = require('axios');
const urls = require('../urls');
const upcomingUrl = `${urls.API_URL}tv/top_rated?api_key=${urls.API_KEY}`;
const genres = require('../genres');


let data = axios.get(upcomingUrl)
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
        return [];
    });

module.exports = data;