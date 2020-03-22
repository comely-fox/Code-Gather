{
    let readonly = function( target, name, descriptor ){
        descriptor.writable = false;
        return descriptor;
    }
    function mixins( ...list ){
        return function( target, name, descriptor ){
            Object.assign( target.prototype, ...list );
        }
    }
    let foo = {
        foo(){
            console.log( 'foo' );
        }
    }

    class Test {

        time(){
            return '2018-4-28';
        }
    }
    Test = mixins( foo )( Test ) || Test;//
    let test = new Test();
    // test.time = () => {
    //     console.log( 'reset time' );
    // }
    console.log( test);
}


{
    let log = ( type ) => {
        return ( target, name, descriptor ) => {
            let src_method = descriptor.value;
            descriptor.value = ( ...arg ) => {

                 // src_method.apply( target, arg )
                src_method( ...arg );
                // 执行另外的逻辑
                console.log( `log ${type}` );
            }
        }
    }
    class AD {
        @log( 'show' )
        show() {
            console.info( 'ad is show' );
        }
        @log( 'click' )
        click() {
            console.info( 'ad is click' );
        }
    }

    let ad = new AD();
    ad.show(22);
    ad.click();














}
