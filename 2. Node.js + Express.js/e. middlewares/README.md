# Express.js Middlewares - Complete Guide

## 📚 Overview

This module introduces Express.js middlewares - functions that have access to the request object (`req`), response object (`res`), and the next middleware function in the application's request-response cycle. Middlewares are essential for adding functionality like authentication, logging, error handling, and more.

## 🎯 What You'll Learn

- What are middlewares
- How middlewares work
- Creating custom middlewares
- Middleware execution order
- Using the `next()` function
- Request/response modification
- Authentication middleware example
- Best practices for middleware design

## 📁 Project Structure

```
e. middlewares/
├── index.js                    # Main application file
├── routes/
│   └── user.js                 # User routes
├── controller/
│   └── UserController.js       # User controller
├── middleware/
│   └── IsValid.js              # Custom authentication middleware
├── model/
│   └── schema/
│       └── User.js             # User validation schema
├── users.js                    # Sample data
├── package.json
└── README.md
```

## 🔑 Key Concepts

### What is Middleware?

Middleware functions are functions that:
1. Have access to `req`, `res`, and `next`
2. Execute during the request-response cycle
3. Can modify `req` and `res` objects
4. Can end the request-response cycle
5. Can call `next()` to pass control to the next middleware

### Middleware Flow

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
           ↓              ↓
        Can modify    Can modify
        req/res       req/res
```

### Basic Middleware Structure

```javascript
const middleware = (req, res, next) => {
  // Do something with req or res
  // Call next() to continue
  next();
};
```

## 📝 Code Examples

### Example: Authentication Middleware

**middleware/IsValid.js:**

```javascript
exports.isValid = (req, res, next) => {
  // Get token from query parameters
  console.log(req.query.token);
  
  // Check if token is valid
  if (req.query.token === "123") {
    // Token is valid, continue to next middleware/route
    next();
  } else {
    // Token is invalid, send error response
    res.status(401).json({
      message: 'Unauthorized: Invalid Token'
    });
  }
};
```

**Key Points:**
- Checks `req.query.token`
- If valid, calls `next()` to continue
- If invalid, sends error response (doesn't call `next()`)

### Using Middleware in Routes

**index.js:**

```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const { isValid } = require('./middleware/IsValid');

app.use(express.json());

// Apply middleware to specific routes
app.use('/api', isValid, userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

**How it works:**
1. Request comes to `/api/users`
2. `isValid` middleware executes first
3. If token is valid, `next()` is called
4. Request continues to `userRoutes`
5. If token is invalid, response is sent and request stops

## 🚀 Complete Example

### Middleware Implementation

```javascript
// middleware/IsValid.js
exports.isValid = (req, res, next) => {
  // Log the token for debugging
  console.log('Token received:', req.query.token);
  
  // Validate token
  if (req.query.token === "123") {
    // Valid token - continue to next middleware
    next();
  } else {
    // Invalid token - send error and stop
    res.status(401).json({
      message: 'Unauthorized: Invalid Token'
    });
    // Note: We don't call next() here, so request stops
  }
};
```

### Route Handler

```javascript
// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

// These routes are protected by isValid middleware
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

module.exports = router;
```

### Main Application

```javascript
// index.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const { isValid } = require('./middleware/IsValid');

// Parse JSON bodies
app.use(express.json());

// Apply middleware to /api routes
app.use('/api', isValid, userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## 🧪 Testing the Middleware

### Valid Request (with token)

```bash
curl "http://localhost:3000/api/users?token=123"
```

**Response:** Returns user data (middleware allows request through)

### Invalid Request (without token)

```bash
curl "http://localhost:3000/api/users"
```

**Response:**
```json
{
  "message": "Unauthorized: Invalid Token"
}
```

### Invalid Request (wrong token)

```bash
curl "http://localhost:3000/api/users?token=456"
```

**Response:**
```json
{
  "message": "Unauthorized: Invalid Token"
}
```

## 💡 Middleware Patterns

### 1. Application-Level Middleware

Applied to all routes:

```javascript
// Runs for every request
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});
```

### 2. Route-Level Middleware

Applied to specific routes:

```javascript
// Only runs for /api routes
app.use('/api', isValid, userRoutes);
```

### 3. Multiple Middlewares

Chain multiple middlewares:

```javascript
app.use('/api', 
  middleware1,  // Runs first
  middleware2,  // Runs second
  middleware3,  // Runs third
  userRoutes     // Finally routes
);
```

### 4. Conditional Middleware

```javascript
const conditionalMiddleware = (req, res, next) => {
  if (req.headers['x-api-key']) {
    // Has API key, continue
    next();
  } else {
    // No API key, block
    res.status(403).json({ error: 'API key required' });
  }
};
```

## 🎓 Best Practices

### 1. Always Call next() or Send Response

```javascript
// ✅ Good: Either call next() or send response
const middleware = (req, res, next) => {
  if (condition) {
    next(); // Continue
  } else {
    res.status(400).json({ error: 'Bad request' }); // Stop
  }
};

