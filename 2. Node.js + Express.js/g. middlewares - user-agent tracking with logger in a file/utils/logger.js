const fs = require( 'fs' );
const path = require( 'path' );

const userAgentFile = path.join( __dirname, '../userAgent.json' );

exports.saveUserAgent = ( agentString ) => {
    let data = [];

    if ( fs.existsSync( userAgentFile ) ) {
        const raw = fs.readFileSync( userAgentFile );
        data = JSON.parse( raw );
    }

    data.push( agentString );

    fs.writeFileSync( userAgentFile, JSON.stringify( data, null, 2 ) );
}