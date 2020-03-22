const router = require( 'koa-router' )();
router.prefix( '/api' );
router
    .get( '/newlist', ctx => {
        ctx.body = {'title':'这是一个新闻api'};
    } )
    .get( '/banner', ctx => {
        ctx.body = {'title':'这是一个banner api'};
    } );


module.exports = router;
