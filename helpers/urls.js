const API_URL = 'https://api.themoviedb.org/3/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const API_KEY = process.env.API_KEY || ''; //moviedb api key

const urls = {
    API_URL,
    IMAGE_URL,
    API_KEY
}

module.exports = urls