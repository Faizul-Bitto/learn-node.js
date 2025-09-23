# External Event Emitter - Node.js Events Module

This example demonstrates how to create and use custom EventEmitter classes that can be imported and used across different files in Node.js.

## 📁 File Structure

```
event raising externally/
├── raiseEvent.js      # Custom EventEmitter class
├── listenEvent.js     # File that imports and uses the EventEmitter
└── README.md         # This documentation
```

## 🔧 How It Works

### 1. **Custom EventEmitter Class** (`raiseEvent.js`)

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

#### Why Use a Class Here?

1. **Inheritance**: The class extends `EventEmitter`, inheriting all event capabilities
2. **Encapsulation**: Groups related functionality (`startPeriod`) with event emission
3. **Reusability**: Can create multiple instances of the same event emitter
4. **Organization**: Keeps event-related methods organized in one place
5. **State Management**: Can maintain instance-specific state if needed

#### Key Concepts:

- **`extends EventEmitter`**: Inherits event emission and listening capabilities
- **`this.emit()`**: Emits events that can be listened to by other parts of the application
- **`module.exports`**: Makes the class available for import in other files

### 2. **Event Listener** (`listenEvent.js`)

```javascript
const RaiseEvent = require("./raiseEvent");

const raiseEvent = new RaiseEvent();

raiseEvent.on("bellRing", ({ period, time }) => {
  console.log(`Let's go. ${period} as it is ${time}.`);
});

raiseEvent.startPeriod();
```

#### How External Import Works:

1. **`require('./raiseEvent')`**: Imports the custom class from another file
2. **`new RaiseEvent()`**: Creates an instance of the imported class
3. **`.on('bellRing', callback)`**: Registers an event listener for the 'bellRing' event
4. **`.startPeriod()`**: Triggers the method that will eventually emit the event

## 🚀 Execution Flow

### Timeline of Events:

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

### Output:

```
Period started.
Let's go. Period ended as it is 11:00 AM.
```

## 🎯 Why This Pattern is Useful

### 1. **Separation of Concerns**

- **Event Emitter**: Responsible for emitting events and managing timing
- **Event Listener**: Responsible for handling events when they occur

### 2. **Modularity**

- Event emitter can be imported and used in multiple files
- Different parts of application can listen to the same events

### 3. **Asynchronous Communication**

- Allows different modules to communicate without tight coupling
- Events can be triggered at different times without blocking execution

### 4. **Scalability**

- Can add multiple listeners for the same event
- Can emit multiple different types of events

## 🔄 Alternative Approaches

### Without Class (Direct EventEmitter):

```javascript
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("bellRing", (data) => {
  console.log(`Let's go. ${data.period} as it is ${data.time}.`);
});

// Emit after delay
setTimeout(() => {
  emitter.emit("bellRing", {
    period: "Period ended",
    time: "11:00 AM",
  });
}, 3000);
```

### Why Class is Better:

- **Organization**: Groups related methods together
- **Reusability**: Can create multiple instances
- **Extensibility**: Easy to add more methods and functionality
- **Maintainability**: Cleaner code structure

## 🛠️ Running the Example

1. Navigate to the directory:

   ```bash
   cd "1. Node.js/b. node.js's built in core modules/iv. events module/event raising externally"
   ```

2. Run the listener:

   ```bash
   node listenEvent.js
   ```

3. Expected output:
   ```
   Period started.
   Let's go. Period ended as it is 11:00 AM.
   ```

## 📚 Key Learnings

1. **Event-Driven Architecture**: How Node.js uses events for asynchronous communication
2. **Module System**: How to import/export classes across files
3. **Class Inheritance**: How to extend built-in Node.js classes
4. **Timing Control**: How to control when events are emitted using setTimeout
5. **Data Passing**: How to pass data along with events

## 🔗 Related Concepts

- **Event Loop**: Node.js's mechanism for handling asynchronous operations
- **Observer Pattern**: The design pattern that events implement
- **Callback Functions**: Functions that execute when events are emitted
- **Asynchronous Programming**: Non-blocking execution model

This example demonstrates the foundation of Node.js's event-driven architecture, which is essential for building scalable applications.
