var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var top = 0;

  // Implement the methods below
  someInstance.push = function(value) {
    // Add a string to the top of the stack
    storage[top] = value;
    top++;
  };

  someInstance.pop = function() {
    // Remove and return string from top of the stack
    if (storage[top - 1]) {
      const popped = storage[top - 1];
      if (top - 1 <= 0) {
        delete storage[0];
        return popped;
      } else {
        delete storage[top - 1];
        top--;
        return popped;
      }
    }
  };

  someInstance.size = function() {
    // Return the number of items on the stack
    return Object.keys(storage).length;
  };

  return someInstance;
};
