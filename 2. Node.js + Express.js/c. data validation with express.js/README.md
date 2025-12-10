# Data Validation with Express.js - Complete Guide

## 📚 Overview

This module demonstrates two approaches to data validation in Express.js: manual validation and schema-based validation using Joi. You'll learn why validation is crucial, how to implement it, and best practices for validating user input.

## 🎯 What You'll Learn

- Why data validation is important
- Manual validation approach
- Schema-based validation with Joi
- Creating validation schemas
- Handling validation errors
- Comparing validation approaches
- Best practices for input validation

## 📁 Project Structure

```
c. data validation with express.js/
├── index.js          # Main application file
├── user.js           # User routes with validation
├── package.json      # Dependencies (includes Joi)
└── README.md         # This file
```

## 🔑 Key Concepts

### Why Validate Data?

1. **Security** - Prevent malicious input
2. **Data Integrity** - Ensure data meets requirements
3. **User Experience** - Provide clear error messages
4. **Application Stability** - Prevent crashes from invalid data
5. **Database Safety** - Protect database from invalid entries

### Two Validation Approaches

This module demonstrates both:

1. **Manual Validation** - Writing validation logic yourself
2. **Schema Validation** - Using Joi library for validation

## 📝 Code Examples

### Approach 1: Manual Validation

```javascript
router.post('/users', (req, res) => {
  const { name, age, address } = req.body;
  
  // Check if all fields exist
  if (!name || !age || !address) {
    return res.status(400).json({ 
      error: "All fields (name, age, address) are required." 
    });
  }
  
  // Validate name
  if (typeof name !== 'string' || name.length < 3 || name.length > 100) {
    return res.status(400).json({ 
      error: "Name must be string and length should be between 3 to 100." 
    });
  }
  
  // Validate age
  if (typeof age !== 'number' || age <= 0) {
    return res.status(400).json({ 
      error: "Age must be a non-zero positive number." 
    });
  }
  
  // Validate address
  if (typeof address !== 'string' || address.length < 5) {
    return res.status(400).json({ 
      error: "Address must be string and length should be more than 5." 
    });
  }
  
  // If validation passes, create user
  const user = new User(req.body);
  res.status(201).json({
    message: "User created successfully",
    data: user
  });
});
```

**Pros:**
- Full control over validation logic
- No external dependencies
- Simple for basic cases

**Cons:**
- Verbose and repetitive
- Hard to maintain
- Easy to miss edge cases
- Inconsistent error messages

### Approach 2: Schema-Based Validation with Joi

```javascript
const Joi = require('joi');

// Define validation schema
const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  age: Joi.number().positive().required(),
  address: Joi.string().min(5).required(),
});

router.post('/users/v2', (req, res) => {
  // Validate request body against schema
  const { error } = userSchema.validate(req.body);
  
  // If validation fails, return error
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  
  // If validation passes, create user
  const user = new User(req.body);
  
  res.status(201).json({
    message: "User created successfully",
    data: user
  });
});
```

**Pros:**
- Clean and readable
- Comprehensive validation rules
- Consistent error messages
- Easy to maintain and reuse
- Less code

**Cons:**
- Requires external dependency
- Learning curve for schema syntax

## 🚀 Complete Example

### user.js

```javascript
const express = require('express');
const Joi = require('joi');
const router = express.Router();

// User model class
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

// POST /users - Manual validation
router.post('/users', (req, res) => {
  const user = new User(req.body);
  const { name, age, address } = req.body;

  // Manual validation
  if (!name || !age || !address) {
    return res.status(400).json({ 
      error: "All fields (name, age, address) are required." 
    });
  }

  if (typeof name !== 'string' || name.length < 3 || name.length > 100) {
    return res.status(400).json({ 
      error: "Name must be string and length should be between 3 to 100." 
    });
  }

  if (typeof age !== 'number' || age <= 0) {
    return res.status(400).json({ 
      error: "Age must be a non-zero positive number." 
    });
  }

  if (typeof address !== 'string' || address.length < 5) {
    return res.status(400).json({ 
      error: "Address must be string and length should be more than 5." 
    });
  }

  res.status(201).json({
    message: "User created successfully",
    data: user
  });
});

// POST /users/v2 - Joi schema validation
const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  age: Joi.number().positive().required(),
  address: Joi.string().min(5).required(),
});

router.post('/users/v2', (req, res) => {
  // Validate request body
  const { error } = userSchema.validate(req.body);

  // If validation fails
  if (error) {
    return res.status(400).json({ error: error.details });
  }

  // Create user if validation passes
  const user = new User(req.body);

  res.status(201).json({
    message: "User created successfully",
    data: user
  });
});

module.exports = router;
```

