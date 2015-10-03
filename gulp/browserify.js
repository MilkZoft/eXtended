var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var stringify = require('stringify');

module.exports = function() {
  gulp.task('browserify', function() {
    return browserify('./examples/source/app.js')
      .transform(babelify)
      .transform(stringify(['.html']))
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('./examples/build/'));
  });
};
