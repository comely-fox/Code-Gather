const express = require( 'express' );
const cookieParser = require( 'cookie-parser');
const cookieSessin = require( 'cookie-session');
const app = express();

app.use( cookieParser( '25ewtqtqtqtsfwtwt' ) ); //cookies
app.use( cookieSessin( {
    keys : [ 'aaa', 'bbb', 'ccc' ]
} ) );
app.use( '/', ( req, res ) => {
    console.log( req.session )
} );

app.listen( 3002 );
