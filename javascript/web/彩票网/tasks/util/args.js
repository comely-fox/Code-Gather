var yargs = require('yargs');

var args = yargs
  .option('production', {
    boolean: true,
    default: false,
    describe: 'main all scripts'
  })
  .option('watch', {
    boolean: true,
    default: false,
    describe: 'watch all files'
  })
  .option('verbose', {
    boolean: true,
    default: false,
    describe: 'log'
  })
  .option('sourcemaps', {
    describe: 'force the creation of sourcemaps'
  })
  .option('port', {
    string: true,
    default: 8080,
    describe: 'server port'
  }).argv;

export default args;
