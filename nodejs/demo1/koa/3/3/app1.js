
var Koa = require('koa');
var router = require('koa-router')(); // 实例化路由

var app = new Koa();


// 配置路由

router
    .get( '/', async ( ctx, next ) => {
        ctx.body = 'index';
    } )
    .get( '/news', async ( ctx, next ) => {
        ctx.body = 'news';
    } )
    .get( '/content', async ( ctx, next ) => {
        // 获取GET传值
        console.log( ctx.querystring );
        console.log( ctx.query );
    } )
    ;







app
    .use( router.routes() )
    .use( router.allowedMethods() );

app.listen( 3000 );
