# HTTP Server - Connection Event Listener Example

This directory demonstrates creating an HTTP server with event listeners, specifically showing how to listen for connection events using the EventEmitter pattern.

## 📁 File Structure

```
server creating and use 'on' event listen property/
├── create a server - use 'on' event listener property.js    # Server with connection event listener
└── README.md                                               # This documentation
```

## 🎯 What You'll Learn

- **Event-driven server architecture** using EventEmitter
- **Connection event handling** in HTTP servers
- **Event loop concepts** and server lifecycle
- **How to listen for server events** using `.on()` method
- **Difference between connection and request events**

---

## 1. Understanding the Example

### The Code

```javascript
//! As server is also an event emitter. that means, it also has 'on' method.
const http = require('http');

//! create server
const server = http.createServer();

//! 'on' method is used to listen to the server.
server.on('connection', () => {
    console.log('New connection');
}); //! whenever someone hits this server, this event will keep on raising. and on console we will see 'New connection' again and again. Though in real world, we will not event listen for connection event.

server.listen(3000); //! when we listen to the server, basically event loop gets started. we can think event loop as a while loop that keeps on running.

console.log('Server is running on port 3000');
```

### What This Code Does

1. **Imports the HTTP module** - `require('http')`
2. **Creates a server instance** - `http.createServer()`
3. **Sets up event listener** - `server.on('connection', ...)`
4. **Starts the server** - `server.listen(3000)`
5. **Logs server status** - Server running message

### Key Difference from Previous Example

**Previous example (no response):**
- ❌ No event listeners
- ❌ No response to requests
- ❌ Browser shows loading

**This example (connection events):**
- ✅ Has event listeners
- ❌ Still no response to requests
- ✅ Logs connection events
- ❌ Browser still shows loading

---

## 2. Event-Driven Architecture Deep Dive

### Server as EventEmitter

```javascript
const server = http.createServer();
// server inherits from EventEmitter class
```

**Inherited Methods:**
- `.on(event, listener)` - Listen for events
- `.emit(event, ...args)` - Emit events
- `.once(event, listener)` - Listen once
- `.removeListener(event, listener)` - Remove listener

### Available Server Events

| Event | When it Fires | What it Provides |
|-------|---------------|------------------|
| `request` | HTTP request received | `req`, `res` objects |
| `connection` | New TCP connection | `socket` object |
| `close` | Server closes | - |
| `error` | Server error occurs | `error` object |
| `listening` | Server starts listening | - |

### Connection Event Explained

```javascript
server.on('connection', (socket) => {
    console.log('New connection');
    console.log('Socket details:', socket.remoteAddress);
});
```

**What happens:**
1. **Client connects** to server (TCP connection)
2. **Connection event fires** immediately
3. **Socket object** contains connection details
4. **Event listener executes** (logs "New connection")

**Important Note:** This fires for **every connection**, not just HTTP requests!

---

## 3. Understanding the Event Loop

### Event Loop Concept

```javascript
server.listen(3000); // Starts the event loop
```

**Visual Representation:**
```
Start Server
    ↓
Enter Event Loop (while loop)
    ↓
Wait for Events (connections, requests, errors)
    ↓
Process Event (execute listeners)
    ↓
Wait for Next Event
    ↓
(Continues indefinitely...)
```

### Event Loop in Action

```javascript
// Event loop keeps running
server.listen(3000, () => {
    console.log('Event loop started - server is listening');
});

// These events can fire at any time:
server.on('connection', () => console.log('Connection event'));
server.on('request', () => console.log('Request event'));
server.on('error', () => console.log('Error event'));
```

**Think of it as:**
```javascript
// Conceptual event loop (simplified)
while (server.isRunning) {
    const event = waitForNextEvent();
    processEvent(event);
}
```

---

## 4. Connection vs Request Events

### Connection Event (What We're Using)

```javascript
server.on('connection', (socket) => {
    console.log('New connection established');
    // Fires when TCP connection is made
    // Happens BEFORE any HTTP request
});
```

**Characteristics:**
- **Lower level** - TCP connection level
- **Fires first** - before HTTP request
- **Socket object** - contains connection details
- **One per connection** - not per request

### Request Event (What We're Missing)

```javascript
server.on('request', (req, res) => {
    console.log('HTTP request received');
    res.end('Hello World!');
    // Fires when HTTP request is made
    // This is what we need for responses!
});
```

**Characteristics:**
- **Higher level** - HTTP request level
- **Fires after** - connection is established
- **Request/Response objects** - for handling HTTP
- **One per request** - multiple per connection

