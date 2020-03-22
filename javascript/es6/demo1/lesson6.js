// 数组

{
    let arr = Array.of( 3, 4, {title : 3}, 9, 11 );

    console.log('arr\u003d', arr );

    let empty = Array.of(  );

    console.log( 'empty', empty );
}
{
    let arr = Array.from( {0:1,1:2,length:3} ); // 把类数组或可迭代对象转换为数组实例
    console.log( 'from', arr ); // [ 1, 2, undefined ]
    let oP = document.querySelectorAll( 'p' );
    let pArr = Array.from( oP );  // 转为真正的数组
    pArr.forEach( function( item ){ //
        console.log( item.textContent );
    } );

    // fnMap 映射
    console.log( Array.from( {0:1,1:2,2:3,length:3}, function( v ){
        var a = v;
        if ( v === 3 ){
            a = false;
        }
        return a;
    } ) );
}

{
    // es5 判断是否是数组
    console.log( Array.isArray(1) );
    let arr = [ 1, 3, 5, 7, 9 ];

    // arr.every(  )
    console.log( void 0 ) // undefined

    console.log( {} >>> 0 )  // 0
    console.log( null >>> 0 )  // 0
    console.log( 3 >>> 0 )  // 3

    console.log( 'key' in {key:3} && 5 ) // 5

    let arr2 = [ 1, 2,,5 ];
    console.log( Object( arr2 ) )

}{
    // es5

    function arrayEvery( arr, fn, _this_ ){ // [ ], {}, boolean, string, number

        if ( arr === void 0 || arr === null ){
            throw new TypeError(  );
        }

        if ( typeof fn !== 'function' ){
            throw new TypeError(  );
        }

        var t = Object( arr );
        var len = t.length >>> 0;
        var that = arguments[ 2 ] || void 0;
        var i = 0;
        for ( ; i < len; i++ ){
            if ( t[ i ] == 0 ) continue;
            if ( i in t && !fn.call( _this_, t[ i ], i, t ) ){
                return false;
            }
        }
        return true;
    }

    var s = 'hello world';

    arrayEvery( s, function( v, i , s ){
        console.log( v, i, s )
        return true;
    } );

    var ar2 = [ 1, 2, ,3, 4, 5 ];

    ar2.every( function( v, i, origin ){
        console.log( v, i, origin );
        return true;
    } );
    console.log( void 0 == undefined )  // void == undefined null

    console.log( [ 1, 0, 2, 3 ].lastIndexOf( 0, 5 ) )



}


{
    // 返回迭代器
    let { a, b } = { b:3, a: 1 }
    let keys = [ 1, 'a'].keys(  ) ; // return keys迭代器
    // let values = [ 1, 'a'].values(  ) ; // return values迭代器
    for ( let index  of  keys){
        console.log( 'keys is', index)
    }
    // for ( let value  of  values){
    //     console.log( 'values is', value)
    // }
    let entries = [ "a", "b", "c" ].keys();
    console.log( entries.next() ) // 这个方法可以读取迭代器的一个数据
    /**
     * entries ==
     * [ [Iterator.next], [Iterator.next],[ Iterator.next ].... ]
     */// [ [0,"a"], [ 1,"b" ], [ 2,"c" ]]
    for ( let value of  entries ){
        console.log('value\u003d', value )

    }

    Array.prototype.copyWithin = function(target, start/*, end*/) {
   // Steps 1-2.
   if (this == null) {
     throw new TypeError('this is null or not defined');
   }

   var O = Object(this);

   // Steps 3-5.
   var len = O.length >>> 0;

   // Steps 6-8.
   var relativeTarget = target >> 0;

   var to = relativeTarget < 0 ?
     Math.max(len + relativeTarget, 0) :
     Math.min(relativeTarget, len);

   // Steps 9-11.
   var relativeStart = start >> 0;

   var from = relativeStart < 0 ?
     Math.max(len + relativeStart, 0) :
     Math.min(relativeStart, len);

   // Steps 12-14.
   var end = arguments[2];
   var relativeEnd = end === undefined ? len : end >> 0;

   var final = relativeEnd < 0 ?
     Math.max(len + relativeEnd, 0) :
     Math.min(relativeEnd, len);

   // Step 15.
   var count = Math.min(final - from, len - to);  // 复制并替换的长度

   // Steps 16-17.
   var direction = 1; // 方向

   console.log(from < to && to < (from + count))
   if (from < to && to < (from + count)) {  // 目标的位置不与开始位置重叠
     direction = -1; // 从后方向
     from += count - 1;
     to += count - 1;
     console.log('form:', from )
     console.log('to:', to )
   }

   // Step 18.
   while (count > 0) { // count 是范围
        console.log( O[to], O[from]  )
     if (from in O) {
       O[to] = O[from];  // 复制替换
     } else {
       delete O[to];
     }

     from += direction;
     to += direction;
     count--;
   }

   // Step 19.
   return O;
 };

    var a = [ 1, 3, 5, 9,2,56 ];   // len 4


    console.log( a.copyWithin( 3, 2, 9 ) )






}
