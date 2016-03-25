var express = require('express');
var router = express.Router();
var PersonSchema = require('../app/models/person');

router.route('/')
.get(function(req, res) {
  res.status(200).json({
    message: 'Welcome'
  });
});

router.use('/person', function(req, res, next) {
   if (!req.db) {
     res.status(500).json({
       success: false,
       error: 'No Db Specified'
     });
   } else {
     next();
   }
});

router.route('/person')
.post(function(req,res) {
  var Person = req.db.model('Person', PersonSchema);
  var newPerson = Person({
    name: req.body.name,
    age: req.body.age
  });
  newPerson.save(function(err, saved) {
    if (err) {
      console.error(err.message);
      res.status(500).json({
        success: false, 
        message: err.message
      });
    } else {
      console.log('saved person');
      res.status(201).json(saved);
    }
  });
});

module.exports = router;
