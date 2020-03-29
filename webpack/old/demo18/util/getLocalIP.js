/*
 * @Author: comely-fox 
 * @Date: 2019-03-01 14:33:41 
 * @Last Modified by: comely-fox
 * @Last Modified time: 2019-03-02 14:30:05
 */

 
const 
    os = require('os'),
    net = Object.create(null);

Object.defineProperty(net, '__local_ip__', {

    configurable: false,
    enumerable: false,
    writable: true,
    value: ''
})

Object.defineProperty(net, 'getLocalIP', {
 
    get () {
        
        const interfaces = os.networkInterfaces();
        
        if (this.__local_ip__) return this.__local_ip__;

        for (let device in interfaces) {

            for (let interface of interfaces[device]){
                if (interface.family === 'IPv4' && 
                    !interface.internal && 
                    interface !== '127.0.0.1') {
                        
                    this.__local_ip__ = interface.address;
                    
                    return this.__local_ip__;
                }
            }  
        }
    }
});


exports.localIP = net.getLocalIP;
