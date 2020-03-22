{
    // 基本定义和生成实例 类
    class Parent {
        constructor( name = 'jock' ) {
            this.name = name;
        }
    }
    let v_parent = new Parent();
    let v_parent2 = new Parent('v');
    console.log( v_parent2 );
}
{
    // 继承
    class Parent {
        constructor( name = 'jock' ) {
            this.name = name;
        }
    }

    class Child extends Parent {
    }
    let child = new Child();
    console.log( Child.__proto__ )
    console.log( child )
}
{
    // 继承2 传递参数
    class Parent {
        constructor( name = 'jock' ) {
            this.name = name;
        }
    }

    class Child extends Parent {
        constructor( name = 'child' ) {
            super( name )
            this.type = 'child';
        }
    }
    let child = new Child( 'hello' );
    console.log( child )
}
{

    // getter setter
    class Parent {
        constructor( name = 'jock' ) {
            this.name = name;
        }

        get longName() {
            return 'mk' + this.name;
        }

        set longName( value ) {
            this.name = value;
        }
    }

    let v_parent = new Parent();
    console.log('getter', v_parent.longName);
    v_parent.longName = 'hello';
    console.log( 'getter', v_parent.longName );

}

{
    // 静态方法
    class Parent {
        constructor( name = 'jock' ) {
            this.name = name;
        }

        static tell(){
            console.log( 'tell' );
        }
    }

    Parent.tell()

}

{
    // 静态属性
    class Parent {
        constructor( name = 'jock' ) {
            this.name = name;
        }

        static tell(){
            console.log( 'tell' );
        }
    }
    Parent.description = 'test';

    console.log( Parent.description )

}
