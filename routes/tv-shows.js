const express = require('express');

const router = express.Router();

const nowplaying = require('../helpers/tv-shows/now-playing');
const toprated = require('../helpers/tv-shows/top-rated');
const popular = require('../helpers/tv-shows/popular');


router.get('/', async(req, res) => {
    const current_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('tv-shows', { data: await nowplaying, current_url, popular: await popular, toprated: await toprated });
});


module.exports = router;