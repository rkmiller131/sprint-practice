// Think about what the native JSON.stringify does - what are we aiming for? If you don't know, play around with the method in console and imitate what it gives you.

// We can also look at the sample data and make note of some patterns:

var stringifiableObjects = [
  9,
  null,
  true,
  false,
  'Hello world',
  [],
  [8],
  ['hi'],
  [8, 'hi'],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
  [8, [[], 3, 4]],
  [[[['foo']]]],
  {},
  {'a': 'apple'},
  {'foo': true, 'bar': false, 'baz': null},
  {'boolean, true': true, 'boolean, false': false, 'null': null },
  // basic nesting
  {'a': {'b': 'c'}},
  {'a': ['b', 'c']},
  [{'a': 'b'}, {'c': 'd'}],
  {'a': [], 'c': {}, 'b': true}
];

// first, if we have a number or a boolean or null, we just return that value
// if we have a string, it gets put into double quotes, same with any inner brackets/braces
// if we have outer brackets/braces, they just get a single quote

// Base case: we want to just look at a single data type at a time and build out the whole string via recursion

var stringifyJSON = function(obj) {
  let string = '';
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return `${obj}`;
  } else if (typeof obj === 'string') {
    let doubleQuotes = '"';
    doubleQuotes += obj;
    doubleQuotes += '"';
    return doubleQuotes;
  } else if (Array.isArray(obj)) {
    string += '[';
    let arrString = '';
    obj.forEach((value) => {
      arrString += stringifyJSON(value);
      arrString += ',';
    });
    const arrNoTrailingComma = arrString.slice(0, arrString.length - 1);
    string += arrNoTrailingComma;
    string += ']';
  } else {
    string += '{';
    let objString = '';
    for (let key in obj) {
      if (typeof obj[key] === 'function' || obj[key] === undefined) {
        delete obj[key];
      } else {
        objString += stringifyJSON(key);
        objString += ':';
        objString += stringifyJSON(obj[key]);
        objString += ',';
      }
    }
    const objNoTrailingComma = objString.slice(0, objString.length - 1);
    string += objNoTrailingComma;
    string += '}';
  }
  return string;
};
