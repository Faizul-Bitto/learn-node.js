# HTTP Server - Complete Request/Response Example

This directory demonstrates creating a fully functional HTTP server that properly handles requests and sends responses using the request (`req`) and response (`res`) objects.

## 📁 File Structure

```
server creating with proper req, res objects in callback/
├── create a server with proper callback function (req, res obejcts).js    # Complete server with request/response handling
└── README.md                                                             # This documentation
```

## 🎯 What You'll Learn

- **Complete HTTP server implementation** with request/response handling
- **Request and Response objects** usage and methods
- **HTTP response lifecycle** from start to finish
- **Proper server callback functions** with req and res parameters
- **Working web server** that actually responds to browser requests

---

## 1. Understanding the Example

### The Code

```javascript
const http = require('http');

//! create server
const server = http.createServer((req, res) => { //! req and res are the request and response objects
    res.write('Hello Programmers!'); //! in response we will get -> Hello Programmers!
    res.write('How are you all?!'); //! in response we will get -> How are you all?!
    res.end(); //! finally we have to end the response. 'end' is a method of response object
});

server.listen(3000);

console.log('Server is running on port 3000');
```

### What This Code Does

1. **Imports the HTTP module** - `require('http')`
2. **Creates server with callback** - `http.createServer((req, res) => {...})`
3. **Handles HTTP requests** - Request handler function
4. **Writes response data** - `res.write()` methods
5. **Ends the response** - `res.end()` method
6. **Starts the server** - `server.listen(3000)`

### Key Differences from Previous Examples

**Example 1 (no response):**
- ❌ No request handler
- ❌ No response sent
- ❌ Browser shows loading

**Example 2 (connection events):**
- ✅ Connection monitoring
- ❌ Still no HTTP response
- ❌ Browser shows loading

**Example 3 (this example):**
- ✅ Complete request handler
- ✅ Proper HTTP response
- ✅ Browser displays content

---

## 2. Request and Response Objects Deep Dive

### Request Object (`req`)

The `req` object contains information about the incoming HTTP request:

```javascript
server.createServer((req, res) => {
    // Request properties
    console.log('Method:', req.method);        // GET, POST, PUT, DELETE
    console.log('URL:', req.url);             // /path/to/resource
    console.log('Headers:', req.headers);     // Request headers
    console.log('HTTP Version:', req.httpVersion); // 1.1, 2.0
    
    // Request body (for POST/PUT requests)
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        console.log('Request body:', body);
    });
});
```

**Common Request Properties:**

| Property | Description | Example |
|----------|-------------|---------|
| `req.method` | HTTP method | `'GET'`, `'POST'`, `'PUT'` |
| `req.url` | Requested URL path | `'/'`, `'/about'`, `'/api/users'` |
| `req.headers` | Request headers object | `{host: 'localhost:3000', user-agent: '...'}` |
| `req.httpVersion` | HTTP version | `'1.1'`, `'2.0'` |
| `req.connection` | Socket connection | Contains IP, port info |

### Response Object (`res`)

The `res` object is used to send data back to the client:

```javascript
server.createServer((req, res) => {
    // Set response headers
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // Write response data (can be called multiple times)
    res.write('<h1>Welcome to my server!</h1>');
    res.write('<p>This is chunked data</p>');
    
    // End the response (required!)
    res.end('<p>Response completed</p>');
});
```

**Response Methods:**

| Method | Description | Example |
|--------|-------------|---------|
| `res.writeHead(status, headers)` | Set status code and headers | `res.writeHead(200, {'Content-Type': 'text/html'})` |
| `res.write(data)` | Send data to client | `res.write('Hello World')` |
| `res.end([data])` | End response (optionally with data) | `res.end('Goodbye')` |
| `res.setHeader(name, value)` | Set individual header | `res.setHeader('Content-Type', 'application/json')` |

---

## 3. Understanding the Response Lifecycle

### Our Example Breakdown

```javascript
const server = http.createServer((req, res) => {
    res.write('Hello Programmers!'); // Step 1: Write first chunk
    res.write('How are you all?!');  // Step 2: Write second chunk
    res.end();                       // Step 3: End response
});
```

### Response Flow

```
Client Request → Server Handler → res.write() → res.write() → res.end() → Response Sent
      ↓              ↓              ↓            ↓            ↓           ↓
   GET / HTTP/1.1  (req, res)   "Hello..."   "How are..."   End()    Browser displays
```

### What Happens in the Browser

1. **Browser sends request** to `http://localhost:3000`
2. **Server receives request** and calls the handler function
3. **First `res.write()`** sends "Hello Programmers!"
4. **Second `res.write()`** sends "How are you all?!"
5. **`res.end()`** closes the response
6. **Browser displays**: "Hello Programmers!How are you all?!"

---

## 4. Running the Example

### Starting the Server

```bash
cd "server creating with proper req, res objects in callback"
node "create a server with proper callback function (req, res obejcts).js"
```

