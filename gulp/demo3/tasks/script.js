import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import filter from 'gulp-filter';
import sourcemaps from 'gulp-sourcemaps';

export const script = function () {
  const f = filter(['src/js/**', '!*src/js/{lib,lib/**}'], { restore: true });
  return gulp
    .src('src/js/**/*.js')
    .pipe(f)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(f.restore)
    .pipe(gulp.dest('dist/js'));
};
