var gulp = require('gulp');
var Server = require('karma').Server;

module.exports = function() {
  gulp.task('karma', function() {
    new Server({
      configFile: __dirname + '/../karma.conf.js',
      singleRun: true
    }).start();
  });
};
