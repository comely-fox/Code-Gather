/*
 * @Author: comely-fox 
 * @Date: 2019-03-01 14:33:41 
 * @Last Modified by: comely-fox
 * @Last Modified time: 2019-03-01 15:05:32
 */

 
const os = require('os');

exports.getLocalIp = (function () {

    let localIp;

    return () => {
    
        const interfaces = os.networkInterfaces();
        if (!localIp) {
            for (let device in interfaces) {
                for (let interface of interfaces[device]){
                    if (interface.family === 'IPv4' && 
                        !interface.internal && 
                        interface !== '127.0.0.1') {
                            
                        localIp = interface.address;
                        return localIp;
                    }
                }   
            }
        }

        return localIp;
    }
}());
