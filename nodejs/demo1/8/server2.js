const express = require( 'express' );
const expressStatic = require( 'express-static' );

const app = express();

// 用户数据
let users = {
    '1' : 1,
    '2' : 2
};
app.get( '/login', ( req, res ) => {
    let user = req.query[ 'user' ];
    let pass = req.query[ 'pass' ];
    if ( users[ user ] === void 0 ){
        res.send( { ok : false, msg : '此用户不存在' } );
    }else {
        if ( users[ user ] != pass ){
            res.send( { ok : false, msg : '密码错误' } )
        }else{
            res.send( { ok : true, msg : '登录成功' } )
        }
    }
} );
app.listen( 3002 );
app.use( expressStatic( './www' ) );
