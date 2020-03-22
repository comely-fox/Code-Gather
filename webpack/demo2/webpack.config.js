const
    path = require('path');
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
    }

};