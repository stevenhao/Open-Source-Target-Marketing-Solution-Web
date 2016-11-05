var gulp = require("gulp");
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var path = require('path');

gulp.task('browserify', function () {
  var b = browserify();
  return gulp.src(['client/js/*.js', ])
    .pipe(b)
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('copyhtml', function () {
  return gulp.src(['client/html/*.html', ])
    .pipe(gulp.dest('./public/'));
});


// unused for now
gulp.task('less', function () {
  var l = less();
  l.on('error', function(err) {
    gutil.log(err);
    b.end();
  });
  return gulp.src('client/*.less')
    .pipe(l)
    .pipe(gulp.dest('./public/css'));
});

paths = [
  'client/*',
  //'share/*',
];
gulp.task('watch', function() {
  gulp.watch(paths, ['default']);
});
gulp.task('default', ['browserify', 'copyhtml']);
