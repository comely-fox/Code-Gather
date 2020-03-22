const express = require( 'express' );
const static = require( 'express-static' );
const cookieParser = require( 'cookie-parser');
const cookieSession = require( 'cookie-session');
const bodyParser = require( 'body-parser' );
const multer = require( 'multer' );
const consolidate = require( 'consolidate' );
const ejs = require( 'ejs' );
const jade = require( 'jade');


const app = express();

app.listen( 3002 );

// 1. 解析cookie

const secretKey = 'owqjtoqgoqnjo2i3j41o6h1oopqioq';

app.use( cookieParser( secretKey ) );
// 2. 使用session
let arr = [];
for ( let i = 0; i < 100000; i++ ){
    arr.push( 'keys_' + Math.random() );
}
app.use( cookieSession( {
    name : 'zns_sess_id',
    keys : arr,
    maxAge : 20 * 3600 * 1000
} ) );
// 3. post 数据
app.use( bodyParser.urlencoded( {
    extended : false
} ) );
app.use( multer( {dest:'./www/upload'} ).any() );

// 4. 配制模板引擎
// 输出什么东西
app.set( 'view engine', 'html' );

// 模板文件放在哪里
app.set( 'views', './views' );
// 哪种模板引擎
app.engine( 'html', consolidate.ejs );

// 接收用户请求

app.get( '/index', function( req, res ){
    res.render( '1.ejs', { name : 'jock' } );
} );














// 4. static 数据
app.use( static( './www' ) );
