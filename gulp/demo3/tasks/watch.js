import { watch } from 'gulp';
import { sass } from './sass';
import { pages } from './pages';
import { script } from './script';
import { copy } from './copy';
export const wat = () => {
  watch(['src/sass/**/*.scss'], sass);
  watch(['src/pages/**/*.html'], pages);
  watch(['src/js/**/*.js'], script);
  watch(['src/**/*',
    '!src/{pages,pages/**}',
    '!src/{js,js/**}',
    '!src/{sass,sass/**}'],
copy
  );
};
