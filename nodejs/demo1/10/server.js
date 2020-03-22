const express = require( 'express' );
const cookieParser = require( 'cookie-parser');
const app = express();

app.use( cookieParser( '25ewtqtqtqtsfwtwt' ) ); //cookies
app.use( '/', ( req, res ) => {
    /*res.cookie( 'user', 'blue', {
        path : '/aaa',
        maxAge : 30 * 24 * 3600 * 1000
    } );*/
    res.secret = '25ewtqtqtqtsfwtwt';  // 签名
    res.cookie( 'user', 'blue', {
        signed : true // 签名
    } );
    console.log( req.signedCookies );
    console.log( req.cookies );
    res.send( 'ok' );
} );

app.listen( 3002 );
