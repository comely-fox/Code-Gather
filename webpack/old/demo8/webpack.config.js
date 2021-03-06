const
    path = require('path'),
    localIP = require('./util/getLocalIP.js').getLocalIp(),

    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");;

// 线上
const website = {
    // 协议
    protocol: 'http',
    // 主机
    host: localIP,
    // 端口
    port: 8080,
    // 公共地址
    publicPath(path) {

        return `${this.protocol}://${this.host}:${this.port}/${path || ''}`;
    }
};


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
        
        publicPath: website.publicPath(),
        // 输出后的文件名
        filename: '[name].js'
    },

    module: {

        rules: [
    
            {
                // 应用css规则
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // css文件内的url路径
                            //publicPath: '../',
                            
                        }
                    },

                    'css-loader'
                ]
            },

            {
                test: /\.(?:jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // base64 限制
                            limit: 5000,
                            fallback: {
                                loader: 'file-loader',
                                options: {

                                    // 打包出的路径
                                    outputPath: 'images/'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // 压缩css
        new OptimizeCSSAssetsPlugin(),

        // 压缩javascript
        new UglifyJsPlugin({

            exclude: /\/node_modules/
        }),

        // 加工html模板
        new HtmlWebpackPlugin({
            // 输出后html标题
            title: 'demo8',
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
        }),

        new MiniCssExtractPlugin({
            filename: "css/[name][hash].css"
        })
    ],
    
    // web服务, 热更新
    devServer: {

        // web目录
        contentBase: path.join(__dirname, 'dist/'),
        // 服务器压缩
        compress: true,
        // 主机
        host: website.host,
        // 端口
        port: website.port
    }
};