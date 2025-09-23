const http = require( 'http' );

//! create server
const server = http.createServer( ( req, res ) => { //! req and res are the request and response objects
    res.write( 'Hello Programmers!' ); //! in response we will get -> Hello Programmers!
    res.write( 'How are you all?!' ); //! in response we will get -> How are you all?!
    res.end(); //! finally we have to end the response. 'end' is a method of response object
} );

server.listen( 3000 );

console.log( 'Server is running on port 3000' );