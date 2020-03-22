const jade = require( 'jade' );

console.log( jade.renderFile( './views/12.jade', {
    pretty: true,
    content : '<h2>你好</h2><p>你没看产你的小伙伴上</p>'
}));
