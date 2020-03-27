import { watch, series } from 'gulp';
import { css } from './css.js';
import { pages } from './pages.js';
import { script } from './script.js';
export const browser = () => {
  watch(['src/**/*.scss'], series(css, pages));
  watch(['src/**/*.ejs'], pages);
  watch(['src/**/*.js'], script);
};
