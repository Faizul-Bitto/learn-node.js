# Node.js Path Module Documentation

## Overview

The `path` module is a built-in Node.js core module that provides utilities for working with file and directory paths. It's essential for handling file system operations in a cross-platform way, automatically handling differences between Windows and Unix-like systems.

## Getting Started

To use the path module, simply require it in your Node.js application:

```javascript
const path = require("path");
```

## Most Commonly Used Methods

### 1. `path.basename(path[, ext])`

Returns the last portion of a path, typically the filename.

**Syntax:**

```javascript
path.basename(path[, ext])
```

**Parameters:**

- `path` (string): The file path
- `ext` (string, optional): An optional file extension to remove

**Example:**

```javascript
const myPath =
  "F:/Node/learn-node.js/1. Node.js/b. node.js's built in core modules/i. path module/index.js";
const baseName = path.basename(myPath);
console.log(baseName); // Output: "index.js"

// With extension removal
const nameWithoutExt = path.basename(myPath, ".js");
console.log(nameWithoutExt); // Output: "index"
```

### 2. `path.dirname(path)`

Returns the directory name of a path, essentially the path without the filename.

**Syntax:**

```javascript
path.dirname(path);
```

**Parameters:**

- `path` (string): The file path

**Example:**

```javascript
const myPath =
  "F:/Node/learn-node.js/1. Node.js/b. node.js's built in core modules/i. path module/index.js";
const directoryName = path.dirname(myPath);
console.log(directoryName);
// Output: "F:/Node/learn-node.js/1. Node.js/b. node.js's built in core modules/i. path module"
```

### 3. `path.extname(path)`

Returns the extension of the path, from the last occurrence of the `.` character to the end of the string.

**Syntax:**

```javascript
path.extname(path);
```

**Parameters:**

- `path` (string): The file path

**Example:**

```javascript
const myPath =
  "F:/Node/learn-node.js/1. Node.js/b. node.js's built in core modules/i. path module/index.js";
const extName = path.extname(myPath);
console.log(extName); // Output: ".js"
```

### 4. `path.parse(path)`

Returns an object with all the significant elements of a path parsed into separate properties.

**Syntax:**

```javascript
path.parse(path);
```

**Parameters:**

- `path` (string): The file path

**Returns an object with the following properties:**

- `root`: The root of the path
- `dir`: The directory path
- `base`: The filename including extension
- `ext`: The file extension
- `name`: The filename without extension

**Example:**

```javascript
const myPath =
  "F:/Node/learn-node.js/1. Node.js/b. node.js's built in core modules/i. path module/index.js";
const parse = path.parse(myPath);
console.log(parse);
/* Output:
{
  root: 'F:/',
  dir: "F:/Node/learn-node.js/1. Node.js/b. node.js's built in core modules/i. path module",
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
*/
```

## Additional Useful Methods

### `path.join([...paths])`

Joins all given path segments together using the platform-specific separator.

```javascript
const fullPath = path.join("/users", "john", "documents", "file.txt");
console.log(fullPath); // Output: "/users/john/documents/file.txt" (Unix) or "\users\john\documents\file.txt" (Windows)
```

### `path.resolve([...paths])`

Resolves a sequence of paths into an absolute path.

```javascript
const absolutePath = path.resolve("documents", "file.txt");
console.log(absolutePath); // Output: Absolute path from current directory
```

### `path.isAbsolute(path)`

Determines if a path is an absolute path.

```javascript
console.log(path.isAbsolute("/users/john")); // true (Unix)
console.log(path.isAbsolute("C:\\Users\\John")); // true (Windows)
console.log(path.isAbsolute("documents/file.txt")); // false
```

## Cross-Platform Considerations

The path module automatically handles platform differences:

- **Windows**: Uses backslashes (`\`) as path separators
- **Unix/Linux/macOS**: Uses forward slashes (`/`) as path separators

The path module methods work consistently across all platforms, making your code portable.

## Best Practices

1. **Always use path methods** instead of string manipulation for file paths
2. **Use `path.join()`** to construct paths instead of concatenating strings
3. **Use `path.resolve()`** when you need absolute paths
4. **Avoid hardcoding path separators** in your code

## Common Use Cases

- **File operations**: Getting filenames, extensions, or directories
- **Building file paths**: Constructing paths in a cross-platform way
- **File validation**: Checking file extensions or path formats
- **Directory navigation**: Moving between directories programmatically

## Running the Example

To see these methods in action, run the provided `index.js` file:

```bash
node index.js
```

This will demonstrate all the methods discussed above with real output.
