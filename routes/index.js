var dictionary = require('../lib/dictionary');

module.exports = function(app) {
  app.get('/', function(request, response) {
    response.render('index.html');
  })

  app.get('/api/:string(*)', function(request, response) {
    var string = request.params.string.toLowerCase();
    response.status(200).json({
      string: string,
      isWord: dictionary.contains(string),
      isPrefix: dictionary.containsPrefix(string)
    });
  });
}