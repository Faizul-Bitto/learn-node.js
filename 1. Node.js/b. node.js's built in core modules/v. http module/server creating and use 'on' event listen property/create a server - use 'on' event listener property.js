//! As server is also an event emitter. that means, it also has 'on' method.
const http = require( 'http' );

//! create server
const server = http.createServer();

//! 'on' method is used to listen to the server.
server.on( 'connection', () => {
    console.log( 'New connection' );
} ); //! whenever someone hits this server, this event will keep on raising. and on console we will see 'New connection' again and again. Though in real world, we will not event listen for connection event.

server.listen( 3000 ); //! when we listen to the server, basically event loop gets started. we can think event loop as a while loop that keeps on running.

console.log( 'Server is running on port 3000' );