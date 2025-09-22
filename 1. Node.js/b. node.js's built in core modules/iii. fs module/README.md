# Node.js File System (fs) Module

This directory demonstrates the usage of Node.js built-in `fs` module, which provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.

## Overview

The `fs` module enables you to work with the file system on your computer. It allows you to:

- Create, read, update, and delete files
- Work with directories
- Handle file permissions
- Perform both synchronous and asynchronous operations

## Key Concepts: Synchronous vs Asynchronous

### Synchronous Operations (Blocking)

- Use methods with `Sync` suffix (e.g., `writeFileSync`, `readFileSync`)
- **Block the main thread** until the operation completes
- Simpler to write but can cause performance issues
- Good for simple scripts or initialization code

### Asynchronous Operations (Non-blocking)

- Use methods without `Sync` suffix (e.g., `writeFile`, `readFile`)
- **Don't block the main thread** - use callbacks or promises
- Better for performance in production applications
- Essential for web servers and real-time applications

## Code Examples

### 1. Writing Files

#### Synchronous Write

```javascript
const fs = require("fs");

// Create a new file with content
fs.writeFileSync("demo.txt", "Hello World!");
console.log("File Created");

// Overwrite the existing content
fs.writeFileSync("demo.txt", "Hello Programmers!");
console.log("File Updated");
```

**Important:** `writeFileSync()` completely **overwrites** the existing content.

#### Asynchronous Write

```javascript
fs.writeFile("demo.txt", "Hello World!", (err) => {
  if (err) {
    console.log("Error writing file:", err);
  } else {
    console.log("File written successfully");
  }
});
```

### 2. Appending to Files

#### Synchronous Append

```javascript
// Add content without overwriting existing text
fs.appendFileSync("demo.txt", " How are you?");
console.log("File Appended");
```

#### Asynchronous Append

```javascript
fs.appendFile("demo.txt", " How are you?", (err) => {
  if (err) {
    console.log("Error appending file:", err);
  } else {
    console.log("Content appended successfully");
  }
});
```

### 3. Reading Files

#### Synchronous Read

```javascript
const data = fs.readFileSync("demo.txt");
console.log(data); // Returns Buffer object (binary data)
console.log(data.toString()); // Convert to readable string
```

#### Asynchronous Read

```javascript
fs.readFile("demo.txt", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
  } else {
    console.log(data.toString()); // Convert Buffer to string
  }
});

console.log("This will print first!"); // Non-blocking behavior
```

## Understanding the Callback Pattern

Asynchronous file operations use the **error-first callback** pattern:

```javascript
fs.readFile("demo.txt", (err, data) => {
  // First parameter: error (null if no error)
  // Second parameter: data (null if error occurred)

  if (err) {
    // Handle error case
    console.log("Something went wrong:", err);
  } else {
    // Handle success case
    console.log("Data received:", data.toString());
  }
});
```

**Key Rules:**

- Exactly one of `err` or `data` will be `null`
- Never both `null` at the same time
- Always check for errors first

## Buffer vs String

When reading files, Node.js returns a **Buffer** object by default:

```javascript
const data = fs.readFileSync("demo.txt");
console.log(data); // <Buffer 48 65 6c 6c 6f 20 50 72 6f 67 72 61 6d 6d 65 72 73 21 20 48 6f 77 20 61 72 65 20 79 6f 75 3f>
console.log(data.toString()); // "Hello Programmers! How are you?"
```

**Why Buffer?**

- Handles binary data efficiently
- Works with any file type (text, images, videos)
- Use `.toString()` to convert to readable text for text files

## Execution Order Example

```javascript
console.log("1. Start");

fs.writeFileSync("demo.txt", "Sync operation");
console.log("2. Sync write completed");

fs.readFile("demo.txt", (err, data) => {
  console.log("4. Async read completed:", data.toString());
});

console.log("3. Async read initiated");

// Output:
// 1. Start
// 2. Sync write completed
// 3. Async read initiated
// 4. Async read completed: Sync operation
```

## Running the Example

To run the example code:

```bash
node index.js
```

This will create a `demo.txt` file in the same directory with the content from the operations.

## File Operations Summary

| Operation | Synchronous           | Asynchronous      | Description           |
| --------- | --------------------- | ----------------- | --------------------- |
| Write     | `fs.writeFileSync()`  | `fs.writeFile()`  | Create/overwrite file |
| Append    | `fs.appendFileSync()` | `fs.appendFile()` | Add content to file   |
| Read      | `fs.readFileSync()`   | `fs.readFile()`   | Read file contents    |

## Best Practices

1. **Use Async in Production**: Prefer asynchronous methods for better performance
2. **Handle Errors**: Always check for errors in callbacks
3. **Use Encoding**: Specify encoding for text files: `fs.readFile('file.txt', 'utf8', callback)`
4. **Path Handling**: Use `path` module for cross-platform file paths
5. **Stream for Large Files**: Use streams for large files to avoid memory issues

## Common Use Cases

- **Configuration files**: Reading app settings
- **Logging**: Writing application logs
- **Data persistence**: Saving user data
- **File uploads**: Handling uploaded files
- **Template processing**: Reading HTML templates
- **Cache management**: Storing temporary data

## Additional fs Methods

The `fs` module provides many more methods:

- `fs.existsSync()` / `fs.exists()` - Check if file exists
- `fs.unlinkSync()` / `fs.unlink()` - Delete files
- `fs.mkdirSync()` / `fs.mkdir()` - Create directories
- `fs.readdirSync()` / `fs.readdir()` - Read directory contents
- `fs.statSync()` / `fs.stat()` - Get file statistics

## Documentation

For complete documentation, visit: [Node.js File System Documentation](https://nodejs.org/api/fs.html)
