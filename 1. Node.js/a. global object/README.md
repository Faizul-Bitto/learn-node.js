# Node.js Global Object and Module System - Complete Guide

## What You'll Learn

This guide explains the fundamental differences between browser JavaScript and Node.js, focusing on:

- Global objects (`window` vs `global`)
- Variable scoping differences
- Node.js module system
- How to import and export between files

---

## 1. Browser vs Node.js: The Global Object Difference

### In the Browser

When you write JavaScript for web browsers, you have access to the `window` object:

```javascript
// ✅ This works in browsers
console.log(window); // Shows tons of properties and methods
```

The `window` object contains everything related to the browser:

- DOM manipulation methods
- Browser APIs
- Global variables automatically attach to it

### In Node.js

Node.js doesn't have a `window` object because it's not running in a browser. Instead, it has the `global` object:

```javascript
// ❌ This will throw an error in Node.js
console.log(window); // ReferenceError: window is not defined

// ✅ This works in Node.js
console.log(global); // Shows Node.js specific properties
```

**What's inside the `global` object?**

```javascript
// When you run console.log(global), you'll see:
{
  global: [Circular *1],              // Reference to itself
  clearImmediate: [Function],         // Clear immediate execution
  setImmediate: [Function],           // Schedule immediate execution
  clearInterval: [Function],          // Clear interval timers
  clearTimeout: [Function],           // Clear timeout timers
  setInterval: [Function],            // Set repeating timers
  setTimeout: [Function],             // Set one-time timers
  queueMicrotask: [Function],         // Queue microtasks
  structuredClone: [Function],        // Deep clone objects
  atob: [Function],                   // Base64 decoding
  btoa: [Function],                   // Base64 encoding
  performance: [Getter/Setter],       // Performance measurement
  fetch: [Function],                  // HTTP requests
  crypto: [Getter],                   // Cryptographic functions
  navigator: [Getter]                 // Navigator information
}
```

---

## 2. Using Global Methods

Since these methods are part of the `global` object, you can use them directly:

```javascript
// You can use setTimeout directly (it's part of global)
setTimeout(() => {
  console.log("This runs after 1 second");
}, 1000);

// This is equivalent to:
global.setTimeout(() => {
  console.log("This also runs after 1 second");
}, 1000);
```

---

## 3. Variable Scoping: A Major Difference

### In the Browser

Variables automatically attach to the `window` object:

```javascript
// In browser JavaScript:
var myVariable = 10;
console.log(window.myVariable); // 10
console.log(myVariable); // 10 (same thing)
```

### In Node.js

Variables do NOT attach to the `global` object:

```javascript
// In Node.js:
const a = 10;
console.log(global.a); // undefined (not attached!)
console.log(a); // 10 (still works)
```

**Why is this important?**

- Prevents accidental global pollution
- Makes your code more predictable
- Each file is isolated (modular)

---

## 4. Node.js Module System: File Isolation

### The Problem in Browser JavaScript

In traditional browser JavaScript, variables from one file can interfere with another:

```javascript
// file1.js
var username = "John";

// file2.js
var username = "Jane"; // Oops! This overwrites the first one
```

### The Solution in Node.js

Every file in Node.js is a separate **module**. Files are isolated by default:

```javascript
// people.js
const people = ["Shakib", "Tamim", "Mashrafi"];
// This variable is private to this file

// index.js
console.log(people); // ❌ Error! people is not defined
```

---

## 5. Sharing Data Between Files: Export and Import

### Step 1: Exporting from a File (people.js)

```javascript
// people.js
const people = ["Shakib", "Tamim", "Mashrafi"];
const a = 10;

function testFunction() {
  console.log("I am a function");
}

// Method 1: Export a single thing
module.exports = people;

// Method 2: Export multiple things (this overwrites method 1)
module.exports = {
  people, // same as people: people
  a, // same as a: a
  testFunction, // same as testFunction: testFunction
};
```

**What is `module.exports`?**

- `module` is a special object that Node.js provides to every file
- `exports` is a property that starts as an empty object `{}`
- You assign what you want to share to `module.exports`

### Step 2: Importing into Another File (index.js)

```javascript
// index.js
const people = require("./people");

console.log(people);
// Output: { people: ["Shakib", "Tamim", "Mashrafi"], a: 10, testFunction: [Function] }

// Accessing individual properties:
console.log(people.people); // ["Shakib", "Tamim", "Mashrafi"]
console.log(people.a); // 10
people.testFunction(); // "I am a function"
```

**Understanding `require()`:**

- `require()` is a Node.js function to import modules
- `"./people"` means look for `people.js` in the same directory
- Returns whatever was assigned to `module.exports`

