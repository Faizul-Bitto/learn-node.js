# Node.js Events Module - Complete Guide

This directory demonstrates the usage of Node.js built-in `events` module, which is the foundation of Node.js's event-driven architecture. Node.js is built around an event-driven, non-blocking I/O model, making events essential for building scalable applications.

## 📁 Directory Structure

```
iv. events module/
├── index.js                    # Basic event emitter examples
├── event raising externally/   # External event emitter pattern
│   ├── raiseEvent.js          # Custom EventEmitter class
│   ├── listenEvent.js         # Event listener implementation
│   └── README.md              # Detailed external events guide
└── README.md                  # This comprehensive guide
```

## 🎯 What You'll Learn

- **Event-driven programming** fundamentals
- **EventEmitter class** usage and methods
- **Event listeners** and **event emission**
- **Custom EventEmitter classes** with inheritance
- **External event handling** across multiple files
- **Asynchronous event patterns** with timing control

---

## 1. Understanding Events in Node.js

### What is Event-Driven Programming?

Event-driven programming is a programming paradigm where the flow of the program is determined by events such as user actions, sensor outputs, or messages from other programs.

**Key Concepts:**

- **Event**: Something that happens (user clicks, file is read, timer expires)
- **Event Emitter**: Object that can emit events
- **Event Listener**: Function that responds to events
- **Event Handler**: Code that executes when an event occurs

### Why Events Matter in Node.js

```javascript
// Traditional synchronous approach (blocking)
console.log("Start");
const data = readFileSync("large-file.txt"); // Blocks here
console.log("File read complete");
console.log("End");

// Event-driven approach (non-blocking)
console.log("Start");
readFile("large-file.txt", (err, data) => {
  console.log("File read complete");
});
console.log("End");
// Output: Start, End, File read complete
```

**Benefits:**

- **Non-blocking**: Doesn't freeze the application
- **Scalable**: Can handle many concurrent operations
- **Responsive**: Application remains interactive
- **Modular**: Components communicate through events

---

## 2. Basic EventEmitter Usage

### Getting Started

```javascript
const EventEmitter = require("events");

// Create an instance
const eventEmitter = new EventEmitter();
```

### Core Methods

#### 1. `.on(eventName, listener)` - Register Event Listener

```javascript
// Listen for a specific event
eventEmitter.on("bellRing", () => {
  console.log("Bell is ringing!");
});
```

#### 2. `.emit(eventName[, ...args])` - Emit an Event

```javascript
// Emit the event (triggers all listeners)
eventEmitter.emit("bellRing");
```

#### 3. Complete Basic Example

```javascript
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

// Register listener BEFORE emitting
eventEmitter.on("bellRing", () => {
  console.log("Bell is ringing!");
});

// Emit after 2 seconds
setTimeout(() => {
  eventEmitter.emit("bellRing");
}, 2000);
```

**Output:**

```
Bell is ringing!
```

### ⚠️ Critical Rule: Listen Before You Emit

**This WON'T work:**

```javascript
// Emit first
eventEmitter.emit("bellRing"); // Nothing happens!

// Then listen (too late!)
eventEmitter.on("bellRing", () => {
  console.log("Bell is ringing!");
});
```

**This WILL work:**

```javascript
// Listen first
eventEmitter.on("bellRing", () => {
  console.log("Bell is ringing!");
});

// Then emit
eventEmitter.emit("bellRing"); // Triggers the listener
```

---

## 3. Events with Parameters

### Passing Data with Events

```javascript
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

// Listener that accepts parameters
eventEmitter.on("bellRingAgain", (period, time, location) => {
  console.log(`Let's go. ${period} at ${time} from ${location}`);
});

// Emit with multiple parameters
setTimeout(() => {
  eventEmitter.emit(
    "bellRingAgain",
    "Second period ended",
    "11:30 AM",
    "Main Building"
  );
}, 3000);
```

**Output:**

```
Let's go. Second period ended at 11:30 AM from Main Building
```

### Object Parameters

```javascript
// Emit with object data
eventEmitter.emit("bellRing", {
  period: "Fourth period ended",
  time: "11:00 AM",
  teacher: "Mr. Smith",
  room: "Room 101",
});

