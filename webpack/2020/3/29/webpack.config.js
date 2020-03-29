const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    // app: './src/index.js',
    // print: './src/print.js',
    app: './src/index.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'inline-source-map',
  // devServer: {  // 用dev-server.js实现
  //   contentBase: './dist',
  //   hot: true // 热模块替换, 不刷新浏览器
  // },
  plugins: [
    new CleanWebpackPlugin({
      protectWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      title: 'Development'
    }),

    new webpack.NamedModulesPlugin(), // 热模块替换
    new webpack.HotModuleReplacementPlugin() // 热模块替换
  ],
  output: {
    filename: '[name].bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
