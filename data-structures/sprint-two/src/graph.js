// Instantiate a new graph
// graphs consist of nodes and edges that connet the nodes in an undirected fashion
// The relationship of any two nodes connected by an edge is symmetrical, so to keep track of these
// it's similar to a linked list but with the caveat that there can be multiple edges (not just one next) and there's no direction. So our nodes storage will be an obj, and each node will have an array (or another obj since no direction) of its edges
// There are actually a couple ways to represent a graph, each with their own time and space complexity pros/cons:
// one way is through an adjacency list, another way is through an adjacency matrix
// in an adjacency matrix (array of arrays) we would have an nxn grid where nested 0s represent no connction, 1 is edge
//   A B C D
// A 0 1 0 0
// B 1 0 0 1
// C 0 0 0 1
// D 0 1 1 0
// or:
// [
//   [0, 1, 0, 0],
//   [1, 0, 0, 1],
//   [0, 0, 0, 1],
//   [0, 1, 1, 0]
// ]
// cons of adjacency matrix:
// storing all the edges AND the edges a vertex is NOT connected to (taking up extra space in memory) - O(n2) space complex
// adding a new node is also difficult (O(n2)) because you have to iterate through the whole matrix to insert at correct location then iterate again to add correct edges
// no keys for the values of the nodes themselves, have to rely on index and iteration
// pros of an adjacency matrix:
// if we want to remove a node, we just have to toggle the 1 to a 0 compared to a list where we would have to iterate over each value array for the two nodes being modified.

// !! When data becomes large, it is super inefficient to use an adjacency matrix because of all those 0s we're storing (they will almost always outnumber the 1s or connections)!!

// Thus, let's go with an adjacency list:
// {
//   A: ['B'],
//   B: ['A', 'D'],
//   C: ['D'],
//   D: ['B', 'C']
// }

// This graph object holds ALL the potential node values and an array of their connecting edges
// thus looking to see if a node is present or adding a new node is an easy O(1)
var Graph = function() {
  this.nodes = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  // when we go to add a new node, whatever calls this addNode method will have the inserted value as a key. If this key already exists, then we just want it to equal its current value (connection). However if it doesn't exist, this is a brand new node added and will have its own storage for edges.
  this.nodes[node] = this.nodes[node] || [];
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.nodes[node] !== undefined;
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  // iterate through the whole graph searching for any other node that has a connection to this node: we gotta splice it out
  for (let key in this.nodes) {
    const connections = this.nodes[key];
    connections.forEach((connection, index) => {
      if (connection === node) {
        this.nodes[key].splice(index, 1);
      }
    });
    // once all connections have been purged, just delete that key
    delete this.nodes[node];
  }

  // ALTERNATIVE SOLUTION:
  // if (this.contains(node)) {
  //   for (let targetNode in this.nodes[node]) {
  //     this.removeEdge(node, targetNode);
  //   }
  //   delete this.nodes[node];
  // }
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  if (!this.nodes[fromNode]) {
    return false;
  }
  const allConnections = this.nodes[fromNode];
  return allConnections.includes(toNode) ? true : false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  // if we want to connect nodeA to nodeB, then we must check if nodeA is in graph already
  // if so, just push nodeB into its edge array. If not, create it? do the same for nodeB?
  // maybe not create, let's just assume all nodes are present. If not, return null or something
  if (!this.nodes[fromNode] || !this.nodes[toNode]) {
    return null;
  }
  this.nodes[fromNode].push(toNode);
  this.nodes[toNode].push(fromNode);
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  this.nodes[fromNode].forEach((connection, index) => {
    if (connection === toNode) {
      this.nodes[fromNode].splice(index, 1);
    }
  });
  this.nodes[toNode].forEach((connection, index)=> {
    if (connection === fromNode) {
      this.nodes[toNode].splice(index, 1);
    }
  });
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (let key in this.nodes) {
    cb(key);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


