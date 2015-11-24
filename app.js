var http = require('http');
var express = require('express');
var app = express();

require('./routes/index.js')(app);
require('./settings')(app, express);

app.listen(process.env.PORT || 1337);
console.log("Listening at 127.0.0.1:" + 1337);