// ❌ Bad: Neither next() nor response
const middleware = (req, res, next) => {
  if (condition) {
    // Do something but don't call next() or send response
    // Request hangs!
  }
};
```

### 2. Modify Request Object for Downstream Use

```javascript
// ✅ Good: Add data to req for later use
const addUserInfo = (req, res, next) => {
  req.user = { id: 1, name: 'John' };
  next();
};

// Later in route handler
router.get('/profile', (req, res) => {
  console.log(req.user); // Available here
});
```

### 3. Use Middleware for Cross-Cutting Concerns

```javascript
// Logging middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};
```

### 4. Keep Middlewares Focused

```javascript
// ✅ Good: Single responsibility
const validateToken = (req, res, next) => {
  // Only validates token
};

const logRequest = (req, res, next) => {
  // Only logs request
};

// ❌ Bad: Multiple responsibilities
const doEverything = (req, res, next) => {
  // Validates, logs, transforms, etc.
};
```

## 🔍 Understanding next()

### next() - Continue to Next Middleware

```javascript
const middleware = (req, res, next) => {
  // Process request
  next(); // Continue to next middleware/route
};
```

### next(error) - Pass Error to Error Handler

```javascript
const middleware = (req, res, next) => {
  try {
    // Some operation
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};
```

### Not Calling next() - Stop Request

```javascript
const middleware = (req, res, next) => {
  if (unauthorized) {
    res.status(401).json({ error: 'Unauthorized' });
    // Don't call next() - request stops here
  } else {
    next(); // Continue
  }
};
```

## 🎯 Common Middleware Use Cases

### 1. Authentication

```javascript
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (isValidToken(token)) {
    req.user = getUserFromToken(token);
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

### 2. Logging

```javascript
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date()}`);
  next();
};
```

### 3. Request Parsing

```javascript
// Built-in Express middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded
```

### 4. CORS

```javascript
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
```

### 5. Rate Limiting

```javascript
const rateLimit = (req, res, next) => {
  // Check request count
  if (tooManyRequests) {
    res.status(429).json({ error: 'Too many requests' });
  } else {
    next();
  }
};
```

## ⚠️ Common Mistakes

1. **Forgetting to call next()**
   ```javascript
   // ❌ Request hangs
   const middleware = (req, res, next) => {
     console.log('Processing');
     // Missing next()
   };
   
   // ✅ Correct
   const middleware = (req, res, next) => {
     console.log('Processing');
     next();
   };
   ```

2. **Calling next() after sending response**
   ```javascript
   // ❌ Can't send response after headers sent
   const middleware = (req, res, next) => {
     res.json({ message: 'Done' });
     next(); // Error!
   };
   ```

3. **Wrong middleware order**
   ```javascript
   // ❌ Wrong order
   app.use('/api', userRoutes, isValid); // Routes before middleware
   
   // ✅ Correct order
   app.use('/api', isValid, userRoutes); // Middleware before routes
   ```

## 🔗 Next Steps

After mastering basic middlewares:
- **Module f:** Learn user-agent tracking middleware
- **Module g:** Add file logging to middleware
- Learn error handling middleware
- Explore third-party middleware (helmet, cors, morgan)
- Implement authentication with JWT

## 📚 Additional Resources

- [Express.js Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)
- [Writing Middleware](https://expressjs.com/en/guide/writing-middleware.html)
- [Middleware Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Ready for advanced middlewares? Move to `f. middlewares - user-agent tracking`!**

