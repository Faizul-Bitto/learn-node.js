# User-Agent Tracking with File Logger - Complete Guide

## 📚 Overview

This module demonstrates an advanced middleware implementation that combines User-Agent validation with file-based logging. You'll learn how to save request data to JSON files, create utility functions, and build a complete middleware stack with logging capabilities.

## 🎯 What You'll Learn

- Advanced middleware composition
- File system operations in middleware
- JSON file logging
- Creating utility functions
- Blocking suspicious User-Agents
- Complete middleware stack
- Data persistence patterns

## 📁 Project Structure

```
g. middlewares - user-agent tracking with logger in a file/
├── index.js                    # Main application file
├── routes/
│   └── user.js                 # User routes
├── controller/
│   └── UserController.js       # User controller
├── middleware/
│   ├── IsValid.js              # Token validation middleware
│   └── CheckUserAgent.js       # User-Agent validation + logging
├── utils/
│   └── logger.js               # File logging utility
├── model/
│   └── schema/
│       └── User.js             # User validation schema
├── users.js                    # Sample data
├── userAgent.json              # Logged User-Agents (generated)
├── package.json
└── README.md
```

## 🔑 Key Concepts

### Complete Middleware Stack

This module demonstrates a production-ready middleware setup:

```
Request → isValid → checkUserAgent → Routes → Response
           ↓              ↓
        Validates    Validates + Logs
        Token        User-Agent
```

### File Logging

User-Agent strings are logged to a JSON file for:
- Analytics
- Security monitoring
- Request tracking
- Debugging

### Utility Functions

Separate logging logic into reusable utilities:
- Keeps middleware clean
- Reusable across the application
- Easier to test

## 📝 Code Examples

### Logger Utility

**utils/logger.js:**

```javascript
const fs = require('fs');
const path = require('path');

// Path to log file
const userAgentFile = path.join(__dirname, '../userAgent.json');

// Function to save User-Agent to file
exports.saveUserAgent = (agentString) => {
  let data = [];

  // Check if file exists
  if (fs.existsSync(userAgentFile)) {
    // Read existing data
    const raw = fs.readFileSync(userAgentFile);
    data = JSON.parse(raw);
  }

  // Add new User-Agent
  data.push(agentString);

  // Write back to file
  fs.writeFileSync(userAgentFile, JSON.stringify(data, null, 2));
};
```

**Key Points:**
- Uses `fs` module for file operations
- Reads existing data if file exists
- Appends new entry to array
- Writes formatted JSON back to file

### Enhanced User-Agent Middleware

**middleware/CheckUserAgent.js:**

```javascript
const { saveUserAgent } = require('../utils/logger');

exports.checkUserAgent = (req, res, next) => {
  // Get User-Agent header
  const userAgent = req.headers['user-agent'];

  // List of blocked/suspicious patterns
  const blockedPatterns = [
    /curl/i,              // cURL
    /wget/i,              // wget
    /python-requests/i,   // Python requests library
    /Go-http-client/i,    // Go HTTP client
    /Java/i,              // Java HTTP clients
    /sqlmap/i,            // SQL injection tool
    /nmap/i,              // Network scanner
    /Nikto/i,             // Web scanner
    /HeadlessChrome/i,    // Headless browser
    /PhantomJS/i          // Headless browser
  ];

  // Check if User-Agent matches any blocked pattern
  const isBlocked = blockedPatterns.some((pattern) => 
    pattern.test(userAgent)
  );

  // Log the User-Agent
  console.log(`The agent is ${userAgent}`);

  // Save to file (always log, even if blocked)
  saveUserAgent(userAgent);

  // Validate User-Agent
  if (!userAgent || isBlocked) {
    return res.status(403).json({
      message: "Forbidden: Suspicious User-Agent"
    });
  }

  // User-Agent is valid - continue
  next();
};
```

**Key Features:**
- Reads User-Agent header
- Checks against blocked patterns using regex
- Logs to console
- Saves to JSON file
- Blocks suspicious agents
- Allows valid browsers through

### Main Application

**index.js:**

```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const { isValid } = require('./middleware/IsValid');
const { checkUserAgent } = require('./middleware/CheckUserAgent');

app.use(express.json());

// Apply middleware chain
app.use('/api', isValid, checkUserAgent, userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## 🚀 Complete Example

### Logger Utility Breakdown

```javascript
// utils/logger.js
const fs = require('fs');
const path = require('path');

const userAgentFile = path.join(__dirname, '../userAgent.json');

