var chai = require('chai');
var request = require('supertest');
var expect = chai.expect;

var url = 'localhost:3000'

var PersonSchema = require('../app/models/person');
var getDb = require('../db');

describe('api', function() {
  it('is available', function(done) {
    request(url)
    .get('/api')
    .expect(200)
    .end(function(err, res) {
      expect(err).to.not.exist;
      done();
    });
  });

  it('can save a person to a database', function(done) {
    var form = require('./data/newPerson.json');
    request(url)
    .post('/api/person')
    .send(form)
    .expect(201)
    .end(function(err, res) {
      expect(err).to.not.exist;
      expect(res.body.name).to.eql(form.name);
      done();
    });
  });

  it('cannot save a person to a database if none is specified', function(done) {
    var form = require('./data/newPerson.json');
    delete form.db;
    request(url)
    .post('/api/person')
    .send(form)
    .expect(500)
    .end(function(err, res) {
      expect(err).to.not.exist;
      expect(res.body.success).to.be.false;
      done();
    });
  });

  after(function(done) {
    var dbname = 'database-1';
    var db = getDb(dbname);
    var Person = db.model('Person', PersonSchema); 
    Person.remove({
      name: 'Joe Soap'
    }, function(err, conn){
       expect(err).to.not.exist;            
       done();
    })
  });
});
