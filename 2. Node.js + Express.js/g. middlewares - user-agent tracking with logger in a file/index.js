const express = require( 'express' );
const app = express();
const userRoutes = require( './routes/user' );
const { isValid } = require( './middleware/IsValid' );
const { checkUserAgent } = require( './middleware/CheckUserAgent' );

app.use( express.json() );


app.use( '/api', isValid, checkUserAgent, userRoutes );

const port = process.env.PORT;

app.listen( port, () => {
    console.log( `Server is running on port ${ port }` );
} );