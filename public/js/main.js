(function(window, document, undefined) {

  KEYCODE = {
    'BACKSPACE': 8,
    'ENTER': 13,
    'A': 65,
    'Z': 90,
  }

  var $body = $(document.body);
  $grid = $body.find('#grid');
  var $solveBtn = $body.find('button[name="solve"]');
  var $words = $body.find('#words');
  var $topBar = $body.find('#top-bar');

  var getTile = function($grid, r, c) {
    var $row = $($grid.find('tr')[r]);
    return $($row.find('td')[c]);
  }

  var highlightTile = function($grid, r, c) {
    var $tile = getTile($grid, r, c);
    $tile.toggleClass('highlight');
  }

  var highlightWord = function(wordMeta) {
    for (var i = 0; i < wordMeta.word.length; i++) {
      highlightTile($grid, wordMeta.startR + wordMeta.dr * i, wordMeta.startC + wordMeta.dc * i)
    }
    setTimeout(function() {
      for (var i = 0; i < wordMeta.word.length; i++) {
        highlightTile($grid, wordMeta.startR + wordMeta.dr * i, wordMeta.startC + wordMeta.dc * i)
      }
    }, 1000)
  }

  $solveBtn.bind('click', function(event) {
    var grid = [];
    $grid.find('tr').each(function(i, tr) {
      var row = [];
      $(tr).find('td').each(function(i, td) {
        row.push($(td).html());
      });
      grid.push(row.slice(0, row.length - 1));
    });

    // Validates grid is non-empty rectanglar
    var isInvalidGrid = grid.length <= 0 || grid[0].length <= 0;
    if (isInvalidGrid) {
      var $notification = $('<div />', { 
        'class': 'notification',
        'text': 'Your grid must be non-empty!'
      });
      $topBar.prepend($notification);
      return;
    };
    var isInvalidGrid = grid.some(function(row) {
      return row.length !== grid[0].length;
    });
    if (isInvalidGrid) {
      var $notification = $('<div />', { 
        'class': 'notification',
        'text': 'Your grid must be rectanglar!'
      });
      $topBar.prepend($notification);
      return;
    }

    // Solves grid
    $words.html('');
    var solver = new WordSearchSolver(grid);
    solver.findAllWords(function(wordMeta) {
      var $word = $('<li />').appendTo($words);
      $word.html(wordMeta.word);
      $word.bind('click', function() {
        console.log(wordMeta);        

        // Highlights word in grid
        highlightWord(wordMeta);
      });
    });
  });

  $grid.bind('click', function(event) {
    var target = event.target;

    var $activeTd = $grid.find('.active-td');
    var $targetTd = $(target).closest('td');

    if ($targetTd) {
      $activeTd.toggleClass('active-td');
      $targetTd.toggleClass('active-td');
    }
  });


  // Prevents backspace from navigating back
  $body.bind('keydown', function(event) {
    var keyCode = event.keyCode;
    if (keyCode === KEYCODE['BACKSPACE']) {
      event.preventDefault();
    }
  });

  $body.bind('keyup', function(event) {
    event.preventDefault();

    var keyCode = event.keyCode;
    var $activeTd = $grid.find('.active-td');
    var $activeTr = $activeTd.closest('tr');
    
    if (keyCode === KEYCODE['ENTER']) {
      if ($activeTr.is(':last-child')) {
        $activeTd.toggleClass('active-td');
        
        var $newActiveTr = $('<tr />');
        $('<td />').appendTo($newActiveTr);
        
        var $newActiveTd = $newActiveTr.children(':first-child');
        $newActiveTd.toggleClass('active-td');
        
        $grid.append($newActiveTr);
      } else {
        // Go to the next row
      }

    }
    else if (keyCode === KEYCODE['BACKSPACE']) {

      if ($activeTd.html() === '') {
        if (!$activeTd.is(':first-child')) {
          $activeTd.toggleClass('active-td');
          var $newActiveTd = $activeTd.prev();
          $newActiveTd.html('');
          $newActiveTd.toggleClass('active-td');
          
          // Only remove the td if it's the last child
          if ($activeTd.is(':last-child')) {
            $activeTd.remove();
          }
        }
      } else {
        $activeTd.html('');
      }
    }
    else if (keyCode >= KEYCODE['A'] && keyCode <= KEYCODE['Z']) {
      var key = String.fromCharCode(keyCode);

      $activeTd.html(key);
      $activeTd.toggleClass('active-td');
      
      if ($activeTd.is(':last-child')) {
        var $newActiveTd = $('<td />').appendTo($activeTr);
        $newActiveTd.toggleClass('active-td');
      } else {
        var $newActiveTd = $activeTd.next();
        $newActiveTd.toggleClass('active-td');
      }
    }
  });

})(this, this.document);