// Listener with object destructuring
eventEmitter.on("bellRing", ({ period, time, teacher, room }) => {
  console.log(`${period} at ${time} by ${teacher} in ${room}`);
});
```

---

## 4. Running the Basic Example

### File: `index.js`

```javascript
//! one of the built in core modules is 'events' module.
//! we all know node.js is a non-blocking event driven run time environment.

//! something has happened / occured -> event raised -> we will listen to that event -> we will do something -> event handled
const EventEmitter = require("events"); //! convention is to write a class with a capital letter.

//! EventEmitter is a class. Emit means to raise an event.
//! so, as EventEmitter is a class, we will create an object of it.
const eventEmitter = new EventEmitter();

//! we always have to listen to an event. So, always need to define a listener before raising an event. Because, without knowing what to do after raising an event, we cannot do anything. Without it, we will not get any output.
eventEmitter.on("bellRing", () => {
  console.log("Bell is ringing!");
});

//! raise an event -> eventEmitter.emit('provideEventName');
setTimeout(() => {
  eventEmitter.emit("bellRing");
}, 2000);

//! ---event emitter with parameters---
eventEmitter.on("bellRingAgain", (period) => {
  console.log(`Let's go. ${period}`);
});

setTimeout(() => {
  eventEmitter.emit("bellRingAgain", "Second period ended.");
}, 3000);
```

### Running the Example

```bash
node index.js
```

### Expected Output

```
Bell is ringing!
Let's go. Second period ended.
```

---

## 5. Advanced EventEmitter Features

### Multiple Listeners for Same Event

```javascript
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

// Multiple listeners for the same event
eventEmitter.on("bellRing", () => {
  console.log("Teacher: Class is over!");
});

eventEmitter.on("bellRing", () => {
  console.log("Students: Time to pack up!");
});

eventEmitter.on("bellRing", () => {
  console.log("Cleaner: Time to clean the room!");
});

// All listeners will execute
eventEmitter.emit("bellRing");
```

**Output:**

```
Teacher: Class is over!
Students: Time to pack up!
Cleaner: Time to clean the room!
```

### One-Time Listeners with `.once()`

```javascript
// This listener will only execute once
eventEmitter.once("bellRing", () => {
  console.log("This will only show once!");
});

eventEmitter.emit("bellRing"); // Shows the message
eventEmitter.emit("bellRing"); // Nothing happens
eventEmitter.emit("bellRing"); // Nothing happens
```

### Removing Listeners with `.removeListener()`

```javascript
const myListener = () => {
  console.log("I can be removed!");
};

eventEmitter.on("bellRing", myListener);
eventEmitter.emit("bellRing"); // Shows message

// Remove the specific listener
eventEmitter.removeListener("bellRing", myListener);
eventEmitter.emit("bellRing"); // Nothing happens
```

### Event Names and Available Methods

```javascript
// Get all registered event names
console.log(eventEmitter.eventNames()); // ['bellRing', 'bellRingAgain']

// Get listener count for specific event
console.log(eventEmitter.listenerCount("bellRing")); // 3

// Get maximum number of listeners
console.log(eventEmitter.getMaxListeners()); // 10 (default)

// Set maximum number of listeners
eventEmitter.setMaxListeners(20);
```

---

## 6. External Event Emitter Pattern

### Why Use External Event Emitters?

The external event emitter pattern allows you to:

- **Separate concerns**: Event logic in one file, usage in another
- **Reuse components**: Same event emitter across multiple files
- **Maintain organization**: Keep related functionality together
- **Enable modularity**: Import event emitters like any other module

### File Structure

```
event raising externally/
├── raiseEvent.js      # Custom EventEmitter class
├── listenEvent.js     # File that uses the EventEmitter
└── README.md         # Detailed external events guide
```

### Custom EventEmitter Class (`raiseEvent.js`)

```javascript
const EventEmitter = require("events");

