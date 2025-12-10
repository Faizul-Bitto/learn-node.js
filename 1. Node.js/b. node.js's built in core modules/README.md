# Node.js Built-in Core Modules - Complete Guide

## 📚 Overview

This section explores Node.js built-in core modules - powerful tools that come pre-installed with Node.js. These modules provide essential functionality for file operations, path manipulation, system information, event handling, and HTTP server creation.

## 📁 Modules Covered

### i. Path Module
Utilities for working with file and directory paths in a cross-platform way.

**Key Methods:**
- `path.basename()` - Get filename from path
- `path.dirname()` - Get directory from path
- `path.extname()` - Get file extension
- `path.parse()` - Parse path into components
- `path.join()` - Join path segments

**Use Cases:**
- Building file paths
- Extracting file information
- Cross-platform path handling

### ii. OS Module
Access operating system information and system resources.

**Key Methods:**
- `os.platform()` - Get OS platform
- `os.arch()` - Get CPU architecture
- `os.homedir()` - Get home directory
- `os.freemem()` - Get free memory
- `os.totalmem()` - Get total memory
- `os.cpus()` - Get CPU information

**Use Cases:**
- System monitoring
- Cross-platform compatibility
- Performance tracking

### iii. FS Module
File system operations for reading, writing, and manipulating files.

**Key Methods:**
- `fs.readFile()` / `fs.readFileSync()` - Read files
- `fs.writeFile()` / `fs.writeFileSync()` - Write files
- `fs.appendFile()` / `fs.appendFileSync()` - Append to files
- `fs.unlink()` / `fs.unlinkSync()` - Delete files
- `fs.mkdir()` / `fs.mkdirSync()` - Create directories

**Key Concepts:**
- Synchronous vs Asynchronous operations
- Error-first callback pattern
- Buffer vs String handling

**Use Cases:**
- Configuration file management
- Logging
- Data persistence
- File uploads

### iv. Events Module
Event-driven programming with EventEmitter class.

**Key Concepts:**
- `EventEmitter` class
- `emit()` - Raise events
- `on()` - Listen to events
- Event parameters
- Event-driven architecture

**Use Cases:**
- Custom event handling
- Decoupling components
- Asynchronous workflows

### v. HTTP Module
Create HTTP servers and make HTTP requests.

**Key Concepts:**
- `http.createServer()` - Create HTTP server
- Request object (`req`)
- Response object (`res`)
- HTTP methods (GET, POST, etc.)
- Status codes
- Headers

**Use Cases:**
- Building web servers
- Creating REST APIs
- Handling HTTP requests

## 🎯 Learning Objectives

By completing this section, you will:

1. ✅ Understand how to use Node.js core modules
2. ✅ Know when to use synchronous vs asynchronous operations
3. ✅ Be able to work with files and directories
4. ✅ Understand event-driven programming
5. ✅ Create basic HTTP servers

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Basic JavaScript knowledge
- Understanding of callbacks and async operations

### Recommended Learning Order

1. **Path Module** - Start with path manipulation (simplest)
2. **OS Module** - Learn system information access
3. **FS Module** - Master file operations (most commonly used)
4. **Events Module** - Understand event-driven architecture
5. **HTTP Module** - Build web servers (most complex)

## 💡 Key Concepts

### Synchronous vs Asynchronous

**Synchronous (Blocking):**
```javascript
const data = fs.readFileSync('file.txt');
console.log(data); // Waits for file to be read
```

**Asynchronous (Non-blocking):**
```javascript
fs.readFile('file.txt', (err, data) => {
  console.log(data); // Executes after file is read
});
console.log('This runs first!'); // Executes immediately
```

### Error-First Callback Pattern

All async Node.js callbacks follow this pattern:
```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) {
    // Handle error
    return;
  }
  // Handle success
});
```

### Event-Driven Architecture

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Listen for event
emitter.on('event', (data) => {
  console.log('Event received:', data);
});

// Emit event
emitter.emit('event', 'Hello!');
```

## 📖 Best Practices

1. **Prefer Async Operations** - Use asynchronous methods in production
2. **Handle Errors** - Always check for errors in callbacks
3. **Use Path Module** - Don't manually construct paths
4. **Understand Events** - Events are fundamental to Node.js
5. **Read Documentation** - Each module has extensive documentation

## 🔍 Module Comparison

| Module | Purpose | Complexity | Common Use |
|--------|---------|------------|------------|
| `path` | Path manipulation | ⭐ Easy | File operations |
| `os` | System information | ⭐ Easy | System monitoring |
| `fs` | File operations | ⭐⭐ Medium | Data persistence |
| `events` | Event handling | ⭐⭐ Medium | Architecture |
| `http` | HTTP servers | ⭐⭐⭐ Advanced | Web development |

## 🎓 Practice Exercises

1. **Path Module:** Build a file organizer that sorts files by extension
2. **OS Module:** Create a system information dashboard
3. **FS Module:** Build a simple file logger
4. **Events Module:** Create a custom event system
5. **HTTP Module:** Build a basic REST API

## 📚 Additional Resources

- [Node.js Core Modules Documentation](https://nodejs.org/api/)
- [File System Best Practices](https://nodejs.org/api/fs.html)
- [HTTP Module Guide](https://nodejs.org/api/http.html)
- [Event Emitter Patterns](https://nodejs.org/api/events.html)

## 🔗 Next Steps

After mastering core modules:
- Learn Express.js for easier HTTP server creation
- Explore external npm packages
- Build full-stack applications
- Learn about databases and data persistence

---

**Start with the `i. path module` folder to begin your journey!**

