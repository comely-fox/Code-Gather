const crypto = require( 'crypto' );

module.exports = {
        MD5_SUFFIX : 'ewoj2o511~~@@!@!#>>?>>o++]w[]{]ewrwh天为2一根烟ovia32517151590kvnvs}{||}fnvlxnlxvnfnw',
        md5 : function( str ){
            var obj = crypto.createHash( 'md5' );
            obj.update( str + this.MD5_SUFFIX );
            return obj.digest( 'hex' );
        }
};
