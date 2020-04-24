import { src, dest } from 'gulp'
import gulpIf from 'gulp-if'
import postcss from 'gulp-postcss'
import gulpSass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import args from './args'

const csssrc = args.css.src()
const output = args.output

export const css = () => {
  return src(csssrc)
    .pipe(gulpIf(args.mode_dev, sourcemaps.init()))
    .pipe(gulpSass())
    .pipe(gulpIf(args.mode_pro, postcss()))
    .pipe(gulpIf(args.mode_dev, sourcemaps.write()))
    .pipe(dest(output))
}
