//! We want to grab this from index.js
const people = [ "Shakib", "Tamim", "Mashrafi" ];

const a = 10;

function testFunction () {
    console.log( "I am a function" );
}

//! Now, we need to export it. Without exporting it will not be available to other files. As we know, this is in a modular system. A file doesn't know another file by default.

//! To export any specific property, we will export like this :
module.exports = people;

//! To export multiple things, we will export like this :
module.exports = {
    people,
    a,
    testFunction
}

//! Here, 'exports' is a property of 'module' object. if we do -> console.log( module ), we will see all the associated properties of 'module' object. And, this 'exports' property holds a blank object by default ( exports : {} )
// console.log( module );