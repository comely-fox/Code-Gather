const express = require( 'express' );
const mysql = require( 'mysql' );
const common = require( '../../libs/common.js' );
var db = mysql.createPool(
    {
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'learm'
    }
);
module.exports = function() {
    var router = express.Router();

    router.get( '/get_banners', ( req, res ) => {
        db.query( 'SELECT * FROM `banner_table`', ( err, data ) => {
            if ( err ){
                res.status( 500 ).send( 'database error' ).end();
            }else{
                res.send( data ).end();
            }
        } );
    } );
    router.get( '/get_custom_evaluations', ( req, res ) => {
        db.query( 'SELECT * FROM `custom_evaluation_table`', ( err, data ) => {
            if ( err ){
                res.status( 500 ).send( 'database error' ).end();
            }else{
                res.send( data ).end();
            }
        } );
    } );
    return router;
};
