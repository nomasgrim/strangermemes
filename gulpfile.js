var gulp = require('gulp');

var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

var pug  = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();

var srcBase = 'src/';
var srcAssetBase = srcBase + 'assets/';
var srcViewBase = srcBase + 'views/';
var distBase = 'build/';
var distAssetBase = distBase + 'assets';


gulp.task('stylus', ['build-clean'], function (cb) {
  return gulp.src(srcAssetBase + 'stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest(distAssetBase + '/css'));
});

gulp.task('linenos', ['stylus'], function (cb) {
  return gulp.src(srcAssetBase + 'stylus/**/*.styl')
    .pipe(stylus({linenos: true}))
    .pipe(gulp.dest(distAssetBase + '/css'));
});
 
gulp.task('sourcemaps-inline', ['linenos'], function () {
  return gulp.src(srcAssetBase + 'stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distAssetBase + '/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('pug', function (cb) {
  return gulp.src(srcViewBase + '*.pug')
    .pipe(pug())
    .pipe(gulp.dest(distBase));
});

gulp.task('htmlbeautify', ['pug'], function() {
  var options = {indentSize: 2};
  gulp.src(distBase + '*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest(distBase))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('app-scripts', function(){
  return gulp.src([srcAssetBase + 'js/**/*.js', '!' + srcAssetBase + 'js/vendors/*.js'])
    .pipe(gulp.dest(distAssetBase + '/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('vendor-scripts', function(){
  return gulp.src(srcAssetBase + 'js/vendors/**/*.js')
    .pipe(gulp.dest(distAssetBase + '/js/vendors'));
});

gulp.task('build-scripts', ['vendor-scripts', 'app-scripts']);

gulp.task('build-clean', function(cb){
  return gulp.src('htdocs').pipe(clean());
});

gulp.task('build-stylus', ['stylus', 'linenos', 'sourcemaps-inline']);
gulp.task('build-pug', ['pug', 'htmlbeautify']);

gulp.task('build', ['build-clean', 'build-scripts', 'build-stylus', 'build-pug']);

gulp.task('browser', function() {
    browserSync.init({
        port: 8080,
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('watch', ['browser'], function () {
    gulp.watch("src/assets/js/**/*.js", ['app-scripts']);
    gulp.watch("src/assets/stylus/**/*.styl", ['build-stylus']);
    gulp.watch("src/**/*.pug", ['build-pug']);
});