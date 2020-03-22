const urlLib = require( 'url' );
let obj = urlLib.parse( 'http://www.zhiew.com/index?a=12&b=5&',true );

console.log( obj )
