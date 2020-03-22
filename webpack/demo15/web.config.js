const  localIP = require('./util/getLocalIP.js').localIP;
// 线上
module.exports = {
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