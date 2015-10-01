var gulp = require('./gulp')([
  'browserify',
  'watcher'
]);

// Tasks
gulp.task('build', ['browserify']);
gulp.task('watch', ['watcher']);
gulp.task('default', ['build']);
