# Controllers with Express.js - Complete Guide

## 📚 Overview

This module demonstrates the MVC (Model-View-Controller) architecture pattern in Express.js. You'll learn how to separate business logic from routes by creating controllers, making your code more organized, maintainable, and testable.

## 🎯 What You'll Learn

- Understanding MVC architecture
- Creating controllers
- Separating routes from business logic
- Organizing project structure
- Controller function patterns
- Integrating models and schemas with controllers
- Best practices for controller design

## 📁 Project Structure

```
d. controllers with express.js/
├── index.js                    # Main application file
├── routes/
│   └── user.js                 # User routes (defines endpoints)
├── controller/
│   └── UserController.js       # User controller (business logic)
├── model/
│   └── schema/
│       └── User.js             # User validation schema
├── users.js                    # Sample data (mock database)
├── package.json
└── README.md
```

## 🔑 Key Concepts

### What is MVC?

**MVC (Model-View-Controller)** is an architectural pattern that separates an application into three components:

- **Model** - Data structure and business logic
- **View** - Presentation layer (in APIs, this is JSON responses)
- **Controller** - Handles requests, processes data, returns responses

### Why Use Controllers?

1. **Separation of Concerns** - Routes define URLs, controllers handle logic
2. **Reusability** - Controller functions can be reused
3. **Testability** - Easier to test business logic separately
4. **Maintainability** - Code is organized and easier to understand
5. **Scalability** - Easy to add new features

### Architecture Flow

```
Request → Route → Controller → Model → Response
```

## 📝 Code Examples

### Project Structure Breakdown

#### 1. Routes (routes/user.js)

Routes define the endpoints and map them to controller functions:

```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

// Map routes to controller functions
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);

module.exports = router;
```

**Key Points:**
- Routes only define URLs and HTTP methods
- Routes delegate to controller functions
- No business logic in routes

#### 2. Controller (controller/UserController.js)

Controllers contain the business logic:

```javascript
const { userSchema } = require('../model/schema/User');
const users = require('../users');

// User model class
class User {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// Controller functions
exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

exports.getUserById = (req, res) => {
  const userID = req.params.id;

  if (!userID) {
    return res.status(404).json({ message: "User not found" });
  }
  
  res.status(200).json(users);
};

exports.createUser = (req, res) => {
  // Validate request body
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ 
      message: error.details[0].message 
    });
  }

  // Create user instance
  const newUser = new User(req.body);

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
};
```

**Key Points:**
- Controllers handle request/response
- Business logic lives here
- Validation happens in controllers
- Models are instantiated here

#### 3. Schema (model/schema/User.js)

Validation schemas define data structure:

```javascript
const Joi = require('joi');

exports.userSchema = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
});
```

#### 4. Data (users.js)

Sample data (in real apps, this would be a database):

```javascript
const users = [
  {
    id: 1,
    name: "John",
    email: "john@gmail.com"
  },
  {
    id: 2,
    name: "Jane",
    email: "jane@gmail.com"
  },
  {
    id: 3,
    name: "Jim",
    email: "jim@gmail.com"
  },
];

module.exports = users;
```

#### 5. Main App (index.js)

Ties everything together:

```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');

app.use(express.json());

// Mount routes
app.use('/api', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## 🚀 Complete Example

### Controller Function Pattern

```javascript
// Standard controller function signature
exports.functionName = (req, res) => {
  // 1. Extract data from request
  const { param1, param2 } = req.body;
  const { id } = req.params;
  
  // 2. Validate data (if needed)
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  
  // 3. Process business logic
  const result = processData(param1, param2);
  
  // 4. Return response
  res.status(200).json({ data: result });
};
```

### Example: Get All Users

```javascript
exports.getAllUsers = (req, res) => {
  try {
    // Business logic: Get all users
    const allUsers = users;
    
    // Return response
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users',
      error: error.message 
    });
  }
};
```

### Example: Get User by ID

```javascript
exports.getUserById = (req, res) => {
  try {
    const userID = parseInt(req.params.id);
    
    // Validate ID
    if (!userID) {
      return res.status(400).json({ 
        message: "Invalid user ID" 
      });
    }
    
    // Find user
    const user = users.find(u => u.id === userID);
    
    if (!user) {
      return res.status(404).json({ 
        message: "User not found" 
      });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user',
      error: error.message 
    });
  }
};
```

### Example: Create User

```javascript
exports.createUser = (req, res) => {
  try {
    // Validate request body
    const { error } = userSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        message: error.details[0].message 
      });
    }
    
    // Create user instance
    const newUser = new User(req.body);
    
    // In real app: Save to database
    // await userService.create(newUser);
    
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
};
```

## 🧪 Testing the API

### Get All Users

```bash
curl http://localhost:3000/api/users
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John",
    "email": "john@gmail.com"
  },
  {
    "id": 2,
    "name": "Jane",
    "email": "jane@gmail.com"
  }
]
```

### Get User by ID

```bash
curl http://localhost:3000/api/users/1
```

### Create User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": 4,
    "name": "Alice",
    "email": "alice@example.com"
  }'
```

