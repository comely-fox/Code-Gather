{
    // Symbol 数据类型
    // 声明
    let a1 = Symbol();
    let a2 = Symbol();
    console.log( a1 === a2 );  // false 独一无二永远不相等
    let a3 = Symbol.for( "a3" );
    let a4 = Symbol.for( "a3" );
    console.log( "a3",a3,"取键", Symbol.keyFor(a3) )
    console.log( a3=== a4 )   // true
}
{
    let a1 = Symbol.for( 'abc' );
    let a2 = Symbol.for( 'abc2' );
    let obj = {
        [ a1 ] : '123',
        [ a2 ] : 'bbb2',
        'abc' : 345,
        'c' : 456
    }
    let arr = [ 11,33,44, Symbol.for( 'symbol' ) ]

    // 可以用下标访问
    console.log( Object.entries( obj ) ) // [ [ "abc", 345 ], [ c, "456" ]  ]
    // 不能和下标访问 迭代器对象
    console.log( arr.entries() ) // [ [ 0, 11 ], [ 1, 33 ], [ 2, 44 ]  ]

    //console.log( { ...arr } )//
    console.log(Object.assign( {}, arr )  )//{0: 11, 1: 33, 2: 44}
    // Object.getOwnPropertySymbols( obj ) 返回含symbol key的数组
    Object.getOwnPropertySymbols( obj ).forEach( function( v, i ){
        console.log( this[ v ] )
    }, obj )
    Object.getOwnPropertySymbols( obj ).forEach( v => {
        console.log( obj[ v ] ); // this=== undefined
    }, obj )



    Reflect.ownKeys( obj ).forEach( v => {
        console.log( 'v',v, obj[ v ])
    } )









}
