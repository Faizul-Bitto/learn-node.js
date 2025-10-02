# Node.js Server with Scripts and Nodemon - Complete Guide

## What You'll Learn

This guide covers essential concepts for Node.js development:

- Creating HTTP servers with ES modules
- Using environment variables for configuration
- Setting up npm scripts for development
- Using nodemon for automatic server restarts
- Modern Node.js project structure

---

## 1. Project Overview

This project demonstrates a basic HTTP server built with modern Node.js features:

- **ES Modules** (`import/export`) instead of CommonJS (`require`)
- **Environment variables** for configuration
- **Development scripts** with nodemon
- **Proper project structure** with package.json

### File Structure

```
d. server create + script + nodemon/
├── app.js              # Main server file
├── package.json        # Project configuration and scripts
├── package-lock.json   # Dependency lock file
├── .env               # Environment variables (not in git)
├── .env.example       # Example environment file
├── .gitignore         # Git ignore rules
└── node_modules/      # Dependencies (auto-generated)
```

---

## 2. Understanding ES Modules vs CommonJS

### Traditional CommonJS (Older Way)

```javascript
// Old way - CommonJS
const http = require('http');
module.exports = something;
```

### Modern ES Modules (Current Way)

```javascript
// Modern way - ES Modules
import http from 'http';
export default something;
```

**Key Differences:**

| Aspect | CommonJS | ES Modules |
|--------|----------|------------|
| Import | `require()` | `import` |
| Export | `module.exports` | `export` |
| File Extension | `.js` | `.js` with `"type": "module"` |
| Loading | Synchronous | Asynchronous |
| Browser Support | No | Yes |

**To enable ES modules in Node.js:**

Add this to your `package.json`:

```json
{
  "type": "module"
}
```

---

## 3. Creating the HTTP Server

### Basic Server Structure

```javascript
// app.js
import http from 'http';

const PORT = process.env.PORT;

const app = http.createServer((req, res) => {
    // Server logic here
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### Breaking Down the Server Code

#### 1. Importing the HTTP Module

```javascript
import http from 'http';
```

- Uses ES module syntax
- Imports Node.js built-in `http` module
- Equivalent to `const http = require('http')` in CommonJS

#### 2. Environment Variables

```javascript
const PORT = process.env.PORT;
```

- `process.env` contains all environment variables
- `PORT` will be read from the `.env` file
- Makes the server configurable without changing code

#### 3. Creating the Server

```javascript
const app = http.createServer((req, res) => {
    // Callback function runs for every request
});
```

- `http.createServer()` creates a new HTTP server
- Callback function receives `req` (request) and `res` (response) objects
- This function runs every time someone visits your server

#### 4. Setting Response Headers

```javascript
res.writeHead(200, { 'Content-Type': 'text/html' });
```

**What this does:**

- `200` - HTTP status code (success)
- `Content-Type: text/html` - Tells browser to expect HTML content

**Alternative methods:**

```javascript
// Method 1: Separate calls
res.statusCode = 200;
res.setHeader('Content-Type', 'text/html');

// Method 2: Combined (what we use)
res.writeHead(200, { 'Content-Type': 'text/html' });
```

#### 5. Sending the Response

```javascript
res.end("<h1>Hello World!</h1>");
```

- Sends the HTML content to the browser
- `res.end()` closes the connection
- Browser receives and renders the HTML

#### 6. Logging Request Information

```javascript
console.log(req.url);      // Shows the requested path
console.log(req.method);   // Shows HTTP method (GET, POST, etc.)
console.log(req.headers);  // Shows all request headers
```

**Example output:**

```
/
GET
{
  host: 'localhost:3000',
  connection: 'keep-alive',
  'user-agent': 'Mozilla/5.0...',
  accept: 'text/html,application/xhtml+xml...'
}
```

#### 7. Starting the Server

```javascript
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

- Starts the server on the specified port
- Callback function runs when server starts successfully
- Template literal (backticks) allows variable interpolation

---

## 4. Environment Variables with .env Files

### Why Use Environment Variables?

Environment variables allow you to:

- Keep sensitive data out of your code
- Use different settings for development/production
- Make your app configurable without code changes

### Setting Up Environment Variables

#### 1. Create `.env` file

```bash
# .env (your actual environment file)
PORT=3000
```

#### 2. Create `.env.example` file

```bash
# .env.example (template for other developers)
PORT=3000
```

#### 3. Add `.env` to `.gitignore`

```bash
# .gitignore
node_modules/
.env
```

**Why separate files?**

- `.env` - Contains your actual values (never commit to git)
- `.env.example` - Shows what variables are needed (safe to commit)

### Using Environment Variables in Code

```javascript
// Reading environment variables
const PORT = process.env.PORT || 3000; // Default to 3000 if not set
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`Running in ${NODE_ENV} mode on port ${PORT}`);
```

---

## 5. Package.json Configuration

### Complete package.json Explanation

```json
{
  "name": "server-script-nodemon",        // Project name
  "version": "1.0.0",                     // Version number
  "description": "",                      // Project description
  "license": "ISC",                       // License type
  "author": "",                           // Author name
  "type": "module",                       // Enable ES modules
  "main": "app.js",                       // Entry point file
  "scripts": {                            // Custom commands
    "start": "nodemon --env-file=.env app.js"
  },
  "devDependencies": {                    // Development dependencies
    "nodemon": "^3.1.10"
  }
}
```

### Key Properties Explained

#### `"type": "module"`

- Enables ES modules (`import/export`)
- Without this, Node.js uses CommonJS by default
- Required for modern JavaScript syntax

