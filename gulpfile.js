'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var babel = require('gulp-babel');

gulp.task('babel',  function() {
gulp.src('app/assets/js/components/editor.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('app/assets/js/components/editor.js'))
});


gulp.task('templates', function() {
    var YOUR_LOCALS = {};

    gulp.src('app/views/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('app/views/'))
});

gulp.task('sass', function () {
    return gulp.src('app/assets/stylesheets/application.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/assets/stylesheets/'));
});

gulp.task('watch', function () {
    gulp.watch('app/assets/js/components/editor.js', ['babel']);
    gulp.watch('app/assets/stylesheets/**/*.scss', ['sass']);
    gulp.watch('app/views/**/*.jade', ['templates']);
});