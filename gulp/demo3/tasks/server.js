import { watch } from 'gulp';
import gls from 'gulp-live-server';

export const server = () => {
  const server = gls.static('dist');
  server.start();

  watch(['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js']).on(
    'change',
    (path) => {
      server.notify.call(server, { path });
    }
  );
};
