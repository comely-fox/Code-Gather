import { watch } from 'gulp';
import args from './util/args';
import scripts from './scripts';
import pages from './pages';
import css from './css';

export default function browser(done) {
  if (!args.watch) return done();
  watch('src/**/*.js', scripts);
  watch('src/**/*.ejs', pages);
  watch('src/**/*.css', css);
}
