//! server creation using http module. Node.js is not like PHP, we make server inside the application. In PHP, we make server outside the application. We used to run server like Apache PHP server, WAMP / XAMPP server. We needed to keep that running. But, in Node.js, we make server inside the application. So, we don't need to keep that running. When we need we can run, otherwise we can stop.

const http = require( 'http' );

//! create server
const server = http.createServer();

//! this server is also an event emitter. that means, it also has on, listen, emit, etc.
server.listen( 3000 ); //! we will start the server on port 3000.

console.log( 'Server is running on port 3000' );
//! Now, if we hit the url : http://localhost:3000, we will see nothing and loading. Why? Because, we have not told the server what to do when the request is made. Meaning, we have not returned anything.