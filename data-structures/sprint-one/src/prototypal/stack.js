var Stack = function() {
  var someInstance = Object.create(stackMethods);
  someInstance.storage = {};
  someInstance.top = 0;
  return someInstance;
};

var stackMethods = {
  push: function(value) {
    this.storage[this.top] = value;
    this.top++;
  },
  pop: function() {
    if (this.storage[this.top - 1]) {
      const popped = this.storage[this.top - 1];
      delete this.storage[this.top - 1];
      this.top--;
      return popped;
    } else {
      return this.storage[0];
    }
  },
  size: function() {
    return Object.keys(this.storage).length;
  }
};


