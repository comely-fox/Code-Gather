const jade = require( 'jade' );
const fs = require( 'fs' );
let str = jade.renderFile( './views/7.jade',{
    pretty: true
} );
fs.writeFile('./build/2.html', str, function( err ){
    if ( err ){
        console.log( '写入失败' );
    }else{
        console.log( '写入成功' );
    }
} );
