const express = require( 'express' );
const cookieParser = require( 'cookie-parser');
const cookieSessin = require( 'cookie-session');
const app = express();

app.use( cookieParser( '25ewtqtqtqtsfwtwt' ) ); //cookies
app.use( cookieSessin( {
    name : 'sess',
    keys : [ 'aaa', 'bbb', 'ccc' ],
    maxAge : 2 * 3600 * 1000
} ) );
app.use( '/', ( req, res ) => {
    if ( req.session[ 'count' ] == null ){
        req.session[ 'count' ] = 1;
    }else{
        req.session[ 'count' ]++;
    }

    console.log( req.session[ 'count' ] )
    res.send( 'ok' );
} );

app.listen( 3002 );
