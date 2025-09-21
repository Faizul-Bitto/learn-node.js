//! We cannot use the 'window' object because in node.js there's no 'window' object. this 'window' object only works in browsers. If we do -> console.log( window ); in node.js it will throw an error but will show a lot of properties and methods in the console of that browser.
// console.log( window );

//! But, we got a similar object called 'global' in node.js. It is not holding that vast amount of properties and methods in this object, but, we got some properties and methods just lik 'window'.
console.log( global );

/*

    In response we will get this output and can see the properties and methods in the console of 'global' object :

        <ref *1> Object [global] {
        global: [Circular *1],
        clearImmediate: [Function: clearImmediate],
        setImmediate: [Function: setImmediate] {
            Symbol(nodejs.util.promisify.custom): [Getter]
        },
        clearInterval: [Function: clearInterval],
        clearTimeout: [Function: clearTimeout],
        setInterval: [Function: setInterval],
        setTimeout: [Function: setTimeout] {
            Symbol(nodejs.util.promisify.custom): [Getter]
        },
        queueMicrotask: [Function: queueMicrotask],
        structuredClone: [Function: structuredClone],
        atob: [Function: atob],
        btoa: [Function: btoa],
        performance: [Getter/Setter],
        fetch: [Function: fetch],
        crypto: [Getter],
        navigator: [Getter]
        }

*/

console.log( "---------------------------------------------------------------" );

//! So, we are able to access any properties and methods of 'global' object in node.js. for example : setTimeout() method
// setTimeout( () => {
//     console.log( "This is a setTimeout() method." );
// }, 1000 );

console.log( "---------------------------------------------------------------" );

//! Now, we know that, when we declare a variable in JavaScript, it by default attaches to the 'window' object. So, from browser's console, if we write 'console.log(window.a)' in the console, it will show us the value of 'a' variable. Even, if we write just console.log(a) -> It will also show us the value of 'a' variable. But, in node.js, we cannot do that. No variable will attach with the 'global' object.
const a = 10;
console.log( global.a ) //! It will show 'undefined'

console.log( "---------------------------------------------------------------" );

//! In JavaScript, we know that, a .js file's any properties can be accessed in another .js file. It breaks the modularity. It does not remain modular o r isolated. For example : a variable defined 'var a = 10' in a .js file can be accessed in another .js file. In that other .js file, we can access it, even change it.
//! But, in Node.js we got the solution for that. We got modularity between each file. So, what is modularity in Node.js? Every single files are separate modules. THat's modularity in Node.js.

//! So, in this directory, we have tow files, index.js and people.js. In people.js, there are some properties have been defined. We will grab them in this index.js file.

//! for import, we will use 'require()' method.
const people = require( "./people" );

console.log( people ) //! we will get the whole object in the console
console.log( "---------------------------------------------------------------" );
console.log( people.people ) //! we will get the 'people' array in the console
console.log( '\n' );
console.log( people.a )
console.log( '\n' );
people.testFunction();
console.log( "---------------------------------------------------------------" );

/*
    So, so far there are 3 types of modules :
        1. We can make our own modules
        2. By installing external packages with 'npm' or 'yarn'
        3. Built-in modules in Node.js itself
*/