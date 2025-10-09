const express = require( "express" );
const router = express.Router();

class User {
    constructor( { name, age, address } ) {
        this.name = name;
        this.age = age;
        this.address = address;
    };
};

router.get( '/user/:id', ( req, res ) => {
    const userID = req.params.id;
    const filter = req.query.filter;

    res.status( 200 ).send( `User ID : ${ userID } and filter : ${ filter }` );
} );

router.post( '/users', ( req, res ) => {
    const user = new User( req.body );

    res.status( 201 ).json( {
        message: "User created successfully",
        data: user
    } );
} );

module.exports = router;