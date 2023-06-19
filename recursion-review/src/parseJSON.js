// Helpful article on JSON parse https://medium.com/@Mordoc/a-recursive-descent-parser-for-json-a6d68ab938ac
// recursive descent parsers are different than normal recursion:
// 1) Instead of having one function that calls itself, you have at least two functions that call each other
// 2) The recursive descent parser follows a "grammar", meaning a set of rules that describe how input is structured (syntax)
// If you want to be strict about how you parse, you could have one function for every set of grammar rules

// CLOSE BUT NOT WORKING PROPERLY
// const objParser = function(string) {
//   const pairHolder = [];
//   const objBuilder = {};
//   let objNoBraces = string.slice(1, string.length - 1);
//   // we know objects use key/value pairs separated by a comma
//   const pairs = objNoBraces.split(',');
//   // now we need to separate the keys from the values
//   pairs.forEach((pair) => {
//     const keyvals = pair.split(':');
//     pairHolder.push(keyvals);
//   });
//   // pair holder now looks like: [ [ '“name”', '”Spaceballs”' ], [ '”score”', '7.7' ] ]
//   // iterate over pair holder and place the keys and values into the object builder
//   pairHolder.forEach((keyval) => {
//     const singleStringKey = keyval[0].slice(1, keyval[0].length - 1);
//     const parsedValue = parseJSON(keyval[1]);
//     objBuilder[singleStringKey] = parsedValue;
//   });
//   return objBuilder;
// };

// const arrParser = function(string) {
//   const result = [];
//   let arrNoBraces = string.slice(1, string.length - 1);
//   if (arrNoBraces[0] === '{') {
//     let objSplit = arrNoBraces.split('},');
//     objSplit[0] += '}';
//     objSplit.forEach((stringObject) => {
//       result.push(parseJSON(stringObject));
//     });
//   }
//   if (arrNoBraces[0] === '[') {
//     let arrSplit = arrNoBraces.split('],');
//     arrSplit[0] += ']';
//     arrSplit.forEach((stringArray) => {
//       result.push(parseJSON(stringArray));
//     });
//   }
//   return result;
// };

// const primitiveParser = function(string) {
//   if (alphaCheck(string)) {
//     return string.slice(1, string.length - 1);
//   } else {
//     return Number(string);
//   }

// };

// const inputEndFinder = function(bracketType, string) {
//   let openCount = 0;
//   let closeType = '}';

//   if (bracketType === '[') {
//     closeType = ']';
//   }

//   for (let i = 0; i < string.length; i++) {
//     if (string[i] === bracketType) {
//       openCount++;
//     }
//     if (string[i] === closeType) {
//       if (openCount === 0) {
//         return i + 2;
//       } else {
//         openCount--;
//       }
//     }
//   }

// };

// const alphaCheck = function(string) {
//   let passesCheck = false;
//   const alphabet = {a: 'A', b: 'B', c: 'C', d: 'D', e: 'E', f: 'F', g: 'G', h: 'H', i: 'I', j: 'J', k: 'K', l: 'L', m: 'M', n: 'N', o: 'O', p: 'P', q: 'Q', r: 'R', s: 'S', t: 'T', u: 'U', v: 'V', w: 'W', x: 'X', y: 'Y', z: 'Z'};
//   const capitals = Array.from(Object.values(alphabet));
//   if (alphabet[string[1]] || capitals.includes(string[1])) {
//     passesCheck = true;
//   }
//   return passesCheck;
// };

// var parseJSON = function(json) {
//   let object, array, primitive;

//   for (let i = 0; i < json.length; i++) {
//     if (json[i] === '{') {
//       const skipLength = inputEndFinder('{', json.slice(i + 1));
//       const obj = json.slice(i, i + skipLength);
//       object = objParser(obj);
//       i += skipLength;
//     } else if (json[i] === '[') {
//       const skipLength = inputEndFinder('[', json.slice(i + 1));
//       const arr = json.slice(i, i + skipLength);
//       array = arrParser(arr);
//       i += skipLength;
//     } else {
//       primitive = primitiveParser(json);
//       return primitive;
//     }
//   }

//   if (object) {
//     return object;
//   }
//   return array;
// };

//-----------------------------------------------------------------------
// ALTERNATIVE, WORKING SOLUTION
//-----------------------------------------------------------------------

// Returns whether a given input character is a whitespace character.
var isWhitespace = function (c) {
  return c === ' '
      || c === '\r'
      || c === '\n'
      || c === '\t';
};

