const
    http = require('http'),
    fs = require('fs'),
    url = require('url');
// 建立一个http服务
http.createServer((request, response) => {

    const oUrl = url.parse(request.url, true);
    // 请求的url地址
    console.log(request.url, oUrl);

    switch (oUrl.pathname) {

        // 请求根
        case '/':
        const html = fs.readFileSync('index.html', 'utf-8');
            // 设置响应头
            response.writeHead(200, {
                // 'Content-Type': 'text/plain'
                'Content-Type': 'text/html'
            });
            
            // 响应数据并结束响应
            response.end(html);
            break;
        // 请求根下的index路由
        case '/index':
            response.end(oUrl.path);
            break;
        case '/test.js':
            var h = fs.readFileSync('test.js', 'utf-8');
            // 设置响应头
            response.writeHead(200, {
                'Content-Type': 'application/javascript'
            });
            console.log(h);
            response.end(h);
            break;
        // 找不到路由
        default:
            // 设置响应头
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end('<span style="font-size:16em;color:red;">404</span>');
    }

}).listen(3000);

console.log('http server create success, port is 3000');