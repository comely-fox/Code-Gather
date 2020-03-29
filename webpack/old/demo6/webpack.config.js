const
    path = require('path'),
    localIP = require('./util/getLocalIP.js').getLocalIp(),

    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 入口
    entry: {

        'entry': './src/entry.js',
        'entry2': './src/entry2.js'
    },

    // 出口
    output: {

        // 出口的项目目录
        path: path.resolve('dist/'),

        // 输出后的文件名
        filename: '[name].js'
    },

    module: {

        rules: [
    
            {
                // 应用css规则
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [

        // 压缩javascript
        new UglifyJsPlugin({

            exclude: /\/node_modules/
        }),

        // 加工html模板
        new HtmlWebpackPlugin({
            // 输出后html标题
            title: 'demo6',
            // 模板文件
            template: './src/index.html',
            // 破坏缓存
            hash: true,
            // 压缩
            minify: {
                // 移除属性周围的引号
                removeAttributeQuotes: true,
                // 移除标签之间的空格
                removeTagWhitespace: true,
                // 移除元素之间的空格
                collapseWhitespace: true,
                // 移除内联的空格
                collapseInlineTagWhitespace: true,
            }
        })
    ],
    
    // web服务, 热更新
    devServer: {

        // web目录
        contentBase: path.join(__dirname, 'dist/'),
        // 服务器压缩
        compress: true,
        // 主机
        host: localIP,
        // 端口
        port: '8080'
    }
};