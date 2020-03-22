const fs = require( 'fs' );

// writeFile( 文件名, 回调函数 )
fs.writeFile( 'bbb.txt', 'wtwt\nwtwtw', function( err ){
    console.log( err );
} );
