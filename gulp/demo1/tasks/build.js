import { series, parallel } from 'gulp';
import { pages } from './pages';
import { css } from './css';
import { images } from './images';
import { clean } from './clean';
import { browser } from './browser';
import { server } from './server';
import { script } from './script';
export const build = series(
  clean,
  images,
  css,
  script,
  pages,
  parallel(browser, server)
);
