var Queue = function() {
  var someInstance = Object.create(queueMethods);
  someInstance.storage = {};
  someInstance.front = 0;
  someInstance.back = 0;
  return someInstance;
};

var queueMethods = {
  enqueue: function(value) {
    // add a string to the back of the queue
    this.storage[this.back] = value;
    this.back++;
  },
  dequeue: function() {
    // remove and return the string at the front of the queue
    if (this.size()) {
      const dequeuedItem = this.storage[this.front];
      delete this.storage[this.front];
      this.front++;
      return dequeuedItem;
    }
  },
  size: function() {
    // return the number of items in the queue
    return this.back - this.front;
  }
};


