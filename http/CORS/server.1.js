const
    http = require('http');
// 建立一个http服务
http.createServer((request, response) => {
    response.writeHead( 200, {

        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-HTML-SELF',
        'Access-Control-Allow-Methods': 'PUT, DELETE',
        'Access-Control-Max-Age': 100  // 1百秒之内浏览器不会再发起预请求
    });
    response.end('235');
}).listen(3001);


console.log('http server create success, port is 3001');