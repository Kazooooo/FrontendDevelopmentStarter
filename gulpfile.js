const gulp = require('gulp');
const fs = require('fs');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('ejs', () => {
  const config = JSON.parse(fs.readFileSync('./src/ejs/ejs.config.json'));
  const data = config.data;
  const pages = config.pages;

  pages.forEach((page) => {
    gulp.src('./src/ejs/*.ejs')
      .pipe(plumber())
      .pipe(ejs({
        data,
        page,
      }))
      .pipe(rename(`${page.filename}.html`))
      .pipe(gulp.dest(`./dist/${page.dest}`))
      .pipe(browserSync.reload({ stream: true }));
  });
});

gulp.task('sass', () => {
  gulp.src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(sourcemaps.write({
      includeContent: false,
    }))
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(autoprefixer({
      browsers: ['last 3 version', 'ie >= 6', 'Android 4.0'],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
  });
});

const RUNNING_TASKS = [
  'ejs',
  'sass',
  'browser-sync',
];

gulp.task('default', RUNNING_TASKS, () => {
  gulp.watch(['./src/ejs/**/*.ejs', './src/ejs/**/*.json'], ['ejs']);
  gulp.watch(['./src/scss/**/*.scss'], ['sass']);
});
