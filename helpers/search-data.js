const axios = require('axios');
const genres = require('./genres');


let data = async(searchUrl) => {
    let g = await genres.allGenres
    return axios.get(searchUrl)
        .then((response) => response.data)
        .then(res => {
            return res.results.map((item) => {
                if (!item.known_for_department) {
                    item.genre_ids.forEach(async(gen, index) => {
                        item.genre_ids[index] = g[gen] || ''
                    })
                    return item
                }
                return;
            });
        })
        .catch((err) => {
            return [];
        });
}

module.exports = data;