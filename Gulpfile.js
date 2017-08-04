'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),    
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-js-minify'),    
    sass = require('gulp-sass'),

    filesJS = [        
        'src/*.js',                             
    ],

    filesCSS = [
        'src/*.scss'
    ];

gulp.task('dev', [
    'devJS',
    'devCSS',
    'watch'
]);

gulp.task('devJS', function () {
    return gulp.src(filesJS)
        .pipe(concat('main.min.js'))
        // .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('./App/'));
});

gulp.task('devCSS', function () {
    return gulp.src(filesCSS)
        .pipe(concat('main.min.css'))
        .pipe(sass())
        .pipe(gulp.dest('./App/'));
});

gulp.task('watch', function () {
    gulp.watch(filesJS, ['devJS']);
    gulp.watch(filesCSS, ['devCSS']);
});
