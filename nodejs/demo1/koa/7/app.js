//  应用级中间件
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

function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};

router.get( '/', async ( ctx ) => {
    console.log( getClientIP( ctx.req ) )
    await ctx.render( 'index' );
} );
router.get( '/news', async ( ctx ) => {
    await ctx.render( 'news', {
        name : 'jock',
        age : 28,
        description : '<h2>这是HTML label</h2>',
        list : [
            {
                name : 'j',
                job : 'teacher'
            },
            {
                name : 'j2',
                job : 'doctor'
            },
            {
                name : 'j3',
                job : 'IT'
            }

        ]
    } );
} );



app.use( router.routes() );  // 启动所有路由
app.use( router.allowedMethods() );  // 自动处理响应头


app.listen( 3000 );
