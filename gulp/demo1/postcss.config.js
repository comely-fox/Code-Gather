const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['> 0.002%']
    }),
    cssnano()
  ]
};
