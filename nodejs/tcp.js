const net = require('net');

function httpDocToJson( httpDoc ){
    var json = {};
    httpDoc = httpDoc.toString().split(/\r\n/);
    httpDoc.forEach((v, i) => {
        if ( i === 0 ) {
            const index1 = v.indexOf(' ');
            const index2 = v.indexOf(' ', index1 + 2);
            json['method'] = v.substring(0, index1);
            json['url'] = v.substring(index1 + 1, index2);
            json['protocol'] = v.substring(index2).trim();
        }
        else if (v !== ''){
            const index = v.indexOf(':');
            const attr = v.substring(0, index).trim();
            json[ attr ] = v.substring(index + 1).trim();
        }
    });

    return json;
}
let server = net.createServer();

// 有新客户端连接时触发
server.on( 'connection', function( socket ) {

    socket.on( 'data', function (requestData) {
        const request = httpDocToJson(requestData);
        
        // 是根路由时响应的http报文
        let responseDataTpl = `HTTP/1.1 200 OK\r\nConnection:keep-alive\r\nDate: ${new Date()}\r\nContent-Length: 12\r\nContent-Type: text/plain\r\n\r\nHello world!`;
        // 否则
        let responseDataTplError = `HTTP/1.1 404 not found\r\nConnection:keep-alive\r\nDate: ${new Date()}\r\nContent-Length: 80\r\nContent-Type: text/html;charset=utf8\r\n\r\n<span style="color:red;font-size:26px;">404!,对不起,没有这个链接</span>`;
      
        if ( request.url === '/' ) {

            socket.end(responseDataTpl);
        }

        else {
        
            socket.end(responseDataTplError)
        }  
    });
});



server.listen({
   host: 'localhost',
   port: 8080
});