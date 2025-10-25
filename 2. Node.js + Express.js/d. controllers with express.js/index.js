const express = require( 'express' );
const app = express();
const userRoutes = require( './routes/user' );

app.use( express.json() );


app.use( '/api', userRoutes );

const port = process.env.PORT;

app.listen( port, () => {
    console.log( `Server is running on port ${ port }` );
} );