# User-Agent Tracking Middleware - Complete Guide

## 📚 Overview

This module demonstrates how to create middleware that validates and tracks User-Agent headers from incoming requests. You'll learn how to read request headers, validate them, and use multiple middlewares together in a chain.

## 🎯 What You'll Learn

- Reading request headers
- User-Agent header validation
- Chaining multiple middlewares
- Security considerations
- Blocking suspicious requests
- Middleware composition
- Request header inspection

## 📁 Project Structure

```
f. middlewares - user-agent tracking/
├── index.js                    # Main application file
├── routes/
│   └── user.js                 # User routes
├── controller/
│   └── UserController.js       # User controller
├── middleware/
│   ├── IsValid.js              # Token validation middleware
│   └── CheckUserAgent.js       # User-Agent validation middleware
├── model/
│   └── schema/
│       └── User.js             # User validation schema
├── users.js                    # Sample data
├── package.json
└── README.md
```

## 🔑 Key Concepts

### What is User-Agent?

The User-Agent header identifies the client (browser, app, bot) making the request:

```
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
```

### Why Validate User-Agent?

1. **Security** - Block malicious bots and scrapers
2. **Analytics** - Track client types
3. **Rate Limiting** - Identify automated requests
4. **Content Delivery** - Serve different content to different clients

### Middleware Chaining

Multiple middlewares execute in order:

```
Request → isValid → checkUserAgent → Routes → Response
```

## 📝 Code Examples

### User-Agent Middleware

**middleware/CheckUserAgent.js:**

```javascript
exports.checkUserAgent = (req, res, next) => {
  // Get User-Agent header from request
  const userAgent = req.headers['user-agent'];

  // Log the user agent
  console.log(`The agent is ${userAgent}`);

  // Check if User-Agent header exists
  if (!userAgent) {
    return res.status(400).json({
      message: "Bad Request: Missing User-Agent header"
    });
  }

  // If User-Agent exists, continue to next middleware
  next();
};
```

**Key Points:**
- Reads `req.headers['user-agent']`
- Checks if header exists
- Logs the user agent
- Calls `next()` if valid, sends error if missing

### Using Multiple Middlewares

**index.js:**

```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const { isValid } = require('./middleware/IsValid');
const { checkUserAgent } = require('./middleware/CheckUserAgent');

app.use(express.json());

// Chain multiple middlewares
app.use('/api', isValid, checkUserAgent, userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

**Execution Order:**
1. Request arrives at `/api/users?token=123`
2. `isValid` middleware runs first (checks token)
3. `checkUserAgent` middleware runs second (checks User-Agent)
4. If both pass, request reaches `userRoutes`
5. Route handler processes request

## 🚀 Complete Example

### CheckUserAgent Middleware

```javascript
// middleware/CheckUserAgent.js
exports.checkUserAgent = (req, res, next) => {
  // Access User-Agent header
  // Headers are case-insensitive, but Express normalizes them to lowercase
  const userAgent = req.headers['user-agent'];

  // Log for debugging/monitoring
  console.log(`The agent is ${userAgent}`);

  // Validate that User-Agent exists
  if (!userAgent) {
    // Missing User-Agent header - reject request
    return res.status(400).json({
      message: "Bad Request: Missing User-Agent header"
    });
  }

  // User-Agent exists - continue to next middleware
  next();
};
```

### IsValid Middleware (from previous module)

```javascript
// middleware/IsValid.js
exports.isValid = (req, res, next) => {
  console.log('Token received:', req.query.token);

  if (req.query.token === "123") {
    next();
  } else {
    res.status(401).json({
      message: 'Unauthorized: Invalid Token'
    });
  }
};
```

### Main Application

```javascript
// index.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const { isValid } = require('./middleware/IsValid');
const { checkUserAgent } = require('./middleware/CheckUserAgent');

app.use(express.json());

