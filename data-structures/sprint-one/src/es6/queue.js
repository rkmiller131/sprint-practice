class Queue {
  constructor() {
    this.storage = {};
    this.front = 0;
    this.back = 0;
  }

  enqueue(value) {
    this.storage[this.back] = value;
    this.back++;
  }

  dequeue() {
    const dequeuedItem = this.storage[this.front];
    if (this.size()) {
      delete this.storage[this.front];
      this.front++;
    }
    return dequeuedItem;
  }

  size() {
    return this.back - this.front;
  }

}
