const express = require('express');

const router = express.Router();
const homeData = require('../helpers/trending');


router.get('/', async(req, res) => {
    const current_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('index', { data: await homeData, current_url });
});

module.exports = router;