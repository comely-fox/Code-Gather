const Koa = require( 'koa' ),
    router = require( 'koa-router' )();

const admin = require( './routes/admin.js' );
const api = require( './routes/api.js' );
const app = new Koa();



app.use( admin.routes(), admin.allowedMethods() );
app.use( api.routes(), api.allowedMethods() );




app.listen( 3000 );
