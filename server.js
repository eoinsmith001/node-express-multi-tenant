var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var port = require('./config').port;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
  console.log('==>', req.body.db);
  req.db = require('./db')(req.body.db);
  next();
});
var router = require('./routes/router');
app.use('/api', router);
require('./db');
app.listen(port, function() {
  console.log('http on port', port);
});
