/*
* @Author: comely-fox
* @Date:   2018-05-13 09:37:03
* @Last Modified by:   comely-fox
* @Last Modified time: 2018-05-13 14:03:48
*/




// 广播 和接收广播

// 监听to_parent的广播

// EventEmitter.on( 'to_parent', function( data ){
//     console.log(data, '接收到了这个广播事件' );
// } );

// EventEmitter.emit( 'to_parent','开始' )



exports.getExt = function( fs, EventEmitter, extname ){
    fs.readFile( './mime.json', ( err, data ) => {
        if ( err ){
            console.log('mine.json file not exist' );
            return false;
        }else{

            EventEmitter.emit('onExt', JSON.parse( data.toString() )[ extname ] || 'text/html;charset=utf-8' )
        }
    } );
};

