const express = require( 'express' );
const static = require( 'express-static' );
const cookieParser = require( 'cookie-parser');
const cookieSession = require( 'cookie-session' );
const bodyParser = require( 'body-parser' );
const multer = require( 'multer' );
const consolidate = require( 'consolidate' );
const mysql = require( 'mysql' );
const common = require( './libs/common.js' );

const app = express();
// 连接池
const db = mysql.createPool(
    {
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'blog'
    }
);
app.listen( 3002 );
const secretKey = 'owefo5t2o52o52o5o25j52o5j2o5';

// 解释cookie
app.use( cookieParser( secretKey ) );

// 使用session
let arr = [];
for( let i = 0 ; i < 100000; i++ ){
    arr.push( 'keys_' + Math.random() );
}

app.use( cookieSession( {
    name : 'zns_sess_id',
    keys : arr,
    maxAge : 20 * 3600 * 1000
} ) );

// post 数据
app.use( bodyParser.urlencoded( { extended: false } ) );

app.use( multer( {
    dest : './www/upload'
} ).any() );

// 配置模板引擎

app.set( 'view engine', 'html' );
app.set( 'views', './template' );
app.engine( 'html', consolidate.ejs );

// 接收用户请求
app.get( '/', ( req, res, next ) => {
    // 查询 banners
    db.query("SELECT * FROM `banner_table`", ( err, data ) => {
        if ( err ){
            res.status(500).send( 'database error' ).end();
        }else{
            res.banners = data;
            next();
        }
    } );
} );
app.get( '/', ( req, res, next ) => {
    // 查询news列表
    db.query( 'SELECT `ID`,`title`,`summary` FROM `article_table`', ( err, data ) =>{
        if ( err ){
            res.status(500).send( 'database error' ).end();
        }else{
            res.articles = data;
            next();
        }
    } );
} );
app.get( '/', ( req, res ) => {
    res.render( 'index.ejs', {
        banners : res.banners,
        articles : res.articles
    } );
} );
app.get( '/article', ( req, res ) => {
    if ( req.query.id ){
        if( req.query.act === 'like' ){
            // 增加一个赞
            db.query( 'UPDATE `article_table` SET n_like=n_like+1 WHERE `ID`=' + req.query.id, ( err, data ) => {
                if ( err ){
                    res.status( 500 ).send( '数据库有小问题' ).end();
                    console.log( err );
                }else{
                    db.query( 'SELECT * FROM `article_table` WHERE ID=' + req.query.id,
                    ( err, data ) => {
                        if ( err )
                            res.status( 500 ).send( '数据有问题' ).end();
                        else
                            if ( data.length === 0 ){
                                res.status( 404 ).send( '您请求的页面找不到了' ).end();
                            }else{
                                var articleData = data[ 0 ];
                                articleData.sDate = common.time2Date( articleData.post_time );
                                articleData.content = articleData.content.replace( /^/gm,'<p>&nbsp;').replace( /$/gm,'</p>' );
                                res.render( 'conText.ejs', {
                                    article_data : articleData
                                } );
                            }
                    } );
                }
            } );
        }else{
            db.query( 'SELECT * FROM `article_table` WHERE ID=' + req.query.id,
            ( err, data ) => {
                if ( err )
                    res.status( 500 ).send( '数据有问题' ).end();
                else
                    if ( data.length === 0 ){
                        res.status( 404 ).send( '您请求的页面找不到了' ).end();
                    }else{
                        var articleData = data[ 0 ];
                        articleData.sDate = common.time2Date( articleData.post_time );
                        articleData.content = articleData.content.replace( /^/gm,'<p>&nbsp;').replace( /$/gm,'</p>' );
                        res.render( 'conText.ejs', {
                            article_data : articleData
                        } );
                    }
            } );
        }

    }else{
        res.status( 404 ).send( '您请求的页面找不到了' ).end();
    }

} );


app.use( static( './www' ) );
