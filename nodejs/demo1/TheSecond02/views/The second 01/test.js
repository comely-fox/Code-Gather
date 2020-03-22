/*
* @Author: comely-fox
* @Date:   2018-05-13 10:42:57
* @Last Modified by:   comely-fox
* @Last Modified time: 2018-05-13 12:05:10
*/



// 同步调用
/*function Foo(a, cb){
    console.log(a);
    // do something else
    // Maybe get some parameters for cb
    var param = Math.random();
    cb(param);
}
//定义一个叫CallBack的函数，将作为参数传给Foo
var CallBack = function(num){
    console.log(num);
}
//调用Foo
Foo(2, function(num){
    console.log(num);
});*/



// 异步调用

/*function add( a ){
    return function( b ){
        console.log( a + b )
        return a + b;
    }
}

var res = add( 1 );

console.log( 111 );

res( 3 );

console.log( 333 );
*/
//代码示例3
//注意还是那个Add，精髓也在这里，随后说到
/*function Add(a, b){
    return a+b;
}
//LazyAdd改变了，多了一个参数cb
function LazyAdd(a, cb){
    return function(b){
        cb(a, b);
    }
}
//将Add传给形参cb
var result = LazyAdd(1, Add)
// doing something else
result = result(2); // => 3

console.log( result )


*/
const fs = require( 'fs' );
var b ;

/*function fn( CallBack ){
    fs.readFile( './mime.json', ( err, data ) => {
        if ( err ){
            console.log('mine.json file not exist' );
            return false;
        }else{

            CallBack( JSON.parse( data.toString() )|| 'text/html;charset=utf-8' )
        }
} );
}
*/
var i = false;
function fn( CallBack ){
   while( i ){
    CallBack( 333 )
   }
   i = true;
}


console.log( 3233 )
fn(function( dat ){
    console.log( dat )
})
i = true;
console.log( 3233 )















