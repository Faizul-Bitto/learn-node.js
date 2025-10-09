const express = require( "express" );
const router = express.Router();

router.get( '/user/:id/payment', ( req, res ) => {
    const userID = req.params.id;
    const filter = req.query.filter;

    res.status( 200 ).send( `User ID : ${ userID } is ${ filter } and confirmed the payment.` );
} );

module.exports = router;