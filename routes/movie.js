const express = require('express');

const router = express.Router();
const homeData = require('../helpers/trending');
const urls = require('../helpers/urls');
const movieData = require('../helpers/get-movie');
const movieRecommendations = require('../helpers/get-movie-recommendations');
// const Stream = require('../helpers/stream');


router.get('/:id', async(req, res, next) => {
    const id = req.params.id
    const current_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const data = await movieData(id)
    const recommendations = await movieRecommendations(id)
    // const iframeSrc = await Stream(id);
    // console.log(src);
    res.render('single-movie', { data, owl: true, recommendations, current_url, cast: data.credits.cast });
});

router.use('/*', function(req, res, next) {
    res.status(404);
    res.render('404');
    next()
});


// router.get('/', async(req, res) => {
//     if (req.query.q || req.query.query) {
//         const query = req.query.query || req.query.q
//         const url = `${urls.API_URL}search/multi?&language=en-US&page=1&include_adult=false&api_key=${urls.API_KEY}&query=${query}`

//         res.render('index', { data: await searchData(url) });
//     } else {
//         res.render('index', { data: await homeData });
//     }
// });

module.exports = router;