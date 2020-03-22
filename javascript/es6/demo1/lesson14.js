{
    let arr = [ 'hello', 'world' ];
    let iterator = arr[Symbol.iterator]();
    console.log( iterator.next() );
    console.log( iterator.next() );
    console.log( iterator.next() );
}
{
    let obj = {
        start : [ 1, 3, 2 ],
        end : [ 7, 9, 8 ],
        [Symbol.iterator](){
            let self = this;
            let index = 0;
            let arr = self.start.concat( self.end );
            let len = arr.length;
            return {
                next(){
                    if( index < len ){
                        return {
                            value : arr[ index++ ],
                            done : false
                        }
                    }else{
                        return {
                            value : arr[ index++ ],
                            done : true
                        }
                    }
                }
            }
        }
    }
    // console.log( Object.entries( obj ) )
    // for ( let [ key, [ a,b,c,d ] ] of Object.entries( obj ) ){
    //     console.log( key, a,b,c,d );
    // }
    console.log( obj )
    for ( let key of obj ){
        console.log( key )
    }




    function iterateOver( ...arg ){
        let index = 0;
        let len = arg.length;
        let iterable = {
            [Symbol.iterator](){
                let iterator = {
                    next(){
                        if ( index < len ){
                            return {
                                value : arg[ index++ ],
                                done : false
                            }
                        }else{
                            return {
                                value : arg[ index++ ],
                                done : true
                            }
                        }
                    }
                }
                return iterator;
            }
        }
        return iterable;
    }

    for ( let [...arg] of iterateOver( 'one', 'two', 'three', 'four', 'five', 'six' ) ){
        console.log( arg )
    }



    console.log( Object.values( "abcd") ) //[ a, b, c, d ]













}
