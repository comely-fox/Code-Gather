const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const multer = require( 'multer' );
const fs = require( 'fs' );
const pathLib = require( 'path' );
const objMulter = multer({dest:'./www/upload'});
const app = express();
// 只能解析值
/*app.use( bodyParser.urlencoded( {
    extended : false
} ) );*/
app.use( objMulter.any() );
app.post( '/', function( req, res ){
    let newName = req.files[ 0 ].path + pathLib.parse( req.files[ 0 ].originalname ).ext;
    fs.rename( req.files[ 0 ].path, newName, function( err ){
        if ( err )
            res.write( '上传成功' );
        else
            res.write( '上传失败' );
    } );
} );
app.listen( 3002 );
