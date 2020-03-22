class Calculate {
    /**
     * [computeCount 计算注数]
     * @param  {number} active    [当前选中的号码总共个数]
     * @param  {string} play_name [当前玩法标识]
     * @return {number}           [注数]
     */
    computeCount( active, play_name ){
        let count = 0; // 默认注数是0
        const exist = this.play_list.has( play_name );
        const arr = new Array( active ).fill( '0' );  // 填充0为默认值
        if ( exist && play_name.at( 0 ) === 'r' ){
            // 调用组合计算函数
            count = Calculate.combine( arr, play_name.substr( -1 ) ).length;
        }

        return count;
    }

    /**
     * [computeBonus 资金范围预测]
     * @param  {number} active    [当前选中的号码总和]
     * @param  {string} play_name [当前玩法标识]
     * @return {array}           [资金范围]
     */
    computeBonus( active, play_name ) {
        const play = play_name.split( '' );
        const self = this;
        let arr = new Array( play[ 1 ] * 1 ).fill( 0 );  // 初始化玩法并填充初始值
        let min, max;
        if ( play[ 0 ] === 'r' ){
            let min_active = 5 - ( 11 - active ); // 最小命中
            if ( min_active > 0 ){ // 如果最小命中大于0 至少是选7个数
                if ( min_active - play[ 1 ] >= 0 ){ // 最小命中数如果大于或等于当前选择玩法数
                    arr = new Array( min_active ).fill( 0 );
                    // 最小有几注中奖
                    min = Calculate.combine( arr, play[ 1 ] ).length;

                }else{ // 否则 玩法是任6,任7,任8 且 选中号码数大于或等于玩法的时候
                    if ( play[ 1 ] - 5 > 0 &&
                         active - play[ 1 ] >= 0 ){
                        // 任6,任7,任8, 必有几组里面的五个数字都保含
                        arr = new Array( active - 5 ).fill( 0 );
                        min = Calculate.combine( arr, play[ 1 ] - 5 ).length;
                    // 不是任6任七任8的情况
                    }else{
                        // active - play[ 1 ] > -1 任5的情况
                        // 任5 的情况不管选多少个数字只会中五个数字唯一的 所以返回一注
                        // 等其它情况
                        min = active - play[ 1 ] > -1 ? 1 : 0;
                    }
                }
            }else{
                // 如果选中的号码总数大于或等于当前玩法 只少会中一注
                // 否则则是0注
                min = active - play[ 1 ] > -1 ? 1 : 0;
            }

            let max_active = Math.min( active, 5 );
            if ( play[ 1 ] - 5 > 0 ){
                if ( active - play[ 1 ] >= 0 ){
                    arr = new Array( active - 5 ).fill( 0 );
                    max = Calculate.combine( arr, play[ 1 ] - 5 ).length;
                }else{
                    max = 0;
                }
            }else if( play[ 1 ] - 5 < 0 ){
                arr = new Array( max_active ).fill( 0 );
                max = Calculate.combine( arr, play[ 1 ] ).length;
            }else{
                max = 1;
            }
        }
        
        return [ min, max ].map( item => item * self.play_list.get( play_name ).bonus );  // 返回最小奖金与最大奖金的数组
    }

    /**
     * [combine 组合运算]
     * @param  {array} arr  [参与组合运算的数组]
     * @param  {number} size [组合运算的基数]
     * @return {array}      [返回计算后的数组结果->注数]
     */
    static combine( arr, size ){

        let allResult = [];
        ( function f( arr, size, result ){
            let arrLen = arr.length;
            // 判断如果是选择r5 5大于数组的长度不用去计算直接返回
            if ( size > arrLen ){
                 return;
            // 如果选中的数与 选玩法是一样 比如r5 = 5  就只算一次
            }else if ( +size === arrLen ){
                allResult.push( [].concat( result, arr ) );
            }else{
                for ( let i = 0; i < arrLen; i++ ) {
                    let newResult = [].concat( result );  // 保存上一次数组的结果
                    newResult.push( arr[ i ] ); // [ '0' ]
                    if ( size === 1 ){
                        allResult.push( newResult );
                    }else{
                        let newArr = [].concat( arr );
                        newArr.splice( 0, i+1 );
                        f( newArr, size - 1, newResult );
                    }

                }
            }
        } )( arr,size,[] );
        return allResult;
    }
}

export default Calculate;