## 🧪 Testing the API

### Test Manual Validation Endpoint

```bash
# Valid request
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 30,
    "address": "123 Main Street"
  }'

# Invalid request (missing field)
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "age": 30
  }'
```

### Test Joi Validation Endpoint

```bash
# Valid request
curl -X POST http://localhost:3000/users/v2 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 30,
    "address": "123 Main Street"
  }'

# Invalid request (age is negative)
curl -X POST http://localhost:3000/users/v2 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": -5,
    "address": "123 Main Street"
  }'
```

## 💡 Joi Schema Syntax

### Basic Types

```javascript
const schema = Joi.object({
  // String validation
  name: Joi.string().min(3).max(100).required(),
  
  // Number validation
  age: Joi.number().positive().required(),
  
  // Email validation
  email: Joi.string().email().required(),
  
  // Boolean
  isActive: Joi.boolean(),
  
  // Array
  tags: Joi.array().items(Joi.string()),
  
  // Object
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required()
  })
});
```

### Common Validation Rules

```javascript
Joi.string()
  .min(3)              // Minimum length
  .max(100)            // Maximum length
  .required()          // Field is required
  .optional()          // Field is optional
  .email()             // Must be valid email
  .alphanum()          // Only alphanumeric
  .pattern(/^[A-Z]/)   // Custom regex pattern

Joi.number()
  .positive()          // Must be positive
  .integer()           // Must be integer
  .min(0)              // Minimum value
  .max(100)            // Maximum value

Joi.array()
  .items(Joi.string()) // Array of strings
  .min(1)              // Minimum items
  .max(10)             // Maximum items
```

## 🎓 Best Practices

### 1. Use Joi for Complex Validation

```javascript
// ✅ Good: Use Joi
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/[A-Z]/).required()
});

// ❌ Avoid: Manual validation for complex cases
if (!email.includes('@')) { /* ... */ }
```

### 2. Create Reusable Schemas

```javascript
// schemas/userSchema.js
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  age: Joi.number().positive().required(),
  address: Joi.string().min(5).required(),
});

module.exports = { userSchema };
```

### 3. Customize Error Messages

```javascript
const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Name must be at least 3 characters',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),
});
```

### 4. Validate Early

```javascript
// ✅ Good: Validate before processing
router.post('/users', (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  
  // Process valid data
});

// ❌ Avoid: Processing before validation
router.post('/users', (req, res) => {
  // Process data first
  const user = new User(req.body);
  // Then validate (too late!)
});
```

## 🔍 Error Handling

### Joi Error Structure

```javascript
{
  error: {
    details: [
      {
        message: '"name" length must be at least 3 characters long',
        path: ['name'],
        type: 'string.min',
        context: { limit: 3, value: 'Jo', label: 'name' }
      }
    ]
  }
}
```

### Custom Error Response

```javascript
router.post('/users/v2', (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  
  if (error) {
    // Format error messages
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    return res.status(400).json({ 
      errors 
    });
  }
  
  // Process valid data
});
```

## ⚠️ Common Mistakes

1. **Not validating at all**
   ```javascript
   // ❌ Dangerous: No validation
   router.post('/users', (req, res) => {
     const user = new User(req.body);
     // Save to database without validation
   });
   ```

2. **Incomplete validation**
   ```javascript
   // ❌ Missing type checks
   if (!name) { /* ... */ }
   // Should also check: typeof name === 'string'
   ```

3. **Not returning after error**
   ```javascript
   // ❌ Code continues after error
   if (error) {
     res.status(400).json({ error });
   }
   res.status(201).json({ success: true }); // Still executes!
   
   // ✅ Use return
   if (error) {
     return res.status(400).json({ error });
   }
   ```

## 🔗 Next Steps

After mastering validation:
- **Module d:** Organize validation in controllers
- Learn about middleware validation
- Explore advanced Joi features
- Implement database validation
- Add validation for file uploads

## 📚 Additional Resources

- [Joi Documentation](https://joi.dev/api/)
- [Joi Validation Examples](https://github.com/sideway/joi/blob/master/API.md)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Input Validation Guide](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/README)

---

**Ready to organize your code? Move to `d. controllers with express.js`!**

