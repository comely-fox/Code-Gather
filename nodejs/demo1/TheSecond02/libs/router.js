/*
* @Author: comely-fox
* @Date:   2018-05-13 14:14:27
* @Last Modified by:   comely-fox
* @Last Modified time: 2018-05-13 14:24:23
*/
const ejs = require( 'ejs' );
const app = {
    home : ( req, res ) => {
        res.end( 'home' );
    },
    'loginGet' : ( req, res ) => {
        ejs.renderFile( './views/login.ejs', {

            },
            ( err, data ) => {
                res.end( data );
            }
        );
    },
    'loginPost' : ( req, res ) => {
        res.end( '登录成功' );
    },
    'registerGet': ( req, res ) => {
        ejs.renderFile( './views/register.ejs', {

            },
            ( err, data ) => {
                res.end( data );
            }
        );
    }
};

module.exports = app;
