const express = require( 'express' );
const static = require( 'express-static' );
const bodyParser = require( 'body-parser' );
const multer = require( 'multer' );
const multerObj = multer( { dest : './static/upload'} );
const mysql = require( 'mysql' );
const cookieParser = require( 'cookie-parser' );
const cookieSession = require( 'cookie-session' );
const consolidate = require( 'consolidate' );
const expressRoute = require( 'express-route' );


var app = express();
app.listen( 3008 );

//1. 获取请求数据
// get 自带
app.use( bodyParser.urlencoded() );
app.use( multerObj.any() );
//2. cookie、session
app.use( cookieParser() );

(function(){
    var keys = [];

    for ( var i = 0 ; i < 100000; i++ ){
        keys.push( 'keys_' + Math.random() );
    }
    app.use( cookieSession( {
        name : 'sess_id',
        keys : keys,
        maxAge : 20 * 60 * 1000 // 20 minutes
    } ) );
})();

//3. 模板

app.engine( 'html', consolidate.ejs );
app.set( 'views', 'template' );
app.set( 'view engine', 'html' );


//4. route
app.use( '/', require( './route/web/index.js' )() );
app.use( '/admin/', require( './route/admin/index.js' )() );


// 5. default: static
app.use( static( './static/' ) );

//
//
//
//
//
//
