'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),    
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-js-minify'),    
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),

    filesJS = [
        'src/app/market.js',
        'src/app/market.controller.js',
        'src/app/market.config.js',        
        'src/components/**/*.js',
        'src/utils/**/*.js'
    ],

    filesCSS = [
        'src/components/**/*.scss'
    ];

gulp.task('dev', [
    'devJS',
    'devCSS',
    'watch'
], bSync => {
    browserSync.init({
        server: './src'
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('devJS', function () {
    return gulp.src(filesJS)
        .pipe(concat('main.min.js'))
        // .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('./src/assets/js/'))
        .pipe(browserSync.stream());
});

gulp.task('devCSS', function () {
    return gulp.src(filesCSS)
        .pipe(concat('main.min.css'))
        .pipe(sass())
        .pipe(gulp.dest('./src/assets/css/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch(filesJS, ['devJS']);
    gulp.watch(filesCSS, ['devCSS']);
});
