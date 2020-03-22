{
    var source = {
        name : 'jock',
        age : 15,
        _time : '2018-4-28'
    };

    var monitor = new Proxy( source, {
        // 拦截对象的读取
        get( target, property ){
            if (  property in target  ){
                return target[ property ].replace( '4', ( value, index, string ) => {
                    return '04';
                } );
            }

        },
        // 拦截对象的设置
        set( target, property, value ){
            if ( property === 'name' ){
                return target[ property ] = value;
            }else{
                return target[ property ] = value;
            }
        },
        deleteProperty( target, property ){
            if ( property.indexOf( '_' ) === 0 ){
                delete target[ property ];
                return true;
            }else{
                return target[ property ];
            }
        }
    } );
    monitor.time = "2016.36.3"
    monitor.name = "口";
    console.log( delete monitor._time )
    console.log( delete monitor.time )
    console.log(  monitor._time )
    console.log(  monitor.time )

}

{
        // 实际工作应用
        function handler( target, validate ){
            return new Proxy( target, {
                validate,
                set( target, property, value, proxy ){
                    if ( target.hasOwnProperty( property ) ){
                        var vali = this.validate[ property ]( value );
                        console.log(vali  )
                        if ( vali.status ){
                            return Reflect.set( target, property, value );
                        }else{
                            throw new Error( `${property},${ vali.msg }` );
                        }
                    }else{
                        throw new Error( '无效的操作' );
                    }
                }
            } );
        }
        const validate = {
            isEmpty( value ){
                return !!String( value ).trim();
            },
            name( value ){
                let result = new Map();
                let info = {
                    msg : '',
                    status : false
                };
                result.set( 'data', info );
                if ( !this.isEmpty( value ) ){
                    info.msg = '不能为空';
                }else if( typeof value !== 'string' ){
                    info.msg = '数据只能为字符串';
                }else{
                    info.status = true;
                    info.msg = '验证通过';
                }

                return result.get( 'data' );
            },
            password( value ){
                let result = new Map();
                let info = {
                    msg : '',
                    status : false
                };
                result.set( 'data', info );
                if ( !this.isEmpty( value ) ){
                    info.msg = '不能为空';
                }else if( typeof value !== 'string' || value.length < 8 || !/(^[a-z_A-Z]+[0-9]+[a-z_A-Z0-9]*$)/.test( value ) ){
                    info.msg = '数据只能为字符串,且必需有数字字母下符线组合,长度至少是8位';
                }else{
                    info.status = true;
                    info.msg = '验证通过';
                }
                return result.get( 'data' );
            },
            address( value ){
                let result = new Map();
                let info = {
                    msg : '',
                    status : false
                };
                result.set( 'data', info );
                if ( !this.isEmpty( value ) ){
                    info.msg = '不能为空';
                }else{
                    info.status = true;
                    info.msg = '验证通过';
                }
                return result.get( 'data' );
            }
        };
        class Guest {
            constructor( name, password, address ){
                this.name = name;
                this.password = password;
                this.address = address;
                return handler( this, validate );
            }
        }

        var guest = new Guest();
        guest.name = 'jock';
        guest.password = '';
        guest.address = '湖南省衡阳市衡阳县';

        console.log( guest )













}
