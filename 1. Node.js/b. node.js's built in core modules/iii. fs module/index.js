const fs = require( 'fs' );

//! fs.writeFileSync() -> to make a file with text
fs.writeFileSync( 'demo.txt', 'Hello World!' ); //! fs.writeFileSync( fileName, textWeWantToWrite )
console.log( 'File Created' );
//! if we again write in the same file, it will override the previous text. It won't create a new line on that file.
fs.writeFileSync( 'demo.txt', 'Hello Programmers!' );
console.log( 'File Updated' );

//! fs.appendFileSync() -> to append text in a file -> to add the text without overriding the previous text
fs.appendFileSync( 'demo.txt', ' How are you?' ); //! fs.appendFileSync( fileName, textWeWantToAppend )
console.log( 'File Appended', "\n" );

//! fs.readFileSync() -> to read a file
const data = fs.readFileSync( 'demo.txt' ); //! fs.readFileSync( fileNameToGetTheTexts )
console.log( data ); //! It will give us the buffer data of the file or binary set of data, not as string or text
console.log( data.toString() ); //! It will give us the text data of the file
console.log( 'File Read Done', "\n" );

/*
    Now, here we used 'Sync' with every method -> writeFileSync, appendFileSync, readFileSync
    But, there's also Async methods -> writeFile, appendFile, readFile

    Only writeFile, AppendFile, readFile; without 'Sync' keyword are Async methods
    They will work asynchronously

    Now, file reading and writing or file system is i/o operation. It will not be done by the main thread. It will be given to the helper threads.

    So, when we use 'Sync' keyword, it becomes synchronous. Now, it will block the main thread. That means, it will not use the async feature.

    And when we use Async methods, it will not block the main thread. It will use the async feature. And for Async methods, we need to use callback functions. Which means, when the helper thread will done the task, it will call the callback function.
*/

//! A common convention is to pass two arguments to the callback function. The first argument is error and the second argument is data. One of these parameters will be 'null' always. Two cannot be 'null' at the same time. If, error happens then we will get 'err', if we get the data successfully, then we will get 'data'. 
fs.readFile( 'demo.txt', ( err, data ) => {
    if ( err ) {
        console.log( err );
    } else {
        console.log( data.toString() );
    }
}, )

console.log( 'File Read Done' ); //! This will be printed first