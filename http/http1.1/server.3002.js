const 
    http = require('http'),
    url = require('url');
let i = 0;
// 建立一个http服务
http.createServer((request, response) => {
    const oUrl = url.parse( request.url, true );
    // 请求的url地址
    // eslint-disable-next-line no-console
    console.log( oUrl.path, 'count: ', ++i );
    let responseText = '"port 3002 , count: ' + i+'"';
    if ( oUrl.query.callback ) {

        responseText = oUrl.query.callback + '('+responseText+');';
    }
    /* response.writeHead( 200, {
       'Access-Control-Allow-Origin': '*' 
    }); */
    response.end(responseText);

}).listen( 3002 );

console.log( 'http server create success, port is 3002' );