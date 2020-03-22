// 解构赋值

{
    let a, b, reset;
    [ a, b ] = [ 1, 2 ];

    console.log( a, b );
}
// 数组解构赋值
{
    let a, b, reset;
    [ a, b, ...rest ] = [ 1, 2, 3, 4, 5 ];
    console.log( a, b, rest );
}
// 对象解构赋值
{
    let a, b;

    ({ a, b} = { b:1, a:2 });

    console.log( a, b );
}

// 默认赋值c=3
{
    let a, b, c, reset;
    [ a, b, c=3 ] = [ 1, 2 ];

    console.log( a, b, c );
}

{
    // 数值交换
    let a = 1,
        b = 2;
    a = a + b;
    b = a - b;
    a = a - b;
    console.log( a, b );
}
// 解构赋值 用于变量交换
{
    let a = 1,
        b = 2;
    [ a, b ] = [ b, a ];
    console.log( a, b ); // 2 , 1
}
// 解构赋值用于取数组成员值赋值给一个变量
{
    var f = () => [ 11, 22 ] ;

    let a, b;
    [ a, b ] = f();
    console.log( a, b ); // 11 . 22
}

{
    var f = () => [ 1, 2, 3, 4, 5 ];
    let a, b, c;
    [ a, , ,b ] = f();
    console.log( a, b ); // 1 , 4
}

{
    var f = () => [ 1, 2, 3, 4, 5 ];
    let a, b, c;
    [ a, ...b ] = f();
    console.log( a, b ); // 1 , [ 2, 3, 4, 5 ]
}

// 对象解构赋值详情
{
    let o = { p : 42, q : true};
    let { p, q } = o;
    console.log( p , q );  // 42 , true
}


// a=10 , b=5 默认值
{
    let { a = 10, b = 5 } = { a : 3 }; // 省略了key value 是 个变量

    console.log( a, b ); // 3 , 5
}

{
    // 就是指定key
    let metaData = {
        title : 'jock',
        test : [
            {
                title : 'test',
                desc : 'description'
            },
            {
                title : 'test2',
                desc : 'description2'
            }
        ]
    };

    let {
        title: esTitle ,
        test : [
             {
                  title: title1
              } ,
              {
                  title: title2
              }
         ]
    } = metaData;

    console.log( esTitle, title1, title2 );
}
