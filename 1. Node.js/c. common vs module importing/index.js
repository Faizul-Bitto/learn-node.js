// const { calculateCelsiusToFahrenheit, calculateFahrenheitToCelsius } = require( "./common-vs-module/calculate-temp" );

// console.log( `Calculated temperature in Fahrenheit : ${ calculateCelsiusToFahrenheit( 0 ) } degree` );
// console.log( `Calculated temperature in Celsius : ${ calculateFahrenheitToCelsius( 32 ) } degree` );

// import getPosts, { getPostsLength } from "./get-posts.js";
import { getPosts, getPostsLength } from './common-vs-module/get-posts.js';


console.log( "Posts are : ", getPosts() );
console.log( `Posts length is : ${ getPostsLength() }` );