var dictionary = require('../lib/dictionary');

module.exports = function(app) {
  app.get('/trie/:string', function(request, response) {
    var string = request.params.string;
    response.status(200).json({
      string: string,
      isWord: dictionary.contains(string),
      isPrefix: dictionary.containsPrefix(string)
    });
  });
}