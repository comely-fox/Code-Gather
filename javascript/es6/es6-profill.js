// 一些公共的方法

// 查找元素在被查找元素的索引位置
function indexOf( srcObj, searchElement, index ){
    if ( srcObj === void 0 || srcObj === null ){
        throw new TypeError( '"this" is null or not defined' );
    }

    var o = Object( srcObj );

    var len = o.length >>> 0;
    if ( len === 0 ){
        return -1;
    }
    var n = +index || 0; // 隐式转换为数字, 不能转换就为0
    n = ( n >=  0 || -1 ) * Math.floor( Math.abs( n ) );
    var k;
    for ( k = n >= 0 ? n
                    : Math.max( len - Math.abs( n ), 0 );
                k < len; k++ ){
        if ( k in o && o[ k ] === searchElement ){

            return k;
        }
    }
    return -1;
}
function lastIndexOf( srcObj, searchElement, index ){
    if ( srcObj === void 0 || srcObj === null ){
        throw new TypeError( '"this" is null or not defined' );
    }

    var o = Object( srcObj );
    var len = o.length >>> 0;

    if ( len === 0 ){
        return -1;
    }

    var n = +index || 0; // 隐式转换为数字, 不能转换就为0

    n = ( n >=  0 || -1 ) * Math.floor( Math.abs( n ) );
    var k = Math.min( n >= 0 ?  n  : len - Math.abs( n ), len - 1 );
    for ( ; k >= 0; k-- ){
        if ( k in o && o[ k ] === searchElement ){
            return k;
        }
    }
    return -1;

}

{
    console.log( indexOf( {0:3,1:5,2:5,length:3}, 5, 0 ) );
    console.log( indexOf( '5565949', '4') );
    console.log( lastIndexOf( [ 1, 3, 5, 7, 3 ], 5) );
}

{
    function reduce( srcElement, cb, initValue ){

        if ( srcElement === void 0 || srcElement === null ){
            throw new TypeError( 'not undefined or null' );
        }

        if ( ! ( typeof cb === 'function' ) ){
            throw new TypeError( cb + ' is a function' );
        }
        var o = Object( srcElement );
        var len = o.length >>> 0;

        var k = 0;
        var val;

        if ( arguments.length >= 3 ){
            val = arguments[ 2 ];
        }else{

            while ( k < len && !( k in o ) ) {  // 忽略前面的空数组元素
                k++;
            }

            if ( k >= len ){  // 空数组, 且 没有初始值
                throw new Error('Reduce of empty array ' +
            'with no initial value'  );
            }

            val = o[ k++ ];
        }
        while ( k < len ) {
            if ( k in o ){
                val = cb( val, o[ k ], k, o );
            }
            k++;
        }
        return val;

    }




    var r = reduce({'':3,'0':3,'1':1,'2':2,length:3}, function( accumulator, v, i, o ){

    })
    var r = reduce( [ 1, 3, 5,  , ,, 23 ], function( accumulator, v, i, o ){
        if ( v !== void 0 ){
            accumulator.push( v );
        }
        return accumulator ;
    }, [])
    var r = reduce( [ 1, 3, 5, 23 , ,, 23 ], function( accumulator, v, i, o ){
        if ( accumulator.indexOf( v ) === -1 ){
            accumulator.push( v )
        }
        return accumulator ;
    }, [])
    console.log( r )



    function some( srcElement, cb, _this_ ){
        if ( srcElement === void 0 || srcElement === null ){
            throw new TypeError( 'not undefined or null' );
        }

        if ( ! ( typeof cb === 'function' ) ){
            throw new TypeError( cb + ' is a function' );
        }
        var that = _this_ || undefined;

        var o = Object( srcElement );
        var len = o.length >>> 0;
        var k = 0;
        while ( k < len ) {
            if ( k in o && cb.call( that, o[ k ], k, o ) ){
                return true;
            }
            k++;
        }
        return false;
    }
    var r = some( [ 1, 3, 5, 6, 15 ], function( v, i, o ){
        return v > 10;
    } );
    console.log( r )


 // es6 兼容

function fill( srcElement ){
    if ( srcElement === void 0 || srcElement === null ){
        throw new TypeError( 'not undefined or null' );
    }
    var o = Object( srcElement );
    var len = o.length >>> 0;
    if ( len === 0 ){
        throw new TypeError();
    }
    if ( arguments[ 1 ] === void 0 ){
        throw new TypeError( 'fill not empty' );
    }
    var start = arguments[ 2 ] >> 0;

    var k = start >= 0
            ? Math.min( len, start )
            : Math.max( 0, len + start );
    console.log( k )
    var end = arguments[ 3 ] === void 0
                ? len
                : arguments[ 3 ] >> 0;
    end = end >= 0
            ? Math.min( len, end )
            : Math.max( 0, len + end );
    for ( ; k < end; k++ ){
        o[ k ] = arguments[ 1 ];
    }
    return o;
}


    var arr = [1,3,6,6,6];
    var b = fill( arr, 'A',-55,-1);

    console.log( 'arr\u003d', arr );




}


{
    // 自定义模拟迭代器  [ "a", "b", "c", "d" ]
    let arr = [ "a", "b", "c", "d" ];
    class Iterator {
        constructor ( arr ){

            this.index = 0;
            // return arr.map( ( v, i ) => {
            //     return [ i, v ];
            // } );
            var interator = arr.reduce( ( accumulator , v, i ) => {
                    this[ i ] = [ i, v ] ;
                    this.length = ++i;
            }, [ ], this );
        }
        next (){
            var flag = false;
            var value = this[ this.index++ ] ;
            if ( this.index >= this.length ){
                flag = true;
                this.index = this.length;
            }
            return {
                value:  value,
                done : flag
            }
        }
    }
    var o = new Iterator( arr );
    console.log( o);
    console.log( o.next() );
    console.log( o.next() );
    console.log( o.next() );
    console.log( o.next() );
    console.log( o.next() );
    console.log( o.next() );
    console.log( o.next() );
}

{
    function copyWithin( srcElement, target, start /*,end*/ ){
        if (srcElement === null || srcElement === void 0 ) {
          throw new TypeError('this is null or not defined');
        }

        var o = Object( srcElement );
        var len = o.length >>> 0;

        var relativeTarget = target >> 0;
        // start
        var to = relativeTarget < 0 ?
                    Math.max( len - Math.abs( relativeTarget ), 0 )
                    : Math.min( relativeTarget, len );
        var relativeStart = start >> 0;
        var from = relativeStart < 0 ?
                    Math.abs( len - Math.abs( relativeStart ), 0 )
                    : Math.min( relativeStart, len );
        // final
        var end = arguments[ 3 ];
        var relativeEnd = end === void 0 ? len : end >> 0;
        var final = relativeEnd < 0
                    ? Math.max( len - Math.abs( relativeEnd ), 0 )
                    : Math.min( relativeEnd, len );

        // 复制范围
        var range = Math.min( len - to, final - from );

        var direction = 1;   // 方向

        if ( from < to && to < ( from + range ) ){ // 目标与起始重叠
            direction = -1;
            from += range - 1;
            to += range - 1;
        }
        while ( range > 0 ) {
            if ( from in o ){
                o[ to ] = o[ from ];
            }else{
                delete o[ to ];
            }
            to += direction;
            from += direction;
            range--;
        }
        return o;
    }

    var a = [ 1, 3, 5, 9,2,56 ];   // len
    var b = [ 1, 3, 5, 9,2,56 ];   // len
    console.log( copyWithin( a, 3, 1, 5 ) )
    console.log( b.copyWithin( 3, 1, 5 ) )
}
