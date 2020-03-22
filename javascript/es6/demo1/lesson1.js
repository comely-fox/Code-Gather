// const let 块级作用域

function abc(){
    let a = 1;
    // let a = 2;
}
abc();
// let const 都有块级作用域, const要赋值 定义的值 不能修改 let不能二次定义
function b(){

    switch( 1 ){
        case 1 :
            if ( 1 ){
                const PI = 3.14;
                if ( 1 ){

                    console.log( PI );
                }

            }

        case '':

    }

    // PI = 3;  // red-only // 仅仅是只读
}
b();
