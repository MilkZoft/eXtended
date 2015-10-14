var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var stringify = require('stringify');

module.exports = function() {
  gulp.task('browserify', function() {
    return browserify('./examples/public/js/app.js')
      .transform(stringify(['.html']))
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      //.pipe(uglify())
      .pipe(gulp.dest('./examples/build/'));
  });
};
