const express = require( 'express' );
const router = express.Router();
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

module.exports = function(){
    router.get( '/', ( req, res ) => {

        if ( !req.session.admin_id ){
            res.render( 'admin/login.ejs',{});
        }else{
            res.redirect( '/admin/' );
        }
    } );
    router.post( '/', ( req, res ) => {
        var username = req.body.username;
        var password = common.md5( req.body.password );
        db.query( 'SELECT * FROM `admin_table` WHERE username=' + '\'' + username + '\'',
            function( err, data ) {
                if ( err ){
                    console.log( err );
                    res.status( 500 ).send( 'database error' ).end();
                }else{
                    if ( data.length === 0 ){
                        res.status( 400 ).send( 'no this admin' ).end();
                    }else{
                        if ( data[ 0 ].password ===  password ){
                            // 成功
                            req.session.admin_id = data[ 0 ].ID;
                            res.redirect( '/admin/' );
                        }else{
                            res.status( 400 ).send( 'this password is incorrect' ).end();
                        }
                    }
                }
            }
        );
    } );
    return router;
};
