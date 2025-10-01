const express = require( "express" );
const router = express.Router();

router.get( '/user/:id', ( req, res ) => {
    const userID = req.params.id;
    const filter = req.query.filter;

    res.status( 200 ).send( `User ID : ${ userID } and filter : ${ filter }` );
} );

module.exports = router;