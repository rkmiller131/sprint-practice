class Stack {
  constructor() {
    this.storage = {};
    this.top = 0;
  }

  push(value) {
    this.storage[this.top] = value;
    this.top++;
  }

  pop() {
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
  }

  size() {
    return Object.keys(this.storage).length;
  }

}