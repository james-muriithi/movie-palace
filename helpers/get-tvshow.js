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

let getTvEpisodes = async (id) => {
    const tvData = await getTvShow(id)
    let number_of_seasons = tvData.seasons ? tvData.seasons.length : 0;
    let episodes = [];
    for (let index = 0; index < number_of_seasons; index++) {
        let seasonUrl = `${urls.API_URL}tv/${id}/season/${index}?api_key=${urls.API_KEY}&language=en-US`
        axios.get(seasonUrl)
        .then((response) => response.data)
        .then(async res => {
            let i = parseInt(res.season_number);
            episodes.splice(i,0,res);
        })
        .catch((err) => {
            console.log(err)
            episodes.push({})
        });
    }

    return episodes;
}

module.exports = {getTvShow, getTvEpisodes};