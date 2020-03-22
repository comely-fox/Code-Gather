const
    http = require('http'),
    zlib = require('zlib'),
    fs = require('fs'),
    querystring = require('querystring'),
    util = require('util'),
    url = require('url');
// 建立一个http服务
http.createServer((request, response) => {
    const oUrl = url.parse(request.url, true);
    // 请求的url地址
    console.log('request come', request.headers['host'], request.url);
    switch (oUrl.pathname) {
        // 请求根
        case '/':
            var html = fs.readFileSync('index.html');
            // 设置响应头
            response.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Encoding': 'gzip',  // 压缩方式
                'Content-Language': 'zh-cn',
                'X-Content-Type-Options': 'nosniff',  // 禁止浏览器嗅探, 猜测要用哪种数据格式
            });


            // 响应数据并结束响应
            response.end(zlib.gzipSync(html));
            break;
        case '/js':
            var post = '';
            // method post
            request.on('data', function(chunk){    
                post += chunk;
            });
            request.on('end', function() {

                post = querystring.parse(post);
                console.log( post )
                response.end(util.inspect(post));
            })
            var html = fs.readFileSync('test.js');
            /* // 设置响应头
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Content-Language': 'zh-cn',
            }); */
    }
}).listen(3000);

console.log('http server create success, port is 3000');