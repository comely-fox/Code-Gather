const express = require( 'express' );

var app = express();
/*app.use( '/', function( req, res ){


} );*/
/*app.use( '/a.html', function( req, res ){
    res.send( { a: 5, b: 6 } );
    res.end();
} );
app.use( '/b.html', function( req, res ){
    res.write( '2334' );
    res.end();
} );

*/
/*app.get( '/', () => {
    console.log( '有GET' );
} );
app.post( '/', () => {
    console.log( 'POST' );
} );*/
app.use( '/', () => {
    console.log( 'use' );
} );




app.listen( 3002 );