### Expected Output

```
Server is running on port 3000
```

### Testing the Server

1. **Open browser** and navigate to `http://localhost:3000`
2. **Expected result**: Browser displays "Hello Programmers!How are you all?!"
3. **No loading spinner** - Response is received immediately
4. **Refresh page** - Same content displays again

### Browser Result

```
Hello Programmers!How are you all?!
```

---

## 5. Understanding Response Methods

### `res.write()` Method

```javascript
// Can be called multiple times
res.write('First chunk of data');
res.write('Second chunk of data');
res.write('Third chunk of data');

// All chunks are sent to client before res.end()
```

**Characteristics:**
- **Chunked data** - Can send data in pieces
- **Streaming** - Data flows to client as written
- **Multiple calls** - Can be called repeatedly
- **Must end with `res.end()`** - Response not complete until ended

### `res.end()` Method

```javascript
// End without data
res.end();

// End with final data
res.end('Final chunk of data');

// Once called, no more data can be sent
```

**Characteristics:**
- **Required** - Every response must be ended
- **Final step** - No more data can be sent after this
- **Optional data** - Can include final chunk
- **Closes connection** - HTTP response is complete

### `res.writeHead()` Method

```javascript
// Set status code and headers
res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': '50'
});

// Or set headers individually
res.setHeader('Content-Type', 'text/html');
res.setHeader('Content-Length', '50');
```

---

## 6. Improving the Example

### Adding Response Headers

```javascript
const server = http.createServer((req, res) => {
    // Set proper headers
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
    });
    
    res.write('<h1>Hello Programmers!</h1>');
    res.write('<p>How are you all?!</p>');
    res.end();
});
```

### Adding Request Information

```javascript
const server = http.createServer((req, res) => {
    // Log request details
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>Request Method: ${req.method}</h1>`);
    res.write(`<h1>Request URL: ${req.url}</h1>`);
    res.write('<p>Hello Programmers!</p>');
    res.write('<p>How are you all?!</p>');
    res.end();
});
```

### Adding Error Handling

```javascript
const server = http.createServer((req, res) => {
    try {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Hello Programmers!</h1>');
        res.write('<p>How are you all?!</p>');
        res.end();
    } catch (error) {
        console.error('Response error:', error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    }
});
```

---

## 7. Common HTTP Status Codes

### Success Responses

```javascript
// 200 OK - Successful request
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('<h1>Success!</h1>');

// 201 Created - Resource created
res.writeHead(201, {'Content-Type': 'application/json'});
res.end(JSON.stringify({message: 'User created'}));

// 204 No Content - Success with no response body
res.writeHead(204);
res.end(); // No body content
```

### Client Error Responses

```javascript
// 400 Bad Request
res.writeHead(400, {'Content-Type': 'text/plain'});
res.end('Bad Request');

// 404 Not Found
res.writeHead(404, {'Content-Type': 'text/html'});
res.end('<h1>404 - Page Not Found</h1>');

// 405 Method Not Allowed
res.writeHead(405, {'Content-Type': 'text/plain'});
res.end('Method Not Allowed');
```

### Server Error Responses

```javascript
// 500 Internal Server Error
res.writeHead(500, {'Content-Type': 'text/plain'});
res.end('Internal Server Error');

// 503 Service Unavailable
res.writeHead(503, {'Content-Type': 'text/plain'});
res.end('Service Temporarily Unavailable');
```

---

## 8. Content Types and Headers

### Common Content Types

```javascript
// HTML content
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('<h1>Hello World!</h1>');

// JSON content
res.writeHead(200, {'Content-Type': 'application/json'});
res.end(JSON.stringify({message: 'Hello World!'}));

// Plain text
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hello World!');

// CSS content
res.writeHead(200, {'Content-Type': 'text/css'});
res.end('body { background-color: blue; }');

// JavaScript content
res.writeHead(200, {'Content-Type': 'application/javascript'});
res.end('console.log("Hello World!");');
```

### Important Headers

```javascript
res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': '25',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'Set-Cookie': 'sessionId=12345'
});
```

---

## 9. Building a More Complete Server

### Route Handling

```javascript
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (url === '/' && method === 'GET') {
        res.write('<h1>Welcome to Home Page!</h1>');
        res.write('<p>This is the main page</p>');
    }
    else if (url === '/about' && method === 'GET') {
        res.write('<h1>About Us</h1>');
        res.write('<p>Learn more about our company</p>');
    }
    else if (url === '/contact' && method === 'GET') {
        res.write('<h1>Contact Us</h1>');
        res.write('<p>Get in touch with us</p>');
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>404 - Page Not Found</h1>');
        res.write('<p>The page you requested does not exist</p>');
    }
    
    res.end();
});
```

### API Endpoint

```javascript
const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        const users = [
            {id: 1, name: 'John Doe'},
            {id: 2, name: 'Jane Smith'}
        ];
        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    }
    else if (req.url === '/api/status' && req.method === 'GET') {
        const status = {
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        };
        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(status));
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('API endpoint not found');
    }
});
```

---

## 10. Common Mistakes and Solutions

### Mistake 1: Forgetting to End Response

```javascript
// ❌ Wrong - Browser will hang
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    // Missing res.end()!
});

