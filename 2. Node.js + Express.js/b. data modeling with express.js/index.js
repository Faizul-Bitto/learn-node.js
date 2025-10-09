const express = require( "express" );
const app = express();

app.use( express.json() );

const userRoutes = require( "./user" );
const paymentRoutes = require( "./payment" );

app.use( userRoutes );
app.use( paymentRoutes );

app.listen( 3000, () => {
    console.log( "Server is running..." );
} );