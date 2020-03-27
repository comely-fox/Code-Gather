import { watch } from 'gulp';
import gls from 'gulp-live-server';

export const server = () => {
  const ser = gls.static('dist');
  ser.start();

  watch(['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js']).on(
    'change',
    path => {
      ser.notify.call(ser, { path });
    }
  );
};
