// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    // How a board is represented in an array of arrays (ex 4x4)
    // [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]

    // 0 0 0 0
    // 0 0 0 0
    // 0 0 0 0
    // 0 0 0 0

    // so each nested array = row
    // and each nested index of all rows = col
    // from console logging: const board = new Board({n:4}) and then
    // if you console log board.rows() you get the matrix
    // check the spec tests for how these methods are called (board.hasRowCon...)
    // so we can use the keyword 'this' to access props of the board like rows.
    hasRowConflictAt: function(rowIndex) {
      let rowConflict = false;
      let rows = this.rows();
      for (let i = 0; i < rows[rowIndex].length; i++) {
        // rows[i] will be [0,0,0,0], one of the nested arrays
        // to determine if there's a row conflict, the sum of all vals would be > 1
        const rowSum = rows[i].reduce((accum, point) => (accum + point), 0);
        if (rowSum > 1) {
          rowConflict = true;
          return rowConflict;
        }
      }
      return rowConflict;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let rowConflicts = false;
      const rows = this.rows();
      for (let i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          rowConflicts = true;
          return rowConflicts;
        }
      }
      return rowConflicts;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let colConflict = false;
      let matrix = this.rows();
      const colAtIndex = [];
      for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        colAtIndex.push(row[colIndex]);
      }
      // now if any of the col reduce to more than 1, you know there's a conflict
      const colSum = colAtIndex.reduce((accum, point) => (accum + point));
      if (colSum > 1) {
        colConflict = true;
        return colConflict;
      }
      return colConflict;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let colConflicts = false;
      const rows = this.rows();
      for (let i = 0; i < rows.length; i++) {
        if (this.hasColConflictAt(i)) {
          colConflicts = true;
          return colConflicts;
        }
      }
      return colConflicts;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // marjor diagonal in matrix looks like: [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]
    // or in coordinates: (0, 0), (1, 1), (2, 2), (3, 3) SO the way it's set up now with
    // this god awful time complexity is the i of the outer loop === i of inner loop
    // but if the diagonal appears anywhere other than a corner, we need to know where the
    // edges of the board are and incrementing the coordinate will look different. Ex:
    // (0, 1), (1, 2), (2, 3) then EDGE (no more)
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
