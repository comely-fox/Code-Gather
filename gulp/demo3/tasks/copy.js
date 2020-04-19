import { src, dest } from 'gulp';

export const copy = () => {
  return src([
    'src/**/*',
    '!src/{pages,pages/**}',
    '!src/{js,js/**}',
    '!src/{sass,sass/**}',
  ]).pipe(dest('dist'));
};
