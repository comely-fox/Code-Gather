const ejs = require( 'ejs' );

ejs.renderFile( './views/4.ejs',{
    json : {
        arr : [
            {
                user : 'bluc',
                pass : '123456'
            },
            {
                user : '小明',
                pass : '151616'
            },
            {
                user : 'jock',
                pass : '363636'
            }
        ]
    }
}, function( err, data ){
    console.log( data )
} );
