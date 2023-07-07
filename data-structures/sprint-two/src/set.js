// USE: prototypal instantiation style
var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = {};
  return set;
};

var setPrototype = {};

// takes any string and adds it to the set (if unique)
setPrototype.add = function(item) {
  this._storage[item] = true;
};

// Takes any string and returns a boolean reflecting whether it can be found in the set
setPrototype.contains = function(item) {
  // fancy solution:
  // return !!this._storage[item];
  return this._storage[item] ? true : false;
};

// Takes any string and removes if from the set, if present
setPrototype.remove = function(item) {
  delete this._storage[item];
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
