const axios = require('axios');
const urls = require('../helpers/urls');

let getMovie = async(id) => {
    const movieUrl = `${urls.API_URL}movie/${id}?&language=en-US&api_key=${urls.API_KEY}&append_to_response=videos,keywords,credits`
    return axios.get(movieUrl)
        .then((response) => response.data)
        .then(res => {
            let gens = []
            let country = []
            res.genres.map(item => { gens.push(item.name) });
            res.production_countries.map(item => { country.push(item.name) });
            res.genres = gens
            if (country.length > 3) { country = country.slice(0, 3) }
            res.production_countries = country

            if (res.keywords) {
                let keywords = []
                res.keywords.keywords.map(item => { keywords.push(item.name) });
                res.keywords = keywords
            }

            return res;
        })
        .catch((err) => {
            console.log(err)
            return [];
        });
}

module.exports = getMovie;