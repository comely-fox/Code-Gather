const jade = require( 'jade' );

console.log( jade.renderFile( './views/9.jade', {
    pretty: true,
    a : 12,
    b : 4
}));
