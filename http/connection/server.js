const
    http = require('http'),
    fs = require('fs'),
    url = require('url');
// 建立一个http服务
http.createServer((request, response) => {
    const oUrl = url.parse(request.url, true);
    // 请求的url地址
    console.log('request come', request.url);
    switch (oUrl.pathname) {
    // 请求根
    case '/':
        // 'Connection': 'keep-alive' 保持长连接, close '不保持'
        var html = fs.readFileSync('index.html', 'utf-8');
        // 设置响应头
        response.writeHead(200, {
            'Content-Type': 'text/html',
        });
        // 响应数据并结束响应
        response.end(html);
        break;
    default:

        var img = fs.readFileSync( 'test2.jpg');
        // 设置响应头
        response.writeHead(200, {
            'Content-Type': 'image/jpg',
        });
        // 响应数据并结束响应
        response.end(img);
    }
}).listen(3000);

console.log('http server create success, port is 3000');