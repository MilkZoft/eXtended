var gulp = require('gulp');

// Tasks
gulp.task('browserify', require('./gulp/browserify'));
gulp.task('lint', require('./gulp/eslint'));

// Watch
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['browserify']);
  gulp.watch('examples/source/**/*.js', ['browserify']);
});

// Git hooks
gulp.task('pre-commit', ['lint']);

// Specific Tasks
gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
