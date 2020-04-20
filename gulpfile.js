'use strict'

const gulp = require('gulp');
const ejs = require('gulp-minify-ejs');
const purgecss = require('gulp-purgecss');
const sourcemaps = require('gulp-sourcemaps');
const css = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;

const ejsGulp = function() {
    return gulp.src(['src/views/**/*.ejs', 'src/views/*.html'])
        .pipe(ejs())
        //.pipe(rename({suffix:".min"}))
        .pipe(gulp.dest('views/'))
}

const imagesGulp = function() {
    return gulp.src('src/assets/img/**')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('public/img'));
};
const iconsGulp = function() {
    return gulp.src('src/assets/icon/**')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('public/icon'));
};

const purgeCss = function() {
    return gulp.src('src/assets/css/*.css')
        .pipe(purgecss({
            content: ['src/views/**/*.ejs'],
            whitelistPatterns: [/active$/],
            whitelistPatternsChildren: [/active$/]
        }))
        .pipe(sourcemaps.init())
        .pipe(css())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css/'))
};

const jsGulp = function() {
    return gulp.src('src/assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));
};




exports.build = gulp.parallel(ejsGulp, purgeCss, imagesGulp, jsGulp, iconsGulp);

// exports.watch = gulp.parallel(server, watch);