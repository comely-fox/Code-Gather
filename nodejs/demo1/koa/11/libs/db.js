
/**
 * db 库
 */
const MongoDB = require( 'mongodb' );
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
const config = require( './config.js' );


class DB {

    static getInstance() {
        if ( !DB.instance ){
            DB.instance = new DB();
        }
        return DB.instance;
    }
    constructor(){
        this.db = null;
        this.connect(); // 自动连接数据库
    }

    connect(){
        return new Promise( ( resolve, reject ) => {
            if ( !this.db ){
                MongoClient.connect(
                    config.dbUrl,
                    {
                        useNewUrlParser : true
                    },
                    ( err, client ) => {
                        if ( err ){
                            reject( err );
                        }else{
                            const db = client.db( config.dbName );
                            this.db = db;
                            resolve( this.db );
                        }
                    }
                );
            }else{
                resolve( this.db );
            }

        } );
    }

    find( collectionName, jsonData ){
        return new Promise( ( resolve, reject ) => {
            this.connect( ).then( db => {
                const result = db.collection( collectionName ).find( jsonData );
                result.toArray( ( err, docs ) => {
                    if ( err ){
                        reject( err );
                        return;
                    } else {
                        resolve( docs );
                    }
                } );
            } );
        } );
    }

    insert( collectionName, jsonData ){
        return new Promise( ( resolve, reject ) => {
            this.connect( ).then( ( db ) => {
                db.collection( collectionName ).insertMany( [].concat( [], jsonData ), ( err, result ) => {
                    if ( err ) reject( err );
                    else resolve( result );
                } );
            } );
        } );
    }

    update( collectionName, jsonFilter, jsonData ){
        return new Promise( ( resolve, reject ) => {
            this.connect( ).then( ( db ) => {
                db.collection(collectionName ).updateOne(

                    jsonFilter,
                    {
                        $set : jsonData
                    },
                    ( err, result ) => {
                        if ( err ) reject( err );
                        else resolve( result );
                    }

                );
            } );
        } );
    }

    remove( collectionName, jsonData ){
        return new Promise( ( resolve, reject ) => {
            this.connect( ).then( ( db ) => {
                db.collection(collectionName ).removeOne(
                    jsonData,
                    ( err, result ) => {
                        if ( err ) reject( err );
                        else resolve( result );
                    }

                );
            } );
        } );
    }

    getObjectId( id ){
        return new ObjectID( id );
    }
}

module.exports = DB.getInstance();
