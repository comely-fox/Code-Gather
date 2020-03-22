const
    path = require('path'),
    
    localIP = require('./util/getLocalIP.js').getLocalIp();

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