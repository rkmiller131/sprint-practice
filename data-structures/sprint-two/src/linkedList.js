// USE: functional instantiation pattern
var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  // whatever the tail is, we can just have that node's next point to our new node
  // and have the tail point the new node
  list.addToTail = function(value) {
    const newNode = Node(value);
    // so... do we have a head? If yes, do the above steps
    if (list.head) {
      const lastNode = list.tail;
      lastNode.next = newNode;
    } else {
      // if no, then that means the list is empty. Set both head and tail to new node
      list.head = newNode;
    }
    // this can be outside the if/else block because no matter what, the tail will be the new node
    list.tail = newNode;
  };

  list.removeHead = function() {
    const firstNode = list.head;
    // as long as the list isn't empty (head exists),
    if (firstNode) {
      // then shift the head to the current node's next.
      list.head = firstNode.next;
    }
    // should return the value of the former head when removeHead is called
    return firstNode.value;
  };

  list.contains = function(target) {
    // start at the head and compare. Is this value our target?
    var traverseNodes = function(node) {
      if (node.value === target) {
        return true;
      // no? then try again with the current node's next
      } else if (node.next) {
        return traverseNodes(node.next);
      // current node's next is null?
      } else {
        // then return false - that value is not in our linked list
        return false;
      }
    };
    return traverseNodes(list.head);
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

// add to tail:
// O(1)
// It doesn't matter how many items came before it, or how big the list is (n), because all
// that is required is to change the pointers of the last node and the tail

//--------------------BONUS: removing the tail ---------------------------------------------------
// O(n)
// sure you can delete the tail and move the tail over to the previous node (reverse of add to tail)
// but in order to have the tail's pointer point to the previous node, we can't go backwards in a linked list, so we have to start at the head and iterate through the entire list

//--------------------BONUS: adding to the head --------------------------------------------------
// O(1)
// Same as adding to the tail - we already have the head pointing to a node, so no matter how big
// n gets, all we have to do is change the head to our new node and change our new node's next to old head

// removing the head
// O(1)
// we already have the head pointing to a node, and if we remove that node, all we need to do is
// point the head to the previous node's next. Now that nothing is pointing to it, that node falls off.

// contains (looking for a value or 'index')
// O(n)
// since linked lists aren't indexed, when you're looking for a specific value you must start at the head
// and iterate through every node.value to compare if it's the value we're searching for