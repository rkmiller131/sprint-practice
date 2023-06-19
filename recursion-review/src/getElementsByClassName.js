// What is the goal of getElementsByClassName? It's to traverse over everything in the DOM and pull out an
// array of elements that match the class name you're looking for.
// The DOM is a tree - a collection of objects that can be accessed through document.body (since we're on browser)
// start by writing your IOCE:

// I - Given a classname and __ <- what does your DOM look like? How can you find out? Two options: look at spec or look at dev tools
//                                 look at the document.body, look at it's childNodes or children (which one should you use?)
// O - Return an array of all the elements in the DOM that match className
// C - Can't use any native Javascript methods like getElemBy.. or querySelector
//     Should use:    document.body      element.childNodes    element.classList
// E - What if no elements match? Empty array.

// inner function recursion example (no extra parameter)

var getElementsByClassName2 = function(className) {
  let results = [];
  const traverseNodes = function(currentNode) {
    if (currentNode.classList) {
      currentNode.classList.forEach((selector) => {
        if (selector === className) {
          results.push(currentNode);
        }
      });
    }
    currentNode.childNodes.forEach((child) => {
      return results.concat(traverseNodes(child));
    });
  };
  traverseNodes(document.body);
  return results;
};

// pure recursion example (added extra parameter)

var getElementsByClassName = function(className, currentElement) {
  let results = [];
  currentElement = currentElement || document.body;
  if (currentElement.classList && currentElement.classList.contains(className)) {
    results.push(currentElement);
  }
  currentElement.childNodes.forEach((child) => {
    const childResults = getElementsByClassName(className, child);
    results = results.concat(childResults);
  });
  return results;
};
