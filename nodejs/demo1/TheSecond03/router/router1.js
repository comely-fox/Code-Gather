function unify( path ){
    if ( !path.endsWith( '/' ) ){
        path = path + '/';
    }
    if( !path.startsWith( '/' ) ){
        path = '/'+ path;
    }
    return path;
}
function addToRes( res ){
    res.send = function( buffer ){
        res.writeHead( 200, {
            'Content-type' : 'text/html;charset=utf-8;'
        } );
        res.end( buffer );
    };
}

const http = require( 'http' );
const url = require( 'url' );
module.exports = class Router {
    constructor( ){
        this.methodFn = {};
        this.http = http.createServer( ( req, res ) => {
            const pathname = unify( url.parse( req.url ).pathname );
            const method = req.method.toLowerCase().replace( /\w{1}/, function( child ){
                return child.toUpperCase();
            } );
            addToRes( res );
            if ( this.methodFn[ pathname + method ] ){
                switch( method ){
                    case 'Get' :
                        this.methodFn[ pathname + method ]( req, res );
                        break;
                    case 'Post' :
                        let string = '';
                        req.on( 'data', data => {
                            string += data;
                        } );

                        req.on( 'end', () => {
                            const body = url.parse( '?' + string, true ).query;
                            req.body = string;
                            this.methodFn[ pathname + method ]( req, res );
                        } );
                        break;
                }
            }else{
                res.send( 'router not exist' );
            }
        } );
        return this;
    }
    listen( port ){
        this.http.listen( port );
    }
    get( pathname, callback ){
        pathname = unify( pathname );  // 统一斜扛
        this.methodFn[ pathname + 'Get' ] = callback;
    }
    post( pathname, callback ){
        pathname = unify( pathname );  // 统一斜扛
        this.methodFn[ pathname + 'Post' ] = callback;
    }
};
