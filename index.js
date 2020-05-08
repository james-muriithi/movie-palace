const express = require('express');
const compression = require('compression')
const path = require('path');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const indexRoute = require('./routes/home');
const searchRoute = require('./routes/search');
const singleMovieRoute = require('./routes/movie');
const singleTvShowRoute = require('./routes/tv');
const moviesRoute = require('./routes/movies');
const tvShowsRoute = require('./routes/tv-shows');
const suggestionsRoute = require('./routes/suggestions');


let https_redirect = function(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] != 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        } else {
            return next();
        }
    } else {
        return next();
    }
};

app.use(cors());
app.use(compression());
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(https_redirect);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use('/search', express.static(__dirname + '/public'), searchRoute);
app.use('/movie', express.static(__dirname + '/public'), singleMovieRoute);
app.use('/movies', express.static(__dirname + '/public'), moviesRoute);
app.use('/tv', express.static(__dirname + '/public'), singleTvShowRoute);
app.use('/tv-shows', express.static(__dirname + '/public'), tvShowsRoute);
app.use('/suggestions', suggestionsRoute);

app.use('/', indexRoute);


// app.use('/*', express.static(__dirname + '/public'), function(req, res, next) {
//     res.status(404);
//     res.render('404');
//     next()
// });


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});