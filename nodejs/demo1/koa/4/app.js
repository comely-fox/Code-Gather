//  应用级中间件
var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

// 配置路由



app
    // 匹配任意的路由
    .use( async ( ctx, next ) => {
        ctx.body = Date();
        await next();
    } )

router
    .get( '/', async ( ctx, next ) => {
        ctx.body = 'index';
    } )
    .get( '/news', async ( ctx, next ) => {
        ctx.body = 'news';
    } );

app
    .use( router.routes() )
    .use( router.allowedMethods() );

app.listen( 3000 );
