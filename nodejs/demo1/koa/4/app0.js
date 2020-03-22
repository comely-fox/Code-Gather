
var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

// 配置路由


// 错误处理中间件
// 中间件处理 从外向内再向外
app.use( async ( ctx, next ) => {
        console.log( '1, 第一个中间件' );
        next();
        // 路由错误处理
        console.log( '5, 第五个中间件' );
        if ( ctx === 404 ){
            ctx.body = 'route not finded';
        }else{

        }
} );
app.use( async ( ctx, next ) => {
        console.log( '2, 第二个中间件' );
        next();
        console.log( '4, 第四个中间件' );
} );



router
    .get( '/', async ( ctx, next ) => {
        ctx.body = 'index';
        console.log( '3, 第三个中间件' );
    } )

app
    .use( router.routes() )
    .use( router.allowedMethods() );

app.listen( 3000 );
