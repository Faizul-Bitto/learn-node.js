exports.isValid = ( req, res, next ) => {
    console.log( req.query.token ); // we can grab query param from 'req' parameter

    if ( req.query.token === "123" ) {
        next();
    } else {
        res.status( 401 ).json( {
            message: 'Unauthorized: Invalid Token'
        } );
    };
};