const express = require( 'express' ),
    // bodyParser = require( 'body-parser' ), // post
    // querystring = require( 'querystring' ),
    bodyParser2 = require( './libs/my-body-parser.js' ),
    app = express();

app.listen( 3002 );
/*
app.use( function( req, res, next ){
    var str = '';
    req.on( 'data', ( data ) => {
        str += data;
    } );

    req.on( 'end', () => {
        req.body = querystring.parse( str );
        next();
    } );

} );*/

// app.use( bodyParser.urlencoded({}) );
app.use( bodyParser2 );
app.use( '/', function( req, res, next ){
    console.log( req.body );
} );
