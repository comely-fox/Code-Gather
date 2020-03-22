/* jshint esversion: 6 */

const http = require( 'http' );


/**
 * request 请求， 浏览器请求的数据
 * response 响应 响应给浏览器
 */
let server = http.createServer( ( req, res ) => {
    // response
    res.write( 'Then first nodeJs program.' );
    res.end();
} );
server.listen( 3005 );
