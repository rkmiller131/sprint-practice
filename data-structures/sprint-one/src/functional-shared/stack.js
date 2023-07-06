var Stack = function() {
  var someInstance = {};
  someInstance.storage = {};
  someInstance.top = 0;
  _.extend(someInstance, stackMethods);
  return someInstance;
};

var stackMethods = {
  push: function(value) {
    // add a string to the top of the stack
    this.storage[this.top] = value;
    this.top++;
  },
  pop: function() {
    // remove and return the string on the top of the stack
    if (this.storage[this.top - 1]) {
      const popped = this.storage[this.top - 1];
      if (this.top - 1 <= 0) {
        delete this.storage[0];
      } else {
        delete this.storage[this.top - 1];
        this.top--;
      }
      return popped;
    }
  },
  size: function() {
    // return the number of items on the stack
    return Object.keys(this.storage).length;
  }
};


