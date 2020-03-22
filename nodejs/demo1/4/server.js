const http = require( 'http' ),
    fs = require( 'fs' ),
    urlLib = require( 'url' ),
    querystring = require( 'querystring' );

let users = {

};

let server = http.createServer( ( req, res ) => {
    // 解析数据

    var str = '';

    req.on( 'data', function( data ){
        str += str;
    } );

    req.on( 'end', function( err ) {
        var obj = urlLib.parse( req.url, true );

        const url = obj.pathname;
        const GET = obj.query;
        const POST = querystring.parse( str );
        // 区分--接口，文件
        if ( url === '/user' ){
            switch( GET.act ){
                case 'reg':
                    // 1.检查用户名是否存在
                    if( users[ GET.user ] ){
                        res.write( '{"ok":false,"msg":"此用户名已存在"}' );
                    }else{
                        users[ GET.user ] = GET.pass;
                        res.write( '{"ok":true,"msg":"注册成功"}' );
                    }
                    break;
                case 'login':
                    // 1.检查用户是否存在
                    if ( users[ GET.user ] === void 0 ){
                        res.write( '{"ok":false,"msg":"此用户不存在"}' );
                    }
                    // 检查用户密码
                    else if( users[ GET.user ] != GET.pass ){
                        res.write( '{"ok":false,"msg":"用户名或密码有误"}' );
                    }else{
                        res.write( '{"ok":true,"msg":"登录成功"}' );
                    }
                    break;
                default :
                    res.write( '{"ok":false,"msg":"未知的act"}' );
            }
            res.end();
        }else{
            // 读取文件
            var file_name = './www' + url;

            fs.readFile( file_name, ( err, data ) => {
                if ( err ){
                    res.write( '404' );
                }else{
                    res.write( data );
                }
                res.end();
            } );
        }
    } );
} );

server.listen( 3002 );
