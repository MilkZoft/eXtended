var gulp = require('gulp');
var uglify = require('gulp-uglify');

module.exports = function() {
  gulp.task('compress', function() {
    return gulp.src('examples/build/app.js')
      .pipe(uglify())
      .pipe(gulp.dest('examples/build/dist'));
  });
};
