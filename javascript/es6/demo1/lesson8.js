// es6 对象简洁法

{
    let name = 'jock',
        age = 15,
        textbook = [ 'english', 'china' ];
    var obj = {
        name,
        age,
        textbook,
        show(){
            this.age = 24;
            console.log( this.name, this.age );
        }
    }
    console.log( obj );
     obj.show()
     console.log( obj );
}

{
    // 属性表达式
    let a = 'b';
    let es5_obj = {
        a : 'c'
    }
    let es6_obj = {
        [a] : 'c'
    }
    console.log( es5_obj )  // {a: "c"}
    console.log( es6_obj )  // {b: "c"}
}

{
    // es6 新增api
    console.log( '字符串', Object.is( 'abc', 'abc' ), 'abc'==='abc' )

    console.log( '数组', Object.is( [], [] ), [] === [] ) // false


    console.log( '拷贝', Object.assign( {a: "a"}, {b:"b"} ) )
    var a = {
        a : "a"
    }
    var b = {
        b : "b"
    }

    Object.assign( a, b );
    console.log( a ,b)

    let test = {
        k : 13,
        o : 32
    };

    for ( let [ key, value ] of Object.entries( test ) ){
        console.log( key, value )
    }

}


{
    // 扩展运算符
    let { a, b, ...c } = { a:'test', b:'kill', c:'ccc', d: 'ddd' };
    c = {
        c : 'ccc',
        d : 'ddd'
    }
}
