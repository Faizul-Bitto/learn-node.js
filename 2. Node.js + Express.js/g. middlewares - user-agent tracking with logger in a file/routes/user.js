const express = require( 'express' );
const router = express.Router();
const userController = require( '../controller/UserController' );

router.get( '/users', userController.getAllUsers );
router.get( '/users/:id', userController.getUserById );
router.post( '/users', userController.createUser );

module.exports = router;
