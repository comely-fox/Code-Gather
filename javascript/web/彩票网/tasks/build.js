import { series, parallel } from 'gulp';
import clean from './clean';
import css from './css';
import pages from './pages';
import scripts from './scripts';
import browser from './browser';
import server from './server';

export default series(clean, css, pages, scripts, parallel(browser, server));