class RaiseEvent extends EventEmitter {
  startPeriod() {
    // Print immediately
    console.log("Period started.");

    // Raise an event after some time
    setTimeout(() => {
      this.emit("bellRing", {
        period: "Period ended",
        time: "11:00 AM",
      });
    }, 3000);
  }
}

module.exports = RaiseEvent;
```

### Event Listener (`listenEvent.js`)

```javascript
const RaiseEvent = require("./raiseEvent");

const raiseEvent = new RaiseEvent();

raiseEvent.on("bellRing", ({ period, time }) => {
  console.log(`Let's go. ${period} as it is ${time}.`);
});

raiseEvent.startPeriod();
```

### Execution Flow

```
Time 0:00 - Program starts
    ↓
Import RaiseEvent class
    ↓
Create new instance (raiseEvent)
    ↓
Register event listener for 'bellRing'
    ↓
Call startPeriod()
    ↓
Print "Period started." (immediately)
    ↓
Set timeout for 3 seconds
    ↓ (3 seconds later)
Emit 'bellRing' event with data
    ↓
Event listener executes
    ↓
Print "Let's go. Period ended as it is 11:00 AM."
```

### Running External Example

```bash
cd "event raising externally"
node listenEvent.js
```

**Output:**

```
Period started.
Let's go. Period ended as it is 11:00 AM.
```

---

## 7. EventEmitter vs Direct Function Calls

### Direct Function Calls (Synchronous)

```javascript
function startClass() {
  console.log("Class started");
  endClass(); // Direct call
}

function endClass() {
  console.log("Class ended");
}

startClass();
// Output: Class started, Class ended
```

### Event-Driven Approach (Asynchronous)

```javascript
const EventEmitter = require("events");

class School extends EventEmitter {
  startClass() {
    console.log("Class started");
    // Emit event instead of direct call
    setTimeout(() => {
      this.emit("classEnd");
    }, 2000);
  }
}

const school = new School();

school.on("classEnd", () => {
  console.log("Class ended");
});

school.startClass();
// Output: Class started, (2 seconds later) Class ended
```

### Why Events Are Better for Node.js

1. **Non-blocking**: Doesn't freeze the application
2. **Flexible**: Multiple listeners can respond to same event
3. **Decoupled**: Components don't need direct references
4. **Scalable**: Can handle many concurrent operations

---

## 8. Common Event Patterns

### Pattern 1: Error Handling with Events

```javascript
const EventEmitter = require("events");

class DataProcessor extends EventEmitter {
  processData(data) {
    try {
      // Simulate processing
      if (!data) {
        throw new Error("No data provided");
      }

      // Emit success event
      this.emit("dataProcessed", { result: "success", data });
    } catch (error) {
      // Emit error event
      this.emit("error", error);
    }
  }
}

const processor = new DataProcessor();

processor.on("dataProcessed", ({ result, data }) => {
  console.log(`Processing ${result}:`, data);
});

processor.on("error", (error) => {
  console.error("Error occurred:", error.message);
});

// Test with valid data
processor.processData("Hello World");

// Test with invalid data
processor.processData(null);
```

### Pattern 2: Progress Events

```javascript
class FileUploader extends EventEmitter {
  upload(file) {
    this.emit("start", { filename: file });

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      this.emit("progress", { progress, filename: file });

      if (progress >= 100) {
        clearInterval(interval);
        this.emit("complete", { filename: file });
      }
    }, 200);
  }
}

const uploader = new FileUploader();

uploader.on("start", ({ filename }) => {
  console.log(`Starting upload: ${filename}`);
});

uploader.on("progress", ({ progress, filename }) => {
  console.log(`${filename}: ${progress}% uploaded`);
});

uploader.on("complete", ({ filename }) => {
  console.log(`${filename}: Upload complete!`);
});

