const Joi = require( 'joi' );

exports.userSchema = Joi.object( {
    id: Joi.number().positive().required(),
    name: Joi.string().min( 3 ).max( 100 ).required(),
    email: Joi.string().email().required(),
} );
