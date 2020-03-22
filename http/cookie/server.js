const
    http = require('http'),
    fs = require('fs'),
    url = require('url');
// 建立一个http服务
http.createServer((request, response) => {
    const oUrl = url.parse(request.url, true);
    const host = request.headers[ 'host' ];
    // 请求的url地址
    console.log('request come', request.url);
    switch (oUrl.pathname) {
    // 请求根
    case '/':
        // HttpOnly 禁止使用javascript访问
        var html = fs.readFileSync('index.html', 'utf-8');
        
        if ( host === 'test.com:3000' ) {

            // max-age 有效时间 HttpOnly不允许js读写
            // domain 设置允许可以访问的域
            // 设置响应头
            response.writeHead(200, {
                'Content-Type': 'text/html',
                'Set-Cookie': [ 'uid=001', 'name=jock; domain=test.com' ]
            });
        }
        
            
        // 响应数据并结束响应
        response.end(html);
    }
}).listen(3000);

console.log('http server create success, port is 3000');