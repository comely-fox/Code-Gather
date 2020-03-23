import { src, dest } from 'gulp';

export default function css() {
  return src('src/**/*.css').pipe(dest('server/public'));
}
