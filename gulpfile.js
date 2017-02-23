'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
  gulp.src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 version', 'ie >= 6', 'Android 4.0'],
    }))
    .pipe(sourcemaps.write('./', {
      includeContent: false,
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', () => {
  gulp.watch(['./src/**/*.scss'], ['sass']);
});
