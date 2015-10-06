var gulp = require('gulp');

// Tasks
gulp.task('browserify', require('./gulp/browserify'));
gulp.task('lint', require('./gulp/eslint'));
gulp.task('karma', require('./gulp/karma'));

// Watch
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['browserify']);
  gulp.watch('examples/source/**/*.js', ['browserify']);
});

// Git hooks
gulp.task('pre-commit', ['lint']);
gulp.task('pre-push', ['test']);

// Specific Tasks
gulp.task('test', ['karma']);
gulp.task('analyze', ['lint']);
gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
