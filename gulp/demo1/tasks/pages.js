import { src, dest } from 'gulp';
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';
import revCollector from 'gulp-rev-collector';
import dataConfig from '../src/data/data.json';
import { isProMode } from './util/args';

export const pages = () => {
  return src(['./rev/**/*.json', './src/pages/*.ejs'])
    .pipe(ejs(Object.assign({ min: isProMode ? '.min' : '' }, dataConfig)))
    .pipe(revCollector())
    .pipe(
      rename({
        extname: '.html'
      })
    )
    .pipe(dest('./dist'));
};
