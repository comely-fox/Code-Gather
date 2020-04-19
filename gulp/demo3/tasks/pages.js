import { src, dest } from 'gulp';
export const pages = () => {
  return src('./src/pages/**/*.html').pipe(dest('./dist'));
};