// Apply both middlewares in sequence
app.use('/api', isValid, checkUserAgent, userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## 🧪 Testing the Middleware

### Valid Request (with token and User-Agent)

```bash
curl "http://localhost:3000/api/users?token=123" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
```

**Response:** Returns user data (both middlewares pass)

### Missing User-Agent

```bash
curl "http://localhost:3000/api/users?token=123"
```

**Response:**
```json
{
  "message": "Bad Request: Missing User-Agent header"
}
```

### Invalid Token (but valid User-Agent)

```bash
curl "http://localhost:3000/api/users?token=456" \
  -H "User-Agent: Mozilla/5.0"
```

**Response:**
```json
{
  "message": "Unauthorized: Invalid Token"
}
```

**Note:** `checkUserAgent` never runs because `isValid` stops the request first.

## 💡 Understanding Request Headers

### Accessing Headers

```javascript
// All headers (object)
console.log(req.headers);

// Specific header (case-insensitive)
const userAgent = req.headers['user-agent'];
const contentType = req.headers['content-type'];
const authorization = req.headers['authorization'];

// Common headers
req.headers.host          // Host header
req.headers['user-agent'] // User-Agent header
req.headers['content-type'] // Content-Type header
```

### Common User-Agent Values

```
Browser:
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36

Mobile:
Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)

Bot:
Googlebot/2.1

cURL:
curl/7.68.0
```

## 🎓 Best Practices

### 1. Validate Headers Early

```javascript
// ✅ Good: Check headers before processing
const checkUserAgent = (req, res, next) => {
  if (!req.headers['user-agent']) {
    return res.status(400).json({ error: 'User-Agent required' });
  }
  next();
};
```

### 2. Log Headers for Debugging

```javascript
// ✅ Good: Log for monitoring
const checkUserAgent = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  console.log(`Request from: ${userAgent}`);
  next();
};
```

### 3. Chain Middlewares Logically

```javascript
// ✅ Good: Logical order
app.use('/api', 
  authenticate,    // 1. Check authentication first
  checkUserAgent,  // 2. Then check headers
  validateInput,   // 3. Then validate data
  routes           // 4. Finally process request
);
```

### 4. Handle Missing Headers Gracefully

```javascript
// ✅ Good: Clear error message
if (!userAgent) {
  return res.status(400).json({
    message: "Bad Request: Missing User-Agent header"
  });
}
```

## 🔍 Advanced Patterns

### Blocking Specific User-Agents

```javascript
exports.checkUserAgent = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  
  // Block suspicious user agents
  const blockedAgents = ['curl', 'wget', 'python-requests'];
  const isBlocked = blockedAgents.some(agent => 
    userAgent.toLowerCase().includes(agent)
  );
  
  if (isBlocked) {
    return res.status(403).json({
      message: "Forbidden: Suspicious User-Agent"
    });
  }
  
  next();
};
```

### Adding User-Agent to Request

```javascript
exports.checkUserAgent = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  
  // Add parsed user agent info to request
  req.userAgentInfo = {
    raw: userAgent,
    isBrowser: userAgent.includes('Mozilla'),
    isMobile: userAgent.includes('Mobile'),
    isBot: userAgent.includes('bot')
  };
  
  next();
};

// Later in route handler
router.get('/users', (req, res) => {
  console.log(req.userAgentInfo); // Available here
});
```

### Conditional Middleware

```javascript
const checkUserAgent = (options = {}) => {
  return (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    
    if (options.required && !userAgent) {
      return res.status(400).json({ error: 'User-Agent required' });
    }
    
    if (options.blockBots && isBot(userAgent)) {
      return res.status(403).json({ error: 'Bots not allowed' });
    }
    
    next();
  };
};

// Usage
app.use('/api', checkUserAgent({ required: true, blockBots: true }));
```

## ⚠️ Common Mistakes

1. **Case sensitivity**
   ```javascript
   // ❌ Wrong: Headers are case-insensitive
   const userAgent = req.headers['User-Agent'];
   
   // ✅ Correct: Use lowercase
   const userAgent = req.headers['user-agent'];
   ```

2. **Not checking if header exists**
   ```javascript
   // ❌ Wrong: Can cause errors
   const userAgent = req.headers['user-agent'].toLowerCase();
   
   // ✅ Correct: Check first
   const userAgent = req.headers['user-agent'];
   if (!userAgent) { /* handle */ }
   ```

3. **Wrong middleware order**
   ```javascript
   // ❌ Wrong: User-Agent check before auth
   app.use('/api', checkUserAgent, isValid, routes);
   
   // ✅ Better: Auth first, then headers
   app.use('/api', isValid, checkUserAgent, routes);
   ```

## 🔗 Next Steps

After mastering User-Agent tracking:
- **Module g:** Add file logging to track User-Agents
- Learn about blocking bots and scrapers
- Implement rate limiting based on User-Agent
- Explore request fingerprinting
- Learn about security headers

## 📚 Additional Resources

- [HTTP Headers (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [User-Agent String Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)
- [Express.js Request Headers](https://expressjs.com/en/api.html#req.headers)

---

**Ready for logging? Move to `g. middlewares - user-agent tracking with logger in a file`!**

