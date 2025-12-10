# Node.js HTTP Module - Complete Guide

## 📚 Overview

The HTTP module is one of Node.js's most important core modules. It allows you to create HTTP servers and clients, making it the foundation for building web applications and APIs in Node.js.

## 🎯 What You'll Learn

This section covers:
- Creating HTTP servers
- Understanding request and response objects
- Handling different HTTP methods
- Working with URL parameters and query strings
- Setting response headers and status codes
- Building basic web servers

## 📁 Examples Included

### 1. Server Creating and Returning Nothing in Response
Learn the absolute basics of creating an HTTP server.

**File:** `server creating and returning nothing in reponse/create a server - return nothing.js`

**What it demonstrates:**
- Basic server creation
- Server listening on a port
- Minimal server setup

### 2. Server Creating and Use 'on' Event Listener Property
Understand how to use the `on` event listener for request handling.

**File:** `server creating and use 'on' event listen property/create a server - use 'on' event listener property.js`

**What it demonstrates:**
- Event-driven request handling
- Using `server.on('request', ...)` pattern
- Alternative to callback approach

### 3. Server Creating with Proper req, res Objects in Callback
Master the standard way of creating servers with request and response objects.

**File:** `server creating with proper req, res objects in callback/create a server with proper callback function (req, res obejcts).js`

**What it demonstrates:**
- Request object (`req`) usage
- Response object (`res`) usage
- Writing responses
- Ending responses properly

## 🔑 Key Concepts

### Creating a Server

**Method 1: Using Callback (Most Common)**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Handle request
  res.end('Hello World!');
});

server.listen(3000);
```

**Method 2: Using Event Listener**
```javascript
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  // Handle request
  res.end('Hello World!');
});

server.listen(3000);
```

### Request Object (`req`)

The request object contains information about the incoming HTTP request:

```javascript
const server = http.createServer((req, res) => {
  console.log(req.url);        // Requested URL path
  console.log(req.method);     // HTTP method (GET, POST, etc.)
  console.log(req.headers);    // Request headers
  console.log(req.query);      // Query parameters (if parsed)
});
```

**Common Properties:**
- `req.url` - The request URL path
- `req.method` - HTTP method (GET, POST, PUT, DELETE, etc.)
- `req.headers` - Object containing request headers
- `req.body` - Request body (needs parsing for POST requests)

### Response Object (`res`)

The response object is used to send data back to the client:

```javascript
const server = http.createServer((req, res) => {
  // Set status code
  res.statusCode = 200;
  
  // Set headers
  res.setHeader('Content-Type', 'text/html');
  
  // Write response
  res.write('<h1>Hello</h1>');
  res.write('<p>World</p>');
  
  // End response
  res.end();
});
```

**Common Methods:**
- `res.writeHead(statusCode, headers)` - Set status and headers together
- `res.setHeader(name, value)` - Set individual header
- `res.statusCode` - Set HTTP status code
- `res.write(data)` - Write response data
- `res.end([data])` - End response (optionally with data)

### Setting Response Headers

```javascript
// Method 1: Individual headers
res.setHeader('Content-Type', 'text/html');
res.setHeader('X-Custom-Header', 'value');

// Method 2: All at once
res.writeHead(200, {
  'Content-Type': 'text/html',
  'X-Custom-Header': 'value'
});
```

### HTTP Status Codes

Common status codes:
- `200` - OK (success)
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

```javascript
res.statusCode = 404;
res.end('Page not found');
```

## 📝 Complete Example

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Log request information
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  
  // Set response headers
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  
  // Handle different routes
  if (req.url === '/') {
    res.write('<h1>Home Page</h1>');
  } else if (req.url === '/about') {
    res.write('<h1>About Page</h1>');
  } else {
    res.statusCode = 404;
    res.write('<h1>404 - Not Found</h1>');
  }
  
  // End response
  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

## 🚀 Running the Examples

Navigate to each example folder and run:

```bash
node "create a server - return nothing.js"
# or
node "create a server - use 'on' event listener property.js"
# or
node "create a server with proper callback function (req, res obejcts).js"
```

## 💡 Best Practices

1. **Always End Responses** - Call `res.end()` to close the connection
2. **Set Content-Type** - Specify the content type in headers
3. **Handle Errors** - Check for errors and respond appropriately
4. **Use Status Codes** - Return appropriate HTTP status codes
5. **Parse URLs** - Use `url` module for complex URL parsing

## 🔍 Understanding Request Flow

1. **Client makes request** → Server receives it
2. **Server processes** → Reads `req.url`, `req.method`, etc.
3. **Server responds** → Sets headers, writes data, ends response
4. **Connection closes** → Response sent to client

## 🎓 Common Patterns

### Basic Route Handling

```javascript
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home</h1>');
  } else if (req.url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello API' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});
```

### Reading Request Body (POST)

```javascript
let body = '';

req.on('data', (chunk) => {
  body += chunk.toString();
});

req.on('end', () => {
  const data = JSON.parse(body);
  // Process data
  res.end('Data received');
});
```

## ⚠️ Important Notes

1. **Response Must End** - Always call `res.end()` or the connection stays open
2. **Headers Before Data** - Set headers before writing response data
3. **String vs Buffer** - Response data can be string or Buffer
4. **One Response Per Request** - Each request gets one response

## 🔗 Next Steps

After mastering the HTTP module:
- Learn **Express.js** for easier server creation
- Explore routing libraries
- Learn about middleware
- Build REST APIs
- Handle file uploads
- Work with WebSockets

## 📚 Additional Resources

- [Node.js HTTP Module Documentation](https://nodejs.org/api/http.html)
- [HTTP Status Codes Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [HTTP Methods Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

---

**Start with the simplest example and work your way up!**

