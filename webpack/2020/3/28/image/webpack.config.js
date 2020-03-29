const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|txt)$/,
        use: [
          /* {
            // 将图片路径替换成最终输出路径并复制文件到输出目录
            // "publicPath" 可设置输出路径
            // 并不限制于是图片文件
            loader: 'file-loader',
            options: {
              outputPath: 'images'
            }
          }, */

          {
            // 有了url-loader 就不需要file-loader
            // url-loader 功能类似于 file-loader
            // 但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
            // 并不限制于是图片文件
            loader: 'url-loader',
            options: {
              outputPath: 'images',
              limit: 20 * 1024, // 20kb
              // 超出20kb的图像就应用此loader
              fallback: {
                // 响应式的输出指定宽度的图片和点位符
                loader: 'responsive-loader',
                options: {
                  placeholder: true, // 输出一个icon
                  placeholderSize: 32, // width:32
                  sizes: [].concat([240, 320, 640, 375, 768, 1024]) // 输出一系列的图像
                }
              } // 超过40kb用响应式设置大小
            }
          },
          {
            loader: 'image-webpack-loader', // 压缩图片
            options: {
              mozjpeg: {
                quality: 50, // 图片质量50
                progressive: true // 基线
              }
            }
          }
        ]
      }
    ]
  }
};
