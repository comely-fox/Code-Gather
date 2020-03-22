
var path = require( 'path' ),
    Koa = require( 'koa' ),
    router = require( 'koa-router' )(),
    render = require( 'koa-art-template' ),
    session = require( 'koa-session' );

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: true
};
app.use(session(CONFIG, app));

router.get( '/', async ( ctx ) => {

    await ctx.render( 'index', {
        list : {
            name : ctx.session.username
        }
    } );
} );
router.get( '/login', async ( ctx ) => {
    ctx.session.username = '张三';
    ctx.body = 'login success';
} );



app.use( router.routes() );  // 启动所有路由
app.use( router.allowedMethods() );  // 自动处理响应头


app.listen( 3000 );
