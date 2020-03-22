{
    function test( x, y = 'world' ){
        console.log('默认值', x, y );
    }
    test('hello');
}

{
    let x = 'test';
    function test2( x, y = x ){
        console.log('作用域', x, y );
    }
    test2( 'kill' )
}

{
    function test3( ...arg ){
        for ( let v of arg ){
            console.log( 'rest', v, arguments )
        }
    }
    test3( '1', '2', '3' )
}
{
    var a = [ [1], 2, 4 ];
    var b = [...a ];
    console.log( b )
    a[ 0 ][0] = 5;
}

// 斐波纳契（一种整数数列) 尾递归
{

    /**
     * function Fibonacci2 (10 , ac1 = 1 , ac2 = 1) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, 1, 2);
}
Fibonacci2(10)

function Fibonacci2 (9 , ac1 =1 , ac2 = 2) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, 2, 3);
}
function Fibonacci2 (8 ,2 , ac2 = 3) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, 3, 5);
}
function Fibonacci2 (7 ,3 , 5) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, 5, 8);
}
function Fibonacci2 (6 ,5 ,8) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, 8,13);
}
function Fibonacci2 (5 ,8 ,13) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, 13,21);
}
function Fibonacci2 (4 ,13 ,21) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, 21,34);
}
function Fibonacci2 (3 ,21 ,34) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, 34,55);
}
function Fibonacci2 (2 ,34 ,55) {
    if( n <= 1 ) {return ac2};
    return Fibonacci2 (n - 1, 55,89);
}
function Fibonacci2 (1 ,55 ,89) {
    if( n <= 1 ) {return 89};

}

function Fibonacci2 (n) {
    if( n <= 1 ) {return 1};
    return Fibonacci2 (n - 1) + Fibonacci2 (n - 2);
}
     */

}


{
    // 尾调用
    function a( x ){
        console.log( x );
    }



    function b(x){
        return a( x );
    }

    b( 3 )

    // 尾调用
    function x(  ){
        let x = 13;
        let y = 2;
        return a( x + y );
    }


    x()
    console.log( '--------factorial-----------' )
//  不是尾调用阶乘递归
    function factorial( n ){
        if ( n === 1 ){
            console.log( n,window.b );
            return 1;
        };
        var b = n * factorial( n - 1 );
        console.log("n",n,"上一个计算结果n-1", b )
        return b;
    }
    console.log( factorial( 5 ) )

    // 尾递归阶乘

    function factorial2( n, lastValue = 1 ){
        if ( n === 1 ){
            console.log("n",n,'上一次结果', lastValue )
             return lastValue;
        }
        console.log('n',n,'上一次结果', lastValue )
        return factorial2( n - 1, lastValue * n );
    }

    console.log( factorial2( 5 )  )


    function Fibonacci( n ){
        if ( n <= 1 ) return 1;
        var a = Fibonacci( n -1 );
        var b = Fibonacci( n -2 );
        var c = a + b;
        console.log( "a;n-1=", a, "b;n-2=", b, "c;n=",c);
        return c;
    }
    // 尾递归
    function Fibonacci2( n, c1 = 1, c2 = 1 ){
        if ( n <= 1 ){
            console.log( "c1", c1, "c2", c2 )
             return c2;
        }
        console.log( "c1", c1, "c2", c2 )
        return Fibonacci2( n - 1, c2, c1 + c2 );
    }
    console.log( Fibonacci( 10 ) );
    console.log( Fibonacci2( 10 ) );



function walk(arr, i, len, fn ){
    if ( i === len ) return arr;
    fn.call( this, arr[ i ], i ,arr  );
    return walk( arr, i+1, len, fn )
}

    function each(arr,fn){
        var len = arr.length;
        var i = 0;
        return walk(arr,i ,len, fn);
    }

console.log(     each([ 1, 3, 5, 6 ], function( v, i ,ar ){
        console.log( v )
    } ) )
"use strict"
    function sum(x, y) {
        if ( y < 0 ) return x;
    return sum(x + 1, y - 1);
}
// sum(1, 100000)

}{

    function tco(f) {
        var value;
        var active = false;
        var accumulated = [];
        var t = 1;
        return function accumulator() {
            accumulated.push(arguments);
            if ( !active ){
                active = true;
                while( accumulated.length ){
                    value = f.apply( this, accumulated.shift() );
                }
                active = false;
            }
            return value;
        };
    }
    var sum = tco(function(x, y) {
        if (y > 0) {
            return sum(x + 1, y - 1)
        }else {

            return x
        }
    });
    console.log( sum(1, 100000) )


}
