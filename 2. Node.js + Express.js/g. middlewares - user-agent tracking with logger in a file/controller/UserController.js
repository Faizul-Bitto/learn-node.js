const { userSchema } = require( '../model/schema/User' );
const users = require( '../users' );

// User class
class User {
    constructor( { id, name, email } ) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

// All logics
exports.getAllUsers = ( req, res ) => {
    res.status( 200 ).json( users );
};

exports.getUserById = ( req, res ) => {
    const userID = req.params.id;

    if ( !userID ) {
        return res.status( 404 ).json( { message: "User not found" } );
    }
    res.status( 200 ).json( users );
};

exports.createUser = ( req, res ) => {
    const { error } = userSchema.validate( req.body );

    if ( error ) {
        return res.status( 400 ).json( { message: error.details[ 0 ].message } );
    }

    const newUser = new User( req.body );

    res.status( 201 ).json( {
        message: "User created successfully",
        user: newUser,
    } );
};
