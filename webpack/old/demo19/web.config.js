const path = require('path') ;
const localIP = require('./util/getLocalIP.js').localIP;
// 线上
module.exports = {
    entries: (chunks) => {

        const entries = Object.create(null);

        for (let chunkName in chunks) {

            entries[chunkName] = './src/' + chunks[chunkName]
        }

        return entries;
    },

    outputPath: path.resolve('dist/'),
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