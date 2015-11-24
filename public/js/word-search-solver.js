(function(window, document, undefined) {

  /* Private helpers */

  var getStringMeta = function(string, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === 200) {
        callback(null, JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    });
    request.open('GET', '/api/' + string, true);
    request.send();
  }

  // Breaks if `grid` is empty because `grid[0]` is undefined
  var inBounds = function(grid, r, c) {
    return r >= 0 && c >= 0 && r < grid.length && c < grid[0].length;
  }

  var findAllWordsHelper = function(callback, grid, words, string, r, c, dr, dc) {
    if (!inBounds(grid, r, c)) {
      return;
    }
    var newString = string + grid[r][c];
    getStringMeta(newString, function(error, result) {
      if (result.isWord && result.string.length >= 4) {
        var wordMeta = {
          startR: r - (dr * (result.string.length - 1)),
          startC: c - (dc * (result.string.length - 1)),
          dr: dr,
          dc: dc,
          word: result.string
        };
        words.push(wordMeta);
        callback(wordMeta);
      }
      if (result.isPrefix) {
        findAllWordsHelper(callback, grid, words, newString, r + dr, c + dc, dr, dc);
      }
    });
  }

  /* Public */
  var WordSearchSolver = function(grid) {
    this.grid = grid;
    this.words = [];
  }

  /**
   * Finds all of the words in `this.grid`, pushes them to `this.words`, and
   * calls `callback` on each item pushed to the array.
   */
  WordSearchSolver.prototype.findAllWords = function(callback) {
    for (var r = 0; r < this.grid.length; r++) {
      for (var c = 0; c < this.grid[0].length; c++) {
        for (var dr = -1; dr <= 1; dr++) {
          for (var dc = -1; dc <= 1; dc++) {
            if (dr != 0 || dc != 0) {
              findAllWordsHelper(callback, this.grid, this.words, "", r, c, dr, dc);
            }
          }
        }
      }
    }
  }

  WordSearchSolver.prototype.getGrid = function() {
    return this.grid;
  }

  WordSearchSolver.prototype.getWords = function() {
    return this.words;
  }

  window.WordSearchSolver = WordSearchSolver;
  
})(this, this.document);