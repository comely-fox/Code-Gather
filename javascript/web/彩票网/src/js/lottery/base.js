import $ from 'jquery';
class Base {
    /**
     * [initPlayList 初始化奖金和玩法及说明]
     * @return {[type]} [description]
     */
    initPlayList(){
        this.play_list
        .set( 'r2', {
            bonus : 6,
            tip : '从01~11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同, 即中奖<em class="red">6</em>元',
            name : '任二'
        } )
        .set( 'r3', {
            bonus : 19,
            tip : '从01~11中任选3个或多个号码，所选号码与开奖号码任意三个号码相同, 即中奖<em class="red">19</em>元',
            name : '任三'
        } )
        .set( 'r4', {
            bonus : 78,
            tip : '从01~11中任选4个或多个号码，所选号码与开奖号码任意四个号码相同, 即中奖<em class="red">78</em>元',
            name : '任四'
        } )
        .set( 'r5', {
            bonus : 540,
            tip : '从01~11中任选5个或多个号码，所选号码与开奖号码相同, 即中奖<em class="red">540</em>元',
            name : '任五'
        } )
        .set( 'r6', {
            bonus : 90,
            tip : '从01~11中任选6个或多个号码，所选号码与开奖五个号码相同, 即中奖<em class="red">90</em>元',
            name : '任六'
        } )
        .set( 'r7', {
            bonus : 26,
            tip : '从01~11中任选7个或多个号码，所选号码与开奖五个号码相同, 即中奖<em class="red">26</em>元',
            name : '任七'
        } )
        .set( 'r8', {
            bonus : 9,
            tip : '从01~11中任选8个或多个号码，所选号码与开奖五个号码相同, 即中奖<em class="red">9</em>元',
            name : '任八'
        } );
    }
    /**
     * [initNumber 初始化号码]
     * @return {[type]} [description]
     */
    initNumber(){
        for( let i = 1; i < 12; i++ ){
            this.number.add( ( '' + i ).padStart( 2, '0' ) );
        }
    }
    /**
     * [setOmit 设置遗漏数据]
     * @param {Map} omit [ map数据结构 ]
     */
    setOmit( omit ){
        this.omit.clear();
        for ( let [ index, item ] of omit.entries() ) {
            this.omit.set( index, item );
        }
    }

    /**
     * [setOpenCode 设置开奖]
     * @param {[Set]} code [ set数据结构 ]
     */
    setOpenCode( code ) {
        this.open_code.clear();
        for( let item of code.values() ) {
            this.open_code.add( item );
        }
        this.updateOpenCode && this.updateOpenCode.call( this, code );
    }

    updateOpenCode( code ){

        $( this.open_code_list_el ).children('.ico-ball3').each( function( index, item ){
            $( item ).text( code[ index ] ); // 更新开奖号码
        } );
    }

    /**
     * [toggleCodeActive 号码选中取消]
     * @param  {Event} e [Event对象]
     * @return {[type]}   [description]
     */
    toggleCodeActive( e ){
        let $cur = $( e.currentTarget );  // 触发事件监听器的对象元素
        $cur.toggleClass('btn-boll-active');
        this.getCount();  // 重新计算注数, 奖金
    }
    /**
     * [changePlayNav 切换玩法]
     * @param  {Event} e [Event对象]
     * @return {[type]}   [description]
     */
    changePlayNav( e ) {
        let $cur = $( e.currentTarget );  // 返回其事件监听器触发该事件的元素
        $cur.addClass( 'active' ).siblings().removeClass('active');
        // 设置当前玩法
        this.cur_play = $cur.attr( 'desc' ).toLocaleLowerCase();
        // 更新玩法提示语
        $( '#zx_sm span' ).html( this.play_list.get( this.cur_play).tip );
        // 清除所有号码选中状态
        $( '.boll-list .btn-boll' ).removeClass( 'btn-boll-active' );
        this.getCount(); // 重新计算注数, 奖金
    }

    /**
     * [assistHandle 操作区, 快捷自动选号]
     * @param  {Event}  e [Event对象]
     * @return {Boolean}   [description]
     */
    assistHandle( e ){
        e.preventDefault();
        let $cur = $( e.currentTarget );  // 返回其事件监听器触发该事件的元素
        let index = $cur.index();
        $( '.boll-list .btn-boll' ).removeClass( 'btn-boll-active' );
        // 全选
        if ( index === 0 ){
            $( '.boll-list .btn-boll' ).addClass( 'btn-boll-active' );
        }
        // 选大 6-11
        if ( index === 1 ){
            $( '.boll-list .btn-boll' ).each( ( i, t ) => {
                // 判断条件 选出6-11
                if ( t.textContent - 5 > 0 ){
                    $( t ).addClass( 'btn-boll-active' );
                }
            } );
        }
        // 选小 1-5
        if ( index === 2 ){
            $( '.boll-list .btn-boll' ).each( ( i, t ) => {
                // 判断条件 选出1-5
                if ( t.textContent - 6 < 0 ){
                    $( t ).addClass( 'btn-boll-active' );
                }
            } );
        }
        // 选奇数
        if ( index === 3 ){
            $( '.boll-list .btn-boll' ).each( ( i, t ) => {
                if ( t.textContent % 2 === 1 ){
                    $( t ).addClass( 'btn-boll-active' );
                }
            } );
        }
        // 选偶数
        if ( index === 4 ){
            $( '.boll-list .btn-boll' ).each( ( i, t ) => {
                if ( t.textContent % 2 === 0 ){
                    $( t ).addClass( 'btn-boll-active' );
                }
            } );
        }
        // 重新计算注数, 奖金
        this.getCount();
    }

