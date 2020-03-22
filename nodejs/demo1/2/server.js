const http = require( 'http' );
const querystring = require( 'querystring' );
const urlLib = require( 'url' );

http.createServer( ( request, response ) => {
    var Get = {};
    // let arr = request.url.split( '?' );
    // let regx = /([^\?&]+)=([^&]+)/g;
    // let res;
    // while( res = regx.exec( request.url ) ){
    //     j[ res[ 1 ] ] = res[ 2 ];
    // }
    // res 获取前台请求数据
    //
    // 2
    /*if ( request.url.indexOf( '?' ) != -1 ){
        var arr = request.url.split( '?' );
        var url = arr[ 0 ];
        Get = querystring.parse( arr[ 1 ] );
    }*/

    var obj = urlLib.parse( request.url, true );
    var url = obj.pathname;
    Get = obj.query;
    response.write( url + '\n' + JSON.stringify(Get) );
    response.end();
} ).listen( 3002 );
