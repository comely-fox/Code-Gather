// async 异步
/*
async function getDate(){ // 返回promise 对象
    return 'data';
}

getDate().then( data => {
    console.log( data );
} );
*/

// await 是等待异步方法执行完成, 可以获取异步方法里面的数据
/*
const getDate = async( ) => {
        return 'data';
};


const t = async() => {
    const d = await getDate();
    console.log( d );
};

t(); // 最后打印


console.log( 333 );
console.log( 333 );
console.log( getDate() );*/



// ES6 写法
/*
function getDate(){
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
            const user = 'admin';
            resolve( user );
        }, 1000 );
    } );
}

const p = getDate();

p.then( d => {
    console.log( d );
} );*/

/*function getDate(){
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => {
            const user = 'admin';

            resolve( user );

        }, 10 );
    } );
}


async function test() {
        const data = await getDate();
        console.log( data );
};
test();*/
