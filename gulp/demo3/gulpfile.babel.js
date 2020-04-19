import { series, parallel } from 'gulp';
import { pages } from './tasks/pages';
import { sass } from './tasks/sass';
import { clean } from './tasks/clean';
import { wat } from './tasks/watch';
import { server } from './tasks/server';
import { script } from './tasks/script';
import { copy } from './tasks/copy';
export default series(clean, copy, sass, script, pages, parallel(wat, server));
