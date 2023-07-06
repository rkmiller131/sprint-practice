var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var front = 0;
  var back = 0;
  // Implement the methods below

  someInstance.enqueue = function(value) {
    // add a string to the back of the queue
    storage[back] = value;
    back++;
  };

  someInstance.dequeue = function() {
    // remove and return the string at the front of the queue
    if (storage[front]) {
      const dequeuedItem = storage[front];
      delete storage[front];
      front++;
      return dequeuedItem;
    } else {
      return null;
    }
  };

  someInstance.size = function() {
    // return the number of items in the queue
    // return Object.keys(storage).length;
    return back - front;
  };

  return someInstance;
};