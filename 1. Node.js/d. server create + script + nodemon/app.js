import http from 'http';

const PORT = process.env.PORT;

const app = http.createServer( ( req, res ) => {
    // res.setHeader( 'Content-Type', 'text/html' );
    // res.statusCode = 404;

    // res.writeHead( 200, { 'Content-Type': 'text/html' } );
    // res.end( "<h1>Hello World!</h1>" );

    // console.log( req.url );
    // console.log( req.method );
    // console.log( req.headers );

    // if ( req.url === '/' ) {
    //     res.writeHead( 200, { 'Content-Type': 'text/html' } );
    //     res.end( "<h1>Hello World!</h1>" );
    //     console.log( req.url );
    //     console.log( req.method );
    //     console.log( req.headers );
    // }
    // else if ( req.url === '/about' ) {
    //     res.writeHead( 200, { 'Content-Type': 'text/html' } );
    //     res.end( "<h1>About Us</h1>" );
    //     console.log( req.url, req.method, req.headers );

    //     console.log( req.url );
    //     console.log( req.method );
    //     console.log( req.headers );
    // }
    // else {
    //     res.writeHead( 404, { 'Content-Type': 'text/html' } );
    //     res.end( "<h1>404 - Page Not Found</h1>" );
    // }

    try {
        if ( req.method === 'GET' ) {
            if ( req.url === '/' ) {
                res.writeHead( 200, { 'Content-Type': 'text/html' } );
                res.end( "<h1>Hello World!</h1>" );
                console.log( req.url );
                console.log( req.method );
                console.log( req.headers );
            }
            else if ( req.url === '/about' ) {
                res.writeHead( 200, { 'Content-Type': 'text/html' } );
                res.end( "<h1>About Us</h1>" );
                console.log( req.url, req.method, req.headers );

                console.log( req.url );
                console.log( req.method );
                console.log( req.headers );
            }
            else {
                res.writeHead( 404, { 'Content-Type': 'text/html' } );
                res.end( "<h1>404 - Page Not Found</h1>" );
            }
        }
        else {
            res.writeHead( 405, { 'Content-Type': 'text/html' } );
            res.end( "<h1>405 - Method Not Allowed</h1>" );
        }
    } catch ( error ) {
        console.error( error );
        res.writeHead( 500, { 'Content-Type': 'text/html' } );
        res.end( "<h1>Internal Server Error</h1>" );
    }
} );

app.listen( PORT, () => {
    console.log( `Server is running on port ${ PORT }` );
} );