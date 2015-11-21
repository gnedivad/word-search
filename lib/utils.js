exports.render404 = function(req, res) {
  res.status(404);
  res.render('not-found.html');
};