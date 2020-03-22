const express = require( 'express' );
const cookieParser = require( 'cookie-parser');
const cookieEncrypter = require( 'cookie-encrypter');
const app = express();
const secretKey = 'owhtowthwothwpothwpthpwtwpt';
app.use( cookieParser( secretKey ) ); //获取 cookies
app.use( cookieEncrypter( secretKey ) ); //获取 加密cookie
app.use( '/', ( req, res ) => {
    const cookieParams = {
        signed : true,
        maxAge : 24 * 3600 * 1000
    };
    res.cookie( 'user', 'blue', cookieParams );
    // res.clearCookie( 'user' );  // 删除cookie
    //
    // 获取 客户端cookie
    console.log( req.cookies );
    console.log( req.signedCookies );
    res.send( 'ok' );
} );

app.listen( 3002 );
