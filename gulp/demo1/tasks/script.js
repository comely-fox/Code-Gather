import { src, dest } from 'gulp';
export const script = () => {
  return src('src/scripts/**/*.js').pipe(dest('dist/assest/js'));
};
