const common = require( '../../libs/common.js' );
const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );
const path = require( 'path' );
const fs = require( 'fs' );
var db = mysql.createPool(
    {
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'learm'
    }
);

module.exports = function() {
    router.get( '/', function( req, res ) {
        switch( req.query.act ){
            case 'del' :
                db.query( 'SELECT * FROM custom_evaluation_table WHERE ID=' + req.query.id,
                    ( err, data ) => {
                        if ( err ){
                            console.error( err );
                            req.status( 500 ).send( 'database error' ).end();
                        }else{
                            if ( data.length === 0 ){
                                res.status( 404 ).send( 'no this custom evaluation' ).end();
                            }else{
                                fs.unlink( 'static/upload/' + data[ 0 ].src, function( err ){
                                    if ( err ){
                                        console.error( err );
                                        res.status( 500 ).send( 'file operation error' ).end();
                                    }else{
                                        db.query( 'DELETE FROM `custom_evaluation_table` WHERE ID=' + req.query.id,
                                            ( err, data ) => {
                                                if ( err ){
                                                    req.status( 500 ).send( 'database error' ).end();
                                                }else{
                                                    res.redirect( '/admin/custom' );
                                                }
                                            }
                                        );
                                    }
                                } );
                            }
                        }
                    }
                );
                break;
            case 'mod' :
                db.query( 'SELECT * FROM custom_evaluation_table WHERE ID=' + req.query.id,
                    ( err, data ) => {
                        if ( err ){
                            console.error( err );
                            res.status( 500 ).send( 'database error' ).send();
                        }else if ( data.length === 0 ){
                            res.status( 404 ).send( 'no this evaluation' ).end();
                        }else{
                            db.query( 'SELECT * FROM `custom_evaluation_table`',
                                ( err, evaluations ) => {
                                    if ( err ){
                                        req.status( 500 ).send( 'database error' ).end();
                                    }else{
                                        res.render( 'admin/custom.ejs', {evaluations,mod_data : data[ 0 ] } );
                                    }
                                }
                            );

                        }
                    }
                );
                break;
            default :
                db.query( 'SELECT * FROM `custom_evaluation_table`',
                    ( err, evaluations ) => {
                        if ( err ){
                            req.status( 500 ).send( 'database error' ).end();
                        }else{
                            res.render( 'admin/custom.ejs', {evaluations} );
                        }
                    }
                );
        }
    } );
    router.post( '/', function( req, res ){
        var title = req.body.title;
        var description = req.body.description;
        if ( req.files[ 0 ] ){
            var ext = path.parse( req.files[ 0 ].originalname ).ext;
            var oldPath = req.files[ 0 ].path;
            var newPath = req.files[ 0 ].path + ext;
            var newFileName = req.files[ 0 ].filename + ext;
        }else{
            var newFileName = null;
        }
        if ( newFileName ){
            fs.rename( oldPath, newPath, ( err ) => {
                if ( err ){
                    res.status( 500 ).send( 'file opration error').end();
                }else{
                    if ( req.body.mod_id ){ // 修改
                        // 先删除老的
                        db.query( 'SELECT * FROM custom_evaluation_table WHERE ID=' + req.body.mod_id,
                            ( err, data ) => {
                                if ( err ){
                                    res.status( 500 ).send( 'database error' ).end();
                                }else if( data.length === 0 ){
                                    res.status( 404 ).send( 'old file not found' ).end();
                                }else{
                                    fs.unlink( 'static/upload/' + data[ 0 ].src,
                                        ( err ) => {
                                            if ( err ){
                                                res.status( 500 ).send( 'file operation error' ).end();
                                            }else{
                                                db.query( 'UPDATE custom_evaluation_table SET title="' +
                                                    title + '",description="' +  description +
                                                    '",src="'+newFileName +'" WHERE ID=' + req.body.mod_id,
                                                    ( err, data ) => {
                                                        if ( err ){
                                                            console.log(err );
                                                            res.status( 500 ).send( 'database error').end();
                                                        }else{
                                                            res.redirect( '/admin/custom' );
                                                        }
                                                    }
                                                );
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }else{  // 添加

                        db.query( 'INSERT INTO `custom_evaluation_table` (title,description,src) VALUES ("' +
                                 [ title, description, newFileName].join('","') + '")',
                            function( err, data ){
                                if ( err ){
                                    console.log(err );
                                    res.status( 500 ).send( 'database error').end();
                                }else{
                                    res.redirect( '/admin/custom' );
                                }
                            }
                        );
                    }
                }
            } );
        }else{
            if ( req.body.mod_id ){ // 修改
                db.query( 'UPDATE custom_evaluation_table SET title="' +
                    title + '",description="' +  description +
                    '" WHERE ID=' + req.body.mod_id,
                    ( err, data ) => {
                        if ( err ){
                            console.log(err );
                            res.status( 500 ).send( 'database error').end();
                        }else{
                            res.redirect( '/admin/custom' );
                        }
                    }
                );
            }else{  // 添加

                db.query( 'INSERT INTO `custom_evaluation_table` (title,description,src) VALUES ("' +
                         [ title, description, newFileName].join('","') + '")',
                    function( err, data ){
                        if ( err ){
                            console.log(err );
                            res.status( 500 ).send( 'database error').end();
                        }else{
                            res.redirect( '/admin/custom' );
                        }
                    }
                );
            }
        }


    } );
    return router;
};
