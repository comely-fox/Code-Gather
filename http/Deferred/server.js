const 
    http = require('http'),
    fs = require('fs'),
    url = require('url');

// 数据模拟
var map = new Map([[
        '小红',
        {
            name : '小红',
            age : '18',
            address: '湖南省',
            class: '初二'
        },
    ],
    [   
        '小明',  
        {
            name : '小明',
            age : '19',
            address: '湖南省',
            class: '初三'
        }
    ]
]);
// 建立一个http服务
http.createServer((request, response) => {

    const oUrl = url.parse( request.url, true );
    // 请求的url地址
    console.log( request.url, oUrl );

    switch( oUrl.pathname ) {

        // 请求根
        case '/':
            const html = fs.readFileSync('request.html', 'utf-8');
            // 设置响应头
            response.writeHead( 200, {
               'Content-Type' : 'text/html' 
            });

            // 响应数据并结束响应
            response.end( html );
            break;
        
        case '/json.do':
            
            response.writeHead( 200, {
                'Content-Type' : 'text/JSON' 
             });
            var name = decodeURIComponent( oUrl.query.name );
            response.end(  JSON.stringify( map.get(name) ) );
            break;
        case '/json.update':
            var name = decodeURIComponent( oUrl.query.name );
            var user = map.get(name);
            for ( let key in oUrl.query ) {

                user[ key ] = oUrl.query[ key ];
            }
            response.writeHead( 200, {
                'Content-Type' : 'text/JSON' 
            });

            response.end(  JSON.stringify( map.get(name) ) );
            break;
        // 找不到路由
        default:
            // 设置响应头
            response.writeHead( 200, {
                'Content-Type' : 'text/html' 
             });
            response.end( '<span style="font-size:16em;color:red;">404</span>' );
    }

}).listen( 3000 );

console.log( 'http server create success, port is 3000' );