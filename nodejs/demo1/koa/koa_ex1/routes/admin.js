const router = require( 'koa-router' )();

router.prefix('/admin');
router
    .get( '/', ctx => {
        ctx.body = 'index';
    } )
    .get( '/user', ctx => {
        ctx.body = 'user';
    } )
    .get( '/banners', ctx => {
        ctx.body = 'banners';
    } )
    .get( '/news', ctx => {
        ctx.body = 'news';
    } );


module.exports = router;
