
var path = require( 'path' ),
    Koa = require( 'koa' ),
    router = require( 'koa-router' )(),
    render = require( 'koa-art-template' );

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

router.get( '/', async ( ctx ) => {
    ctx.cookies.set( 'userinfo', 'zhangsan', {
        maxAge : 60 * 1000 * 60
    } );

    await ctx.render( 'index', {
        list : {
            name : '张三'
        }
    } );
} );
router.get( '/shop', async ( ctx ) => {
    ctx.cookies.set( 'job', new Buffer('天天').toString('base64'), {
        maxAge : 60 * 1000 * 60,
        path : '/shop',
        httpOnly : true  // true 只有服务端 才能拿到
    } );
    const userinfo = ctx.cookies.get( 'userinfo' );

    ctx.body = 'shop-------------' + userinfo ;
} );


app.use( router.routes() );  // 启动所有路由
app.use( router.allowedMethods() );  // 自动处理响应头


app.listen( 3000 );
