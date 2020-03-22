import $ from 'jquery';

class Interface {
    /**
     * [getOmit 获取遗漏数据]
     * @param  {string} issue [当前期号]
     * @return {[type]}       [description]
     */
    getOmit( issue ) {
        return new Promise( ( resolve, reject ) => {
            $.ajax( {
                url : '/get/omit',
                data: {
                    issue : issue
                },
                dataType : 'json',
                success : ( res ) => {
                    this.setOmit( res.data );
                    resolve.call( this, res );
                },
                error : ( err ) => {
                    reject.call( err );
                }
            } );
        } );
    }
    /**
     * [getOpenCode 获取开奖号码]
     * @param  {string} issue [期号]
     * @return {[type]}       [description]
     */
    getOpenCode( issue ) {
        return new Promise( ( resolve, reject ) => {
            $.ajax( {
                url : '/get/opencode',
                data: {
                    issue : issue
                },
                dataType : 'json',
                success  : ( res ) => {
                    this.setOpenCode( res.data );
                    resolve.call( this, res );
                },
                error : ( err ) => {
                    reject.call( err );
                }
            } );
        } );
    }
    /**
     * [getState 获取当前状态]
     * @param  {[type]} issue [description]
     * @return {[type]}       [description]
     */
    getState( issue ) {
        return new Promise( ( resolve, reject ) => {
            $.ajax( {
                url : '/get/state',
                data: {
                    issue : issue
                },
                dataType : 'json',
                success  : ( res ) => {
                    resolve.call( this, res );
                },
                error : ( err ) => {
                    reject.call( err );
                }
            } );
        } );
    }
}

export default Interface;