uploader.upload("document.pdf");
```

### Pattern 3: State Change Events

```javascript
class TrafficLight extends EventEmitter {
  constructor() {
    super();
    this.state = "red";
  }

  changeState(newState) {
    const oldState = this.state;
    this.state = newState;

    this.emit("stateChanged", {
      from: oldState,
      to: newState,
      timestamp: new Date(),
    });
  }
}

const light = new TrafficLight();

light.on("stateChanged", ({ from, to, timestamp }) => {
  console.log(`Light changed from ${from} to ${to} at ${timestamp}`);
});

// Simulate traffic light cycle
setTimeout(() => light.changeState("green"), 1000);
setTimeout(() => light.changeState("yellow"), 3000);
setTimeout(() => light.changeState("red"), 5000);
```

---

## 9. Best Practices

### 1. Always Listen Before Emitting

```javascript
// ✅ Good: Listen first
eventEmitter.on("myEvent", () => console.log("Event handled"));
eventEmitter.emit("myEvent");

// ❌ Bad: Emit first
eventEmitter.emit("myEvent"); // Nothing happens
eventEmitter.on("myEvent", () => console.log("Event handled"));
```

### 2. Use Descriptive Event Names

```javascript
// ✅ Good: Descriptive names
eventEmitter.emit("userLoggedIn");
eventEmitter.emit("fileUploaded");
eventEmitter.emit("databaseConnected");

// ❌ Bad: Vague names
eventEmitter.emit("event1");
eventEmitter.emit("something");
eventEmitter.emit("data");
```

### 3. Handle Errors Properly

```javascript
// ✅ Good: Error handling
eventEmitter.on("error", (error) => {
  console.error("Event error:", error);
});

// Prevent crashes from unhandled errors
eventEmitter.on("error", (error) => {
  console.error("Unhandled error:", error);
});
```

### 4. Use Object Parameters for Complex Data

```javascript
// ✅ Good: Object with clear properties
eventEmitter.emit("userAction", {
  action: "login",
  userId: 12345,
  timestamp: new Date(),
  ipAddress: "192.168.1.1",
});

// ❌ Bad: Multiple parameters
eventEmitter.emit("userAction", "login", 12345, new Date(), "192.168.1.1");
```

### 5. Clean Up Listeners

```javascript
// ✅ Good: Remove listeners when done
const listener = () => console.log("Handling event");
eventEmitter.on("myEvent", listener);

// Later, remove the listener
eventEmitter.removeListener("myEvent", listener);
```

---

## 10. Performance Considerations

### Memory Management

```javascript
// ✅ Good: Remove listeners to prevent memory leaks
class Component extends EventEmitter {
  constructor() {
    super();
    this.setupListeners();
  }

  setupListeners() {
    this.on("update", this.handleUpdate.bind(this));
  }

  destroy() {
    // Clean up listeners
    this.removeAllListeners();
  }
}
```

### Listener Limits

```javascript
// ✅ Good: Set appropriate listener limits
eventEmitter.setMaxListeners(50); // Increase if needed

// ✅ Good: Check listener count
if (eventEmitter.listenerCount("myEvent") > 10) {
  console.warn("Too many listeners for myEvent");
}
```

---

## 11. Common Use Cases

### 1. Web Server Events

```javascript
const http = require("http");
const EventEmitter = require("events");

class WebServer extends EventEmitter {
  constructor() {
    super();
    this.server = http.createServer();
    this.setupServer();
  }

  setupServer() {
    this.server.on("request", (req, res) => {
      this.emit("requestReceived", { req, res });
    });

    this.server.on("error", (error) => {
      this.emit("serverError", error);
    });
  }

  start(port) {
    this.server.listen(port, () => {
      this.emit("serverStarted", { port });
    });
  }
}

const server = new WebServer();

server.on("requestReceived", ({ req, res }) => {
  console.log(`Request: ${req.method} ${req.url}`);
  res.end("Hello World!");
});

server.on("serverStarted", ({ port }) => {
  console.log(`Server running on port ${port}`);
});