    /**
     * [getName 获取当前彩票名称]
     * @return {[type]} [description]
     */
    getName(){
        return this.name;
    }

    /**
     * [addCode 添加号码]
     */
    addCode() {
        // 匹配出所有文本节点数字
        let $active = $( '.boll-list .btn-boll-active' ).text().match(/\d{2}/g);
        // 匹配到就返回长度, 否则返回0
        let active = $active ? $active.length : 0;
        // 计算注数
        let count = this.computeCount( active, this.cur_play );
        if ( count ){
            this.addCodeItem( $active.join( ' ' ),
                this.cur_play,
                this.play_list.get(this.cur_play).name,
                count
            );
        }
    }

    /**
     * [addCodeItem 添加单次号码]
     * @param {String} code     [选中的所有号码字符串]
     * @param {String} type     [当前玩法]
     * @param {String} typeName [当前玩法名]
     * @param {Number} count    [总共多少注]
     */
    addCodeItem( code, type, typeName, count ){
        const template = `
            <li codes="${type}|${code}" bonus="${count * 2}" count="${count}">
                <div class="code">
                    <b>${typeName}${count > 1 ? '复式' : '单式'}</b>
                    <b class="em">${code}</b>
                    [${count}注,<em class="code-list-monery">${count * 2}元</em>]
                </div>
            </li>
        `;
        $( this.cart_el ).append( template ); // 添加当前模板数据到文档中
        this.getTotal(); // 计算当前购物车中所有注数的金额总和
    }

    /**
     * [getCount 渲染用户选码时的提示金额, 奖金预测]
     * @return {[type]} [description]
     */
    getCount() {
        // 选中的号码个数
        let active = $( '.boll-list .btn-boll-active' ).length;

        let count = this.computeCount( active, this.cur_play );  // 返回注数
        let range = this.computeBonus( active, this.cur_play ); // 返回奖金范围

        let money = count * 2; // 需要花费的金额
        // 如果中奖
        let win1 = range[ 0 ] - money;  // 最小赢亏, 正是赢, 负是亏损
        let win2 = range[ 1 ] - money;  // 最大赢亏
        let template;
        let c1 = ( win1 < 0 && win2 < 0 ) ? Math.abs( win1 ) : win1;
        let c2 = ( win1 < 0 && win2 < 0 ) ? Math.abs( win2 ) : win2;
        // 一注都没有
        if ( count === 0 ){
            template = `您选了
                <b class="red">${count}</b> 注,
                共 <b class="red">${count*2}</b> 元
            `;

        // 最小奖金与最大奖金一样的时候不需要显示范围
        }else if( range[ 0 ] === range[ 1 ] ){

            template = `您选了
            <b>${count}</b> 注，共 <b>${count*2}</b> 元
            <em>若中奖，资金:
                <strong class="red">${range[ 0 ]}</strong> 元，
                您将${win1 >= 0 ? '盈利' : '亏损'}
                <strong class="${win1 >= 0 ? 'red' : 'green'}">${Math.abs(win1)}</strong> 元
            </em>
            `;
        }else{
            template = `您选了
            <b>${count}</b> 注，共 <b>${count*2}</b> 元
            <em>若中奖，资金:
                <strong class="red">${range[ 0 ]}</strong> 至
                <strong class="red">${range[ 1 ]}</strong> 元，
                您将${ ( win1 < 0 && win2 < 0 ) ? '亏损' : '盈利'}
                <strong class="${win1 >= 0 ? 'red' : 'green'}">${c1} </strong> 至
                <strong class="${win2 >= 0 ? 'red' : 'green'}">${c2} </strong> 元
            </em>
            `;
        }
        $( '.sel_info' ).html( template );
    }

    /**
     * [getTotal 计算所有金额]
     * @return {[type]} [description]
     */
    getTotal(){
        let count = 0;
        $( '.codelist li' ).each( ( index, item ) => {
            count += $(item).attr( 'count' ) * 1; // 转为数字相加
        } );
        $( '#count' ).text( count );
        $( '#money' ).text( count * 2 );
    }

    /**
     * [getRandom 生成随机号码数]
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    getRandom( num ) {
        let arr = [], index;
        let number = Array.from( this.number );
        while( num-- ){
            index = Number.parseInt( Math.random()*number.length );
            arr.push( number[ index ] );
            number.splice( index, 1 );
        }
        return arr.join( ' ' );
    }

    /**
     * [getRandomCode 添加随机号码 - 机选]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    getRandomCode( e ) {
        e.preventDefault();
        // 机随多少注
        let num = e.currentTarget.getAttribute( 'count' );
        let play = this.cur_play.match( /\d+/g )[ 0 ];
        // 清空列表
        if ( num === '0' ){
            $( this.cart_el ).html( '' );
        }
        // 生成机随注数
        else{
            for( let i = 0; i < num; i++ ){
                this.addCodeItem(
                    this.getRandom( play ),
                    this.cur_play,
                    this.play_list.get( this.cur_play ).name,
                    1
                );
            }
        }
    }
}

export default Base;
