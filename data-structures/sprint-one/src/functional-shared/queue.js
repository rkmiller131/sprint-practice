var Queue = function() {
  var someInstance = {};
  someInstance.storage = {};
  someInstance.front = 0;
  someInstance.back = 0;
  _.extend(someInstance, queueMethods);
  return someInstance;
};

var queueMethods = {
  enqueue: function(value) {
    // add a string to the back of the queue
    this.storage[this.back] = value;
    this.back++;
  },
  dequeue: function() {
    // remove and return a string at the front of the queue
    const dequeuedItem = this.storage[this.front];
    if (this.size()) {
      delete this.storage[this.front];
      this.front++;
    }
    return dequeuedItem;
  },
  size: function() {
    // return the number of items in the queue
    return this.back - this.front;
  }
};


