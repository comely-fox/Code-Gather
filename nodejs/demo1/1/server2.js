/* jshint esversion: 6 */

const http = require( 'http' );


/**
 * request 请求， 浏览器请求的数据
 * response 响应 响应给浏览器
 */
let server = http.createServer( ( req, res ) => {
    // response
    switch( req.url ){
        case '/1.html' :
            res.write( '111111111' );
            break;
        case '/2.html' :
            res.write( '22222222222' );
            break;
        default :
            res.write( '404' );
    }
    res.write( '\nThen first nodeJs program.' );
    res.end();
} );
server.listen( 3001);
