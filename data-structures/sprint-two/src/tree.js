// USE: functional shared instantiation pattern (use 'this', but not 'new')
var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // tree children: an array containing a number of subtrees
  newTree.children = [];
  // extend the properties of the tree with treeMethods
  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

// takes any value, sets that as the target of a node, and adds that node as a child of the tree.
treeMethods.addChild = function(value) {
  // whenever you create a tree, it will have a root as the first instance you create. Thus, adding a child just pushes into child array (even if we're not at the root and a child node calls this function, still add to current 'this' ?)
  const newNode = Tree(value);
  this.children.push(newNode);
};

// takes any input and returns a boolean reflecting whether it can be found as a vlue of the target node or any descendant node.
treeMethods.contains = function(target) {
  var traverseNodes = function(node) {
    if (node.value === target) {
      return true;
    }
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const childContains = traverseNodes(child);
      if (childContains) {
        return true;
      }
    }
    return false;
  };
  return traverseNodes(this);
};

// ALTERNATIVE TO .CONTAINS: -----------------------------------------------------------------------------
// treeMethods.contains = function(target) {
//   if ( this.value === target ) {
//     return true;
//   }
//   for ( var i = 0; i < this.children.length; i++ ) {
//     var child = this.children[i];
//     if (child.contains(target)) {
//       return true;
//     }
//   }
//   return false;
// };
// --------------------------------------------------------------------------------------------------------

/*
 * Complexity: What is the time complexity of the above functions?
 */

// add child
// O(1)
// Since whatever node calls this method has a children array, all that needs to be done is to push
// the newly created node into that array. Pushing is an O(1)

// contains
// O(n)
// We will need to traverse through all elements of the tree recursively - this includes the root, the
// root's children, and the root's children's children, and so on. Worst case, we have to iterate over
// every single node (or n)