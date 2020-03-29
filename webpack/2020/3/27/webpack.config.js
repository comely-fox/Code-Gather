const path = require('path');

// .esModule  es6模块化

module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist') }
};
