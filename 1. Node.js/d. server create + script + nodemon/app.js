import http from 'http';

const PORT = process.env.PORT;

const app = http.createServer( ( req, res ) => {
    // res.setHeader( 'Content-Type', 'text/html' );
    // res.statusCode = 404;

    res.writeHead( 200, { 'Content-Type': 'text/html' } );
    res.end( "<h1>Hello World!</h1>" );

    console.log( req.url );
    console.log( req.method );
    console.log( req.headers );
} );

app.listen( PORT, () => {
    console.log( `Server is running on port ${ PORT }` );
} );