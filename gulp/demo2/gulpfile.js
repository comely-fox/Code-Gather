const { src, dest, watch, series, parallel } = require('gulp');
const livereload = require('gulp-livereload');
const http = require('http');
const st = require('st');

function css() {
  return src('./src/**/*.css')
    .pipe(dest('dist'))
    .pipe(livereload());
}

function pages() {
  return src('./src/**/*.html')
    .pipe(dest('dist'))
    .pipe(livereload());
}

function update() {
  livereload.listen();
  watch('./src/**/*.css', css);
  watch('./src/**/*.html', series(pages, server));
}
var ht;

function server(done) {
  if (ht) {
    ht.close();
  }
  return (ht = http
    .createServer(
      st({ path: __dirname + '/dist', index: 'index.html', cache: false })
    )
    .listen(8080, done));
}

exports.default = series(pages, css, parallel(update, server));
