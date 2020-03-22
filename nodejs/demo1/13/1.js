const ejs = require( 'ejs' );

ejs.renderFile( './views/1.ejs',{
    name : 'jock'
}, function( err, data ){
    console.log( data )
} );
