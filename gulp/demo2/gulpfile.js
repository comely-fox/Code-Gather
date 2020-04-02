const { series, parallel, src, dest, watch } = require('gulp');
const livereload = require('gulp-livereload');
const http = require('http');
const st = require('st');
function pages() {
  return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(livereload());
}

function css() {
  return src('src/**/*.css')
    .pipe(dest('dist'))
    .pipe(livereload());
}
function script() {
  return src('src/**/*.js')
    .pipe(dest('dist'))
    .pipe(livereload());
}

function wat() {
  livereload.listen();
  watch(['src/**/*.html'], pages);
  watch(['src/**/*.css'], css);
  watch(['src/**/*.js'], script);
}

function server(done) {
  http
    .createServer(
      st({ path: __dirname + '/dist', index: 'index.html', cache: false })
    )
    .listen(3000, () => {
      done();
    });
}
exports.default = series(pages, parallel(wat, server));
