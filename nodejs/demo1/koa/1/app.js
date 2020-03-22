const Koa = require( 'koa' );
const app = new Koa();


// express style of writing
/*app.use( ( req, res ) => {
    res.send( 'data' );
} );*/

app.use( async ( ctx ) => {
    ctx.body = 'koa 2.x';
} );




app.listen( 3000 );
