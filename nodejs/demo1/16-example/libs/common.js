function toDou( n ){
    return ( '0' + n ).slice( -2 );
}


module.exports = {
        time2Date : function( timestamp ){
            var oDate = new Date();
            oDate.setTime( timestamp * 1000 );
            return oDate.getFullYear() + '-' +
                    toDou( oDate.getMonth() + 1 ) + '-' +
                    toDou( oDate.getDate() ) + ' ' +
                    toDou( oDate.getHours() ) + ':' +
                    toDou( oDate.getMinutes() ) + ':' +
                    toDou( oDate.getSeconds() );
        }
};
