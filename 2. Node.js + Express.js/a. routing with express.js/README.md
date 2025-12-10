# Express.js Routing - Complete Guide

## 📚 Overview

This module introduces Express.js routing, the foundation of building web applications and APIs. You'll learn how to define routes, handle different HTTP methods, work with route parameters and query strings, and organize routes into separate files.

## 🎯 What You'll Learn

- Creating Express.js applications
- Defining routes (GET, POST, PUT, DELETE)
- Route parameters (`:id`)
- Query parameters (`?key=value`)
- Organizing routes with Express Router
- Separating routes into multiple files
- Request and response handling

## 📁 Project Structure

```
a. routing with express.js/
├── index.js          # Main application file
├── user.js           # User routes
├── payment.js         # Payment routes
├── package.json      # Dependencies
└── README.md         # This file
```

## 🔑 Key Concepts

### Creating an Express Application

```javascript
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Start server
app.listen(3000, () => {
  console.log('Server is running...');
});
```

### Basic Route Definition

```javascript
// GET route
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST route
app.post('/users', (req, res) => {
  res.json({ message: 'Create user' });
});
```

### Route Parameters

Access dynamic URL segments:

```javascript
// Route: GET /user/:id
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

**Example:**
- URL: `/user/123`
- `req.params.id` = `"123"`

### Query Parameters

Access URL query strings:

```javascript
// Route: GET /user/:id?filter=active
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const filter = req.query.filter;
  res.send(`User ID: ${userId}, Filter: ${filter}`);
});
```

**Example:**
- URL: `/user/123?filter=active`
- `req.params.id` = `"123"`
- `req.query.filter` = `"active"`

### Express Router

Organize routes into separate files:

**user.js:**
```javascript
const express = require('express');
const router = express.Router();

router.get('/user/:id', (req, res) => {
  const userID = req.params.id;
  const filter = req.query.filter;
  res.status(200).send(`User ID : ${userID} and filter : ${filter}`);
});

router.post('/users', (req, res) => {
  const { name, age } = req.body;
  
  if (!name) {
    return res.status(400).json({
      message: "Name is required"
    });
  }
  
  if (!age) {
    return res.status(400).json({
      message: "Age is required"
    });
  }
  
  res.status(201).json({
    message: "User created successfully",
    data: { name, age }
  });
});

module.exports = router;
```

**index.js:**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./user');
const paymentRoutes = require('./payment');

app.use(userRoutes);
app.use(paymentRoutes);

app.listen(3000, () => {
  console.log('Server is running...');
});
```

## 📝 Code Examples

### Example 1: User Routes (user.js)

```javascript
const express = require('express');
const router = express.Router();

// GET /user/:id
router.get('/user/:id', (req, res) => {
  const userID = req.params.id;
  const filter = req.query.filter;
  
  res.status(200).send(`User ID : ${userID} and filter : ${filter}`);
});

// POST /users
router.post('/users', (req, res) => {
  const { name, age } = req.body;
  
  // Validation
  if (!name) {
    return res.status(400).json({
      message: "Name is required"
    });
  }
  
  if (!age) {
    return res.status(400).json({
      message: "Age is required"
    });
  }
  
  // Success response
  res.status(201).json({
    message: "User created successfully",
    data: { name, age }
  });
});

module.exports = router;
```

### Example 2: Payment Routes (payment.js)

```javascript
const express = require('express');
const router = express.Router();

// GET /user/:id/payment
router.get('/user/:id/payment', (req, res) => {
  const userID = req.params.id;
  const filter = req.query.filter;
  
  res.status(200).send(
    `User ID : ${userID} is ${filter} and confirmed the payment.`
  );
});

module.exports = router;
```

## 🚀 Running the Application

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
node index.js
```

Or with nodemon (if configured):

```bash
npm start
```

### Test the Routes

**Get User:**
```bash
curl http://localhost:3000/user/123?filter=active
```

**Create User:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","age":30}'
```

**Get Payment:**
```bash
curl http://localhost:3000/user/123/payment?filter=confirmed
```

## 💡 Best Practices

### 1. Organize Routes by Feature

```javascript
// Good: Separate files
routes/
  ├── user.js
  ├── payment.js
  └── product.js
```

### 2. Use Express Router

```javascript
// Good: Use Router
const router = express.Router();
router.get('/users', handler);
module.exports = router;

// Avoid: Define all routes in index.js
```

### 3. Validate Input

```javascript
// Always validate request data
if (!name || !age) {
  return res.status(400).json({ error: 'Missing fields' });
}
```

### 4. Use Appropriate HTTP Methods

- `GET` - Retrieve data
- `POST` - Create new resource
- `PUT` - Update entire resource
- `PATCH` - Partial update
- `DELETE` - Remove resource

### 5. Return Proper Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## 🔍 Understanding Request Object

```javascript
router.get('/user/:id', (req, res) => {
  // Route parameters
  console.log(req.params.id);
  
  // Query parameters
  console.log(req.query.filter);
  
  // Request body (for POST/PUT)
  console.log(req.body);
  
  // Headers
  console.log(req.headers);
  
  // HTTP method
  console.log(req.method);
  
  // URL
  console.log(req.url);
});
```

## 🎓 Common Patterns

### Nested Routes

```javascript
// /user/:id/payment
router.get('/user/:id/payment', (req, res) => {
  const userId = req.params.id;
  // Handle payment for specific user
});
```

### Multiple Route Parameters

```javascript
// /user/:userId/post/:postId
router.get('/user/:userId/post/:postId', (req, res) => {
  const { userId, postId } = req.params;
});
```

### Optional Parameters

```javascript
// /user/:id? (optional)
router.get('/user/:id?', (req, res) => {
  const userId = req.params.id || 'all';
});
```

## ⚠️ Common Mistakes

1. **Forgetting to export router**
   ```javascript
   // ❌ Missing export
   const router = express.Router();
   
   // ✅ Correct
   module.exports = router;
   ```

2. **Not using express.json() middleware**
   ```javascript
   // ❌ req.body will be undefined
   app.post('/users', (req, res) => {
     console.log(req.body); // undefined
   });
   
   // ✅ Add middleware
   app.use(express.json());
   ```

3. **Not returning after error response**
   ```javascript
   // ❌ Code continues after error
   if (!name) {
     res.status(400).json({ error: 'Name required' });
   }
   res.status(201).json({ success: true }); // Still executes!
   
   // ✅ Use return
   if (!name) {
     return res.status(400).json({ error: 'Name required' });
   }
   ```

## 🔗 Next Steps

After mastering routing:
- **Module b:** Learn data modeling with classes
- **Module c:** Add input validation with Joi
- **Module d:** Organize code with controllers
- **Module e:** Create reusable middlewares

## 📚 Additional Resources

- [Express.js Routing Guide](https://expressjs.com/en/guide/routing.html)
- [Express Router Documentation](https://expressjs.com/en/4x/api.html#router)
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [REST API Best Practices](https://restfulapi.net/)

---

**Ready to build more? Move to `b. data modeling with express.js`!**

