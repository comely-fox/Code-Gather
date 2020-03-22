{
    let ajax = callback =>{
        console.log( 'run' );
        setTimeout( () => {
            callback && callback.call();
        }, 1000 );
    };
    ajax( () => {
        console.log( 'timeout1' );
    } );
}
{
    let ajax = () => {
        console.log( 'run2' );
        return new Promise( ( resolve, reject ) => {
            setTimeout( function(){
                resolve();
            }, 1000 );
        } );
    };
    ajax().then( () => {
        console.log( 'promise2', 'timeout2' );
    });
}

{
    let ajax = () => {
        console.log( 'run3' );
        return new Promise( ( resolve, reject ) => {
            setTimeout( function(){
                resolve();
            }, 1000 );
        } );
    };
    ajax()
        .then( () => {
            return new Promise( function( resolve, reject ){
                setTimeout( function(){
                    resolve();
                }, 2000 );
            } )
        })
        .then( () => {
            console.log( 'timeout3' );
        } );
}

{
    let ajax = ( num ) => {
        console.log( 'run4' );
        return new Promise( (  resolve, reject ) => {
            if ( num > 5 ){
                resolve();
            }else{
                throw new Error( 'error' );
            }
        } );
    }
    ajax( 3 )
        .then( () => {
            console.log( 'log', 3 );
        } )
        .catch( ( e ) => {
            console.log( 'catch', e  );
        } );
}
{
    // 所有图片加载再添加到页面
    const loadImg = ( src ) => {
        return new Promise( (resolve, reject) => {
            let img = document.createElement( 'img' );
            img.src = src;
            img.onload = function(){
                resolve( img );
            }
            img.onerror = function( err ){
                reject( err );
            }
        } );
    };

    const showImg = ( imgs ) => {
        imgs.forEach( img => {
            document.body.appendChild( img );
        } )
    };
    Promise.all( [
        loadImg( 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2293675559,2668479973&fm=27&gp=0.jpg' ),
        loadImg( 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1251563590,1104075986&fm=27&gp=0.jpg' ),
        loadImg( 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610978638,1393585575&fm=27&gp=0.jpg' )
    ] ).then( showImg )
}
{

    let loadImg = ( src ) => {
            return new Promise( ( resolve, reject ) => {
                let objImg = document.createElement( 'img' );
                    objImg.src = src;
                    objImg.onload = function(){
                        resolve( this );
                    }
                    objImg.onerror = function(){
                        reject( this );
                    }
            } );
    };
    let showImg = ( img ) => {
            let Op = document.createElement( 'p' );
            Op.appendChild( img );
            document.body.appendChild( Op );
    };

    Promise.race( [
        loadImg( 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2293675559,2668479973&fm=27&gp=0.jpg' ),
        loadImg( 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1251563590,1104075986&fm=27&gp=0.jpg' ),
        loadImg( 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610978638,1393585575&fm=27&gp=0.jpg' ),
        loadImg( 'http://img1.imgtn.bdimg.com/it/u=3816384651,2312140424&fm=27&gp=0.jpg' )
    ] ).then( showImg )
}
