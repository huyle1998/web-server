var net = require('net');
var color = require('colors')
var server = net.createServer();



server.on('connection', function(socket) {
    var remoteAderess = socket.remoteAddress + ':' + socket.remotePort;
    console.log('New Client conecting: '.green + remoteAderess);

    socket.on('data', function(d) {
        console.log('Data from:', remoteAderess, d)
        socket.write('Hello' + d)
    })

    socket.once('close', function() {
        console.log('Conection from %s Closed'.yellow, remoteAderess)
    })

    socket.on('error', function(err) {
        console.log('Conection %s error: %s'.red, remoteAderess, err.message)
    })
})

server.listen(4040, function() {
    console.log('Server started at port:'.white, server.address())

})