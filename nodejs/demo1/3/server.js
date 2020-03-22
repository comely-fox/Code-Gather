const http = require( 'http' );
const querystring = require( 'querystring' );
http.createServer( ( req, res ) => {
    // post -request
    var str = '';
    // post 分段发送
    // data - 有一段数据到达(很多次)
    var i = 0;
    req.on( 'data', ( data ) => {
        str += data;
        console.log( `第${i++}次收到数据` );
    } );
    req.on( 'end', () => {
        var POST = querystring.parse( str );
        console.log(str, POST );
    } );
} ).listen( 3002 );
