import { src, dest } from 'gulp';
import postcss from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
export const sass = () => {
  return src(['./src/sass/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(gulpSass())
    .pipe(postcss())
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css'));
};
