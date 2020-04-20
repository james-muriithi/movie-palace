const express = require('express');

const router = express.Router();
const upcoming = require('../helpers/movies/upcoming-movies');
const nowplaying = require('../helpers/movies/now-playing');
// const toprated = require('../helpers/movies/top-rated');
const popular = require('../helpers/movies/popular');


router.get('/', async(req, res) => {
    const current_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('movies', { data: await nowplaying, current_url, popular: await popular, toprated: await upcoming });
});


module.exports = router;