server.start(3000);
```

### 2. File System Monitoring

```javascript
const fs = require("fs");
const EventEmitter = require("events");

class FileWatcher extends EventEmitter {
  watchFile(filePath) {
    fs.watchFile(filePath, (curr, prev) => {
      this.emit("fileChanged", {
        file: filePath,
        current: curr,
        previous: prev,
        timestamp: new Date(),
      });
    });
  }
}

const watcher = new FileWatcher();

watcher.on("fileChanged", ({ file, current, previous }) => {
  console.log(`File ${file} changed!`);
  console.log(`Size: ${previous.size} -> ${current.size}`);
});

watcher.watchFile("./example.txt");
```

### 3. Database Connection Events

```javascript
class DatabaseConnection extends EventEmitter {
  constructor() {
    super();
    this.connected = false;
  }

  connect() {
    // Simulate connection
    setTimeout(() => {
      this.connected = true;
      this.emit("connected", { timestamp: new Date() });
    }, 1000);
  }

  disconnect() {
    this.connected = false;
    this.emit("disconnected", { timestamp: new Date() });
  }

  query(sql) {
    if (!this.connected) {
      this.emit("error", new Error("Not connected to database"));
      return;
    }

    // Simulate query
    setTimeout(() => {
      this.emit("queryResult", { sql, result: "Query executed successfully" });
    }, 500);
  }
}

const db = new DatabaseConnection();

db.on("connected", ({ timestamp }) => {
  console.log(`Database connected at ${timestamp}`);
});

db.on("disconnected", ({ timestamp }) => {
  console.log(`Database disconnected at ${timestamp}`);
});

db.on("queryResult", ({ sql, result }) => {
  console.log(`Query: ${sql}`);
  console.log(`Result: ${result}`);
});

db.on("error", (error) => {
  console.error("Database error:", error.message);
});

db.connect();
```

---

## 12. EventEmitter Methods Summary

| Method                             | Description              | Example                                    |
| ---------------------------------- | ------------------------ | ------------------------------------------ |
| `.on(event, listener)`             | Add event listener       | `emitter.on('data', callback)`             |
| `.once(event, listener)`           | Add one-time listener    | `emitter.once('ready', callback)`          |
| `.emit(event, ...args)`            | Emit event               | `emitter.emit('data', 'hello')`            |
| `.removeListener(event, listener)` | Remove specific listener | `emitter.removeListener('data', callback)` |
| `.removeAllListeners([event])`     | Remove all listeners     | `emitter.removeAllListeners('data')`       |
| `.listenerCount(event)`            | Get listener count       | `emitter.listenerCount('data')`            |
| `.eventNames()`                    | Get all event names      | `emitter.eventNames()`                     |
| `.setMaxListeners(n)`              | Set max listeners        | `emitter.setMaxListeners(50)`              |
| `.getMaxListeners()`               | Get max listeners        | `emitter.getMaxListeners()`                |

---

## 13. Troubleshooting Common Issues

### Issue 1: Event Not Firing

**Problem:** Event listener doesn't execute

```javascript
eventEmitter.emit("myEvent"); // Nothing happens
eventEmitter.on("myEvent", () => console.log("Hello"));
```

**Solution:** Listen before emitting

```javascript
eventEmitter.on("myEvent", () => console.log("Hello"));
eventEmitter.emit("myEvent"); // Works!
```

### Issue 2: Multiple Listeners Not Executing

**Problem:** Only first listener executes

```javascript
eventEmitter.on("myEvent", () => console.log("First"));
eventEmitter.on("myEvent", () => console.log("Second"));
eventEmitter.emit("myEvent"); // Only shows "First"
```

**Solution:** Check for `.once()` usage or listener removal

```javascript
// Make sure you're using .on(), not .once()
eventEmitter.on("myEvent", () => console.log("First"));
eventEmitter.on("myEvent", () => console.log("Second"));
eventEmitter.emit("myEvent"); // Shows both
```

### Issue 3: Memory Leaks

**Problem:** Too many listeners accumulating

```javascript
// Adding listeners in a loop without cleanup
for (let i = 0; i < 1000; i++) {
  eventEmitter.on("myEvent", () => console.log(i));
}
```

**Solution:** Clean up listeners or use `.once()`

```javascript
// Use .once() for one-time events
for (let i = 0; i < 1000; i++) {
  eventEmitter.once("myEvent", () => console.log(i));
}

