const express = require( 'express' ),
    bodyParesr = require( 'body-parser' ), // post
    app = express();

app.listen( 3002 );

app.use( bodyParesr.urlencoded({
    extended : true,  // 扩展模式
    limit : 2 * 1024 * 1024 // 限制2m
}) ); // 处理post数据 添加body参数到request
// GET, POST
app.use( '/', function( req, res ) {
    console.log( req.body );
} );
