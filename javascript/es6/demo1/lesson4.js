// 字符串
{
    console.log( 'a-unicode\u003d\u003e', `\u0061` );
    console.log( 's', `\u20BB7`, '0xFFFF' );
    console.log( 's', `\u{20BB7}`, '0xFFFF' );
    let s = '𠮷';
}
{
    let s = '𠮷'; // 四个字节
    console.log( 'len\u003d\u003e', s.length );
    console.log( '0', s.charAt( 0 ) )
    console.log( '1', s.charAt( 1 ) )
    console.log( 'at0', s.charCodeAt( 0 ) ); // 取unicode 驸
    console.log( 'at1', s.charCodeAt( 1 ) )

    let s1 = '𠮷a';

    console.log( 'len\u003d\u003e', s1.length ); // 3
    console.log( 'code0', s1.codePointAt( 0 ) ); // 取10进制 完整unicode码点
    console.log( 'code0', s1.codePointAt( 0 ).toString( 16 ) ); // 取完整unicode码点
    console.log( 'code0', s1.codePointAt( 1 ) ); // 取后两个字节码点
    console.log( 'code0', s1.codePointAt( 2 ) ); // 97 a的码点
}

{
    // 0xd842 + 0xdfb7 === 𠮷
    console.log( String.fromCharCode( '0x20bb7' ) );

    console.log( String.fromCodePoint( '0x20bb7' ) ); // 𠮷
    console.log( String.fromCodePoint( '0xd842', '0xdfb7' ) );  // 𠮷
}

{
    let str = '\u{20bb7}abc';
    /* ========= 相等 */
    let str2 = '\u{d842}\u{dfb7}abc';
    for ( let i = 0; i < str2.length; i++ ){
        console.log( str[ i ] );
    }

    for ( let code of str2 ){ // for of 遍布器
        console.log( 'es6', code );
    }
}

{
    let str = 'string';

    console.log( 'includes', str.includes( 'r' ) ); // true
    console.log( 'strat', str.startsWith( 'str' ) ); // true以str开始的
    console.log( 'end', str.endsWith( 'ng' ) ); // true以ng结束
}

{
    let str = 'abc';

    console.log( str.repeat( 2 ) ); // abc 重复复制2次
}

{
    let name = 'list';
    let info = 'hello world';
    let m = `i am ${name}, ${info}`;

    console.log( m );
}


{
    const a = '1';
    console.log( a.padStart( 2, '0' ) );  // 补白 01
    console.log( a.padEnd( 2, '0' ) );  // 补白 10
}

{
    function render( literals ){
        let length = Array.isArray( literals ) ? literals.length : 0,
            i = 1;
        let str = literals[ 0 ];
        for ( ; i < length; i++ ){
            str += arguments[ i ] + literals[ i ];
        }
        return str;
    }
    var data = {
        log : [ 1, 2 ]
    };
    // 字符串标签模板
    let template = render `
        <ul>

                <li>${data.log}</li>
                <li>${data.log}</li>

        </ul>
        ${data.log}
    `;

    console.log( template )
}

{

    // 会转义
    console.log( String.raw({raw : [ 'welcome, ','\nyour ', '!' ]}, '','jock')  );
    // String.raw 不转义特殊字符返回原来的相当于\\
    console.log( String.raw `welcome, \nyour jock!` )
}
