var bodyParser = require('body-parser');
var ejs = require('ejs');
var methodOverride = require('method-override');
var utils = require('./lib/utils.js');

module.exports = function(app, express) {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', { layout: false });
  app.engine('html', ejs.renderFile);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());

  app.use(express.static(__dirname + '/public'));
  app.use(utils.render404);
}