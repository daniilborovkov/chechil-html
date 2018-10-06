var gulp = require('gulp'),
    sync = require('browser-sync'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    mincss = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    pug = require('gulp-pug'),
    notify = require('gulp-notify'),
    babel = require('gulp-babel'),
    reload = sync.reload;

/**
 * run gulp watch dev server
 */
gulp.task('default', ['framework-prepare', 'scss', 'pug', 'img', 'fonts', 'js', 'js_vendor', 'css_vendor'], function () {
    sync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('./src/scss/**/*.scss', ['scss']);
    gulp.watch('./src/pug/**/*.pug', ['pug']);
    gulp.watch('./src/img/**/*.{svg, jpg, png, gif, jpeg}', ['img']);
    gulp.watch('./src/js/app.js', ['js']);
});

/**
 * pug compilation task
 */
gulp.task('pug', function () {
    gulp.src('./src/pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .on('error', notify.onError(function (err) {
            return "Pug: " + err;
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({
            stream: true
        }))
});

/**
 * less compilation task
 */
gulp.task('scss', function () {
    gulp.src('./src/scss/main.scss')
        .pipe(sass())
        .on('error', notify.onError(function (err) {
            return 'Scss: ' + err;
        }))
        .pipe(mincss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({
            stream: true
        }))
});

/**
 * Copy all bootstrap and\or other framework or grid files to dist
 */
gulp.task('framework-prepare', function () {
    gulp.src(('node_modules/font-awesome/fonts/**/*'))
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('')
});


/**
 * compile js or other to readeable in all browsers js
 */
gulp.task('js', function () {
    // todo: listen js
    gulp.src('./src/js/app.js')
        .pipe(babel())
        .on('error', notify.onError(function (err) {
            return "Js: " + err;
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('js_vendor', function () {
    let vendorArrays = [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/popper.js/dist/umd/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/owl.carousel/dist/owl.carousel.min.js',
        './src/js/data-thumbnail.js',
        './node_modules/appointment-picker/js/appointment-picker.min.js',
        './node_modules/pikaday/pikaday.js',
        './node_modules/moment/min/moment-with-locales.min.js',
        './node_modules/custom-select/build/custom-select.min.js',
        './node_modules/fullcalendar/dist/fullcalendar.min.js',
        './node_modules/fullcalendar/dist/locale-all.js',
        './node_modules/jquery-colorbox/jquery.colorbox-min.js',
    ];

    vendorArrays.push('./node_modules/hotkeys-js/dist/hotkeys.min.js');

    gulp.src(vendorArrays).pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('css_vendor', function () {
    gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/font-awesome/css/font-awesome.min.css',
            './node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
            './node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
            './node_modules/animate.css/animate.min.css',
            './node_modules/appointment-picker/css/appointment-picker.css',
            './node_modules/pikaday/css/pikaday.css',
            './node_modules/custom-select/build/custom-select.css',
            './node_modules/fullcalendar/dist/fullcalendar.min.css',
        ])
        .pipe(concat('vendor.css'))
        .pipe(mincss())
        .pipe(gulp.dest('./dist/css/'));
})

/**
 * images
 */
gulp.task('img', function () {
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/images'));
});

/**
 * copy fonts to dist folder
 */
gulp.task('fonts', function () {
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});

/**
 * html changes watching task
 */
gulp.task('html', function () {
    gulp.src('./dist/**/*.html')
        .pipe(reload({
            stream: true
        }))
})