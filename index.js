var net = require('net');
var color = require('colors')
var server = net.createServer();

server.listen(8080, function() {
    console.log('Server listening at port:'.yellow, server.address())

})

server.on('connection', function(socket) {
    var remoteAderess = socket.remoteAddress + ':' + socket.remotePort;
    console.log('New Client conecting: '.green + remoteAderess.green);

    socket.write('Xin chao anh em 123')

    socket.on('data', function(d) {
        console.log('Data from:', remoteAderess, d)
        socket.write('Hello' + d)
    })

    socket.once('close', function() {
        console.log('Disconect from %s '.yellow, remoteAderess)
    })

    socket.on('error', function(err) {
        console.log('Conection %s error: %s'.red, remoteAderess, err.message)
    })
})

