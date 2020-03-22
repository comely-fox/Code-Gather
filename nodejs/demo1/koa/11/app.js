const DB = require( './libs/db.js' );

const Koa = require( 'Koa' ),
    router = require( 'Koa-router')(),
    render = require( 'Koa-art-template'),
    bodyParser = require( 'koa-bodyparser' ),
    path = require( 'path' );

const app = new Koa();


app.listen( 3000 );

app.use( bodyParser() );
render( app, {
    root : path.join( __dirname, 'views' ),
    extname : '.art',
    debug : process.env.NODE_ENV !== 'production'
} );

router.get( '/', async ctx => {
    const result = await DB.find( 'user', {} );
    await ctx.render( 'index', {
        list : result
    } );
} );

router.get( '/add', async ctx => {
    await ctx.render( 'add' );
} );
router.post( '/add', async ctx => {
    const body = ctx.request.body;
    const data = await DB.insert( 'user', body );
    try{
        if ( data.result.ok )
            ctx.body = '<script>alert("添加数据成功");location.href="/"</script>'
    }catch( err ){
        console.log( err );
        ctx.redirect( '/add' );
        return;
    }
} );
router.get( '/delete', async ctx => {

    const data = await DB.remove( 'user', { '_id' : DB.getObjectId( ctx.query.id ) } );
    try{
        if ( data.result.ok )
            ctx.body = '<script>alert("删除数据成功");location.href="/"</script>'
    }catch( err ){
        console.log( err );
        ctx.redirect( '/' );
        return;
    }
} );
router.get( '/update', async ctx => {
    const result = await DB.find( 'user', { '_id' : DB.getObjectId(ctx.query.id) } );
    console.log( result )
    if ( result.length > 1 || result.length === 0 ){
        ctx.redirect( '/' );
    }else{
        ctx.render( 'update', result[ 0 ] );
    }
} );
router.post( '/update', async ctx => {
    const info = ctx.request.body;
    const _id = DB.getObjectId( ctx.request.body.id );
    const { username, age, sex } = info
    const data = await DB.update(
        'user',
        {
            _id
        },
        {
            username,
            age,
            sex
        }
    );
    try{
        if ( data.result.ok )
            ctx.body = '<script>alert("修改数据成功");location.href="/"</script>'
    }catch( err ){
        console.log( err );
        ctx.redirect( '/update' );
        return;
    }
} );

app.use( router.routes() );

app.use( router.allowedMethods() );



























/*class PromiseES{

    constructor( callback ){
        this.callback = callback;
    }
    then( resolve, reject ){
        this.callback( resolve, reject || function(){} );
    }
}

function abc(){
    return new PromiseES( ( resolve, reject ) => {
        var i = 0;
        setInterval( ()=>{
            resolve( i++ );
            reject( i++ );
        },1000 );
    } );
}
abc().then( ( data ) => {
    console.log( data );
} );
*/
