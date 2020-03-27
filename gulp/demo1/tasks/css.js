import { src, dest } from 'gulp';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import gulpIf from 'gulp-if';
import rev from 'gulp-rev';
import revCollector from 'gulp-rev-collector';
import { isProMode } from './util/args';

const cssoutput = './dist/assest/css';

export const css = () => {
  let stream = src(['./src/*.scss'])
    .pipe(sass())
    .pipe(postcss())
    .pipe(
      gulpIf(
        isProMode,
        rename({
          extname: '.min.css'
        })
      )
    )
    .pipe(gulpIf(isProMode, rev())) // 给文件名加上hash
    .pipe(dest(cssoutput));

  if (isProMode) {
    stream = stream
      .pipe(
        src(['./rev/images/rev-images-manifest.json', cssoutput + '/*.css'])
      )
      .pipe(revCollector()) // 替换掉css文件中的路径， 再原来的路径上加上hash
      .pipe(dest(cssoutput))
      .pipe(rev.manifest())
      .pipe(dest('rev/css'));
  }

  return stream;
};
