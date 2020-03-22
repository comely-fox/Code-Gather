const jade = require( 'jade' );

console.log( jade.renderFile( './views/5.jade', {
    pretty: true,
    name : 'jock'
}));
