# Data Modeling with Express.js - Complete Guide

## 📚 Overview

This module demonstrates how to create data models using JavaScript classes in Express.js applications. You'll learn to structure your data, create reusable model classes, and instantiate objects from request data.

## 🎯 What You'll Learn

- Creating data model classes
- Using constructors for data initialization
- Instantiating objects from request data
- Organizing data models
- Model validation basics
- Object-oriented patterns in Express.js

## 📁 Project Structure

```
b. data modeling with express.js/
├── index.js          # Main application file
├── user.js           # User routes with User model
├── payment.js        # Payment routes (if exists)
├── package.json      # Dependencies
└── README.md         # This file
```

## 🔑 Key Concepts

### What is a Data Model?

A data model is a structure that represents your application's data. In this module, we use JavaScript classes to define models.

**Example:**
```javascript
class User {
  constructor({ name, age, address }) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}
```

### Why Use Data Models?

1. **Structure** - Ensures consistent data format
2. **Reusability** - Use the same model in multiple places
3. **Type Safety** - Define expected properties
4. **Validation** - Can add validation logic
5. **Organization** - Keeps code organized

## 📝 Code Examples

### User Model Class

```javascript
class User {
  constructor({ name, age, address }) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}
```

**Breaking it down:**
- `class User` - Defines a User class
- `constructor()` - Called when creating a new User instance
- `{ name, age, address }` - Destructured parameters
- `this.name = name` - Assigns properties to the instance

### Using the Model in Routes

```javascript
const express = require('express');
const router = express.Router();

// Define the User class
class User {
  constructor({ name, age, address }) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}

// GET route
router.get('/user/:id', (req, res) => {
  const userID = req.params.id;
  const filter = req.query.filter;
  
  res.status(200).send(`User ID : ${userID} and filter : ${filter}`);
});

// POST route - Create user using model
router.post('/users', (req, res) => {
  // Create User instance from request body
  const user = new User(req.body);
  
  // Return the created user
  res.status(201).json({
    message: "User created successfully",
    data: user
  });
});

module.exports = router;
```

## 🚀 Complete Example

### user.js

```javascript
const express = require('express');
const router = express.Router();

// User data model class
class User {
  constructor({ name, age, address }) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}

// GET /user/:id
router.get('/user/:id', (req, res) => {
  const userID = req.params.id;
  const filter = req.query.filter;
  
  res.status(200).send(`User ID : ${userID} and filter : ${filter}`);
});

// POST /users - Create a new user
router.post('/users', (req, res) => {
  // Instantiate User from request body
  const user = new User(req.body);
  
  res.status(201).json({
    message: "User created successfully",
    data: user
  });
});

module.exports = router;
```

### index.js

```javascript
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const userRoutes = require('./user');

// Use routes
app.use(userRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## 🧪 Testing the API

### Create a User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 30,
    "address": "123 Main St, City, Country"
  }'
```

**Expected Response:**
```json
{
  "message": "User created successfully",
  "data": {
    "name": "John Doe",
    "age": 30,
    "address": "123 Main St, City, Country"
  }
}
```

## 💡 Best Practices

### 1. Separate Model Classes

Create a separate file for models:

**models/User.js:**
```javascript
class User {
  constructor({ name, age, address }) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}

module.exports = User;
```

**user.js:**
```javascript
const User = require('./models/User');

router.post('/users', (req, res) => {
  const user = new User(req.body);
  res.status(201).json({ data: user });
});
```

### 2. Add Methods to Models

```javascript
class User {
  constructor({ name, age, address }) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
  
  // Instance method
  getFullInfo() {
    return `${this.name}, ${this.age} years old, lives at ${this.address}`;
  }
  
  // Validation method
  isValid() {
    return this.name && this.age > 0 && this.address;
  }
}
```

### 3. Use Default Values

```javascript
class User {
  constructor({ name, age, address, status = 'active' }) {
    this.name = name;
    this.age = age;
    this.address = address;
    this.status = status; // Default value
  }
}
```

## 🔍 Understanding the Constructor

### Destructuring Parameters

```javascript
// Instead of:
constructor(data) {
  this.name = data.name;
  this.age = data.age;
  this.address = data.address;
}

// Use destructuring:
constructor({ name, age, address }) {
  this.name = name;
  this.age = age;
  this.address = address;
}
```

### Object Instantiation

```javascript
// Request body
const requestData = {
  name: "John",
  age: 30,
  address: "123 Main St"
};

// Create User instance
const user = new User(requestData);

// user object now has:
// {
//   name: "John",
//   age: 30,
//   address: "123 Main St"
// }
```

## 🎓 Advanced Patterns

### Multiple Models

```javascript
// User model
class User {
  constructor({ name, age, address }) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}

// Payment model
class Payment {
  constructor({ amount, currency, userId }) {
    this.amount = amount;
    this.currency = currency;
    this.userId = userId;
    this.createdAt = new Date();
  }
}
```

### Model with Relationships

```javascript
class User {
  constructor({ name, age, address, payments = [] }) {
    this.name = name;
    this.age = age;
    this.address = address;
    this.payments = payments.map(p => new Payment(p));
  }
}
```

## ⚠️ Common Mistakes

1. **Not using new keyword**
   ```javascript
   // ❌ Wrong
   const user = User(req.body);
   
   // ✅ Correct
   const user = new User(req.body);
   ```

2. **Missing properties in constructor**
   ```javascript
   // ❌ Properties not assigned
   class User {
     constructor({ name, age }) {
       // Missing assignment
     }
   }
   
   // ✅ Correct
   class User {
     constructor({ name, age }) {
       this.name = name;
       this.age = age;
     }
   }
   ```

## 🔗 Next Steps

After mastering data modeling:
- **Module c:** Add validation with Joi
- **Module d:** Organize with controllers
- Learn about databases (MongoDB, PostgreSQL)
- Implement data persistence

## 📚 Additional Resources

- [JavaScript Classes (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Object-Oriented Programming in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Ready for validation? Move to `c. data validation with express.js`!**