var isEndOfPrim = function (c) {
  return isWhitespace(c)
      || c === ','
      || c === '}'
      || c === ']';
};

var parseJSON = function(json) {
  var j = 0;
  var isInvalid = false;
  var result;

  var parseNext = function() {
    var allowed = ['+', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (json[j] === '\"') {
      return parseString();
    } else if (json[j] === '[') {
      return parseObject(true);
    } else if (json[j] === '{') {
      return parseObject(false);
    } else if (allowed.includes(json[j])) {
      var temp = parseNumber();
      return temp;
    }
    var res = '';
    while (!isEndOfPrim(json[j])) {
      res += json[j];
      j += 1;
    }
    j -= 1;
    if (res === 'true') {
      return true;
    } else if (res === 'false') {
      return false;
    } else if (res === 'null') {
      return null;
    }
    throw SyntaxError('Invalid Format! Expected ' + res + ' to be a boolean, number, or null.');
  };
  while (isWhitespace(json[j])) {
    j += 1;
  }

  // With the assumption that the index j is at the beginning { of the object, parses object
  // and returns it with j being repositioned to the end } index.
  // If isArray is true, then repeats the same, but with the [ and ] brackets under assumption
  // that it is an array being parsed.
  var parseObject = function(isArray) {
    if (isArray && json[j] !== '[') {
      throw SyntaxError('Invalid Format! Expected \'[\' at beginning of array ' +
                        'at character ' + j + '.');
    }
    if (!isArray && json[j] !== '{') {
      throw SyntaxError('Invalid Format! Expected \'{\' at beginning of object ' +
                        'at character ' + j + '.');
    }
    var res = isArray ? [] : {};
    j += 1;
    var isAfterComma = false;
    while (j < json.length) {
      // First clears past all whitespace.
      while (isWhitespace(json[j])) {
        j += 1;
      }

      // Checks if the object or array ends at this element.
      if (!isAfterComma && (isArray && json[j] === ']' || !isArray && json[j] === '}')) {
        break;
      }

      // If an object, grab the key and clears all whitespace and the required ':' character,
      // if one is present.
      if (!isArray) {
        var key = parseString();
        j += 1;

        // Clears whitespace until the required ':' character
        while (isWhitespace(json[j])) {
          j += 1;
        }
        // If present, increment j to pass it and clear whitespace until the value.
        if (json[j] !== ':') {
          throw SyntaxError('Invalid Format! Expected \':\' after object key ' +
                            'at character ' + j + '.');
        }
        j += 1;
        while (isWhitespace(json[j])) {
          j += 1;
        }
      }

      // Grab the value, which is another String, Array, Object, or Primitive type.
      var value = parseNext();
      j += 1;

      // Assigns this key to res.
      if (isArray) {
        res.push(value);
      } else {
        res[key] = value;
      }

      // Clears whitespace and checks if next character is '}' or ',' and moves past the comma
      // for the loop start again and work on the next item.
      while (isWhitespace(json[j])) {
        j += 1;
      }
      if (isArray && json[j] === ']' || !isArray && json[j] === '}') {
        break;
      }
      if (json[j] !== ',') {
        throw SyntaxError('Invalid Format! Expected \',\' or \'' + (isArray ? ']' : '}') +
                          '\' at character ' + j + '.');
      }
      isAfterComma = true;
      j += 1;
    }

    if (isArray && json[j] !== ']') {
      throw SyntaxError('Invalid Format! Expected object to end in \']\' at character ' + j + '.');
    }
    if (!isArray && json[j] !== '}') {
      throw SyntaxError('Invalid Format! Expected object to end in \'}\' at character ' + j + '.');
    }
    return res;
  };

  // Assumes that j is positioned at a '"' character and tries to parse the stirng if in a valid
  // format.
  var parseString = function() {
    if (json[j] !== '"') {
      throw SyntaxError('Invalid Format! Expected \'"\' at beginning of string ' +
                        'at character ' + j + '.');
    }
    var res = '';
    j += 1;
    // Computes the number of escape characters in a row.
    // Every even number of escapes should produce another escape character.
    // Odd escape characters should be ignored.
    var numEscapes = 0;
    while (j < json.length) {
      if (json[j] === '\"' && json[j - 1] !== '\\') {
        break;
      }
      if (json[j] === '\\') {
        numEscapes += 1;
        if (numEscapes % 2 === 0) {
          res += '\\';
          j += 1;
        } else {
          j += 1;
        }
      } else {
        numEscapes = 0;
        res += json[j];
        j += 1;
      }
    }

    // Ensures the string eventually ends.
    if (json[j] !== '"') {
      throw SyntaxError('Invalid Format! Expected string to end in \'"\' at character ' + j + '.');
    }
    return res;
  };

  // Parses number in string, assuming j is at a '-' or a '0'-'9'.
  var parseNumber = function() {
    var res = '';
    if (json[j] === '-') {
      res += '-';
      j += 1;
    } else if (json[j] === '+') {
      j += 1;
    }
    // Clears through all numbers, ensuring decimals and 'e' are at the correct spot.
    while (!isEndOfPrim(json[j]) && json[j] !== '.' && json[j] !== 'e' && json[j] !== 'E') {
      if (Number.isNaN(Number.parseInt(json[j]))) {
        throw SyntaxError('Invalid Format! Expected \'' + json[j] +
                          '\' to be a number at character ' + j + '.');
      }
      res += json[j];
      j += 1;
    }
    if (json[j] === '.') {
      res += json[j];
      j += 1;
      if (Number.isNaN(Number.parseInt(json[j]))) {
        throw SyntaxError('Invalid Format! Number \'' + res + '\' missing fractional number.');
      }

      while (!isEndOfPrim(json[j]) && json[j] !== 'e' && json[j] !== 'E') {
        if (Number.isNaN(Number.parseInt(json[j]))) {
          throw SyntaxError('Invalid Format! Expected \'' + json[j] +
                            '\' to be a number at character ' + j + '.');
        }
        res += json[j];
        j += 1;
      }
    }
    if (json[j] === 'e' || json[j] === 'E') {
      res += json[j];
      j += 1;

      if (json[j] === '-') {
        res += '-';
        j += 1;
      } else if (json[j] === '+') {
        j += 1;
      }
      if (Number.isNaN(Number.parseInt(json[j]))) {
        throw SyntaxError('Invalid Format! Number \'' + res + '\' missing exponent.');
      }

      while (!isEndOfPrim(json[j])) {
        if (Number.isNaN(Number.parseInt(json[j]))) {
          throw SyntaxError('Invalid Format! Expected \'' + json[j] +
                            '\' to be a number at character ' + j + '.');
        }
        res += json[j];
        j += 1;
      }
    }
    j -= 1;
    var firstIndex = json[0] === '-' ? 1 : 0;
    if (res[firstIndex] === '0' && firstIndex + 1 < res.length &&
        !Number.isNaN(Number.parseInt(res[firstIndex + 1]))) {
      throw SyntaxError('Invalid Format! Number \'' + res + '\' cannot have leading zeroes');
    }
    if (res[res.length - 1] === 'e') {
      throw SyntaxError('Invalid Format! Number \'' + res + '\' missing exponent.');
    }
    var parsed = Number.parseFloat(res);
    if (Number.isNaN(parsed)) {
      throw SyntaxError('Invalid Format! Number \'' + res + '\' is not a number.');
    }
    return parsed;
  };

  var result = parseNext();
  j += 1;

  while (isWhitespace(json[j])) {
    j += 1;
  }
  if (j < json.length) {
    throw SyntaxError('Invalid Format! Expected json to end.');
  }
  return result;
};



// console.log('FINAL RESULT IS ', parseJSON('[{“name”:”Elf",”score”:8.7},{“name”:”Spaceballs”,”score”:7.7}]'));
// console.log('FINAL RESULT IS ', parseJSON('[]'));
// console.log('FINAL RESULT IS ', parseJSON('{"foo": ""}'));
// console.log('FINAL RESULT IS ', parseJSON('{}'));
// console.log('FINAL RESULT IS ', parseJSON('{"foo": "bar"}'));
// console.log('FINAL RESULT IS ', parseJSON('["one", "two"]'));
// console.log('FINAL RESULT IS ', parseJSON('{"a": "b", "c": "d"}'));
// console.log('FINAL RESULT IS ', parseJSON('[null,false,true]'));
// console.log('FINAL RESULT IS ', parseJSON('{"foo": true, "bar": false, "baz": null}'));
// console.log('FINAL RESULT IS ', parseJSON('[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]'));
// console.log('FINAL RESULT IS ', parseJSON('{"boolean, true": true, "boolean, false": false, "null": null }'));
// console.log('FINAL RESULT IS ', parseJSON('{"a":{"b":"c"}}'));
// console.log('FINAL RESULT IS ', parseJSON('{"a":["b", "c"]}'));
// console.log('FINAL RESULT IS ', parseJSON('[{"a":"b"}, {"c":"d"}]'));
// console.log('FINAL RESULT IS ', parseJSON('[[[["foo"]]]]'));