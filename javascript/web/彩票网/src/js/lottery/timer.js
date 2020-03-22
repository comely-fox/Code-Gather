class Timer {
    countdown( end, update, handle ){
        const now = new Date().getTime();
        if ( now - end > 0 ){
            handle.call( this );
        }else{
            let last_time = end - now;  // 截止时候 - 当前时间
            const px_d = 1000 * 60 * 60 * 24;  // 一天多少毫秒
            const px_h = 1000 * 60 * 60; // 一小时多少毫秒
            const px_m = 1000 * 60; // 一分多少毫秒
            const px_s = 1000; // 一秒多少毫秒
            let d = Math.floor( last_time / px_d );  // 剩余时间还有多少天

            const rest_h_ms = last_time - d * px_d;  // 排除整天还剩下的毫秒
            let h = Math.floor( rest_h_ms / px_h );  // 剩余时间还有多少小时

            const rest_m_ms = rest_h_ms -  h * px_h;  // 排除整天与小时还剩下的毫秒
            let m =Math.floor( rest_m_ms / px_m );  // 剩余时间还有多少分钟

            const rest_s_ms = rest_m_ms -  m * px_m;  // 排除整天与小时与分钟还剩下的毫秒
            let s =Math.floor( rest_s_ms / px_s );  // 剩余时间还有多少秒

            let r = [];
            if ( d > 0 ){
                r.push( `<em>${d}</em>天` );
            }
            if ( r.length || h > 0 ){
                r.push( `<em>${ String(h).padStart( 2, '0' ) }</em>时` );
            }
            if ( r.length || m > 0 ){
                r.push( `<em>${ String(m).padStart( 2, '0' ) }</em>分` );
            }
            if ( r.length || s > 0 ){
                r.push( `<em>${ String(s).padStart( 2, '0' ) }</em>秒` );
            }
            // console.log( r )
            this.last_time = r.join( '' );
            update.call( this, r.join( '' ) );
            setTimeout( () => {
                this.countdown( end, update, handle );
            }, 1000 );
        }
    }
}

export default Timer;