#### Scripts Section

```json
"scripts": {
  "start": "nodemon --env-file=.env app.js"
}
```

**What this does:**

- Creates a custom `npm start` command
- Uses nodemon to run the app
- `--env-file=.env` loads environment variables
- Automatically restarts server when files change

#### Dependencies vs DevDependencies

```json
"dependencies": {          // Needed in production
  "express": "^4.18.0"
},
"devDependencies": {       // Only needed for development
  "nodemon": "^3.1.10"
}
```

---

## 6. Nodemon: Development Made Easy

### What is Nodemon?

Nodemon is a development tool that:

- **Automatically restarts** your server when files change
- **Saves time** during development
- **Watches for changes** in your project files
- **Only for development** (not for production)

### Without Nodemon (Manual Process)

```bash
# Every time you change code:
node app.js           # Start server
# Make changes to code
Ctrl+C               # Stop server
node app.js          # Start server again
# Repeat forever...
```

### With Nodemon (Automatic Process)

```bash
npm start            # Start server with nodemon
# Make changes to code
# Server automatically restarts!
# Continue coding...
```

### Installing Nodemon

```bash
# Install as development dependency
npm install --save-dev nodemon

# Or install globally (optional)
npm install -g nodemon
```

### Nodemon Command Options

```bash
# Basic usage
nodemon app.js

# With environment file
nodemon --env-file=.env app.js

# Watch specific files/folders
nodemon --watch src/ app.js

# Ignore certain files
nodemon --ignore public/ app.js
```

---

## 7. Running the Server

### Step 1: Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`.

### Step 2: Set Up Environment

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your preferred port
# .env
PORT=3000
```

### Step 3: Start the Development Server

```bash
# Using the npm script
npm start

# Or directly with nodemon
nodemon --env-file=.env app.js
```

### Expected Output

```bash
Server is running on port 3000
```

### Step 4: Test the Server

1. **Open your browser**
2. **Navigate to:** `http://localhost:3000`
3. **You should see:** A page with "Hello World!" as a heading

### Watching the Logs

When you visit the server, you'll see request information in the terminal:

```bash
/                     # Requested URL
GET                   # HTTP method
{                     # Request headers
  host: 'localhost:3000',
  connection: 'keep-alive',
  // ... more headers
}
```

---

## 8. Common Development Workflow

### 1. Make Changes

Edit `app.js`:

```javascript
// Change the response
res.end("<h1>Hello from my updated server!</h1>");
```

### 2. See Automatic Restart

```bash
[nodemon] restarting due to changes...
[nodemon] starting `node --env-file=.env app.js`
Server is running on port 3000
```

### 3. Refresh Browser

Your changes appear immediately without manually restarting!

---

## 9. Expanding the Server

### Adding Different Routes

```javascript
const app = http.createServer((req, res) => {
    const url = req.url;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    if (url === '/') {
        res.end('<h1>Home Page</h1>');
    } else if (url === '/about') {
        res.end('<h1>About Page</h1>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page Not Found</h1>');
    }
});
```

### Adding Different Content Types

```javascript
if (url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello API!' }));
} else if (url === '/style.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end('body { background-color: lightblue; }');
}
```

---

## 10. Best Practices

### Project Structure

```
server-project/
├── src/
│   ├── app.js          # Main server file
│   ├── routes/         # Route handlers
│   └── utils/          # Utility functions
├── public/             # Static files
├── .env               # Environment variables
├── .env.example       # Environment template
├── .gitignore         # Git ignore rules
├── package.json       # Project configuration
└── README.md          # Documentation
```

### Environment Management

```javascript
// Use defaults for missing environment variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Validate required environment variables
if (!process.env.PORT) {
    console.error('PORT environment variable is required');
    process.exit(1);
}
```

### Error Handling

```javascript
const app = http.createServer((req, res) => {
    try {
        // Your server logic here
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello World!</h1>');
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Internal Server Error</h1>');
    }
});
```

### Graceful Shutdown

```javascript
// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
```

---

## 11. Next Steps

After mastering this basic server setup, you can explore:

1. **Express.js** - More powerful web framework
2. **Template engines** - EJS, Handlebars for dynamic HTML
3. **Databases** - MongoDB, PostgreSQL integration
4. **Authentication** - User login/logout systems
5. **REST APIs** - Building proper API endpoints
6. **WebSockets** - Real-time communication
7. **Testing** - Jest, Mocha for testing your server

---

## 12. Troubleshooting

### Common Issues

#### Port Already in Use

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

```bash
# Kill process using the port
lsof -ti:3000 | xargs kill -9    # macOS/Linux
netstat -ano | findstr :3000     # Windows
```

#### Environment Variables Not Loading

- Check `.env` file exists
- Verify the `--env-file=.env` flag in package.json
- Ensure no spaces around the `=` in `.env`

#### ES Module Errors

```bash
SyntaxError: Cannot use import statement outside a module
```

**Solution:**

Add `"type": "module"` to your `package.json`.

#### Nodemon Not Found

```bash
'nodemon' is not recognized as an internal or external command
```

**Solution:**

```bash
npm install --save-dev nodemon
```

---

## Summary

This project demonstrates:

- ✅ **Modern ES modules** with `import/export`
- ✅ **Environment variable** configuration
- ✅ **Development automation** with nodemon
- ✅ **Basic HTTP server** creation
- ✅ **Proper project structure** with package.json
- ✅ **Development workflow** optimization

You now have a solid foundation for building Node.js servers with modern development practices!