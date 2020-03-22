webpack
===============
## *热更新服务器*
live-server 

webpack-dev-server

## *loader*
style-loader css-loader 处理css模块

url-loader 处理文件模块

file-loader 处理文件名

html-withimg-loader  处理html模块内部的img标签图片不打包的问题

less less-loader  处理less模块

node-sass sass-loader  处理sass模块

postcss-loader  autoprefixer 处理css的平台, 前缀问题

babel-core babel-loader babel-preset-es2015 babel-preset-env转换高版本的js语法为低版本

babel-preset-react 处理react语法

json-loader  处理json模块

## *plugins*
uglifyjs-webpack-plugin 压缩

html-webpack-plugin 处理html模块

extract-text-webpack-plugin 提取css代码输出成文件的插件

mini-css-extract-plugin **webpack4**提取css

optimize-css-assets-webpack-plugin **webpack4**压缩css

purifycss-webpack purify-css  移除多余的css样式

copy-webpack-plugin 复制静态文件到项目的指定目录

webpack-bundle-analyzer **bundle分析器**

webpack.ProvidePlugin 引入外部库

webpack.BannerPlugin '添加chunk头部banner'

webpack.optimize.CommonsChunkPlugin 打包提取公共代码

webpack.HotModuleReplacementPlugin 刷新页面

## *webpack watch配置*
watchOptions // watch配置文件监听文件的变化且自动打包 watch