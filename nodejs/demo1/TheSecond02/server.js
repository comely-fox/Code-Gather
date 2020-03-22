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




// 路由是指通过请求地址处理不同的业务逻辑
const app = http.createServer( ( req, res ) => {
    res.writeHead( 200, {
        'Content-type' : 'text/html;charset=utf-8'
    } );
    const pathname = url.parse( req.url ).pathname.substring( 1 );
    const method = req.method.toLowerCase().replace(/^(\w{1})/, function( substr ){
        return substr.toUpperCase();
    });  // 请求方式 Get , Post
    const page = pathname + method;
    if ( pathname !== 'favicon.ico' ){
        try{
            router[ page ]( req, res );
        }catch( e ){
            router[ 'home' ]( req, res );
        }
    }
} );

app.listen( 3000 );
