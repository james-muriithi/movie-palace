const API_URL = 'https://api.themoviedb.org/3/';
const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';
const STREAM_URL = 'https://www.vidstreamapi.com/stream_src.php';
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const API_KEY = process.env.API_KEY || ''; //moviedb api key
const STREAM_API_KEY = process.env.STREAM_API_KEY || ''; //stream api key

const urls = {
    API_URL,
    IMAGE_URL,
    STREAM_URL,
    API_KEY,
    STREAM_API_KEY
}

module.exports = urls