### Visual Timeline

```
Client Connects → Connection Event → HTTP Request → Request Event → Response
      ↓                ↓                 ↓              ↓           ↓
   TCP Socket    "New connection"   GET / HTTP/1.1  "Request received"  Hello World!
```

---

## 5. Running the Example

### Starting the Server

```bash
cd "server creating and use 'on' event listen property"
node "create a server - use 'on' event listener property.js"
```

### Expected Output

```
Server is running on port 3000
```

### Testing the Server

1. **Open browser** and navigate to `http://localhost:3000`
2. **Check console** - You should see: `New connection`
3. **Refresh page** - You'll see another: `New connection`
4. **Browser still shows loading** - No HTTP response sent

### Multiple Connections Test

```bash
# Open multiple browser tabs to http://localhost:3000
# Each tab will show "New connection" in console
```

**Expected Console Output:**
```
Server is running on port 3000
New connection
New connection
New connection
```

---

## 6. Why Connection Events Are Important

### Connection Monitoring

```javascript
server.on('connection', (socket) => {
    console.log(`New connection from: ${socket.remoteAddress}`);
    console.log(`Connection time: ${new Date().toISOString()}`);
    
    // Track active connections
    console.log(`Active connections: ${server.connections}`);
});
```

### Connection Management

```javascript
let connectionCount = 0;

server.on('connection', (socket) => {
    connectionCount++;
    console.log(`Total connections: ${connectionCount}`);
    
    // Set connection timeout
    socket.setTimeout(30000); // 30 seconds
    
    socket.on('timeout', () => {
        console.log('Connection timed out');
        socket.destroy();
    });
    
    socket.on('close', () => {
        connectionCount--;
        console.log(`Connection closed. Active: ${connectionCount}`);
    });
});
```

### Rate Limiting

```javascript
const connections = new Map();

server.on('connection', (socket) => {
    const clientIP = socket.remoteAddress;
    const now = Date.now();
    
    if (connections.has(clientIP)) {
        const lastConnection = connections.get(clientIP);
        if (now - lastConnection < 1000) { // 1 second limit
            console.log(`Rate limiting ${clientIP}`);
            socket.destroy();
            return;
        }
    }
    
    connections.set(clientIP, now);
    console.log(`Connection allowed from ${clientIP}`);
});
```

---

## 7. Real-World Usage of Connection Events

### Logging and Analytics

```javascript
server.on('connection', (socket) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        clientIP: socket.remoteAddress,
        userAgent: socket.remoteFamily,
        connectionId: Math.random().toString(36).substr(2, 9)
    };
    
    console.log('Connection Log:', JSON.stringify(logEntry, null, 2));
});
```

### Security Monitoring

```javascript
server.on('connection', (socket) => {
    const clientIP = socket.remoteAddress;
    
    // Check against blacklist
    if (isBlacklisted(clientIP)) {
        console.log(`Blocked connection from blacklisted IP: ${clientIP}`);
        socket.destroy();
        return;
    }
    
    // Monitor suspicious activity
    monitorConnection(clientIP, socket);
});
```

### Load Balancing Preparation

```javascript
server.on('connection', (socket) => {
    const connectionWeight = calculateConnectionWeight(socket);
    
    if (server.connections > MAX_CONNECTIONS) {
        console.log('Server at capacity, redirecting connection');
        redirectConnection(socket);
    }
});
```

---

## 8. Common Mistakes and Misunderstandings

### Mistake 1: Thinking Connection Event Handles HTTP Requests

```javascript
// ❌ Wrong understanding
server.on('connection', (socket) => {
    // "This should handle HTTP requests, right?"
    socket.write('HTTP/1.1 200 OK\r\n\r\nHello World!');
});
```

**Reality:** Connection events are for TCP-level monitoring, not HTTP request handling.

### Mistake 2: Confusing Connection with Request Events

```javascript
// ❌ Wrong: Using connection for HTTP responses
server.on('connection', (socket) => {
    socket.write('Hello World!'); // Raw socket writing
});

// ✅ Correct: Using request for HTTP responses
server.on('request', (req, res) => {
    res.end('Hello World!'); // Proper HTTP response
});
```

### Mistake 3: Not Understanding Event Timing

```javascript
// ❌ Wrong: Expecting immediate HTTP response from connection
server.on('connection', () => {
    console.log('Connection made - where is the HTTP request?');
    // HTTP request hasn't happened yet!
});

server.on('request', () => {
    console.log('HTTP request received - now we can respond');
});
```

---

## 9. Adding Request Handling to This Example

