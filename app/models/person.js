var PersonSchema = new require('mongoose').Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }, 
  age: {
    type: Number, 
    required: true
  }
});
module.exports = PersonSchema;
