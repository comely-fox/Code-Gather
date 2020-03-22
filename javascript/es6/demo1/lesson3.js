// 正则
{
    // ES5 二种构造函数正则写法
    let regex = new RegExp( 'xyz', 'i' );
    let regex2 = new RegExp( /xyz/i );
    console.log( regex.test( 'xyz123' ),
                regex2.test( 'xyz123' )
    ); // true true

    let regex3 = new RegExp( /xyz/ig, 'i' );
    regex3.test( '2525252xyz5' );
    console.log( RegExp.lastMatch ); // xyz
    console.log( regex3.flags ); // i -- es6 新增flags
}

{
    let s = 'bb,b_bbb_b';
    let a1 = /[b_]+/g;
    let a2 = /[b_]+/y;
    console.log( 'one', a1.exec( s ), a2.exec( s ) ); // bbb, bbb
    console.log( a1.lastIndex ); // 3
    console.log( 'two', a1.exec( s ), a2.exec( s ) ); // bb , null
    // 查看是否有y修饰符
    console.log( a1.sticky, a2.sticky ); // 粘住的 false , true
}

{
    console.log( 'u-1', /^\uD83D/.test( '\uD83D\uDC2A' ) ); // true
    // 加u修饰符 把要匹配的字符当成是一个unicdoe字符 2个字节以上
    console.log( 'u-2', /^\uD83D/u.test( '\uD83D\uDC2A' ) ); //\uD83D\uDC2A=🐪 false

    console.log( 'u-3', /^\u0061/.test( 'a33' ) ); // true
    // 加u修饰符 强制把正则识别为unicode
    console.log( 'u-4', /^\u{D83D}/u.test( "\u{D83D}\u332A" ) ); // true
    console.log( "\uD83D\u332A"  ); // true
    let s = '吉'
    console.log( String.fromCharCode(0xD842,0xDFB7) );

    // 异体字 大于0xFFFF  大于2个字节 \u 可以匹配 大于二个字节的字符
    console.log( `\u{20BB7}` )
    console.log( '33',`\uD83D\uDC2A` )
    console.log( /\uD842\uDFB7/.exec('𠮷'), RegExp.leftContext )

    console.log('\uD83D'.charCodeAt(0) )
    console.log(String.fromCharCode('') )
    console.log('🐪'.charCodeAt()) // \ud83d\udc2a
    console.log( /^.$/.test( '🐪' ) ) // false // 四个字节.只能匹配二个字节失败
    console.log( /.{1}.{1}/.exec( '🐪' ) ) // true  [🐪]

    console.log( `\u{20bb7}` );
    let s2 = '𠮷';

    console.log(s2.match( /^.$/ )); // null 四个字节
    console.log(/^.$/u.test( s2 )); // true
    // 不加u把异体字大于二个字节的拆分为二个字符
    console.log( /𠮷{1}/.exec('𠮷') ) // true 四个字节二组二个字符
    console.log( /🐪{2}/.exec('\uD83D\uDC2A\uDC2A') ) // true
    // === 等同下面
    console.log( /\uD83D\uDC2A{2}/.exec('\uD83D\uDC2A\uDC2A') ) //[🐪�] true
    console.log( /🐪{2}/.exec('🐪\uDC2A🐪') ) // [🐪�]true

    console.log( /🐪{2}/u.exec('🐪🐪') ) // [🐪🐪]true

    // .匹配符无法匹配换行符 , 回车符
    console.log('\\.匹配符', /./.exec( '\\a' ))
    console.log('\\s匹配符', /^\S$/.exec( '🐪' ))

    console.log( '𠮷'.charAt(0) ) // � js 只能正确处理2个字节的字符 不然就会拆开
    console.log( '𠮷'.length ) // 2 因为字节大于2 大于x0FFFF编码

}{
    function exactnessLength( string ){
        var res = string.match( /[\s\S]/gu );
        return res ? res.length : 0;
    }

    console.log( "exactnessLength", exactnessLength('32🐪2') )
}
