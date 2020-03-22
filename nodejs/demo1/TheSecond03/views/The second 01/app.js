/*
* @Author: comely-fox
* @Date:   2018-05-12 18:44:34
* @Last Modified by:   comely-fox
* @Last Modified time: 2018-05-12 19:05:18
*/


const fs = require( 'fs' );

// fs.readdir( 'route', ( err, files ) => {
//     if ( err ){

//     }else{
//        return files;
//     }
// } )


/*const readDir = ( path ) => {
    return new Promise( ( resolve, reject ) =>{
        fs.readdir( path, ( err, files ) => {
            if ( err ){
                reject( err );
            }else{
                resolve( files );
            }
        } );
    });
}

readDir( 'route/' ).then( ( data ) => {
    data.forEach( item => {
        fs.stat(__dirname + item, ( err, Stat ) => {
            console.log( Stat.isFile())
        } );
    } );
} );*/



const delFile = ( path ) => {
    return new Promise( ( resolve, reject ) => {
        fs.rmdir( path, err => {
            if ( err ){
                reject( err );
            }else{
                resolve( 'delete file success' );
            }
        } );
    } );
};

delFile( "1" ).then( ( msg ) =>{
    console.log( msg );
}, ( err ) => {
    console.log( err )
} );






































