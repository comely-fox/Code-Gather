{
    // genertor 基本定义
    let tell = function* (){
        let index = 0;
        while( true ){
            yield index++;
        }
    };
    let k = tell();
    console.log( k.next() );  // 0
    console.log( k.next() );  // 1
    console.log( k.next() );  // 2
    console.log( k.next() );  // 3
    console.log( k.next() );  // 4
    console.log( k.next() );  // 5
    console.log( k.next() );  // 6
    console.log( k.next() );  // ...

}
{
    let gen = function* (){
        yield 1;
        yield 2;
        return 3;
    }
    let iterator = gen();
    console.log( iterator.next() );
    console.log( iterator.next() );
    console.log( iterator.next() );
    console.log( iterator.next() );
}
{
    let obj = {};
    obj[Symbol.iterator] = function*(){
        // let index = 0;
        // while( true ){
        //     yield index++;
        // }
        yield 1;
        yield 2;
        yield 3;
    }
    for ( let value of obj ){  // 迭代器接口
        console.log( 'value', value );
    }
}

{
    let state = function*(){
        while( 1 ){
            yield "A";
            yield "B";
            yield "C";
        }
    }
    // 语法糖
    // let state2 =async function(){
    //     while( 1 ){
    //         await "A";
    //         await "B";
    //         await "C";
    //     }
    // }

    let iterator = state();
    console.log( iterator.next() );
    console.log( iterator.next() );
    console.log( iterator.next() );
    console.log( iterator.next() );
    console.log( iterator.next() );
}

{
    let draw = ( count ) => {
        // 具体抽奖逻辑
        console.info( `剩余${count}次` );
    };

    let residue = function* ( count ){
        while( count > 0 ){

            yield draw( --count );
        }
    }

    let star = residue( 5 );
    let btn = document.createElement( 'button' );
    btn.id = 'start';
    btn.textContent = '抽奖';
    document.body.appendChild( btn );
    document.querySelector( '#start' ).addEventListener( 'click' , () => {
        star.next();
    }, false );

}

{
    let ajax = function* () {
        // while( 1 ){
            yield new Promise( function( resolve, reject ){
                setTimeout( () => {
                    resolve( { status : 0 } );
                }, 200 )
            } );
        // }
    };

    let pull = () => {
        let genertor = ajax();
        let step = genertor.next();
        step.value.then( ( d ) => {
            if ( d.status != 0 ){
                setTimeout( () => {
                    console.info('wait' );
                    pull();
                }, 1000 );
            }else{
                console.info( d );
            }
        } );
    };

    pull();

    // let ajax = function* () {
    //     while( 1 ){
    //         yield new Promise( function( resolve, reject ){
    //             setTimeout( () => {
    //                 resolve( { status : 10 } );
    //             }, 200 )
    //         } );
    //     }
    // };
    // function get( genertor ){
    //     let step = genertor.next();
    //
    //     step.value.then( ( d ) => {
    //         if ( d.status != 0 ){
    //             console.info('wait' );
    //             get( genertor );
    //         }else{
    //             console.info( d );
    //         }
    //     } );
    // }
    // let pull = () => {
    //     let genertor = ajax();
    //     get( genertor );
    //
    // };
    //
    // pull();












}
