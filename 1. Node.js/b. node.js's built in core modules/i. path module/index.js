const path = require( 'path' );

//! path.basename() 
const myPath = "F:/Node/learn-node.js/1. Node.js/b. node.js's built in core modules/i. path module/index.js";
const baseName = path.basename( myPath );
console.log( baseName, "\n" )

//! path.dirname()
const directoryName = path.dirname( myPath );
console.log( directoryName, "\n" );

//! path.extname()
const extName = path.extname( myPath );
console.log( extName, "\n" );

//! path.parse() -> will provide an object with all the properties
const parse = path.parse( myPath );
console.log( parse );