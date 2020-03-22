const express = require( 'express' ),
    bodyParesr = require( 'body-parser' ), // post
    app = express();

app.listen( 3002 );

app.use( '/', function( req, res, next ) {
    console.log( 'a' );
    next();
} );
app.use( '/', function( req, res, next ) {
    console.log( 'b' );
} );
