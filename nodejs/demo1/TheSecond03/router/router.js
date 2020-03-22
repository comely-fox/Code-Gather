const http = require( 'http' );
const url = require( 'url' );
module.exports = class Router {
    constructor( ){
        this._get = {};
        this._post = {};
        this.http = http.createServer( ( req, res ) =>{

            // send 方法

            res.send = ( string ) => {
                res.writeHead( 200, {
                    'Content-type' : 'text/html;utf-8;'
                } );
                res.end( string );
            };


            let pathname = url.parse( req.url ).pathname;
            if ( pathname.indexOf( '/', pathname.length - 1 ) === -1 ){
                pathname += '/';
            }
            //请求方式
            const method= req.method.toLowerCase();
            if ( this[ '_' + method ][ pathname ] ){
                switch( method ){
                    case 'post' :
                        let str = '';
                        req.on( 'data', ( data ) => {
                            str += data;
                        } );
                        req.on( 'end', ( data ) => {
                            const body = url.parse( '?' + str, true ).query;
                            req.body = body;
                            this[ '_' + method ][ pathname ]( req, res );
                        } );
                        break;
                    case 'get' :
                        this[ '_' + method ][ pathname ]( req, res );
                        break;
                }
            }else{
                res.send( 'not find router' );
            }

        } );
    }

    listen( port ){
        this.http.listen( 3000 );
    }

    get( pathname, callback ){
        if ( !pathname.endsWith( '/' ) ){
            pathname += '/';
        }
        if ( !pathname.startsWith( '/' ) ){
            pathname= '/' + pathname;
        }
        this._get[ pathname ] = callback;
    }
    post( pathname, callback ){
        if ( !pathname.endsWith( '/' ) ){
            pathname += '/';
        }
        if ( !pathname.startsWith( '/' ) ){
            pathname = '/' + pathname;
        }
        this._post[ pathname ] = callback;
    }
};
