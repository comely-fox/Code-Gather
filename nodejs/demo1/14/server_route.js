const express = require( 'express' );

var app = express();

// 目录1. /user/

const routeUser= express.Router();

routeUser.get( '/1.html', function( req, res ){
    res.send( 'user1');
} );
routeUser.get( '/2.html', function( req, res ){
    res.send( 'user222222222');
} );

app.use( '/user', routeUser );

// 目录2. /article/
const routeArticle= express.Router();
app.use( '/article', routeArticle );
routeArticle.get( '/1001.html', function( req, res ) {
    res.send( 'article' );
});

app.listen( 3002 );
