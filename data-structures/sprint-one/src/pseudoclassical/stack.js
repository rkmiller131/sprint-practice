var Stack = function() {
  this.storage = {};
  this.top = 0;
};

Stack.prototype.push = function(value) {
  this.storage[this.top] = value;
  this.top++;
};

Stack.prototype.pop = function() {
  let popped = this.storage[this.top - 1];
  if (popped) {
    delete this.storage[this.top - 1];
    this.top--;
    return popped;
  } else {
    popped = this.storage[0];
    delete this.storage[0];
    return popped;
  }
};

Stack.prototype.size = function() {
  return Object.keys(this.storage).length;
};

