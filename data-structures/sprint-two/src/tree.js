// USE: functional shared instantiation pattern
var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // tree children: an array containing a number of subtrees
  newTree.children = [];

  return newTree;
};

var treeMethods = {};

// takes any value, sets that as the target of a node, and adds that node as a child of the tree.
treeMethods.addChild = function(value) {
};

// takes any input and returns a boolean reflecting whether it can be found as a vlue of the target node or any descendant node.
treeMethods.contains = function(target) {
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
