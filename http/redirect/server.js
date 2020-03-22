const
    http = require('http'),
    fs = require('fs'),
    url = require('url');
// 建立一个http服务
http.createServer((request, response) => {
    const oUrl = url.parse(request.url, true);
    console.log('request come: ', request.url)
    switch (oUrl.pathname) {
    // 请求根
    case '/':
        
        // 301永久跳转, {浏览器会缓存文件}
        // 302临时跳转
        response.writeHead( 307, {

            'Location': '/new'  // 跳转的地址
        });
        // 响应数据并结束响应
        response.end('');
        break;
    case '/new':
        
        response.writeHead( 200, {

            'Content-Type': 'text/html'
        });
        // 响应数据并结束响应
        response.end(fs.readFileSync('index.html', 'utf-8'));
        break;
    }
}).listen(3000);

console.log('http server create success, port is 3000');