import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server'; // 启动服务器
import args from './util/args';

export default function server(done) {
  if (!args.watch) return done();
  var server = liveserver('server/bin/www', {
    env: { PORT: args.port }
  });
  server.start();

  gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function(
    file
  ) {
    server.notify.apply(server, [file]);
  });
  gulp.watch(['server/routes/**/*.js', 'server/app.js'], function() {
    server.start.bind(server)();
  });
}
