//  应用级中间件
var Koa = require('koa'),
    Router = require('koa-router'),
    views = require( 'koa-views'),
    bodyParser = require( 'koa-bodyparser' );

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

// 使用第三方中间件获取 post提交的数据
app.use( bodyParser() );



router
    .get( '/', async ( ctx, next ) => {
        await ctx.render( 'index' );
    } )
    .post( '/doAdd', async ( ctx ) => {
        // 获取表单提交数据
        ctx.body = ctx.request.body;
    } );

app
    .use( router.routes() )
    .use( router.allowedMethods() );

app.listen( 3000 );
