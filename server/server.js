const net = require('net');

const server = net.createServer();

server.on('connection', (socket) => {
    console.log('Buffer size: ' + socket.bufferSize);
    console.log('--- Server Details ---');

    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;

    console.log('Server is listening at port: ', port);
    console.log('Server IP address: ', ipaddr);
    console.log('Server is IPV4/IPV6: ', family);

    var rport = socket.remotePort;
    var ripaddr = socket.remoteAddress;
    var rfamily = socket.remoteFamily;

    console.log('--- Remote Client Info ---');
    console.log('Remote Socket is listening at port: ', rport);
    console.log('Remote Socket IP address: ', ripaddr);
    console.log('Remote Socket is IPV4/IPV6: ', rfamily);

    socket.setEncoding('utf8');

    socket.on('connect', () => {
        console.log('Connected');
    });

    socket.on('data', (buffer) => {
        var bread = socket.bytesRead;
        var bwrite = socket.bytesWritten;
    
        console.log('Bytes read: ' + bread);
        console.log('Bytes written: ' + bwrite);
        console.log('Data sent to server: ' + buffer);
    });

    socket.on('end', () => {
        console.log('Socket ended from client`s end');
    });

    socket.on('error', (error) => {
        console.log('Error: ', error);
    });

    socket.on('close', () => {
        console.log('Connection closes...');
    });
});

server.on('listening', () => {
    console.log('Server is listening');
});

server.on('close', () => {
    console.log('Server closed...');
});

server.on('error', (error) => {
    console.log("Error: ", error);
});

server.on('end', () => {
    console.log('Socket ended from client');
});

server.maxConnections = 2;
server.listen(59090);