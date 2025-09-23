const EventEmitter = require( 'events' );

class RaiseEvent extends EventEmitter {
    startPeriod () {
        //! Print immediately
        console.log( 'Period started.' );

        //! raise an event after some time
        setTimeout( () => {
            this.emit( 'bellRing', {
                period: 'Period ended',
                time: '11:00 AM'
            } );
        }, 3000 );
    }
}

module.exports = RaiseEvent;