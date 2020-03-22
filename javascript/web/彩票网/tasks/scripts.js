import gulp from 'gulp';
import gulpif from 'gulp-if'; // gulp if判断
import concat from 'gulp-concat'; // 拼接文件
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream'; // webpack编译js
import named from 'vinyl-named';
import livereload from 'gulp-livereload'; // 浏览器自动刷新
import plumber from 'gulp-plumber'; //  处理管道流信息 -> 错误
import rename from 'gulp-rename'; // 文件重命名
import uglify from 'gulp-uglify'; // 文件压缩
import { log, colors } from 'gulp-util';
import args from './util/args';

gulp.task('scripts', () => {
  return gulp
    .src(['src/js/index.js'])
    .pipe(
      plumber({
        errorHandle: function() {}
      })
    )
    .pipe(named())
    .pipe(
      gulpWebpack({
        module: {
          loaders: [
            {
              test: /\.js$/,
              loader: 'babel'
            }
          ]
        },
        devtool: 'source-map'
      }),
      null,
      (err, stats) => {
        log(
          `Finished '${colors.cyan('scripts')}'`,
          stats.toString({
            chunks: false
          })
        );
      }
    )
    .pipe(gulp.dest('server/public/js'))
    .pipe(
      rename({
        basename: 'cp',
        extname: '.min.js'
      })
    )
    .pipe(
      uglify({
        compress: {
          properties: false
        },
        output: {
          quote_keys: true
        }
      })
    )
    .pipe(gulp.dest('server/public/js'))
    .pipe(gulpif(args.watch, livereload()));
});