### Current Code (Connection Only)

```javascript
const server = http.createServer();

server.on('connection', () => {
    console.log('New connection');
});

server.listen(3000);
```

### Enhanced Code (Connection + Request)

```javascript
const server = http.createServer();

// Monitor connections
server.on('connection', (socket) => {
    console.log(`New connection from: ${socket.remoteAddress}`);
});

// Handle HTTP requests
server.on('request', (req, res) => {
    console.log(`HTTP request: ${req.method} ${req.url}`);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

server.listen(3000);
```

### Complete Server with All Events

```javascript
const server = http.createServer();

// Connection monitoring
server.on('connection', (socket) => {
    console.log(`Connection established: ${socket.remoteAddress}`);
});

// Request handling
server.on('request', (req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello World!</h1>');
});

// Error handling
server.on('error', (error) => {
    console.error('Server error:', error);
});

// Server start confirmation
server.on('listening', () => {
    console.log('Server is now listening for events');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

---

## 10. Debugging and Monitoring

### Connection Debugging

```javascript
server.on('connection', (socket) => {
    console.log('=== CONNECTION DEBUG ===');
    console.log('Remote Address:', socket.remoteAddress);
    console.log('Remote Port:', socket.remotePort);
    console.log('Local Address:', socket.localAddress);
    console.log('Local Port:', socket.localPort);
    console.log('Connection ID:', socket.remoteAddress + ':' + socket.remotePort);
    console.log('========================');
});
```

### Request Debugging

```javascript
server.on('request', (req, res) => {
    console.log('=== REQUEST DEBUG ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    console.log('Connection from:', req.connection.remoteAddress);
    console.log('====================');
    
    res.end('Request logged');
});
```

### Performance Monitoring

```javascript
let requestCount = 0;
let connectionCount = 0;

server.on('connection', () => {
    connectionCount++;
    console.log(`Active connections: ${connectionCount}`);
});

server.on('request', () => {
    requestCount++;
    console.log(`Total requests: ${requestCount}`);
});

// Periodic stats
setInterval(() => {
    console.log(`Stats - Connections: ${connectionCount}, Requests: ${requestCount}`);
}, 30000); // Every 30 seconds
```

---

## 11. Key Takeaways

### What You've Learned

1. **Event-Driven Architecture**: Servers inherit from EventEmitter
2. **Connection Events**: Monitor TCP-level connections
3. **Event Loop**: Continuous loop waiting for events
4. **Event Timing**: Connection events fire before request events
5. **Socket Objects**: Contain connection details and metadata

### Why This Example is Important

- **Foundation**: Shows how to set up event listeners
- **Monitoring**: Demonstrates connection tracking
- **Architecture**: Introduces event-driven server concepts
- **Debugging**: Provides tools for server monitoring

### Connection vs Request Events Summary

| Aspect | Connection Event | Request Event |
|--------|------------------|---------------|
| **Level** | TCP connection | HTTP request |
| **Timing** | First | After connection |
| **Purpose** | Monitor connections | Handle HTTP requests |
| **Object** | `socket` | `req`, `res` |
| **Frequency** | Once per connection | Once per request |
| **Use Case** | Logging, security | Actual web responses |

---

## 12. Next Steps

### Immediate Improvements

1. **Add request handler** to respond to HTTP requests
2. **Combine both events** for complete monitoring
3. **Add error handling** for robust servers
4. **Implement logging** for production use

### Advanced Concepts

1. **WebSocket connections** (persistent connections)
2. **Connection pooling** and management
3. **Load balancing** based on connections
4. **Security monitoring** and rate limiting

---

## 13. Related Concepts

### EventEmitter Pattern
- Servers inherit from EventEmitter
- Use `.on()` to listen for events
- Events fire asynchronously

### TCP vs HTTP
- **TCP**: Low-level connection protocol
- **HTTP**: High-level application protocol
- **Connection**: TCP-level event
- **Request**: HTTP-level event

### Asynchronous Programming
- Event-driven programming model
- Non-blocking I/O operations
- Callback functions for event handling

---

## Running the Example

```bash
# Navigate to directory
cd "server creating and use 'on' event listen property"

# Run the server
node "create a server - use 'on' event listener property.js"

# Expected output
Server is running on port 3000

# Test in browser: http://localhost:3000
# Expected console output:
# New connection

# Browser result: Still loading (no HTTP response)
```

This example demonstrates the event-driven nature of Node.js servers and shows how to monitor connections, even though it doesn't yet handle HTTP requests properly. It's a crucial step in understanding how servers work internally!