## 💡 Best Practices

### 1. Keep Controllers Thin

```javascript
// ✅ Good: Controller delegates to service
exports.createUser = async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).json(user);
};

// ❌ Avoid: Business logic in controller
exports.createUser = (req, res) => {
  // Complex database operations
  // Business rules
  // Multiple validations
  // etc.
};
```

### 2. Use Consistent Response Format

```javascript
// ✅ Good: Consistent format
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
    count: users.length
  });
};

// ❌ Avoid: Inconsistent formats
exports.getAllUsers = (req, res) => {
  res.json(users); // Sometimes
};

exports.getUser = (req, res) => {
  res.send({ user: user }); // Different format
};
```

### 3. Handle Errors Properly

```javascript
// ✅ Good: Try-catch with proper error handling
exports.createUser = async (req, res) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
};
```

### 4. Use Async/Await for Async Operations

```javascript
// ✅ Good: Async/await
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 5. Validate Before Processing

```javascript
// ✅ Good: Validate early
exports.createUser = (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  // Process valid data
};
```

## 🔍 Controller vs Route Comparison

| Aspect | Route | Controller |
|--------|-------|------------|
| **Purpose** | Define URLs | Handle logic |
| **Location** | `routes/` | `controller/` |
| **Content** | URL patterns | Business logic |
| **Size** | Small | Can be larger |
| **Reusability** | Route-specific | Reusable |

## 🎓 Advanced Patterns

### Controller with Service Layer

```javascript
// controller/UserController.js
const userService = require('../service/UserService');

exports.getAllUsers = async (req, res) => {
  const users = await userService.findAll();
  res.status(200).json(users);
};

// service/UserService.js
const User = require('../model/User');
const users = require('../users');

exports.findAll = async () => {
  return users;
};

exports.create = async (userData) => {
  const user = new User(userData);
  // Save to database
  return user;
};
```

### Multiple Controllers

```javascript
// controller/UserController.js
exports.getAllUsers = (req, res) => { /* ... */ };

// controller/ProductController.js
exports.getAllProducts = (req, res) => { /* ... */ };

// controller/OrderController.js
exports.getAllOrders = (req, res) => { /* ... */ };
```

## ⚠️ Common Mistakes

1. **Putting business logic in routes**
   ```javascript
   // ❌ Bad: Logic in route
   router.post('/users', (req, res) => {
     // Validation
     // Business logic
     // Database operations
   });
   
   // ✅ Good: Logic in controller
   router.post('/users', userController.createUser);
   ```

2. **Not handling errors**
   ```javascript
   // ❌ Bad: No error handling
   exports.createUser = (req, res) => {
     const user = new User(req.body);
     res.json(user); // What if error?
   };
   ```

3. **Inconsistent response format**
   ```javascript
   // ❌ Bad: Different formats
   res.json(users);
   res.send({ data: user });
   res.status(200).json({ result: data });
   ```

## 🔗 Next Steps

After mastering controllers:
- **Module e:** Learn about middlewares
- Implement service layer
- Add error handling middleware
- Learn about dependency injection
- Explore testing controllers

## 📚 Additional Resources

- [MVC Pattern Explained](https://developer.mozilla.org/en-US/docs/Glossary/MVC)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Project Structure](https://github.com/goldbergyoni/nodebestpractices)

---

**Ready for middlewares? Move to `e. middlewares`!**

