const express = require('express');

const router = express.Router();
const {getTvShow, getTvEpisodes} = require('../helpers/get-tvshow');
const movieRecommendations = require('../helpers/get-tv-recommendations');
const tvcredits = require('../helpers/get-tv-credits');


router.get('/:id', async(req, res, next) => {
    const id = req.params.id
    const data = await getTvShow(id)
    const episodes = await getTvEpisodes(id);
    const cast = await tvcredits(id)
    const current_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const recommendations = await movieRecommendations(id)
    console.log(episodes);
    res.render('single-tvshow', { data, owl: true, recommendations, cast: cast.cast, current_url, episodes });
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