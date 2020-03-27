import { src, dest } from 'gulp';
import rev from 'gulp-rev';

export const images = () => {
  return src(['./src/**/*.jpg', './src/**/*.png'])
    .pipe(rev())
    .pipe(dest('./dist/assest'))
    .pipe(rev.manifest('rev-images-manifest.json'))
    .pipe(dest('rev/images'));
};
