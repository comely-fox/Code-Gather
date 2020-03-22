const
    http = require('http'),
    fs = require('fs'),
    url = require('url');

// 建立一个http服务
http.createServer((request, response) => {
    const oUrl = url.parse(request.url, true);
    // 请求的url地址
    console.log('request come', request.url);

    if ( oUrl.pathname === '/' ) {
        const html = fs.readFileSync('index.html', 'utf-8');
        response.writeHead(200, {

            'Content-Type': 'text/html',
            'Connection': 'close',
            'Link': '</test.jpg>; as=image; rel=preload'
        });

        response.end( html );
    }

    else {
        const jpg = fs.readFileSync('test.jpg');
        response.writeHead(200, {

            'Content-Type': 'jpg/image',
            'Connection': 'close'
        });
        response.end( jpg );
    }
}).listen(3000);

console.log('http server create success, port is 3000');