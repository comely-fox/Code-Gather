// 数字

{
    let n = parseInt( '2.baaa' );
    let n2 = parseInt( '2.baaa' );
    console.log( n );
}

{
    // es6
    console.log( 0b10011010 );  // 2进制表示  0b
    console.log( 0o2325425 );   // 8进制    0o
    console.log( 0x2325425 );   // 16进制    0x
}

{
    console.log( 15, Number.isFinite( 15 ) );
    console.log( 'NaN', Number.isFinite( NaN )); // false
    console.log( '0/0', Number.isFinite( 0 / 0 )); // false
    console.log( 'NaN', Number.isNaN( NaN )); // true
    console.log( 'NaN', isNaN( 'f.43' )); // true 参数不能转换为数字 就为真
}
{
    console.log( '25', Number.isInteger( 25 ) );  // true
    console.log( '25.0', Number.isInteger( 25 ) );  // true
}

{
    console.log( Number.MAX_SAFE_INTEGER,   Math.pow( 2 ,53) )  // 最大安全数
    console.log( Number.MIN_SAFE_INTEGER )  // 最小安全数
    console.log( Number.isSafeInteger( 10 ) )  // true 判断数是否是安全数
    console.log( Number.isSafeInteger( Math.pow( 2 ,53) ) ) // false 2的53次方-1
}

{
    console.log( 4.1, parseInt( 4.1 ) );  //4 es3
    console.log( 4.1, Math.trunc( 4.1 ) );  //4 es6 数字取整
}
{
    // 判断是正数还是负数还是0       返回-1 0 1 NaN 能接受字符串
    console.log( '-5', Math.sign( -5 ) );   //
    console.log( '-5', Math.sign( 0 ) );
    console.log( '-5', Math.sign( 5 ) );
}

{
    // 求立方根
    console.log( Math.cbrt( -1 ) ); // -1
    console.log( Math.cbrt( 8 ) ); // 2
}
