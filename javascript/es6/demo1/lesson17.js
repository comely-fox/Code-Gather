// export let A = 123;
//
// export let test = () => {
//         console.log( 'test' );
// };
//
// export class Hello {
//     test() {
//         console.log( 'class' );
//     }
// }
let A = 123;
let test = () => {
    console.log( 'test' );
};
class Hello {
    test() {
        console.log( 'class' );
    }
}

export default{
    A,
    test,
    Hello
}
