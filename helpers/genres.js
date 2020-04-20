const axios = require('axios');

const urls = require('./urls');

const movieUrl = `${urls.API_URL}genre/movie/list?api_key=${urls.API_KEY}&language=en-US`;
const seriesUrl = `${urls.API_URL}genre/tv/list?api_key=${urls.API_KEY}&language=en-US`;

let movieGenreIds = axios.get(movieUrl)
    .then((response) => response.data)
    .then(res => {
        let genres = {}
        res.genres.map(genre => genres[genre.id] = genre.name)
        return genres
    })
    .catch((err) => {
        console.log(err)
        return [];
    });

let tvGenreIds = axios.get(seriesUrl)
    .then((response) => response.data)
    .then(res => {
        let genres = {}
        res.genres.map(genre => genres[genre.id] = genre.name)
        return genres
    })
    .catch((err) => {
        console.log(err)
        return {};
    });

let allGenres = Promise.all([tvGenreIds, movieGenreIds])
    .then((data1) => {
        let allG = {}
        data1.forEach(item => {
            for (const id in item) {
                if (item.hasOwnProperty(id)) {
                    allG[id] = item[id];
                }
            }
        })
        return allG
    })
    .catch((err) => {
        return {};
    });

const genres = {
    tvGenreIds,
    movieGenreIds,
    allGenres
}

module.exports = genres