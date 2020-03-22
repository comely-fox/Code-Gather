//  应用级中间件
var Koa = require('koa'),
    Router = require('koa-router'),
    views = require( 'koa-views');

var app = new Koa();
var router = new Router();

/*app.use(views(__dirname + '/views', {
    //
  map: {
    html: 'ejs' // 使用后缀是html
  }
}));*/
app.use(
    // 第三种中间件
    views( './views', {
        extension : 'ejs' //就用ejs模板引擎
    } )
);





app.use( async ( ctx, next ) => {
        ctx.state.username = "jock";
        await next();
} );

router
    .get( '/', async ( ctx, next ) => {
        let title = 'your hello';
        await ctx.render( 'index', {
            title : title
        } );
    } )
    .get( '/news', async ( ctx, next ) => {
        ctx.body = 'news';
    } );

app
    .use( router.routes() )
    .use( router.allowedMethods() );

app.listen( 3000 );
