var grid = [
  ["J", "J", "E", "N", "U", "T", "P", "E", "N", "L", "S", "B", "P"],
  ["R", "A", "E", "M", "P", "E", "R", "O", "R", "F", "R", "U", "N"],
  ["U", "M", "M", "R", "M", "M", "L", "Z", "G", "S", "E", "L", "S"],
  ["B", "E", "H", "E", "A", "A", "I", "R", "D", "U", "P", "B", "N"],
  ["B", "S", "T", "I", "S", "T", "R", "A", "X", "N", "P", "A", "O"],
  ["E", "B", "N", "I", "E", "M", "T", "C", "B", "A", "E", "S", "W"],
  ["R", "U", "E", "H", "M", "R", "A", "A", "H", "R", "P", "A", "L"],
  ["S", "C", "G", "E", "O", "E", "O", "D", "T", "U", "T", "U", "E"],
  ["O", "H", "O", "L", "Z", "H", "S", "P", "I", "A", "G", "R", "O"],
  ["U", "A", "R", "I", "B", "W", "C", "O", "H", "S", "S", "X", "P"],
  ["L", "N", "T", "U", "I", "R", "I", "P", "Y", "A", "O", "A", "A"],
  ["T", "A", "I", "M", "A", "O", "E", "I", "G", "W", "N", "N", "R"],
  ["R", "N", "N", "D", "E", "C", "E", "M", "B", "E", "R", "T", "D"]
]

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

var findAllWords = function(grid) {
  for (var r = 0; r < grid.length; r++) {
    for (var c = 0; c < grid[0].length; c++) {
      for (var dr = -1; dr <= 1; dr++) {
        for (var dc = -1; dc <= 1; dc++) {
          if (dr != 0 || dc != 0) {
            findAllWordsHelper(grid, "", r, c, dr, dc);
          }
        }
      }
    }
  }
}

// Breaks if `grid` is empty because `grid[0]` is undefined
var inBounds = function(grid, r, c) {
  return r >= 0 && c >= 0 && r < grid.length && c < grid[0].length;
}

var findAllWordsHelper = function(grid, string, r, c, dr, dc) {
  if (!inBounds(grid, r, c)) {
    return;
  }
  var newString = string + grid[r][c];
  getStringMeta(newString, function(error, result) {
    if (result.isWord && result.string.length >= 4) {
      console.log(result.string);
    }
    if (result.isPrefix) {
      findAllWordsHelper(grid, newString, r + dr, c + dc, dr, dc);
    }
  });
}