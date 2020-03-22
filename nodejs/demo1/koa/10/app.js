const MongoClient = require( 'mongodb' ).MongoClient;


const url = 'mongodb://localhost:27017';

const dbName = 'koa';
console.time( 'db' );
MongoClient.connect( url, {useNewUrlParser: true}, ( err, client ) => {
    if ( err ) {
        console.error( 'database connect failed' );
    }

    const db = client.db( dbName );
    const collection = db.collection( 'user' );

    const result = collection.find( {} );
    result.toArray( ( err, docs ) => {
        console.timeEnd( 'db' );
    } );

} );