// Or clean up manually
const listeners = [];
for (let i = 0; i < 1000; i++) {
  const listener = () => console.log(i);
  listeners.push(listener);
  eventEmitter.on("myEvent", listener);
}

// Later, clean up
listeners.forEach((listener) => {
  eventEmitter.removeListener("myEvent", listener);
});
```

---

## 14. Integration with Other Node.js Modules

### Events + File System

```javascript
const fs = require("fs");
const EventEmitter = require("events");

class FileProcessor extends EventEmitter {
  processFile(filename) {
    this.emit("processingStarted", { filename });

    fs.readFile(filename, (err, data) => {
      if (err) {
        this.emit("error", err);
        return;
      }

      this.emit("fileRead", { filename, size: data.length });

      // Process data
      const processed = data.toString().toUpperCase();

      this.emit("processingComplete", { filename, result: processed });
    });
  }
}
```

### Events + HTTP

```javascript
const http = require("http");
const EventEmitter = require("events");

class ApiServer extends EventEmitter {
  constructor() {
    super();
    this.server = http.createServer((req, res) => {
      this.emit("request", { req, res });
    });
  }

  start(port) {
    this.server.listen(port, () => {
      this.emit("listening", { port });
    });
  }
}
```

### Events + Timers

```javascript
const EventEmitter = require("events");

class Timer extends EventEmitter {
  start(duration) {
    this.emit("started", { duration });

    this.interval = setInterval(() => {
      this.emit("tick", { remaining: duration-- });

      if (duration <= 0) {
        clearInterval(this.interval);
        this.emit("completed");
      }
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.emit("stopped");
    }
  }
}
```

---

## 15. Running All Examples

### Basic Events Example

```bash
node index.js
```

### External Event Emitter Example

```bash
cd "event raising externally"
node listenEvent.js
```

### Expected Outputs

**Basic Example:**

```
Bell is ringing!
Let's go. Second period ended.
```

**External Example:**

```
Period started.
Let's go. Period ended as it is 11:00 AM.
```

---

## 16. Key Takeaways

### Why Events Are Essential in Node.js

1. **Non-blocking I/O**: Events enable asynchronous operations
2. **Scalability**: Handle many concurrent connections
3. **Modularity**: Components communicate through events
4. **Flexibility**: Multiple listeners can respond to same event
5. **Real-time**: Perfect for real-time applications

### When to Use Events

- **File operations**: Reading, writing, monitoring files
- **Network operations**: HTTP requests, WebSocket connections
- **User interactions**: Clicks, form submissions
- **System events**: Process signals, timer events
- **Custom business logic**: State changes, workflow steps

### Event-Driven Architecture Benefits

- **Loose coupling**: Components don't depend on each other directly
- **High cohesion**: Related functionality stays together
- **Easy testing**: Events can be mocked and tested independently
- **Extensibility**: Easy to add new listeners without modifying existing code

---

## 17. Next Steps

After mastering the events module, consider exploring:

1. **Streams**: Built on top of events for handling large data
2. **HTTP Module**: Uses events for request/response handling
3. **File System**: Many operations are event-driven
4. **Child Processes**: Communicate through events
5. **WebSockets**: Real-time bidirectional communication

The events module is the foundation of Node.js's architecture. Understanding it deeply will make you a more effective Node.js developer!

---

## Documentation

For complete documentation, visit: [Node.js Events Documentation](https://nodejs.org/api/events.html)

This guide provides a comprehensive foundation for understanding and using the events module effectively in your Node.js applications.