---

## 6. Complete Working Example

### File Structure

```
project/
├── index.js
└── people.js
```

### people.js

```javascript
// Data we want to share
const people = ["Shakib", "Tamim", "Mashrafi"];
const a = 10;

function testFunction() {
  console.log("I am a function from people.js");
}

// Export everything as an object
module.exports = {
  people,
  a,
  testFunction,
};
```

### index.js

```javascript
// Import the exported object
const people = require("./people");

// Use the imported data
console.log("Imported object:", people);
console.log("People array:", people.people);
console.log("Variable a:", people.a);
people.testFunction();

// Demonstrate global object
console.log("Node.js global object:");
console.log(global);

// Show that variables don't attach to global
const myVar = 100;
console.log("myVar exists:", myVar); // 100
console.log("global.myVar:", global.myVar); // undefined
```

### Running the Code

```bash
node index.js
```

### Expected Output

```
Imported object: { people: ["Shakib", "Tamim", "Mashrafi"], a: 10, testFunction: [Function] }
People array: ["Shakib", "Tamim", "Mashrafi"]
Variable a: 10
I am a function from people.js
Node.js global object:
{ global: [Circular], setTimeout: [Function], ... }
myVar exists: 100
global.myVar: undefined
```

---

## 7. Key Differences Summary

| Aspect              | Browser JavaScript           | Node.js                                  |
| ------------------- | ---------------------------- | ---------------------------------------- |
| Global Object       | `window`                     | `global`                                 |
| Variable Attachment | Variables attach to `window` | Variables don't attach to `global`       |
| File Interaction    | Files share global scope     | Files are isolated modules               |
| Sharing Data        | Through global variables     | Through `module.exports` and `require()` |

---

## 8. Important Concepts to Remember

### Modularity

- Each `.js` file is a separate module
- Variables and functions are private by default
- Use `module.exports` to make things available to other files

### Global Object

- `global` object exists but has fewer properties than browser's `window`
- Contains Node.js-specific utilities (timers, crypto, etc.)
- Variables don't automatically attach to it

### File Isolation

- Prevents naming conflicts between files
- Makes code more maintainable and predictable
- Encourages explicit imports/exports

---

## 9. Common Patterns

### Exporting a Single Function

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = add;

// main.js
const add = require("./math");
console.log(add(2, 3)); // 5
```

### Exporting Multiple Items

```javascript
// utils.js
const formatName = (name) => name.toUpperCase();
const calculateAge = (birthYear) => 2024 - birthYear;

module.exports = {
  formatName,
  calculateAge,
};

// main.js
const { formatName, calculateAge } = require("./utils");
// or
const utils = require("./utils");
```

This modular system is what makes Node.js applications scalable and maintainable!

---

## 10. The Three Types of Modules in Node.js

Now that you understand how modules work, it's important to know that there are **3 types of modules** you can use in Node.js:

### 1. Custom Modules (Your Own)

These are modules you create yourself, like the `people.js` example we've been using:

```javascript
// math.js (your custom module)
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// main.js (using your custom module)
const math = require("./math");
console.log(math.add(5, 3)); // 8
```

### 2. External Packages (NPM/Yarn)

These are modules created by other developers that you install using package managers:

```bash
# Install an external package
npm install lodash
# or
yarn add lodash
```

```javascript
// Using an external package
const _ = require("lodash");

const numbers = [1, 2, 3, 4, 5];
const sum = _.sum(numbers);
console.log(sum); // 15
```

**Popular external packages:**

- `express` - Web framework
- `lodash` - Utility functions
- `axios` - HTTP requests
- `moment` - Date manipulation

### 3. Built-in Modules (Node.js Core)

These are modules that come pre-installed with Node.js:

```javascript
// File system operations
const fs = require("fs");

// Path operations
const path = require("path");

// HTTP server
const http = require("http");

// Operating system utilities
const os = require("os");

// Example: Reading a file
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

**Common built-in modules:**

- `fs` - File system operations
- `path` - File path utilities
- `http` - HTTP server/client
- `url` - URL parsing
- `crypto` - Cryptographic functionality
- `os` - Operating system utilities

### Module Types Summary

| Type         | How to Use                | Example               |
| ------------ | ------------------------- | --------------------- |
| **Custom**   | `require('./filename')`   | `require('./people')` |
| **External** | `require('package-name')` | `require('lodash')`   |
| **Built-in** | `require('module-name')`  | `require('fs')`       |

### Why This Matters

- **Custom modules** keep your code organized
- **External packages** save development time
- **Built-in modules** provide core Node.js functionality

This three-module system makes Node.js incredibly powerful and flexible for building applications!
