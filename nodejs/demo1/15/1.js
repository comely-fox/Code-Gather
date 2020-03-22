const mysql = require( 'mysql' );

// 1.连接

var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : '20180509'
});

// 2. 查询
db.query( "SELECT * FROM `user_table`", ( err, data ) => {
    if ( err ){
        console.log( '出错', err );
    }else{
        console.log( '成功', JSON.stringify( data ) );
    }
} );
