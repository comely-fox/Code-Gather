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
        var html = fs.readFileSync('index.html', 'utf-8');
        // 设置响应头
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
            
        // 响应数据并结束响应
        response.end(html);
        break;
    case '/script':
        var originEtag = '123456832';
        var etag = request.headers['if-none-match'];
        // no-cache 在未重新验证的情况下不从缓存提供服务
        // 使用no-cache的目的是为了防止从缓存中获取过期的资源。
        // no-store 不进行任何的缓存
        if ( etag === originEtag ) {

            // 继续使用缓存， 服务器没有改变文件内容
            // 304语义就是没有修改, 浏览器可以使用缓存
            // header可有可无
            response.writeHead(304, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=2000000, no-store',
                'Last-Modified': '20190103', // 最后一次修改
                'Etag': originEtag,   // 密钥、签名,
            });

            response.end();
        }

        else{

            originEtag = 
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=2000000, no-store',
                'Last-Modified': '20190103', // 最后一次修改
                'Etag': originEtag,   // 密钥、签名,
            });
        }
        response.end('console.log("script loaded, new String")');
        break;
    }

}).listen(3000);

console.log('http server create success, port is 3000');