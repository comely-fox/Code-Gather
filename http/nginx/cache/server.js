const
    http = require('http'),
    zlib = require('zlib'),
    fs = require('fs'),
    querystring = require('querystring'),
    util = require('util'),
    url = require('url');

const wait = (second) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve();
        }, second * 1000);
    });
};

// 建立一个http服务
http.createServer((request, response) => {
    const oUrl = url.parse(request.url, true);
    // 请求的url地址
    console.log('request come', request.headers['host'], request.url);

    if ( oUrl.pathname === '/' ){
        const html = fs.readFileSync('index.html', 'utf-8');
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'X-Content-Type-Options': 'nosniff',  // 禁止浏览器嗅探, 猜测要用哪种数据格式
        });
        // 响应数据并结束响应
        response.end(html);
    }
    if ( oUrl.pathname === '/data' ){
        response.writeHead(200, {
           // 'Cache-Control': 'max-age=5, s-maxage=20, private',
           'Cache-Control': 's-maxage=200',  // 代理缓存
           'Vary': 'agent'  // 自定义缓存标识
        });
        wait(2).then(() => response.end('success'));
    }
}).listen(3000);

console.log('http server create success, port is 3000');