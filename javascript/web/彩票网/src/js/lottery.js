import 'babel-polyfill';
import Base from './Lottery/base.js';
import Timer from './Lottery/timer.js';
import Calculate from './Lottery/calculate.js';
import Interface from './Lottery/interface.js';
import $ from 'jquery';

const copyProperties = ( target, source ) => {
    for ( let key of Reflect.ownKeys( source ) ){
        if ( key !== 'constructor' && key !== 'prototype' && key !== 'name' ){
            let desc = Object.getOwnPropertyDescriptor( source, key );
            Object.defineProperty( target, key, desc );
        }
    }
};

const mix = (...mixins) => {
    class Mix{}
    for ( let mixin of mixins ){
        copyProperties( Mix, mixin );
        copyProperties( Mix.prototype, mixin.prototype );
    }
    return Mix;
};

class Lottery extends mix( Base, Calculate, Interface, Timer ) {
    constructor( name="syy", cname="11选5", issue="**", state="**" ) {
        super();
        this.name = name;
        this.cname = cname;
        this.issue = issue;
        this.state = state;
        this.el = '';
        this.omit = new Map();
        this.open_code = new Set();
        this.open_code_list =  new Set();
        this.play_list = new Map();
        this.number = new Set();
        this.open_code_list_el =  '#open_code_list';
        this.issue_el = '#curr_issue';
        this.countdown_el = '#countdown';
        this.state_el = '.state_el';
        this.cart_el = '.codelist';
        this.omit_el = '.omit';
        this.cur_play = 'r5';
        this.initPlayList();
        this.initNumber();
        this.updateState();
        this.initEvent();
    }

    /**
     * [updateState 状态更新]
     * @return {[type]} [description]
     */
    updateState(){
        this.getState().then( (res) => {
            this.issue = res.issue;
            this.end_time = res.end_time;
            this.state = res.state;
            $( this.issue_el ).text( res.issue );
            $( this.state_el ).text( res.stateText );
            if ( res.state === 0 ){
                $( this.state_el ).removeClass('bg-ccc').addClass( 'label-important' );
            }else if( res.state === 100 ){
                $( this.state_el ).removeClass('label-important').addClass( 'bg-ccc' );
            }
            this.countdown( res.end_time,
                ( time ) => {
                    $( this.countdown_el ).html( time );
                },
                ( ) => {
                    setTimeout( () => {
                        this.updateState();
                        this.getOmit( this.issue )
                        .then( ( res ) =>{
                            $( this.omit_el ).each( ( i, item ) => {
                                $( item ).text( this.omit.get( i ) );
                            } );
                        } );
                        this.getOpenCode( this.issue )
                        .then( ( res ) => {

                        } );
                    }, 500 );
                }
        );
        } );
    }

    /**
     * [initEvent 初始化事件]
     * @return {[type]} [description]
     */
    initEvent(){
        // 玩法任二 ~ 任八 选项卡
        $( '#plays' ).on( 'click', 'li',
            this.changePlayNav.bind( this )
        );

        // 手动选择号码
        $( '.boll-list' ).on( 'click', '.btn-boll',
            this.toggleCodeActive.bind( this )
        );
        // 添加号码
        $( '#confirm_sel_code' ).on( 'click', this.addCode.bind( this ) );
        // 操作区快捷选号
        $( '.dxjo' ).on( 'click', 'li',
            this.assistHandle.bind( this )
        );

        // 机选
        $( '.qkmethod' ).on( 'click', '.btn-middle',
            this.getRandomCode.bind( this )
        );

    }
}

export default Lottery;
