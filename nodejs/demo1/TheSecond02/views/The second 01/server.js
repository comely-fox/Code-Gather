/*
* @Author: comely-fox
* @Date:   2018-05-13 09:18:12
* @Last Modified by:   comely-fox
* @Last Modified time: 2018-05-13 14:33:32
*/


const http = require( 'http' );
const fs = require( 'fs' );
const path = require( 'path' );
const url = require( 'url' );
const router = require( './libs/router.js' );
const ejs = require( 'ejs' );

// 路由是指通过请求地址处理不同的业务逻辑
const app = http.createServer( ( req, res ) => {

    res.writeHead( 200, {
        'Content-type' : 'text/html;charset=utf-8;'
    } );


    const pathname = url.parse( req.url ).pathname;


    switch( pathname ){
        case '/login' :  // 登录路由

            ejs.renderFile( './views/login.ejs', {

                },
                ( err, data ) => {
                    res.end( data );
                }
            );

            break;

        case '/register' : // 注册路由




            break;
        default :
            // 静态文件
            router.statics( req, res, 'static/' );

    }

} );

app.listen( 3000 );
