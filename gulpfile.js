var gulp = require('gulp');
var sass = require('gulp-sass');
var pug  = require('gulp-pug');

var concat = require('gulp-concat');
var minifyJs = require('gulp-minify');
var htmlbeautify = require('gulp-html-beautify');
var runsequence = require('gulp-run-sequence');
var clean = require('gulp-clean');

var srcAssetBase = 'src/assets/';
var srcViewBase = 'src/views/';
var srcScriptsBase = srcAssetBase + 'scripts/';
var distAssetBase = 'build/assets';

gulp.task('sass', function () {
  return gulp.src(srcAssetBase + 'scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(distAssetBase + '/css'))
});

// gulp.task('concat-vendor', function() {
//   var mainJs = srcScriptsBase + 'main.js';
//   var vendorPath = srcScriptsBase + 'vendor/';
//   var jQuery = vendorPath + 'jquery.js';
//   var slick = vendorPath + 'slick.js';
 
//   return gulp.src([jQuery, slick, mainJs])
//     .pipe(concat('compiled.js'))
//     .pipe(gulp.dest(distAssetBase + '/scripts/'));
// });

gulp.task('minify', function() {
  gulp.src(srcAssetBase + 'scripts/*.js')
    .pipe(minifyJs({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js']
    }))
    .pipe(gulp.dest(distAssetBase + '/scripts'))
});



gulp.task('pug', function () {
  return gulp.src(srcViewBase + '*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build'));
});

gulp.task('htmlbeautify', function() {
  var options = {indentSize: 2};
  gulp.src('build/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('build'))
});

gulp.task('scripts', function(cb) {
 runsequence('concat-vendor',cb);
});

gulp.task('build', function(cb){
  runsequence('build-clean', ['sass', 'pug'], 'htmlbeautify', cb);
});

gulp.task('build-clean', function(){
  return gulp.src('build').pipe(clean());
})