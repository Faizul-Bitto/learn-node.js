# Node.js OS Module

This directory demonstrates the usage of Node.js built-in `os` module, which provides operating system-related utility methods and properties.

## Overview

The `os` module provides a way to interact with the operating system and retrieve information about the system where the Node.js application is running.

## Code Examples

### Getting Platform Information

```javascript
const os = require("os");

// Get the operating system platform
const platform = os.platform();
console.log(platform); // 'win32', 'linux', 'darwin', etc.
```

**Possible return values:**

- `'win32'` - Windows
- `'linux'` - Linux
- `'darwin'` - macOS
- `'freebsd'` - FreeBSD
- `'openbsd'` - OpenBSD
- `'sunos'` - SunOS

### Getting Architecture Information

```javascript
// Get the CPU architecture
const arch = os.arch();
console.log(arch); // 'x64', 'x32', 'arm', 'arm64', etc.
```

**Possible return values:**

- `'x64'` - 64-bit
- `'x32'` - 32-bit
- `'arm'` - ARM 32-bit
- `'arm64'` - ARM 64-bit

### Getting Home Directory

```javascript
// Get the home directory path
const homeDir = os.homedir();
console.log(homeDir); // 'C:\Users\Admin' on Windows, '/home/admin' on Linux
```

### Memory Information

```javascript
// Get free memory in bytes
const freeMemory = os.freemem();
console.log(freeMemory); // Number in bytes

// Get total memory in bytes
const totalMemory = os.totalmem();
console.log(totalMemory); // Number in bytes
```

### CPU Information

```javascript
// Get detailed CPU information
const cpus = os.cpus();
console.log(cpus);
```

The `os.cpus()` method returns an array of objects containing information about each logical CPU core:

```javascript
[
  {
    model: "Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz",
    speed: 1596, // MHz
    times: {
      user: 123456, // Time spent in user mode
      nice: 123456, // Time spent with nice priority
      sys: 123456, // Time spent in system mode
      idle: 123456, // Time spent idle
      irq: 123456, // Time spent servicing interrupts
    },
  },
  // ... more CPU cores
];
```

## Running the Example

To run the example code:

```bash
node index.js
```

## Use Cases

The `os` module is useful for:

1. **Cross-platform compatibility** - Detecting the operating system to run platform-specific code
2. **System monitoring** - Getting memory usage and CPU information
3. **File path operations** - Getting the home directory for user-specific file operations
4. **Performance monitoring** - Tracking system resources
5. **Environment detection** - Adapting application behavior based on the system environment

## Additional OS Module Methods

While not demonstrated in this example, the `os` module also provides:

- `os.hostname()` - Get the hostname
- `os.uptime()` - Get system uptime in seconds
- `os.loadavg()` - Get load average (Unix-only)
- `os.networkInterfaces()` - Get network interface information
- `os.userInfo()` - Get current user information
- `os.tmpdir()` - Get temporary directory path
- `os.endianness()` - Get CPU endianness

## Documentation

For complete documentation, visit: [Node.js OS Module Documentation](https://nodejs.org/api/os.html)
