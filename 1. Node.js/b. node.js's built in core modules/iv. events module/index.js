//! one of the built in core modules is 'events' module.
//! we all know node.js is a non-blocking event driven run time environment.

//! something has happened / occured -> event raised -> we will listen to that event -> we will do something -> event handled
const EventEmitter = require( 'events' ); //! convention is to write a class with a capital letter.

//! EventEmitter is a class. Emit means to raise an event.
//! so, as EventEmitter is a class, we will create an object of it.
const eventEmitter = new EventEmitter();

//! we always have to listen to an event. So, always need to define a listener before raising an event. Because, without knowing what to do after raising an event, we cannot do anything. Without it, we will not get any output.
/*
eventEmitter.on( 'provideEventName', () => {
    console.log( 'Bell is ringing' );
} );
 */
eventEmitter.on( 'bellRing', () => {
    console.log( 'Bell is ringing!' );
} );

//! raise an event -> eventEmitter.emit( 'provideEventName' );
setTimeout( () => {
    eventEmitter.emit( 'bellRing' );
}, 2000 );

//! ---event emitter with parameters---
eventEmitter.on( 'bellRingAgain', ( period ) => {
    console.log( `Let's go. ${ period }` );
} );

setTimeout( () => {
    eventEmitter.emit( 'bellRingAgain', 'Second period ended.' );
}, 3000 );