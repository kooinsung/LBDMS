var gulp = require('gulp'),
    gulpHtmlBeautify = require('gulp-html-beautify'),
    gulpHtmlExtend = require('gulp-html-extend'),
    gulpWait = require('gulp-wait'),
    gulpSass = require('gulp-sass'),
    gulpCleanCss = require('gulp-clean-css'),
    gulpAutoprefixer = require('gulp-autoprefixer'),
    gulpConcat = require('gulp-concat'),
    gulpCopy = require('gulp-copy'),
    gulpImageMin = require('gulp-imagemin'),
    gulpNewer = require('gulp-newer'),
    gulpCount = require('gulp-count'),
    gulpClean = require('gulp-dest-clean'),
    gulpPlumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    del = require('del');

var paths = {
  root: {
    src: 'src',
    dest: 'dist'
  },
  fonts: {
    file: 'src/assets/fonts/**/*',
    src: 'src/assets/fonts',
    dest: 'dist/assets/fonts'
  },
  styles: {
    file: 'src/assets/css/**/*.scss',
    src: 'src/assets/css',
    dest: 'dist/assets/css'
  },
  scripts: {
    file: 'src/assets/js/**/*',
    src: 'src/assets/js',
    dest: 'dist/assets/js'
  },
  images: {
    file: 'src/assets/images/**/*',
    src: 'src/assets/image',
    dest: 'dist/assets/images'
  },
  html: {
    file: 'src/html/**/*.html',
    include: 'src/include/**/*.html',
    src: 'src/html',
    dest: 'dist/html'
  }
};

//fonts
function fonts() {
  return gulp.src(paths.fonts.file)
    .pipe(gulpPlumber())
    .pipe(gulpClean(paths.fonts.dest))
    .pipe(gulpNewer(paths.fonts.dest))
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulpCount('<%= counter %> font files'));
}

//css
function styles() {
  return gulp.src(paths.styles.file)
  .pipe(gulpPlumber())
  .pipe(gulpClean(paths.styles.dest))
  .pipe(gulpCopy(paths.root.dest, {prefix: 1}))
  .pipe(gulpWait(500))
  .pipe(gulpSass({
    outputStyle: 'compact'
  }))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(gulpConcat('all.min.css'))
  .pipe(gulpAutoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulpCleanCss())
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(browserSync.reload({stream: true}))
  .pipe(gulpCount('<%= counter %> css files'));
}

//js
function scripts() {
  return gulp.src(paths.scripts.file)
  .pipe(gulpPlumber())
  .pipe(gulpClean(paths.scripts.dest))
  .pipe(gulpNewer(paths.scripts.dest))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(browserSync.reload({stream: true}))
  .pipe(gulpCount('<%= counter %> js files'));
}

//images
function images() {
  return gulp.src(paths.images.file)
  .pipe(gulpPlumber())
  .pipe(gulpClean(paths.images.dest))
  .pipe(gulpNewer(paths.images.dest))
  .pipe(gulpImageMin())
  .pipe(gulp.dest(paths.images.dest))
  .pipe(gulpCount('<%= counter %> images files'));
}

//html include
function html() {
  return gulp.src(paths.html.file)
  .pipe(gulpPlumber())
  .pipe(gulpClean(paths.html.dest))
  .pipe(gulpNewer(paths.html.dest))
  .pipe(gulpHtmlExtend({annotations:false}))
  .pipe(gulpHtmlBeautify({
    "indent_size": 2
  }))
  .pipe(gulp.dest(paths.html.dest))
  .pipe(browserSync.reload({stream: true}))
  .pipe(gulpCount('<%= counter %> html files'));
}

//delete
function clean() {
  return del([paths.root.dest + '/assets/css', paths.root.dest + '/assets/js', paths.root.dest + '/*.html']);
  //return del([paths.root.dest + '/assets/css', paths.root.dest + '/assets/js', paths.root.dest + '/*.html']);
}

//watch
function watch() {
  browserSync.init({
    server: {
      baseDir: paths.root.dest + "/",
      index: "./html/page1.html"
    }
  });

  gulp.watch(paths.fonts.file, fonts);
  gulp.watch(paths.styles.file, styles);
  gulp.watch(paths.scripts.file, scripts);
  gulp.watch(paths.images.file, images);
  gulp.watch(paths.html.file, html).on('change', browserSync.reload);
}

// var build = gulp.parallel(clean, styles, scripts, images, html, watch);
var build = gulp.series(clean, fonts, styles, scripts, images, html, watch);

gulp.task(build);
gulp.task('default', build);

