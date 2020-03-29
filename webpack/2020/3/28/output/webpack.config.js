const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|txt)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 200,
            fallback: {
              loader: 'responsive-loader',
              options: {
                // sizes: ['100', '200', '300']
              }
            }
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      title: 'Out Management',
      template: './src/tpl/index.ejs',
      templateParameters: {
        title: 'Out Management param'
      },
      hash: true,
      chunks: ['app']
    })
  ],
  output: {
    filename: '[name]-[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