exports.saveUserAgent = (agentString) => {
  let data = [];

  // Step 1: Check if file exists
  if (fs.existsSync(userAgentFile)) {
    // Step 2: Read existing data
    const raw = fs.readFileSync(userAgentFile);
    data = JSON.parse(raw);
  }

  // Step 3: Add new entry
  data.push(agentString);

  // Step 4: Write back to file (formatted JSON)
  fs.writeFileSync(userAgentFile, JSON.stringify(data, null, 2));
};
```

**How it works:**
1. Checks if `userAgent.json` exists
2. If exists, reads and parses JSON
3. Adds new User-Agent to array
4. Writes formatted JSON back to file

### Generated Log File

**userAgent.json** (after several requests):

```json
[
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
]
```

## 🧪 Testing the Middleware

### Valid Browser Request

```bash
curl "http://localhost:3000/api/users?token=123" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
```

**Result:**
- ✅ Request succeeds
- ✅ User-Agent logged to `userAgent.json`
- ✅ Console shows: "The agent is Mozilla/5.0..."

### Blocked cURL Request

```bash
curl "http://localhost:3000/api/users?token=123"
```

**Result:**
- ❌ Request blocked (403 Forbidden)
- ✅ User-Agent still logged (for security tracking)
- ✅ Response: `{"message": "Forbidden: Suspicious User-Agent"}`

### Blocked Python Request

```bash
curl "http://localhost:3000/api/users?token=123" \
  -H "User-Agent: python-requests/2.28.0"
```

**Result:**
- ❌ Request blocked
- ✅ Logged to file for monitoring

## 💡 Best Practices

### 1. Separate Concerns

```javascript
// ✅ Good: Utility function for logging
const { saveUserAgent } = require('../utils/logger');
saveUserAgent(userAgent);

// ❌ Avoid: File operations in middleware
const fs = require('fs');
fs.writeFileSync('log.json', userAgent);
```

### 2. Always Log, Even if Blocked

```javascript
// ✅ Good: Log before blocking
saveUserAgent(userAgent);
if (isBlocked) {
  return res.status(403).json({ error: 'Blocked' });
}

// ❌ Avoid: Only log allowed requests
if (isAllowed) {
  saveUserAgent(userAgent);
}
```

### 3. Use Regex Patterns for Blocking

```javascript
// ✅ Good: Flexible pattern matching
const blockedPatterns = [
  /curl/i,
  /wget/i,
  /python-requests/i
];

// ❌ Avoid: Exact string matching
if (userAgent === 'curl') { /* ... */ }
```

### 4. Handle File Errors Gracefully

```javascript
// ✅ Good: Error handling
exports.saveUserAgent = (agentString) => {
  try {
    let data = [];
    if (fs.existsSync(userAgentFile)) {
      const raw = fs.readFileSync(userAgentFile);
      data = JSON.parse(raw);
    }
    data.push(agentString);
    fs.writeFileSync(userAgentFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving user agent:', error);
    // Don't throw - logging failure shouldn't break the app
  }
};
```

## 🔍 Advanced Patterns

### Async File Operations

```javascript
// Using async/await for better performance
const fs = require('fs').promises;
const path = require('path');

const userAgentFile = path.join(__dirname, '../userAgent.json');

exports.saveUserAgent = async (agentString) => {
  try {
    let data = [];
    
    try {
      const raw = await fs.readFile(userAgentFile, 'utf8');
      data = JSON.parse(raw);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }
    
    data.push({
      agent: agentString,
      timestamp: new Date().toISOString()
    });
    
    await fs.writeFile(
      userAgentFile, 
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error('Error saving user agent:', error);
  }
};
```

### Enhanced Logging with Metadata

```javascript
exports.saveUserAgent = (agentString, req) => {
  let data = [];
  
  if (fs.existsSync(userAgentFile)) {
    const raw = fs.readFileSync(userAgentFile);
    data = JSON.parse(raw);
  }
  
  // Log with additional metadata
  data.push({
    agent: agentString,
    ip: req.ip,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  fs.writeFileSync(userAgentFile, JSON.stringify(data, null, 2));
};
```

### Rate Limiting by User-Agent

```javascript
exports.checkUserAgent = (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  
  // Check rate limit for this User-Agent
  const rateLimit = checkRateLimit(userAgent);
  if (rateLimit.exceeded) {
    return res.status(429).json({
      message: 'Too many requests from this client'
    });
  }
  
  saveUserAgent(userAgent);
  next();
};
```

## ⚠️ Common Mistakes

1. **Synchronous file operations blocking requests**
   ```javascript
   // ⚠️ Warning: Can slow down requests
   fs.writeFileSync(userAgentFile, data);
   
   // ✅ Better: Use async or don't wait
   fs.writeFile(userAgentFile, data, () => {});
   ```

2. **Not handling file errors**
   ```javascript
   // ❌ Bad: Can crash app
   const data = JSON.parse(fs.readFileSync(file));
   
   // ✅ Good: Handle errors
   try {
     const data = JSON.parse(fs.readFileSync(file));
   } catch (error) {
     // Handle error
   }
   ```

3. **Logging sensitive data**
   ```javascript
   // ❌ Bad: Logging passwords
   saveUserAgent(req.body.password);
   
   // ✅ Good: Only log safe data
   saveUserAgent(req.headers['user-agent']);
   ```

## 🔗 Next Steps

After mastering file logging:
- Learn about database logging
- Implement log rotation
- Explore structured logging (Winston, Pino)
- Add log analysis tools
- Learn about monitoring and alerting

## 📚 Additional Resources

- [Node.js File System (fs) Module](https://nodejs.org/api/fs.html)
- [JSON File Operations](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)
- [Logging Best Practices](https://www.loggly.com/ultimate-guide/node-logging-basics/)

---

**Congratulations! You've completed the Express.js middleware series!**

