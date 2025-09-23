const RaiseEvent = require( './raiseEvent' );

const raiseEvent = new RaiseEvent();

raiseEvent.on( 'bellRing', ( { period, time } ) => {
    console.log( `Let's go. ${ period } as it is ${ time }.` );
} );

raiseEvent.startPeriod();