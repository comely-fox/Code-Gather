/*
* @Author: comely-fox
* @Date:   2018-05-13 14:14:27
* @Last Modified by:   comely-fox
* @Last Modified time: 2018-05-13 14:24:23
*/
const fs   = require( 'fs' );
const url  = require( 'url' );
const path = require( 'path' );
const events = require( 'events' );
const EventEmitter = new events.EventEmitter();

function getExt( extname ){
    fs.readFile( './mime.json', ( err, data ) => {
        if ( err ){
            return false;
        }else{
            const headType = JSON.parse( data.toString() )[ extname ] || 'text/html;charset=utf-8;';

            EventEmitter.emit( 'evExt', headType );
        }
    } );
}


exports.statics = function( req, res, staticFile ){
    let _root_ = url.parse( req.url ).pathname;
    if ( _root_ === '/' ){
        _root_ = '/index.html';
    }

    let ext =  path.extname( _root_ );

    fs.readFile( staticFile + '/' + _root_, ( err, data ) => {
        if ( err ){
            res.write( '<p style="font-size:50px;color:red;">404</p>' )
            res.end();
        }else{
            getExt( ext );
            EventEmitter.on( 'evExt', head =>{
                // 设置响应头
                res.writeHead(200, {
                    'Content-type': head + ';charset=utf-8'
                }) ;
                res.end( data );
            } );
        }
    } );
};
