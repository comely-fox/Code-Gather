{
    let set = new Set( ['a', 'b'] );
    let iterator = set.values();
    console.log( iterator.next() );
    console.log( iterator.next() );
    console.log( iterator.next() );
}
{
    let list = new Set();
    list.add( 5 ).add( 7 );
    console.log( 'size', list.size );
    // console.log( 'value', list. );
    console.log( Object.is( NaN,NaN ) );  // true
}{
    let arr = [ 1, 3, 4, 6, 7 ];
    let list = new Set( arr );
    console.log( list )
}
{
    let o = { 1: 1, 2:2 };
    let a = [1 ,3,null,undefined,, ,5 , 7, ,1];
    console.log( a.entries() )  // 返回一个迭代器对象
    console.log( Object.values( a ), a )
    let b = a.reduce( function( accumulator, v ){
        accumulator.push( v )
        return accumulator;
    }, [] )
    console.log( b, a )
}
{
    let arr = [ {},'add', 'clear', 'delete', 'entries', 'forEach', 'has', 'values', 'keys' ];
    let set = new Set( arr );
        console.log( set.has({}) );  // false   不是同一指针

        console.log( set.has('add') );  // true
        console.log( set.delete('add') );  // true
        console.log( set );  // true
        console.log( set.clear() )
        console.log( set)

}

{
    let arr = [ {},'add', 'clear', 'delete', 'entries', 'forEach', 'has', 'values', 'keys' ];
    let list = new Set( arr );
    for ( let key of list.keys() ){
        console.log( 'k', key );
    }
    for ( let v of list.values() ){
        console.log( 'v', v );
    }
    for ( let [k,v] of list.entries() ){
        console.log( 'v',k, v );
    }
}
{

    let weakList = new WeakSet();
    let arr  = [ 1, 2, 3 ];
    weakList.add( arr );
    var o = {  // 垃圾回收机制不考虑WeakSet 是否还有对象引用 如果该对象实例没有在其它地方引用就会回收
        1 : arr
    }
    arr = null;  // 把数组对象置空, WeakSet里面也找不到了也没有了
    console.log( weakList.has( arr ) )

}

{
    let map = new Map();
    let arr = [ '123' ];
    map.set( arr, 456 );
    console.log( 'map', map, map.get( arr ) )

}
{
    let map = new Map( [ [ 'name' , 'jock' ], [ 'age', 16 ] ] );

    console.log( map )
    let map2 = new Map( [ { 1 : 1 },{ 12 : 1 } ] );
    console.log( map2 )
}
