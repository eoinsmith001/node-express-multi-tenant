var mongoose = require('mongoose');
var config = require('./config');

var db = mongoose.createConnection(config.db, function() {
  console.log('connected', config.db);
});

module.exports = function(dbname) {
  if (dbname) {
    return db.useDb(dbname);
  } else {
    return null;
  }
}
