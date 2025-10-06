const express = require( "express" );
const router = express.Router();

router.get( '/user/:id', ( req, res ) => {
    const userID = req.params.id;
    const filter = req.query.filter;

    res.status( 200 ).send( `User ID : ${ userID } and filter : ${ filter }` );
} );

router.post( '/users', ( req, res ) => {
    const { name, age } = req.body;

    if ( !name ) {
        res.status( 400 ).json( {
            message: "Name is required"
        } );
    }

    if ( !age ) {
        res.status( 400 ).json( {
            message: "Age is required"
        } );
    }

    res.status( 201 ).json( {
        message: "User created successfully",
        data: {
            name: name,
            age: age
        }
    } );
} );

module.exports = router;