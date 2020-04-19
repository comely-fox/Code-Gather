import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
export const script = function scripts() {
  return gulp
    .src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify()) // 压缩js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
};
