var gulp = require('gulp');
var browserify = require('./browserify');

module.exports = function() {
  gulp.watch('src/**/*.js', browserify);
  gulp.watch('examples/source/**/*.js', browserify);
};
