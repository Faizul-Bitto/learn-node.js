const express = require( "express" );
const Joi = require( "joi" );
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

    const { name, age, address } = req.body;

    if ( !name || !age || !address ) {
        return res.status( 400 ).json( { error: "All fields (name, age, address, location) are required." } );
    }

    if ( typeof name !== 'string' || name.length < 3 || name.length > 100 ) {
        return res.status( 400 ).json( { error: "Name must be string and length should be between 3 to 100. " } );
    }

    if ( typeof age !== 'number' || age <= 0 ) {
        return res.status( 400 ).json( { error: "Age must be a non-zero positive number. " } );
    }

    if ( typeof address !== 'string' || address.length < 5 ) {
        return res.status( 400 ).json( { error: "Address must be string and length should be between more then 3. " } );
    }

    res.status( 201 ).json( {
        message: "User created successfully",
        data: user
    } );
} );


//! schema validator 

const userSchema = Joi.object( {
    name: Joi.string().min( 3 ).max( 100 ).required(),
    age: Joi.number().positive().required(),
    address: Joi.string().min( 5 ).required(),
} );

router.post( '/users/v2', ( req, res ) => {

    //! validate :
    const { error } = userSchema.validate( req.body );

    //! if validation fails :
    if ( error )
        return res.status( 400 ).json( { error: error.details } );

    //! pass the data to User class data model
    const user = new User( req.body );

    //! just one more step to write : write a method to save the data to database

    //! send the response
    res.status( 201 ).json( {
        message: "User created successfully",
        data: user
    } );
} );

module.exports = router;