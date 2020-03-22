/*
* @Author: comely-fox
* @Date:   2018-05-13 09:18:12
* @Last Modified by:   comely-fox
* @Last Modified time: 2018-05-13 14:33:32
*/



const ejs = require( 'ejs' );
const Router = require( './router/router1.js' );

const MongoClient = require( 'mongodb' ).MongoClient;
const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'itying';  // itying 数据库名称
const app = new Router();

app.listen( 3000 );

app.get( '/', ( req, res ) => {
    ejs.renderFile( 'views/index.ejs', {}, ( err, data ) => {
        res.send( data );
    } );
} );
app.get( 'find', ( req, res ) => {
    // 增加数据
    MongoClient.connect( dbURL,{useNewUrlParser: true}, ( err, client ) =>{
        if ( err ){
            console.error( err );
            console.error( 'database connect failed' );
            return;
        }
        const db = client.db( dbName );
        const cursor = db.collection( 'user' ).find();
        const list = [];
        // 增加数据
        cursor.each( ( err, doc ) => {
            if ( err ) cosole.error( err );
            else
                if( doc != null ){
                    list.push( doc );
                }else{
                    ejs.renderFile( 'views/index.ejs', { list: list }, ( err , data ) => {
                        res.send( data );
                    } );
                }
        } );
    } );
} );
app.get( 'add', ( req, res ) => {
    // 增加数据
    MongoClient.connect( dbURL, ( err, client ) =>{
        if ( err ){
            console.error( err );
            console.error( 'database connect failed' );
            return;
        }
        const db = client.db( dbName );
        // 增加数据
        db.collection( 'user' ).insertOne( {
            "name" : "nodeJs",
            "age" : 10
         }, function( err, result ){
            if ( err ){
                console.error( 'daba operate failed' );
                return;
            }
            res.send( 'add data success' );
            client.close(); // 关闭数据库
        } );
    } );
} );

app.get( 'update', ( req, res ) => {
    // 增加数据
    MongoClient.connect( dbURL, ( err, client ) =>{
        if ( err ){
            console.error( err );
            console.error( 'database connect failed' );
            return;
        }
        const db = client.db( dbName );
        // 增加数据
        db.collection( 'user' ).updateOne( {
            "name" : "nodeJs"
        },{
            $set : { "name" : "nodeJs2" ,"age" : 100 }
        }, function( err, result ){
            if ( err ){
                console.error( 'daba operate failed' );
                return;
            }
            res.send( 'update operate success' );
            client.close(); // 关闭数据库
        } );
    } );
} );
app.get( 'delete', ( req, res ) => {
    // 增加数据
    MongoClient.connect( dbURL, ( err, client ) =>{
        if ( err ){
            console.error( err );
            console.error( 'database connect failed' );
            return;
        }
        const db = client.db( dbName );
        // 增加数据
        db.collection( 'user' ).deleteMany( {
            "name" : "nodeJs2"
        }, function( err, result ){
            if ( err ){
                console.error( 'daba operate failed' );
                return;
            }
            res.send( 'delete operate success' );
            client.close(); // 关闭数据库
        } );
    } );
} );

/*app.get( 'login', ( req, res ) => {
    ejs.renderFile( 'views/login.ejs', {}, ( err, data ) => {
        res.send( data );
    } );
} );
app.post( 'login', ( req, res ) => {
    res.send( '<script>alert("登录成功");history.back();</script>' );
} );
app.get( 'news', ( req, res ) => {
    res.send( 'news' );
} );*/