// ✅ Correct - Response is properly ended
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
});
```

### Mistake 2: Writing After Ending

```javascript
// ❌ Wrong - Will cause error
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
    res.write('This will cause an error!'); // Too late!
});

// ✅ Correct - All writes before end
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.write('This is fine!');
    res.end();
});
```

### Mistake 3: Missing Content-Type Header

```javascript
// ❌ Wrong - Browser might not display correctly
const server = http.createServer((req, res) => {
    res.writeHead(200); // No Content-Type
    res.end('<h1>Hello World!</h1>');
});

// ✅ Correct - Proper Content-Type
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello World!</h1>');
});
```

### Mistake 4: Not Handling Errors

```javascript
// ❌ Wrong - No error handling
const server = http.createServer((req, res) => {
    // What if something goes wrong?
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

// ✅ Correct - With error handling
const server = http.createServer((req, res) => {
    try {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World!');
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    }
});
```

---

## 11. Performance Considerations

### Response Streaming

```javascript
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Stream large amounts of data
    for (let i = 0; i < 1000; i++) {
        res.write(`Line ${i}\n`);
    }
    
    res.end();
});
```

### Connection Management

```javascript
const server = http.createServer((req, res) => {
    // Set timeout for slow clients
    req.setTimeout(30000, () => {
        console.log('Request timeout');
        res.writeHead(408, {'Content-Type': 'text/plain'});
        res.end('Request Timeout');
    });
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});
```

### Keep-Alive Connections

```javascript
const server = http.createServer((req, res) => {
    res.setHeader('Connection', 'keep-alive');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

// Configure keep-alive timeout
server.keepAliveTimeout = 65000; // 65 seconds
server.headersTimeout = 66000;   // 66 seconds
```

---

## 12. Testing the Server

### Manual Testing with Browser

1. **Start server** and navigate to `http://localhost:3000`
2. **Check response** - Should display "Hello Programmers!How are you all?!"
3. **Refresh page** - Same content should appear
4. **Check browser developer tools** - Network tab shows successful response

### Testing with curl

```bash
# Test the server with curl
curl http://localhost:3000

# Expected output:
# Hello Programmers!How are you all?!

# Test with verbose output
curl -v http://localhost:3000

# Shows headers and response details
```

### Testing with Node.js

```javascript
const http = require('http');

// Test the server
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('Response:', data);
    });
});

req.on('error', (error) => {
    console.error('Request error:', error);
});

req.end();
```

---

## 13. Key Takeaways

### What You've Learned

1. **Complete HTTP Server**: How to create a fully functional server
2. **Request/Response Objects**: Understanding `req` and `res` parameters
3. **Response Lifecycle**: From `write()` to `end()` methods
4. **HTTP Protocol**: Proper status codes and headers
5. **Working Web Server**: Browser receives actual content

### Why This Example is Important

- **Functional Server**: Actually responds to browser requests
- **Foundation Knowledge**: Core concepts for all web development
- **Request Handling**: How to process incoming HTTP requests
- **Response Creation**: How to send data back to clients

### Comparison with Previous Examples

| Example | Request Handler | Response Sent | Browser Result |
|---------|----------------|---------------|----------------|
| No Response | ❌ None | ❌ No response | Loading spinner |
| Connection Events | ❌ None | ❌ No response | Loading spinner |
| Complete Server | ✅ Full handler | ✅ Proper response | Actual content |

---

## 14. Next Steps

### Immediate Improvements

1. **Add route handling** for different URLs
2. **Implement different HTTP methods** (POST, PUT, DELETE)
3. **Add error handling** and proper status codes
4. **Include response headers** for better browser compatibility

### Advanced Features

1. **Static file serving** (HTML, CSS, JS files)
2. **API endpoints** with JSON responses
3. **Form handling** for POST requests
4. **Session management** and cookies
5. **Middleware integration** for request processing

---

## 15. Related Concepts

### HTTP Protocol
- Request-response pattern
- Status codes and headers
- Content types and encoding

### Node.js Modules
- `http` module for server functionality
- `url` module for URL parsing
- `querystring` module for query parameters

### Web Development
- Client-server communication
- Browser-server interaction
- HTTP methods and status codes

---

## Running the Example

```bash
# Navigate to directory
cd "server creating with proper req, res objects in callback"

# Run the server
node "create a server with proper callback function (req, res obejcts).js"

# Expected output
Server is running on port 3000

# Test in browser: http://localhost:3000
# Expected result: "Hello Programmers!How are you all?!"
```

This example demonstrates a complete, working HTTP server that properly handles requests and sends responses. It's the foundation for building real web applications and APIs with Node.js!
