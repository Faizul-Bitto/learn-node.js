exports.checkUserAgent = ( req, res, next ) => {
    const userAgent = req.headers[ 'user-agent' ];

    console.log( `The agent is ${ userAgent }` );

    if ( !userAgent ) {
        return res.status( 400 ).json( {
            message: "Bad Request: Missing User-Agent header"
        } );
    };

    next();
}